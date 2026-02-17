# 松山よさこい風舞人 公式サイト

## 📁 ファイル構成

```
kabuto-site/
├── index.html              # トップページ
├── contact.html            # お問い合わせページ
├── about/                  # 風舞人とは
│   ├── overview.html       # 概要
│   └── organization.html   # 組織図
├── member/                 # メンバー関連
│   ├── recruit.html        # メンバー募集
│   ├── family.html         # ファミリー紹介
│   └── core.html           # コアファミリー
├── schedule/               # スケジュール
│   └── index.html          # スケジュール一覧
├── contents/               # コンテンツ
│   ├── report.html         # 活動報告
│   ├── photo.html          # 写真館
│   ├── video.html          # 動画館
│   └── board.html          # 掲示板
├── css/                    # スタイルシート
│   └── style.css           # メインCSS
├── js/                     # JavaScript
│   ├── main.js             # メイン機能
│   └── members.js          # メンバーモーダル機能
└── images/                 # 画像フォルダ(作成してください)
```

## 🎨 デザイン特徴

### チームカラー
- **赤** (#dc143c): 情熱と力強さ
- **白** (#ffffff): 純粋さと一体感
- **椿モチーフ**: 松山市の花

### デザインコンセプト
- シンプルでモダンなデザイン
- 赤と白を基調とした配色
- 宴会好きのフレンドリーな雰囲気
- レスポンシブ対応(スマホ・タブレット・PC)

## 🚀 セットアップ方法

### 1. ファイルの配置
すべてのファイルを同じ階層関係で配置してください。

### 2. 画像フォルダの作成
```bash
mkdir images
```

### 3. メンバー画像の準備
- 各メンバーの画像を `images/` フォルダに配置
- ファイル名: `member1.jpg`, `member2.jpg` など
- 推奨サイズ: 400x400px 以上の正方形

### 4. ブラウザで開く
`index.html` をブラウザで開いてください。

## ✏️ カスタマイズ方法

### メンバー情報の編集

**1. メンバーデータの編集**
`js/members.js` を開いて、`memberData` オブジェクトを編集:

```javascript
const memberData = {
  member1: {
    name: '名前',
    role: '役職',
    image: 'images/member1.jpg',
    message: '意気込みメッセージ',
    hobby: '趣味',
    food: '好きな食べ物'
  },
  // 追加メンバーはここに...
};
```

**2. メンバーカードの追加**
`member/family.html` にカードを追加:

```html
<div class="member-card" data-member="member7">
  <div class="member-avatar">
    <img src="../images/member7.jpg" alt="名前">
  </div>
  <div class="member-info">
    <h4 class="member-name">名前</h4>
    <p class="member-role">役職</p>
  </div>
</div>
```

### お知らせの更新
`index.html` のお知らせセクションを編集:

```html
<div class="news-item">
  <span class="news-badge">バッジ</span>
  <p class="news-text">お知らせ内容</p>
  <a href="リンク先" class="news-link">詳細 →</a>
</div>
```

### スケジュールの更新
`schedule/index.html` のスケジュールリストを編集:

```html
<div class="schedule-item">
  <div class="schedule-date">日付</div>
  <div class="schedule-content">
    <h4>イベント名</h4>
    <p>詳細情報</p>
  </div>
</div>
```

### 色の変更
`css/style.css` のCSS変数を編集:

```css
:root {
  --primary-red: #dc143c;    /* メインカラー */
  --dark-red: #a01020;       /* 暗い赤 */
  --light-red: #ff6b6b;      /* 明るい赤 */
  /* 他の色も変更可能 */
}
```

## 📱 主な機能

### ナビゲーション
- 固定ヘッダー
- スクロールで自動表示/非表示
- ドロップダウンメニュー
- モバイル対応ハンバーガーメニュー

### メンバーページ
- 年別メンバー表示
- メンバーカードクリックでモーダル表示
- 意気込み・趣味・好きな食べ物の表示
- 画像がない場合の自動プレースホルダー

### レスポンシブデザイン
- スマートフォン: 縦並びレイアウト
- タブレット: 2カラムレイアウト
- PC: 3〜4カラムレイアウト

## 🔧 トラブルシューティング

### 画像が表示されない
- 画像ファイルが `images/` フォルダにあるか確認
- ファイル名が正しいか確認
- 画像の拡張子(.jpg, .png など)が正しいか確認

### メニューが動かない
- `js/main.js` が正しく読み込まれているか確認
- ブラウザのコンソールでエラーがないか確認

### モーダルが開かない
- `js/members.js` が正しく読み込まれているか確認
- `data-member` 属性と `memberData` のキーが一致しているか確認

## 📝 今後の拡張案

- 活動報告ページの実装
- 写真館・動画館のギャラリー機能
- 掲示板機能の実装
- お問い合わせフォームの実装
- SNS連携の強化

## 🌐 ブラウザ対応

- Chrome (推奨)
- Firefox
- Safari
- Edge

## 📄 ライセンス

© 2006-2026 Matsuyama Yosakoi Kabuto. All Rights Reserved.

## 💡 お困りの際は

お問い合わせページからご連絡ください。