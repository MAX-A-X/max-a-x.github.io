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

  showBlogDetail(postId) {
    // 确保 `postId` 不是空的
    if (!postId) return;

    // 隐藏博客列表
    this.blogList.classList.add('hidden');

    // 显示博客详情
    this.blogDetail.classList.remove('hidden');

    // 隐藏所有文章
    document.querySelectorAll('.post-content').forEach(post => {
        post.classList.add('hidden');
    });

    // 显示指定文章
    const post = document.getElementById(postId);
    if (post) {
        post.classList.remove('hidden');
    } else {
        console.warn(`未找到文章 ID: ${postId}`);
    }

    // 更新 URL Hash
    window.location.hash = postId;
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

function showBlogList() {
    // 显示博客列表
    document.getElementById('blog-list').classList.remove('hidden');
    
    // 隐藏博客详情
    document.getElementById('blog-detail').classList.add('hidden');
}


function backToList() {
    // 确保 showBlogList() 存在
    if (typeof showBlogList === 'function') {
        showBlogList();
    } else {
        console.error("showBlogList 方法未定义");
    }

    // 清除 URL Hash
    history.pushState("", document.title, window.location.pathname);
}



// 启动博客管理
new BlogManager();

