// ===== 数据 =====

const reviewsData = [
  {
    id: 1, genre: "rpg", title: "幻境传说：龙裔之战",
    emoji: "🐉", bg: "linear-gradient(135deg, #1a1a2e, #16213e)",
    score: 9.8, platforms: ["PC", "PS5"],
    desc: "史诗级开放世界RPG，庞大的世界观与深度剧情令人叹为观止，战斗系统流畅而富有策略性。",
    author: "龙骑士", date: "2026-03-25", stars: 5
  },
  {
    id: 2, genre: "action", title: "钢铁战神：末日崛起",
    emoji: "⚔️", bg: "linear-gradient(135deg, #2d1b1b, #4a1515)",
    score: 9.2, platforms: ["PC", "Xbox"],
    desc: "震撼的动作体验，敌人AI智能且具挑战性，画面效果堪称业界标杆，Boss战设计精彩绝伦。",
    author: "战神", date: "2026-03-22", stars: 5
  },
  {
    id: 3, genre: "indie", title: "像素旅途",
    emoji: "🎮", bg: "linear-gradient(135deg, #1a2e1a, #0d4a2a)",
    score: 8.9, platforms: ["PC"],
    desc: "充满创意的独立游戏，独特的像素艺术风格配合感人的故事，令人沉浸其中无法自拔。",
    author: "像素猫", date: "2026-03-20", stars: 4
  },
  {
    id: 4, genre: "strategy", title: "星际帝国：银河征服",
    emoji: "🚀", bg: "linear-gradient(135deg, #0d1a2e, #0a2040)",
    score: 9.0, platforms: ["PC"],
    desc: "深度策略游戏，庞大的科技树与外交系统，多人模式体验极佳，适合策略迷长时间沉浸。",
    author: "银河将军", date: "2026-03-18", stars: 5
  },
  {
    id: 5, genre: "fps", title: "暗影特工：零点行动",
    emoji: "🎯", bg: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
    score: 8.7, platforms: ["PC", "PS5", "Xbox"],
    desc: "精准的射击手感，多样化的地图设计，竞技模式平衡性优秀，是年度最佳FPS之一。",
    author: "神枪手", date: "2026-03-15", stars: 4
  },
  {
    id: 6, genre: "rpg", title: "时空织梦者",
    emoji: "⏳", bg: "linear-gradient(135deg, #2d1a3e, #1a0a2e)",
    score: 9.5, platforms: ["PC", "Switch"],
    desc: "令人惊叹的时间旅行机制，多条支线剧情环环相扣，每一个选择都影响最终结局。",
    author: "梦境旅人", date: "2026-03-12", stars: 5
  }
];

const classicsData = [
  { id: 1, title: "超级马里奥兄弟", emoji: "🍄", year: 1985, era: "80s", score: 9.9, bg: "#e63946" },
  { id: 2, title: "塞尔达传说", emoji: "🗡️", year: 1986, era: "80s", score: 9.8, bg: "#2d6a4f" },
  { id: 3, title: "街头霸王II", emoji: "🥊", year: 1991, era: "90s", score: 9.7, bg: "#e76f51" },
  { id: 4, title: "最终幻想VII", emoji: "🌟", year: 1997, era: "90s", score: 9.9, bg: "#023e8a" },
  { id: 5, title: "古惑狼", emoji: "🦊", year: 1996, era: "90s", score: 9.0, bg: "#e9c46a" },
  { id: 6, title: "星际争霸", emoji: "👽", year: 1998, era: "90s", score: 9.8, bg: "#1d3557" },
  { id: 7, title: "魔兽世界", emoji: "⚔️", year: 2004, era: "2000s", score: 9.7, bg: "#6a0572" },
  { id: 8, title: "半条命2", emoji: "🔫", year: 2004, era: "2000s", score: 9.8, bg: "#ff6b35" },
  { id: 9, title: "我的世界", emoji: "🧱", year: 2011, era: "2010s", score: 9.5, bg: "#52b788" },
  { id: 10, title: "上古卷轴V", emoji: "🐲", year: 2011, era: "2010s", score: 9.6, bg: "#2b2d42" },
  { id: 11, title: "黑魂III", emoji: "💀", year: 2016, era: "2010s", score: 9.7, bg: "#1a1a2e" },
  { id: 12, title: "旷野之息", emoji: "🌿", year: 2017, era: "2010s", score: 9.9, bg: "#74c69d" },
  { id: 13, title: "俄罗斯方块", emoji: "🧩", year: 1984, era: "80s", score: 9.5, bg: "#240046" },
  { id: 14, title: "赛车大奖赛", emoji: "🏎️", year: 1992, era: "90s", score: 8.8, bg: "#dc2f02" },
  { id: 15, title: "光晕2", emoji: "🪐", year: 2004, era: "2000s", score: 9.5, bg: "#0d3b66" },
  { id: 16, title: "女神异闻录5", emoji: "🎭", year: 2016, era: "2010s", score: 9.8, bg: "#c1121f" }
];

