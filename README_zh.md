# CodeBundle 🗂️

[![License](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![GitHub stars](https://img.shields.io/github/stars/lisniuse/CodeBundle.svg?style=social)](https://github.com/lisniuse/CodeBundle/stargazers)

CodeBundle 是一款简单易用的 Electron 桌面应用，旨在帮助开发者快速打包和导出项目代码。它支持自定义忽略文件和文件夹、选择特定文件类型、利用 `.gitignore` 规则，以及将代码导出为单个文本文件，方便代码审查、共享或存档。

## ✨ 特性

-   **直观的用户界面**: 基于 React 和 Arco Design 构建，提供流畅友好的用户体验。
-   **灵活的文件选择**: 可选择项目目录，自动扫描支持的文件类型。
-   **自定义忽略列表**: 通过自定义忽略列表或使用 `.gitignore` 文件，排除不需要的文件和目录。
-   **多语言支持**: 支持中文和英文，根据系统语言自动切换，也可手动选择。
-   **配置保存**: 自动保存用户配置到 `.codebundle` 文件，方便下次使用。
-   **热更新**: 在开发模式下支持热更新，方便调试。

## 📦 安装

### 前提条件

-   Node.js (建议 v14 或更高版本)
-   npm 或 yarn 包管理器

### 开发

1.  **克隆仓库**:

    ```bash
    git clone https://github.com/lisniuse/CodeBundle.git
    cd CodeBundle
    ```

2.  **安装依赖**:

    ```bash
    npm install
    # 或
    yarn install
    ```

3.  **启动开发服务器**:

    ```bash
    npm run dev
    # 或
    yarn dev
    ```

    这将同时启动 webpack 开发服务器和 Electron 应用，并支持热更新。

### 打包

要构建可分发的应用程序，请运行：

```bash
npm run build
# 或
yarn build
```
这个命令会编译你的源代码,并且创建一个安装包在`dist`文件夹中。

## 🔨 使用

1.  **选择项目目录**: 点击“浏览”按钮选择您的项目文件夹，或直接输入路径。
2.  **选择文件类型**: 在“文件类型”区域，勾选您希望导出的文件扩展名。
3.  **配置忽略列表**: 在“忽略列表”区域，您可以手动添加要忽略的文件或文件夹，或者启用“.gitignore 规则”选项。
4.  **选择导出位置**: 在“导出设置”区域，设置导出文件的保存路径。
5.  **确认导出**: 点击“确认导出”按钮，将代码导出为单个文本文件。

## 🌍 国际化

CodeBundle 支持多语言。目前支持以下语言：

-   中文 (zh)
-   英文 (en)

您可以在应用程序右上角的下拉菜单中手动切换语言。

## 🤝 贡献

欢迎各种形式的贡献，包括但不限于：

-   **提交问题**: 如果您发现任何错误或有功能建议，请提交 issue。
-   **提交拉取请求**: 如果您修复了错误或添加了新功能，欢迎提交拉取请求。
-   **文档改进**: 帮助改进项目的文档。
-   **本地化**: 添加或改进翻译。

## 📄 许可证

本项目根据 ISC 许可证授权。有关详细信息，请参阅 [LICENSE](LICENSE) 文件。

## ✉️ 联系

如果您有任何问题或建议，请随时通过以下方式联系我：

-   **GitHub Issues**: [lisniuse/CodeBundle/issues](https://github.com/lisniuse/CodeBundle/issues)
