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
window.onscroll = function() {showbacktop()};
function showbacktop() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("backtotop").style.display = "flex";
    } else {
        document.getElementById("backtotop").style.display = "none";
    }
}
function backtop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
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
function createBook() {
    if (JSON.parse(localStorage.getItem('category')) != null)
        return;
    const category = [
        {id:1, name:"Giáo dục", quantity:0, listcategory: [
            {id:1, name:"Sách giáo khoa", quantity:0, books:[
                {id:1, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:2, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:3, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:4, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:5, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:6, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:7, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:8, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:9, name:"long",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:10, name:"long",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:11, name:"long",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:12, name:"long",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:13, name:"long",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:14, name:"long",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:15, name:"long",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:16, name:"long",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:17, name:"long",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:18, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:19, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:20, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:21, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:22, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:23, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
                {id:24, name:"nhl",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"}
    
            ]},
            {id:2, name:"Sách tham khảo", quantity:0, books:[
                {id:25, name:"thamkhao",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:3, name:"Từ điển", quantity:0, books:[
                {id:26, name:"tu dien",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
        ]},
        {id:2, name:"Văn học", quantity:0, listcategory: [
            {id:1, name:"Truyện ngắn", quantity:0, books:[
                {id:27, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:2, name:"Truyện dài", quantity:0, books:[
                {id:28, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:3, name:"Thơ", quantity:0, books:[
                {id:29, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:4, name:"Khác", quantity:0, books:[
                {id:30, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quantity:35,image:"assets/images/product/Sach/VanHoc/TruyenDai/product-2.jpg"},
                {id:31, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            
        ]},
        {id:3, name:"Tiểu thuyết", quantity:0, listcategory: [
    
        ]},
        {id:4, name:"Kinh tế", quantity:0, listcategory: [
            {id:1, name:"Quản trị", quantity:0, books:[
                {id:32, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:2, name:"Marketing", quantity:0, books:[
                {id:33, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:3, name:"Nhân Vật", quantity:0, books:[
                {id:34, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:4, name:"Khởi nghiệp", quantity:0, books:[
                {id:35, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:5, name:"Chứng khoán", quantity:0, books:[
                {id:36, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
        ]},
        {id:5, name:"Tâm lý/Kỹ năng sống", quantity:0, listcategory: [
            {id:1, name:"Tâm lý", quantity:0, books:[
                {id:37, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:2, name:"Kỹ năng sống", quantity:0, books:[
                {id:38, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:3, name:"Hạt giống tâm hồn", quantity:0, books:[
                {id:39, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
        ]},
        {id:6, name:"Lịch sử", quantity:0, listcategory: [
            {id:1, name:"Lịch sử Việt Nam", quantity:0, books:[
                {id:40, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:2, name:"Lịch sử Nước ngoài", quantity:0, books:[
                {id:41, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
        ]},
        {id:7, name:"Thiếu nhi", quantity:0, listcategory: [
            {id:1, name:"Truyện thiếu nhi", quantity:0, books:[
                {id:42, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:2, name:"Tô màu", quantity:0, books:[
                {id:43, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
            {id:3, name:"Luyện chữ", quantity:0, books:[
                {id:44, name:"Chết vì chứng khoán",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/product-tst.jpg"},
    
            ]},
        ]}
    ];
    localStorage.setItem('category', JSON.stringify(category));
    updateQuantity(category);
}
function createBestSeller() {
    var bestseller = [];
    var category = JSON.parse(localStorage.getItem('category'));
    bestseller.push(category[0].listcategory[0].books[5]); // Giáo dục.Sách giáo khoa.Sách 6
    bestseller.push(category[0].listcategory[1].books[0]); // Giáo dục.Sách tham khảo.Sách 1
    bestseller.push(category[0].listcategory[2].books[0]); // Giáo dục.Từ điển.Sách 1
    bestseller.push(category[1].listcategory[0].books[0]); // Văn học.Truyện ngắn.Sách 1
    bestseller.push(category[1].listcategory[1].books[0]); // Văn học.Truyện dài.Sách 1
    bestseller.push(category[1].listcategory[2].books[0]); // Văn học.Thơ.Sách 1
    bestseller.push(category[1].listcategory[3].books[0]); // Văn học.Khác.Sách 1
    bestseller.push(category[3].listcategory[0].books[0]); // Kinh tế.Quản trị.Sách 1
    bestseller.push(category[3].listcategory[1].books[0]); // Kinh tế.Marketing.Sách 1
    bestseller.push(category[3].listcategory[2].books[0]); // Kinh tế.Nhân vật.Sách 1
    bestseller.push(category[3].listcategory[3].books[0]); // Kinh tế.Khởi nghiệp.Sách 1
    bestseller.push(category[3].listcategory[4].books[0]); // Kinh tế.Chứng khoán.Sách 1
    bestseller.push(category[4].listcategory[0].books[0]); // Tâm lý.Tâm lý.Sách 1
    bestseller.push(category[4].listcategory[1].books[0]); // Tâm lý.Kỹ năng sống.Sách 1
    bestseller.push(category[4].listcategory[2].books[0]); // Tâm lý.Hạt giống tâm hồn.Sách 1
    bestseller.push(category[5].listcategory[0].books[0]); // Lịch sử.Lịch sử Việt Nam.Sách 1
    localStorage.setItem('bestseller', JSON.stringify(bestseller));
}
function addBill() {
    // cái này từ từ e tìm hiểu :))
}
function updateQuantity(category) {
    var category = JSON.parse(localStorage.getItem('category'));
    // Tính số sách mỗi loại trước
    for (var i = 0; i < category.length; i++) {
        for (var j = 0; j < category[i].listcategory.length; j++) {
            var a = 0;
            for (var h = 0; h < category[i].listcategory[j].books.length; h++) {
                a += (category[i].listcategory[j].books[h].quantity);
            }
            category[i].listcategory[j].quantity = a;
        }
    }
    // Tính số sách mỗi category
    for (var i  = 0; i < category.length; i++) {
        var a = 0;
        for (var j = 0; j < category[i].listcategory.length; j++) {
            a += (category[i].listcategory[j].quantity);
        }
        category[i].quantity = a;
    }
    for (var i = 0; i < category.length; i++) {
        for (var j = 0; j < category[i].listcategory.length; j++) {
            for (var h = 0; h < category[i].listcategory[j].books.length; h++) {
                category[i].listcategory[j].books[h].cat = (category[i].listcategory[j].name);
            }
        }
    }
    localStorage.setItem('category', JSON.stringify(category));
}
function renderBestseller() {
    document.getElementById("headline").innerHTML = '<h3>Sản phẩm bán chạy</h3>';
    var bestseller = JSON.parse(localStorage.getItem('bestseller'));
    var html = '';
    for (var i = 0; i < bestseller.length; i++) {
        html += '<li>';
        html += '<div class="product-item">';
        html += '<div class="product-top">';
        html += '<a class="product-thumb">';
        html += '<img src="' + bestseller[i].image + '" alt="">';
        html += '</a>';
        html += '<a class="buynow">Mua Ngay</a>';
        html += '</div>';
        html += '<div class="product-info">';
        html += '<a class="product-cat">' + bestseller[i].cat + '</a>';
        html += '<a class="product-name">' + bestseller[i].name + '</a>';
        html += '<div class="product-price">' + bestseller[i].price + '</div>'
        html += '</div>';
        html += '</div>';
        html += '</li>'
    }
    document.getElementById("products").innerHTML = html;
    showdetailBestseller(bestseller);
}
function backFromDiv() {
    document.getElementById("container").style.display = "none";
    document.getElementById("wrapper").style.display = "none";
}
function sub(quantity) {
    var a = document.getElementById('quantity').value;
    if (a > 1) {
        a--;
        document.getElementById('plus').disabled = false;
        document.getElementById('sub').disabled = false;
        document.getElementById('quantity').value =a;
    } else {
        document.getElementById('quantity').value = 0;
        document.getElementById('plus').disabled = false;
        document.getElementById('sub').disabled = true;
    }
}
function plus(quantity) {
    var a = document.getElementById('quantity').value;
    if (a == quantity - 1) {
        a++;
        document.getElementById('sub').disabled = false;
        document.getElementById('plus').disabled = true;
        document.getElementById('quantity').value = quantity;
    } else {
        a++;
        document.getElementById('quantity').value = a;
        document.getElementById('plus').disabled = false;
        document.getElementById('sub').disabled = false;
    }
}
function checkQuatity(quantity) {
    var a = document.getElementById('quantity').value;
    if (a <= 0 || isNaN(a)) { // phai nhap so, isNaN la ki tu
        document.getElementById('quantity').value = 0;
        document.getElementById('sub').disabled = true;
        document.getElementById('plus').disabled = false;
    } else {
        if (a >= quantity) {
            document.getElementById('plus').disabled = true;
            document.getElementById('sub').disabled = false;
            document.getElementById('quantity').value = quantity;
        } else {
            document.getElementById('plus').disabled = false;
            document.getElementById('sub').disabled = false;
        }
    }
}
function showdetailBestseller(products) {
    let listproduct = document.querySelectorAll("#products li");
    for (let i = 0; i < listproduct.length; i++) {
        listproduct[i].addEventListener('click', () => {
            var html = '';
            html += '<img src="' + products[i].image + '" alt="">';
            html += '<div id="detail-pro">';
            html += '<ul>';
            html += '<li><h1>' + products[i].name + '</h1></li>';
            html += '<hr>';
            html += '<li>Thể loại: <h3>' + products[i].cat + '</h3></li>';
            html += '<hr>';
            html += '<li>Giá: <h3>' + products[i].price + '</h3></li>';
            html += '<hr>';
            if (products[i].quantity > 0) {
                html += '<li style="color:blue; font-size:80%"><h4>Còn hàng: ' + products[i].quantity + ' sản phẩm</h4></li>';
                html += '<li>';
                html += 'Số lượng:';
                html += '<input style="margin-left: 30px;" disabled type="button" name="" id="sub" value="-" onclick="sub(' + products[i].quantity + ')">';
                html += '<input type="text" name="" id="quantity" value="0" onchange="checkQuatity(' + products[i].quantity + ')">';
                html += '<input type="button" value="+" id="plus" onclick="plus(' + products[i].quantity + ')">';
    
            } else {
                html += '<li><h4>Hết hàng</h4></li>';
                html += '<li>';
                html += 'Số lượng:';
                html += '<input style="margin-left: 30px;" disabled type="button" name="" id="sub" value="-" onclick="sub(' + products[i].quantity + ')">';
                html += '<input type="text" name="" id="quantity" value="0" disabled>';
                html += '<input disabled type="button" value="+" id="plus" onclick="plus(' + products[i].quantity + ')">';
    
            }
            html += '</li>';
            html += '<li id="addtocart" onclick="addToCart()">';
            html += '<div><i class="fas fa-solid fa-cart-shopping" title="Giỏ hàng"></i></div>';
            html += '</li>';
            html += '</ul>';
            html += '</div>';
            document.getElementById("detail").innerHTML = html;
            document.getElementById("wrapper").style.display = "block";
            document.getElementById("container").style.display = "block";
        });
    }
}
let currenPage;
let perPage = 8;
let start;
let end;
let totalpage;
let books=[];
function getCurrentPage(currenPage,products) {
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
    if (currenPage == 1) {
        document.getElementById("btprev").className = "button-prev-next";
    }
    if (currenPage == totalpage) {
        document.getElementById("btnext").className = "button-prev-next";
    }
    const listPage = document.querySelectorAll(".number-page li");
    listPage[currenPage - 1].id = "active";
    for (let j = 0; j < listPage.length; j++) {
        if (j != (currenPage - 1)) {
            listPage[j].id = null;
        }
    }
}
function loadPage() {
    var str = window.location.href;
    str = str.split('?');
    var url = str[1].split('&');
    var products = JSON.parse(localStorage.getItem('category'));
    if (url.length > 1) {
        if (url[0] == "giaoduc" && url[1] == "sachgiaokhoa") {
            document.getElementById("headline").innerHTML = "<h3>Sách giáo khoa</h3>";
            books = products[0].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "giaoduc" && url[1] == "sachthamkhao") {
            document.getElementById("headline").innerHTML = "<h3>Sách tham khảo</h3>";
            books = products[0].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "giaoduc" && url[1] == "tudien") {
            document.getElementById("headline").innerHTML = "<h3>Từ điển</h3>";
            books = products[0].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "vanhoc" && url[1] == "truyenngan") {
            document.getElementById("headline").innerHTML = "<h3>Truyện ngắn</h3>";
            books = products[1].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "vanhoc" && url[1] == "truyendai") {
            document.getElementById("headline").innerHTML = "<h3>Truyện dài</h3>";
            books = products[1].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "vanhoc" && url[1] == "tho") {
            document.getElementById("headline").innerHTML = "<h3>Thơ</h3>";
            books = products[1].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "vanhoc" && url[1] == "khac") {
            document.getElementById("headline").innerHTML = "<h3>Văn học Khác</h3>";
            books = products[1].listcategory[3].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "kinhte" && url[1] == "quantri") {
            document.getElementById("headline").innerHTML = "<h3>Sách Quản trị</h3>";
            books = products[3].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "kinhte" && url[1] == "marketing") {
            document.getElementById("headline").innerHTML = "<h3>Sách Marketing</h3>";
            books = products[3].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "kinhte" && url[1] == "nhanvat") {
            document.getElementById("headline").innerHTML = "<h3>Sách Nhân Vật</h3>";
            books = products[3].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "kinhte" && url[1] == "khoinghiep") {
            document.getElementById("headline").innerHTML = "<h3>Sách Khởi nghiệp</h3>";
            books = products[3].listcategory[3].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "kinhte" && url[1] == "chungkhoan") {
            document.getElementById("headline").innerHTML = "<h3>Sách Chứng khoán</h3>";
            books = products[3].listcategory[4].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "tamly/kynangsong" && url[1] == "tamly") {
            document.getElementById("headline").innerHTML = "<h3>Sách Tâm lý</h3>";
            books = products[4].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "tamly/kynangsong" && url[1] == "kynangsong") {
            document.getElementById("headline").innerHTML = "<h3>Sách Kỹ năng sống</h3>";
            books = products[4].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "tamly/kynangsong" && url[1] == "hatgiongtamhon") {
            document.getElementById("headline").innerHTML = "<h3>Sách Hạt giống tâm hồn</h3>";
            books = products[4].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "lichsu" && url[1] == "vietnam") {
            document.getElementById("headline").innerHTML = "<h3>Lịch sử Việt Nam</h3>";
            books = products[5].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "lichsu" && url[1] == "nuocngoai") {
            document.getElementById("headline").innerHTML = "<h3>Lịch sử Nước ngoài</h3>";
            books = products[5].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "thieunhi" && url[1] == "truyenthieunhi") {
            document.getElementById("headline").innerHTML = "<h3>Truyện thiếu nhi</h3>";
            books = products[6].listcategory[0].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "thieunhi" && url[1] == "tomau") {
            document.getElementById("headline").innerHTML = "<h3>Sách Tô màu</h3>";
            books = products[6].listcategory[1].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "thieunhi" && url[1] == "luyenchu") {
            document.getElementById("headline").innerHTML = "<h3>Sách Luyện chữ</h3>";
            books = products[6].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0] == "thieunhi" && url[1] == "luyenchu") {
            document.getElementById("headline").innerHTML = "<h3>Sách Luyện chữ</h3>";
            books = products[6].listcategory[2].books;
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
    }else{
        if (url[0]=="giaoduc"){
            document.getElementById("headline").innerHTML = "<h3>Sách Giáo dục</h3>";
            for (var j = 0; j < products[0].listcategory.length; j++) {
                for (var h = 0; h < products[0].listcategory[j].books.length; h++) {
                    books.push(products[0].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="vanhoc"){
            document.getElementById("headline").innerHTML = "<h3>Sách Văn học</h3>";
            for (var j = 0; j < products[1].listcategory.length; j++) {
                for (var h = 0; h < products[1].listcategory[j].books.length; h++) {
                    books.push(products[1].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="tieuthuyet"){
            document.getElementById("headline").innerHTML = "<h3>Sách Tiểu thuyết</h3>";
            for (var j = 0; j < products[2].listcategory.length; j++) {
                for (var h = 0; h < products[2].listcategory[j].books.length; h++) {
                    books.push(products[2].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="kinhte"){
            document.getElementById("headline").innerHTML = "<h3>Sách Kinh tế</h3>";
            for (var j = 0; j < products[3].listcategory.length; j++) {
                for (var h = 0; h < products[3].listcategory[j].books.length; h++) {
                    books.push(products[3].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="tamly/kynangsong"){
            document.getElementById("headline").innerHTML = "<h3>Sách Tâm lý/Kỹ năng sống</h3>";
            for (var j = 0; j < products[3].listcategory.length; j++) {
                for (var h = 0; h < products[3].listcategory[j].books.length; h++) {
                    books.push(products[3].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="lichsu"){
            document.getElementById("headline").innerHTML = "<h3>Sách Lịch sử</h3>";
            for (var j = 0; j < products[4].listcategory.length; j++) {
                for (var h = 0; h < products[4].listcategory[j].books.length; h++) {
                    books.push(products[4].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
        if (url[0]=="thieunhi"){
            document.getElementById("headline").innerHTML = "<h3>Sách Thiếu nhi</h3>";
            for (var j = 0; j < products[5].listcategory.length; j++) {
                for (var h = 0; h < products[5].listcategory[j].books.length; h++) {
                    books.push(products[5].listcategory[j].books[h]);
                }
            }
            currenPage = 1;
            totalpage = Math.ceil(books.length / perPage)
            getCurrentPage(currenPage, books);
            renderProduct(books);
            renderListPage();
            changePage(books);
        }
    }
}
function renderProduct(products) {
    var html = '';
    for (var i = start; i < end; i++) {
        html += '<li>';
        html += '<div class="product-item">';
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
    showDetail(products);
}
function changePage(books) {
    const listPage = document.querySelectorAll(".number-page li");
    console.log(listPage);
    for (let i = 0; i < listPage.length; i++) {
        listPage[i].addEventListener('click',() => {
            var value = i + 1;
            console.log(value);
            currenPage = value;
            changeButton();
            getCurrentPage(currenPage,books);
            renderProduct(books);
        });
    }
}
function renderListPage() {
    var html = '';
    html += '<li id="btprev" class="button-prev-next"><i class="fas fa-chevron-circle-left" onclick="prevButton()"></i></li>';
    html += '<div class="number-page" id="number-page">'
    html += '<li id="active"><b>' + 1 + '</b></li>';
    for (var i = 2; i <= totalpage; i++) {
        html += '<li><b>' + i + '</b></li>';
    }
    html += '</div>';
    html += '<li id="btnext" class="button-prev-next-active"><i class="fas fa-chevron-circle-right" onclick="nextButton()"></i></li>'
    document.getElementById("page").innerHTML = html;
}
function nextButton() {
    currenPage++;
    if (currenPage > totalpage)
        currenPage = totalpage
    changeButton();
    getCurrentPage(currenPage,books);
    renderProduct(books);
}
function prevButton() {
    currenPage--;
    if (currenPage < 1)
        currenPage = 1
    changeButton();
    getCurrentPage(currenPage,books);
    renderProduct(books);
}
function showDetail(products) {
    let listproduct = document.querySelectorAll("#products li");
    for (let i = 0; i < listproduct.length; i++) {
        listproduct[i].addEventListener('click', () => {
            getCurrentPage(currenPage, products);
            var html = '';
            html += '<img src="' + products[i + start].image + '" alt="">';
            html += '<div id="detail-pro">';
            html += '<ul>';
            html += '<li><h1>' + products[i + start].name + '</h1></li>';
            html += '<hr>';
            html += '<li>Thể loại: <h3>' + products[i + start].cat + '</h3></li>';
            html += '<hr>';
            html += '<li>Giá: <h3>' + products[i + start].price + '</h3></li>';
            html += '<hr>';
            if (products[i + start].quantity > 0) {
                html += '<li style="color:blue; font-size:80%"><h4>Còn hàng: ' + products[i + start].quantity + ' sản phẩm</h4></li>';
                html += '<li>';
                html += 'Số lượng:';
                html += '<input style="margin-left: 30px;" disabled type="button" name="" id="sub" value="-" onclick="sub(' + products[i + start].quantity + ')">';
                html += '<input type="text" name="" id="quantity" value="0" onchange="checkQuatity(' + products[i + start].quantity + ')">';
                html += '<input type="button" value="+" id="plus" onclick="plus(' + products[i + start].quantity + ')">';
    
            } else {
                html += '<li><h4>Hết hàng</h4></li>';
                html += '<li>';
                html += 'Số lượng:';
                html += '<input style="margin-left: 30px;" disabled type="button" name="" id="sub" value="-" onclick="sub(' + products[i + start].quantity + ')">';
                html += '<input type="text" name="" id="quantity" value="0" disabled>';
                html += '<input disabled type="button" value="+" id="plus" onclick="plus(' + products[i + start].quantity + ')">';
    
            }
            html += '</li>';
            html += '<li id="addtocart" onclick="addToCart()">';
            html += '<div><i class="fas fa-solid fa-cart-shopping" title="Giỏ hàng"></i></div>';
            html += '</li>';
            html += '</ul>';
            html += '</div>';
            document.getElementById("detail").innerHTML = html;
            document.getElementById("wrapper").style.display = "block";
            document.getElementById("container").style.display = "block";
        })
    }
}