---
title: CMU 18661 Machine Learning | Notes
tags: [LectureNotes]
date: 2026-02-17
background: background-1.jpg
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

### Maximum Likelihood Estimation (MLE)

Goal: Find the parameter $\theta$ that maximizes the likelihood of the observed data $\mathcal{D}$.

$$
P(\mathcal{D}|\theta) = \prod_{n=1}^N P(x_n|\theta)
$$

Question: Given this model and the observed data, what is the most likely value of $\theta$?

$$
\hat{\theta}_{MLE} = \arg\max_{\theta} P(\mathcal{D}|\theta)
$$

### Bayesian Learning

Question: How to incorporate prior knowledge?

Bayes's Rule:

$$
P(\theta|\mathcal{D}) = \frac{P(\mathcal{D}|\theta)P(\theta)}{P(\mathcal{D})}
$$

where $P(\theta)$ is the prior distribution over $\theta$, $P(\mathcal{D}|\theta)$ is the likelihood of the data given $\theta$, and $P(\mathcal{D})$ is the marginal likelihood of the data, which is independent of $\theta$. Therefore,

$$
P(\theta|\mathcal{D}) \propto P(\mathcal{D}|\theta)P(\theta)
$$

### Maximum A Posteriori Estimation (MAP)

$$
\hat{\theta}_{MAP} = \arg\max_{\theta} P(\theta|\mathcal{D}) = \arg\max_{\theta} P(\mathcal{D}|\theta)P(\theta)
$$

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

### Probabilistic Interpretation of Linear Regression:

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

### Gradient Descent Method

$$
\text{Least Mean Squares solution}\quad\widetilde{\mathbf{w}}^{\text{LMS}} = \left(\widetilde{\mathbf{X}}^{\top}\widetilde{\mathbf{X}}\right)^{-1} \left(\widetilde{\mathbf{X}}^{\top}y\right)
$$

Directly solving this costs $O(ND^2+D^3)$ time, where $D$ is the number of features and $N$ is the number of training examples:
+ $O(ND^2)$ for $X^\top X$
+ $O(D^3)$ for matrix inversion
+ $O(ND)$ for $X^\top y$
+ $O(D^2)$ for matrix multiplication

(Batch) Gradient Descent:

$$
\mathbf{w}^{(t+1)} = \mathbf{w}^{(t)} - \eta \nabla RSS(\mathbf{w}^{(t)})
$$

Complexity: $O(ND)$ per iteration

Stochastic Gradient Descent (SGD):

Instead of computing the gradient over the entire dataset, we can compute the gradient using a single training example (or a mini-batch of training examples)

Complexity: $O(D)$ per iteration

### Feature Scaling:

To avoid too large/small feature values, we can scale the features:
+ Min-Max Scaling: $x' = \frac{x - \min(x)}{\max(x) - \min(x)}\quad x'\in [0,1]$
+ Mean normalization: $x' = \frac{x - \bar{x}}{\max(x) - \min(x)} \quad x'\in [-1,1]$

### Ridge Regression:

Problem: $X^{\top}X$ may be non-invertible when $D > N$ or when there are redundant features.

Solution: Add a regularization term to the loss function:

$$
\mathbf{w} = (X^\top X + \lambda I)^{-1} X^\top y
$$

This is equivalent to adding an extra term to $RSS(\mathbf{w})$:

$$
\text{Ridge Loss}(\mathbf{w}) = RSS(\mathbf{w}) + \frac12 \lambda \|\mathbf{w}\|_2^2
$$

because

$$
\nabla_{\mathbf{w}} \text{Ridge Loss} = 2 X^\top X \mathbf{w} - 2 X^\top y + \lambda \mathbf{w} = 0 \leftrightarrow (X^\top X + \lambda I) \mathbf{w} = X^\top y
$$

### Probabilistic Interpretation of Ridge Regression:

Idea: Place a prior on our weights
+ $Y \sim \mathcal{N}(\mathbf{w}^\top X, \sigma_0^2)$ is a Gaussian random variable (as before)
+ $\mathbf{w}_d \sim \mathcal{N}(0, \sigma^2)$ are i.i.d. Gaussian random variables (**unlike before**)
+ Note that all $\mathbf{w}_d$ share the same variance $\sigma^2$
+ To find $\mathbf{w}$ given data $\mathcal{D}$, compute the posterior distribution of $\mathbf{w}$:
$$
p(\mathbf{w}|\mathcal{D}) = \frac{p(\mathcal{D}|\mathbf{w})p(\mathbf{w})}{p(\mathcal{D})} \propto p(\mathcal{D}|\mathbf{w})p(\mathbf{w})
$$