const rankingData = {
  hot: [
    { name: "幻境传说：龙裔之战", genre: "RPG", icon: "🐉", score: 9.8 },
    { name: "星际帝国：银河征服", genre: "策略", icon: "🚀", score: 9.0 },
    { name: "暗影特工：零点行动", genre: "FPS", icon: "🎯", score: 8.7 },
    { name: "时空织梦者", genre: "RPG", icon: "⏳", score: 9.5 },
    { name: "像素旅途", genre: "独立", icon: "🎮", score: 8.9 }
  ],
  score: [
    { name: "旷野之息", genre: "冒险", icon: "🌿", score: 9.9 },
    { name: "幻境传说：龙裔之战", genre: "RPG", icon: "🐉", score: 9.8 },
    { name: "最终幻想VII", genre: "RPG", icon: "🌟", score: 9.9 },
    { name: "时空织梦者", genre: "RPG", icon: "⏳", score: 9.5 },
    { name: "超级马里奥兄弟", genre: "平台", icon: "🍄", score: 9.9 }
  ],
  user: [
    { name: "我的世界", genre: "沙盒", icon: "🧱", score: 9.5 },
    { name: "星际争霸", genre: "策略", icon: "👽", score: 9.8 },
    { name: "钢铁战神", genre: "动作", icon: "⚔️", score: 9.2 },
    { name: "魔兽世界", genre: "MMORPG", icon: "⚔️", score: 9.7 },
    { name: "黑魂III", genre: "动作RPG", icon: "💀", score: 9.7 }
  ]
};

