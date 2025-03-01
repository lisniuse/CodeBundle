
## CodeBundle (中文版)

**CodeBundle** 是一款桌面应用程序，使用 Electron、React 和 Vite 构建，旨在轻松地将项目目录中的源代码导出到一个单独的文本文件中。它非常适合共享代码片段、创建备份或准备代码以供审查。该应用程序优先考虑简单性、速度和可定制性。

### 功能特点

*   **目录选择：** 轻松选择任何项目目录以导出代码。
*   **文件类型过滤：** 指定要包含在导出包中的文件扩展名（例如 `.js`、`.py`、`.java`）。
*   **忽略列表：** 定义要排除的文件和目录，支持通配符（例如 `*.log`、`temp/`）。
*   **.gitignore 集成：** 利用项目的 `.gitignore` 文件自动排除文件和目录。
*   **可自定义输出：** 选择生成的代码包的目标位置和文件名。
*   **持久配置：** 将导出设置（选定的扩展名、忽略列表、`.gitignore` 使用情况、输出路径）保存在项目目录中的 `.codebundle` 文件中，以便重复使用。
*   **多语言支持：** 提供英语和简体中文用户界面。 应用程序会自动检测系统语言，并可手动切换。
*   **稳健的错误处理：** 为常见问题（例如无效目录、导出失败）提供清晰、用户友好的错误消息。
*   **优化构建：** 支持开发（具有热重载）和生产构建（针对分发进行了优化）。

### 先决条件

*   Node.js (推荐使用 LTS 版本)
*   npm (或 yarn)

### 安装

1.  **克隆仓库：**

    ```bash
    git clone https://github.com/lisniuse/CodeBundle.git
    cd CodeBundle
    ```

2.  **安装依赖：**

    ```bash
    npm install
    ```

### 使用方法

#### 开发环境

以开发模式运行应用程序（具有热重载功能，可加快开发速度）：

```bash
npm run dev
```

此命令将启动 Vite 开发服务器并启动 Electron 应用程序。您将在控制台中看到 Vite 的输出，Electron 窗口将显示该应用程序。

#### 生产环境

1.  **构建生产版本：**

    ```bash
    npm run build
    ```
    这将在 `build` 目录中生成一个优化的生产版本。

2.  **创建可分发包：**

    要创建特定平台的可分发包（Windows、macOS、Linux）：
    *   Windows: `npm run build:win`
    *   macOS: `npm run build:mac`
    *   Linux: `npm run build:linux`
    *   所有平台: `npm run build:all`

    生成的包将放置在 `dist` 目录中。

#### 运行打包的应用程序

构建完成后，您可以直接运行打包的应用程序。 例如，在 Windows 上，执行 `dist` 目录中的 `.exe` 文件。

### 应用内使用

1.  **选择项目目录：** 单击“浏览”并选择要导出的项目的根目录。
2.  **选择文件类型：** 选中与您要包含的文件扩展名相对应的复选框。
3.  **配置忽略列表：** 添加文件名或目录名以排除它们（例如 `node_modules`、`*.tmp`）。 支持通配符。
4.  **使用 .gitignore：** 切换“使用 .gitignore 规则”开关以根据项目的 `.gitignore` 文件自动排除文件和目录。
5.  **设置导出位置：** 单击“导出设置”部分中的“浏览”以指定输出文件的路径。
6.  **确认导出：** 单击“确认导出”按钮以生成代码包。

### 项目结构

```
CodeBundle/
├── public/           # 静态资源
│   └── index.html    # 主要 HTML
├── src/
│   ├── main/         # Electron 主进程
│   │   ├── main.js   # 主进程入口点
│   │   └── preload.js # 预加载脚本
│   ├── renderer/     # React 应用程序（渲染器进程）
│   │   ├── components/   # React 组件
│   │   ├── locales/    # i18n 翻译
│   │   ├── utils/      # 实用函数
│   │   ├── index.jsx   # 渲染器入口点
│   │   ├── i18n.js      # i18n 设置
│   │   └── styles/    # 样式表
│   └── index.html    # 渲染器的 HTML 模板
├── .gitignore        # Git 忽略规则
├── package.json      # 项目元数据和脚本
├── vite.config.js    # Vite 配置
└── README.md         # 此文件
```

### 贡献

非常欢迎贡献！ 请遵守以下步骤：

1.  Fork 仓库。
2.  创建一个新分支： `git checkout -b feature/your-feature-name`
3.  实现您的更改并提交它们： `git commit -m "描述性提交消息"`
4.  推送您的分支： `git push origin feature/your-feature-name`
5.  创建针对此仓库的 `main` 分支的拉取请求。

确保您的代码与现有编码风格保持一致，并包含全面的测试。

### 许可证

本项目根据 MIT 许可证获得许可 - 有关详细信息，请参阅 [LICENSE](https://opensource.org/licenses/MIT) 文件。

### 联系方式

如有问题或建议，请在 GitHub 上提出 issue。