Maximum a posterior (MAP) estimate:

$$
\mathbf{w}^{MAP} = \arg\max_{\mathbf{w}} p(\mathbf{w}|\mathcal{D}) = \arg\max_{\mathbf{w}} p(\mathcal{D}|\mathbf{w})p(\mathbf{w})
$$

$$
\begin{aligned}
\log p(\mathcal{D}|\mathbf{w}) &= \sum_n \log p(y_n|\mathbf{x_n},\mathbf{w}) + \sum_d \log p(w_d) \\
&=-\frac{\sum_n(y_n - \mathbf{x_n}^\top \mathbf{w})^2}{2\sigma_0^2} - \sum_d \frac{1}{2\sigma^2} w_d^2 + \text{const}\\
\mathbf{w}^{MAP} &= \arg\max_{\mathbf{w}} \log p(\mathcal{D}|\mathbf{w})\\
&=\arg\min_{\mathbf{w}} \sum_n (y_n - \mathbf{x_n}^\top \mathbf{w})^2 + \frac{\sigma_0^2}{\sigma^2}||\mathbf{w}||_2^2
\end{aligned}
$$

Define $\lambda = \frac{\sigma_0^2}{\sigma^2}$, the form is the same as the ridge regression loss function.

With $\lambda\rightarrow 0$, we trust our data more, and $\mathbf{w}^{MAP}\rightarrow \mathbf{w}^{LMS}$.

In contrast, with $\lambda \rightarrow \infty$, the variance of noise is far greater than what our prior model can allow for $\mathbf{w}$. In this case, our prior model on $\mathbf{w}$ will force $\mathbf{w}$ to be close to zero. Numerically, $\mathbf{w}^{MAP} \rightarrow 0$.

## Lecture 5: Overfitting

As a model increases in complexity:
+ Training error keeps reducing
+ Validation error may first reduce but eventually increase

### Deal with overfitting:
+ Use more training data
+ Reduce the number of features
+ Add a regularization term
    + Force the model to be simpler
    + E.g. Linear regression to ridge regression

### Cross-validation:
+ Split the training data into $k$ folds
+ Train on $k-1$ folds and validate on the remaining fold
+ Repeat for each fold and average the results

### Bias-Variance Trade-off:

High Bias: Model is not rich enough to fit the training dataset and achieve low training loss

High Variance: If the training dataset changes slightly, the model changes a lot

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

$\alpha_n<C$ only when $\xi_n=0$

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

## Lecture 15-17: Neural Networks

### Binary Logistic Regression:

Binary Logistic Regression serves as the simplest form of a neural network (a single neuron).

+ Model: $\sigma(\mathbf{w}^\top\mathbf{x} + b) = \frac{1}{1 + e^{-(\mathbf{w}^\top\mathbf{x} + b)}}$
+ A single-layer perceptron (Linear Classifier) cannot solve the XOR problem because the data is not linearly separable.

### Multi-Layer Neural Networks (MLP):

A Multi-Layer Perceptron (MLP) consists of an input layer, one or more hidden layers, and an output layer.
+ Structure: Inputs are transformed via weights and biases, passed through non-linear activation functions, and propagated forward.
+ Purpose: To approximate complex, non-linear functions that a single neuron cannot capture.

### Activation Functions:

Activation functions introduce non-linearity, allowing the network to learn complex patterns.

| Layer Type | Role | Typical Activations |
| --- | --- | --- |
| Input Layer | Initial feature transformation. | Linear, Sigmoid, Tanh |
| Hidden Layer | Converts inputs into "classification features." | Highly problem dependent! (ReLU, Leaky ReLU) |
| Output Layer | Produces the final classification decision. | Softmax (Multi-class), Sigmoid (Binary) |

+ Sigmoid / Tanh: Traditional choices, but prone to the vanishing gradients problem
    + Gradients become near-zero for large/small inputs, halting learning
+ Hard Sigmoid / Hard Tanh: Computationally cheaper linear approximations of their smooth counterparts.
+ Rectified Linear Units (ReLU): $f(z) = \max(0, z)$. Solves vanishing gradients for positive inputs and promotes sparsity.
+ Generalized ReLU: Includes variants like Leaky ReLU ($f(z) = \max(\alpha z, z)$) or PReLU, which prevent "dead neurons" by allowing a small gradient when $z < 0$.

