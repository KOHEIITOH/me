window.addEventListener('load', function () {
  // カスタムモーダル用の要素取得
  const customModal = document.getElementById('custom-modal'),
        modalText = document.getElementById('modal-text'),
        modalBtnOk = document.getElementById('modal-btn-ok'),
        modalBtnCancel = document.getElementById('modal-btn-cancel');

  // モーダル表示用関数 (Promiseを返して同期的に待てるようにする)
  function showModal(text, isConfirm = false) {
    return new Promise((resolve) => {
      // 毎回最新の要素を取得する（DOM入れ替えで参照が古くならないように）
      const currentBtnOk = document.getElementById('modal-btn-ok');
      const currentBtnCancel = document.getElementById('modal-btn-cancel');

      // テキストの設定
      modalText.textContent = text;
      
      // ボタンの表示切り替え
      if (isConfirm) {
        currentBtnCancel.style.display = 'inline-block';
      } else {
        currentBtnCancel.style.display = 'none';
      }

      // イベントリスナーの重複を防ぐためボタンをクローンして置き換え
      const newBtnOk = currentBtnOk.cloneNode(true);
      const newBtnCancel = currentBtnCancel.cloneNode(true);
      currentBtnOk.parentNode.replaceChild(newBtnOk, currentBtnOk);
      currentBtnCancel.parentNode.replaceChild(newBtnCancel, currentBtnCancel);

      newBtnOk.addEventListener('click', () => {
        customModal.close();
        resolve(true); // OKが押された
      });

      newBtnCancel.addEventListener('click', () => {
        customModal.close();
        resolve(false); // キャンセルされた
      });

      // 表示
      customModal.showModal();
    });
  }

  const profile_element = document.querySelector('.js-click-profile'),
    secret_entrance = document.querySelector('.js-secret');

  profile_element.addEventListener("click", async function (e) {
    e.preventDefault();
    const lf = "\n",
      jp_text = "伊藤 光平（いとう こうへい）" + lf + "平成10年3月9日生まれ" + lf + "埼玉県出身",
      en_text = "KOHEI ITOH" + lf + "3/9/1998" + lf + "Saitama (JP)",
      text = jp_text + lf + lf + lf + en_text;

    await showModal(text);
  });

  secret_entrance.addEventListener("click", async function (e) {
    e.preventDefault();
    const isOk = await showModal("SECRET ENTRANCE", true);
    if (!isOk) {
      return;
    }

    const request = new XMLHttpRequest(),
      today_datetime = new Date().toLocaleDateString("ja-JP", { year: "numeric", month: "2-digit", day: "2-digit" }).replaceAll('/', '-');
    let text = "工事中・・・";

    request.open('GET', 'https://holidays-jp.github.io/api/v1/date.json', true);
    request.responseType = 'json';
    request.send(null);

    request.onload = async function () {
      const data = this.response;
      console.log(data);
      
      if (data && data[today_datetime]) {
        text = "本日は日本の祝日です！！\n\n「" + data[today_datetime] + "」";
      }
      await showModal(text);
    };
    request.onerror = async function () {
      await showModal(text);
    }
    request.onabort = async function () {
      await showModal(text);
    }
    request.ontimeout = async function () {
      await showModal(text);
    }
  });

  // 無効設定
  const invalidElements = document.querySelectorAll('.invalid');
  invalidElements.forEach(function (el) {
    el.addEventListener('click', async function (event) {
      event.preventDefault();
      console.log('無効');
      await showModal('このリンクは現在無効です。');
    });
  });

  // スムーススクロール
  const scroll_links = document.querySelectorAll('.scroll-link');

  scroll_links.forEach((scroll_link) => {
    scroll_link.addEventListener("click", (e) => {
      e.preventDefault();

      const href_link = scroll_link.getAttribute("href"),
        target_content = document.querySelector(href_link);

      if (target_content) {
        const header_height = document.querySelector('.sticky-header').offsetHeight,
          target_position = target_content.getBoundingClientRect().top + window.scrollY - header_height - 20;

        window.scrollTo({
          top: target_position,
          behavior: "smooth",
        });
      }
    });
  });

  // スクロール時のフェードイン（IntersectionObserver）
  const fadeElements = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });
});