var index = 0;
var clicked = false;
var imageArray = [];
function initBanner() {
    for (var i = 1; i <= 5; i++) {
        imageArray.push("url(assets/images/banner/banner" + i + ".jpg)");
    }
}
function runBanner() {
    if (index >= imageArray.length)
        index = 0;
    if (index < 0)
        index = imageArray.length - 1;
    document.getElementById("banner").style.backgroundImage = imageArray[index];
    if (clicked == false) {
        setTimeout(runBanner, 1500);
        index++;
    }
    clicked = false;
}
function prevBanner() {
    index -= 2;
    clicked = true;
    runBanner();
}
function nextBanner() {
    index++;
    clicked = true;
    runBanner();
}
function showLogin() {
    document.getElementById("container").style.display = "block";
    document.getElementById("login").style.display = "block";
    document.getElementById("signup").style.display = "none";
}
function showSignUp() {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
}
function backFromLogin() {
    document.getElementById("container").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
}