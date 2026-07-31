window.addEventListener('load', function () {
  const profile_element = document.querySelector('.js-click-profile'),
        secret_entrance = document.querySelector('.js-secret');

  // ---- GLOBAL NAV ----
  const globalNav    = document.getElementById('global-nav');
  const navToggle    = document.getElementById('nav-toggle');
  const navLinks     = document.getElementById('nav-links');
  const navLinkItems = navLinks.querySelectorAll('a[href^="#"]');

  // スクロールでナビ背景を濃くする
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      globalNav.classList.add('scrolled');
    } else {
      globalNav.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // ハンバーガーメニュー
  navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // ナビリンク: スムーズスクロール + モバイルメニューを閉じる
  navLinkItems.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href === '#page-top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href.startsWith('#')) {
        const target = document.getElementById(href.replace('#', ''));
        if (target) {
          e.preventDefault();
          const offset = globalNav.offsetHeight;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ヒーローの「Explore ↓」もスムーズスクロール
  const heroCta = document.querySelector('.hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', function (e) {
      const href = heroCta.getAttribute('href');
      const target = document.getElementById(href.replace('#', ''));
      if (target) {
        e.preventDefault();
        const offset = globalNav.offsetHeight;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  }

  // セクションに応じたナビリンクのアクティブ化
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('.main > div[id], #hero');
    const offset   = globalNav.offsetHeight + 10;
    let currentId  = '';
    sections.forEach(function (section) {
      const top = section.getBoundingClientRect().top;
      if (top <= offset) currentId = section.id;
    });
    navLinkItems.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  profile_element.addEventListener("click", function() {
    const lf = "\n",
          jp_text = "伊藤 光平（いとう こうへい）" + lf + "平成10年3月9日生まれ" + lf + "埼玉県出身",
          en_text = "KOHEI ITOH" + lf + "3/9/1998" + lf + "Saitama (JP)",
          text = jp_text + lf + lf + lf + en_text;

    alert(text);
  });

  secret_entrance.addEventListener("click", function() {
    if(!confirm("SECRET ENTRANCE")) {
      return;
    }

    const request        = new XMLHttpRequest(),
          today_datetime = new Date().toLocaleDateString("ja-JP", {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-');
    let text = "工事中・・・";

    request.open('GET', 'https://holidays-jp.github.io/api/v1/date.json', true);
    request.responseType = 'json';
    request.send(null);

    request.onload = function () {
      const data = this.response;

      console.log(data);
      if (data[today_datetime]) {
        text = "本日は日本の祝日です！！";
      }

      alert(text);
    };
    request.onerror = function() {
      alert(text);
    }
    request.onabort = function() {
      alert(text);
    }
    request.ontimeout = function() {
      alert(text);
    }
  });

  // 無効設定
  const invalidElements = document.querySelectorAll('.invalid');
  invalidElements.forEach(function (el) {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      console.log('無効');
      alert('このリンクは現在無効です。');
    });
  });

  // スムーススクロール
  // const scroll_links = document.querySelectorAll('a[href^="#"]');

  // scroll_links.forEach((scroll_link) => {
  //   scroll_link.addEventListener("click", (e) => {
  //     e.preventDefault();

  //     const href_link = scroll_link.getAttribute("href"),
  //           target_content = document.getElementById(href_link.replace("#", "")),
  //           header_height = document.querySelector('header').offsetHeight,
  //           target_position = target_content.getBoundingClientRect().top + window.scrollY - header_height;

  //     window.scrollTo({
  //       top: target_position,
  //       behavior: "smooth",
  //     });
  //   });
  // });
});