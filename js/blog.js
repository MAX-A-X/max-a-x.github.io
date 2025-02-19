class BlogManager {
  constructor() {
    this.blogList = document.getElementById('blog-list');
    this.blogDetail = document.getElementById('blog-detail');
    this.init();
  }

  init() {
    // 监听点击事件
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more')) {
        this.handleReadMore(e);
      }
      if (e.target.classList.contains('back-to-list')) {
        this.showBlogList();
      }
    });

    // 初始化时检查 URL Hash
    this.checkInitialHash();
    window.addEventListener('hashchange', () => this.checkInitialHash());
  }

  handleReadMore(e) {
    e.preventDefault();
    const postId = e.target.getAttribute('data-post-id');
    this.showBlogDetail(postId);
  }

  showBlogDetail(postId) {
    // 隐藏博客列表
    this.blogList.classList.add('hidden');

    // 显示博客详情
    this.blogDetail.classList.remove('hidden');

    // 隐藏所有文章内容
    document.querySelectorAll('.post-content').forEach(post => post.classList.add('hidden'));

    // 显示当前文章
    const post = document.getElementById(postId);
    if (post) {
      post.classList.remove('hidden');
      window.location.hash = postId;
    }
  }

  showBlogList() {
    // 显示博客列表
    this.blogList.classList.remove('hidden');

    // 隐藏博客详情
    this.blogDetail.classList.add('hidden');

    // 清除 Hash
    history.replaceState(null, null, ' ');
  }

  checkInitialHash() {
    if (window.location.hash) {
      const postId = window.location.hash.substring(1);
      this.showBlogDetail(postId);
    }
  }
}

// 初始化博客管理
new BlogManager();
