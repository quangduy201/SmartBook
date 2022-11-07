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
    document.getElementById("wrapper").style.display = "none";
}
const products = [
    {id:1, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:2, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:3, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:4, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:5, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:6, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:7, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:8, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:9, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-2.jpg"},
    {id:10, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-2.jpg"},
    {id:11, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-2.jpg"},
    {id:12, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-2.jpg"},
    {id:13, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-2.jpg"},
    {id:14, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-2.jpg"},
    {id:15, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-2.jpg"},
    {id:16, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-2.jpg"},
    {id:17, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/product-2.jpg"}

];
localStorage.setItem('product', JSON.stringify(products));
let currenPage = 1;
let perPage = 8;
let start = 0;
let end = perPage;
const totalpage = Math.ceil(products.length / perPage) ;
function getCurrenPage(currenPage) {
    start = (currenPage - 1) * perPage;
    end = currenPage * perPage;
    if (end > products.length)
        end = products.length;
}
function changeButton() {
    if (currenPage < totalpage || currenPage > 1) {
        document.getElementById("btnext").className = "button-prev-next-active";
        document.getElementById("btprev").className = "button-prev-next-active";
    }
    if (currenPage == 1)
        document.getElementById("btprev").className = "button-prev-next";
    if (currenPage == totalpage)
        document.getElementById("btnext").className = "button-prev-next";

    const listPage = document.querySelectorAll(".number-page li");
    listPage[currenPage -1].id = "active";
    for (let j = 0; j < listPage.length; j++)
        if (j != (currenPage - 1))
            listPage[j].id = null;
}
function renderProduct() {
    var products = JSON.parse(localStorage.getItem('product'));
    var html = '';
    for (var i = start; i < end; i++) {
        html += '<li>';
        html += '<div class="product-item" onclick="showDetail()">';
        html += '<div class="product-top">';
        html += '<a class="product-thumb">';
        html += '<img src="' + products[i].image + '" alt="">';
        html += '</a>';
        html += '<a class="buynow">Mua Ngay</a>';
        html += '</div>';
        html += '<div class="product-info">';
        html += '<a class="product-cat">' + products[i].cat + '</a>';
        html += '<a class="product-name">' + products[i].name + '</a>';
        html += '<div class="product-price">' + products[i].price + '</div>'
        html += '</div>';
        html += '</div>';
        html += '</li>'
    }
    document.getElementById("products").innerHTML = html;
}
function changePage() {
    const listPage = document.querySelectorAll(".number-page li");
    console.log(listPage);
    for (let i = 0; i < listPage.length; i++) {
        listPage[i].addEventListener('click',() => {
            var value = i + 1;
            console.log(value);
            currenPage = value;
            changeButton();
            getCurrenPage(currenPage);
            renderProduct();
        });
    }
}
function renderListPage() {
    var html = '';
    html += '<li id="active"><b>' + 1 + '</b></li>';
    for (var i = 2; i <= totalpage; i++)
        html += '<li><b>' + i + '</b></li>';
    document.getElementById("number-page").innerHTML = html;
}
function paging() {
    renderProduct();
    renderListPage();
    changePage();
}
function nextButton() {
    currenPage++;
    if (currenPage > totalpage)
        currenPage = totalpage
    changeButton();
    getCurrenPage(currenPage);
    renderProduct();
}
function prevButton() {
    currenPage--;
    if (currenPage < 1)
        currenPage = 1
    changeButton();
    getCurrenPage(currenPage);
    renderProduct();
}
function backFromDiv() {
    document.getElementById("container").style.display = "none";
    document.getElementById("wrapper").style.display = "none";
}
function sub() {
    var a = document.getElementById('quantity').value;
    if (a > 1) {
        a--;
        document.getElementById('quantity').value = a;
    }
}
function add() {
    var a = document.getElementById('quantity').value;
    a++;
    document.getElementById('quantity').value = a;
}
function check() {
    var a = document.getElementById('quantity').value;
    if (a < 1)
        document.getElementById('quantity').value = 1;
}
function showDetail() {
    document.getElementById("wrapper").style.display = "block";
    document.getElementById("container").style.display = "block";
}