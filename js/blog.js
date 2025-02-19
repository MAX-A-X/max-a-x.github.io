class BlogManager {
  constructor() {
    this.blogList = document.querySelector('.blog-grid'); // 确保获取的是博客列表
    this.blogDetail = document.getElementById('blog-detail');

    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  init() {
    console.log("BlogManager 初始化");

    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more')) {
        e.preventDefault();
        const postId = e.target.getAttribute('data-post-id');
        this.showBlogDetail(postId);
      }
    });

    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('back-to-list')) {
        this.showBlogList();
      }
    });

    window.addEventListener('hashchange', () => this.checkInitialHash());

    this.checkInitialHash();
  }

  showBlogDetail(postId) {
    console.log(`显示文章: ${postId}`);

    if (!this.blogList || !this.blogDetail) {
      console.error("blog-grid 或 blog-detail 未找到");
      return;
    }

    this.blogList.classList.add('hidden');
    this.blogDetail.classList.remove('hidden');

    document.querySelectorAll('.post-content').forEach(post => post.classList.add('hidden'));

    const post = document.getElementById(postId);
    if (post) {
      post.classList.remove('hidden');
      window.location.hash = postId;
    } else {
      console.warn(`未找到文章 ID: ${postId}`);
    }
  }

  showBlogList() {
    console.log("返回博客列表");

    if (!this.blogList || !this.blogDetail) {
      console.error("blog-grid 或 blog-detail 未找到");
      return;
    }

    this.blogList.classList.remove('hidden');
    this.blogDetail.classList.add('hidden');

    document.querySelectorAll('.post-content').forEach(post => post.classList.add('hidden'));

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

document.addEventListener('DOMContentLoaded', () => {
  new BlogManager();
});
