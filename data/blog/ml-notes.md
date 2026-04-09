---
title: CMU 18661 Machine Learning | Notes
tags: [LectureNotes]
date: 2026-02-17
---

Notes for CMU-18661 Introduction to Machine Learning for Engineers.

## Lecture 1: Intro

[Link](https://www.andrew.cmu.edu/course/18-661/) to the course website.

- Homeworks (40%): Both math and programming problems
- Miniexams (15%): Two during the semester
- Midterm Exam (15%): Linear and Logistic Regression, Naive Bayes, SVMs (subject to change)
- Final Exam (25%): Everything else (Nearest Neighbors, Neural Networks, Decision Trees, Boosting, Clustering, PCA, etc.), plus pre-midterm topics (subject to change)
- Gradescope Quizzes (5%): Short multiple-choice question quizzes conducted in random (possibly all) lectures to encourage class attendance and attention. We will take the best 10 quiz scores.

## Lecture 2: MLE & MAP

Pending...

## Lecture 3-4: Linear Regression

### SVD Decomposition:

$$
A = U\Sigma V^{\top}
$$

$U\in\mathbb{R}^{m\times m}$ and $V\in\mathbb{R}^{n\times n}$ are orthogonal matrices

$\Sigma\in\mathbb{R}^{m\times n}$ is a diagonal matrix with singular values $\sigma_1\geq\sigma_2\geq\cdots\geq\sigma_r>0$ on the diagonal, where $r$ is the rank of $A$.

The squared singular values $\sigma_i^2$ are the eigenvalues of $A^{\top}A$ and $AA^{\top}$.

$V$ is the right singular vectors of $A$, as well as the eigenvectors of $A^{\top}A$.

$U$ is the left singular vectors of $A$, as well as the eigenvectors of $AA^{\top}$.

Proof:

$$
\begin{aligned}
A^{\top}A&=V\Sigma^{\top} U^{\top} U\Sigma V^{\top}\\
&=V\Sigma^{\top} \Sigma V^{\top}\\
&=V\begin{bmatrix}\sigma_1^2 & & \\
& \ddots & \\
& & \sigma_r^2\end{bmatrix}V^{\top}
\end{aligned}
$$

Similar for others.

### Linear Regression:

Setup:

+ Input: $\mathbf{x}\in\mathbb{R}^D$
+ Output: $y\in\mathbb{R}$
+ Model: $f(\mathbf{x})=w_0+\mathbf{w}^{\top}\mathbf{x}=\widetilde{\mathbf{w}}^{\top}\widetilde{\mathbf{x}}$
+ Training data: $\mathcal{D}=\{(\mathbf{x}_n,y_n)\}_{n=1}^N$

Residual Sum of Squares (RSS):

$$
\text{RSS}(\mathbf{\widetilde{w}})=\sum_{n=1}^N(y_n-\mathbf{\widetilde{w}}^{\top}\mathbf{\widetilde{x}}_n)^2
$$

For $D=1$:

$$
\begin{aligned}
\frac{\partial RSS}{\partial w_0} &= -2\sum_{n=1}^N\left(y_n-(w_0+w_1x_n)\right)=0\\
\frac{\partial RSS}{\partial w_1} &= -2\sum_{n=1}^N\left(y_n-(w_0+w_1x_n)\right)x_n=0\\
\therefore\sum y_n &= N w_0 + w_1 \sum x_n,\quad\sum y_n x_n = w_0 \sum x_n + w_1 \sum x_n^2\\
\therefore w_1^* &= \frac{\sum (x_n-\bar{x})(y_n-\bar{y})}{\sum (x_n-\bar{x})^2},\quad w_0^* = \bar{y} - w_1^* \bar{x}
\end{aligned}
$$

For $D>1$:

$$
\begin{aligned}
RSS(\widetilde{\mathbf{w}}) &= \sum_{n=1}^N (y_n - \widetilde{\mathbf{w}}^{\top} \widetilde{\mathbf{x}}_n)^2\\
&=\sum_n(y_n-\widetilde{\mathbf{w}}^{\top}\widetilde{\mathbf{x}}_n)(y_n-\widetilde{\mathbf{x}}_n^{\top}\widetilde{\mathbf{w}})\\
&=\sum_n(- 2 y_n \widetilde{\mathbf{w}}^{\top} \widetilde{\mathbf{x}}_n + \widetilde{\mathbf{w}}^{\top} \widetilde{\mathbf{x}}_n \widetilde{\mathbf{x}}_n^{\top} \widetilde{\mathbf{w}}) + \text{const}\\
&=\widetilde{\mathbf{w}}^{\top} \left(\widetilde{\mathbf{X}}^{\top}\widetilde{\mathbf{X}}\right) \widetilde{\mathbf{w}} - 2 \left(\widetilde{\mathbf{X}}^{\top}y\right) \widetilde{\mathbf{w}} + \text{const}\\
\text{Set}\quad\nabla_{\widetilde{\mathbf{w}}} RSS &= 2 \left(\widetilde{\mathbf{X}}^{\top}\widetilde{\mathbf{X}}\right) \widetilde{\mathbf{w}} - 2 \left(\widetilde{\mathbf{X}}^{\top}y\right) = 0\\
\text{Least Mean Squares solution}\quad\widetilde{\mathbf{w}}^{\text{LMS}} &= \left(\widetilde{\mathbf{X}}^{\top}\widetilde{\mathbf{X}}\right)^{-1} \left(\widetilde{\mathbf{X}}^{\top}y\right)
\end{aligned}
$$

### Why minimize RSS?

Noisy observation model:

$$
Y=w_0+w_1X+\eta,\quad \eta\sim\mathcal{N}(0,\sigma^2)\quad\rightarrow\quad Y\sim\mathcal{N}(w_0+w_1x,\sigma^2)
$$

Conditional Likelihood:

$$
P(y_n|\mathbf{x}_n) = \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(y_n - (w_0 + w_1 x_n))^2}{2\sigma^2}\right)
$$

