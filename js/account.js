function createAdmin() {
    var userArray = [];
    if (localStorage.getItem('user') == null) {
        var user = {
            username: "admin",
            email:    "smartbookStore@gmail.com",
            password: "admin",
            status:   "enabled",
            type:     "Admin"
        };
        userArray.push(user);
        localStorage.setItem('user', JSON.stringify(userArray));
    }
}
function createNewUser(username, email, password) {
    var userArray = JSON.parse(localStorage.getItem('user'));
    var user = {
        username: username.value,
        email:    email.value,
        password: password.value,
        status:   "enabled",
        type:     "Customer"
    };
    userArray.push(user);
    localStorage.setItem('user', JSON.stringify(userArray));
}
function checkSignUp() {
    var username = document.getElementById('username-signup').value;
    var email = document.getElementById('email-signup').value;
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username) {
            alert("'" + username + "' has been used.\nYou can use '" + username + "123' or '" + username + "xyz'.");
            document.getElementById('username-signup').focus();
            return false;
        } else if (email == userArray[i].email) {
            alert("Your email has been used");
            document.getElementById('email-signup').focus();
            return false;
        }
    }
    return true;
}
function signup() {
    var username = document.getElementById('username-signup');
    var email = document.getElementById('email-signup');
    var password = document.getElementById('password-signup');
    var confirm = document.getElementById('confirm-signup');
    if (username.value == "") {
        alert("Please enter your username.");
        username.focus();
        return false;
    } else if (email.value == "") {
        alert("Please enter your email.");
        email.focus();
        return false;
    } else if (password.value == "") {
        alert("Please enter your password.");
        password.focus();
        return false;
    } else if (confirm.value == "") {
        alert("Please confirm your password.");
        confirm.focus();
        return false;
    } else if (password.value != confirm.value) {
        alert("Confirmation password does not match!");
        password.focus();
        return false;
    } else if (!checkSignUp()) {
        return false;
    }
    createNewUser(username, email, password);
    alert("Sign up successfully.");
    return true;
}
function checkLogin() {
    var username = document.getElementById('username-login').value;
    var password = document.getElementById('password-login').value;
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username && password == userArray[i].password) {
            return true;
        }
    }
    return false
}
function login() {
    var username = document.getElementById('username-login');
    var password = document.getElementById('password-login');
    if (username.value == "") {
        alert("Please enter your username.");
        username.focus();
        return false;
    } else if (password.value == "") {
        alert("Please enter your password.");
        password.focus();
        return false;
    } else if (!checkLogin()) {
        alert("Username or password invalid.");
        username.focus();
        return false;
    }
    alert("Log in successfully.");
    return true;
}
function togglePass() {
    var x = document.getElementById("password-login");
    var y = document.getElementById("eyes");
    if (x.type === "password") {
        x.type = "text";
        y.className = "fas fa-sharp fa-solid fa-eye";
    } else {
        x.type = "password";
        y.className = "fas fa-solid fa-eye-slash";
    }
}
const products=[
    {id:1, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:2, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:3, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:4, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:5, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:6, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:7, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:8, name:"Chết vì chứng khoán",cat:"Sách Kinh Tế",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-tst.jpg"},
    {id:9, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-2.jpg"},
    {id:10, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-2.jpg"},
    {id:11, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-2.jpg"},
    {id:12, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-2.jpg"},
    {id:13, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-2.jpg"},
    {id:14, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-2.jpg"},
    {id:15, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-2.jpg"},
    {id:16, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-2.jpg"},
    {id:17, name:"Tôi thấy hoa vàng trên cỏ xanh",cat:"Truyện dài",price:"200.000"+" VND",quatity:"35",image:"assets/images/product/product-2.jpg"}

];
localStorage.setItem('product', JSON.stringify(products));
var perPage=8;
var start=0;
var end=perPage;
const totalpage=Math.ceil(products.length/perPage) ;
function renderProduct(currenPage){
    var products = JSON.parse(localStorage.getItem('product'));
    var html='';
    for(var i=start;i<end;i++){
        html+='<li>';
        html+='<div class="product-item">';
        html+='<div class="product-top">';
        html+='<a href="" class="product-thumb">';
        html+='<img src="'+products[i].image+'" alt="">';
        html+='</a>';
        html+='<a href="" class="buynow">Mua Ngay</a>';
        html+='</div>';
        html+='<div class="product-info">';
        html+='<a href="" class="product-cat">'+products[i].cat+'</a>';
        html+='<a href="" class="product-name">'+products[i].name+'</a>';
        html+='<div class="product-price">'+products[i].price+'</div>'
        html+='</div>';
        html+='</div>';
        html+='</li>'
    }
    console.log(totalpage);
    document.getElementById("products").innerHTML=html;
}
function buttonnext(currenPage){
    currenPage++;
    if(currenPage>totalpage){
        currenPage=totalpage;
    }
    start=(currenPage-1)*perPage;
    end=currenPage*perPage;
    console.log(currenPage);
    console.log(start);
    console.log(end);
    renderProduct(currenPage);
}
function buttonprev(currenPage){
    currenPage--;
    if(currenPage>totalpage){
        currenPage=totalpage;
    }
    start=(currenPage-1)*perPage;
    end=currenPage*perPage;
    // console.log(currenPage);
    // console.log(start);
    // console.log(end);
    renderProduct(currenPage);
}
/*
id
type
name
price
image
*/