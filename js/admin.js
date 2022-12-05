let currentPage;
let perPage = 25;
let start;
let end;
let totalpage;
let products = [];
let bills = [];
var users = [];
let books = [];
let changeImg;
window.onload = function() {
    var str = window.location.href;
    var url = str.split('?');
    if (url[1] == "dangxuat") {
        var user = JSON.parse(localStorage.getItem('userActive'));
        user = null;
        localStorage.setItem('userActive', JSON.stringify(user));
        location.href = "/";
    }
    if (url[1] == "sanpham") {
        var html = '';
        html += '<div class="title">';
        html += '<h1>Danh sách sản phẩm</h1>';
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
        html += '<h1>Danh sách hoá đơn</h1>';
        html += '</div>';
        html += '<div class="orderNoteFilter">';
        html += '<label for="orderNote_time">Khoảng thời gian: </label><input type="date" id="orderNote_time-from"> đến <input type="date" id="orderNote_time-to"><button id="filterBill">Lọc</button>';
        html += '</div>';
        html += '<table id="billList" style="border-top: none;">';
        html += '</table>';
        document.getElementById("content").innerHTML = html;
        var orderNoteList = JSON.parse(localStorage.getItem('orderNoteList'));
        for (var i = 0; i < orderNoteList.length; i++) {
            bills.push(orderNoteList[i]);
        }
        currentPage = 1;
        totalpage = Math.ceil(bills.length / perPage);
        getCurrentPage(currentPage, bills);
        showBillList(bills);
        renderListPage();
        changePage(bills);
    }
    if (url[1] == "khachhang") {
        var html = '';
        html += '<div class="title">';
        html += '<h1>Danh sách khách hàng</h1>';
        html += '</div>';
        html += '<table id="usersList">';
        html += '</table>';
        document.getElementById("content").innerHTML = html;
        currentPage = 1;
        var user = JSON.parse(localStorage.getItem('user'));
        for (var i = 0; i < user.length; i++) {
            if (user[i].type == "Customer") {
                users.push(user[i]);
            }
        }
        totalpage = Math.ceil(users.length / perPage);
        getCurrentPage(currentPage, users);
        showUsers(users);
        renderListPage();
        changePage(users);
    }
    if (url[1] == "thongke") {
        var html = '';
        html += '<div class="title">';
        html += '<h1>Thống kê tình hình kinh doanh</h1>';
        html += '</div>';
        html += '<div class="orderNoteFilter">';
        html += '<label for="orderNote_time">Khoảng thời gian: </label><input type="date" id="statistic_time-from"> đến <input type="date" id="statistic_time-to">&nbsp;&nbsp;<select name="categories" id="categories"><option value=""selected disabled >Chọn thể loại</option><option value="Tất cả">Tất cả</option></option><option value="Sách giáo khoa">Sách giáo khoa</option><option value="Sách tham khảo">Sách tham khảo</option><option value="Từ điển">Từ điển</option><option value="Truyện ngắn">Truyện ngắn</option><option value="Truyện dài">Truyện dài</option><option value="Thơ">Thơ</option><option value="Khác">Văn học khác</option><option value="Ngôn tình">Tiểu thuyết ngôn tình</option><option value="Giả tưởng">Tiểu thuyết giả tưởng</option><option value="Tiểu thuyết Lịch sử">Tiểu thuyết Lịch sử</option><option value="Quản trị">Quản trị</option><option value="Marketing">Marketing</option><option value="Nhân vật">Nhân vật</option><option value="Khởi nghiệp">Khởi nghiệp</option><option value="Chứng khoán">Chứng khoán</option><option value="Tâm lý">Tâm lý</option><option value="Kỹ năng sống">Kỹ năng sống</option><option value="Hạt giống tâm hồn">Hạt giống tâm hồn</option><option value="Lịch sử Việt Nam">Lịch sử Việt Nam</option><option value="Lịch sử Thế giới">Lịch sử Thế giới</option><option value="Truyện thiếu nhi">Truyện thiếu nhi</option><option value="Tô màu">Tô màu</option><option value="Luyện chữ">Luyện chữ</option></select><button id="filterStatistic">Lọc</button>';
        html += '</div>';
        html += '<div id="piechart">';
        html += '<div id="circle"></div>';
        html += '<div id="note">';
        html += '</div>';
        html += '</div>';
        html += '<div class="title" id="totalBooksSale"></div>';
        document.getElementById("content").innerHTML = html;
        statisticFilter();
    }
    
}
function getCurrentPage(currentPage, products) {
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;
    if (end > products.length)
        end = products.length;
}
function showItemsList(products) {
    var tr = '<tr class="titleList"><th class="id">MÃ SẢN PHẨM</th><th class="image">Ảnh</th><th class="name">TÊN SẢN PHẨM</th><th class="type">THỂ LOẠI</th><th class="quantity">TỒN KHO</th><th class="cost">GIÁ</th><th class="edit"><i class="fa-solid fa-folder-plus" title="Thêm sản phẩm" onclick="showAddProducts()"></i></th></tr>';
    for (var i = start; i < end; i++) {
        if (i % 2 == 1) {
            tr += '<tr class="detailList" style="background-color: rgb(221, 177, 149);"><td class="id">' + products[i].id + '</td><td class="image"><img src="' + products[i].image + '" alt=""></th><td class="name">' + products[i].name + '</td><td class="type">' + products[i].cat + '</td><td class="quantity">' + products[i].quantity + '</td><td class="cost">' + products[i].price + '</td></tr>'
        } else {
            tr += '<tr class="detailList"><td class="id">' + products[i].id + '</td><td class="image"><img src="' + products[i].image + '" alt=""></th><td class="name">' + products[i].name + '</td><td class="type">' + products[i].cat + '</td><td class="quantity">' + products[i].quantity +'</td><td class="cost">' + products[i].price + '</td></tr>'
        }
    }
    document.getElementById("productsList").innerHTML = tr;
    showDetailProducts();
}
function showUsers(users) {
    var tr = '<tr class="titleList"><th class="id">TÀI KHOẢN</th><th class="name">TÊN KHÁCH HÀNG</th><th class="email">EMAIL</th><th class="status">TRẠNG THÁI</th></tr>';
    for (var i = start; i < end; i++) {
        if (users[i].status == "enabled") {
            tr += '<tr class="detailList"><td class="id">' + users[i].username + '</td><td class="name">' + users[i].name + '</td><td class="email">' + users[i].email + '</td><td class="status"><select class="status_selection"><option value="'+ users[i].status +'"selected>'+ users[i].status +'</option><option value="disabled">disabled</option></select></td></tr>'
        } else {
            tr += '<tr class="detailList"><td class="id">' + users[i].username + '</td><td class="name">' + users[i].name + '</td><td class="email">' + users[i].email + '</td><td class="status"><select class="status_selection"><option value="enabled">enabled</option><option value="'+ users[i].status +'"selected>'+ users[i].status +'</option></select></td></tr>'
        }
    }
    document.getElementById("usersList").innerHTML = tr;
    setStatusUser();
}
function showBillList(bills) {
    var tr = '<tr class="titleList" ><th class="id">MÃ HÓA ĐƠN</th><th class="date">THỜI GIAN</th><th class="name">TÌNH TRẠNG</th><th class="type">TỔNG TIỀN</th></tr>';
    for (var i = start; i < end; i++) {
        if (bills[i].status == "Đã xử lý") {
            tr += '<tr class="detailList" style="background-color:#69C9BC"><td class="id">' + bills[i].orderID + '</td><td class="date">' + bills[i].date + '</th><td class="status"><select class="orderNote_selection"><option value="Chưa xử lý">Chưa xử lý</option><option value="'+ bills[i].status +'"selected>'+ bills[i].status +'</option></select></td><td class="totalPrice">' + bills[i].totalPrice + '</td><td class="detailBill">Chi tiết</td></tr>'
        } else {
            tr += '<tr class="detailList" style="background-color:white"><td class="id">' + bills[i].orderID + '</td><td class="date">' + bills[i].date + '</th><td class="status"><select class="orderNote_selection"><option value="'+ bills[i].status +'"selected>'+ bills[i].status +'</option><option value="Đã xử lý">Đã xử lý</option></select></td><td class="totalPrice">' + bills[i].totalPrice + '</td><td class="detailBill">Chi tiết</td></tr>'

        }
    }
    document.getElementById("billList").innerHTML = tr;
    setStatusOrder();
    showDetailBill();
    orderfilter();
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
function showBill() {
    document.getElementById("container").style.display = "block";
    document.getElementById("showOrder").style.display = "block";
}
function showDetailProducts() {
    let listEditBt = document.querySelectorAll(".detailList ");
    for (let i = 0; i < listEditBt.length; i++) {
        getCurrentPage(currentPage,products);
        listEditBt[i].addEventListener('click', () => {
            showEditProduct();
            /*Lay thu tu nut xoa + start de lay duoc vi tri item trong mang products[] */
            var item = products[i + start];
            /* Lay hinh vao preview*/
            document.getElementById("Editpreview").setAttribute("src", item.image);
            document.getElementById("Editimgproduct").setAttribute("src", item.image);
            document.getElementById("upload").style.display = "none";
            document.getElementById("id-Editproduct").value = item.id;
            document.getElementById("name-Editproduct").value = item.name;
            var options = document.querySelectorAll("#cat-product option");
            for (let i=0; i<options.length; i++){
                if (options[i].value == item.cat){
                    options[i].selected = true;
                }
            }
            document.getElementById("quantity-Editproduct").value = item.quantity;
            var cost = item.price;
            cost = cost.split('VND');
            cost = cost[0].replaceAll(".", "");
            document.getElementById("price-Editproduct").value = parseInt(cost);
            changeImg = false;
        });
    }
}
function showDetailBill() {
    let orders = document.querySelectorAll(".detailBill ");
    var orderNoteList = JSON.parse(localStorage.getItem('orderNoteList'));
    for (let i = 0; i < orders.length; i++) {
        getCurrentPage(currentPage, bills);
        orders[i].addEventListener('click', () => {
            showBill();
            var html = '';
            html += '<div id="listProductsBuy" >';
            html += '<div id="nameCustomer"><h3>Tài khoản: '+ orderNoteList[i+start].username + '</h3></div>';
            for (var j = 0; j < orderNoteList[i+start].buyItems.length; j++) {
                html += '<ul class="productsBuy">';
                html += '<li>' + (j+1) + '</li>';
                html += '<li class="img-Pro">';
                html += '<img src="' + orderNoteList[i+start].buyItems[j].image + '" alt="">';
                html += '</li>';
                html += '<li>' + orderNoteList[i+start].buyItems[j].name + '</li>';
                html += '<li>Số lượng: ' + orderNoteList[i+start].buyItems[j].quantity + '</li>';
                html += '<li>' + orderNoteList[i+start].buyItems[j].price + '</li>';
                html += '</ul>';
            }
            document.getElementById("detailOrder").innerHTML = html;
        });
    }
}
function renderListPage() {
    var html = '';
    html += '<li id="btprev" class="button-prev-next"><i class="fas fa-chevron-circle-left" onclick="prevButton()"></i></li>';
    html += '<div class="number-page" id="number-page">'
    html += '<li id="active"><b>' + 1 + '</b></li>';
    if (totalpage <=1) {
        html += '</div>';
        html += '<li id="btnext" class="button-prev-next"><i class="fas fa-chevron-circle-right" onclick="nextButton()"></i></li>'
    } else {
        for (var i = 2; i <= totalpage; i++) {
            html += '<li><b>' + i + '</b></li>';
        }
        html += '</div>';
        html += '<li id="btnext" class="button-prev-next-active"><i class="fas fa-chevron-circle-right" onclick="nextButton()"></i></li>'
    }
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
    for (let i = 0; i < listPage.length; i++) {
        listPage[i].addEventListener('click', () => {
            var value = i + 1;
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
    document.getElementById("showOrder").style.display = "none";
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
    changeImg = true;
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
    var cat = document.getElementById("cat-product").value;
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
    var cat = document.getElementById("cat-Editproduct").value;
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
                        if (changeImg == true) {
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
function deleteProduct() {
    var ok = confirm("Chắc chắn muốn xóa sản phẩm?");
    if (!ok)
        return;
    var id = document.getElementById("id-Editproduct").value;
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
function setStatusOrder() {
    var statusbills = document.querySelectorAll(".orderNote_selection");
    var orderNoteList = JSON.parse(localStorage.getItem('orderNoteList'));
    for (let i = 0; i < statusbills.length; i++) {
        getCurrentPage(currentPage,statusbills);
        const temp = statusbills[i].value;
        statusbills[i].addEventListener('change', () => {
            if(orderNoteList[i+start].status!="Đã xử lý"){
                orderNoteList[i+start].status = statusbills[i].value;
                localStorage.setItem('orderNoteList', JSON.stringify(orderNoteList));
                if (orderNoteList[i+start].status == "Đã xử lý") {
                    statusbills[i].parentNode.parentNode.setAttribute("style", "background-color: #69C9BC");
                }
            }
            else{
                statusbills[i].value=temp;
            }
            
        });
    }
    
}
function orderfilter() {
    document.getElementById("filterBill").addEventListener("click", () => {
        var dayStart = document.getElementById("orderNote_time-from").value;
        var dayEnd = document.getElementById("orderNote_time-to").value;
        var orderNoteList = JSON.parse(localStorage.getItem('orderNoteList'));
        var filteredBills = [];
        for (var i = 0; i < orderNoteList.length; i++) {
            if (dayStart <= orderNoteList[i].date && orderNoteList[i].date <= dayEnd) {
                filteredBills.push(orderNoteList[i]);
            }
        }
        currentPage = 1;
        getCurrentPage(currentPage, filteredBills);
        totalpage = Math.ceil(filteredBills.length / perPage);
        showBillList(filteredBills);
        renderListPage();
        changePage(filteredBills);
    });
}
function setStatusUser() {
    var statususers = document.querySelectorAll(".status_selection");
    var user = JSON.parse(localStorage.getItem('user'));
    for(let i = 0; i < statususers.length; i++) {
        getCurrentPage(currentPage, users);
        statususers[i].addEventListener('change', () => {
            users[i+start].status = statususers[i].value;
            for (var j = 0; j < user.length; j++) {
                if (user[j].username == users[i+start].username) {
                    user[j].status = users[i+start].status;
                }
            }
            localStorage.setItem('user', JSON.stringify(user));
        });
    }
}

function createPIEChart(filteredStatistic, books) {
    var selectCategory = document.getElementById("categories").value;
    var quantityBooksSale = 0;
    var quantitySelectCategory = 0;
    var sumtotal = 0;
    var sumtotalSelectCategory = 0;
    var all = [{cat:"Sách giáo khoa", quantity: 0, sale: 0},
        {cat:"Sách tham khảo", quantity: 0, sale: 0},
        {cat:"Từ điển", quantity: 0, sale: 0},
        {cat:"Truyện ngắn", quantity: 0, sale: 0},
        {cat:"Truyện dài", quantity: 0, sale: 0},
        {cat:"Thơ", quantity: 0, sale: 0},
        {cat:"Khác", quantity: 0, sale: 0},
        {cat:"Ngôn tình", quantity: 0, sale: 0},
        {cat:"Giả tưởng", quantity: 0, sale: 0},
        {cat:"Tiểu thuyết Lịch sử", quantity: 0, sale: 0},
        {cat:"Quản trị", quantity: 0, sale: 0},
        {cat:"Marketing", quantity: 0, sale: 0},
        {cat:"Nhân Vật", quantity: 0, sale: 0},
        {cat:"Khởi nghiệp", quantity: 0, sale: 0},
        {cat:"Chứng khoán", quantity: 0, sale: 0},
        {cat:"Tâm lý", quantity: 0, sale: 0},
        {cat:"Kỹ năng sống", quantity: 0, sale: 0},
        {cat:"Hạt giống tâm hồn", quantity: 0, sale: 0},
        {cat:"Lịch sử Việt Nam", quantity: 0, sale: 0},
        {cat:"Lịch sử Thế giới", quantity: 0, sale: 0},
        {cat:"Truyện thiếu nhi", quantity: 0, sale: 0},
        {cat:"Tô màu", quantity: 0, sale: 0},
        {cat:"Luyện chữ", quantity: 0, sale: 0}];
    var j;
    var html = '';
    for (var i = 0; i < filteredStatistic.length; i++) {
        for (var j = 0; j < filteredStatistic[i].buyItems.length; j++) {
            quantityBooksSale = quantityBooksSale + filteredStatistic[i].buyItems[j].quantity;
        }
        var cost = filteredStatistic[i].totalPrice;
        cost = cost.split(' VND');
        cost = cost[0].replaceAll(".", "");
        sumtotal = sumtotal + parseInt(cost);
    }
    for (var i = 0; i < books.length; i++) {
        if (books[i].cat == selectCategory) {
            quantitySelectCategory += books[i].quantity;
            var cost = books[i].price;
            cost = cost.split('VND');
            cost = cost[0].replaceAll(".", "");
            sumtotalSelectCategory += books[i].quantity * parseInt(cost);
        }
        if (books[i].cat == "Sách giáo khoa")       j = 0;
        if (books[i].cat == "Sách tham khảo")       j = 1;
        if (books[i].cat == "Từ điển")              j = 2;
        if (books[i].cat == "Truyện ngắn")          j = 3;
        if (books[i].cat == "Truyện dài")           j = 4;
        if (books[i].cat == "Thơ")                  j = 5;
        if (books[i].cat == "Khác")                 j = 6;
        if (books[i].cat == "Ngôn tình")            j = 7;
        if (books[i].cat == "Giả tưởng")            j = 8;
        if (books[i].cat == "Tiểu thuyết Lịch sử")  j = 9;
        if (books[i].cat == "Quản trị")             j = 10;
        if (books[i].cat == "Marketing")            j = 11;
        if (books[i].cat == "Nhân Vật")             j = 12;
        if (books[i].cat == "Khởi nghiệp")          j = 13;
        if (books[i].cat == "Chứng khoán")          j = 14;
        if (books[i].cat == "Tâm lý")               j = 15;
        if (books[i].cat == "Kỹ năng sống")         j = 16;
        if (books[i].cat == "Hạt giống tâm hồn")    j = 17;
        if (books[i].cat == "Lịch sử Việt Nam")     j = 18;
        if (books[i].cat == "Lịch sử Thế giới")     j = 19;
        if (books[i].cat == "Truyện thiếu nhi")     j = 20;
        if (books[i].cat == "Tô màu")               j = 21;
        if (books[i].cat == "Luyện chữ")            j = 22;
        all[j].quantity += books[i].quantity;
        var cost = books[i].price;
        cost = cost.split('VND');
        cost = cost[0].replaceAll(".", "");
        all[j].sale += books[i].quantity * parseInt(cost);
    }
    if (selectCategory == "Tất cả") {
        document.getElementById("circle").style.display = "none";
        document.getElementById("note").style.display = "none";
        html += '<h3>Tổng số sản phẩm bán: ' + quantityBooksSale + '<br> Tổng doanh thu: ' + stringToPrice(sumtotal.toString()) + '</h3>';
        html += '<table id="productsList">';
        html += '<tr class="titleList"><th class="cat">THỂ LOẠI</th><th class="quantity">SỐ LƯỢNG BÁN</th><th class="sale">DOANH THU</th></tr>';
        
        for (var i = 0; i < all.length; i++) {
            html += '<tr class="detailList"><td class="cat">' + all[i].cat + '</td><td class="quantity">' + all[i].quantity + '</td><td class="sale">' + stringToPrice(all[i].sale.toString()) + '</td></tr>';
        }
        html += '</table>';
        document.getElementById("totalBooksSale").innerHTML = html;
    } else {
        document.getElementById("circle").style.display = "block";
        document.getElementById("note").style.display = "block";
        var str = '';
        str += '<div id="pink">';
        str += '<div class="color"></div>&nbsp;';
        str += '<p>' + selectCategory + '</p>&nbsp;';
        str += '</div>';
        str += '<div id="gray">';
        str += '<div class="color"></div>&nbsp;';
        str += '<p>Thể loại khác</p>&nbsp;';
        document.getElementById("note").innerHTML = str;
        var deg = (sumtotalSelectCategory / sumtotal*100*3.6).toFixed(2);
        var backgroundImage = 'background-image: conic-gradient(';
        backgroundImage += 'pink 0deg, pink ' + parseFloat(deg) + 'deg, '
        backgroundImage += 'gray ' + parseInt(deg) + 'deg, gray 360deg';
        backgroundImage += ')';
        document.getElementById("circle").setAttribute("style", backgroundImage);
        html += '<h3>Tổng số sản phẩm bán: ' + quantityBooksSale + '<br> Tổng doanh thu: ' + stringToPrice(sumtotal.toString()) + '</h3>';
        html += 'Tổng số thể loại "' + selectCategory + '" bán: ' + quantitySelectCategory + '<br> Doanh thu: ' + stringToPrice(sumtotalSelectCategory.toString());
        document.getElementById("totalBooksSale").innerHTML = html;
    }
}
function statisticFilter() {
    document.getElementById("filterStatistic").addEventListener("click", () => {
        var dayStart = document.getElementById("statistic_time-from").value;
        var dayEnd = document.getElementById("statistic_time-to").value;
        var orderNoteList = JSON.parse(localStorage.getItem('orderNoteList'));
        var selectCategory = document.getElementById("categories").value;
        var filteredStatistic = [];
        books = [];
        if (dayStart != '' && dayEnd != '') {
            if (dayEnd < dayStart) {
                alert("Vui lòng chọn ngày phù hợp!!");
                return false;
            }
            for (var i = 0; i < orderNoteList.length; i++) {
                if (dayStart <= orderNoteList[i].date && orderNoteList[i].date <= dayEnd) {
                    filteredStatistic.push(orderNoteList[i]);
                }
            }
            if (selectCategory == "Tất cả") {
                for (var i = 0; i < filteredStatistic.length; i++) {
                    for (var j = 0; j < filteredStatistic[i].buyItems.length; j++) {
                        books.push(filteredStatistic[i].buyItems[j]);
                    }
                }
                
            } else {
                for (var i = 0; i < filteredStatistic.length; i++) {
                    for (var j = 0; j < filteredStatistic[i].buyItems.length; j++) {
                        if (filteredStatistic[i].buyItems[j].cat == selectCategory) {
                            books.push(filteredStatistic[i].buyItems[j]);
                        }
                    }
                }
            }
            createPIEChart(filteredStatistic, books);
            return true;
        } else {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return false;
        }
    });
}
