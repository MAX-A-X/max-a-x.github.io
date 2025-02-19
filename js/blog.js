class BlogManager {
  constructor() {
    this.blogList = document.querySelector('.blog-grid'); // 确保获取正确的列表
    this.blogDetail = document.getElementById('blog-detail');

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
    console.log("打开文章:", postId);

    if (!this.blogList || !this.blogDetail) {
      console.error("blog-list 或 blog-detail 未找到");
      return;
    }

    // 隐藏博客列表
    this.blogList.classList.add('hidden');

    // 显示博客详情
    this.blogDetail.classList.remove('hidden');

    // 隐藏所有文章
    document.querySelectorAll('.post-content').forEach(post => {
      post.classList.add('hidden');
    });

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
    console.log("返回博客列表");

    if (!this.blogList || !this.blogDetail) {
      console.error("blog-list 或 blog-detail 未找到");
      return;
    }

    this.blogList.classList.remove('hidden');
    this.blogDetail.classList.add('hidden');

    // 隐藏所有文章详情
    document.querySelectorAll('.post-content').forEach(post => {
      post.classList.add('hidden');
    });

    history.pushState("", document.title, window.location.pathname);
  }

  checkInitialHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      this.showBlogDetail(hash);
    } else {
      this.showBlogList();
    }
  }
}

// 启动博客管理
document.addEventListener('DOMContentLoaded', () => {
  new BlogManager();
});
