function createAdmin() {
    var userArray = [];
    if (localStorage.getItem('user') == null) {
        var user = {
            name:     "Admin",
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
function createNewUser(name,username, email, password) {
    var userArray = JSON.parse(localStorage.getItem('user'));
    var user = {
        name:     name.value,
        username: username.value,
        email:    email.value,
        password: password.value,
        status:   "enabled",
        type:     "Customer"
    };
    userArray.push(user);
    localStorage.setItem('user', JSON.stringify(userArray));
}
function hasWhiteSpace(s) {
    return s.indexOf(' ') >= 0;
}
function checkSignUp() {
    var username = document.getElementById('username-signup').value;
    var email = document.getElementById('email-signup').value;
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username) {
            alert("'" + username + "' đã được sử dụng.");
            document.getElementById('username-signup').focus();
            return false;
        } else if (email == userArray[i].email) {
            alert("email đã được sử dụng");
            document.getElementById('email-signup').focus();
            return false;
        }
    }
    return true;
}
function signup() {
    var name = document.getElementById('name-signup');
    var username = document.getElementById('username-signup');
    var email = document.getElementById('email-signup');
    var password = document.getElementById('password-signup');
    var confirm = document.getElementById('confirm-signup');
    if (name.value == "") {
        alert("Vui lòng nhập tên!");
        name.focus();
        return false;
    } else if (username.value == "") {
        alert("Vui lòng nhập username!");
        username.focus();
        return false;
    } else if (hasWhiteSpace(username.value)) {
        alert("username không được chứa khoảng trắng!");
        username.focus();
        return false;
    } else if (email.value == "") {
        alert("Vui lòng nhập email!");
        email.focus();
        return false;
    } else if (hasWhiteSpace(email.value)) {
        alert("email không được chứa khoảng trắng!");
        username.focus();
        return false;
    } else if (password.value == "") {
        alert("Vui lòng nhập mật khẩu!");
        password.focus();
        return false;
    } else if (confirm.value == "") {
        alert("Vui lòng xác nhận lại mật khẩu!");
        confirm.focus();
        return false;
    } else if (password.value != confirm.value) {
        alert("Mật khẩu xác nhận không trùng khớp!");
        password.focus();
        return false;
    } else if (!checkSignUp()) {
        return false;
    }
    createNewUser(name, username, email, password);
    alert("Đăng ký thành công!");
    return true;
}
function checkLogin() {
    var username = document.getElementById('username-login').value;
    var password = document.getElementById('password-login').value;
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username && password == userArray[i].password) {
            var user = userArray[i];
            localStorage.setItem('userActive', JSON.stringify(user));
            return true;
        }
    }
    return false
}
function login() {
    var username = document.getElementById('username-login');
    var password = document.getElementById('password-login');
    if (username.value == "") {
        alert("Vui lòng nhập username!");
        username.focus();
        return false;
    } else if (hasWhiteSpace(username.value)) {
        alert("username không được chứa khoảng trắng!");
        username.focus();
        return false;
    } else if (password.value == "") {
        alert("Vui lòng nhập mật khẩu!");
        password.focus();
        return false;
    } else if (!checkLogin()) {
        alert("username hoặc mật khẩu không hợp lệ!");
        username.focus();
        return false;
    }
    alert("Đăng nhập thành công.");
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
function logout() {
    var user = JSON.parse(localStorage.getItem('userActive'));
    user = null;
    localStorage.setItem('userActive', JSON.stringify(user));
    location.reload();
}
