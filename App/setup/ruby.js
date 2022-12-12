window.addEventListener("DOMContentLoaded", () => {
    // 書式を変更するテキストを全て非表示に
    const text = [...document.getElementsByTagName("text")];
    text.forEach(e => e.style.display = "none");
    // ひらがな→カタカナ→漢字 に置き換えることってなんて言えばいいの?
    console.info("変更可能な文字列のリスト", text);

    // localStorageから設定を取得
    const textType = localStorage.getItem("textType") || "hiragana";
    const ruby = localStorage.getItem("ruby") || "0"; 
    console.log(textType, ruby);
    // Tag毎に分けて取得
    const list = {
        hiragana: [...document.getElementsByClassName("hiragana")],
        katakana: [...document.getElementsByClassName("katakana")],
        kanji: [...document.getElementsByClassName("kanji")],
    };
    console.log(list);
    const rp = [...document.getElementsByTagName("rp")];
    const rt = [...document.getElementsByTagName("rt")];
    
    // 指定の書式だけ非表示解除
    list[textType].forEach(e => {
        e.style.display = "unset";
    });
    // ルビを振らない設定なら非表示
    if(!ruby) {
        rp.forEach(e => e.style.display = "none");
        rt.forEach(e => e.style.display = "none");
    }
})