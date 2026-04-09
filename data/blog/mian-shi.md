---
title: AI-infra 找工向笔记
tags: [Work, Article]
date: 2026-03-30
top: 2
---

This article is particularly for Chinese students, so I will not provide English translation.

------

# AI-Infra 方向

## 概述

+ 计算层：
    + 提供算力、网络、存储等
    + 核心技术：GPU/CUDA 编程，RDMA/InfiniBand 通信，分布式系统
    + 代表：NVIDIA，NVIDIA CUDA，NCCL
    + 常用语言：C++，CUDA，少量 Python
+ 算子层（编译层）：
    + 把模型计算（数学公式）转化为高效的计算图（算子图），让计算层执行
    + 核心技术：LLVM，图优化，kernel fusion
    + 代表：PyTorch, TensorFlow
    + 常用语言：C++，CUDA，Python
+ 训练推理框架层：
    + 提供训练和推理的核心抽象，管理 tensor，autograd，分布式训练等
    + 核心技术：
        + 训练：数据并行，模型并行，梯度同步（AllReduce）
        + 推理：Batch scheduling，KV cache，latency optimization
    + 代表：PyTorch, TensorFlow, vLLM
    + 常用语言：Python（接口），C++（核心/引擎）
+ 服务层：
    + 把模型封装成 API，支持高并发请求
    + 核心技术：
        + Continuous batching
        + Paged Attention
        + Prefill vs Decode
        + Stream responses
    + 代表：vLLM，Ollama
    + 常用语言：Python，C++，Go
+ 平台层：
    + 管理整个 AI 服务的生命周期
    + 核心技术：CI/CD, Kubernetes, Model registry
    + 代表：Kubernetes

## 大模型基础

### Attention is All You Need

