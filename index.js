function clickEvent() {
    const lf = "\n";
    const jp_text = "伊藤 光平（いとう こうへい）" + lf + "1998年3月9日生まれ" + lf + "埼玉県出身";
    const en_text = "KOHEI ITOH" + lf + "3/9/1998" + lf + "Saitama (JP)";

    const text = jp_text + lf + lf + lf + en_text;

    alert(text);
}

function confirmEvent() {
    if(confirm("SECRET ENTRANCE")) {
        // const request = new XMLHttpRequest();
 
        // request.open('GET', '', true);
        // request.responseType = 'json';
        // request.send();

        // request.onload = function () {
        //     const data = this.response;
        //     console.log(data);
        // };

        alert("工事中・・・");
    }
}