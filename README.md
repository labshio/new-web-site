# new-web-site

研究室のプロジェクトを紹介するための[サイト](https://labshio.github.io/new-web-site/)です

## ディレクトリ構成（2025/05/17現在）

```
NEW-WEB-SITE/
│── css/                        # cssのフォルダ
│   │── footer.css              # フッター関連
│   │── project-detail.css      # プロジェクト詳細ページ用
│   │── projects.css            # メインページ用
│   │── style.css               # その他共通
│── img/                        # プロジェクト画像のフォルダ
│   │── logo.png                # ロゴ画像
│   │── project1.jpg
│   │── project2.jpg
│    ...
│── projects/                   # プロジェクト詳細のフォルダ
│   │── projects_template.html  # プロジェクト詳細ページのテンプレート
│   │── project1.html
│   │── project2.html
│   ...
│── footer.html                 # 共通フッター
│── header.html                 # 共通ヘッダー
│── index.html                  # メインページ
│── README.md
```

## コンテンツの更新について（2025/05/17現在）

### 1. 最新の状態をプル

bash（ターミナル）で
```
git pull origin main
```
を入力して最新の状態をプル

### 2. 画像の追加

「img」フォルダ内にファイル名を「*プロジェクト名*.jpg」とした画像を追加

### 3. プロジェクト詳細ページの作成

「project_template.html」を「projects」フォルダ内にコピーし、ファイル名を「*プロジェクト名*.html」に変更

<sub>プロジェクト名.html :</sub>
```
<div class="project-content">
    <div class="project-header">
        <h1 class="project-title">プロジェクト名</h1>
        <div class="project-date">日付</div>
    </div>
    
    <div class="project-main-content">
        <div class="project-image-side">
            <img src="../img/プロジェクト名.jpg" alt="project-image-main" class="project-image-main">
        </div>
        
        <div class="project-text-side">
            <div class="project-description">
                <p>一段落目の説明文</p>
                <p>二段落目の説明文</p>
                <p>三段落目の説明文</p>
            </div>
        </div>
    </div>
</div>
```

「プロジェクト名」、「日付」を変更<br/>
「プロジェクト名.jpg」の部分を対応するファイルと同じ名前に変更

### 4. メインページの変更

<sub>index.html :</sub>
```
<a href="projects/プロジェクト名.html" class="project-card" data-tags="プロジェクトタイプ" data-date="日付">
    <div class="fixed-image-square">
        <div class="project-image-container">
            <img src="img/プロジェクト名.jpg" alt="project8" class="project-image">
        </div>
    </div>
    <div class="fixed-text-square">
        <div class="project-info">
            <span class="project-title">プロジェクト名</span><span class="project-separator"> / </span><span class="project-date"></span>
        </div>
    </div>
    <div class="project-square"></div>
</a>
```

「プロジェクト名.html」、「プロジェクト画像.jpg」の部分を対応するファイルと同じ名前に変更<br/>
「プロジェクトタイプ(Design, Research, Thesis, Reading, Publication, Eventから選択)」、「プロジェクト名」、「日付」を変更

### 5. 変更のコミット

変更点をステージして「コミットしてプッシュ」