Log-Likelihood of training data:

$$
\begin{aligned}
\log P(\mathcal{D})&=\log\prod_{n=1}^N P(y_n|\mathbf{x}_n)\\
&=\sum_{n=1}^N \log \frac{1}{\sqrt{2\pi}\sigma} \exp\left(-\frac{(y_n - w_0 - w_1 x_n)^2}{2\sigma^2}\right)\\
&=-\frac{N}{2}\log(2\pi\sigma^2) - \frac{1}{2\sigma^2} \sum_{n=1}^N (y_n - w_0 - w_1 x_n)^2\\
\end{aligned}
$$

Maximize over $w_0$ and $w_1$: $\max \log P(\mathcal{D})\leftrightarrow \min \text{RSS}$

+ This gives a solid footing to our intuition: minimizing $RSS(\widetilde{\mathbf{w}})$ is a sensible thing based on reasonable modeling assumptions.

Maximize over $\sigma^2$:

$$
\begin{aligned}
\frac{\partial \log P(\mathcal{D})}{\partial \sigma^2} &= -\frac{N}{2\sigma^2} + \frac{1}{2\sigma^4} \sum_{n=1}^N (y_n - w_0 - w_1 x_n)^2\\
&= -\frac{N}{2\sigma^2} + \frac{1}{2\sigma^4} \text{RSS}(\widetilde{\mathbf{w}})\\
\therefore \sigma^{2*} &= \frac{1}{N} \text{RSS}(\widetilde{\mathbf{w}})
\end{aligned}
$$

+ Estimating $\sigma^{2*}$ tells us how much noise there is in our predictions. For example, it allows us to place confidence intervals around our predictions.

### Gradient Descent Method:

pending...

## Lecture 5: Overfitting

Pending...

## Lecture 6: Naive Bayes

Naive Bayes:

$$
P(y|\mathbf{x}) = \frac{P(\mathbf{x}|y)P(y)}{P(\mathbf{x})}
$$

Spam example:

$$
\begin{aligned}
P(\mathbf{X}=\mathbf{x}, Y=c)&=P(Y=c)P(X=x|Y=c) \\
&=P(Y=c)\prod_{k=1}^K P(\text{word}_k|Y=c)^{x_k} \\
&=\pi_c\prod_{k=1}^K \theta_{c,k}^{x_k},
\end{aligned}
$$

where $\pi_c = P(Y = c)$ is the prior probability of class $c$, $x_k$ is the number of occurrences of the $k$th word, and $ \theta _{c,k} = P(\text{word }_k|Y = c) $ is the weight of the $k$th word for the $c$th class.

