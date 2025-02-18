class BlogManager {
  constructor() {
    this.blogList = document.getElementById('blog-list');
    this.blogDetail = document.getElementById('blog-detail');
    this.init();
  }

  init() {
    // 使用事件委托处理动态内容
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more')) {
        this.handleReadMore(e);
      }
      if (e.target.classList.contains('back-to-list')) {
        this.showBlogList();
      }
    });

    // 初始化时检查hash
    this.checkInitialHash();
    window.addEventListener('hashchange', () => this.checkInitialHash());
  }

  handleReadMore(e) {
    e.preventDefault();
    const postId = e.target.getAttribute('href').split('#')[1];
    this.showBlogDetail(postId);
  }

  showBlogDetail(postId) {
    // 隐藏列表
    this.blogList.style.opacity = '0';
    
    // 显示详情容器
    this.blogDetail.classList.add('active');
    
    // 显示对应文章
    const post = document.getElementById(postId);
    if (post) {
      document.querySelectorAll('.post-content').forEach(p => p.classList.add('hidden'));
      post.classList.remove('hidden');
      window.location.hash = postId;
      
      // 添加滚动锁定
      document.body.style.overflow = 'hidden';
    }
  }

  showBlogList() {
    // 显示列表
    this.blogList.style.opacity = '1';
    
    // 隐藏详情容器
    this.blogDetail.classList.remove('active');
    
    // 移除hash
    history.replaceState(null, null, ' ');
    
    // 恢复滚动
    document.body.style.overflow = 'auto';
  }

  checkInitialHash() {
    if (window.location.hash) {
      const postId = window.location.hash.split('#')[1];
      this.showBlogDetail(postId);
    }
  }
}

// 初始化
new BlogManager();
