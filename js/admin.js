let currenPage;
let perPage = 10;
let start;
let end;
let totalpage;
window.onload=function(){
    var str= window.location.href;
    var url=str.split('?');
    console.log(url);
    if(url[1]=="dangxuat"){
        var user = JSON.parse(localStorage.getItem('userActive'));
        user=null;
        localStorage.setItem('userActive', JSON.stringify(user));
        location.href="index.html";
    }
    if(url[1]=="sanpham"){
        var html='';
        html+='<div class="tital">';
        html+='<h1>Danh sách sản phẩm</h3>';
        html+='</div>';
        html+='<table id="productsList">';
        html+='</table>';
        document.getElementById("content").innerHTML=html;
        var category=JSON.parse(localStorage.getItem('category'));
        var products=[];
        for (var i=0; i<category.length; i++){
            for (var j=0; j<category[i].listcategory.length; j++){
                for (var h=0; h<category[i].listcategory[j].books.length; h++){
                    products.push(category[i].listcategory[j].books[h]);
                }
            }
        }
        currenPage=1;
        totalpage=Math.ceil(products.length / perPage);
        getCurrenPage(currenPage,products);
        showitemsList(products);
        renderListPage();
        changePage(products);
    }
    if(url[1]=="hoadon"){
        var html='';
        html+='<div class="tital">';
        html+='<h1>Danh sách hoá đơn</h3>';
        html+='</div>';
        html+='<table id="productsList">';
        html+='</table>';
        document.getElementById("content").innerHTML=html;
    }
    if(url[1]=="khachhang"){
        var html='';
        html+='<div class="tital">';
        html+='<h1>Danh sách khách hàng</h3>';
        html+='</div>';
        html+='<table id="usersList">';
        html+='</table>';
        document.getElementById("content").innerHTML=html;
        currenPage=1;
        var users=[];
        var user=JSON.parse(localStorage.getItem('user'));
        for(var i=0;i<user.length;i++){
            if(user[i].type=="Customer"){
                users.push(user[i]);
            }
        }
        totalpage=Math.ceil(users.length / perPage);
        getCurrenPage(currenPage,users);
        showusers(users);
        renderListPage();
        changePage(users);
        showusers()
    }
    if(url[1]=="quanlithongtin"){
        var html='';
        html+='<div class="tital">';
        html+='<h1>Quản lí thông tin</h3>';
        html+='</div>';
        html+='<table id="productsList">';
        html+='</table>';
        document.getElementById("content").innerHTML=html;
    }

}
function getCurrenPage(currenPage,products) {
    start = (currenPage - 1) * perPage;
    end = currenPage * perPage;
    if (end > products.length)
        end = products.length;
}
function showitemsList(products){
    var tr='<tr class="titalList"><th class="id">ID</th><th class="image">Ảnh</th><th class="name">TÊN SẢN PHẨM</th><th class="type">THỂ LOẠI</th><th class="cost">GIÁ</th><th class="edit"><i class="fa-solid fa-folder-plus" title="Thêm sản phẩm" onclick="showaddproducts()"></i></th></tr>';
    for(var i=start;i<end;i++){
        tr+='<tr class="detailList"><td class="id">'+products[i].id+'</td><td class="image"><img src="'+products[i].image+'" alt=""></th><td class="name">'+products[i].name+'</td><td class="type">'+products[i].cat+'</td><td class="cost">'+products[i].price+'</td><td class="edit"><button class="delete" onclick="deleteItem">Xoá</button><br><button class="delete" onclick="editItem">Sửa</button></td></tr>'

    }
    document.getElementById("productsList").innerHTML=tr;
}
function showusers(users){
    var tr='<tr class="titalList"><th class="id">ID</th><th class="name">TÊN KHÁCH HÀNG</th><th class="email">EMAIL</th><th class="status">TRẠNG THÁI</th><th class="edit"></th></tr>';
    for(var i=start;i<end;i++){
        tr+='<tr class="detailList"><td class="id">'+users[i].id+'</td><td class="name">'+users[i].name+'</td><td class="email">'+users[i].email+'</td><td class="status">'+users[i].status+'</td><td class="edit"><button class="delete" onclick="deleteItem">Xoá</button><br><button class="delete" onclick="editItem">Sửa</button></td></tr>'

    }
    document.getElementById("usersList").innerHTML=tr;
}
function showaddproducts(){
    document.getElementById("container").style.display="block";
    document.getElementById("addpro").style.display="block";
}
function renderListPage() {
    var html = '';
    html += '<li id="btprev" class="button-prev-next"><i class="fas fa-chevron-circle-left" onclick="prevButton()"></i></li>';
    html += '<div class="number-page" id="number-page">'
    html += '<li id="active"><b>' + 1 + '</b></li>';
    for (var i = 2; i <= totalpage; i++){
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
    getCurrenPage(currenPage,books);
    showitemsList(books);
}
function prevButton() {
    currenPage--;
    if (currenPage < 1)
        currenPage = 1
    changeButton();
    getCurrenPage(currenPage,books);
    showitemsList(books);
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
function changePage(products) {
    const listPage = document.querySelectorAll(".number-page li");
    console.log(listPage);
    for (let i = 0; i < listPage.length; i++) {
        listPage[i].addEventListener('click',() => {
            var value = i + 1;
            console.log(value);
            currenPage = value;
            changeButton();
            getCurrenPage(currenPage,products);
            showitemsList(products);
        });
    }
}
function backFromDiv() {
    document.getElementById("container").style.display = "none";
    document.getElementById("addpro").style.display = "none";
}
function previewImg(){
    var img=document.getElementById("file-inp").files;
    if (img.length>0){
        var fileReader = new FileReader();
        fileReader.onload=function(event){
            document.getElementById("preview").setAttribute("src",event.target.result);
        };
        fileReader.readAsDataURL(img[0]);
    }
    document.getElementById("file").style.display="none";

}