Training Data:

$$
\mathcal{D}=\{(\mathbf{x}_n,y_n)\}_{n=1}^N=\{(\{x_{n,k}\}_{k=1}^K,y_n)\}_{n=1}^N
$$

Goal:

Learn $\pi_c$ and $\theta_{c,k}$ from the training data $\mathcal{D}$.

Log-Likelihood:

$$
\begin{aligned}
\mathcal{L}(\pi, \theta) &= \sum_{n=1}^N \log P(\mathbf{x}_n, y_n)\\
&= \sum_{n=1}^N \log \left(\pi_{y_n} \prod_{k=1}^K \theta_{y_n,k}^{x_{n,k}}\right)\\
&= \sum_{n=1}^N \log \pi_{y_n} + \sum_{n=1}^N \sum_{k=1}^K x_{n,k} \log \theta_{y_n,k}
\end{aligned}
$$

Optimization:

Note that $\pi_c$ and $\theta_{c,k}$ can be optimized separately.

$$
\begin{aligned}
\pi_c^* &= \frac{N_c}{N}\quad\rightarrow\text{see Lecture 2}\\
\theta_{c,k}^* &= \frac{\sum_{n=1}^N x_{n,k} \mathbb{I}(y_n = c)}{\sum_{n=1}^N \sum_{k=1}^K x_{n,k} \mathbb{I}(y_n = c)}\\
&=\frac{\text{\# word k shows up in data for class c}}{\text{\# words shows up in data for class c}}\quad\rightarrow\text{see Lecture 2}
\end{aligned}
$$

Classification:

$$
\begin{aligned}
y^* &= \arg\max_c P(y=c|\mathbf{x})\\
&= \arg\max_c P(\mathbf{x}|y=c)P(y=c)\\
&= \arg\max_c \pi_c \prod_{k=1}^K \theta_{c,k}^{x_k}\\
&= \arg\max_c \log \pi_c + \sum_{k=1}^K x_k \log \theta_{c,k}
\end{aligned}
$$

Problem: if $\theta_{c,k}^* = 0$ for some $c$ and $k$, then any test document containing the $k$th word will be classified as not belonging to class $c$.

Solution: Laplace Smoothing

$$
\theta_{c,k}^* = \frac{\sum_{n=1}^N x_{n,k} \mathbb{I}(y_n = c) + \alpha}{\sum_{n=1}^N \sum_{k=1}^K x_{n,k} \mathbb{I}(y_n = c) + K\alpha}
$$

## Lecture 7: Logistic Regression

Recall for Naive Bayes:

$$
y^* = \arg\max_c \log \pi_c + \sum_{k=1}^K x_k \log \theta_{c,k}
$$

For binary classification, the label is based on the sign of

$$
\log\pi_1+\sum_{k=1}^K x_k \log \theta_{1,k} - \log\pi_2 - \sum_{k=1}^K x_k \log \theta_{2,k},
$$

which is a linear function of the input features $\mathbf{x}$.

### Logistic Regression:

Setup:

+ Input: $\mathbf{x}\in\mathbb{R}^D$
+ Output: $y\in\{0,1\}$
+ Training data: $\mathcal{D}=\{(\mathbf{x}_n,y_n)\}_{n=1}^N$
+ Model: $P(y=1|\mathbf{x})=\sigma(\mathbf{w}^{\top}\mathbf{x})=g(\mathbf{x})$, where $\sigma(z)=\frac{1}{1+e^{-z}}$ is the sigmoid function

Likelihood:

$$
\begin{aligned}
p(y_n|\mathbf{x}_n;\mathbf{w})&=g(\mathbf{x}_n)^{y_n}(1-g(\mathbf{x}_n))^{1-y_n}\\
\mathcal{L}(\mathbf{w})&=\prod_{n=1}^N p(y_n|\mathbf{x}_n;\mathbf{w})\\
\log \mathcal{L}(\mathbf{w})&=\sum_{n=1}^N \left(y_n \log g(\mathbf{x}_n) + (1-y_n) \log (1-g(\mathbf{x}_n))\right)
\end{aligned}
$$

We use the negative log-likelihood, which is also called the **cross-entropy loss**:

$$
\varepsilon(\mathbf{w}) = -\log \mathcal{L}(\mathbf{w}) = -\sum_{n=1}^N \left(y_n \log g(\mathbf{x}_n) + (1-y_n) \log (1-g(\mathbf{x}_n))\right)
$$

Gradient:

$$
\begin{aligned}
\frac{d\sigma(z)}{dz} &= \sigma(z)(1-\sigma(z))\\
\therefore \nabla_{\mathbf{w}} \varepsilon(\mathbf{w}) &= -\sum_{n=1}^N \left(y_n \frac{1}{g(\mathbf{x}_n)} \nabla_{\mathbf{w}} g(\mathbf{x}_n) + (1-y_n) \frac{-1}{1-g(\mathbf{x}_n)} \nabla_{\mathbf{w}} g(\mathbf{x}_n)\right)\\
&=-\sum_{n=1}^N \left(y_n \frac{1}{g(\mathbf{x}_n)} - (1-y_n) \frac{1}{1-g(\mathbf{x}_n)}\right) \nabla_{\mathbf{w}} g(\mathbf{x}_n)\\
&=-\sum_{n=1}^N \left(y_n \frac{1}{g(\mathbf{x}_n)} - (1-y_n) \frac{1}{1-g(\mathbf{x}_n)}\right) g(\mathbf{x}_n)(1-g(\mathbf{x}_n)) \mathbf{x}_n\\
&=-\sum_{n=1}^N \left(y_n - g(\mathbf{x}_n)\right) \mathbf{x}_n\\
&=\sum_{n=1}^N \left(g(\mathbf{x}_n) - y_n\right) \mathbf{x}_n,
\end{aligned}
$$

where $\left(g(\mathbf{x}_n) - y_n\right)$ is the training error for the $n$th training example.

Training:

pending... (page 31)

### Non-linear Decision Boundary:

Solution: High-dimensional feature space (which increases the risk of overfitting, so we need to) add regularization.

### Classification Metric:

+ True Positive (TP): number of positive examples correctly classified as positive
+ False Positive (FP): number of negative examples incorrectly classified as positive
+ True Negative (TN): number of negative examples correctly classified as negative
+ False Negative (FN): number of positive examples incorrectly classified as negative
+ Sensitivity (Recall): $\frac{TP}{TP + FN}$, the proportion of positive examples that are correctly classified as positive
+ Specificity: $\frac{TN}{TN + FP}$, the proportion of negative examples that are correctly classified as negative
+ Precision: $\frac{TP}{TP + FP}$, the proportion of positive predictions that are correct

**Receiver Operating Characteristic (ROC) Curve:** plots the true positive rate (sensitivity) against the false positive rate (1-specificity) at various threshold settings.

**AUROC:** the area under the ROC curve, which measures the overall performance of a binary classifier. A higher AUROC indicates better performance, with a value of $1$ representing a perfect classifier and a value of $0.5$ representing a random classifier.

## Lecture 8: Multiclass Logistic Regression

Solution: Softmax of Sigmoid

## Lecture 9-10: Support Vector Machines (SVM)

Advantages of SVM

1. Maximizes distance of training points from the boundary.
2. Only requires a subset of the training points.
3. Is less sensitive to outliers.
4. Scales better with high-dimensional data.
5. Generalizes well to many nonlinear models.

Idea: Maximize the margin between the decision boundary and the training points.

Distance from a point $\mathbf{x}$ to the decision boundary $\mathbf{w}^{\top}\mathbf{x} + w_0 = 0$:

$$
d_{\mathcal{H}}(\mathbf{x}) = \frac{|\mathbf{w}^{\top}\mathbf{x} + w_0|}{\|\mathbf{w}\|_2}
$$

To remove the absolute value, we use $y = +1$ to represent positive label and $y = -1$ for negative label, then we have $(\mathbf{w}^{\top}\mathbf{x} + w_0)$ and the label $y$ must have the same sign. So we get

$$
\begin{aligned}
d_{\mathcal{H}}(\mathbf{x}) = \frac{y(\mathbf{w}^{\top}\mathbf{x} + w_0)}{\|\mathbf{w}\|_2}\\
\text{MARGIN}(\mathbf{w}, w_0) = \min_{n} d_{\mathcal{H}}(\mathbf{x}_n)
\end{aligned}
$$

To solve the SVM, we want to **maximize** the margin.

We can **scale** $\mathbf{w}$ and $w_0$ by any positive constant without changing the decision boundary, so we can set $\text{MARGIN}(\mathbf{w}, w_0) = 1$, which gives us the following optimization problem:

$$
\max_{\mathbf{w}, w_0} \text{MARGIN}(\mathbf{w}, w_0) = \max_{\mathbf{w}, w_0} \frac{1}{\|\mathbf{w}\|_2} \quad\text{s.t.}\quad y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0) \geq 1, \forall n
$$

Which is further equivalent to:

$$
\min_{\mathbf{w}, w_0} \frac{1}{2}\|\mathbf{w}\|_2^2 \quad\text{s.t.}\quad y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0) \geq 1, \forall n
$$

