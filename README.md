![Entourage app running on Windows with 2 cards, one Blender and one VSCode project](./docs/screenshot-project-view.png)

# Entourage

![Entourage app icon](./docs/entourage-app-icon@128px.png)

A launcher for your personal projects and prototypes.

# Features

- 📂 Manage multiple "projects"
- 🟦 Create "blocks" to run commands
- 📄 Quickly access **Notion** notes
- 🔎 Search and filter blocks
- ⚙️ **Commands**
  - Launch **VSCode** project
  - Launch **Blender** project

## Development

1. Clone project.
1. `yarn`
1. `yarn tauri dev`

### Development Requirements

- NodeJS
- Yarn
- Rust

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

# How it works

Check out [my blog](https://whoisryosuke.com/blog) where I break down this project and others like it.

# Release

This process is for releasing the app as a bundled executable for production use.

1. `yarn` to install or update any dependencies.
1. `yarn bundle` should build the web app, then generate the app, then generate an installer for the app.
1. Your app should be in `\src-tauri\target\release\` (like an `.exe` for Windows). You can also find the "installer" version in `\src-tauri\target\release\bundle\` (like an `.msi` file for Windows).
1. Go to GitHub and [create a new Release](https://github.com/whoisryosuke/entourage-v2/releases/new)
1. Add the version number as the title and changelog in the description
1. Upload the installer files from `\src-tauri\target\release\bundle\`
1. Release!

> Currently we only support Windows. I'll probably add a GitHub Action later to handle other platforms. If you're on Mac or Linux and want to use this, just do step 1 and you're good to go.