| Function | Output Range | Use Case |
| --- | --- | --- |
| Softmax | $(0, 1)$, sum to $1$ | Multi-class probability distribution. |
| Sigmoid | $(0, 1)$ | Binary classification probability. |
| Tanh | $(-1, 1)$ | Zero-centered outputs, often for internal representations. |
| ReLU | $[0, \infty)$ | Regression or hidden layer feature extraction. |

---

### Loss Functions

+ Least squares: commonly used for regression tasks, measuring the average squared difference between estimated values and the actual value.

$$
\text{MSE} = \frac{1}{N} \sum_{n=1}^N (y_n - \hat{y}_n)^2
$$

+ Cross-Entropy Loss: preferred for classification, measuring the performance of a classification model whose output is a probability value between 0 and 1.

$$
\text{Cross-Entropy} = -\sum_{n=1}^N \sum_{c=1}^C y_{n,c} \log(\hat{y}_{n,c})
$$

### Back-propagation

The process of updating parameters $\textbf{w}$ and $b$ through these steps:
+ Step 1: Forward-propagate to find the output $z_k$ in terms of the input (the feed-forward signals).
+ Step 2: Calculate output error $E$ by comparing the predicted output $z_k$ to its true value $t_k$.
+ Step 3: Back-propagate $E$ by weighting it by the gradients of the associated activation functions and the weights in previous layers.
+ Step 4: Calculate the gradients $\frac{dE}{d\textbf{w}}$ and $\frac{dE}{db}$ for the parameters $\textbf{w}$, $b$ at each layer based on the backpropagated error signal and the feedforward signals from the inputs.

### Optimization and SGD

+ Mini-batch Gradient Descent: using a small subset of data to calculate gradients for faster convergence.
+ Learning rate decay: reducing the step size over time to settle into a local minimum.
+ Momentum: accelerating SGD in the relevant direction and dampening oscillations.
+ Nesterov Momentum: a look-ahead version of momentum for better stability.
+ Adam: adaptive moment estimation that computes individual adaptive learning rates for different parameters.

## Lecture 18: PyTorch

No content.

## Lecture 19: Distributed Synchronous SGD

### Stochastic Gradient Descent Convergence:

A $c$-strongly convex function $f$ satisfies:

$$
f(\mathbf{y}) \geq f(\mathbf{x}) + \nabla f(\mathbf{x})^{\top} (\mathbf{y} - \mathbf{x}) + \frac{c}{2} \|\mathbf{y} - \mathbf{x}\|_2^2, \forall \mathbf{x}, \mathbf{y}
$$

A $L$-smooth function $f$ satisfies:

$$
f(\mathbf{y}) \leq f(\mathbf{x}) + \nabla f(\mathbf{x})^{\top} (\mathbf{y} - \mathbf{x}) + \frac{L}{2} \|\mathbf{y} - \mathbf{x}\|_2^2, \forall \mathbf{x}, \mathbf{y}
$$

For a $c$-strongly convex and $L$-smooth function, if the learning rate $\eta \leq \frac{1}{L}$, after $t$ iterations, we have

$$
F(\mathbf{w}_t) - F(\mathbf{w}^*) \leq \left(1 - \eta c\right)^t (F(\mathbf{w}_0) - F(\mathbf{w}^*))
$$

which gives $t=O(\log (\frac{1}{\epsilon}))$ to reach $\epsilon$-accuracy.

### Mini-Batch Gradient Descent Convergence:

Assumptions:
+ Unbiased Gradient: $\mathbb{E}_{\xi}[\nabla f(\mathbf{w}; \xi)] = \nabla F(\mathbf{w})$
+ Bounded Variance: $Var(\nabla f(\mathbf{w}; \xi)) \leq \sigma^2$
    + For a mini-batch of size $b$, the variance of the gradient is reduced to $\frac{\sigma^2}{b}$.

For a $c$-strongly convex and $L$-smooth function, if the learning rate $\eta \leq \frac{1}{L}$, after $t$ iterations, we have

$$
\mathbb{E}[F(\mathbf{w}_t) - F(\mathbf{w}^*)] - \frac{\eta L \sigma^2}{2c b} \leq \left(1 - \eta c\right)^t (F(\mathbf{w}_0) - F(\mathbf{w}^*) - \frac{\eta L \sigma^2}{2c b})
$$