SVM is called a max margin (or large margin) classifier. The constraints are called large margin constraints.

### Soft Margin SVM:

Problem: Not fully linear separable data?

Solution: Slack variable

$$
\xi_n \geq 0 \quad\text{s.t.}\quad y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0) \geq 1 - \xi_n, \forall n
$$

Which gives us the following optimization problem:

$$
\begin{aligned}
\min_{\mathbf{w}, w_0, \xi} \frac{1}{2}\|\mathbf{w}\|_2^2 + C \sum_{n=1}^N \xi_n \quad\text{s.t.}\quad &y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0) \geq 1 - \xi_n, \forall n\\
&\xi_n \geq 0, \forall n
\end{aligned}
$$

Where $C$ is a hyperparameter that controls the trade-off between maximizing the margin and minimizing the classification error (same idea as the regularization parameter in logistic regression).

Hinge Loss Form:

We want to extract the slack variable $\xi_n$ from the constraints, which gives us:

$$
y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0) \geq 1 - \xi_n \leftrightarrow \xi_n \geq \max(0, 1 - y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0))
$$

By setting $\lambda = \frac{1}{C}$, we can rewrite the optimization problem as:

$$
\min_{\mathbf{w}, w_0} \sum_{n=1}^N \max(0, 1 - y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0)) + \frac{\lambda}{2}\|\mathbf{w}\|_2^2
$$

