window.addEventListener('load', function () {
  const profile_element = document.querySelector('.js-click-profile'),
        secret_entrance = document.querySelector('.js-secret');

  profile_element.addEventListener("click", function() {
    const lf = "\n";
    const jp_text = "伊藤 光平（いとう こうへい）" + lf + "1998年3月9日生まれ" + lf + "埼玉県出身";
    const en_text = "KOHEI ITOH" + lf + "3/9/1998" + lf + "Saitama (JP)";

    const text = jp_text + lf + lf + lf + en_text;

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
});