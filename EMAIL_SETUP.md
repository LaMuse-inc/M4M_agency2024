# 📧 お問い合わせフォーム設定ガイド

M4M AGENCY様

お疲れ様です。お問い合わせフォームのメール送信機能について、2つの方法をご用意いたしました。

## 🌟 方法1: Formspree（推奨・最も簡単）

### 設定手順（所要時間：約5分）

1. **Formspreeアカウント作成**
   - https://formspree.io/ にアクセス
   - 「Get Started」をクリック
   - メールアドレス（m4magency24@gmail.com）でアカウント作成

2. **フォーム作成**
   - 「New Form」をクリック
   - Form name: 「M4M AGENCY Contact」
   - Form endpoint: 自動生成されるID（例：xvgpkjby）をメモ

3. **コード更新**
   - `index.html` の297行目を編集：
   ```html
   <!-- 変更前 -->
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   
   <!-- 変更後（YOUR_FORM_IDを実際のIDに置き換え） -->
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/xvgpkjby" method="POST">
   ```

4. **JavaScriptファイル切り替え**
   - `index.html` の588行目を編集：
   ```html
   <!-- 変更前 -->
   <script src="script.js"></script>
   
   <!-- 変更後 -->
   <script src="formspree-script.js"></script>
   ```

### 完了！
- 無料プランで月50通まで送信可能
- 24時間以内にメールが届くようになります

---

## 🔧 方法2: EmailJS（高機能）

### 設定手順（所要時間：約15分）

1. **EmailJSアカウント作成**
   - https://www.emailjs.com/ にアクセス
   - m4magency24@gmail.com でアカウント作成

2. **Gmailサービス設定**
   - Dashboard → Email Services → Add New Service
   - Gmail を選択
   - User: m4magency24@gmail.com
   - Pass: Gmailアプリパスワード（※要設定）

3. **Gmailアプリパスワード設定**
   - Googleアカウント設定 → セキュリティ
   - 2段階認証を有効化（必須）
   - アプリパスワードを生成してEmailJSに入力

4. **テンプレート作成**
   - Dashboard → Email Templates → Create New Template
   - Subject: `M4M AGENCY - {{name}}様からのお問い合わせ`
   - Content:
   ```
   新しいお問い合わせが届きました。
   
   お名前: {{name}}
   メールアドレス: {{email}}
   会社名: {{company}}
   ご希望のサービス: {{service}}
   
   メッセージ:
   {{message}}
   
   ---
   このメールはM4M AGENCYのWebサイトから自動送信されました。
   ```

5. **コード更新**
   - `script.js` の169行目と189行目を編集：
   ```javascript
   // YOUR_USER_ID → 実際のUser ID
   emailjs.init("your_actual_user_id");
   
   // YOUR_SERVICE_ID、YOUR_TEMPLATE_ID → 実際のID
   emailjs.sendForm('your_service_id', 'your_template_id', this)
   ```

---

## 💡 どちらを選ぶべき？

| 項目 | Formspree | EmailJS |
|------|-----------|---------|
| 設定の簡単さ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Gmailパスワード設定 | 不要 | 必要 |
| 月間送信数（無料） | 50通 | 200通 |
| カスタマイズ性 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**推奨**: Formspreeの方が設定が簡単で、Gmailのパスワード設定も不要です。

---

## 🚀 現在の状況

✅ HTMLフォーム構造：完成
✅ CSS スタイリング：完成  
✅ JavaScript バリデーション：完成
✅ Formspree対応コード：完成
✅ EmailJS対応コード：完成

あとは上記の設定を行うだけで、お問い合わせフォームが動作します。

ご不明な点がございましたら、お気軽にお声がけください。