where $\frac{\eta L \sigma^2}{2c b}$ is the error floor due to the variance of the stochastic gradient.

Key optimization idea: learning rate decay.

### Distributed Synchronous SGD:

Each worker computes the gradient on its own mini-batch and sends it to the parameter server.

Assumptions:
+ $m$ workers, each with a mini-batch of size $b$, so the total mini-batch size is $mb$.
+ Unbiased Gradient: $\mathbb{E}_{\xi}[\nabla f(\mathbf{w}; \xi)] = \nabla F(\mathbf{w})$
+ Bounded Variance: $Var(\nabla f(\mathbf{w}; \xi)) \leq \sigma^2$, $Var(\frac{1}{m} \sum_{i=1}^m \nabla f(\mathbf{w}; \xi_i)) \leq \frac{\sigma^2}{mb}$

Error floor: $\frac{\eta L \sigma^2}{2c mb}$

Trade-off: runtime.

### Distributed Synchronous SGD, Runtime:

Exponential Random Variable $x$: $f_X(x) = \lambda e^{-\lambda x}, x \geq 0$
+ Mean: $\mathbb{E}[x] = \frac{1}{\lambda}$
+ Variance: $Var(x) = \frac{1}{\lambda^2}$
+ Memoryless property: $P(x > s + t | x > s) = P(x > t)$

Order Statistics:
+ Suppose we have $n$ i.i.d. random variables $X_1, X_2, \ldots, X_n$
+ Order statistics are obtained by ordering the random variables: $X_{1:n}\leq X_{2:n} \leq \ldots \leq X_{n:n}$, where $X_{k:n}$ is the $k$-th smallest random variable, called the $k$-th order statistic.

For exponential random variables:
+ Consider $X_1, X_2, \ldots, X_n$ i.i.d. exponential random variables with parameter $\mu$.
+ What is $\mathbb{E}[X_{1:n}]$?
    + $\Pr(X_{1:n} > x) = \Pr(X_1 > x)^n = (e^{-\mu x})^n = e^{-n\mu x}$
    + Therefore, $X_{1:n}$ is also an exponential random variable with parameter $n\mu$, and $\mathbb{E}[X_{1:n}] = \frac{1}{n\mu}$.
+ What is $\mathbb{E}[X_{n:n}]$?
    + First timer runs out in $\mathbb{E}[X_{1:n}] = \frac{1}{n\mu}$ time.
    + Recall the memoryless property of exponential random variables.
    + Thus, after the first timer runs out, it is as if you started the remaining $n-1$ timers from scratch.
    + $\mathbb{E}[X_{n:n}] = \mathbb{E}[X_{1:n}] + \mathbb{E}[X_{n-1:n-1}] = \frac{1}{n\mu} + \frac{1}{(n-1)\mu} + \ldots + \frac{1}{\mu} \approx \frac{\log n}{\mu}$

### Asynchronous SGD:

Each worker asynchronously does the following:
1. Pulls the current version $\mathbf{w}_t$ of the model
2. Computes a mini-batch gradient $g(\mathbf{w}_t)$ and sends it to the PS
Each time the PS receives a gradient $g(\mathbf{w}_{\tau(t)})$ where $\tau(t) < t$ from a
worker it updates the model as
$\mathbf{w}_{t+1} = \mathbf{w}_t - \eta g(\mathbf{w}_{\tau(t)}; \xi_i)$

Compare to synchronous SGD:
+ Faster runtime
+ But higher error floor

### Local Updates:

Each worker does $\tau$ local updates before sending the gradient to the PS

### Covergence of Local SGD:

Assumptions:
+ $L$-smooth
+ Unbiased Gradient
+ Bounded Variance
$$
\mathrm{Var}(g(\mathbf{w}; \xi)) \leq \frac{\sigma^2}{b}
$$
$$
\mathbb{E}_{\xi}[\|g(\mathbf{w}; \xi)\|^2] \leq \|\nabla F(\mathbf{w})\|^2 + \frac{\sigma^2}{b}
$$
+ Bounded Objective
$$
F(\mathbf{w}) \ge F_{inf}, \forall \mathbf{w}
$$

For a $L$-smooth function, if $\eta L+\eta^2L^2\tau(\tau-1) \leq 1$, after $t$ iterations, we have

