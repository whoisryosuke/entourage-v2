# Entourage

A launcher for your personal projects and prototypes.

# Features

- 📂 Manage multiple projects
- 🟦 Create blocks to run commands
- ⚙️ **Commands**
  - Launch VSCode project

## Development

1. Clone project.
1. `yarn`
1. `yarn tauri dev`

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

# How it works

## Image upload + viewing

This took a bit to setup and figure out with the different modules and permission configurations. Also note we are on Tauri V2.

The user picks an image using Tauri's [Dialog module](https://v2.tauri.app/plugin/dialog/) and the `open()` method. This provides a local path to the file. We take this local file and display it to the user as a preview if possible. The allowed directories are in `tauri.conf.json` under the `app.security.assetProtocol.scope` section (we expect users to check Downloads folder for now).

```js
const handleSelectImage = async () => {
  let filepath = await open({
    multiple: false,
    directory: false,
    filters: [
      {
        name: "",
        extensions: ["jpg", "jpeg", "gif", "png", "svg", "webp"],
      },
    ],
  });

  if (!filepath) return;
  console.log("file path", filepath);

  // Save image URL
  setImagePath(filepath);
};
```

Once the "Block" is created, we "upload" the image to the user's local app data folder, inside the app-specific folder (`com.entourage.com`). This uses the Tauri [File System module](https://v2.tauri.app/plugin/file-system/#write) and the `write()` method to create a new file in the app's local AppData folder (little confusing I know). The permissions for this (like the directories we can write to) are defined in `src-tauri\capabilities\default.json`

```js
// Save image to cache folder and keep path for Block
const pathSplit = imagePath.split(".");
const fileExtension = pathSplit[pathSplit.length - 1];
const hash = Number(new Date()).toString(36);
const saveImagePath = `${hash}.${fileExtension}`;
console.log("saving image path", saveImagePath);

const file = await create(saveImagePath, {
  baseDir: BaseDirectory.AppLocalData,
});
const imageData = await fetch(imageSrc).then(
  // Tauri requires a Uint8Array of data
  async (res) => new Uint8Array(await res.arrayBuffer())
);
await file.write(imageData);
await file.close();
```

The **image path** is saved to the "Block" data, which is stored in a Zustand store that perists itself when the app is closed.

To read the image, we use the get the path of the image locally (using the `appLocalDataDir()` method). Then we convert that local path to a web-friendly URL using Tauri's `convertFileSrc()`. This uses the configuration from `tauri.conf.json` under `app.security.csp` where we make a "asset URL" `https://asset.localhost`. You can also find the directories we're allowed to read from here, like `$APPLOCALDATADIR`.

```js
import { convertFileSrc, invoke } from "@tauri-apps/api/core";
import { appLocalDataDir, localDataDir } from "@tauri-apps/api/path";
import React, { useEffect, useState } from "react";
import { Block } from "../../../../store/types";
import "./BlockButton.css";

type Props = { block: Block };

const BlockButton = ({ block }: Props) => {
  const [imageSrc, setImageSrc] = useState("");

  // Fetch image locally from app local appdata folder
  useEffect(() => {
    const getImage = async () => {
      const imagePath = `${await appLocalDataDir()}/${block.image}`;
      const newImageSrc = convertFileSrc(imagePath);
      setImageSrc(newImageSrc);
    };
    getImage();
  }, [block]);

  return (
    <button className="BlockButton">
      <img src={imageSrc} />
      <h3>{block.name}</h3>
    </button>
  );
};

export default BlockButton;
```

> It's recommended you make a separate component for anything that needs to fetch an image, since it will need to use `async/await` to get the image URL.