The first term is called the **hinge loss**. This can be optimized using gradient descent. There is no penalty for points that are correctly classified and outside the margin, a linear penalty for points that are correctly classified but inside the margin, and a linear penalty for points that are misclassified.

### Dual Form:

Optimization problem:

$$
\begin{aligned}
\min_{\mathbf{w}, w_0} \sum_{n=1}^N \max(0, 1 - y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0)) + \frac{\lambda}{2}\|\mathbf{w}\|_2^2
\end{aligned}
$$

Restrictions (canonical form):

$$
\begin{aligned}
-\xi_n &\leq 0, \forall n\\
1-y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0) - \xi_n &\leq 0, \forall n
\end{aligned}
$$

Lagrangian:

$$
\begin{aligned}
\mathcal{L}(\mathbf{w}, w_0, {\xi_n}, {\alpha_n}, {\lambda_n}) &= C\sum_{n=1}^N \xi_n + \frac{1}{2}\|\mathbf{w}\|_2^2 + \sum_{n=1}^N \lambda_n (-\xi_n) + \sum_{n=1}^N \alpha_n (1 - y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0) - \xi_n)\\
\end{aligned}
$$

under the constraints $\alpha_n \geq 0$ and $\lambda_n \geq 0$ for all $n$.

Goal: $\min_{\mathbf{w}, w_0, \xi_n} \max_{\alpha_n \geq 0, \lambda_n \geq 0}\mathcal{L}(\mathbf{w}, w_0, {\xi_n}, {\alpha_n}, {\lambda_n})$

Idea: If we break the constraints, then the unlimited $\alpha_n$ and $\lambda_n$ will make the Lagrangian go to infinity.

$$
\begin{aligned}
\frac{\partial \mathcal{L}}{\partial \mathbf{w}} &= \mathbf{w} - \sum_{n=1}^N \alpha_n y_n \mathbf{x}_n = 0 &\rightarrow \mathbf{w} = \sum_{n=1}^N \alpha_n y_n \mathbf{x}_n\\
\frac{\partial \mathcal{L}}{\partial w_0} &= -\sum_{n=1}^N \alpha_n y_n = 0 &\rightarrow \sum_{n=1}^N \alpha_n y_n = 0\\
\frac{\partial \mathcal{L}}{\partial \xi_n} &= C - \lambda_n - \alpha_n = 0 &\rightarrow \lambda_n = C - \alpha_n\rightarrow \alpha_n \leq C
\end{aligned}
$$

