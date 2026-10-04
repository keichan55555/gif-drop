# GIF DROP

動画から好きな範囲を選び、解像度・フレームレート・品質を指定してGIFへ変換できるMacアプリです。動画は外部サーバーへアップロードせず、端末内だけで処理します。

## 主な機能

- サムネイル付きタイムラインでGIFにする範囲を指定
- 320 / 480 / 720 / 1080 pxまたは元解像度を選択
- FPSと品質を調整
- 日本語・英語表示
- 動画の読み込みからGIF完成までをつなぐモーションUI
- Mac版では保存先を選び、保存したGIFをFinderで表示
- 複数の動画を続けて変換

## Macにインストールする

GitHubの **Releases** から `GIF-DROP-*-universal.dmg` をダウンロードし、DMGを開いて `GIF DROP` をApplicationsフォルダへドラッグします。

現時点の配布物はAppleによる署名・公証前です。初回起動時にmacOSが開発元を確認できない場合は、FinderでアプリをControlキーを押しながらクリックし、**開く** を選んでください。

## 対応Mac

- Apple Silicon（M1以降）
- Intel Mac
- macOS 12以降を推奨

## 開発

```bash
npm install
npm start
```

Universal DMGを作る場合：

```bash
npm run dist:mac
```

生成物は `release/` に保存されます。`v1.0.0` のようなタグをGitHubへpushすると、GitHub ActionsがDMGを作り、Releasesへ自動添付します。

## ライセンス

MIT
