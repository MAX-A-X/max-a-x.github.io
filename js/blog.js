class BlogManager {
  constructor() {
    this.blogGrid = document.querySelector('.blog-grid');
    this.blogDetails = document.querySelector('.blog-details');
    this.init();
  }

  init() {
    // 阅读更多点击事件
    document.querySelectorAll('.read-more').forEach(link => {
      link.addEventListener('click', this.handleReadMore.bind(this));
    });

    // 返回列表点击事件
    document.querySelector('.back-to-list')?.addEventListener('click', () => {
      this.showBlogList();
    });

    // 处理URL hash变化
    window.addEventListener('hashchange', () => {
      const postId = window.location.hash.replace('#', '');
      if (postId) {
        this.showBlogDetail(postId);
      } else {
        this.showBlogList();
      }
    });

    // 初始化时检查hash
    if (window.location.hash) {
      const postId = window.location.hash.replace('#', '');
      this.showBlogDetail(postId);
    }
  }

  handleReadMore(e) {
    e.preventDefault();
    const postId = e.target.getAttribute('href').replace('#', '');
    this.showBlogDetail(postId);
    history.pushState(null, '', `#${postId}`);
  }

  showBlogDetail(postId) {
    const post = document.getElementById(postId);
    if (post) {
      this.blogGrid.classList.add('hidden');
      this.blogDetails.classList.add('active');
      post.style.display = 'block';
      
      // 隐藏其他文章
      document.querySelectorAll('.post-content').forEach(p => {
        if (p.id !== postId) {
          p.style.display = 'none';
        }
      });

      // 滚动到文章顶部
      post.scrollIntoView({ behavior: 'smooth' });
    }
  }

  showBlogList() {
    this.blogGrid.classList.remove('hidden');
    this.blogDetails.classList.remove('active');
    history.pushState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  new BlogManager();
});
