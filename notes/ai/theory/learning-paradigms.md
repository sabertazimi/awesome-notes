---
sidebar_position: 5
tags: [AI, ML, Theory, Supervised, Unsupervised, SelfSupervised, Reinforcement]
---

# Learning Paradigms

## Supervised Learning

### Regression

Output a scalar:

- Linear regression:
  $y=Wx+b=\sum\limits_{i=1}^n{w_ix_i}+b$,
  $L=\sum\limits_{i=1}^n(y_i-\hat{y}_i)^2$.
- Polynomial regression:
  $y=\sum\limits_{i=1}^n{w_ix^i}+b$.
- Logistic regression (output probability):
  $y=\sigma(Wx+b)=\frac{1}{1+e^{-\sum\limits_{i=1}^n{w_ix_i}-b}}$,
  $L=-\sum\limits_{i=1}^n{y_i\log(\hat{y}_i)}$.

If model can't even fit training data,
then model have large bias (underfitting).
If model can fit training data but not testing data,
then model have large variance (overfitting).

#### Underfitting

To prevent underfitting, we can:

- Add more features as input.
- Use more complex and flexible model.

#### Overfitting

More complex model does not always lead to better performance
on testing data or new data.

| Model | Training Error | Testing Error |
| :---: | -------------: | ------------: |
|  $x$  |           31.9 |          35.0 |
| $x^2$ |           15.4 |          18.4 |
| $x^3$ |           15.3 |          18.1 |
| $x^4$ |           14.9 |          28.2 |
| $x^5$ |           12.8 |         232.1 |

A extreme example,
such function obtains $0$ training loss, but large testing loss:

$$
\begin{align*}
  f(x)=\begin{cases}
    y_i, & \exists{x_i}\in{X} \\
    \text{random}, & \text{otherwise}
  \end{cases}
\end{align*}
$$

To prevent overfitting, we can:

- More training data.
- Data augmentation: crop, flip, rotate, cutout, mixup.
- Constrained model:
  - Less parameters, sharing parameters.
  - Less features.
  - Early stopping.
  - Dropout.
  - Regularization.

$$
\begin{split}
  L(w)&=\sum\limits_{i=1}^n(y_i-\hat{y}_i)^2+\lambda\sum\limits_{i=1}^n{w_i^2}\\
  w_{t+1}&=w_t-\eta\nabla{L(w)}\\
  &=w_t-\eta(\frac{\partial{L}}{\partial{w}}+\lambda{w_t})\\
  &=(1-\eta\lambda)w_t-\eta\frac{\partial{L}}{\partial{w}}
  \quad (\text{Regularization: Weight Decay})
\end{split}
$$

### Classification

- Binary classification:
  $y=\delta(Wx+b)$,
  $L=\sum\limits_{i=1}^n\delta(y_i\ne\hat{y}_i)$,
  e.g. spam filtering.
- Multi-class classification:
  $y=\text{softmax}(Wx+b)$,
  $L=-\sum\limits_{i=1}^n{y_i\log(\hat{y}_i)}$,
  e.g. document classification.
- Non-linear model:
  - Deep learning: $y=\text{softmax}(\text{ReLU}(Wx+b))$,
    e.g. image recognition, game playing.
  - Support vector machine (SVM): $y=\text{sign}(Wx+b)$.
  - Decision tree: $y=\text{vote}(\text{leaves}(x))$.
  - K-nearest neighbors (KNN): $y=\text{vote}(\text{neighbors}(x))$.

### Structured Learning

#### Training

Find a function $F$:

$$
F:X\times{Y}\to{R}
$$

$F(x, y)$ evaluates how well $y$ fits $x$ (object compatible).

#### Inference

Given an object $x$:

$$
\tilde{y}=\arg\max\limits_{y\in{Y}}F(x, y)
$$

![Structured Learning](./figures/learning/structured-learning.png 'Structured Learning')

:::tip[Three Problems]

- Evaluation: what does $F(X, y)$ look like.
- Inference: how to solve $\arg\max$ problem.
- Training: how to find $F(x, y)$ with given training data.

:::

#### Structured Linear Model

