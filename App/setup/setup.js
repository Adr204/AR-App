window.addEventListener("DOMContentLoaded", () => {
    console.log("hellow")
    const backBtn = document.getElementById("back");
    console.log(backBtn);
    backBtn.addEventListener("click", () => {
        alert("戻る");
    })
})