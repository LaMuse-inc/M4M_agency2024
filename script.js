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
    });

    // ナビゲーションリンククリックでメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
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
    // フォーム送信処理
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータを取得
            const formData = new FormData(contactForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // ここで実際の送信処理を行う
            // 現在はコンソールに出力するだけ
            console.log('フォームデータ:', data);
            
            // 送信成功のフィードバック
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>送信完了！</span>';
            submitBtn.style.background = '#000000';
            
            // フォームをリセット
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
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