$$
\begin{split}
  F(x, y)&=\sum\limits_{i=1}^n{w_i\phi_i(x, y)} \\
  &=\begin{bmatrix}w_1\\w_2\\w_3\\\vdots\\w_n\end{bmatrix}\cdot
    \begin{bmatrix}\phi_1(x, y)\\\phi_2(x, y)\\\phi_3(x, y)\\\vdots\\\phi_n(x, y)\end{bmatrix}\\
  &=W\cdot\Phi(x, y)
\end{split}
$$

## Unsupervised Learning

### Principal Component Analysis

主成分分析 (PCA) 是一种常用的数据降维方法, 将 $m$ 个 $n$ 维向量降为 $k$ 维,
其目标是选择 $k$ 个单位 (模为 $1$) 正交基, 使得原始数据变换到这组基上后,
各字段两两间协方差为 $0$ (各字段完全独立), 各字段的方差尽可能大 (各字段降维后分布尽可能分散),
即在正交的约束下, 取最大的 $k$ 个方差:

$$
\begin{equation}
  C=\frac{1}{m}XX^T=\frac{1}{m}\begin{bmatrix}
    \sum_{i=1}^m(x_i^1)^2&\sum_{i=1}^m{x_i^1x_i^2}&\dots&\sum_{i=1}^m{x_i^1x_i^n}\\
    \sum_{i=1}^m{x_i^2x_i^1}&\sum_{i=1}^m(x_i^2)^2&\dots&\sum_{i=1}^m{x_i^2x_i^n}\\
    \vdots&\vdots&\ddots&\vdots\\
    \sum_{i=1}^m{x_i^nx_i^1}&\sum_{i=1}^m{x_i^nx_i^2}&\dots&\sum_{i=1}^m(x_i^n)^2
  \end{bmatrix}
\end{equation}
$$

协方差矩阵 $C$ 是一个对称矩阵, 其对角线分别为各字段的方差,
其第 $i$ 行 $j$ 列和第 $j$ 行 $i$ 列元素相同, 表示 $i$ 和 $j$ 两个字段的协方差.
将协方差矩阵对角化, 得到基于矩阵运算的 PCA 算法如下:

- 将原始数据按列组成 $n$ 行 $m$ 列矩阵 $X$.
- 将 $X$ 的每一行 (代表一个属性字段) 进行零均值化, 即减去这一行的均值,
  使得 $\bar{x}=0$, 方便方差与协方差的计算.
- 求出协方差矩阵 $C=\frac{1}{m}XX^T$ 的特征值及对应的特征向量.
- 将特征向量按对应特征值大小从上到下按行排列成矩阵, 取前 $k$ 行组成矩阵 $P$.
- $Y=PX$ 即为降维到 $k$ 维后的数据.

:::tip[Normalization]

$$
x'_i=\frac{x_i-\mu}{\sigma}
$$

:::

### Word Embedding

词嵌入是自然语言处理 (NLP) 中的一种技术,
将词汇映射到实数向量空间, 使得词汇之间的语义关系可以通过向量空间中的距离来表示.

### Variational Auto-Encoders

变分自编码器 (VAEs) 是一种生成模型, 通过学习数据的潜在分布来生成新的数据:

