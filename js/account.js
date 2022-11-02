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