Features:

+ Independent of the size d of x: **SVM scales better for high-dimensional features.**
+ May seem like a lot of optimization variables when N is large, but many of the $\alpha_n$ become zero. $\alpha_n$ is non-zero only if the nth point is a support vector. **SVM only depends on a subset of the training points (support vectors).**

$\alpha_n<C$ only when $\xi_n=0$, pending... (page 62)

Learning:

$$
\mathbf{w} = \sum_{n=1}^N \alpha_n y_n \mathbf{x}_n
$$

For $(\mathcal{x}_n,y_n)$ such that $0<\alpha_n<C$, we have

$$
\begin{aligned}
y_n(\mathbf{w}^{\top}\mathbf{x}_n + w_0) &= 1\\
w_0 &= y_n - \mathbf{w}^{\top}\mathbf{x}_n\\
&= y_n - \sum_{m=1}^N \alpha_m y_m \mathbf{x}_m^{\top} \mathbf{x}_n
\end{aligned}
$$

### Kernel SVM:

Similar to the linear regression case, we can use a non-linear basis function $\phi(\mathbf{x})$ to map the input features into a higher-dimensional space. The optimization problem becomes:

$$
\begin{aligned}
\mathcal{L} &= C\sum_{n=1}^N \xi_n + \frac{1}{2}\|\mathbf{w}\|_2^2 + \sum_{n=1}^N \lambda_n (-\phi(\xi_n)) + \sum_{n=1}^N \alpha_n (1 - y_n(\mathbf{w}^{\top}\phi(\mathbf{x}_n) + w_0) - \xi_n)\\
&=\frac{1}{2}||\mathbf{w}||_2^2 - \sum \alpha_n y_n \mathbf{w}^{\top} \phi(\mathbf{x}_n) + \sum \alpha_n\quad\text{(Other terms sum up to zero)}\\
&=\sum \alpha_n -\frac12 \sum_{i,j} \alpha_i \alpha_j y_i y_j \phi(\mathbf{x}_i)^{\top} \phi(\mathbf{x}_j)\quad\text{(Substitute $\mathbf{w}=\sum \alpha_n y_n \phi(\mathbf{x}_n)$)}\\
&=\sum \alpha_n -\frac12 \sum_{i,j} \alpha_i \alpha_j y_i y_j k(\mathbf{x}_i, \mathbf{x}_j)\quad\text{(Define $k(\mathbf{x}_i, \mathbf{x}_j) = \phi(\mathbf{x}_i)^{\top} \phi(\mathbf{x}_j)$)}
\end{aligned}
$$

where $k(\mathbf{x}_i, \mathbf{x}_j)$ is called the **kernel function**. 

$k$ is a valid kernel function if it is symmetric and positive semi-definite. Some popular examples:

+ Dot product kernel: $k(\mathbf{x}_i, \mathbf{x}_j) = \mathbf{x}_i^{\top} \mathbf{x}_j$
+ Dot product with positive-definite matrix: $k(\mathbf{x}_i, \mathbf{x}_j) = \mathbf{x}_i^{\top} A \mathbf{x}_j$
+ Polynomial kernel: $k(\mathbf{x}_i, \mathbf{x}_j) = (\mathbf{x}_i^{\top} \mathbf{x}_j + 1)^d,d\in\mathbb{Z}^+$
+ Radial basis function (RBF) kernel: $k(\mathbf{x}_i, \mathbf{x}_j) = \exp(-\gamma \|\mathbf{x}_i - \mathbf{x}_j\|^2),\gamma>0$

Note that we do not need to know the explicit form of $\phi(\mathbf{x})$ to compute $k(\mathbf{x}_i, \mathbf{x}_j)$, which allows us to work with very high-dimensional feature spaces without incurring a large computational cost. This is called the **kernel trick**.

But how do we predict?

