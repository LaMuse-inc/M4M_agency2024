// ==========================================
// ナビゲーションバーの機能
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // モバイルメニュートグル
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        // ハンバーガーメニューのアニメーション
        navToggle.classList.toggle('active');
        // Update aria-expanded
        const isExpanded = navMenu.classList.contains('active');
        navToggle.setAttribute('aria-expanded', isExpanded);
        navToggle.setAttribute('aria-label', isExpanded ? 'メニューを閉じる' : 'メニューを開く');
        // Body scroll lock
        document.body.style.overflow = isExpanded ? 'hidden' : '';
        
        // Create overlay
        let overlay = document.querySelector('.nav-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'nav-overlay';
            document.body.appendChild(overlay);
        }
        overlay.classList.toggle('active');
        
        // Close menu on overlay click
        overlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ナビゲーションリンククリックでメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            const overlay = document.querySelector('.nav-overlay');
            if (overlay) overlay.classList.remove('active');
        });
    });

    // スクロール時のナビゲーションバーの変化
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // スムーススクロール
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // ナビゲーションバーの高さを考慮
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // アニメーション（Intersection Observer）
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // アニメーション対象要素を監視
    const animatedElements = document.querySelectorAll('.service-card, .work-item, .process-item, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // アニメーションクラスの追加
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ==========================================
    // パララックス効果
    // ==========================================
    const heroGradient = document.querySelector('.hero-gradient');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroGradient) {
            heroGradient.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // ==========================================
    // タイピングアニメーション
    // ==========================================
    const typeWriter = (element, text, speed = 50) => {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    };

    // ヒーローセクションのサブタイトルにタイピング効果を適用
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        setTimeout(() => {
            typeWriter(heroSubtitle, originalText, 100);
        }, 500);
    }

    // ==========================================
    // EmailJS初期化とフォーム送信処理
    // ==========================================
    
    // EmailJS初期化（あなたのUser IDに置き換えてください）
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_USER_ID"); // ここを実際のUser IDに置き換え
    }
    
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
            
            // EmailJSでメール送信
            if (typeof emailjs !== 'undefined') {
                emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                    .then(function() {
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
                    }, function(error) {
                        // 送信エラー
                        console.log('FAILED...', error);
                        submitBtn.innerHTML = '<span>送信エラー</span>';
                        submitBtn.style.background = '#f44336';
                        
                        // エラーメッセージを表示
                        showErrorMessage('送信に失敗しました。しばらく経ってから再度お試しください。');
                        
                        setTimeout(() => {
                            submitBtn.innerHTML = originalText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }, 3000);
                    });
            } else {
                // EmailJSが読み込まれていない場合
                console.log('EmailJS not loaded');
                submitBtn.innerHTML = '<span>エラー</span>';
                submitBtn.style.background = '#f44336';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }
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

    // ==========================================
    // Works 自動スクロール機能
    // ==========================================
    const autoScrollers = {
        apparel: document.getElementById('apparelScroll'),
        digital: document.getElementById('digitalScroll')
    };

    // ホバー時のアニメーション一時停止機能
    Object.values(autoScrollers).forEach(scroller => {
        if (scroller) {
            scroller.addEventListener('mouseenter', () => {
                scroller.style.animationPlayState = 'paused';
            });
            
            scroller.addEventListener('mouseleave', () => {
                scroller.style.animationPlayState = 'running';
            });
        }
    });

    // レスポンシブ対応のためのアニメーション速度調整
    function adjustScrollSpeed() {
        const isMobile = window.innerWidth <= 768;
        const apparelScroll = autoScrollers.apparel;
        const digitalScroll = autoScrollers.digital;
        
        if (apparelScroll) {
            apparelScroll.style.animationDuration = isMobile ? '20s' : '25s';
        }
        
        if (digitalScroll) {
            digitalScroll.style.animationDuration = isMobile ? '25s' : '35s';
        }
    }

    // 初期設定とリサイズ時の調整
    adjustScrollSpeed();
    window.addEventListener('resize', adjustScrollSpeed);

    // Works ホバーエフェクト
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach(item => {
        // ホバー時のエフェクト
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            // 親要素のアニメーションを一時停止
            const scrollContainer = this.closest('.works-auto-scroll');
            if (scrollContainer) {
                scrollContainer.style.animationPlayState = 'paused';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
            // 親要素のアニメーションを再開
            const scrollContainer = this.closest('.works-auto-scroll');
            if (scrollContainer) {
                scrollContainer.style.animationPlayState = 'running';
            }
        });

        // クリック時のアクションを追加したい場合はここに追加
        item.addEventListener('click', function() {
            // 例: モーダルや詳細ページへのリンク
            console.log('ワークアイテムがクリックされました:', this.querySelector('h3')?.textContent);
        });
    });

    // カウントアップアニメーションを削除しました

    // ==========================================
    // マウス追従グラデーション
    // ==========================================
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            const gradient = hero.querySelector('.hero-gradient');
            if (gradient) {
                gradient.style.background = `
                    radial-gradient(
                        circle at ${x}% ${y}%,
                        rgba(0, 0, 0, 0.15) 0%,
                        rgba(50, 50, 50, 0.1) 25%,
                        rgba(100, 100, 100, 0.05) 50%,
                        transparent 100%
                    )
                `;
            }
        });
    }

    // ==========================================
    // ローディングアニメーション
    // ==========================================
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // 各セクションを順次表示
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });

    // 初期スタイル設定
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });

    // ==========================================
    // モバイル用タッチイベント
    // ==========================================
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 左スワイプ
                console.log('Swiped left');
            } else {
                // 右スワイプ
                console.log('Swiped right');
            }
        }
    }

    // ==========================================
    // デバッグ用コンソールメッセージ
    // ==========================================
    console.log('%c M4M AGENCY ', 'background: linear-gradient(135deg, #2a2a2a 0%, #000000 100%); color: white; font-size: 20px; padding: 10px;');
    console.log('Website initialized successfully!');
    
    // EmailJS設定確認
    if (typeof emailjs !== 'undefined') {
        console.log('✅ EmailJS loaded successfully');
    } else {
        console.warn('⚠️ EmailJS not loaded');
    }
});

