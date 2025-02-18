

// 移动端菜单切换
document.querySelector('.hamburger').addEventListener('click', function() {
  this.classList.toggle('active');
  document.querySelector('.nav-links').classList.toggle('active');
});

// 关闭移动菜单当点击外部区域
document.addEventListener('click', function(e) {
  const nav = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// 表单提交处理
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    const submitBtn = this.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.innerHTML = '发送中...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = '发送成功 ✓';
        submitBtn.classList.add('success');
        
        setTimeout(() => {
          if (form.dataset.netlify !== 'true') {
            form.reset();
          }
          submitBtn.innerHTML = '发送讯息 ➤';
          submitBtn.classList.remove('success');
          submitBtn.disabled = false;
        }, 2000);
      }, 1500);
    }
  });
});

// 页面滚动动画
window.addEventListener('scroll', function() {
  const scrolled = window.scrollY;
  document.documentElement.style.setProperty('--scroll', scrolled * 0.5);
});

// 作品画廊悬停效果
document.querySelectorAll('.work-item').forEach(item => {
  item.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.style.setProperty('--x', `${x}px`);
    this.style.setProperty('--y', `${y}px`);
  });
});

// LOGO鼠标交互
const logoContainer = document.querySelector('.logo-container');
const heroLogo = document.querySelector('.hero-logo');

if (logoContainer && heroLogo) {
  logoContainer.addEventListener('mousemove', (e) => {
    const rect = logoContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const rotateX = ((y - rect.height / 2) / rect.height) * 20;
    const rotateY = ((x - rect.width / 2) / rect.width) * -20;
    
    heroLogo.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  logoContainer.addEventListener('mouseleave', () => {
    heroLogo.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
  });
}


// 卡片悬停效果
document.querySelectorAll('.blog-card, .thread-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.style.setProperty('--x', `${x}px`);
    this.style.setProperty('--y', `${y}px`);
  });
});


window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.remove();
    }, 500);
  }
});


class ThemeManager {
  constructor() {
    this.themeToggle = document.querySelector('.theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle?.addEventListener('click', () => this.toggleTheme());
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(this.currentTheme);
  }
}

new ThemeManager();


const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
} else {
  console.error("❌ 错误：找不到 .back-to-top 按钮！");
}


window.addEventListener('load', () => {
  console.log("✅ 页面加载完成");

  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display = 'none';  // 用 display: none 替代 remove()，避免影响布局
    }, 500);
  }
});


backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

document.addEventListener("DOMContentLoaded", () => {
  class ThemeManager {
    constructor() {
      this.themeToggle = document.querySelector('.theme-toggle');
      if (!this.themeToggle) {
        console.error("❌ 主题切换按钮未找到！");
        return;
      }

      this.currentTheme = localStorage.getItem('theme') ||
                          (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      this.init();
    }

    init() {
      this.setTheme(this.currentTheme);
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      console.log(`🎨 主题切换为：${theme}`);
    }

    toggleTheme() {
      const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      this.setTheme(newTheme);
    }
  }

  new ThemeManager();
});
  
  const backToTop = document.querySelector('.back-to-top');

  if (!backToTop) {
    console.error("❌ 错误：找不到 .back-to-top 按钮！");
    return;  // 提前退出，避免后面 `null.addEventListener` 报错
  }

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  console.log("✅ 返回顶部按钮已加载");
});
