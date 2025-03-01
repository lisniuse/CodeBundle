# CodeBundle

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[English Version](#codebundle) | [中文版本](/README-zh.md)

<a name="codebundle"></a>

## CodeBundle (English Version)

**CodeBundle** is a desktop application, built with Electron, React, and Vite, designed to effortlessly export source code from a project directory into a single, consolidated text file. It's perfect for sharing code snippets, creating backups, or preparing code for reviews. The application prioritizes simplicity, speed, and customizability.

### Features

*   **Directory Selection:** Easily select any project directory for code export.
*   **File Type Filtering:** Specify which file extensions (e.g., `.js`, `.py`, `.java`) to include in the exported bundle.
*   **Ignore List:** Define files and directories to exclude, with support for wildcards (e.g., `*.log`, `temp/`).
*   **.gitignore Integration:**  Leverage your project's `.gitignore` file to automatically exclude files and directories.
*   **Customizable Output:** Choose the destination and filename for the generated code bundle.
*   **Persistent Configuration:** Saves export settings (selected extensions, ignore list, `.gitignore` usage, output path) in a `.codebundle` file within the project directory for convenient reuse.
*   **Multi-language Support:** Offers both English and Simplified Chinese user interfaces.  The application automatically detects the system language, with an option for manual switching.
*   **Robust Error Handling:** Presents clear, user-friendly error messages for common issues (e.g., invalid directory, export failure).
*   **Optimized Builds:** Supports both development (with hot-reloading) and production builds (optimized for distribution).

### Prerequisites

*   Node.js (LTS version recommended)
*   npm (or yarn)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/lisniuse/CodeBundle.git
    cd CodeBundle
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

### Usage

#### Development

Run the application in development mode (with hot-reloading for rapid development):

```bash
npm run dev
```

This command starts the Vite development server and launches the Electron application.  You'll see Vite's output in the console, and the Electron window will display the application.

#### Production

1.  **Build for Production:**

    ```bash
    npm run build
    ```
    This generates an optimized production build in the `build` directory.

2. **Create Distributable Packages**
   To create platform-specific distributable packages (Windows, macOS, Linux):
   * Windows: `npm run build:win`
   * macOS: `npm run build:mac`
   * Linux: `npm run build:linux`
   * All platforms: `npm run build:all`

   The resulting packages will be placed in the `dist` directory.

#### Running the Packaged Application

After building, you can directly run the packaged application.  For example, on Windows, execute the `.exe` file found in the `dist` directory.

### In-App Usage

1.  **Select Project Directory:** Click "Browse" and choose the root directory of the project you intend to export.
2.  **Select File Types:** Check the boxes corresponding to the file extensions you wish to include.
3.  **Configure Ignore List:** Add filenames or directory names to exclude them (e.g., `node_modules`, `*.tmp`). Wildcards are supported.
4.  **Use .gitignore:** Toggle the "Use .gitignore rules" switch to automatically exclude files and directories based on your project's `.gitignore` file.
5.  **Set Export Location:** Click "Browse" in the "Export Settings" section to specify the output file's path.
6.  **Confirm Export:** Click the "Confirm Export" button to generate the code bundle.

### Project Structure

```
CodeBundle/
├── public/           # Static assets
│   └── index.html    # Main HTML
├── src/
│   ├── main/         # Electron main process
│   │   ├── main.js   # Main process entry point
│   │   └── preload.js # Preload script
│   ├── renderer/     # React application (renderer process)
│   │   ├── components/   # React components
│   │   ├── locales/    # i18n translations
│   │   ├── utils/      # Utility functions
│   │   ├── index.jsx   # Renderer entry point
│   │   ├── i18n.js      # i18n setup
│   │   └── styles/    # Stylesheets
│   └── index.html    # HTML template for renderer
├── .gitignore        # Git ignore rules
├── package.json      # Project metadata and scripts
├── vite.config.js    # Vite configuration
└── README.md         # This file
```

### Contributing

Contributions are highly encouraged!  Please adhere to the following steps:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b feature/your-feature-name`
3.  Implement your changes and commit them: `git commit -m "Descriptive commit message"`
4.  Push your branch: `git push origin feature/your-feature-name`
5.  Create a pull request targeting the `main` branch of this repository.

Ensure your code aligns with the existing coding style and includes comprehensive tests.

### License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) file for details.

### Contact

For questions or suggestions, please open an issue on GitHub.