原理不多赘述，有很多资源。最近看到的一个是[视频](https://www.bilibili.com/video/BV1dyW9zsEk1)。

为什么 Transformer 给人工智能带来了革命性的变化？
+ 解决了长距离依赖问题：
    + RNN 处理长距离依赖的弱势：梯度消失和梯度爆炸
    + CNN 处理长距离依赖的弱势：感受野有限，难以捕捉全局信息
    + Attention 机制长期被用作 RNN/CNN 的补充工具，但 Transformer 将其作为核心，解决了 RNN/CNN 的弱势
+ 此外，Transformer 的并行计算能力也使得训练大规模模型成为可能（而不像 RNN 需要逐步计算）

什么是 Self-Attention？
+ Self-Attention 是 Transformer 的核心机制，它允许模型在处理输入序列的每个位置时，动态地关注输入序列的其他位置，从而捕捉全局信息。
+ 输入张量 $X$ 通过三个线性变换生成查询（Query）、键（Key）和值（Value）：
    + Query $Q = XW_Q$：我要关注什么信息？
    + Key $K = XW_K$：谁提供了我要的信息？
    + Value $V = XW_V$：我自带什么信息？
+ Attention 计算公式：
$$
Attention(Q, K, V) = softmax\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$
+ 通过计算 Query 和 Key 的相似度（点积），得到一个权重分布，然后用这个权重分布对 Value 进行加权求和，得到输出。
+ 由于我们需要 $Q$ 和 $K$ 的点积，计算复杂度是 $O(n^2)$，其中 $n$ 是输入序列的长度，这也是 Transformer 在处理长序列时的一个瓶颈。

什么是 Multi-Head Attention？
+ Multi-Head Attention 是 Transformer 的一个重要改进，它通过并行计算多个 Attention 头来捕捉输入序列的不同方面的信息。
+ 每个 Attention 头都有自己独立的查询、键和值的线性变换，这样模型可以在不同的子空间中学习不同的表示。
+ 最后，将所有 Attention 头的输出进行拼接并通过一个线性变换得到最终的输出。

什么是 FFN（Feed-Forward Network）？
+ FFN 是 Transformer 中每个层的另一个重要组件，它是一个两层的前馈神经网络，通常包含一个 ReLU 激活函数。
+ FFN 的作用是对 Attention 的输出进行非线性变换，增强模型的表达能力。

什么是 Residual Connection 和 Layer Normalization？（并非 Transformer 独有）
+ Residual Connection（残差连接）是 Transformer 中的一种设计，它允许信息直接从输入层流向输出层，缓解了深层网络中的梯度消失问题。
+ Layer Normalization（层归一化）是 Transformer 中的一种正则化技术，它在每个层的输入上进行归一化，帮助模型更快地收敛并提高性能。

Transformer 的完整训练/推理流程？
+ （图左侧, Encoder）输入序列通过嵌入层转换为向量表示，然后经过：
    + Multi-Head Attention 模块：允许模型在处理每个 Token 时关注输入序列的相关信息
    + FFN
+ （图右侧, Decoder）目标序列通过嵌入层转换为向量表示，然后经过：
    + Masked Multi-Head Attention 模块：允许模型在生成每个 Token 时只能关注之前生成的 Token，防止信息泄露
    + Multi-Head Attention 模块，其中 Query 来自 Decoder 的输入，Key 和 Value 来自 Encoder 的输出：允许模型在生成每个 Token 时关注输入序列的相关信息
    + FFN
+ Transformer 论文中的这个结构用于机器翻译，因此 Encoder 输入原文，Decoder 通常输入一个特殊的起始 Token（如 ```start```）并逐步生成目标序列，直到生成一个特殊的结束 Token（如 ```end```）。
+ 而在语言模型（如 GPT）中，通常只有 Decoder 部分，输入是一个 prompt，模型逐步生成后续 Token。

Transformer 变体？
+ Encoder-only 模型：如 BERT，主要用于理解任务
+ Decoder-only 模型：如 GPT，主要用于生成任务
+ Encoder-Decoder 模型：如 T5，既可以理解又可以生成，适用于翻译、摘要任务

### 算力开销

#### 推理

核心经验公式：推理一个 Token 的 FLOPs 约等于 2N ，其中 N 是模型的参数量。

大模型的推理大致可以分为两个阶段：
+ Prefill：生成第一个 Token 前，把 prompt 输入模型
    + 特征：计算密集
    + 算力消耗：l * 2N，其中 l 是 prompt 的长度
+ Decode：生成后续 Token
    + 特征：内存密集
    + 算力消耗：2N，每生成一个 Token
    + 即使你只生成一个 Token，GPU 也得把整个模型加载到内存里，此时带宽和内存访问成为瓶颈

#### 训练

核心经验公式：训练一个 Token 的 FLOPs 约等于 6N ，其中 Forward Pass 是 2N，Backward Pass（需要计算相对激活值的梯度和相对权重的梯度）是 4N。

一个大模型的训练通常需要万亿个 Token 。

#### 微调

训练相比推理来说，开销是天文数字，但是相比之下微调的开销要小很多。微调的目的是让现有大模型适应特定的任务领域。常见的有：
+ 全量微调（Full fine-tuning）：更新模型的所有参数，开销大
+ 参数高效微调（Parameter-efficient fine-tuning, PEFT）：只更新模型的一小部分参数，开销小很多
    + 最重要的方法：LoRA（Low-Rank Adaptation of Large Language Models）
    + LoRA 的核心思想是：在模型的权重矩阵 W 上添加一个低秩矩阵 A*B，其中 A 和 B 的秩远小于 W，这样就可以通过训练 A 和 B 来微调模型，而不需要更新 W 本身
    + 优势：
        + 只需要训练很少参数
        + 可以在多个任务之间共享基础模型
    + 其他方法：
        + Prefix-tuning：在输入序列前添加可训练的前缀
        + Adapter：在模型层之间插入小型适配器模块
+ 对齐微调（Alignment fine-tuning）：使用人类反馈来微调模型，使其行为更符合人类价值观和期望
    + 代表：InstructGPT
+ 指令微调（Instruction fine-tuning）：使用大量的指令-响应对来微调模型，使其更好地理解和执行自然语言指令
    + 代表：ChatGPT 就是在 InstructGPT 的基础上进行指令微调的产物
    + 不是 Prompt Engineering

## AI-Infra（推理方向）核心概念

这里参考了[小红书-胖企鹅](https://www.xiaohongshu.com/discovery/item/69be6862000000001a0229e2?xsec_token=CBCvTdsZGCuzsik1wdxL2gUsTdJXibi-LxpRlaXTkrN74=)

+ 基础知识
    + 算法基础
        + LLM：见上文。
        + 模型架构：pending...
    + 编程基础
        + GPU 编程：CUDA
        + 框架：PyTorch
    + 性能指标
        + 吞吐量
            + Throughput：通常用 Tokens/s
            + QPS：每秒查询数
            + Concurrency：并发数，即同时处理的请求数
        + 延迟
            + TIFT：Time to First Token，即从请求开始到生成第一个 Token 的时间
                + 瓶颈：Prefill 阶段的计算密度
                + 优化：PD 分离，将 Prefill 任务统一分给最强力的计算节点
            + TPOT：Time Per Output Token，即每生成一个 Token 的时间
                + 瓶颈：带宽
                + 优化：KV Cache 量化，减少每一步需要的数据量，缓解带宽压力
            + ITL：Inference Time Latency，即整个推理过程的总时间
                + 瓶颈：总耗时，因此各流程优化都能带来提升
                + 前端优化：流式输出，提升用户体验
            + E2E Latency：End-to-End Latency，即从请求开始到响应结束的时间
                + 同上
            + P99 Latency：99th Percentile Latency，即 99% 请求的延迟在这个值以下
                + 瓶颈：长尾效应，可能来自资源竞争、任务排队或长文本压力
                + 优化：连续批处理（解决传统 Batching 的木桶效应）、Paged Attention（解决内存碎片化导致的OOM）、调度优化（隔离长短请求，避免长请求挤占资源）
+ 内存管理
    + KV Cache
        + 生成第 n 个 Token 时，模型需要访问前 n-1 个 Token 的 Key 和 Value，这些信息被存储在 KV Cache 中
        + 占用显存大小公式：以下值的乘积
            + $2$: Key 和 Value
            + 模型 Layer 数
            + Attention 头数
            + Hidden Dim，即每个 Token 的向量维度
            + Sequence Length，即输入序列的长度
            + Precision，即每个数值占用的字节数（如 FP16 是 2 字节）
    + PagedAttention
        + 类似操作系统，不再提前预分配连续显存，而是把 KV Cache 分成多个页（page），维护一个 Block Table ，将物理离散的页面逻辑映射成连续的
        + Trade-off：Page 越大，计算效率越高，但内存碎片化越严重
        + Copy-on-write：多个输出路径可以共享一块前缀 Block ，直到它们分叉
    + RadixAttention
        + 利用 RadixTree 管理 KV Cache，自动复用相同的前缀
    + HiCache
        + 类似 CPU 缓存，将 KV Cache 扩展到三层
            + L1-GPU HBM：显存，热数据
            + L2-Host RAM：系统主内存，温数据
            + L3-Disk或Distributed Storage：磁盘或云端分布式存储，冷数据
    + KV Cache Quantization（量化）
        + 降低精度，最经典的是 FP16 to INT8，前沿：FP16 to FP8，仅在最新的硬件上支持
        + 分块量化：针对某个 Channel 或者 Token 量化，保存缩放因子，以减少量化误差
        + SmoothQuant：激活值往往比权重更难量化，存在更多离群值。因此引入一个平滑因子矩阵，把激活值的一部分范围转移到权重上
        + 减少显存、提升吞吐
    + Cache 路由：
        + 常用的一段 Token 序列可以被视为一个可以复用的零件。系统可以对这些前缀进行哈希，如果之后的请求具有相同的前缀（Approximate Redix Tree），就不需要重新 prefill，而是直接从缓存读取
        + 常见复用场景：
            + System Prompt
            + Multi-turn：让同一个对话序列锁定在一台机器上（Session Stickiness）
            + Few-shot Examples：识别一些固定的示例模板
        + Cache-aware Routing：网关计算请求的 prompt 前缀哈希值，如果在全局表（可以实现在 Redis 里）中找到匹配项，就直接路由到对应服务器上
+ 调度系统
    + Batching
        + Continuous Batching：由 vLLM 的核心论文 Orca 提出，将调度粒度减小到 iteration level，每生成一个词就看看有没有已完成的请求和新抵达的请求。可以做到 GPU slot 零空转。
            + 追问：为什么前人不这么做？主要是受限于显存管理和算子设计的落后：
                + 传统的显存管理（在 PagedAttention 出现之前）需要提前预分配连续的显存给每个请求
                + 传统的算子设计将一个 batch 当成一个巨大的连续矩阵，没法在一个请求完成后单独输出
        + Chuncked Prefill：如果一个巨大的长 prefill 直接进入显存，会瞬间抢占所有算力，导致正在进行的 Decode 发生卡顿。因此可以设置一个 Budget 策略，每次调度都进行算力预算的分配，防止 Decode 饥饿。
    + Overlap
        + 让 GPU 不同硬件单元同时干不同的活。
        + CPU-GPU Overlap：消除 CPU 发指令、GPU 执行之间的等待间隙。
        + Two-batch Overlap：同时处理两个 batch，一个在 prefill，一个在 decode，充分利用 GPU 资源。
    + Request Management：
        + 类似操作系统的内核调度，可以设计优先级（例如 Cache 命中率高的优先）
        + Preemption：当显存无法承受的时候，可能考虑 Swap（将部分 KV Cache 从显存交换到主内存）或者 Recompute（重新计算某些中间结果而不是存储它们），以释放显存资源
+ 计算优化
    + CUDA：pending...
    + Attention Kernel：
        + Flash Attention：在 SRAM 里做完所有运算，而不往显存写中间结果。
            + 回顾：$Attention=Softmax(QK^T/\sqrt{d_k})V$
                + 其中，矩阵 Q, K, V 的维度都是 $L \times d$，其中 $L$ 是序列长度，$d$ 是隐藏维度，它们是由输入的 Tokens 经过 embedding 得到的输入矩阵 $X=L \times d$ 乘以权重矩阵 $W_Q, W_K, W_V$ 得到的
                + 因此，Q, K, V 矩阵的每一行就代表一个 Token 的查询向量、键向量和值向量，而公式中的 Softmax 也是行操作，每一行的 Softmax 结果代表该 Token 对其他 Token 的关注分布
            + 计算复杂度和读写内存的次数都是 $O(L^2)$，而读写内存是瓶颈。Flash Attention 的核心思想就是用算力换读写，把全部计算在 SRAM 里完成
                + 分块：$K=[K^{(1)}, K^{(2)}, ..., K^{(m)}]$，$V=[V^{(1)}, V^{(2)}, ..., V^{(m)}]$
                + 对于某一行 $Q_i$，计算 $S_i^{(t)}=Softmax(\frac{Q_iK^{(t)T}}{\sqrt{d_k}})V^{(t)}$
                + 我们最后需要的是 $O_i=\sum_{j=1}^n \frac{\exp(S_{ij})}{\sum_{k=1}^n \exp(S_{ik})}V_j=\frac{l_i}{u_i}$
                    + 其中 $l_i=\sum_{j=1}^n \exp(S_{ij})V_j$，$u_i=\sum_{j=1}^n \exp(S_{ij})$
                    + 注意到在实际运算中，我们没法直接保存 $\exp(S_{ij})$，因为它很快就会精度爆炸，因此我们需要在计算过程中维护一个 $m_i=\max_{j=1}^n S_{ij}$
                + 那么我们可以分块计算：
                    + $S_i^{(t)}=Softmax(\frac{Q_iK^{(t)T}}{\sqrt{d_k}})V^{(t)}$
                    + $m_i^{(t)}=\max_{j=1} S_{ij}^{(t)}$
                    + $l_i^{(t)}=\sum_{j=1} \exp(S_{ij}^{(t)})V_j^{(t)}$
                    + $u_i^{(t)}=\sum_{j=1} \exp(S_{ij}^{(t)})$
                + 然后计算新的块对旧的块的贡献：
                    + $m_i\leftarrow \max(m_i^{(old)}, m_i^{(t)})$
                    + $l_i\leftarrow l_i \cdot \exp(m_i^{(old)}-m_i)+l_i^{(t)} \cdot \exp(m_i^{(t)}-m_i)$
                    + $u_i\leftarrow u_i \cdot \exp(m_i^{(old)}-m_i)+u_i^{(t)} \cdot \exp(m_i^{(t)}-m_i)$
                + 这样我们就避免了这个 $O(L^2)$ 的矩阵 $S$ 的存储和访问，而只需要维护两个 $O(L)$ 的向量 $l$ 和 $u$，从而大幅减少内存访问，提高效率
        + Flash Infer：专为 LLM 推理设计的底层算子库，解决 PagedAttention 在高并发下的算子性能瓶颈
            + 级联推理（Cascaded Inference）：在分布式场景下，KV Cache 可能在不同地方，Flash Infer 支持计算局部 Attention，然后利用和 Flash Attention 相同的 Rescaling 合并结果
            + 重写了 Paged Decoding Kernel，prefetch 不连续的物理 Block
    + Kernel 融合：pending...
+ 并行策略：
    + Tensor Parallel：层内张量切分。LLM 中常见应用方式为将 Attention Heads 切分到不同 GPU 上，每张 GPU 只持有自己负责的 Attention Heads 用到的 KV Cache 和权重参数
    + Pipeline Parallel：层间切分。将模型的不同层分布在不同 GPU 上，输入数据在 GPU 之间流动
    + Data Parallel：数据并行。每个 GPU 上都有完整模型副本，运行不同 batch
    + 3P 并行：最外层 DP，中间层 PP，最内层 TP
        + DP 可以跨节点，TP 通信量最大
    + Mixture of Experts，MoE：模型中有多个专家，每个 Token 只会路由到 top K 个专家上，即只有部分参数被激活，因此虽然模型规模大，但是单次计算的开销接近小模型。
        + Expert Parallel：MoE 模型中，每个专家分布在不同 GPU 上实现并行
+ 加速技术：
    + 投机解码（Speculative Decoding）：用小模型预测多个候选 Token，大模型来验证
        + Draft：小模型连续预测接下来的 K 个 Tokens
        + Verify：将这 K 个 Tokens 一次性喂给 Target Model ，大模型通过一次 Prefill 计算这 K 个 Tokens 的 Logits，判断小模型猜的对不对
        + 如果接受，大模型用一次推理的时间得到了 K 个 Tokens 的输出；如果拒绝，也只亏了一次推理时间
    + 权重量化

|维度|模型权重量化 (Weight Quant)|KV Cache 量化 (KV Cache Quant)|
|---|---|---|
|主要目标|减小模型模型体积，降低存储和显存占用。|减少推理时的显存占用，提高 最大 Batch Size 和 上下文长度。|
|瓶颈解决|解决 Weights-bound（模型太大装不下）和计算压力。|解决 Memory-bound（显存带宽瓶颈）和 KV 缓存爆炸。|
|发生阶段|主要是推理前加载时（离线或静态）。|推理过程中 动态生成。|
|典型精度|INT8, INT4, NF4, FP8。|FP8, INT8 (常用), INT4 (较难)。|

+ 加速技术
    + 量化具体实现方式
        + PTQ (Post-Training Quantization): 训练后量化。通过一小部分校准数据（Calibration）计算缩放因子（Scale）。
        + QAT (Quantization-Aware Training): 模拟量化训练。在训练过程中引入量化误差，让模型学会适应。效果最好但成本极高。
    + 结构化输出
        + Grammar Backend：利用 FSA 或 CFG 定义下一个 Token 的合法输出空间
        + Jump Forward：跳过一些确定的 Token，直接让模型去下一个需要推理的位置
+ 架构设计
    + Disaggregation：
        + PD 分离
        + EPD 分离：适用于 VLM，输入是多模态数据（Vision），因此 Encoding 耗时也变长。常见的选择是将 E 交给专门节点，后续结果再做正常 PD 分离
        + EPD 分离的传输压力：KV cache 量化或 Remote Direct Memory Access（RDMA）可以缓解这个问题
    + pending...
+ 生产运维
    + Profilling
        + Nsight Systems：NVIDIA 官方的性能分析工具，可以分析 GPU 计算和内存访问的详细情况，帮助识别瓶颈
            + GPU Timeline（时间线）： 观察 Kernel 执行、内存拷贝（HtoD/DtoH）在时间轴上的排布。
            + Kernel 重叠（Overlap）： 检查计算和通信（如分布式训练中的 All-Reduce）是否在并行执行。如果发现计算在等通信，这就是优化点。
            + CPU-GPU Gap： 检查是否存在 "CPU 发射延迟"。如果 CPU 逻辑太慢，导致 GPU 在空转等待任务，你会看到时间线上有很多空隙。
            + NVTX 标记： 这是一种在代码中手动埋点的方法。比如你用 nvtxRangePush("Attention") 标记一段代码，在分析图表中就能清晰看到"Attention"这一层耗时多久。
        + Nsight Compute：专注于 GPU 内核性能分析，提供更细粒度的指标，如每个周期的指令数、内存访问效率等
            + Speed-of-Light (SOL)： 告诉你这个 Kernel 达到了硬件理论上限的百分之多少。是 Compute SOL（计算满载）还是 Memory SOL（访存满载）？
            + Memory Chart（内存层级图）： 展示数据在显存（VRAM）、L2 Cache、L1/Shared Memory 之间的搬运效率。如果 L2 命中率低，说明访存模式不够局部化。
            + Warp Stall（线程束停顿原因）： 核心诊断指标。它会告诉你线程为什么卡住了？
                + Long Scoreboard: 等待显存数据返回（访存瓶颈）。
                + Math Pipe Throttle: 算术指令发射太快，计算单元忙不过来（计算瓶颈）。
                + Wait on Barrier: 线程同步（syncthreads()）太多导致等待。
            + Roofline Model（顶线模型）： 这是一个非常直观的坐标系，横坐标是计算密度（算力/访存比），纵坐标是性能。它能帮你一眼看出：这个算子是否已经优化到极限了？

pending...

## 考点速览

这一部分参考了[小红书-Saddss](https://www.xiaohongshu.com/explore/692688d2000000001e035fb6?xsec_token=CBTZmM_Abti8SrmgLDVL3OLvBZLtDlZrgL85KSUZCuvWI=)

### NVIDIA GPU 基础：

计算层级：
+ Thread：最小执行单元
+ Warp：32 个 Thread 组成一个 Warp，GPU 的调度单位，SIMT 是以 Warp 为单位进行指令调度的
+ Block：一组 Threads，共享 SRAM
+ Grid：多个 Blocks

Memory Hierarchy：
+ Registers：线程私有
+ SRAM：Block 内共享
+ L1 Cache：自动缓存
+ L2 Cache：全局共享
+ Global Memory（HBM）：即显存，所有线程可访问，最慢但容量大
+ 由于 GPU 算力恐怖，推理的瓶颈往往是 HBM 带宽，这也是为什么 Flash Attention 通过减少 HBM 访问来提升性能

Tensor Cores：专门做矩阵乘法的硬件单元，支持混合精度计算（如 FP16、INT8），大幅提升矩阵运算性能

TMA：Tensor Memory Access，用于高效搬运数据，通过异步 + pipeline 的形式，减少 CPU-GPU 之间的 memory stall

## RAG+对话系统

简要流程：
+ 用户请求：用户的请求通过 HTTP 进入 API 网关
+ Query 预处理：对用户请求进行清洗、分词、向量化等预处理
+ 向量检索：使用预训练的向量索引（如 Faiss）在知识库中检索相关文档
+ 上下文构造：将检索到的 Top-k 文档与系统 Prompt 以及用户请求一起构造成一个新的输入序列
+ LLM 生成：将构造好的输入序列送入 LLM，生成响应
+ 后处理、返回

有 RAG 的系统里，KV Cache 的优化会更难
+ 核心痛点：Context 很长，每次都不同，导致 prefill 成本巨大
+ 优化：
    + 控制 Context 长度，例如减小 k 
    + Context 压缩：利用小模型做摘要或 QA
    + Query-aware Filtering：减少无关的 Tokens





------

# 实习投递

已投：

同花顺 AI-infra（A-star）
+ HR 直接联系的，问想不想做 AI-infra
+ 3.31 一面，二对一，负责人不知为何以为我是来面 Java 后端的，一顿问（问了一大堆 Redis，我根本没背过，全都是模棱两可的回答的），答得很差...半小时后问我面的是 Java 后端吗，我人傻了，我说我是面 AI-infra，然后两个负责人对视一眼，问对 AI-infra 理解多少、有没有看过源码，最后问简历上的竞赛是什么（我惊呆了，大哥，A-star不是ACM金牌专项吗），我就随便介绍了一下。然后反问，我说您是 AI-infra 团队的负责人吗（因为我想 HR 都安排他们面 Java 后端候选人了），结果他说是的...然后介绍了一下他们团队做的事情，不过也只提了一两句（大部分训推少部分算子），然后就结束了，我还以为凉了，结果约了二面
+ 4.7 二面
+ 4.9 HR面

阿里 CPP 开发，大模型应用
+ 3.28 投
+ 小红书刷到 AI-infra 团队招人，联系了一下，看看会不会给直接拉进那边的流程

哔哩哔哩 AI 开发，CPP 开发
+ 3.28 投

字节 AI-infra，CPP 数据库
+ 3.28 投
+ 4.9 约一面，组：机器学习存储架构实习生 Data AML
+ 4.13 一面

美团 算法，后端
+ 3.28 投

拼多多 后端
+ 4.3 投
+ 4.7 性格测试

华为 AI-infra
+ 4.3 投（好像晚了，不过也不太敢去）

Kimi Engineering Product
+ 4.3 投

滴滴 后端
+ 4.3 投

网易游戏 AI，后端
+ 4.3 投

小红书 Agent
+ 4.3 投

京东 后端
+ 4.3 投

腾讯 后端
+ 4.3 投

快手 训推
+ 4.3 投

百度 AI-infra
+ 4.3 投

