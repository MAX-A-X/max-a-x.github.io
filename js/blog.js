/*
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
    const blogList = document.getElementById('blog-list');
    const blogDetail = document.getElementById('blog-detail');

    if (!blogList || !blogDetail) {
        console.error('❌ 错误：找不到博客列表或详情元素！');
        return;
    }

    blogList.classList.add('hidden');
    blogDetail.classList.remove('hidden');

    const post = document.getElementById(postId);
    if (post) {
        post.classList.remove('hidden');
        window.location.hash = postId;
    } else {
        console.warn(`⚠️ 未找到文章 ID: ${postId}`);
    }
}


    // 隐藏博客列表
    blogList.classList.add('hidden');

    // 显示博客详情
    blogDetail.classList.remove('hidden');

    // 隐藏所有文章内容
    const posts = document.querySelectorAll('.post-content');
    posts.forEach(post => post.classList.add('hidden'));

    // 显示指定的文章
    const targetPost = document.getElementById(postId);
    if (targetPost) {
        targetPost.classList.remove('hidden');
        // 更新 URL 哈希
        window.location.hash = postId;
    } else {
        console.warn(`未找到文章 ID: ${postId}`);
    }
}



  checkInitialHash() {
    const hash = window.location.hash.substring(1); // 去掉 #
    if (hash) {
      this.showBlogDetail(hash);
    } else {
      this.showBlogList();
    }
  }
}

function showBlogList() {
    document.getElementById('blog-list').classList.remove('hidden');
    document.getElementById('blog-detail').classList.add('hidden');
}

function backToList() {
    showBlogList();
    history.pushState("", document.title, window.location.pathname);
}


window.showBlogList = function () {
    console.log("返回博客列表");
    
    // 确保 HTML 元素存在
    let blogList = document.getElementById('blog-list');
    let blogDetail = document.getElementById('blog-detail');
    
    if (blogList && blogDetail) {
        blogList.classList.remove('hidden');
        blogDetail.classList.add('hidden');
    } else {
        console.error("blog-list 或 blog-detail 元素未找到");
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const blogManager = new BlogManager();
    blogManager.showBlogList();
});

/*
document.addEventListener('DOMContentLoaded', function() {
    let backButtons = document.querySelectorAll('.back-to-list'); 
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log("点击了返回列表");
            backToList();
        });
    });
});
*/
/* */
 /* 
document.querySelectorAll('.read-more').forEach(button => {
    button.addEventListener('click', function() {
        console.log("阅读更多按钮被点击了", this.dataset.postId);
    });
});

class BlogManager {
    constructor() {
        this.blogList = document.getElementById('blog-list');
        this.blogDetail = document.getElementById('blog-detail');
    }

    showBlogList() {
        if (this.blogList && this.blogDetail) {
            this.blogList.classList.remove('hidden');
            this.blogDetail.classList.add('hidden');
        } else {
            console.error('❌ 错误：找不到博客列表或详情元素！');
        }
    }
}

// 启动博客管理
new BlogManager();

*/










/*

class BlogManager {
  constructor() {
    this.blogList = document.querySelector(".blog-grid");
    this.blogDetail = document.getElementById("blog-detail");

    if (!this.blogList || !this.blogDetail) {
      console.error("❌ 错误：找不到博客列表或详情元素！");
      return;
    }

    this.init();
  }

  init() {
    console.log("✅ 博客管理器初始化");
    this.setupEventListeners();
    this.checkInitialHash();
  }

  setupEventListeners() {
    // 监听“阅读更多”按钮点击
    document.querySelectorAll(".read-more").forEach(button => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const postId = event.target.dataset.postId;
        console.log(`📌 阅读更多按钮被点击了 ${postId}`);
        this.showBlogDetail(postId);
      });
    });

    // 监听返回列表按钮
    document.querySelectorAll(".back-to-list").forEach(button => {
      button.addEventListener("click", () => this.showBlogList());
    });
  }

  checkInitialHash() {
    if (window.location.hash) {
      const postId = window.location.hash.substring(1);
      this.showBlogDetail(postId);
    } else {
      this.showBlogList();
    }
  }

  showBlogDetail(postId) {
    const post = document.getElementById(postId);
    if (!post) {
      console.error(`❌ 错误：找不到 ID 为 ${postId} 的文章`);
      return;
    }

    this.blogList.style.display = "none";
    this.blogDetail.style.display = "block";

    document.querySelectorAll(".post-content").forEach(post => {
      post.classList.add("hidden");
    });

    post.classList.remove("hidden");
    window.location.hash = postId;
  }

  showBlogList() {
    this.blogList.style.display = "grid";
    this.blogDetail.style.display = "none";
    history.pushState(null, "", "#");
  }
}

// 初始化博客管理器
document.addEventListener("DOMContentLoaded", () => new BlogManager());
*/




