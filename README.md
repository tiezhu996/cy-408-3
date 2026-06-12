# 内推关系管理工具

内推关系管理工具是一款 Electron 桌面应用，用于管理联系人、内推记录、人脉图谱和跟进提醒，数据保存在本地 SQLite。

## 开发启动

```bash
npm install
npm run dev
```

开发模式会同时启动渲染进程 Vite 服务和 Electron 主进程编译监听。

## 构建打包

```bash
npm run build
npm run dist
```

`npm run dist` 会通过 electron-builder 生成 Mac `.dmg`、Windows `.exe` 或 Linux `.AppImage` 分发包。

## 功能列表

- 联系人列表：支持卡片视图、公司/关系类型/标签筛选和姓名/公司搜索。
- 联系人详情：展示基础信息、内推进度时间线、反馈记录和提醒。
- 内推看板：按 requested、submitted、interviewing、passed、rejected、onboarded 分列展示。
- 人脉图谱：使用 d3 力导向图展示联系人关系网络。
- 仪表板：展示总联系人数、进行中内推、待提醒数量和近期提醒。
- 本地存储：主进程通过 better-sqlite3 持久化，渲染进程通过 IPC 调用。
- 系统通知：主进程定时检查提醒并调用 Electron Notification API。

## 技术栈

| 模块 | 技术 |
| --- | --- |
| 桌面壳 | Electron |
| 渲染进程 | React 18 + TypeScript |
| UI | Ant Design |
| 状态管理 | Zustand |
| 本地数据库 | better-sqlite3 / SQLite |
| 图谱 | d3.js |
| 构建 | Vite + electron-builder |

## 目录结构

```text
main/
├── database.ts
├── repositories/
├── handlers/
├── notification.ts
├── scheduler.ts
└── index.ts
shared/
└── types/
renderer/src/
├── api/
├── stores/
├── components/common/
├── hooks/
├── pages/
├── router/
└── utils/
```

## License

MIT
