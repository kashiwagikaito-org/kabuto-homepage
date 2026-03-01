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