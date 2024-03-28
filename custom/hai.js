let hai = {
  //是否是文章页
  is_Post: function() {
    return window.location.href.indexOf("/p/") >= 0
  },
  changeThemeColor: function(e) {
    if (null !== document.querySelector('meta[name="theme-color"]') && (document.querySelector('meta[name="theme-color"]').setAttribute("content", e),
    document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content", e)),
    window.matchMedia("(display-mode: standalone)").matches) {
        const t = document.body;
        t ? t.style.backgroundColor = e : console.error("document.body不存在")
    }
  },
  initThemeColor: function() {
    window.addEventListener('scroll', utils.throttle(function (e) {   
        const currentTop = window.scrollY || document.documentElement.scrollTop;
        if (sco.is_Post()) {
            if (currentTop == 0) {
                let e = getComputedStyle(document.documentElement).getPropertyValue("--sco-main");
                sco.changeThemeColor(e)
            } else{
                let e = getComputedStyle(document.documentElement).getPropertyValue("--sco-card-bg");
                sco.changeThemeColor(e)
            }
        }else if (currentTop == 0) {
            let e = getComputedStyle(document.documentElement).getPropertyValue("--sco-background");
            sco.changeThemeColor(e)
        }else{
            let e = getComputedStyle(document.documentElement).getPropertyValue("--sco-card-bg");
            sco.changeThemeColor(e)
        }
    }, 200));
  }
}
window.refreshFn = () => {
  hai.initThemeColor()
}