// ==========================================
// パフォーマンス最適化
// ==========================================
// スクロールイベントのデバウンス
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// リサイズイベントのスロットル
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ウィンドウリサイズ時の処理
window.addEventListener('resize', throttle(() => {
    // レスポンシブ対応の処理
    console.log('Window resized');
}, 200));

// ==========================================
// Network Diagram
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    const networkContainer = document.getElementById('networkDiagram');
    console.log('Network container found:', networkContainer);
    if (!networkContainer) {
        console.log('Network container not found!');
        return;
    }

    const networkPartners = [
        { title: "Art Work\n" },
        { title: "シルクスクリーン\n" },
        { title: "ロゴデザイン\n" },
        { title: "フライヤーデザイン\n" }
    ];

    // Base size for mobile/tablet
    const baseWidth = 520;
    const baseHeight = 520;
    
    // Scale up for PC (lg screens and above)
    const isLargeScreen = window.innerWidth >= 1024;
    const scale = isLargeScreen ? 1.6 : 1.0;
    
    const containerWidth = baseWidth * scale;
    const containerHeight = baseHeight * scale;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    const radiusX = 180 * scale;
    const radiusY = 180 * scale;
    const centerRadius = 65 * scale;
    const partnerRadius = 70 * scale;

    // Create the container
    networkContainer.style.position = 'relative';
    networkContainer.style.width = '100%';
    networkContainer.style.height = isLargeScreen ? '800px' : '520px';
    networkContainer.style.display = 'flex';
    networkContainer.style.alignItems = 'center';
    networkContainer.style.justifyContent = 'center';

    // Create inner container
    const innerContainer = document.createElement('div');
    innerContainer.style.position = 'relative';
    innerContainer.style.width = containerWidth + 'px';
    innerContainer.style.height = containerHeight + 'px';
    innerContainer.style.transform = 'translateX(0)';
    networkContainer.appendChild(innerContainer);

    // Create SVG for lines
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.position = 'absolute';
    svg.style.inset = '0';
    svg.style.width = '100%';
    svg.style.height = '100%';
    svg.style.pointerEvents = 'none';
    svg.setAttribute('width', containerWidth);
    svg.setAttribute('height', containerHeight);

    // Draw connection lines
    networkPartners.forEach((_, index) => {
        const angle = (index * 90) * (Math.PI / 180);
        const outerX = centerX + radiusX * Math.cos(angle);
        const outerY = centerY + radiusY * Math.sin(angle);
        const innerX = centerX + centerRadius * Math.cos(angle);
        const innerY = centerY + centerRadius * Math.sin(angle);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', innerX);
        line.setAttribute('y1', innerY);
        line.setAttribute('x2', outerX);
        line.setAttribute('y2', outerY);
        line.setAttribute('stroke', '#9CA3AF');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);
    });

    innerContainer.appendChild(svg);

    // Create center circle with logo
    const centerCircle = document.createElement('div');
    centerCircle.style.position = 'absolute';
    centerCircle.style.width = (centerRadius * 2) + 'px';
    centerCircle.style.height = (centerRadius * 2) + 'px';
    centerCircle.style.backgroundColor = 'white';
    centerCircle.style.borderRadius = '50%';
    centerCircle.style.display = 'flex';
    centerCircle.style.alignItems = 'center';
    centerCircle.style.justifyContent = 'center';
    centerCircle.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
    centerCircle.style.zIndex = '10';
    centerCircle.style.transform = 'translate(-50%, -50%)';
    centerCircle.style.left = centerX + 'px';
    centerCircle.style.top = centerY + 'px';
    centerCircle.style.border = '1px solid #e5e7eb';

    const logoImg = document.createElement('img');
    logoImg.src = 'images/M4Mのロゴ.png';
    logoImg.alt = 'M4M';
    logoImg.style.height = isLargeScreen ? '120px' : '80px';
    logoImg.style.width = 'auto';
    centerCircle.appendChild(logoImg);
    innerContainer.appendChild(centerCircle);

    // Create partner circles
    networkPartners.forEach((partner, index) => {
        const angle = (index * 90) * (Math.PI / 180);
        const x = centerX + radiusX * Math.cos(angle);
        const y = centerY + radiusY * Math.sin(angle);
        
        const partnerCircle = document.createElement('div');
        partnerCircle.style.position = 'absolute';
        partnerCircle.style.width = (partnerRadius * 2) + 'px';
        partnerCircle.style.height = (partnerRadius * 2) + 'px';
        partnerCircle.style.backgroundColor = 'black';
        partnerCircle.style.color = 'white';
        partnerCircle.style.borderRadius = '50%';
        partnerCircle.style.display = 'flex';
        partnerCircle.style.alignItems = 'center';
        partnerCircle.style.justifyContent = 'center';
        partnerCircle.style.fontSize = isLargeScreen ? '18px' : '15px';
        partnerCircle.style.fontWeight = '600';
        partnerCircle.style.textAlign = 'center';
        partnerCircle.style.lineHeight = '1.3';
        partnerCircle.style.transform = 'translate(-50%, -50%)';
        partnerCircle.style.left = x + 'px';
        partnerCircle.style.top = y + 'px';
        partnerCircle.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';

        const span = document.createElement('span');
        span.style.whiteSpace = 'nowrap';
        span.style.padding = isLargeScreen ? '0 12px' : '0 10px';
        span.textContent = partner.title;
        partnerCircle.appendChild(span);
        
        innerContainer.appendChild(partnerCircle);
    });
    
    console.log('Network diagram created successfully!');
});
