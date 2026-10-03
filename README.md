# GIF DROP

動画を選び、解像度とフレームレートを指定してGIFへ変換できるMacアプリです。動画は外部サーバーへアップロードせず、端末内だけで処理します。

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
