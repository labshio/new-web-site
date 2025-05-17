# new-web-site

研究室のプロジェクトを紹介するための[サイト](https://labshio.github.io/new-web-site/)です

#コンテンツの更新について（2025/05/17現在）

## 画像の追加
imgフォルダ内にファイル名を「プロジェクト名.jpg」とした画像を追加

## プロジェクト詳細ページの作成
「project_template.html」をコピーし、ファイル名を「プロジェクト名.html」に変更
```
<div class="project-content">
    <div class="project-header">
        <h1 class="project-title">プロジェクト名</h1>
        <div class="project-date">日付</div>
    </div>
    
    <div class="project-main-content">
        <div class="project-image-side">
            <img src="../img/**プロジェクト名.jpg**" alt="プロジェクトメイン画像" class="project-image-main">
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
の「プロジェクト名」、「日付」を変更し、「プロジェクト名.jpg」の部分を対応するファイルと同じ名前に変更

## メインページの変更
index.htmlにおいて
```
<a href="projects/プロジェクト名.html" class="project-card" data-genre="プロジェクトタイプ(event, publish, researchから選択)">
    <div class="fixed-image-square">
        <div class="project-image-container">
            <img src="img/プロジェクト画像.jpg" alt="project" class="project-image">
        </div>
    </div>
    <div class="fixed-text-square">
        <div class="project-info">
            <span class="project-title">プロジェクト名</span><span class="project-separator"> / </span><span class="project-date">日付</span>
        </div>
    </div>
    <div class="project-square"></div>
</a>
```
の「プロジェクト名.html」、「プロジェクトタイプ」、「プロジェクト画像.jpg」の部分を対応するファイルと同じ名前に変更