$$
\begin{split}
  Z&=\text{Encoder}(X) \\
  X'&=\text{Decoder}(Z) \\
  L&=\text{Min Loss}(X',X)
\end{split}
$$

变分自动编码器学习的是隐变量 (特征) $Z$ 的概率分布, $z\sim N(0, I), x|z\sim N\big(\mu(z), \sigma(z)\big)$,
通过深度网络来学习 $q(z|x)$ 的参数, 一步步优化 $q$ 使其与 $p(z|x)$ 十分相似, 便可用它来对复杂的分布进行近似的推理:

- Feature disentangle:
  voice conversion.
- Discrete representation:
  unsupervised classification, unsupervised summarization.
- Anomaly detection:
  face detection, fraud detection, disease detection, network intrusion detection.
- Compression and decompression.
- Generator.

![Variational Auto-Encoders](./figures/learning/variational-auto-encoders.webp 'Variational Auto-Encoders')

### Generative Adversarial Networks

生成对抗网络 (GANs) 由两个网络组成: 生成器 (Generator) 和判别器 (Discriminator).
生成器的目标是生成尽可能逼真的数据, 判别器的目标是尽可能准确地区分真实数据和生成数据.
两个网络相互对抗, 生成器生成数据 (decoder in VAE), 判别器判断数据真伪 ($1/0$ classification neural network),
生成器根据判别器的判断结果调整生成数据的策略, 不断提升生成数据的逼真程度.

$$
\begin{split}
G^*&=\arg\min_G\max_DV(G,D)\\
D^*&=\arg\max_DV(D,G)
\end{split}
$$

![Generative Adversarial Networks](./figures/learning/generative-adversarial-networks.png 'Generative Adversarial Networks')

## Self-supervised Learning

Pre-trained models + fine-tuning (downstream tasks):

- Cross lingual.
- Cross discipline.
- Pre-training with artificial data.
- Long context window.

### Pre-trained Models

#### Pre-trained Data

- Content filtering: 去除有害内容.
- Text extraction: 去除 HTML 标签.
- Quality filtering: 去除低质量内容.
- Document deduplication: 去除重复内容.

#### BERT

BERT (Bidirectional Encoder Representations from Transformers) 是一种 Encoder-only 预训练模型,
通过大规模无监督学习, 学习文本的语义信息, 用于下游任务的微调:

- Masked token prediction: 随机遮挡输入文本中的一些词, 预测被遮挡的词.
- Next sentence prediction: 预测两个句子的顺序关系.

![Bidirectional Encoder Representations from Transformers](./figures/learning/bert.png 'Bidirectional Encoder Representations from Transformers')

#### GPT

GPT (Generative Pre-trained Transformers) 是一种 Decoder-only 预训练模型.

### Fine-tuning

#### BERT Adapters

[![BERT Adapters](./figures/learning/bert-adapters.png)](https://ieeexplore.ieee.org/document/10023274)

#### Low-Rank Adaptation

低秩适配 (LoRA) 是一种参数高效微调技术 (Parameter-efficient Fine-tuning),
其基本思想是冻结原始矩阵 $W_0\in\mathbb{R}^{H\times{H}}$,
通过低秩分解矩阵 $A\in\mathbb{R}^{H\times{R}}$ 和 $B\in\mathbb{R}^{H\times{R}}$
来近似参数更新矩阵 $\Delta{W}=A\cdot{B^T}$,
其中 $R\ll{H}$ 是减小后的秩:

$$
\begin{equation}
  W=W_0+\Delta{W}=W_0+A\cdot{B^T}
\end{equation}
$$

在微调期间, 原始的矩阵参数 $W_0$ 不会被更新,
低秩分解矩阵 $A$ 和 $B$ 则是可训练参数用于适配下游任务.
LoRA 微调在保证模型效果的同时, 能够显著降低模型训练的成本.

#### Instruction-tuning

Make model can understand human instructions not appear in training data:

[![Instruction-tuning](./figures/learning/instruction-tuning.png)](https://iclr.cc/virtual/2022/7102)

- 提高指令复杂性和多样性能够促进模型性能的提升.
- 更大的参数规模有助于提升模型的指令遵循能力.

## Reinforcement Learning

强化学习是一种机器学习方法, 通过智能体与环境交互,
智能体根据环境的反馈调整策略, 利用梯度上升算法 (Gradient Ascent),
最大化长期奖励 (learn from rewards and mistakes).

![Reinforcement Learning](./figures/learning/reinforcement-learning.gif 'Reinforcement Learning')

$$
\begin{equation}
\begin{split}
  \theta^*&=\arg\max\limits_\theta\bar{R}_\theta=\arg\max\limits_\theta\sum\limits_{\tau}R(\tau)P(\tau|\theta)\\
  \theta_{t+1}&=\theta_t+\eta\nabla\bar{R}_\theta\\
  \nabla\bar{R}_\theta&=\begin{bmatrix}\frac{\partial\bar{R}_\theta}{\partial{w_1}}\\\frac{\partial\bar{R}_\theta}{\partial{w_2}}\\\vdots\\\frac{\partial\bar{R}_\theta}{\partial{b_1}}\\\vdots\end{bmatrix}\\
  R_t&=\sum\limits_{n=t}^N\gamma^{n-t}r_n
\end{split}
\end{equation}
$$

### Actor-Critic Model

![Actor-Critic Model](./figures/learning/actor-critic-model.png 'Actor-Critic Model')

### Inverse Reinforcement Learning

![Inverse Reinforcement Learning](./figures/learning/inverse-reinforcement-learning.png 'Inverse Reinforcement Learning')