$$
\begin{aligned}
y &= \text{sign}(\mathbf{w}^{\top}\phi(\mathbf{x}) + w_0)\\
&=\text{sign}\left(\sum_{n=1}^N \alpha_n y_n
\phi(\mathbf{x}_n)^{\top} \phi(\mathbf{x}) + w_0\right)\\
&=\text{sign}\left(\sum_{n=1}^N \alpha_n y_n k(\mathbf{x}_n, \mathbf{x}) + w_0\right)
\end{aligned}
$$

## Lecture 11: Nearest Neighbors

Two crucial choices for NN

+ Choosing $K$ , i.e., the number of nearest neighbors (default is $1$)
+ Choosing the right distance measure: Euclidean distance, $L_1$ or $L_p$ distance, feature scaling, ...
+ In practice, these are hyper parameters that need to be tuned by a validation dataset or cross validation.
+ When $K$ increases, the decision boundary becomes smoother and less susceptible to outliers (i.e. lower variance).

pending...

## Lecture 12: Decision Trees

Learning a Tree Model, things to learn:
+ The structure of the tree.
+ The split rule at each node.
    + Which feature to consider?
    + What is the threshold $\theta_i$ ?
    + What about categorical features?
+ The predicted values for the leaves.

First split: use Information Gain

If a random variable $Y$ takes $K$ different values, $a_1, a_2, \ldots, a_K$, then its entropy is

$$
H(Y) = -\sum_{k=1}^K p(a_k) \log p(a_k)
$$

where $p(a_k)$ is the probability of $Y$ taking the value $a_k$.

Conditional entropy of $Y$ given $X$:

$$
H(Y|X) = \sum_{x} p(x) H(Y|X=x)
$$

Information Gain:

$$
\text{IG}(X; Y) = H(Y) - H(Y|X)
$$

Measures the reduction in entropy (i.e., the reduction of uncertainty in $Y$) when we also consider $X$.

For continuous features, Information Gain:

$$
\text{IG}(X; Y) = H(Y) - H(Y|\text{whether }X \leq \theta)
$$

Strategies to avoid overfitting:
+ Stop growing when data split is not statistically significant.
+ Acquire more training data.
+ Remove irrelevant attributes (manual process: not always possible).
+ Grow full tree, then post-prune.
+ Use tree ensembles (random forest, boosting, to be covered next lecture).

## Lecture 13: Midterm Exam

No content.

## Lecture 14: Ensemble Methods

Motivation:
+ Shallow trees have low variance (don’t overfit) but high bias (underfit).
+ Can we combine several shallow trees to reduce bias (without sacrificing variance)?
+ Deep trees have low bias, but high variance.
+ Can we combine several deep trees to reduce variance (without sacrificing bias)?

Bagging (random forests): train each tree on a random subset of the training data
+ Limitation of Bagging: If one or more features are very informative, they will be selected first by every tree in the bag, which increases the correlation between the trees (thus harms our goal of creating "random variation" in the training process to reduce variance).
+ Key Idea behind Random Forests: Reduces correlation between trees.

Boosting: train each tree on a re-weighted version of the training data, where the weights are updated based on the performance of the previous tree.
+ Initialize weights $w_1(n) = \frac{1}{N}$ for every training sample $n$
+ For $t = 1$ to $T$ (number of rounds, hyperparameter):
1. Train a weak classifier $h_t(x)$ using weights $w_t(n)$, by minimizing

$$\epsilon_t = \sum_{n} w_t(n) 1[y_n \neq h_t(x_n)]$$

(the weighted classification error)
2. Compute contribution for this classifier: $\beta_t = \frac{1}{2} \log \frac{1 - \epsilon_t}{\epsilon_t}$ (smaller $\epsilon_t$, larger error, larger $\beta_t$)
3. Update weights on each training sample $n$

$$w_{t+1}(n) \propto w_t(n) e^{-\beta_t y_n h_t(x_n)}$$

($w_t(n)$ decreased if $y_n = h_t(x_n)$; increased if $y_n \neq h_t(x_n)$) and normalize them such that $\sum_{n} w_{t+1}(n) = 1$.
+ Output the final classifier:

$$H(x) = \text{sign}\left(\sum_{t=1}^T \beta_t h_t(x)\right)$$

Why this works? pending...

## Lecture 15-17: Neural Networks



## Lecture 18: PyTorch

No content.

## Lecture 19: Distributed Synchronous SGD