class BlogManager {
  constructor() {
    this.blogList = document.querySelector(".blog-grid"); // 博客列表
    this.blogDetail = document.getElementById("blog-detail"); // 博客详情区域

    if (!this.blogList || !this.blogDetail) {
      console.error("❌ 错误：找不到博客列表或详情元素！");
      return;
    }

    this.init();
  }

  init() {
    console.log("✅ 博客管理器初始化");
    this.setupEventListeners();
    this.checkInitialHash();
  }

  setupEventListeners() {
    // 监听所有 "阅读更多" 按钮
    document.querySelectorAll(".read-more").forEach(button => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const postId = event.target.dataset.postId;
        console.log(`📌 阅读更多按钮被点击，文章ID: ${postId}`);
        this.showBlogDetail(postId);
      });
    });

    // 监听返回按钮
    document.querySelectorAll(".back-to-list").forEach(button => {
      button.addEventListener("click", () => this.showBlogList());
    });
  }

  checkInitialHash() {
    if (window.location.hash) {
      const postId = window.location.hash.substring(1);
      this.showBlogDetail(postId);
    } else {
      this.showBlogList();
    }
  }

  showBlogDetail(postId) {
    const post = document.getElementById(postId);
    if (!post) {
      console.error(`❌ 错误：找不到 ID 为 ${postId} 的文章`);
      return;
    }

    console.log(`✅ 显示文章: ${postId}`);
    this.blogList.style.display = "none"; // 隐藏博客列表
    this.blogDetail.style.display = "block"; // 显示文章详情

    // 隐藏所有文章
    document.querySelectorAll(".post-content").forEach(post => {
      post.classList.add("hidden");
    });

    // 仅显示点击的文章
    post.classList.remove("hidden");
    window.location.hash = postId; // 更新 URL
  }

  showBlogList() {
    this.blogList.style.display = "grid"; // 显示博客列表
    this.blogDetail.style.display = "none"; // 隐藏博客详情
    history.pushState(null, "", "#"); // 清除 hash
  }
}



// 初始化博客管理器
document.addEventListener("DOMContentLoaded", () => new BlogManager());




document.addEventListener("DOMContentLoaded", function () {
  const readMoreLinks = document.querySelectorAll(".read-more");
  const blogGrid = document.querySelector(".blog-grid");
  const blogDetail = document.getElementById("blog-detail");
  const backButtons = document.querySelectorAll(".back-to-list");

  readMoreLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // 阻止默认的跳转行为

      const postId = this.getAttribute("data-post-id");
      const postContent = document.getElementById(postId);

      if (postContent) {
        blogGrid.style.display = "none"; // 隐藏文章列表
        blogDetail.classList.remove("hidden"); // 显示文章详情
        postContent.classList.remove("hidden"); // 显示具体文章
      }
    });
  });

  backButtons.forEach(button => {
    button.addEventListener("click", function () {
      blogGrid.style.display = "flex"; // 显示文章列表
      blogDetail.classList.add("hidden"); // 隐藏文章详情
      document.querySelectorAll(".post-content").forEach(post => {
        post.classList.add("hidden"); // 隐藏所有文章
      });
    });
  });
});
