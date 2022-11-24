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
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    // str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
function search(){
    var name=document.getElementById("searchPro").value;
    var category = JSON.parse(localStorage.getItem('category'));
    document.getElementById("headline").innerHTML = "<h3>Sản phẩm</h3>";
    books=[];
    //kiem tra tu khoa tim kiem co dau hay khong dau
    if (name.toLowerCase().includes(removeVietnameseTones(name).toLowerCase())){
        name=removeVietnameseTones(name).toLowerCase();
        for (var i = 0; i < category.length; i++) {
            for (var j = 0; j < category[i].listcategory.length; j++) {
                for (var k = 0; k < category[i].listcategory[j].books.length; k++) {
                    var namebook=removeVietnameseTones(category[i].listcategory[j].books[k].name).toLowerCase()
                    if (namebook.includes(name)) {
                        books.push(category[i].listcategory[j].books[k]);
                    }
                }
            }
        }
    }else{
        name=name.toLowerCase();
        for (var i = 0; i < category.length; i++) {
            for (var j = 0; j < category[i].listcategory.length; j++) {
                for (var k = 0; k < category[i].listcategory[j].books.length; k++) {
                    var namebook=category[i].listcategory[j].books[k].name.toLowerCase()
                    if (namebook.includes(name)) {
                        books.push(category[i].listcategory[j].books[k]);
                    }
                }
            }
        }
    }
    currenPage = 1;
    totalpage = Math.ceil(books.length / perPage)
    getCurrentPage(currenPage, books);
    renderProduct(books);
    renderListPage();
    changePage(books);
}
function showBtFilter(){
    document.getElementById("filterAndSort").setAttribute("style","width: 265px");
    document.getElementById("container").style.display="block";
}
function closeFilterAndSort(){
    document.getElementById("filterAndSort").setAttribute("style","width: 1px");
    document.getElementById("container").style.display="none";
}
let hiddenSortBy=true;
let hiddenFilter=true;
let hiddenPriceFilter=true;
let filter=false;
function showSortBy(){
    const sort=document.getElementById("sort");
    const options=sort.lastElementChild;
    if (hiddenSortBy==true){
        options.setAttribute("style","display: block");
        hiddenSortBy=false;
    }else{
        options.setAttribute("style","display: none");
        hiddenSortBy=true;
    }
}
function showFilter(){
    const sort=document.getElementById("filter");
    const options=sort.lastElementChild;
    if (hiddenFilter==true){
        options.setAttribute("style","display: block");
        hiddenFilter=false;
    }else{
        options.setAttribute("style","display: none");
        hiddenFilter=true;
    }
}
function showPriceFilter(){
    const sort=document.getElementById("filter1");
    const options=sort.lastElementChild;
    if (hiddenPriceFilter==true){
        options.setAttribute("style","display: block");
        hiddenPriceFilter=false;
    }else{
        options.setAttribute("style","display: none");
        hiddenPriceFilter=true;
    }
}
function sortLow_HighPrice(){
    var str = window.location.href;
    if (filter){
        books=filteredBooks;
    }
    for (var i = 0; i < books.length-1; i++){
        for (var j = i+1; j < books.length; j++){
            var cost1=books[i].price;
            var cost2=books[j].price;
            cost1=cost1.split('VND');
            cost1=cost1[0].replaceAll(".","");
            cost2=cost2.split('VND');
            cost2=cost2[0].replaceAll(".","");
            if (parseInt(cost1) > parseInt(cost2)){
                var temp = books[i];
                books[i] = books[j];
                books[j] = temp;
            }
        }
    }
    closeFilterAndSort();
    if (str.includes("?")){
        renderProduct(books);
    }else{
        renderBestseller(books);
    }
    if (filter){
        books=initialBooks;
    }
}
function sortHigh_LowPrice(){
    var str = window.location.href;
    if (filter){
        books=filteredBooks;
    }
    for (var i = 0; i < books.length-1; i++){
        for (var j = i+1; j < books.length; j++){
            var cost1=books[i].price;
            var cost2=books[j].price;
            cost1=cost1.split('VND');
            cost1=cost1[0].replaceAll(".","");
            cost2=cost2.split('VND');
            cost2=cost2[0].replaceAll(".","");
            if (parseInt(cost1) < parseInt(cost2)){
                var temp = books[i];
                books[i] = books[j];
                books[j] = temp;
            }
        }
    }
    closeFilterAndSort();
    if (str.includes("?")){
        renderProduct(books);
    }else{
        renderBestseller(books);
    }
    if (filter){
        books=initialBooks;
    }
}
function filterOption1(){
    var str = window.location.href;
    if (str.includes("?")){
        var temp=[];
        initialBooks=books;
        for (var i = 0; i < books.length; i++){
            var cost1=books[i].price;
            cost1=cost1.split('VND');
            cost1=cost1[0].replaceAll(".","");
            if (parseInt(cost1) < 500000){
                temp.push(books[i]);
            }
        }
        books = temp;
        filteredBooks = temp;
        closeFilterAndSort();
        currenPage = 1;
        totalpage = Math.ceil(books.length / perPage)
        getCurrentPage(currenPage, books);
        renderProduct(books);
        renderListPage();
        changePage(books);
        books=initialBooks;
        filter=true;
    }else{
        var temp=[];
        initialBooks=books;
        for (var i = 0; i < books.length; i++){
            var cost1=books[i].price;
            cost1=cost1.split('VND');
            cost1=cost1[0].replaceAll(".","");
            if (parseInt(cost1) < 500000){
                temp.push(books[i]);
            }
        }
        books = temp;
        filteredBooks = temp;
        closeFilterAndSort();
        renderBestseller(books);
        
        filter=true;
    }
}
function filterOption2(){
    var str = window.location.href;
    if (str.includes("?")){
        var temp=[];
        initialBooks=books;
        for (var i = 0; i < books.length; i++){
            var cost1=books[i].price;
            cost1=cost1.split('VND');
            cost1=cost1[0].replaceAll(".","");
            if (parseInt(cost1) >= 500000 && parseInt(cost1) <= 1000000){
                temp.push(books[i]);
            }
        }
        books = temp;
        filteredBooks = temp;
        closeFilterAndSort();
        currenPage = 1;
        totalpage = Math.ceil(books.length / perPage)
        getCurrentPage(currenPage, books);
        renderProduct(books);
        renderListPage();
        changePage(books);
        books=initialBooks;
        filter=true;
    }else{
        var temp=[];
        initialBooks=books;
        for (var i = 0; i < books.length; i++){
            var cost1=books[i].price;
            cost1=cost1.split('VND');
            cost1=cost1[0].replaceAll(".","");
            if (parseInt(cost1) >= 500000 && parseInt(cost1) <= 1000000){
                temp.push(books[i]);
            }
        }
        books = temp;
        filteredBooks = temp;
        closeFilterAndSort();
        renderBestseller(books);
        books=initialBooks;
        filter=true;
    }
    
}
function filterOption3(){
    var str = window.location.href;
    if (str.includes("?")){
        var temp=[];
        initialBooks=books;
        for (var i = 0; i < books.length; i++){
            var cost1=books[i].price;
            cost1=cost1.split('VND');
            cost1=cost1[0].replaceAll(".","");
            if (parseInt(cost1) > 1000000){
                temp.push(books[i]);
            }
        }
        books = temp;
        filteredBooks = temp;
        closeFilterAndSort();
        currenPage = 1;
        totalpage = Math.ceil(books.length / perPage)
        getCurrentPage(currenPage, books);
        renderProduct(books);
        renderListPage();
        changePage(books);
        books=initialBooks;
        filter=true;
    }else{
        var temp=[];
        initialBooks=books;
        for (var i = 0; i < books.length; i++){
            var cost1=books[i].price;
            cost1=cost1.split('VND');
            cost1=cost1[0].replaceAll(".","");
            if (parseInt(cost1) > 1000000){
                temp.push(books[i]);
            }
        }
        books = temp;
        filteredBooks = temp;
        closeFilterAndSort();
        renderBestseller(books);
        books=initialBooks;
        filter=true;
    }
    
}
function filterOption4(){
    var str = window.location.href;
    if (str.includes("?")){
        var temp=[];
        initialBooks=books;
        var bestseller = JSON.parse(localStorage.getItem('bestseller'));
        for (var i = 0; i < books.length; i++){
            for (var j = 0; j<bestseller.length; j++){
                if (books[i].id == bestseller[j].id){
                    temp.push(books[i]);
                }
            }
        }
        books = temp;
        filfilteredBooks = temp;
        currenPage = 1;
        totalpage = Math.ceil(books.length / perPage)
        getCurrentPage(currenPage, books);
        renderProduct(books);
        renderListPage();
        changePage(books);
        books=initialBooks;
        filter=true;
    }
    closeFilterAndSort();
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
    document.getElementById("wrapper").style.display = "none";
}
function showSignUp() {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
}
function createDevice() {
    if (JSON.parse(localStorage.getItem('category')) != null)
        return;
    const devices = [
        {id:1, name:"Dụng cụ học sinh", quantity:0, listcategory: [
            {id:"BV", name:"Bút viết", quantity:0, devices:[]},
            {id:"T", name:"Tẩy", quantity:0, devices:[]},
            {id:"TK", name:"Thước kẻ", quantity:0, devices:[]},
            {id:"MTCT", name:"Máy tính cầm tay", quantity:0, devices:[]},
        ]},
        {id:2, name:"Dụng cụ văn phòng", quantity:0, listcategory: [
            {id:"NOTE", name:"Sổ tay/Ghi chú", quantity:0, devices:[]},
            {id:"TUI", name:"Túi/Bìa đụng hồ sơ", quantity:0, devices:[]},
            {id:"CD", name:"Cắt/Dán", quantity:0, devices:[]},
            {id:"KHVP", name:"Khác", quantity:0, devices:[]},
        ]},
        {id:3, name:"Dụng cụ vẽ", quantity:0, listcategory: [
            {id:"BV", name:"Bảng vẽ", quantity:0, devices:[]},
            {id:"BUV", name:"Bút vẽ", quantity:0, devices:[]},
            {id:"BUM", name:"Bút màu", quantity:0, devices:[]},
            {id:"MN", name:"Màu nước", quantity:0, devices:[]},
            {id:"CV", name:"Cọ vẽ", quantity:0, devices:[]},
            {id:"KHVE", name:"Khác", quantity:0, devices:[]},
        ]},
        {id:4, name:"Khác", quantity:0, listcategory: []},
    ]
    
}
function createBook() {
    if (JSON.parse(localStorage.getItem('category')) != null)
        return;
    const category = [
        {id:1, name:"Giáo dục", quantity:0, listcategory: [
            {id:"GK", name:"Sách giáo khoa", quantity:0, books:[
                {id:"GK1", name:"Bộ SGK Lớp 1 - Chân Trời Sáng Tạo",cat:null,price:"186.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK1.jpeg"},
                {id:"GK2", name:"Bộ SGK Lớp 2 - Chân Trời Sáng Tạo",cat:null,price:"179.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK2.jpeg"},
                {id:"GK3", name:"Bộ SGK Lớp 3",cat:null,price:"115.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK3.jpeg"},
                {id:"GK4", name:"Bộ SGK Lớp 4",cat:null,price:"200.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK4.jpeg"},
                {id:"GK5", name:"Bộ SGK Lớp 5",cat:null,price:"240.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK5.jpeg"},
                {id:"GK6", name:"Bộ SGK Lớp 6 - Cánh Diều",cat:null,price:"259.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK6.jpeg"},
                {id:"GK7", name:"Bộ SGK Lớp 7",cat:null,price:"240.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK7.jpeg"},
                {id:"GK8", name:"Bộ SGK Lớp 8",cat:null,price:"180.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK8.jpeg"},
                {id:"GK9", name:"Bộ SGK Lớp 9",cat:null,price:"240.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK9.jpeg"},
                {id:"GK10", name:"Bộ SGK Lớp 10",cat:null,price:"164.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK10.jpeg"},
                {id:"GK11", name:"Bộ SGK Lớp 11",cat:null,price:"249.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK11.jpeg"},
                {id:"GK12", name:"Bộ SGK Lớp 12",cat:null,price:"180.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK12.jpeg"},
                {id:"GK13", name:"Bộ SGK (Sách bài tập) Lớp 2 - Cánh Diều",cat:null,price:"159.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK13.jpeg"},
                {id:"GK14", name:"Sách bài tập Vật Lý Lớp 10 - Cánh Diều",cat:null,price:"22.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK14.jpeg"},
                {id:"GK15", name:"Bộ SGK (Sách bài tập) Lớp 12",cat:null,price:"164.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK15.jpeg"},
                {id:"GK16", name:"Bộ SGK (Sách bài tập) Lớp 6 - Chân Trời Sáng Tạo",cat:null,price:"234.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK16.jpeg"},
                {id:"GK17", name:"Giáo Dục Kinh Tế Và Pháp Luật Lớp 10 - Chân Trời Sáng Tạo",cat:null,price:"27.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK17.jpeg"},
                {id:"GK18", name:"SGK Hoá Học Lớp 10 - Cánh Diều",cat:null,price:"24.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK18.jpeg"},
                {id:"GK19", name:"Sách bài tập Toán Lớp 10 (Tập 1) - Cánh Diều",cat:null,price:"24.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK19.jpeg"},
                {id:"GK20", name:"Sách bài tập Lịch Sử Lớp 10 - Cánh Diều",cat:null,price:"17.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK20.jpeg"},
                {id:"GK21", name:"Sách Chuyên đề Ngữ Văn Lớp 10 - Cánh Diều",cat:null,price:"16.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK21.jpeg"},
                {id:"GK22", name:"Sách Chuyên đề Công Nghệ Lớp 10 - Cánh Diều",cat:null,price:"25.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK22.jpeg"},
                {id:"GK23", name:"Sách bài tập Khoa học tự nhiên Lớp 10 - Cánh Diều",cat:null,price:"28.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK23.png"},
                {id:"GK24", name:"SGK Âm Nhạc Lớp 7 - Cánh Diều",cat:null,price:"11.000"+" VND",quantity:10,image:"/assets/images/product/Sach/GiaoDuc/SachGiaoKhoa/GK24.png"},
            ]},
            {id:"TK", name:"Sách tham khảo", quantity:0, books:[
                {id:"TK1", name:"Hướng dẫn học Ngữ Văn 6 (Tập 1)",cat:null,price:"69.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK1.jpeg"},
                {id:"TK2", name:"Sách tham khảo Vật Lí 10",cat:null,price:"138.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK2.jpeg"},
                {id:"TK3", name:"Sách tham khảo Hoá Học 10",cat:null,price:"98.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK3.jpeg"},
                {id:"TK4", name:"Sách tham khảo Khoa học tự nhiên 7",cat:null,price:"125.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK4.jpeg"},
                {id:"TK5", name:"Sách tham khảo Toán 10 (Quyển 1)",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK5.jpeg"},
                {id:"TK6", name:"Sách tham khảo Luyện tập Toán 3 (2 quyển)",cat:null,price:"64.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK6.jpeg"},
                {id:"TK7", name:"Bồi dưỡng Ngữ Văn 10",cat:null,price:"58.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK7.jpeg"},
                {id:"TK8", name:"Bồi dưỡng Học sinh giỏi Sinh Học 8",cat:null,price:"55.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK8.jpeg"},
                {id:"TK9", name:"Sổ tay kiến thức Hoá Học THPT",cat:null,price:"90.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK9.png"},
                {id:"TK10", name:"35 Đề Tiếng Anh Thi Vào Lớp 10 (Có Đáp Án)",cat:null,price:"65.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK10.jpeg"},
                {id:"TK11", name:"Combo Sách Bài Tập Nâng Cao Toán Lớp 2",cat:null,price:"113.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK11.jpeg"},
                {id:"TK12", name:"Sách tham khảo Đề Kiểm Tra Tiếng Anh 7",cat:null,price:"59.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK12.jpeg"},
                {id:"TK13", name:"Bài tập Tiếng Anh 8 (Không đáp án)",cat:null,price:"40.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK13.jpeg"},
                {id:"TK14", name:"Bài tập Tiếng Anh 3",cat:null,price:"40.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK14.jpeg"},
                {id:"TK15", name:"Chinh Phục Luyện Thi Vào Lớp 10 Môn Tiếng Anh Theo Chủ Đề",cat:null,price:"109.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK15.jpeg"},
                {id:"TK16", name:"Bài Tập Trắc Nghiệm Tiếng Anh 9 (Có Đáp Án)",cat:null,price:"56.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK16.jpeg"},
                {id:"TK17", name:"Trắc nghiệm Địa Lí Lớp 7",cat:null,price:"42.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK17.jpeg"},
                {id:"TK18", name:"Đề kiểm tra Ngữ Văn Lớp 10",cat:null,price:"55.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK18.jpeg"},
                {id:"TK19", name:"Rèn kỹ năng học tốt Toán 8",cat:null,price:"59.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK19.jpeg"},
                {id:"TK20", name:"Trả lời câu hỏi & Giải bài tập Ngữ Văn 8",cat:null,price:"55.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK20.jpeg"},
                {id:"TK21", name:"Hướng dẫn giải bài tập Vật Lí Lớp 12",cat:null,price:"49.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK21.jpeg"},
                {id:"TK22", name:"Những bài văn mẫu 9",cat:null,price:"61.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK22.jpeg"},
                {id:"TK23", name:"Tuyển chọn 25 đề thi Ngữ Văn kì thi THPT",cat:null,price:"83.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK23.jpeg"},
                {id:"TK24", name:"Giải bài tập Vật Lí 9",cat:null,price:"64.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/SachThamKhao/TK24.jpeg"},
    
            ]},
            {id:"TD", name:"Từ điển", quantity:0, books:[
                {id:"TD1", name:"Từ điển Oxford Anh - Anh - Việt (Bìa Vàng)",cat:null,price:"298.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD1.jpeg"},
                {id:"TD2", name:"Từ điển Anh Việt 200.000 từ",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD2.jpeg"},
                {id:"TD3", name:"Từ điển Hán Việt (Bìa Cứng)",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD3.jpeg"},
                {id:"TD4", name:"Từ điển Việt Nga",cat:null,price:"165.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD4.jpeg"},
                {id:"TD5", name:"Từ điển cách dùng Tiếng Anh",cat:null,price:"300.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD5.jpeg"},
                {id:"TD6", name:"Từ điển Anh - Việt bỏ túi",cat:null,price:"99.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD6.jpeg"},
                {id:"TD7", name:"Từ điển Mỹ Học",cat:null,price:"399.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD7.jpeg"},
                {id:"TD8", name:"Từ điển Nhật - Việt thông dụng",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD8.jpeg"},
                {id:"TD9", name:"Từ điển Chính Tả",cat:null,price:"40.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD9.gif"},
                {id:"TD10", name:"Từ điển Nga - Việt",cat:null,price:"165.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD10.jpeg"},
                {id:"TD11", name:"Từ điển Nhật - Việt, Việt - Nhật",cat:null,price:"145.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD11.jpeg"},
                {id:"TD12", name:"Từ điển Hàn Việt",cat:null,price:"45.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD12.jpeg"},
                {id:"TD13", name:"Từ điển trực quan bỏ túi Pháp - Việt",cat:null,price:"188.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD13.png"},
                {id:"TD14", name:"Từ điển Việt - Hàn",cat:null,price:"80.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD14.jpeg"},
                {id:"TD15", name:"Từ điển Tiếng Việt",cat:null,price:"165.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD15.jpeg"},
                {id:"TD16", name:"Từ điển Triết Học Habermas",cat:null,price:"135.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD16.jpeg"},
                {id:"TD17", name:"Từ điển bách khoa tương tác cho trẻ em (Anh - Hoa - Việt)",cat:null,price:"66.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD17.jpeg"},
                {id:"TD18", name:"Từ điển Tiếng Anh bằng hình",cat:null,price:"117.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD18.jpeg"},
                {id:"TD19", name:"Từ điển Hoa - Việt",cat:null,price:"78.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD19.jpeg"},
                {id:"TD20", name:"Từ điển - Sách công cụ chữ Hán của Việt Nam và Trung Quốc",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/GiaoDuc/TuDien/TD20.jpeg"},
    
            ]},
        ]},
        {id:2, name:"Văn học", quantity:0, listcategory: [
            {id:"TNG", name:"Truyện ngắn", quantity:0, books:[
                {id:"TNG1", name:"Từ Điển Tiếng 'Em'",cat:null,price:"69.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG1.png"},
                {id:"TNG2", name:"Những Đêm Không Ngủ Những Ngày Chậm Trôi",cat:null,price:"86.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG2.jpeg"},
                {id:"TNG3", name:"Có Một Ngày, Bố Mẹ Sẽ Già Đi",cat:null,price:"96.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG3.jpeg"},
                {id:"TNG4", name:"Màu Nhạt Nắng",cat:null,price:"149.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG4.jpeg"},
                {id:"TNG5", name:"Dear, Darling",cat:null,price:"88.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG5.jpeg"},
                {id:"TNG6", name:"Hẹn Nhau Phía Sau Tan Vỡ",cat:null,price:"86.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG6.jpeg"},
                {id:"TNG7", name:"Chúng Ta Rồi Sẽ Hạnh Phúc, Theo Những Cách Khác Nhau",cat:null,price:"86.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG7.png"},
                {id:"TNG8", name:"Gửi Bạn, Người Đã Kiệt Sức Vì Những Chịu Đựng Âm Thầm",cat:null,price:"96.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG8.jpeg"},
                {id:"TNG9", name:"Chuyện ICU - Khi Thiên Thần Nhiễm Bệnh",cat:null,price:"119.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG9.jpeg"},
                {id:"TNG10", name:"Mình Phải Sống Như Biển Rộng Sông Dài",cat:null,price:"109.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG10.jpeg"},
                {id:"TNG11", name:"Thế Giới Này Âm Thầm Yêu Em",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG11.jpeg"},
                {id:"TNG12", name:"Vô Thường",cat:null,price:"79.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG12.jpeg"},
                {id:"TNG13", name:"Nắng",cat:null,price:"89.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG13.jpeg"},
                {id:"TNG14", name:"Hãy Cầm Lấy Và Đọc",cat:null,price:"90.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG14.jpeg"},
                {id:"TNG15", name:"Phụ Nữ Vạn Người Mê",cat:null,price:"99.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG15.jpeg"},
                {id:"TNG16", name:"Tôi Thích Bản Thân Nỗ Lực Hơn",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG16.jpeg"},
                {id:"TNG17", name:"Với Đà Lạt Ai Cũng Là Lữ Khách",cat:null,price:"58.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG17.jpeg"},
                {id:"TNG18", name:"Cứ Khóc, Cứ Tan Vỡ Và Trưởng Thành",cat:null,price:"78.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG18.jpeg"},
                {id:"TNG19", name:"Danh Tác Việt Nam - Lão Hạc (Tập Truyện Ngắn)",cat:null,price:"52.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG19.jpeg"},
                {id:"TNG20", name:"Đừng Cố Làm Người Tốt Trong Mắt Tất Cả Mọi Người",cat:null,price:"108.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG20.jpeg"},
                {id:"TNG21", name:"Một Lần Tới Nhân Gian, Phải Sống Đời Rực Rỡ",cat:null,price:"119.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG21.jpeg"},
                {id:"TNG22", name:"Vì Mùa Xuân Nào Cũng Phải Trôi Đi",cat:null,price:"45.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG22.jpeg"},
                {id:"TNG23", name:"Gió Lạnh Đầu Mùa",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG23.jpeg"},
                {id:"TNG24", name:"Xin Chào Người Trân Quý",cat:null,price:"112.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenNgan/TNG24.jpeg"},
    
            ]},
            {id:"TRD", name:"Truyện dài", quantity:0, books:[
                {id:"TRD1", name:"Ra Bờ Suối Ngắm Hoa Kèn Hồng",cat:null,price:"145.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD1.jpeg"},
                {id:"TRD2", name:"Cửa Tiệm Của Những Lá Thư",cat:null,price:"80.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD2.jpeg"},
                {id:"TRD3", name:"Út Quyên Và Tôi",cat:null,price:"35.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD3.jpeg"},
                {id:"TRD4", name:"Cảm Ơn Người Lớn",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD4.jpeg"},
                {id:"TRD5", name:"Thiên Thần Nhỏ Của Tôi",cat:null,price:"68.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD5.jpeg"},
                {id:"TRD6", name:"Bàn Có Năm Chỗ Ngồi",cat:null,price:"38.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD6.jpeg"},
                {id:"TRD7", name:"Phòng Trọ Ba Người",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD7.jpeg"},
                {id:"TRD8", name:"Ngôi Trường Mọi Khi",cat:null,price:"43.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD8.jpeg"},
                {id:"TRD9", name:"Quán Gò Đi Lên",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD9.jpeg"},
                {id:"TRD10", name:"Thằng Quỷ Nhỏ",cat:null,price:"70.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD10.jpeg"},
                {id:"TRD11", name:"Nữ Sinh",cat:null,price:"55.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD11.jpeg"},
                {id:"TRD12", name:"Buổi Chiều Windows",cat:null,price:"56.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD12.jpeg"},
                {id:"TRD13", name:"Đi Qua Hoa Cúc",cat:null,price:"56.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD13.jpeg"},
                {id:"TRD14", name:"Những Cô Em Gái",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD14.jpeg"},
                {id:"TRD15", name:"Những Chàng Trai Xấu Tính",cat:null,price:"43.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD15.jpeg"},
                {id:"TRD16", name:"Con Chim Xanh Biếc Bay Về",cat:null,price:"230.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD16.jpeg"},
                {id:"TRD17", name:"Trước Vòng Chung Kết",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD17.jpeg"},
                {id:"TRD18", name:"Hoa Hồng Xứ Khác",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD18.jpeg"},
                {id:"TRD19", name:"Bong Bóng Lên Trời",cat:null,price:"58.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD19.jpeg"},
                {id:"TRD20", name:"Bồ Câu Không Đưa Thư",cat:null,price:"38.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD20.jpeg"},
                {id:"TRD21", name:"Chú Bé Rắc Rối",cat:null,price:"38.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD21.jpeg"},
                {id:"TRD22", name:"Trại Hoa Vàng",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD22.jpeg"},
                {id:"TRD23", name:"Còn Chút Gì Để Nhớ",cat:null,price:"43.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD23.jpeg"},
                {id:"TRD24", name:"Làm Bạn Với Bầu Trời",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/TruyenDai/TRD24.jpeg"},
    
            ]},
            {id:"T", name:"Thơ", quantity:0, books:[
                {id:"T1", name:"Thơ Khát Vọng",cat:null,price:"100.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T1.jpeg"},
                {id:"T2", name:"Thơ Xuân Diệu",cat:null,price:"38.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T2.jpeg"},
                {id:"T3", name:"Thơ Tố Hữu",cat:null,price:"35.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T3.jpeg"},
                {id:"T4", name:"Thơ Hướng Dương",cat:null,price:"60.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T4.jpeg"},
                {id:"T5", name:"Khúc Ru Trầm (77 Ca Khúc Phổ Thơ Nguyễn Ngọc Hạnh)",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T5.jpeg"},
                {id:"T6", name:"Con Đường Thơ - Toàn Tập Thơ Khế Lêm",cat:null,price:"250.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T6.jpeg"},
                {id:"T7", name:"Đặng Đình Hưng Một Bến Lạ - Thơ Và Họa",cat:null,price:"450.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T7.jpeg"},
                {id:"T8", name:"Góc Sân Và Khoảng Trời",cat:null,price:"59.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T8.jpeg"},
                {id:"T9", name:"Tuyển Thơ Trần Đăng Khoa",cat:null,price:"125.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T9.jpeg"},
                {id:"T10", name:"Tác Phẩm Chọn Lọc - Văn Học Ấn Độ - Những Bài Thơ",cat:null,price:"40.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T10.jpeg"},
                {id:"T11", name:"Tủ Sách Đời Người - Thơ Ngụ Ngôn",cat:null,price:"79.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T11.jpeg"},
                {id:"T12", name:"Hoàng Cầm 100 Bài Thơ",cat:null,price:"116.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T12.jpeg"},
                {id:"T13", name:"Tinh Hoa Văn Chương Việt - Thơ Xuân Quỳnh",cat:null,price:"79.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T13.jpeg"},
                {id:"T14", name:"Hồ Xuân Hương Thơ Và Đời",cat:null,price:"60.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T14.jpeg"},
                {id:"T15", name:"Như Dải Phù Vân",cat:null,price:"126.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T15.jpeg"},
                {id:"T16", name:"Võ Quảng - Một Đời Thơ Văn - Ấn Bản Kỉ Niệm 100 Năm Ngày Sinh Nhà Văn Võ Quảng",cat:null,price:"180.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T16.jpeg"},
                {id:"T17", name:"Nguyễn Đình Chiểu Thơ Và Đời",cat:null,price:"87.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T17.jpeg"},
                {id:"T18", name:"Hàn Mặc Tử Thơ Và Đời",cat:null,price:"60.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T18.jpeg"},
                {id:"T19", name:"Nhớ (Thơ Song Ngữ)",cat:null,price:"42.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T19.jpeg"},
                {id:"T20", name:"Giai Nhân Di Mặc - Sự Tích Và Thơ Từ Hồ Xuân Hương",cat:null,price:"65.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T20.jpeg"},
                {id:"T21", name:"Nắng Thiên Đường",cat:null,price:"70.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T21.jpeg"},
                {id:"T22", name:"Dương Tường",cat:null,price:"108.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T22.jpeg"},
                {id:"T23", name:"Bỗng Nghe Vần 'Thắng' Vút Lên Cao - Thơ Hồ Chí Minh Và Những Lời Bình",cat:null,price:"168.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T23.jpeg"},
                {id:"T24", name:"Tuyển tập thơ cổ Trung Hoa (Tập 1 Tiên Tần)",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/VanHoc/Tho/T24.jpeg"},
    
            ]},
            {id:"KH", name:"Khác", quantity:0, books:[

            ]},
            
        ]},
        {id:3, name:"Tiểu thuyết", quantity:0, listcategory: [
            {id:"NT", name:"Ngôn tình", quantity:0, books:[
                {id:"NT1", name:"Bến xe",cat:null,price:"76.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT1.jpeg"},
                {id:"NT2", name:"Thất tịch không mưa",cat:null,price:"79.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT2.jpeg"},
                {id:"NT3", name:"Bên nhau trọn đời",cat:null,price:"145.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT3.jpeg"},
                {id:"NT4", name:"Hãy nhắm mắt khi anh đến (tập 1)",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT4.jpeg"},
                {id:"NT5", name:"Hãy nhắm mắt khi anh đến (tập 2)",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT5.jpeg"},
                {id:"NT6", name:"Từng có người yêu tôi như sinh mệnh",cat:null,price:"118.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT6.jpeg"},
                {id:"NT7", name:"Anh có thích nước Mỹ không?",cat:null,price:"138.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT7.jpeg"},
                {id:"NT8", name:"Sẽ có thiên thần thay anh yêu em",cat:null,price:"138.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT8.jpeg"},
                {id:"NT9", name:"Hoá ra anh vẫn ở đây (tập 1)",cat:null,price:"74.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT9.jpeg"},
                {id:"NT10", name:"Hoá ra anh vẫn ở đây (tập 2)",cat:null,price:"74.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT10.jpeg"},
                {id:"NT11", name:"Yêu em từ cái nhìn đầu tiên",cat:null,price:"109.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT11.jpeg"},
                {id:"NT12", name:"All in love - Ngập tràn yêu thương",cat:null,price:"118.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT12.jpeg"},
                {id:"NT13", name:"Mãi mãi là bao xa",cat:null,price:"135.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT13.jpeg"},
                {id:"NT14", name:"Em sẽ đến cùng cơn mưa",cat:null,price:"90.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT14.jpeg"},
                {id:"NT15", name:"Rừng Na Uy",cat:null,price:"128.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT15.jpeg"},
                {id:"NT16", name:"Lấp Lánh",cat:null,price:"58.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT16.jpeg"},
                {id:"NT17", name:"Your Name",cat:null,price:"75.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT17.jpeg"},
                {id:"NT18", name:"Socrates In Love",cat:null,price:"65.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT18.jpeg"},
                {id:"NT19", name:"5 Centimet trên giây",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT19.jpeg"},
                {id:"NT20", name:"Khu vườn ngôn từ",cat:null,price:"95.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT20.jpeg"},
                {id:"NT21", name:"Tôi vẫn nghe tiếng em thầm gọi",cat:null,price:"52.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT21.jpeg"},
                {id:"NT22", name:"North and South",cat:null,price:"74.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT22.jpeg"},
                {id:"NT23", name:"Kiêu Hãnh và Định Kiến",cat:null,price:"95.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT23.jpeg"},
                {id:"NT24", name:"Me Before You",cat:null,price:"180.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_NgonTinh/NT24.jpeg"},
    
            ]},
            {id:"GT", name:"Giả tưởng", quantity:0, books:[
                {id:"GT1", name:"Harry Potter (Trọn bộ)",cat:null,price:"1.550.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT1.jpeg"},
                {id:"GT2", name:"Chúa tể những chiếc nhẫn (Trọn bộ)",cat:null,price:"470.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT2.jpeg"},
                {id:"GT3", name:"The Hobbit (Anh chàng Hobbit)",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT3.jpeg"},
                {id:"GT4", name:"A Game of Thrones",cat:null,price:"270.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT4.jpeg"},
                {id:"GT5", name:"The Chronicles of Narnia (Trọn bộ)",cat:null,price:"307.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT5.jpeg"},
                {id:"GT6", name:"Dune - Xứ Cát",cat:null,price:"249.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT6.jpeg"},
                {id:"GT7", name:"Thần thoại Bắc Âu",cat:null,price:"96.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT7.jpeg"},
                {id:"GT8", name:"Eragon - Cậu bé cưỡi rồng",cat:null,price:"100.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT8.jpeg"},
                {id:"GT9", name:"Cỗ máy thời gian",cat:null,price:"68.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT9.jpeg"},
                {id:"GT10", name:"Tam Thể (Trọn bộ)",cat:null,price:"665.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT10.jpeg"},
                {id:"GT11", name:"Trạm tín hiệu số 23",cat:null,price:"79.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT11.jpeg"},
                {id:"GT12", name:"Liểu trai chí dị",cat:null,price:"226.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT12.jpeg"},
                {id:"GT13", name:"Rạp xiếc đêm",cat:null,price:"160.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT13.jpeg"},
                {id:"GT14", name:"Artemis Fowl (Trọn bộ)",cat:null,price:"1.050.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT14.jpeg"},
                {id:"GT15", name:"Outlander (Trọn bộ)",cat:null,price:"528.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT15.jpg"},
                {id:"GT16", name:"Đại Nam Dị Truyện",cat:null,price:"76.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT16.jpeg"},
                {id:"GT17", name:"Nơi khu rừng chạm tới những vì sao",cat:null,price:"179.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT17.jpeg"},
                {id:"GT18", name:"451 Độ F",cat:null,price:"99.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT18.jpeg"},
                {id:"GT19", name:"Xứ Sở Diệu Kỳ Tàn Bạo Và Chốn Tận Cùng Thế Giới",cat:null,price:"139.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT19.jpeg"},
                {id:"GT20", name:"Hai vạn dặm dưới đáy biển",cat:null,price:"98.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT20.jpeg"},
                {id:"GT21", name:"Cô thành trong gương",cat:null,price:"218.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT21.jpeg"},
                {id:"GT22", name:"Hố",cat:null,price:"62.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT22.jpeg"},
                {id:"GT23", name:"Quán canh bò hầm của kẻ cắp quá khứ",cat:null,price:"216.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT23.jpeg"},
                {id:"GT24", name:"Xứ Tháng Mười",cat:null,price:"219.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_GiaTuong/GT24.jpeg"},
    
            ]},
            {id:"TTLS", name:"Tiểu thuyết Lịch sử", quantity:0, books:[
                {id:"LS1", name:"Những người khốn khổ (Trọn bộ)",cat:null,price:"390.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS1.jpg"},
                {id:"LS2", name:"Chiến Tranh và Hoà Bình (Trọn bộ)",cat:null,price:"395.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS2.jpeg"},
                {id:"LS3", name:"Bá tước Monte Cristo",cat:null,price:"590.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS3.jpeg"},
                {id:"LS4", name:"Don Quixote (Trọn bộ)",cat:null,price:"263.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS4.jpeg"},
                {id:"LS5", name:"Tam Quốc Diễn Nghĩa (Trọn bộ)",cat:null,price:"540.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS5.jpeg"},
                {id:"LS6", name:"Thuỷ hử (Trọn bộ)",cat:null,price:"330.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS6.jpeg"},
                {id:"LS7", name:"Lâu đài sói",cat:null,price:"159.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS7.jpeg"},
                {id:"LS8", name:"Thông reo Ngàn Hống",cat:null,price:"140.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS8.jpeg"},
                {id:"LS9", name:"Lệ Chi",cat:null,price:"98.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS9.png"},
                {id:"LS10", name:"Fall of Giants",cat:null,price:"390.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS10.jpeg"},
                {id:"LS11", name:"Winter of the World",cat:null,price:"204.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS11.jpeg"},
                {id:"LS12", name:"Edge of Eternity",cat:null,price:"258.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS12.jpeg"},
                {id:"LS13", name:"Trần Nhật Duật",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS13.jpeg"},
                {id:"LS14", name:"Thiên Mệnh",cat:null,price:"160.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS14.jpeg"},
                {id:"LS15", name:"Hồ Quý Ly",cat:null,price:"280.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS15.jpeg"},
                {id:"LS16", name:"Lý Đào Lang Vương",cat:null,price:"170.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS16.jpeg"},
                {id:"LS17", name:"Nam Đế Vạn Xuân",cat:null,price:"140.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS17.jpeg"},
                {id:"LS18", name:"Nam Quốc Sơn Hà",cat:null,price:"240.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS18.jpeg"},
                {id:"LS19", name:"Tiêu Sơn Tráng Sĩ",cat:null,price:"286.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS19.jpeg"},
                {id:"LS20", name:"Nghĩa địa Praha",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/TieuThuyet/TT_LichSu/LS20.jpeg"},
    
            ]},

        ]},
        {id:4, name:"Kinh tế", quantity:0, listcategory: [
            {id:"QT", name:"Quản trị", quantity:0, books:[
                {id:"QT1", name:"Quản Trị Nhân Sự Thông Minh Bằng Dữ Liệu",cat:null,price:"149.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT1.jpeg"},
                {id:"QT2", name:"Quản Trị Công Ty Khởi Nghiệp",cat:null,price:"80.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT2.jpeg"},
                {id:"QT3", name:"Quản Trị Tinh Gọn - Quản Trị Doanh Nghiệp, Quản Trị Cuộc Đời",cat:null,price:"148.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT3.jpeg"},
                {id:"QT4", name:"Quản Trị Nguồn Nhân Lực LOGISTISC Ở Việt Nam",cat:null,price:"238.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT4.png"},
                {id:"QT5", name:"Quản Trị Dự Án - Những Nguyên Tắc Căn Bản",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT5.jpeg"},
                {id:"QT6", name:"Quản Trị Nhân Sự Đúng ",cat:null,price:"239.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT6.jpeg"},
                {id:"QT7", name:"Quản Trị Dự Án",cat:null,price:"199.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT7.jpeg"},
                {id:"QT8", name:"Quản Trị Trong Thời Khủng Hoảng",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT8.jpeg"},
                {id:"QT9", name:"Quản Trị Chuỗi Cung Ứng - Những Phương Pháp Hay Nhất",cat:null,price:"199.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT9.jpeg"},
                {id:"QT10", name:"Quản Trị Học - Tóm Tắt Lý Thuyết Và Câu Hỏi Trắc Nghiệm",cat:null,price:"159.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT10.jpeg"},
                {id:"QT11", name:"Quản Trị Tài Chính",cat:null,price:"590.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT11.jpeg"},
                {id:"QT12", name:"Quản Trị Nông Nghiệp 4.0",cat:null,price:"400.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT12.jpeg"},
                {id:"QT13", name:"Quản Trị Doanh Nghiệp Trong Thời Đại Mới - Thành Công Có Ý Nghĩa",cat:null,price:"58.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT13.jpeg"},
                {id:"QT14", name:"Cẩm Nang Quản Trị Điều Hành - Quản Trị Vi Mô",cat:null,price:"80.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT14.jpeg"},
                {id:"QT15", name:"OKR - 'Kinh Thánh' Quản Trị Và Cách Vận Hành Hiệu Quả",cat:null,price:"134.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT15.jpeg"},
                {id:"QT16", name:"Nguyên Lý Quản Trị Chuỗi Cung Ứng",cat:null,price:"199.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT16.jpeg"},
                {id:"QT17", name:"Tinh Hoa Quản Trị Dự Án Dành Cho Quản Lý Dự Án Không Chuyên ",cat:null,price:"138.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT17.png"},
                {id:"QT18", name:"Cẩm Nang Quản Trị Điều Hành - Quản Trị Tích Hợp",cat:null,price:"105.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT18.jpeg"},
                {id:"QT19", name:"Kiểm Soát Quản Trị - Corporate Governance",cat:null,price:"375.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT19.jpeg"},
                {id:"QT20", name:"Những Ảo Tưởng Quản Trị địa Praha",cat:null,price:"136.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/QuanTri/QT20.png"},
    
            ]},
            {id:"M", name:"Marketing", quantity:0, books:[
                {id:"M1", name:"Marketing Căn Bản - Marketing 101",cat:null,price:"229.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M1.jpeg"},
                {id:"M2", name:"Marketing B2B Sáng Tạo",cat:null,price:"165.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M2.jpeg"},
                {id:"M3", name:"Marketing - Đột Phá Trước Khi Bị Đá",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M3.jpeg"},
                {id:"M4", name:"Marketing Thực Chiến - Từ Chiến Lược Đến Thực Thi",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M4.jpeg"},
                {id:"M5", name:"Marketing Du Kích Trong 30 Ngày",cat:null,price:"169.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M5.jpeg"},
                {id:"M6", name:"Marketing Đột Phá",cat:null,price:"118.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M6.png"},
                {id:"M7", name:"Marketing Cho Start Up",cat:null,price:"149.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M7.jpeg"},
                {id:"M8", name:"Marketing Đáng Kinh Ngạc",cat:null,price:"143.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M8.png"},
                {id:"M9", name:"Marketing Truyền Miệng",cat:null,price:"109.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M9.jpeg"},
                {id:"M10", name:"Marketing Trong Cuộc Cách Mạng Công Nghệ 4.0",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M10.png"},
                {id:"M11", name:"Marketing Hệ Não Đồ",cat:null,price:"160.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M11.jpeg"},
                {id:"M12", name:"Marketing Phải Bán Được Hàng",cat:null,price:"159.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M12.jpeg"},
                {id:"M13", name:"Marketing Trên Một Trang Giấy",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M13.jpeg"},
                {id:"M14", name:"Marketing Kiểu Xiaomi",cat:null,price:"149.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M14.jpeg"},
                {id:"M15", name:"Tiktok Marketing",cat:null,price:"139.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M15.jpeg"},
                {id:"M16", name:"Digital Marketing - Chiến Lược Là Lược Đi Để Chiến",cat:null,price:"139.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/Marketing/M16.png"},
    
            ]},
            {id:"NV", name:"Nhân Vật", quantity:0, books:[
    
            ]},
            {id:"KN", name:"Khởi nghiệp", quantity:0, books:[
                {id:"KN1", name:"Khởi Nghiệp Đổi Mới Sáng Tạo - Tư Duy & Công Cụ",cat:null,price:"169.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN1.jpeg"},
                {id:"KN2", name:"Khởi Nghiệp Không Phải Là Ước Mơ Xa Vời",cat:null,price:"75.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN2.jpeg"},
                {id:"KN3", name:"Khởi Nghiệp Ngay!",cat:null,price:"65.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN3.jpeg"},
                {id:"KN4", name:"Khởi Nghiệp Táo Bạo",cat:null,price:"159.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN4.jpeg"},
                {id:"KN5", name:"Khởi Nghiệp - Lựa Chọn Hay Bản Năng",cat:null,price:"170.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN5.jpeg"},
                {id:"KN6", name:"Khởi Nghiệp Tinh Gọn - The Lean Startup",cat:null,price:"165.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN6.jpeg"},
                {id:"KN7", name:"Khởi Nghiệp Phiêu Lưu Ký",cat:null,price:"175.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN7.png"},
                {id:"KN8", name:"Khởi Nghiệp Kinh Doanh - Lý Thuyết, Quá Trình, Thực Tiễn",cat:null,price:"380.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN8.png"},
                {id:"KN9", name:"Khởi Nghiệp Cuối Tuần",cat:null,price:"99.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN9.jpeg"},
                {id:"KN10", name:"Khởi Nghiệp - Con Đường Duy Nhất Giúp Bạn Giàu Có",cat:null,price:"35.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN10.jpeg"},
                {id:"KN11", name:"Khởi Nghiệp - Thích Nghi & Sống Sót",cat:null,price:"75.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN11.jpeg"},
                {id:"KN12", name:"Khởi Nghiệp Từ A Đến Z",cat:null,price:"59.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN12.jpeg"},
                {id:"KN13", name:"Khởi Nghiệp Từ Tiệm Nhỏ",cat:null,price:"85.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN13.jpeg"},
                {id:"KN14", name:"36 Lời Khuyên Dành Cho Người Khởi Nghiệp",cat:null,price:"159.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN14.jpeg"},
                {id:"KN15", name:"Câu Chuyện Khởi Nghiệp Từ Những Gã Khổng Lồ Công Nghệ",cat:null,price:"139.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN15.jpeg"},
                {id:"KN16", name:"Tự Tin Khởi Nghiệp",cat:null,price:"60.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/KhoiNghiep/KN16.jpeg"},

            ]},
            {id:"CK", name:"Chứng khoán", quantity:0, books:[
                {id:"CK1", name:"Chứng Khoán - Hãy Đầu Tư Như Một Nhà Nông",cat:null,price:"239.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK1.jpeg"},
                {id:"CK2", name:"The Little Book - Chiến Lược Lãi Kép Trong Đầu Tư Chứng Khoán",cat:null,price:"149.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK2.png"},
                {id:"CK3", name:"Phù Thủy Sàn Chứng Khoán",cat:null,price:"199.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK3.jpeg"},
                {id:"CK4", name:"Làm Chủ Thị Trường Chứng Khoán",cat:null,price:"149.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK4.jpeg"},
                {id:"CK5", name:"Chỉ Nam Đầu Tư Cổ Phiếu Và Chứng Khoán",cat:null,price:"98.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK5.jpeg"},
                {id:"CK6", name:"Đầu Tư Chứng Khoán Theo Chỉ Số",cat:null,price:"110.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK6.jpeg"},
                {id:"CK7", name:"Cẩm Nang Chứng Khoán Phái Sinh",cat:null,price:"269.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK7.jpeg"},
                {id:"CK8", name:"The Little Book - Quản Trị Rủi Ro Trong Đầu Tư Chứng Khoán",cat:null,price:"189.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK8.jpeg"},
                {id:"CK9", name:"20 Năm Lịch Sử Thị Trường Chứng Khoán Việt Nam - Bìa Cứng",cat:null,price:"269.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK9.jpeg"},
                {id:"CK10", name:"Đầu Tư Chứng Khoán Khôn Ngoan Khi Bạn Không Phải “Cá Mập”",cat:null,price:"158.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK10.jpeg"},
                {id:"CK11", name:"Hộp Sách (Gồm 3 Cuốn) Chinh Phục Chứng Khoán",cat:null,price:"499.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK11.jpeg"},
                {id:"CK12", name:"Chết Vì Chứng Khoán",cat:null,price:"125.000"+" VND",quantity:10,image:"assets/images/product/Sach/KinhTe/ChungKhoan/CK12.jpg"},

            ]},
        ]},
        {id:5, name:"Tâm lý/Kỹ năng sống", quantity:0, listcategory: [
            {id:"TL", name:"Tâm lý", quantity:0, books:[
                {id:"TL1", name:"Tâm Lý Học Xoa Dịu Những Tổn Thương Vì Chia Ly",cat:null,price:"119.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL1.jpeg"},
                {id:"TL2", name:"Tâm Lý Học Về Sự Lo Âu",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL2.jpeg"},
                {id:"TL3", name:"Tâm Lý Học Hiện Đại - Nhìn Thấu Tâm Can, Thay Đổi Tâm Trí",cat:null,price:"150.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL3.jpeg"},
                {id:"TL4", name:"Tâm Lý Học - Giải Mã Qua Góc Nhìn Điện Ảnh",cat:null,price:"145.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL4.jpeg"},
                {id:"TL5", name:"Tâm Lý Học Tích Cực",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL5.jpeg"},
                {id:"TL6", name:"Tâm Lý Học Hành Vi",cat:null,price:"98.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL6.png"},
                {id:"TL7", name:"Tâm Lý Học Trong Nháy Mắt - Tâm Lý Học Tổ Chức - Công Nghiệp (Tập 6)",cat:null,price:"198.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL7.jpeg"},
                {id:"TL8", name:"Tâm Lý Học Tội Phạm - Phác Họa Chân Dung Kẻ Phạm Tội",cat:null,price:"145.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL8.jpeg"},
                {id:"TL9", name:"Tâm Lý Học Thấu Hiểu Bản Thân",cat:null,price:"119.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL9.jpeg"},
                {id:"TL10", name:"Tâm Lý Học Về Sự Tự Tôn",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL10.jpeg"},
                {id:"TL11", name:"Tâm Lý Học Thuyết Phục",cat:null,price:"169.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL11.jpeg"},
                {id:"TL12", name:"Tâm Lý Học Về Rối Loạn Nhân Cách Tránh Né",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL12.jpeg"},
                {id:"TL13", name:"Tâm Lý Học Xã Hội - Đi Tìm Chất Gây Nghiện Trong Mỗi Con Người",cat:null,price:"139.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL13.jpeg"},
                {id:"TL14", name:"Tâm Lý Học Thói Quen - Quan Sát Có Chủ Đích",cat:null,price:"99.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL14.jpeg"},
                {id:"TL15", name:"Tâm Lý Học Nhận Thức",cat:null,price:"96.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL15.jpeg"},
                {id:"TL16", name:"Tâm Lý Học Tình Yêu - Tình Yêu Của Bạn Giống Như Bạn",cat:null,price:"129.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL16.jpeg"},
                {id:"TL17", name:"Tâm Lý Học Giải Mã Tình Yêu",cat:null,price:"119.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL17.jpeg"},
                {id:"TL18", name:"Tâm Lý Học Nhân Cách",cat:null,price:"189.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL18.png"},
                {id:"TL19", name:"Tâm Lý Học - Mở Khóa Não Bộ Bạn Trẻ",cat:null,price:"94.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL19.jpeg"},
                {id:"TL20", name:"Tâm Lý Học Trong Đời Sống",cat:null,price:"149.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/TamLy/TL20.png"},

            ]},
            {id:"K", name:"Kỹ năng sống", quantity:0, books:[
                {id:"K1", name:"Kỹ Năng Sống - Cách Để Trở Thành Người Bạn Tốt",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K1.jpeg"},
                {id:"K2", name:"Kỹ Năng Sống - Cách Để Trở Thành Con Ngoan",cat:null,price:"52.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K2.jpeg"},
                {id:"K3", name:"Kỹ Năng Sống - Em Học Cách Bảo Vệ Môi Trường",cat:null,price:"59.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K3.jpeg"},
                {id:"K4", name:"Kỹ Năng Sống - Em Học Cách Tự Lập",cat:null,price:"59.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K4.jpeg"},
                {id:"K5", name:"Kỹ Năng Sống - 101 Câu Chuyện Học Sinh Cần Đọc Giúp Các Em Tự Tin Và Lạc Quan Trong Cuộc Sống",cat:null,price:"48.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K5.jpeg"},
                {id:"K6", name:"Kỹ Năng Sống - 101 Câu Chuyện Học Sinh Cần Đọc Giúp Các Em Biết Mơ Ước Và Dám Thực Hiện",cat:null,price:"48.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K6.jpeg"},
                {id:"K7", name:"Kỹ Năng Sống Dành Cho Học Sinh - Biết Lựa Chọn",cat:null,price:"55.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K7.jpeg"},
                {id:"K8", name:"Sách Montessori - Rèn Kỹ Năng Sống Và Kỹ Năng Phối Hợp",cat:null,price:"140.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K8.jpeg"},
                {id:"K9", name:"Những Kỹ Năng Sống Dành Cho Tuổi Teen",cat:null,price:"76.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K9.jpeg"},
                {id:"K10", name:"100 Kỹ Năng Sinh Tồn",cat:null,price:"99.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K10.jpeg"},
                {id:"K11", name:"Những Kỹ Năng Dành Cho Cuộc Sống",cat:null,price:"78.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K11.jpeg"},
                {id:"K12", name:"Kỹ Năng Để Cân Bằng Giữa Công Việc Và Cuộc Sống",cat:null,price:"162.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K12.jpeg"},
                {id:"K13", name:"Đắc Nhân Tâm",cat:null,price:"76.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K13.jpeg"},
                {id:"K14", name:"Nhà Giả Kiêm",cat:null,price:"59.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K14.jpeg"},
                {id:"K15", name:"Rich Habits - Thói Quen Thành Công Của Những Triệu Phú Tự Thân",cat:null,price:"158.000"+" VND",quantity:10,image:"assets/images/product/Sach/TamLy_KyNangSong/KyNangSong/K15.jpeg"},
    
            ]},
            {id:"HG", name:"Hạt giống tâm hồn", quantity:0, books:[
    
            ]},
        ]},
        {id:6, name:"Lịch sử", quantity:0, listcategory: [
            {id:"VN", name:"Lịch sử Việt Nam", quantity:0, books:[
                {id:"VN1", name:"Lịch Sử Việt Nam Từ Nguồn Gốc Đến Thế Kỷ XIX",cat:null,price:"175.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu2.png"},
                {id:"VN2", name:"Lịch Sử Nhà Tù Côn Đảo 1862 - 1975",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu4.jpeg"},
                {id:"VN3", name:"Lịch Sử Nước Ta",cat:null,price:"14.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu7.jpeg"},
                {id:"VN4", name:"Lịch Sử Việt Nam Bằng Tranh - Con Rồng Cháu Tiên",cat:null,price:"135.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu8.jpeg"},
                {id:"VN5", name:"Lịch Sử Khai Phá Vùng Đất Nam Bộ",cat:null,price:"90.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu10.jpeg"},
                {id:"VN6", name:"Lịch Sử Hà Nội",cat:null,price:"159.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu11.jpeg"},
                {id:"VN7", name:"Việt Nam Sử Lược",cat:null,price:"131.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu13.jpeg"},
                {id:"VN8", name:"Lịch Sử Việt Nam Từ Nguồn Gốc Đến Giữa Thế Kỉ XX",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu14.jpeg"},
                {id:"VN9", name:"Đại Việt Sử Ký Toàn Thư Trọn Bộ",cat:null,price:"245.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu17.jpeg"},
                {id:"VN10", name:"Thượng Kinh Ký Sự",cat:null,price:"69.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu19.jpeg"},
                {id:"VN11", name:"Tỉnh Bến Tre Trong Lịch Sử Việt Nam - Từ Năm 1757 Đến 1945",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu21.jpg"},
                {id:"VN12", name:"Kể Chuyện Lịch Sử Việt Nam - Tập 1",cat:null,price:"70.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu22.jpg"},
                {id:"VN13", name:"Kể Chuyện Lịch Sử Việt Nam - Tập 2",cat:null,price:"70.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu23.jpg"},
                {id:"VN14", name:"Quan Hệ Bang Giao Và Những Sứ Thần Tiêu Biểu Trong Lịch Sử Việt Nam",cat:null,price:"52.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu24.jpg"},
                {id:"VN15", name:"Việt Nam Thế Kỷ XVII",cat:null,price:"269.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu25.jpg"},
                {id:"VN16", name:"Tìm Hiểu Xã Hội Việt Nam Thời Lý - Trần",cat:null,price:"279.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu26.jpg"},
                {id:"VN17", name:"Quan và Lại ở miền Bắc Việt Nam - một bộ máy hành chính nhiều thử thách (1820-1918)",cat:null,price:"122.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/VietNam/LSu27.jpg"},
    
            ]},
            {id:"TG", name:"Lịch sử Thế giới", quantity:0, books:[
                {id:"TG1", name:"Lịch Sử Thế Giới Qua Truyện Tranh",cat:null,price:"350.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu1.jpeg"},
                {id:"TG2", name:"Lịch Sử Vương Quốc Đàng Ngoài",cat:null,price:"169.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu3.jpeg"},
                {id:"TG3", name:"Lịch Sử Tư Tưởng Trung Quốc",cat:null,price:"399.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu5.jpeg"},
                {id:"TG4", name:"Lịch Sử Văn Minh Ấn Độ",cat:null,price:"177.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu6.jpeg"},
                {id:"TG5", name:"Lịch Sử Chiến Tranh",cat:null,price:"209.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu9.jpeg"},
                {id:"TG6", name:"Lược Sử Thế Giới",cat:null,price:"320.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu12.jpeg"},
                {id:"TG7", name:"Lịch Sử Thế Giới: Chân Dung Nhân Loại Theo Dòng Sự Kiện",cat:null,price:"590.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu15.jpeg"},
                {id:"TG8", name:"Lịch Sử Đô Thị Hiện Đại",cat:null,price:"169.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu16.jpeg"},
                {id:"TG9", name:"Lịch Sử Trung Đông 2.000 Năm Trở Lại Đây",cat:null,price:"210.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu18.jpeg"},
                {id:"TG10", name:"Lịch Sử Thế Giới Hiện Đại",cat:null,price:"119.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu20.jpeg"},
                {id:"TG11", name:"Đời Muối: Lịch Sử Thế Giới",cat:null,price:"235.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu28.jpg"},
                {id:"TG12", name:"Lịch Sử Do Thái",cat:null,price:"439.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu29.jpg"},
                {id:"TG13", name:"Lịch Sử Tư Tưởng Nhật Bản",cat:null,price:"169.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu30.jpg"},
                {id:"TG14", name:"Những Sự Kiện Lớn Trong Lịch Sử Hoa Kỳ",cat:null,price:"120.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu31.jpg"},
                {id:"TG15", name:"Phi Châu Thịnh Vượng - Lịch Sử 5.000 Năm Của Sự Giàu Có, Tham Vọng Và Nỗ Lực",cat:null,price:"489.000"+" VND",quantity:10,image:"assets/images/product/Sach/LichSu/TheGioi/LSu32.jpg"},
    
            ]},
        ]},
        {id:7, name:"Thiếu nhi", quantity:0, listcategory: [
            {id:"TTN", name:"Truyện thiếu nhi", quantity:0, books:[
                {id:"TN1", name:"Những Truyện Hay Viết Cho Thiếu Nhi - Thy Ngọc",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN1.jpeg"},
                {id:"TN2", name:"Thơ Hay Viết Cho Thiếu Nhi - Ai Dậy Sớm",cat:null,price:"75.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN2.jpeg"},
                {id:"TN3", name:"Tuyển Tập Văn Học Viết Cho Thiếu Nhi - Tô Hoài - 1: Truyện Đồng Thoại - Kịch",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN3.jpeg"},
                {id:"TN4", name:"Văn Học Thiếu Nhi - Dấu Ấn Thế Hệ Mới: Đừng Giẫm Lên Cỏ",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN4.jpeg"},
                {id:"TN5", name:"Tủ Sách Vàng - Tác Phẩm Chọn Lọc Dành Cho Thiếu Nhi: Nơi Xa",cat:null,price:"75.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN5.jpeg"},
                {id:"TN6", name:"Truyện Cổ Tích Việt Nam Dành Cho Thiếu Nhi - Sự Tích Trầu Cau",cat:null,price:"15.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN6.jpeg"},
                {id:"TN7", name:"Truyện Hay Thế Giới Cho Thiếu Nhi - Chim Lửa",cat:null,price:"45.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN7.jpeg"},
                {id:"TN8", name:"Tuyển Tập Truyện Hay Dành Cho Thiếu Nhi 1",cat:null,price:"48.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN8.png"},
                {id:"TN9", name:"Truyện Cổ Tích Việt Nam Dành Cho Thiếu Nhi - Bánh Chưng Bánh Giầy",cat:null,price:"10.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN9.jpeg"},
                {id:"TN10", name:"Tủ Sách Vàng - Tác Phẩm Chọn Lọc Dành Cho Thiếu Nhi: Miền Quê Thơ Ấu",cat:null,price:"35.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN10.jpeg"},
                {id:"TN11", name:"Tuyển Tập Văn Học Viết Cho Thiếu Nhi - Tô Hoài - 3 - Truyện Các Gương Anh Hùng Cách Mạng",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN11.jpeg"},
                {id:"TN12", name:"Tuyển Tập Truyện Hay Dành Cho Thiếu Nhi 2",cat:null,price:"48.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN12.jpeg"},
                {id:"TN13", name:"Truyện Cổ Tích Việt Nam Dành Cho Thiếu Nhi - Thánh Gióng",cat:null,price:"10.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN13.jpeg"},
                {id:"TN14", name:"Tủ Sách Vàng - Tác Phẩm Chọn Lọc Dành Cho Thiếu Nhi: Đảo Đá Kì Lạ",cat:null,price:"50.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN14.jpeg"},
                {id:"TN15", name:"Truyện Cổ Tích Việt Nam Dành Cho Thiếu Nhi - Cây Tre Trăm Đốt",cat:null,price:"10.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN15.jpeg"},
                {id:"TN16", name:"Những Tuyệt Phẩm Dành Cho Thiếu Nhi",cat:null,price:"200.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN16.jpeg"},
                {id:"TN17", name:"Rơm Rạ Lấm Lem - Truyện Dài Thiếu Nhi Độ Tuổi 6 Đến 15",cat:null,price:"75.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN17.jpeg"},
                {id:"TN18", name:"Truyện Tranh Ngụ Ngôn Dành Cho Thiếu Nhi - Chuột Nhà Và Chuột Đồng",cat:null,price:"29.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN18.jpeg"},
                {id:"TN19", name:"Văn Học Thiếu Nhi - Dấu Ấn Thế Hệ Mới: Trời Xanh Ngập Nắng",cat:null,price:"80.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN19.jpeg"},
                {id:"TN20", name:"Văn Học Thiếu Nhi - Những Truyện Kỳ Thú Về Cọp Chưa Ai Kể",cat:null,price:"70.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN20.jpeg"},
                {id:"TN21", name:"Phù Thủy Áo Vàng, Con Mèo Lười Và Thằng Bí Đỏ",cat:null,price:"60.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN21.jpeg"},
                {id:"TN22", name:"Nhấn Pê Đan Và… Tiến - Giải Thưởng Văn Học Thiếu Nhi Mĩ",cat:null,price:"90.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN22.jpeg"},
                {id:"TN23", name:"Combo 4 Cuốn: Bộ Tuyển Tập Truyện Hay Dành Cho Thiếu Nhi",cat:null,price:"192.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN23.jpeg"},
                {id:"TN24", name:"Truyện Kinh Thánh Dành Cho Thiếu Nhi",cat:null,price:"162.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/TruyenThieuNhi/TN24.jpeg"},
                
            ]},
            {id:"TM", name:"Tô màu", quantity:0, books:[
                {id:"TM1", name:"Tô Màu - Khám Phá Phong Cảnh Việt Nam",cat:null,price:"65.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM1.jpeg"},
                {id:"TM2", name:"Tô Màu Hoàng Tử: Hoàng Tử Chăn Lợn",cat:null,price:"15.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM2.jpeg"},
                {id:"TM3", name:"Tô Màu Superman (Tập 4)",cat:null,price:"12.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM3.jpeg"},
                {id:"TM4", name:"Tô Màu Công Chúa Xinh Đẹp - Tập 8",cat:null,price:"12.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM4.jpeg"},
                {id:"TM5", name:"Tô Màu Chúng Mình Tập Làm Họa Sĩ - 3-6 Tuổi - Các Loài Hoa",cat:null,price:"30.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM5.jpeg"},
                {id:"TM6", name:"Tô Màu Chúng Mình Tập Làm Họa Sĩ - 3-6 Tuổi - Động Vật",cat:null,price:"30.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM6.jpeg"},
                {id:"TM7", name:"Tô Màu Trang Phục Công Chúa (Tập 1)",cat:null,price:"12.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM7.jpeg"},
                {id:"TM8", name:"Bé Tập Tô Màu - Người Lính Cứu Hỏa Quyển",cat:null,price:"25.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM8.jpeg"},
                {id:"TM9", name:"Túi Tô Màu Công Chúa (Trọn Bộ 5 Cuốn)",cat:null,price:"70.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM9.jpeg"},
                {id:"TM10", name:"Sách tập tô 5000 hình",cat:null,price:"90.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM10.jpeg"},
                {id:"TM11", name:"Cổ Tích Tô Màu Công Chúa - Nàng Tiên Cá",cat:null,price:"16.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM11.jpeg"},
                {id:"TM12", name:"Cổ Tích Tô Màu Công Chúa - Cô Bé Bán Diêm",cat:null,price:"16.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM12.jpeg"},
                {id:"TM13", name:"Tô Màu Phương Tiện Giao Thông - Xe Thể Thao Siêu Tốc Độ - Speedy Sport Cars",cat:null,price:"20.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/ToMau/TM13.jpeg"},

            ]},
            {id:"LC", name:"Luyện chữ", quantity:0, books:[
                {id:"LC1", name:"Luyện Chữ Đẹp - Chữ Đứng Nét Thanh, Đậm",cat:null,price:"12.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC1.jpeg"},
                {id:"LC2", name:"Luyện Chữ Đẹp - Chữ Nghiêng Nét Thanh, Đậm",cat:null,price:"10.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC2.jpeg"},
                {id:"LC3", name:"Luyện Viết Tiếng Anh Trình Bày Trên Giấy Ô Li Dành Cho Học Sinh 4 - Tập 1",cat:null,price:"28.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC3.jpeg"},
                {id:"LC4", name:"Luyện Viết Tiếng Anh Trình Bày Trên Giấy Ô Li Dành Cho Học Sinh 5 - Tập 2",cat:null,price:"28.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC4.jpeg"},
                {id:"LC5", name:"Luyện Viết Chữ Đẹp Tiếng Anh - My Phonics Grade 2",cat:null,price:"32.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC5.jpeg"},
                {id:"LC6", name:"Luyện Viết Chữ Đẹp Tiếng Anh - My Phonics Grade 1",cat:null,price:"32.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC6.jpeg"},
                {id:"LC7", name:"Luyện Viết Chữ Đẹp Dùng Cho Học Sinh Tiểu Học Quyển 3 Tập 2",cat:null,price:"9.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC7.jpeg"},
                {id:"LC8", name:"Luyện Viết Chữ Đẹp Dùng Cho Học Sinh Tiểu Học Quyển 4 Tập 1",cat:null,price:"9.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC8.jpeg"},
                {id:"LC9", name:"Luyện Viết Tiếng Việt Cho Học Sinh Tiểu Học - Vui Cùng Chữ Viết Lớp 3 - Tập 1",cat:null,price:"16.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC9.jpeg"},
                {id:"LC10", name:"Luyện Viết Tiếng Việt Cho Học Sinh Tiểu Học - Học Viết Điều Hay Lớp 5 - Tập 1",cat:null,price:"16.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC10.jpeg"},
                {id:"LC11", name:"Luyện Viết Tiếng Việt Cho Học Sinh Tiểu Học - Học Viết Điều Hay Lớp 5 - Tập 2",cat:null,price:"16.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC11.jpeg"},
                {id:"LC12", name:"Luyện Viết Tiếng Việt Cho Học Sinh Tiểu Học - Học Viết Điều Hay Lớp 4 - Tập 2",cat:null,price:"16.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC12.jpeg"},
                {id:"LC13", name:"Luyện Viết Chữ Đẹp Lớp 1 - Tập 2",cat:null,price:"15.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC13.jpeg"},
                {id:"LC14", name:"Luyện Viết Theo Mẫu Chữ Nhỏ - Chữ Thường, Chữ Hoa (Dành Cho Học Sinh Tiểu Học)",cat:null,price:"36.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC14.jpeg"},
                {id:"LC15", name:"Luyện Nét Chữ Rèn Nết Người - Vở Ô Li Có Mẫu Chữ - Lớp 1 - Quyển 1",cat:null,price:"20.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC15.jpeg"},
                {id:"LC16", name:"Luyện Nét Chữ Rèn Nết Người - Vở Ô Li Có Mẫu Chữ - Lớp 2 - Quyển 2",cat:null,price:"20.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC16.png"},
                {id:"LC17", name:"Luyện Nét Chữ Rèn Nết Người - Vở Ô Li Có Mẫu Chữ - Lớp 2 - Quyển 1",cat:null,price:"20.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC17.jpeg"},
                {id:"LC18", name:"Luyện Viết Chữ Đẹp Lớp 3 - Tập 2",cat:null,price:"14.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC18.jpeg"},
                {id:"LC19", name:"Luyện Viết Chữ Đẹp Lớp 3 - Tập 1",cat:null,price:"14.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC19.jpeg"},
                {id:"LC20", name:"Luyện Viết Nét Cơ Bản Và Chữ Số - Vở Ô Li Có Chữ Mẫu - Bé Chuẩn Bị Vào Lớp 1",cat:null,price:"37.000"+" VND",quantity:10,image:"assets/images/product/Sach/ThieuNhi/LuyenChu/LC20.jpeg"},
    
            ]},
        ]}
    ];
    localStorage.setItem('category', JSON.stringify(category));
    updateQuantity(category);
}
function createBestSeller() {
    var bestseller = [];
    var category = JSON.parse(localStorage.getItem('category'));
    bestseller.push(category[1].listcategory[1].books[6]); // Văn học.Truyện dài.Sách 6
    bestseller.push(category[0].listcategory[1].books[0]);
    bestseller.push(category[0].listcategory[2].books[0]);
    bestseller.push(category[1].listcategory[0].books[0]);
    bestseller.push(category[1].listcategory[1].books[0]);
    bestseller.push(category[1].listcategory[2].books[0]);
    bestseller.push(category[1].listcategory[2].books[2]);
    bestseller.push(category[3].listcategory[0].books[0]);
    bestseller.push(category[3].listcategory[1].books[0]);
    bestseller.push(category[3].listcategory[3].books[0]);
    bestseller.push(category[3].listcategory[3].books[5]);
    bestseller.push(category[3].listcategory[4].books[0]);
    bestseller.push(category[4].listcategory[0].books[0]);
    bestseller.push(category[4].listcategory[1].books[0]);
    bestseller.push(category[4].listcategory[1].books[1]);
    bestseller.push(category[5].listcategory[0].books[0]);
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
function getBestseller(){
    var bestseller = JSON.parse(localStorage.getItem('bestseller'));
    books=bestseller;
    return bestseller;
}
function renderBestseller(bestseller) {
    document.getElementById("headline").innerHTML = '<h3>Sản phẩm bán chạy</h3>';
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
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    document.getElementById("wrapper").style.display = "none";
    closeFilterAndSort();
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
let productSelected;
function getProductSelected(){
    return productSelected;
}
function showdetailBestseller(products) {
    let listproduct = document.querySelectorAll("#products li");
    for (let i = 0; i < listproduct.length; i++) {
        listproduct[i].addEventListener('click', () => {
            productSelected = products[i];
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
                html += '<input type="number" min="0" name="" id="quantity" value="0" onchange="checkQuatity(' + products[i].quantity + ')">';
                html += '<input type="button" value="+" id="plus" onclick="plus(' + products[i].quantity + ')">';
    
            } else {
                html += '<li><h4>Hết hàng</h4></li>';
                html += '<li>';
                html += 'Số lượng:';
                html += '<input style="margin-left: 30px;" disabled type="button" name="" id="sub" value="-" onclick="sub(' + products[i].quantity + ')">';
                html += '<input type="number" min="0" name="" id="quantity" value="0" disabled>';
                html += '<input disabled type="button" value="+" id="plus" onclick="plus(' + products[i].quantity + ')">';
    
            }
            html += '</li>';
            html += '<li id="addtocart" title="Thêm vào giỏ hàng" onclick="addToCartPro(getProductSelected())">';
            html += '<div><i class="fas fa-solid fa-cart-shopping" ></i></div>';
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
let filteredBooks=[];
let initialBooks=[];
function getCurrentPage(currenPage,products) {
    start = (currenPage - 1) * perPage;
    end = currenPage * perPage;
    if (end > products.length)
        end = products.length;
}
function loadPage() {
    var str = window.location.href;
    if (str.includes("&") || str.includes("?")) {
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
            if (url[0] == "tieuthuyet" && url[1] == "ngontinh") {
                document.getElementById("headline").innerHTML = "<h3>Tiểu thuyết Ngôn tình</h3>";
                books = products[2].listcategory[0].books;
                currenPage = 1;
                totalpage = Math.ceil(books.length / perPage)
                getCurrentPage(currenPage, books);
                renderProduct(books);
                renderListPage();
                changePage(books);
            }
            if (url[0] == "tieuthuyet" && url[1] == "giatuong") {
                document.getElementById("headline").innerHTML = "<h3>Tiểu Thuyết Giả tưởng</h3>";
                books = products[2].listcategory[1].books;
                currenPage = 1;
                totalpage = Math.ceil(books.length / perPage)
                getCurrentPage(currenPage, books);
                renderProduct(books);
                renderListPage();
                changePage(books);
            }
            if (url[0] == "tieuthuyet" && url[1] == "lichsu") {
                document.getElementById("headline").innerHTML = "<h3>Tiểu thuyết lịch sử</h3>";
                books = products[2].listcategory[2].books;
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
            if (url[0] == "lichsu" && url[1] == "thegioi") {
                document.getElementById("headline").innerHTML = "<h3>Lịch sử Thế giới</h3>";
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
        } else {
            books=[];
            if (url[0] == "giaoduc") {
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
            if (url[0] == "vanhoc") {
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
            if (url[0] == "tieuthuyet") {
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
            if (url[0] == "kinhte") {
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
            if (url[0] == "tamly/kynangsong") {
                document.getElementById("headline").innerHTML = "<h3>Sách Tâm lý/Kỹ năng sống</h3>";
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
            if (url[0] == "lichsu") {
                document.getElementById("headline").innerHTML = "<h3>Sách Lịch sử</h3>";
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
            if (url[0] == "thieunhi") {
                document.getElementById("headline").innerHTML = "<h3>Sách Thiếu nhi</h3>";
                for (var j = 0; j < products[6].listcategory.length; j++) {
                    for (var h = 0; h < products[6].listcategory[j].books.length; h++) {
                        books.push(products[6].listcategory[j].books[h]);
                    }
                }
                currenPage = 1;
                totalpage = Math.ceil(books.length / perPage)
                getCurrentPage(currenPage, books);
                renderProduct(books);
                renderListPage();
                changePage(books);
            }
            if (url[0]=="shoppingcart"){
                var html='';
                var user= JSON.parse(localStorage.getItem('userActive'));
                // check user active
                if (user == null){
                    alert("Vui lòng đăng nhập!");
                    location.href="/index.html";
                    return false;
                }
                var products=JSON.parse(localStorage.getItem('cart'));
                html += '<div class="headline" id="headline"><h3 style="background-color: rgb(242, 120, 38); color: black;">Giỏ Hàng</h3></div>';
                if (products.length>0){
                    html += '<div id="listProductsBuy" >';
                    for (var i=0; i<products.length;i++){
                        html += '<ul class="productsBuy">';
                        html += '<li>' + (i+1) + '</li>';
                        html += '<li class="img-Pro">';
                        html += '<img src="' + products[i].image +'" alt="">';
                        html += '</li>';
                        html += '<li>' + products[i].name + '</li>';
                        html += '<li>Số lượng: ' + products[i].quantity + '</li>';
                        html += '<li>' + products[i].price + '</li>';
                        html += '<li><i id = "deleteitemsinCart" class="fas fa-regular fa-trash-can"></i></li>';
                        html += '</ul>';
                    }
                    html += '<div id="buy">';
                    html += '<ul>';
                    html += '<li>Tổng thanh toán <h3 style="color: black;">' + total() + '</h3></li>';
                    html += '<li><input type="button" value="Mua hàng (' + products.length + ')" onclick="addOrder()"></li>';
                    html += '</ul>';
                    html += '</div>';
                    document.getElementById("content").innerHTML=html;
                    deteleFromCartPro();
                    return true;
                }
                html += '<h1>Bạn chưa chọn sản phẩm nào</h1>';
                document.getElementById("content").innerHTML=html;
                return true;
            }
        }

    }
    
}
function renderProduct(products) {
    var html = '';
    console.log(start,end);
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
            getCurrentPage(currenPage, books);
            renderProduct(books);
        });
    }
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
function renderListPage() {
    var html = '';
    html += '<li id="btprev" class="button-prev-next"><i class="fas fa-chevron-circle-left" onclick="prevButton()"></i></li>';
    html += '<div class="number-page" id="number-page">'
    html += '<li id="active"><b>' + 1 + '</b></li>';
    if (totalpage <=1){
        html += '</div>';
        html += '<li id="btnext" class="button-prev-next"><i class="fas fa-chevron-circle-right" onclick="nextButton()"></i></li>'
    }else{
        for (var i = 2; i <= totalpage; i++) {
            html += '<li><b>' + i + '</b></li>';
        }
        html += '</div>';
        html += '<li id="btnext" class="button-prev-next-active"><i class="fas fa-chevron-circle-right" onclick="nextButton()"></i></li>'
    }
    document.getElementById("page").innerHTML = html;
}
function nextButton() {
    currenPage++;
    if (currenPage > totalpage)
        currenPage = totalpage
    changeButton();
    getCurrentPage(currenPage, books);
    renderProduct(books);
}
function prevButton() {
    currenPage--;
    if (currenPage < 1)
        currenPage = 1
    changeButton();
    getCurrentPage(currenPage, books);
    renderProduct(books);
}
function showDetail(products) {
    let listproduct = document.querySelectorAll("#products li");
    for (let i = 0; i < listproduct.length; i++) {
        listproduct[i].addEventListener('click', () => {
            getCurrentPage(currenPage, products);
            productSelected=products[i + start];
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
                html += '<input type="number" min="0" name="" id="quantity" value="0" onchange="checkQuatity(' + products[i + start].quantity + ')">';
                html += '<input type="button" value="+" id="plus" onclick="plus(' + products[i + start].quantity + ')">';
    
            } else {
                html += '<li><h4>Hết hàng</h4></li>';
                html += '<li>';
                html += 'Số lượng:';
                html += '<input style="margin-left: 30px;" disabled type="button" name="" id="sub" value="-" onclick="sub(' + products[i + start].quantity + ')">';
                html += '<input type="number" min="0" name="" id="quantity" value="0" disabled>';
                html += '<input disabled type="button" value="+" id="plus" onclick="plus(' + products[i + start].quantity + ')">';
    
            }
            html += '</li>';
            html += '<li id="addtocart" title="Thêm vào giỏ hàng" onclick="addToCartPro(getProductSelected())">';
            html += '<div><i class="fas fa-solid fa-cart-shopping" ></i></div>';
            html += '</li>';
            html += '</ul>';
            html += '</div>';
            document.getElementById("detail").innerHTML = html;
            document.getElementById("wrapper").style.display = "block";
            document.getElementById("container").style.display = "block";
        })
    }
}
function createCart(){
    var cart=[];
    if (localStorage.getItem('cart') == null){
        localStorage.setItem('cart', JSON.stringify(cart));
    } 
}
function addToCartPro(product){
    var user= JSON.parse(localStorage.getItem('userActive'));
    var cart= JSON.parse(localStorage.getItem('cart'));
    var quantity = document.getElementById("quantity").value;
    // check user active
    if (user == null){
        alert("Vui lòng đăng nhập!");
        backFromDiv();
        return false;
    }
    if (quantity==0){
        alert("Số lượng sản phẩm không hợp lệ!");
        return false;
    }
    for (var i=0; i<cart.length; i++){
        if (cart[i].id == product.id){
            cart[i].quantity = cart[i].quantity + parseInt(document.getElementById("quantity").value);
            localStorage.setItem('cart', JSON.stringify(cart));
            backFromDiv();
            return true;
        }
    }
    cart.push(product);
    cart[cart.length-1].quantity = parseInt(document.getElementById("quantity").value);
    localStorage.setItem('cart', JSON.stringify(cart));
    backFromDiv();
    return true;
}
function deteleFromCartPro(){
    var cart = JSON.parse(localStorage.getItem('cart'));
    var itemsInCart = document.querySelectorAll("#deleteitemsinCart");
    for (var i=0; i<itemsInCart.length; i++){
        itemsInCart[i].addEventListener("click",()=>{
            for (var j=i+1; j<cart.length; j++){
                cart[j-1] = cart[j];
            }
            cart[length-1] = null;
            cart.length = cart.length - 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadPage();
        })
    }
}
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
function total(){
    var products= JSON.parse(localStorage.getItem('cart'));
    var price=0;
    for (var i=0; i<products.length; i++){
        var cost=products[i].price;
        cost=cost.split('VND');
        cost=cost[0].replaceAll(".","");
        price += parseInt(cost)*products[i].quantity;
    }
    return stringToPrice(price.toString());
}
function createOrder (){
    let orderNoteList;
    if (JSON.parse(localStorage.getItem('orderNoteList')) == null){
        orderNoteList=[];
    localStorage.setItem('orderNoteList', JSON.stringify(orderNoteList));
    }
}
function updateQuantityItems(){
    var cart= JSON.parse(localStorage.getItem('cart'));
    var category= JSON.parse(localStorage.getItem('category'));
    for (var h=0; h<cart.length; h++){
        for (var i = 0; i < category.length; i++) {
            for (var j = 0; j < category[i].listcategory.length; j++) {
                for (var k = 0; k < category[i].listcategory[j].books.length; k++) {
                    if (cart[h].id == category[i].listcategory[j].books[k].id) {
                        console.log(category[i].listcategory[j].books[k]);
                        category[i].listcategory[j].books[k].quantity = category[i].listcategory[j].books[k].quantity - cart[h].quantity;
                    }
                }
            }
        }  
    }
    localStorage.setItem('category', JSON.stringify(category));
}
function addOrder(){
    var userActive= JSON.parse(localStorage.getItem('userActive'));
    var cart= JSON.parse(localStorage.getItem('cart'));
    var orderNoteList= JSON.parse(localStorage.getItem('orderNoteList'));
    let orderNote = {
        orderID: orderNoteList.length+1,
        userID: userActive.id,
        customerName: userActive.name,
        date: new Date().toJSON().slice(0, 10),
        buyItems: cart,
        status: "Chưa xử lý",
        totalPrice: total(),
    }
    console.log(orderNote);
    orderNoteList.push(orderNote);
    localStorage.setItem('orderNoteList', JSON.stringify(orderNoteList));
    updateQuantityItems();
    cart=[];
    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Cảm ơn bạn đã mua hàng!!");
    location.href="/";
}