// ===== 渲染测评卡片 =====
function renderReviews(filter = 'all') {
  const grid = document.getElementById('reviewsGrid');
  const filtered = filter === 'all' ? reviewsData : reviewsData.filter(r => r.genre === filter);

  grid.innerHTML = filtered.map(r => {
    const stars = Array(5).fill(0).map((_, i) =>
      `<span class="star ${i < r.stars ? '' : 'empty'}">${i < r.stars ? '★' : '☆'}</span>`
    ).join('');

    return `
      <div class="review-card fade-in" onclick="openReview(${r.id})">
        <div class="review-thumb" style="background: ${r.bg}">
          <div class="review-genre">${getGenreLabel(r.genre)}</div>
          <div style="font-size:64px; filter:drop-shadow(0 0 15px rgba(255,255,255,0.3))">${r.emoji}</div>
          <div class="review-score-badge">${r.score}</div>
        </div>
        <div class="review-body">
          <div class="review-platform">
            ${r.platforms.map(p => `<span class="platform-tag">${p}</span>`).join('')}
          </div>
          <div class="star-rating">${stars}</div>
          <h3 class="review-title">${r.title}</h3>
          <p class="review-desc">${r.desc}</p>
          <div class="review-footer">
            <div class="review-author">
              <div class="author-avatar">👤</div>
              <span>${r.author}</span>
            </div>
            <span class="review-date">${r.date}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // 触发动画
  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 80);
    });
  }, 50);
}

function getGenreLabel(genre) {
  const map = { rpg: 'RPG', action: '动作', strategy: '策略', indie: '独立', fps: '射击' };
  return map[genre] || genre;
}

// ===== 渲染经典游戏 =====
function renderClassics(filter = 'all') {
  const grid = document.getElementById('classicsGrid');
  const filtered = filter === 'all' ? classicsData : classicsData.filter(c => c.era === filter);

  grid.innerHTML = filtered.map(c => `
    <div class="classic-card fade-in" onclick="openClassic(${c.id})">
      <div class="classic-thumb" style="background: ${c.bg}20; border-bottom: 1px solid ${c.bg}40">
        <div style="font-size:52px; filter:drop-shadow(0 0 10px rgba(255,255,255,0.2))">${c.emoji}</div>
        <span class="classic-era">${c.era}</span>
      </div>
      <div class="classic-body">
        <div class="classic-title">${c.title}</div>
        <div class="classic-year">${c.year} 年</div>
        <div class="classic-score">⭐ ${c.score}</div>
      </div>
    </div>
  `).join('');

  setTimeout(() => {
    document.querySelectorAll('.fade-in').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 40);
    });
  }, 50);
}

// ===== 渲染排行榜 =====
function renderRanking() {
  const rankNums = ['gold', 'silver', 'bronze', 'normal', 'normal'];

  ['hot', 'score', 'user'].forEach(type => {
    const el = document.getElementById(type + 'Rank');
    const data = rankingData[type];
    el.innerHTML = data.map((item, i) => `
      <div class="rank-item">
        <div class="rank-num ${rankNums[i]}">${i + 1}</div>
        <div class="rank-icon">${item.icon}</div>
        <div class="rank-info">
          <div class="rank-name">${item.name}</div>
          <div class="rank-genre">${item.genre}</div>
        </div>
        <div class="rank-score">${item.score}</div>
      </div>
    `).join('');
  });
}

// ===== 筛选功能 =====
function filterReviews(genre, btn) {
  document.querySelectorAll('.filter-tabs .tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderReviews(genre);
}

function filterEra(era, btn) {
  document.querySelectorAll('.era-tabs .era-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderClassics(era);
}

// ===== 游戏详情弹窗 =====
function openReview(id) {
  const game = reviewsData.find(r => r.id === id);
  if (!game) return;
  showModal(`
    <div style="text-align:center; padding: 20px 0 10px;">
      <div style="font-size:80px; margin-bottom:16px; filter:drop-shadow(0 0 20px rgba(255,255,255,0.3))">${game.emoji}</div>
      <div class="game-genre-badge" style="display:inline-block; margin-bottom:12px">${getGenreLabel(game.genre)}</div>
      <h2 style="font-size:24px; font-weight:900; margin-bottom:8px">${game.title}</h2>
      <div style="font-size:48px; font-weight:900; color:#f59e0b; margin:12px 0">${game.score}<span style="font-size:18px; color:#64748b">/10</span></div>
      <p style="color:#94a3b8; line-height:1.7; margin-bottom:20px; text-align:left">${game.desc}</p>
      <div style="display:flex; gap:8px; justify-content:center; flex-wrap:wrap">
        ${game.platforms.map(p => `<span class="platform-tag" style="font-size:13px; padding:6px 14px">${p}</span>`).join('')}
      </div>
      <div style="margin-top:16px; color:#64748b; font-size:13px">测评作者：${game.author} · ${game.date}</div>
    </div>
  `);
}

function openClassic(id) {
  const game = classicsData.find(c => c.id === id);
  if (!game) return;
  showModal(`
    <div style="text-align:center; padding: 20px 0 10px;">
      <div style="font-size:80px; margin-bottom:16px; filter:drop-shadow(0 0 20px rgba(255,255,255,0.3))">${game.emoji}</div>
      <h2 style="font-size:24px; font-weight:900; margin-bottom:8px">${game.title}</h2>
      <div style="color:#94a3b8; margin-bottom:12px">${game.year} 年发售 · ${game.era} 经典</div>
      <div style="font-size:40px; font-weight:900; color:#f59e0b; margin:12px 0">⭐ ${game.score}</div>
      <p style="color:#94a3b8; line-height:1.7; text-align:left">
        这是一款在 ${game.year} 年发售的经典游戏，至今仍被玩家奉为传世之作。
        它以独特的游戏机制和无与伦比的游戏体验，在游戏史上留下了不可磨灭的印记。
      </p>
    </div>
  `);
}

function showModal(content) {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,0.85); backdrop-filter: blur(10px);
    display: flex; align-items: center; justify-content: center;
    padding: 24px; animation: fadeInModal 0.2s ease;
  `;
  modal.innerHTML = `
    <div style="
      background: #13131f; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px; padding: 32px; max-width: 480px; width: 100%;
      position: relative; max-height: 80vh; overflow-y: auto;
    ">
      <button onclick="this.closest('[data-modal]').remove()" style="
        position:absolute; top:16px; right:16px; background:none; border:none;
        color:#94a3b8; font-size:20px; cursor:pointer; padding:4px;
      ">✕</button>
      ${content}
    </div>
  `;
  modal.setAttribute('data-modal', '');
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);

  // 为关闭按钮补充功能
  modal.querySelector('button').onclick = () => modal.remove();
}

// ===== 移动端菜单 =====
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('active');
}

