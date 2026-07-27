---
title: 从策略梯度到PPO
pubDate: '2026-01-25'
category: 'RL'
tags: ['RL']
---

## 策略梯度

相较于值函数方法，策略梯度方法直接显式建模策略，而不是通过值函数来间接构造策略。同时它也直接优化策略，而不是通过优化值函数来间接优化策略。

具体来说，策略梯度方法显式建模策略 $\pi(\theta)$，并直接优化该策略。优化目标为该策略下的状态价值最大化，故目标函数为：

$$
J(\theta) = \mathbb{E}_{s_0}[V^{\pi_\theta}(s_0)]
$$

其中：

- $s_0$ 为初始状态
- $V^{\pi_\theta}(s_0)$ 为策略 $\pi_\theta$ 在状态 $s_0$ 下的价值

故该式的优化方式为梯度上升。但将该式写为轨迹形式：

$$
J(\theta) = \int p_\theta(\tau) \, R(\tau) \, d\tau
$$

即对于策略下轨迹的奖励进行累加或者积分，可以得到：

$$
\nabla_\theta J(\theta) = \int \nabla_\theta p_\theta(\tau) \cdot R(\tau) \, d\tau
$$

但该式存在直接求积分不可行的问题，无法有效求解。假如能将其变成更易获得的估计项，使用 **Log-Derivative Trick**，将 $\nabla_\theta p_\theta(\tau)$ 变为：

$$
\nabla_\theta p_\theta(\tau) = p_\theta(\tau) \cdot \nabla_\theta \log p_\theta(\tau)
$$

在该变换下，原式变为：

$$
\int \underbrace{p_\theta(\tau)}_{\text{概率密度}} \cdot \underbrace{\nabla_\theta \log p_\theta(\tau) \cdot R(\tau)}_{\text{函数 } g(\tau)} \, d\tau = \mathbb{E}_{\tau \sim p_\theta}\left[\nabla_\theta \log p_\theta(\tau) \cdot R(\tau)\right]
$$

像一开始的目标函数变换到它的轨迹形式的逆过程，我们能将它变成一个函数的期望。该期望可由采样估计，同时其内部的 $p_\theta(\tau)$ 和 $\nabla_\theta \log p_\theta(\tau)$ 一个可由 rollout 获取，一个只需要反向传播。于是参数更新公式为：

$$
\theta \leftarrow \theta + \alpha \cdot \nabla_\theta J(\theta)
$$

当确定了策略网络的目标函数和参数更新方式之后，我们就需要一个采样估计的方式。最简单的是蒙特卡洛估计，它的优势是不需要价值估计，因为价值直接由真实环境奖励的折扣获得，同时它的估计偏差小；劣势是该方式只适用于有限时域问题且估计方差大。

对于无限时域问题，因为没有可结束的 episode，无法使用蒙特卡洛估计来估计价值。经典算法为 REINFORCE，除此之外还可以采用基于时间差分学习的价值估计或者优势估计方法。它的优势是可适用于无限时域问题并且估计方差小，但劣势是估计偏差大，经典算法如 actor-critic 模型。

actor-critic 模型使用一个单独的 critic 网络或者头来估计状态价值，所以对于该网络或者该头，它的目标函数与更新公式与策略网络不一致，具体此处不展开。

## TRPO

策略梯度中，梯度是对目标函数的**局部线性近似**。如果一步更新太大，新参数 $\theta'$ 远离 $\theta$，这个近似就不再成立，实际性能 $J(\theta')$ 可能急剧下降（performance collapse）。而且一旦崩溃，新策略很差，采到的数据质量也差，很难恢复。

TRPO 通过 KL 散度约束

$$
D_{KL}(\pi_{\theta_{\text{old}}} \| \pi_\theta) \leq \delta
$$

**限制每步更新的幅度**，保证新策略不会偏离旧策略太远，从而改善策略改进，使它不那么容易崩溃。
