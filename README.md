# new-web-site

研究室のプロジェクトを紹介するための[サイト](https://torunea.github.io/lab_hp_test/)です。

プロジェクトの追加・編集は **Google スプレッドシートのみ** で行います。HTMLファイルの編集は不要です。

---

## ディレクトリ構成

```
NEW-WEB-SITE/
├── css/
│   ├── footer.css          # フッター
│   ├── project-detail.css  # 詳細ページ
│   ├── projects.css        # メインページ・カード
│   └── style.css           # 共通スタイル
├── img/
│   └── logo.png            # ロゴ画像のみ
├── js/
│   └── sheets.js           # Google Sheets 連携（URLをここに設定）
├── footer.html             # 共通フッター
├── header.html             # 共通ヘッダー
├── index.html              # メインページ（カードをスプレッドシートから動的生成）
├── project.html            # 詳細ページ（スプレッドシートから動的生成）
└── README.md
```

---

## プロジェクトの追加方法

### 1. スプレッドシートを開く

管理用の Google スプレッドシートに新しい行を追加します。

### 2. 各列に入力する

| 列 | 必須 | 内容 | 例 |
|---|---|---|---|
| **id** | ◎ | URLに使う一意のID（半角英数字・ハイフンのみ） | `supertightcity` |
| **title** | ◎ | タイトル | `SUPERTIGHTCITY` |
| **date** | ◎ | 日付（YYYYMM形式） | `201907` |
| **tags** | ◎ | カテゴリ（下記から1つ選択） | `Research` |
| **image_url** | ◎ | メイン画像のURL（Flickr など） | `https://live.staticflickr.com/...` |
| **description** | | 説明文（Ctrl+Enterで段落分け） | `一段落目の説明` |
| **image_url_2** | | 追加画像1のURL | `https://live.staticflickr.com/...` |
| **image_url_3** | | 追加画像2のURL | `https://live.staticflickr.com/...` |
| **image_url_4** | | 追加画像3のURL | `https://live.staticflickr.com/...` |
| **image_url_5** | | 追加画像4のURL | `https://live.staticflickr.com/...` |
| **published** | | `FALSE` にするとサイトに表示されない（下書き） | `FALSE` |

**tags の選択肢：** `Design` / `Research` / `Thesis` / `Reading` / `Publication` / `Event`

### 3. 保存するだけで反映される

スプレッドシートを保存するとサイトに自動で反映されます。コードの編集は不要です。

---

## 詳細ページの画像ギャラリーについて

詳細ページはメイン画像の下にサムネイルを5枚横並びで表示します。

- **スロット1**：`image_url`（メイン画像・常に表示）
- **スロット2〜5**：`image_url_2`〜`image_url_5`（空欄の場合はグレーの余白）

サムネイルをクリックすると、その画像がメインに表示されます。

### Flickr 画像URLの取得方法

1. Flickr の写真ページを開く
2. 写真を右クリック →「新しいタブで画像を開く」
3. アドレスバーのURL（`https://live.staticflickr.com/...` で始まるもの）をコピー
4. スプレッドシートの該当列に貼り付ける

---

## 初期設定（初回のみ）

### スプレッドシートをウェブに公開する

1. スプレッドシートを開き、**[ファイル] → [共有] → [ウェブに公開]** を選択
2. 「シート1」「カンマ区切りの値 (.csv)」を選んで **[公開]**
3. 表示された URL をコピーする

### js/sheets.js に URL を設定する

```js
// js/sheets.js
const SHEETS_CSV_URL = 'コピーしたURLをここに貼り付ける';
```

---

## コードを変更したときのプッシュ手順

```bash
git pull origin main
# （ファイルを編集）
git add .
git commit -m "変更内容のメモ"
git push origin main
```
