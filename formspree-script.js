// ==========================================
// Formspree対応のフォーム送信処理
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // バリデーション
            if (!validateForm()) {
                return;
            }
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // 送信中状態
            submitBtn.innerHTML = '<span>送信中...</span>';
            submitBtn.disabled = true;
            submitBtn.style.background = '#666666';
            
            // フォームデータを準備
            const formData = new FormData(contactForm);
            
            // Formspreeに送信
            fetch(contactForm.action, {
                method: contactForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // 送信成功
                    submitBtn.innerHTML = '<span>送信完了！</span>';
                    submitBtn.style.background = '#4CAF50';
                    contactForm.reset();
                    
                    // 成功メッセージを表示
                    showSuccessMessage('お問い合わせありがとうございます。24時間以内にご返信いたします。');
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                } else {
                    response.json().then(data => {
                        if (Object.hasOwnProperty.call(data, 'errors')) {
                            showErrorMessage(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            showErrorMessage('送信に失敗しました。しばらく経ってから再度お試しください。');
                        }
                    });
                    
                    submitBtn.innerHTML = '<span>送信エラー</span>';
                    submitBtn.style.background = '#f44336';
                    
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 3000);
                }
            }).catch(error => {
                console.log('Error:', error);
                showErrorMessage('送信に失敗しました。しばらく経ってから再度お試しください。');
                
                submitBtn.innerHTML = '<span>送信エラー</span>';
                submitBtn.style.background = '#f44336';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }
    
    // フォームバリデーション
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name) {
            showErrorMessage('お名前を入力してください。');
            document.getElementById('name').focus();
            return false;
        }
        
        if (!email) {
            showErrorMessage('メールアドレスを入力してください。');
            document.getElementById('email').focus();
            return false;
        }
        
        if (!isValidEmail(email)) {
            showErrorMessage('正しいメールアドレスを入力してください。');
            document.getElementById('email').focus();
            return false;
        }
        
        if (!message) {
            showErrorMessage('メッセージを入力してください。');
            document.getElementById('message').focus();
            return false;
        }
        
        return true;
    }
    
    // メールアドレス形式チェック
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // 成功メッセージ表示
    function showSuccessMessage(message) {
        showMessage(message, 'success');
    }
    
    // エラーメッセージ表示
    function showErrorMessage(message) {
        showMessage(message, 'error');
    }
    
    // メッセージ表示（共通）
    function showMessage(message, type) {
        // 既存のメッセージを削除
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // メッセージ要素を作成
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // スタイルを適用
        messageDiv.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 8px;
            font-size: 0.9rem;
            text-align: center;
            animation: fadeIn 0.3s ease;
            ${type === 'success' ? 
                'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' : 
                'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // フォームの上に挿入
        const contactForm = document.getElementById('contactForm');
        contactForm.parentNode.insertBefore(messageDiv, contactForm);
        
        // 5秒後に自動削除
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
});