$$
\mathbb{E}\left[\frac{1}{t} \sum_{k=1}^{t} \|\nabla F(\mathbf{w}_k)\|^2\right] \leq \frac{2(F(\mathbf{w}_0) - F_{inf})}{\eta t} + \frac{\eta L\sigma^2}{mb} + \frac{\eta^2 L^2 \sigma^2 (\tau - 1)}{b}
$$

We are not assuming strong convexity above — that is why the left hand side is the average of gradients rather than the optimality gap.

For non-convex functions we can only show convergence towards $F_{inf}$ of the objective function rather than the true optimum $F^*$.

The model converges to a stationary point but not (necessarily) a global minimum.

## Lecture 20-22: Clustering

### K-Means:

$$
J = \sum_{n=1}^N \sum_{k=1}^K r_{nk} \|\mathbf{x}_n - \boldsymbol{\mu}_k\|_2^2
$$

+ Initialize: Pick $k$ random points as cluster centers, $\mu_1,\dots,\mu_k$
+ Alternate:
    + Assign data points to closest cluster center in $\mu_1,\dots,\mu_k$
        + $r_{nk} = 1$ if $k = \arg\min_j \|\mathbf{x}_n - \boldsymbol{\mu}_j\|_2^2$, else $r_{nk} = 0$
    + Change each cluster center to the average of its assigned points
        + $\boldsymbol{\mu}_k = \frac{\sum_{n=1}^N r_{nk} \mathbf{x}_n}{\sum_{n=1}^N r_{nk}}$
+ Stop: When the clusters are stable

### Gaussian Mixture Models (GMM):

Model each region (cluster) with a distinct distribution

Density function:

$$
p(\mathbf{x}) = \sum_{k=1}^K \omega_k \mathcal{N}(\mathbf{x}|\boldsymbol{\mu}_k, \Sigma_k)
$$

where
+ $K$ is the number of clusters
+ $\mu_k$ and $\Sigma_k$ are the mean and covariance of the $k$-th Gaussian component
+ $\omega_k$ is the mixture weight (or prior) representing how much each component contributes to final distribution.
    + $\omega_k \geq 0$ for all $k$ and $\sum_{k=1}^K \omega_k = 1$

Training: Expectation-Maximization (EM) algorithm

Alternate between estimating $r_{nk}$ and computing parameters
+ Initialize $\omega_k$, $\boldsymbol{\mu}_k$, $\Sigma_k$ for $k=1,\dots,K$
+ E-step: Estimate $r_{nk} = p(z_n = k | \mathbf{x}_n)$ using Bayes rule
+ M-step: Update parameters using the current $r_{nk}$ and MLE

GMMs vs. K-Means:
+ K-Means (often called hard GMM) is a simpler, more straightforward method, but might not be as accurate because of deterministic clustering
+ GMMs can be more accurate, as they model more information (soft clustering, variance), but can be more expensive to compute

Applications of EM:
+ EM is a general method to deal with hidden data; we have studied it in  the context of hidden labels (unsupervised learning). Common applications include:
+ Filling in missing data in a sample
+ Discovering the value of latent model variables
+ Estimating parameters of finite mixture models
+ As an alternative to direct maximum likelihood estimation

## Lecture 23: PCA

### Principal Component Analysis (PCA):

Goal: Find a better representation of data

PCA Formulation:
+ $\mathbf{X}$ is the raw data of $n\times d$.
+ $\mathbf{P}$ is the projection matrix of $d\times k$.
+ $\mathbf{Z} = \mathbf{X}\mathbf{P}$ is the reduced representation of $n\times k$.

+ Zero-center the data: $\mathbf{x}_i \leftarrow \mathbf{x}_i - \frac{1}{n} \sum_{i=1}^n \mathbf{x}_i$
+ Compute the covariance matrix: $\mathbf{C}_\mathbf{X} = \frac{1}{n} \mathbf{X}^T \mathbf{X}$

$$
\begin{aligned}
\mathbf{C}_{\mathbf{Z}} &= \frac{1}{n} \mathbf{Z}^T \mathbf{Z}\\
&= \frac{1}{n} (\mathbf{X}\mathbf{P})^T (\mathbf{X}\mathbf{P})\\
&= \frac{1}{n} \mathbf{P}^T \mathbf{X}^T \mathbf{X} \mathbf{P}\\
&= \mathbf{P}^T \mathbf{C}_{\mathbf{X}} \mathbf{P}
\end{aligned}
$$

