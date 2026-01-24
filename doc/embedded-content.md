---
title: '嵌入内容'
pubDate: '2025-06-06'
category: '教程'
tags: ['嵌入', '媒体']
---

使用以下指令嵌入媒体内容：

```
::link{url="https://xxxxx.xxx"}

::spotify{url="https://open.spotify.com/type/xxxxx"}

::youtube{url="https://www.youtube.com/watch?v=xxxxx"}

::bilibili{url="https://www.bilibili.com/video/xxxxx"}

::github{repo="username/repo"}

::x{url="https://x.com/username/status/xxxxx"}

::neodb{url="https://neodb.social/category/xxxxx"}
```

```
🟡

当嵌入内容仍在加载时，
目录定位可能不准确。
```

## 链接卡片

::link{url="https://pitchfork.com/reviews/albums/ichiko-aoba-luminescent-creatures/"}

```
🟡

如果你不需要链接卡片功能，
可以在 `src/config.ts` 中将 `linkCard` 设置为 `false`，
这样在构建前就不需要设置 adapter 了。
```

## Spotify

::spotify{url="https://open.spotify.com/track/41Y0ch6R3jzpJOZv6nhf9Z?si=6c82dbed65ab4853"}

::spotify{url="https://open.spotify.com/album/1kBPEN3NIVwjdmIjjNk9vB?si=Lz29MvjwRnKX9y3dhxlbaQ"}

## YouTube

::youtube{url="https://www.youtube.com/embed/GlhV-OKHecI?si=KdB4rRPLAMEK-ozf"}

## BiliBili

::bilibili{url="https://www.bilibili.com/video/BV1Vm421W7pX/?vd_source=c0bc2746a6d2b23de50d26376498b2ff"}

## GitHub

::github{repo="the3ash/astro-chiri"}

## X 推文

::x{url="https://x.com/DAVID_LYNCH/status/1174367510893752321"}

## NeoDB

::neodb{url="https://neodb.social/album/5nD3R8gmnVlsoOBdyO8PA3"}

::neodb{url="https://neodb.social/movie/1bhogjXkNnlWWM0bf6aj8P"}

::neodb{url="https://neodb.social/book/4BqQ5mhfKMHPND3L6hf0Qh"}

::neodb{url="https://neodb.social/game/1hl18l0qD5UN93k8ZkCZ7Q"}
