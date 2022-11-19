let currentPage;
let perPage = 25;
let start;
let end;
let totalpage;
let products = [];
let changeImg;
window.onload = function() {
    var str = window.location.href;
    var url = str.split('?');
    console.log(url);
    if (url[1] == "dangxuat") {
        var user = JSON.parse(localStorage.getItem('userActive'));
        user = null;
        localStorage.setItem('userActive', JSON.stringify(user));
        location.href = "/";
    }
    if (url[1] == "sanpham") {
        var html = '';
        html += '<div class="title">';
        html += '<h1>Danh sách sản phẩm</h3>';
        html += '</div>';
        html += '<table id="productsList">';
        html += '</table>';
        document.getElementById("content").innerHTML = html;
        var category = JSON.parse(localStorage.getItem('category'));
        for (var i = 0; i < category.length; i++) {
            for (var j = 0; j < category[i].listcategory.length; j++) {
                for (var h = 0; h < category[i].listcategory[j].books.length; h++) {
                    products.push(category[i].listcategory[j].books[h]);
                }
            }
        }
        currentPage = 1;
        totalpage = Math.ceil(products.length / perPage);
        getCurrentPage(currentPage, products);
        showItemsList(products);
        renderListPage();
        changePage(products);
        
    }
    if (url[1] == "hoadon") {
        var html = '';
        html += '<div class="title">';
        html += '<h1>Danh sách hoá đơn</h3>';
        html += '</div>';
        html += '<table id="productsList">';
        html += '</table>';
        document.getElementById("content").innerHTML = html;
    }
    if (url[1] == "khachhang") {
        var html = '';
        html += '<div class="title">';
        html += '<h1>Danh sách khách hàng</h3>';
        html += '</div>';
        html += '<table id="usersList">';
        html += '</table>';
        document.getElementById("content").innerHTML = html;
        currentPage = 1;
        var users = [];
        var user = JSON.parse(localStorage.getItem('user'));
        for (var i = 0; i < user.length; i++) {
            if (user[i].type=="Customer") {
                users.push(user[i]);
            }
        }
        totalpage = Math.ceil(users.length / perPage);
        getCurrentPage(currentPage, users);
        showUsers(users);
        renderListPage();
        changePage(users);
    }
    if (url[1] == "quanlithongtin") {
        var html = '';
        html += '<div class="title">';
        html += '<h1>Quản lí thông tin</h3>';
        html += '</div>';
        html += '<table id="productsList">';
        html += '</table>';
        document.getElementById("content").innerHTML = html;
    }
    
}
function getCurrentPage(currentPage, products) {
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
    if (end > products.length)
        end = products.length;
}
function showItemsList(products) {
    var tr = '<tr class="titleList"><th class="id">ID</th><th class="image">Ảnh</th><th class="name">TÊN SẢN PHẨM</th><th class="type">THỂ LOẠI</th><th class="cost">GIÁ</th><th class="edit"><i class="fa-solid fa-folder-plus" title="Thêm sản phẩm" onclick="showAddProducts()"></i></th></tr>';
    for (var i = start; i < end; i++) {
        tr += '<tr class="detailList"><td class="id">' + products[i].id + '</td><td class="image"><img src="' + products[i].image + '" alt=""></th><td class="name">' + products[i].name + '</td><td class="type">' + products[i].cat + '</td><td class="cost">' + products[i].price + '</td></tr>'

    }
    document.getElementById("productsList").innerHTML = tr;
    showDetailProducts();
}
function showUsers(users) {
    var tr = '<tr class="titleList"><th class="id">ID</th><th class="name">TÊN KHÁCH HÀNG</th><th class="email">EMAIL</th><th class="status">TRẠNG THÁI</th><th class="edit"></th></tr>';
    for (var i = start; i < end; i++) {
        tr += '<tr class="detailList"><td class="id">' + users[i].id + '</td><td class="name">' + users[i].name + '</td><td class="email">' + users[i].email + '</td><td class="status">' + users[i].status + '</td><td class="edit"><button class="button" onclick="deleteProduct(this)">Xoá</button><br><button class="button" onclick="showEditUser()">Sửa</button></td></tr>'

    }
    document.getElementById("usersList").innerHTML = tr;
}
function showAddProducts() {
    document.getElementById("container").style.display = "block";
    document.getElementById("addPro").style.display = "block";
    document.getElementById("upload").style.display = "block";
}
function showEditProduct() {
    document.getElementById("container").style.display = "block";
    document.getElementById("editPro").style.display = "block";
}
function showDetailProducts(){
    let listEditBt = document.querySelectorAll(".detailList ");
    console.log(listEditBt);
    for (let i = 0; i < listEditBt.length; i++) {
        getCurrentPage(currentPage,products)
        listEditBt[i].addEventListener('click',()=>{
            showEditProduct();
            /*Lay thu tu nut xoa + start de lay duoc vi tri item trong mang products[] */
            var item = products[i+start];
            /* Lay hinh vao preview*/
            document.getElementById("Editpreview").setAttribute("src", item.image);
            document.getElementById("Editimgproduct").setAttribute("src", item.image);
            document.getElementById("upload").style.display = "none";
            document.getElementById("id-Editproduct").value=item.id;
            document.getElementById("name-Editproduct").value=item.name;
            document.getElementById("cat-Editproduct").value=item.cat;
            document.getElementById("quantity-Editproduct").value=item.quantity;
            var cost=item.price;
            cost=cost.split('VND');
            cost=cost[0].replace(".","");
            document.getElementById("price-Editproduct").value=parseInt(cost);
            changeImg=false;
        })
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
    currentPage++;
    if (currentPage > totalpage)
        currentPage = totalpage
    changeButton();
    getCurrentPage(currentPage, products);
    showItemsList(products);
}
function prevButton() {
    currentPage--;
    if (currentPage < 1)
        currentPage = 1
    changeButton();
    getCurrentPage(currentPage, products);
    showItemsList(products);
}
function changeButton() {
    if (currentPage < totalpage || currentPage > 1) {
        document.getElementById("btnext").className = "button-prev-next-active";
        document.getElementById("btprev").className = "button-prev-next-active";
    }
    if (currentPage == 1) {
        document.getElementById("btprev").className = "button-prev-next";
    }
    if (currentPage == totalpage) {
        document.getElementById("btnext").className = "button-prev-next";
    }
    const listPage = document.querySelectorAll(".number-page li");
    listPage[currentPage - 1].id = "active";
    for (let j = 0; j < listPage.length; j++) {
        if (j != (currentPage - 1)) {
            listPage[j].id = null;
        }
    }
}
function changePage(products) {
    const listPage = document.querySelectorAll(".number-page li");
    console.log(listPage);
    for (let i = 0; i < listPage.length; i++) {
        listPage[i].addEventListener('click', () => {
            var value = i + 1;
            console.log(value);
            currentPage = value;
            changeButton();
            getCurrentPage(currentPage, products);
            showItemsList(products);
        });
    }
}
function backFromDiv() {
    document.getElementById("container").style.display = "none";
    document.getElementById("addPro").style.display = "none";
    document.getElementById("editPro").style.display = "none";
}
function previewImg() {
    var img = document.getElementById("file-inp").files;
    if (img.length > 0) {
        var fileReader = new FileReader();
        fileReader.onload = function(event) {
            document.getElementById("preview").setAttribute("src", event.target.result);
            document.getElementById("imgproduct").setAttribute("src", event.target.result);
        };
        fileReader.readAsDataURL(img[0]);
    }
    document.getElementById("upload").style.display = "none";
}
function EditpreviewImg() {
    var img = document.getElementById("Editfile-inp").files;
    if (img.length > 0) {
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
        document.getElementById("Editpreview").setAttribute("src", event.target.result);
        document.getElementById("Editimgproduct").setAttribute("src", event.target.result);
    };
    fileReader.readAsDataURL(img[0]);
    }   
    changeImg=true;
}

