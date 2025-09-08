# M4M AGENCY - モダンランディングページ

## 概要
M4M AGENCYの新しいランディングページです。モダンで洗練されたデザインと、優れたユーザー体験を提供します。

## 特徴
- ✨ モダンで洗練されたデザイン
- 📱 完全レスポンシブ対応
- 🎨 美しいグラデーションとアニメーション
- ⚡ 高速なパフォーマンス
- 🎯 明確なCTA（Call to Action）

## ファイル構成
```
M4M_agency2024/
│
├── index.html          # メインHTMLファイル
├── styles.css          # スタイルシート
├── script.js           # JavaScriptファイル
├── README.md           # このファイル
└── images/            # 画像フォルダ（作成が必要）
```

## セットアップ方法

### 1. 基本的な使用方法
1. すべてのファイルを同じディレクトリに配置
2. `index.html`をブラウザで開く

### 2. 画像の配置について

#### 必要な画像とグラフィック
以下の場所に画像やグラフィックを配置してください：

##### ヒーローセクション
- **背景画像/動画**: `.hero-bg`内に配置
- 推奨: 近未来的なグラデーション背景または動的な映像
- サイズ: 1920x1080px以上推奨

##### Aboutセクション
- **`.visual-placeholder`**: 高品質な製品イメージまたはブランドグラフィック
- 推奨サイズ: 600x500px
- 内容: アパレル製品の高品質な写真や3Dレンダリング

##### Worksセクション
各`.image-placeholder`に以下の画像を配置：

1. **RINOARTS様 Tシャツ**
   - クレヨンアートを使用したTシャツデザイン
   - サイズ: 800x600px（大サイズ）

2. **BHOODS様 バンダナフライヤー**
   - 90年代裏原宿風デザイン
   - サイズ: 400x300px

3. **フライヤーデザイン**
   - 透明感のあるモダンなフライヤー
   - サイズ: 400x300px

4. **M4M TEE MOCK UP**
   - 3D CGを使用した近未来的デザイン
   - サイズ: 400x300px

5. **Gods Weapon**
   - 刺繍糸風背景のアートワーク
   - サイズ: 400x300px

6. **Velour Logo X**
   - ベロア生地を活用したロゴデザイン
   - サイズ: 400x300px

### 3. 画像の実装方法

#### HTMLでの直接配置
```html
<!-- 例: Worksセクションの画像配置 -->
<div class="work-image">
    <img src="images/rinoarts-tshirt.jpg" alt="RINOARTS Tシャツ">
</div>
```

#### CSSでの背景画像設定
```css
/* 例: ヒーロー背景 */
.hero-bg {
    background-image: url('images/hero-background.jpg');
    background-size: cover;
    background-position: center;
}
```

## カスタマイズ

### カラーパレットの変更
`styles.css`の`:root`セクションで色を変更できます：
```css
:root {
    --primary-color: #0066FF;    /* メインカラー */
    --secondary-color: #FF3366;   /* アクセントカラー */
    --dark-color: #0A0E27;        /* ダークカラー */
}
```

### フォントの変更
Google Fontsのリンクを変更して、異なるフォントを使用できます。

### アニメーション速度の調整
`script.js`内の各アニメーション設定を調整できます。

## 推奨グラフィック要素

### 1. ヒーローセクション
- **推奨**: アブストラクトな3Dグラフィック
- **カラー**: パープル〜ピンクのグラデーション
- **スタイル**: 流体的で動的な形状

### 2. サービスカード
- **アイコン**: 現在はSVGアイコンを使用
- カスタムアイコンやイラストに置き換え可能

### 3. Process Timeline
- 各ステップに関連するアイコンやイラストを追加可能

### 4. CTA背景
- 幾何学的パターンや波形のグラフィック推奨

## 技術仕様

### 使用技術
- HTML5
- CSS3（カスタムプロパティ、Grid、Flexbox）
- Vanilla JavaScript（ES6+）
- Google Fonts

### ブラウザ対応
- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

### パフォーマンス最適化
- Intersection Observer APIによる遅延読み込み
- デバウンス/スロットル処理
- CSS transformによるGPUアクセラレーション

## お問い合わせフォーム

現在のフォームはフロントエンドのみの実装です。
実際の送信機能を実装する場合は、以下のオプションがあります：

1. **Formspree**: https://formspree.io/
2. **Netlify Forms**: Netlifyでホスティングする場合
3. **カスタムバックエンド**: Node.js、PHP等で実装

## ライセンス
© 2024 M4M AGENCY. All rights reserved.

## サポート
問題や質問がある場合は、m4magency24@gmail.com までご連絡ください。
