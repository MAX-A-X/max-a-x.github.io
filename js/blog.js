class BlogManager {
  constructor() {
    this.blogList = document.getElementById('blog-list');
    this.blogDetail = document.getElementById('blog-detail');
    
    // 确保页面加载完成后再执行
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  init() {
    // 监听“阅读更多”按钮点击
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more')) {
        e.preventDefault();
        const postId = e.target.getAttribute('data-post-id');
        this.showBlogDetail(postId);
      }
    });

    // 监听返回列表按钮
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('back-to-list')) {
        this.showBlogList();
      }
    });

    // 监听 Hash 变化
    window.addEventListener('hashchange', () => this.checkInitialHash());

    // 初次加载时检查 Hash
    this.checkInitialHash();
  }

  showBlogDetail(postId) {
    // 隐藏博客列表
    this.blogList.classList.add('hidden');

    // 显示博客详情页
    this.blogDetail.classList.remove('hidden');

    // 隐藏所有文章内容
    document.querySelectorAll('.post-content').forEach(post => post.classList.add('hidden'));

    // 显示目标文章
    const post = document.getElementById(postId);
    if (post) {
      post.classList.remove('hidden');
      window.location.hash = postId;
    } else {
      console.warn(`文章 ${postId} 不存在`);
    }
  }

  showBlogList() {
    // 显示博客列表
    this.blogList.classList.remove('hidden');

    // 隐藏博客详情
    this.blogDetail.classList.add('hidden');

    // 清除 Hash
    history.replaceState(null, null, window.location.pathname);
  }

  checkInitialHash() {
    const hash = window.location.hash.substring(1); // 去掉 `#`
    if (hash) {
      this.showBlogDetail(hash);
    } else {
      this.showBlogList();
    }
  }
}

// 启动博客管理
new BlogManager();