// tìm kí tự khoảng trắng
function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
}
// so sánh chuỗi: a = A, á = a.
function equalsIgnoreCaseAndBase(text1, text2) {
    return text1.localeCompare(text2, undefined, { sensitivity: 'base' }) === 0;
}
// chuyển từ hình ảnh sang URL
function imageToDataURL(imgProduct) {
    var srcImage = document.getElementById(imgProduct);
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.width = srcImage.width;
    canvas.height = srcImage.height;
    context.drawImage(srcImage, 0, 0, srcImage.width, srcImage.height);
    var dataURL = canvas.toDataURL("image/*");
    return dataURL;
}
// chuyển từ chuỗi sang giá tiền: xxx.xxx VND
function stringToPrice(s) {
    var price = "";
    var count = 0;
    while (s.length > 0) {
        price = s[s.length - 1] + price;
        s = s.substring(0, s.length - 1);
        if (++count == 3 && s.length > 0) {
            count = 0;
            price = "." + price;
        }
    }
    price += " VND";
    return price;
}
function addNewProduct() {
    var id = document.getElementById("id-product").value.trim();
    var name = document.getElementById("name-product").value.trim();
    var cat = document.getElementById("cat-product").value.trim();
    var quantity = document.getElementById("quantity-product").value;
    var price = document.getElementById("price-product").value;
    var image = imageToDataURL("imgproduct");
    var category = JSON.parse(localStorage.getItem('category'));
    if (hasWhiteSpace(id)) {
        alert("Mã sản phẩm không được chứa khoảng trắng!");
        return false;
    } else if (id == "") {
        alert("Vui lòng nhập mã sản phẩm");
        return false;
    } else if (name == "") {
        alert("Vui lòng nhập tên sản phẩm");
        return false;
    } else if (cat == "") {
        alert("Vui lòng nhập thể loại sản phẩm");
        return false;
    } else if (quantity == "") {
        alert("Vui lòng nhập số lượng sản phẩm");
        return false;
    } else if (price == "") {
        alert("Vui lòng nhập giá sản phẩm");
        return false;
    }
    for (var i = 0; i < category.length; i++) {
        for (var j = 0; j < category[i].listcategory.length; j++) {
            for (var k = 0; k < category[i].listcategory[j].books.length; k++) {
                if (id == category[i].listcategory[j].books[k].id) {
                    alert("Mã sản phẩm này đã tồn tại!");
                    return false;
                }
            }
        }
    }
    for (var i = 0; i < category.length; i++) {
        for (var j = 0; j < category[i].listcategory.length; j++) {
            if (equalsIgnoreCaseAndBase(cat, category[i].listcategory[j].name)) {
                id = parseInt(id);
                cat = category[i].listcategory[j].name;
                quantity = parseInt(quantity);
                price = stringToPrice(price);
                category[i].listcategory[j].books.push({ id, name, cat, price, quantity, image });
                localStorage.setItem('category', JSON.stringify(category));
                alert("Sản phẩm mới đã được thêm vào!");
                return true;
            }
        }
    }
    alert("Không tìm thấy thể loại sản phẩm!");
    return false;
}
function editProduct() {
    var id = document.getElementById("id-Editproduct").value.trim();
    var name = document.getElementById("name-Editproduct").value.trim();
    var cat = document.getElementById("cat-Editproduct").value.trim();
    var quantity = document.getElementById("quantity-Editproduct").value;
    var price = document.getElementById("price-Editproduct").value;
    var image = imageToDataURL("Editimgproduct");
    var category = JSON.parse(localStorage.getItem('category'));
    if (name == "") {
        alert("Vui lòng nhập tên sản phẩm");
        return false;
    } else if (cat == "") {
        alert("Vui lòng nhập thể loại sản phẩm");
        return false;
    } else if (quantity == "") {
        alert("Vui lòng nhập số lượng sản phẩm");
        return false;
    } else if (price == "") {
        alert("Vui lòng nhập giá sản phẩm");
        return false;
    }
    var checkCatogory = false;
    for (var i = 0; i < category.length; i++) {
        for (var j = 0; j < category[i].listcategory.length; j++) {
            if (equalsIgnoreCaseAndBase(cat, category[i].listcategory[j].name)) {
                cat = category[i].listcategory[j].name;
                checkCatogory = true;
            }
        }
    }
    if (checkCatogory) {
        for (var i = 0; i < category.length; i++) {
            for (var j = 0; j < category[i].listcategory.length; j++) {
                for (var k = 0; k < category[i].listcategory[j].books.length; k++) {
                    if (id == category[i].listcategory[j].books[k].id) {
                        category[i].listcategory[j].books[k].name = name;
                        category[i].listcategory[j].books[k].cat = cat;
                        category[i].listcategory[j].books[k].price = stringToPrice(price);
                        category[i].listcategory[j].books[k].quantity = parseInt(quantity);
                        if (changeImg==true){
                            category[i].listcategory[j].books[k].image = image;
                        }
                        localStorage.setItem('category', JSON.stringify(category));
                        alert("Sản phẩm đã được sửa!");
                        return true;
                    }
                }
            }
        }
    }
    alert("Không tìm thấy thể loại sản phẩm!");
    return false;
}
function deleteProduct(obj) { // obj là <button>
    var ok = confirm("Chắc chắn muốn xóa sản phẩm?");
    if (!ok)
        return;
    var temp = obj.parentElement.parentElement; // lấy tag <tr>
    var id = temp.firstChild.innerHTML; // lấy id từ tag <td> đầu tiên của <tr>
    var category = JSON.parse(localStorage.getItem('category'));
    for (var i = 0; i < category.length; i++) {
        for (var j = 0; j < category[i].listcategory.length; j++) {
            for (var k = 0; k < category[i].listcategory[j].books.length; k++) {
                if (id == category[i].listcategory[j].books[k].id) {
                    category[i].listcategory[j].books.splice(k, 1);
                    localStorage.setItem('category', JSON.stringify(category));
                    alert("Sản phẩm đã được xóa!");
                    window.location.reload();
                    return;
                }
            }
        }
    }
}