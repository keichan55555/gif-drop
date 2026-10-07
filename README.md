# GIF DROP

GIF DROP is a macOS app that turns a selected section of a video into a GIF. Choose the output size, frame rate, and color detail while keeping the entire conversion private and on-device—your video is never uploaded to an external server.

## Features

- Select the exact GIF range on a thumbnail timeline
- Choose 320, 480, 720, or 1080 px, or keep the original resolution
- Adjust the frame rate and color detail
- Switch between Japanese and English
- Enjoy a polished motion-driven interface from import to export
- Choose where to save the GIF and reveal it in Finder
- Convert multiple videos in succession

## Install on macOS

Download `GIF-DROP-*-universal.dmg` from [Releases](https://github.com/keichan55555/gif-drop/releases), open the DMG, and drag **GIF DROP** into the Applications folder.

The current builds are not yet signed or notarized by Apple. If macOS cannot verify the developer on first launch, Control-click **GIF DROP** in Finder and choose **Open**.

## System Requirements

- Apple Silicon (M1 or newer) or Intel Mac
- macOS 12 or later recommended

## Development

```bash
npm install
npm start
```

Build a universal DMG:

```bash
npm run dist:mac
```

Build artifacts are saved to `release/`. Pushing a tag such as `v1.1.3` triggers GitHub Actions to build the DMG and attach it to the corresponding GitHub Release.

## License

MIT
