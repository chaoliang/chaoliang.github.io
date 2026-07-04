# DateTally — 程序化 SEO 日期计算器站 设计文档

日期：2026-07-04
目标：在没有销售资源/粉丝/流量的前提下，为站长产生可持续被动收入。

## 背景与约束

- 用户没有任何销售渠道、粉丝或流量来源。
- 用户是个人开发者（中国大陆），可用的收款通道有限：
  - Google AdSense 支持向中国大陆银行账户电汇付款（成熟通道）。
  - Stripe 不支持大陆个人；Etsy 新卖家开店受限。
- 结论：唯一不依赖"卖"的变现模式是 **搜索流量 + 广告**。流量由 Google 送上门。

## 备选方案对比

| 方案 | 流量来源 | 收款可行性 | 首笔收入时间 | 决策 |
|------|----------|------------|--------------|------|
| A. 程序化 SEO 工具站 + AdSense | Google 搜索 | ✅ 电汇到国内银行 | 1–4 个月 | **选定** |
| B. Etsy 数字模板 | Etsy 站内搜索 | ⚠️ 大陆开店/收款不确定 | 数天–数周 | 放弃 |
| C. Chrome 扩展 freemium | Chrome 商店 | ❌ Stripe 不可用 | — | 放弃 |

## 产品定义

**DateTally** — 英文日期计算工具站。目标长尾关键词族：

1. `N days from today`（N=1..365）— 每天有海量搜索（签证、退货期、疗程、合同期限）
2. `N business days from today`（N=1..90）— 商业意图强，竞争弱于普通日期查询
3. `days until <holiday/event>`（约 35 个美国/国际节日）
4. 交互工具页：days between dates、age calculator
5. `/guides/` 5 篇 800–1200 词原创文章（提高 AdSense 过审率与 E-E-A-T）
6. 法务页：about / privacy / terms / contact（AdSense 硬性要求）

总计约 500 个静态页面。

## 架构

零依赖 Node 构建脚本 → 纯静态 HTML → GitHub Pages 托管 → GitHub Actions 每日 cron 重建（保证"today"相关数字新鲜）→ 客户端 JS 兜底实时校正数字。

```
site.config.json      # 域名/品牌配置（换域名只改这里）
build.js              # 构建编排：生成页面、sitemap.xml、robots.txt
lib/dates.js          # 日期数学（UTC 安全）：加减天、工作日、复活节、ISO 周
lib/holidays.js       # 节日/事件数据（固定日期 + 规则计算 + 农历查表）
lib/html.js           # 布局、head、FAQ JSON-LD、广告位、相关链接组件
pages/*.js            # 每类页面一个生成器（home/days-from-today/business/until/tools/guides/legal）
public/styles.css     # 设计令牌 + 样式（Swiss 风格）
public/app.js         # 交互计算器 + 数字实时校正（<8KB，无依赖）
test/dates.test.js    # node:test 单元测试
.github/workflows/deploy.yml  # 每日 06:00 UTC 重建并部署 Pages
docs/运营手册.md       # 中文上线运营手册
```

## 关键设计决策

- **数字新鲜度**：静态 HTML 内嵌构建日数字（SEO 可索引），元素带 `data-*` 属性，`app.js` 在客户端按访客本地日期重算覆盖 → 即使某天 CI 没跑，用户看到的数字也正确。
- **日期数学全部用 UTC 正午锚点**，避免 DST/时区导致的差一天 bug。
- **每页实质内容**：答案大数字 + 星期几 + 周/月分解 + 工作日数 + ISO 周 + 3-4 条独立 FAQ（JSON-LD）+ 相关链接 → 降低"薄内容"风险。
- **广告位**：固定高度占位容器（防 CLS），上线过审后粘贴 AdSense 代码即可。
- **性能预算**：microsite 标准，JS < 10KB gzip，无外部字体/请求，系统字体栈。
- **视觉方向**：Swiss/International 工具风——纸白底、近黑墨色、单一强调色（钴蓝）、超大等宽数字、明确的 hover/focus 态。不用模板化卡片网格。

## 错误处理

- 构建脚本任何页面生成失败 → 整个构建失败退出（CI 不会部署坏站点）。
- 客户端 JS 全部包在 try/catch，失败时保留静态数字（渐进增强）。

## 测试

- `node --test`：日期库单测（闰年、工作日跨周末、复活节已知年份、ISO 周边界）。
- 本地构建 + HTTP 预览 + 320/768/1440 截图检查无溢出。

## 变现与上线路径（详见运营手册）

1. 买域名（唯一必要开销，约 $10/年）→ GitHub 仓库 + Pages 部署
2. Google Search Console 提交 sitemap
3. 有一定索引后申请 AdSense；过审后贴代码 + ads.txt
4. 收入预期（诚实）：SEO 需要 2–6 个月爬坡；同类站点成熟期月流量 5 万–50 万 PV，AdSense RPM $1–5，对应月收入 $50–$2500。不保证结果，但边际成本≈0，值得长期持有。

## 后续扩展（v2，不在本期）

- `N weeks/months from today` 页面族
- 更多国家节假日日历（per-country working days）
- 西班牙语/葡萄牙语版本（低竞争）
