var index = 0;
var clicked = false;
var arrImg = [  "url(assets/images/banner/banner1.jpg)",
                "url(assets/images/banner/banner2.jpg)",
                "url(assets/images/banner/banner3.jpg)",
                "url(assets/images/banner/banner4.jpg)",
                "url(assets/images/banner/banner5.jpg)"];
function runbanner() {
    console.log(arrImg);
    if (index >= arrImg.length)
        index = 0;
    if (index < 0)
        index = arrImg.length - 1;
    document.getElementById("banner").style.backgroundImage = arrImg[index];
    if (clicked == false) {
        setTimeout(runbanner, 2000);
        index++;
    }
    clicked = false;
}
function prev() {
    index -= 2;
    clicked = true;
    runbanner();
}
function next() {
    index++;
    clicked = true;
    runbanner();
}