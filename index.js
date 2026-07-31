window.addEventListener('load', function () {
  const profile_element = document.querySelector('.js-click-profile'),
        secret_entrance = document.querySelector('.js-secret');

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

  // ハンバーガーメニュー（右スライドドロワー型）
  const nav_toggle   = document.querySelector('.js-nav-toggle'),
        nav_overlay  = document.querySelector('.js-nav-overlay'),
        nav_backdrop = document.querySelector('.js-nav-backdrop');

  function toggleNav(open) {
    nav_toggle.classList.toggle('is-open', open);
    nav_overlay.classList.toggle('is-open', open);
    nav_backdrop.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-locked', open);
    nav_toggle.setAttribute('aria-expanded', open);
    nav_overlay.setAttribute('aria-hidden', !open);
    nav_toggle.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
  }

  nav_toggle.addEventListener('click', function () {
    toggleNav(!nav_overlay.classList.contains('is-open'));
  });

  // メニュー内リンククリックで閉じる
  nav_overlay.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      toggleNav(false);
    });
  });

  // Escキーで閉じる
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav_overlay.classList.contains('is-open')) {
      toggleNav(false);
    }
  });

  // ドロワーの外側クリックで閉じる
  document.addEventListener('click', function (e) {
    if (nav_overlay.classList.contains('is-open')
        && !nav_overlay.contains(e.target)
        && !nav_toggle.contains(e.target)) {
      toggleNav(false);
    }
  });
});