Goal: We want $P$ to be the $k$ directions with the largest variance, i.e. the $C_{Z}$ should be the "largest": Eigenvalue Decomposition.

$$
\mathbf{C}_{\mathbf{X}} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^T
$$

where
+ $\Lambda=\text{diag}(\lambda_1, \lambda_2, \ldots, \lambda_d)$ is a diagonal matrix with eigenvalues $\lambda_1 \geq \lambda_2 \geq \ldots \geq \lambda_d$ on the diagonal.
+ $Q = [\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_d]$ is an orthogonal matrix whose columns are the corresponding eigenvectors $\mathbf{v}_1, \mathbf{v}_2, \ldots, \mathbf{v}_d$.

How to choose $k$?
+ For visualization: $k=2$ or $k=3$.
+ For dimensionality reduction: choose $k$ such that $\frac{\sum_{i=1}^k \lambda_i}{\sum_{i=1}^d \lambda_i} \geq 0.95$ (i.e., we want to retain at least 95 percent of the variance).

### Independent Component Analysis (ICA):

Goal: Find a better representation of data by maximizing the statistical independence of the components.

Example (Cocktail Party Problem): We have $n$ people talking in a room, and we have $m$ microphones that record the mixed signals. We want to recover the original signals of each person.

ICA Formulation:
+ $\mathbf{X}$ is the observed data of $d\times n$ (each column is a data point).
+ $\mathbf{S}$ is the hidden source signals of $d\times n$ (each column is a data point).
+ $\mathbf{A}$ is the mixing matrix of $d\times d$.

$$
\mathbf{X} = \mathbf{A} \mathbf{S}
$$

Goal: We want to find a matrix $\mathbf{W}$ such that $\mathbf{Y} = \mathbf{W} \mathbf{X} \approx \mathbf{S}$.

Applications:
+ Image denoising
+ Face recognition
+ Feature extraction
+ Clustering, classification, DNN
+ Timeseries applications (e.g. cocktail party problem)

## Lecture 24: Online Learning & Multiple Arm Bandits

### Online Learning:

Online learning occurs when we do not have access to our entire training dataset when we start training

Issue: No full feedback.
+ E.g. Online advertising: we only know the appeal of the ad shown. We have no idea if we were right about the appeal of other ads.
+ We can only observe the loss.

Objective: Minimize Regret

$$
R(T) = \sum_{t=1}^T [l(x_t, y_t, \beta_t) - l(x_t, y_t, \beta^*)]
$$

### Multiple Arm Bandits:

We have $K$ arms, each with an unknown reward distribution. We want to maximize our total reward over $T$ rounds.

High level idea: We want to balance exploration and exploitation
+ Exploration: We want to try out different arms to learn about their reward distributions.
+ Exploitation: We want to pull the arm that we currently believe has the highest reward.

Regret:

$$
R(T) = T \rho^* - \mathbb{E}\left[\sum_{t=1}^T r(i_t)\right]
$$

(explanation: $T$ times highest expected reward minus the actual reward we get)

### Epsilon-Greedy Algorithm:

The idea is to exploit the best arm, but explore a random arm $\epsilon$ fraction of the time.

Empirical average reward of arm $i$: $r(i)=$ Total reward from arm $i$ in the past $/$ Number of times arm $i$ was pulled in the past.

With probability $1-\epsilon$, pull the arm with the highest empirical average reward (exploitation). With probability $\epsilon$, pull a random arm (exploration).

### Upper Confidence Bound (UCB1) Algorithm:

The idea is to always pull the "best" arm, where "best" includes exploitation and exploration.

$$
UCB_i= r(i) + \sqrt{\frac{2 \log T}{T_i}}
$$

where $r(i)$ is the empirical average reward of arm $i$, $T$ is the total number of rounds, and $T_i$ is the number of times arm $i$ has been pulled.

### Thompson Sampling:

+ Define a prior $p_i\sim \text{Beta}(\alpha_i, \beta_i)$ for each arm $i$.
+ For each arm $i$, sample $p_i$ from the prior distribution.
+ Pull the arm with the highest expected reward $\tilde p_i=\mathbb{E}[r_i|p_i]$.
+ Update $\text{Beta}(\alpha_i, \beta_i)$ based on the reward received.
    + $\alpha_i \leftarrow \alpha_i + r(i)$
    + $\beta_i \leftarrow \beta_i + (1 - r(i))$