// ===== 数字动画 =====
function animateNumbers() {
  const targets = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const start = Date.now();
        const timer = setInterval(() => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(eased * target).toLocaleString();
          if (progress >= 1) {
            clearInterval(timer);
            el.textContent = target.toLocaleString();
          }
        }, 16);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  targets.forEach(el => observer.observe(el));
}

// ===== 滚动动画 =====
function setupScrollAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== 粒子背景 =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(${Math.random() > 0.5 ? '124,58,237' : '6,182,212'}, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
      animation-delay: ${Math.random() * -10}s;
    `;
    container.appendChild(particle);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleFloat {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { transform: translateY(-100vh) translateX(${(Math.random() - 0.5) * 200}px); opacity: 0; }
    }
    @keyframes fadeInModal {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
}

// ===== 导航栏滚动效果 =====
function setupNavbar() {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 10, 15, 0.98)';
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.85)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// ===== 订阅表单 =====
function setupSubscribe() {
  const btn = document.querySelector('.sub-btn');
  const input = document.querySelector('.sub-input');
  if (btn && input) {
    btn.addEventListener('click', () => {
      const email = input.value.trim();
      if (email && email.includes('@')) {
        btn.textContent = '✓ 订阅成功！';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        input.value = '';
        setTimeout(() => {
          btn.textContent = '立即订阅';
          btn.style.background = '';
        }, 3000);
      } else {
        input.style.borderColor = '#ef4444';
        input.placeholder = '请输入有效的邮箱地址';
        setTimeout(() => {
          input.style.borderColor = '';
          input.placeholder = '输入您的邮箱地址...';
        }, 2000);
      }
    });
  }
}

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  renderReviews();
  renderClassics();
  renderRanking();
  animateNumbers();
  setupScrollAnimations();
  setupNavbar();
  setupSubscribe();

  // 监听新渲染的元素
  const mutationObserver = new MutationObserver(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
  });

  mutationObserver.observe(document.getElementById('reviewsGrid'), { childList: true });
  mutationObserver.observe(document.getElementById('classicsGrid'), { childList: true });
});
