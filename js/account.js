function createAdmin() {
    var userArray = [];
    if (localStorage.getItem('user') == null) {
        var user = {
            username: "admin",
            email:    "smartbook@store.com",
            password: "admin",
            usertype: "admin"
        };
        userArray.push(user);
        console.log(userArray);
        localStorage.setItem('user', JSON.stringify(userArray));
    }
}
function createNewUser() {
    var userArray = JSON.parse(localStorage.getItem('user'));
    user = {
        username: document.getElementById('username').value,
        email:    document.getElementById('email').value,
        password: document.getElementById('password').value,
        usertype: "KH"
    };
    console.log(user.username);
    console.log("Type user: ");
    console.log(typeof(user));
    userArray.push(user);
    localStorage.setItem('user', JSON.stringify(userArray));
}
function checkSignUp() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username) {
            alert("'" + username + "' has been used.\nYou can use '" + username + "123' or '" + username + "xyz'.");
            document.getElementById('username').focus();
            return false;
        } else if (email == userArray[i].email) {
            alert("Your email has been used");
            document.getElementById('email').focus();
            return false;
        }
    }
    return true;
}
function signup() {
    var username = document.getElementById('username');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var confirm = document.getElementById('confirm');
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
    createNewUser();
    alert("Sign up successfully.");
    return true;
}
function checkLogin() {
    var username = document.getElementById('usernamelogin').value;
    var password = document.getElementById('passwordlogin').value;
    var userArray = JSON.parse(localStorage.getItem('user'));
    for (var i = 0; i < userArray.length; i++) {
        if (username == userArray[i].username && password == userArray[i].password) {
            return true;
        }
    }
    return false
}
function login() {
    var username = document.getElementById('usernamelogin');
    var password = document.getElementById('passwordlogin');
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