## Lecture 25-26: Reinforcement Learning

### Reinforcement Learning:

In Reinforcement Learning, an agent interacts with an environment in discrete time steps.
+ Action: $a_t$ is the action taken by the agent at time $t$.
+ State: $s_t$ is the state of the environment at time $t$.
+ Reward: $r_t$ is the reward received by the agent at time $t$.
+ After the agent takes action $a_t$ in state $s_t$, the environment transitions to a new state $s_{t+1}$ and the agent receives a reward $r_t$ and also observes the new state $s_{t+1}$.

Objective:

$$
R(T)=\sum_{t=0}^T\mathbb{E}[r(a(t), s(t))]
$$

$$
R(\infty) = \sum_{t=0}^\infty \gamma^t \mathbb{E}[r(a(t), s(t))]
$$

where $\gamma \in [0, 1)$ is the discount factor that determines the importance of future rewards.

A policy $\pi$ is a mapping from states to actions, given the current state, tells the agent which action to take.
+ Deterministic policy: $\pi(s) = a$
+ Stochastic policy: $\pi(a|s) = P(a|s)$

Markov property: The state evolution is memoryless (depends only on the values of the current state).

### Bellman Equations:

$$
\begin{aligned}
V(s) &= \mathbb{E}[\sum_{t=0}^\infty \gamma^t r_t | s_0 = s]\\
&= \mathbb{E}[r(s)] + \gamma \mathbb{E}_{s'\sim P(s_1|s_0=s)}[V(s')]
\end{aligned}
$$

Matrix form:

$$
\begin{aligned}
V &= r + \gamma P V\\
&= (I - \gamma P)^{-1} r
\end{aligned}
$$

Bellman Equations for MDP:

$$
\begin{aligned}
V_\pi(s) &= \sum_{a\in \mathcal{A}} \pi(a|s) Q_\pi(a, s)\\
Q_\pi(a, s) &= \mathbb{E}[r(s, a)] + \gamma \sum_{s'\in \mathcal{S}} P(s'|s, a) V_\pi(s')\\
\implies V_\pi(s) &= \mathbf{E}[r(s)] + \gamma \sum_{a\in \mathcal{A}} \pi(a|s) \sum_{s'\in \mathcal{S}} P(s'|s, a) V_\pi(s')
\end{aligned}
$$

+ From $V$ to $Q$: The total value for state $s$ is the expected value of the action values $Q_\pi(a, s)$ weighted by the policy $\pi(a|s)$.
+ From $Q$ to $V$: The action value $Q_\pi(a, s)$ is the expected reward for taking action $a$ in state $s$ plus the discounted expected value of the next state $s'$.

### Updating the Value Function:

Value Iteration:

$$
\begin{aligned}
Q(a, s) &\leftarrow \mathbb{E}[r(s, a)] + \gamma \sum_{s'\in \mathcal{S}} P(s'|s, a) \max_{a'} Q(a', s')\\
V(s) &\leftarrow \max_{a} Q(a, s)
\end{aligned}
$$

Policy Iteration:

$$
\begin{aligned}
\text{Policy Evaluation: } & V(s) \leftarrow \sum_{a\in \mathcal{A}} \pi(a|s) \left( \mathbb{E}[r(s, a)] + \gamma \sum_{s'\in \mathcal{S}} P(s'|s, a) V(s') \right)\\
\text{Policy Improvement: } & \pi(a|s) \leftarrow \arg\max_{a'} \left( \mathbb{E}[r(s, a')] + \gamma \sum_{s'\in \mathcal{S}} P(s'|s, a') V(s') \right)
\end{aligned}
$$

Q-Learning:

+ Problem: In real-world applications, we often do not have access to the transition probabilities $P(s'|s, a)$, therefore knowing $V(s)$ does not help us to compute $Q(a, s)$.
+ Solution: We can directly learn $Q(a, s)$.
    + Initialize $Q(a, s)$ arbitrarily (e.g., $Q(a, s) = 0$ for all $a, s$).
    + For each step, we take an action $a$ ($\epsilon$-greedy), and observe the reward $r$ and the new state $s'$.
    + Update $Q(a, s)$ using the observed reward and the maximum $Q$ value of the new state $s'$, assume the future actions are all optimal:

$$
Q(a, s) \leftarrow (1-\alpha) Q(a, s) + \alpha \left( r(s, a) + \gamma \max_{a'} Q(a', s') \right)
$$

