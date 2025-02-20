class WorkManager {
    constructor() {
      this.workList = document.querySelector(".grid-container"); // 作品列表
      this.workDetail = document.getElementById("work-detail"); // 作品详情区域

      if (!this.workList || !this.workDetail) {
        console.error("❌ 错误：找不到作品列表或详情元素！");
        return;
      }

      this.setupEventListeners();
      this.checkInitialHash();
    }

    setupEventListeners() {
      console.log("🎯 绑定点击事件到作品卡片...");
      document.querySelectorAll(".work-item").forEach(item => {
        item.addEventListener("click", (event) => {
          const workId = item.dataset.id;
          console.log(`📌 作品卡片点击，ID: ${workId}`);
          this.showWorkDetail(workId);
        });
      });

      document.querySelectorAll(".back-to-list").forEach(button => {
        button.addEventListener("click", () => this.showWorkList());
      });

      window.addEventListener("hashchange", () => {
        this.checkInitialHash();
      });
    }

    checkInitialHash() {
      if (window.location.hash) {
        const workId = window.location.hash.substring(1);
        this.showWorkDetail(workId);
      } else {
        this.showWorkList();
      }
    }

    showWorkDetail(workId) {
      const work = document.getElementById(workId);
      if (!work) {
        console.error(`❌ 错误：找不到 ID 为 ${workId} 的作品`);
        return;
      }

      console.log(`✅ 显示作品: ${workId}`);
      this.workList.style.display = "none"; // 隐藏作品列表
      this.workDetail.style.display = "block"; // 显示作品详情

      document.querySelectorAll(".work-content").forEach(item => {
        item.classList.add("hidden");
      });

      work.classList.remove("hidden");
      window.location.hash = workId;
    }

    showWorkList() {
      this.workList.style.display = "grid";
      this.workDetail.style.display = "none";
      history.pushState(null, "", "#");
    }
  }

  new WorkManager();
});
