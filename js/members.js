// ========================================
// メンバーデータ（サンプル）
// ========================================
const memberData = {
  member1: {
    name: '田中 太郎',
    role: '代表',
    image: 'images/member1.jpg',
    message: '風舞人を20周年まで導けるよう、メンバー全員で最高のチームを作っていきます！宴会でも踊りでも誰にも負けません！',
    hobby: 'お酒を楽しむこと、温泉巡り',
    food: '焼き鳥、ビール'
  },
  member2: {
    name: '佐藤 花子',
    role: '副代表',
    image: 'images/member2.jpg',
    message: '踊りを通じて多くの人に感動を届けたい。そして、宴会では誰よりも盛り上げます！',
    hobby: 'カラオケ、料理',
    food: '唐揚げ、日本酒'
  },
  member3: {
    name: '鈴木 一郎',
    role: '総監督',
    image: 'images/member3.jpg',
    message: '経験を活かして、次世代のメンバーを育てていきたい。練習も宴会も全力投球！',
    hobby: '釣り、キャンプ',
    food: '刺身、焼酎'
  },
  member4: {
    name: '山田 美咲',
    role: '踊り子',
    image: 'images/member4.jpg',
    message: '楽しく踊って、たくさん笑って、最高の仲間と最高の思い出を作りたいです！',
    hobby: 'ダンス、映画鑑賞',
    food: 'ピザ、ワイン'
  },
  member5: {
    name: '高橋 健太',
    role: '踊り子',
    image: 'images/member5.jpg',
    message: '2024年は新しい挑戦の年でした。これからも成長し続けます！',
    hobby: 'スポーツ観戦、ゲーム',
    food: 'ラーメン、餃子'
  },
  member6: {
    name: '伊藤 舞',
    role: '踊り子',
    image: 'images/member6.jpg',
    message: '2023年は本当に楽しい一年でした。風舞人での経験は一生の宝物です！',
    hobby: 'カフェ巡り、読書',
    food: 'パスタ、ケーキ'
  }
};

// ========================================
// モーダル制御
// ========================================
const modal = document.getElementById('memberModal');
const modalOverlay = modal?.querySelector('.modal-overlay');
const modalClose = modal?.querySelector('.modal-close');

// モーダルを開く
function openModal(memberId) {
  const member = memberData[memberId];
  
  if (!member || !modal) return;
  
  // データを設定
  document.getElementById('modalName').textContent = member.name;
  document.getElementById('modalRole').textContent = member.role;
  document.getElementById('modalMessage').textContent = member.message;
  document.getElementById('modalHobby').textContent = member.hobby;
  document.getElementById('modalFood').textContent = member.food;
  
  const modalImage = document.getElementById('modalImage');
  modalImage.src = member.image;
  modalImage.alt = member.name;
  
  // 画像のエラーハンドリング
  modalImage.onerror = function() {
    this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%23dc143c' width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' font-size='120' fill='white' text-anchor='middle' dy='.3em'%3E👤%3C/text%3E%3C/svg%3E`;
  };
  
  // モーダルを表示
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// モーダルを閉じる
function closeModal() {
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// イベントリスナー設定
if (modal) {
  // メンバーカードをクリック
  document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', function() {
      const memberId = this.getAttribute('data-member');
      openModal(memberId);
    });
  });
  
  // 閉じるボタン
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // オーバーレイをクリック
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }
  
  // Escキーで閉じる
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ========================================
// メンバーカードのホバーエフェクト強化
// ========================================
document.querySelectorAll('.member-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.cursor = 'pointer';
  });
});

// ========================================
// 画像の遅延読み込み（オプション）
// ========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}