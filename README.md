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
  - Launch **Visual Studio** solution
  - Launch **Blender** files

## Download

You can [download the latest version here](https://github.com/whoisryosuke/entourage-v2/releases/latest). For Windows I recommend the `.msi` file which installs the app and creates a desktop shortcut. Or you can download the `.exe` directly and place it wherever you want.

> Windows only for now. Mac/Linux coming soon.

## Tips and Tricks

### Image folder

Images you assign to blocks are copied to a data folder for Entourage. This folder is located at: `%LocalAppData%\com.entourage.app`. You type that into your file browser's path bar - or do Windows + R and paste it in there.

The app should automatically delete images when blocks are deleted. Be careful deleting files here, it may break some blocks or the entire app.

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

1. Increment the version in `package.json`, `src-tauri\Cargo.toml`, and most importantly: `src-tauri\tauri.conf.json`.
1. `yarn bundle` should build the web app, then generate the app, then generate an installer for the app.
1. Your app should be in `\src-tauri\target\release\` (like an `.exe` for Windows). You can also find the "installer" version in `\src-tauri\target\release\bundle\` (like an `.msi` file for Windows).
1. Go to GitHub and [create a new Release](https://github.com/whoisryosuke/entourage-v2/releases/new)
1. Add the version number as the title and changelog in the description
1. Upload the installer files from each folder in `\src-tauri\target\release\bundle\` and the `.exe` in `\release\`
1. Release!

> Currently we only support Windows. I'll probably add a GitHub Action later to handle other platforms. If you're on Mac or Linux and want to use this, just do step 1-2 and you're good to go.
