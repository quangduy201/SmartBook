var next = 1;
var clicked = false;
var imageArray = [];
function initBanner() {
    for (var i = 1; i <= 5; i++)
        imageArray.push("url(assets/images/banner/banner" + i + ".jpg)");
    document.getElementById("banner").style.backgroundImage = imageArray[0];
    setTimeout(runBanner, 3000);
}
function runBanner() {
    var image = document.getElementById("banner").style.backgroundImage.match(/(\d+)/); // get the number of the current banner from the url
    var index = image[0] - 1 + next; // find the index of the next banner or previous banner
    if (index >= imageArray.length)
        index = 0;
    else if (index < 0)
        index = imageArray.length - 1;
    document.getElementById("banner").style.backgroundImage = imageArray[index];
    if (!clicked) {
        setTimeout(runBanner, 3000);
    } else {
        clicked = false;
        next = 1;
    }
}
function prevBanner() {
    clicked = true;
    next = -1;
    runBanner();
}
function nextBanner() {
    clicked = true;
    next = 1;
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
    {id:1, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    {id:2, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    {id:3, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    {id:4, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    {id:5, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    {id:6, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    {id:7, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    {id:8, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    {id:9, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/VanHoc/TruyenDai/product-2.jpg"},
    {id:10, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/VanHoc/TruyenDai/product-2.jpg"},
    {id:11, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/VanHoc/TruyenDai/product-2.jpg"},
    {id:12, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/VanHoc/TruyenDai/product-2.jpg"},
    {id:13, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/VanHoc/TruyenDai/product-2.jpg"},
    {id:14, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/VanHoc/TruyenDai/product-2.jpg"},
    {id:15, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/VanHoc/TruyenDai/product-2.jpg"},
    {id:16, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/VanHoc/TruyenDai/product-2.jpg"},
    {id:17, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:"35",image:"assets/images/product/Sach/VanHoc/TruyenDai/product-2.jpg"}

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
    if(currenPage==1){
        document.getElementById("btprev").className="button-prev-next";
    }
    if(currenPage==totalpage){
        document.getElementById("btnext").className="button-prev-next";
    }
    const listPage=document.querySelectorAll(".number-page li");
    listPage[currenPage-1].id="active";
    for(let j=0;j<listPage.length;j++){
        if(j!=(currenPage-1)){
            listPage[j].id=null;
        }
    }
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
    document.getElementById("products").innerHTML = html;4
    showdetail(currenPage);
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
function sub(quantity){
    var a=document.getElementById('quantity').value;
    if(a>=1){
        a--;
        document.getElementById('add').disabled= false;
        document.getElementById('sub').disabled= false;
        document.getElementById('quantity').value=a;
    }else{
        document.getElementById('quantity').value=0;
        document.getElementById('add').disabled= false;
        document.getElementById('sub').disabled= true;
    }
}
function add(quantity){
    var a=document.getElementById('quantity').value;
    a++;
    if(a>=quantity){
        document.getElementById('sub').disabled= false;
        document.getElementById('add').disabled= true;
        document.getElementById('quantity').value=quantity;
    }else{
        document.getElementById('quantity').value=a;
        document.getElementById('add').disabled= false;
        document.getElementById('sub').disabled= false;
    }
}
function checkQuatity(quantity){
    var a=document.getElementById('quantity').value;
    if(a<=0|| isNaN(a)){ // phai nhap so, isNaN la ki tu
        document.getElementById('quantity').value=0;
        document.getElementById('sub').disabled= true;
        document.getElementById('add').disabled= false;
    }else{
        if(a>=quantity){
            document.getElementById('add').disabled= true;
            document.getElementById('sub').disabled= false;
            document.getElementById('quantity').value=quantity;
        }else{
            document.getElementById('add').disabled= false;
            document.getElementById('sub').disabled= false;
        }
    }
}
function showdetail(currenPage){
    let listproduct=document.querySelectorAll("#products li");
    console.log(listproduct);
    for(let i=0;i<listproduct.length;i++){
        listproduct[i].addEventListener('click',()=>{
            getCurrenPage(currenPage);
            var products = JSON.parse(localStorage.getItem('product'));
            var html='';
            html+='<img src="'+products[i+start].image+'" alt="">';
            html+='<div id="detail-pro">';
            html+='<ul>';
            html+='<li><h1>'+products[i+start].name+'</h1></li>';
            html+='<hr>';
            html+='<li>Thể loại: <h3>'+products[i+start].cat+'</h3></li>';
            html+='<hr>';
            html+='<li>Giá: <h3>'+products[i+start].price+'</h3></li>';
            html+='<hr>';
            if(products[i+start].quantity>0){
                html+='<li style="color:blue; font-size:80%"><h4>Còn hàng: '+products[i+start].quantity+' sản phẩm</h4></li>';
            }else{
                html+='<li><h4>Hết hàng</h4></li>';
            }
            html+='<li>';
            html+='Số lượng:';
            html+='<input style="margin-left: 30px;" type="button" name="" id="sub" value="-" onclick="sub('+products[i+start].quantity+')">';
            html+='<input type="text" name="" id="quantity" value="0" onchange="checkQuatity('+products[i+start].quantity+')">';
            html+='<input type="button" value="+" id="add" onclick="add('+products[i+start].quantity+')">';
            html+='</li>';
            html+='<li id="addtocart">';
            html+='<div>Thêm Vào giỏ hàng</div>';
            html+='</li>';
            html+='</ul>';
            html+='</div>';
            document.getElementById("detail").innerHTML=html;
            document.getElementById("wrapper").style.display="block";
            document.getElementById("container").style.display="block";
        })
    }
    
    // document.getElementById("detail-pro").innerHTML=html;
    
}