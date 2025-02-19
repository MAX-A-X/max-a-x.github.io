class BlogManager {
  constructor() {
    // 获取博客列表和详情容器
    this.blogList = document.querySelector('.blog-grid'); 
    this.blogDetail = document.getElementById('blog-detail');

    if (!this.blogList || !this.blogDetail) {
      console.error("❌ blog-list 或 blog-detail 未找到！");
      return;
    }

    // 监听 DOMContentLoaded 确保脚本加载完成
    document.addEventListener('DOMContentLoaded', () => {
      this.init();
    });
  }

  init() {
    console.log("✅ BlogManager 初始化成功");
    
    // 监听“阅读更多”按钮点击
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('read-more')) {
        e.preventDefault();
        const postId = e.target.getAttribute('data-post-id');
        console.log(`📖 阅读更多: postId = ${postId}`);
        this.showBlogDetail(postId);
      }
    });

    // 监听返回列表按钮
    document.body.addEventListener('click', (e) => {
      if (e.target.classList.contains('back-to-list')) {
        console.log("🔙 返回列表");
        this.showBlogList();
      }
    });

    // 监听 Hash 变化
    window.addEventListener('hashchange', () => this.checkInitialHash());

    // 初次加载时检查 Hash
    this.checkInitialHash();
  }

  showBlogDetail(postId) {
    if (!postId) {
      console.warn("⚠️ postId 为空，无法显示博客详情");
      return;
    }

    console.log(`📄 显示文章: postId = ${postId}`);

    // 隐藏博客列表
    this.blogList.classList.add('hidden');

    // 显示博客详情
    this.blogDetail.classList.remove('hidden');

    // 隐藏所有文章
    document.querySelectorAll('.post-content').forEach(post => {
      post.classList.add('hidden');
    });

    // 获取目标文章
    const post = document.getElementById(postId);
    if (post) {
      post.classList.remove('hidden');
      window.location.hash = postId;
    } else {
      console.warn(`❌ 未找到文章 ID: ${postId}`);
    }
  }

  showBlogList() {
    console.log("📃 显示博客列表");

    this.blogList.classList.remove('hidden');
    this.blogDetail.classList.add('hidden');

    // 清除 Hash
    history.pushState("", document.title, window.location.pathname);
  }

  checkInitialHash() {
    const hash = window.location.hash.substring(1); // 去掉 `#`
    if (hash) {
      console.log(`🔍 Hash 解析: ${hash}`);
      this.showBlogDetail(hash);
    } else {
      this.showBlogList();
    }
  }
}

// 启动博客管理
new BlogManager();
