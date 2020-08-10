function showHome() {
    $("#mainjs-login").hide()
    $("#mainjs-main").show()
}
function showLogin() {
    $("#mainjs-login").show()
    $("#mainjs-main").hide()
}

function login() {
    $.ajax({
        method:"POST",
        url:"http://localhost:3000/login",
        data:{
            email:$("#login-form-email").val(),
            password:$("#login-form-password").val()
        }
    })
    .done(result=>{
        localStorage.setItem("access_token",result.access_token)
        showHome()
        $("#login-form-email").val(""),
        $("#login-form-password").val("")
    })
    .fail(_=>console.log("reached error login"))
}

function logout() {
    localStorage.removeItem("access_token")
}

function post() {
    
}
function get() {
    $.ajax({
        method:"GET",
        url:"http://localhost:3000/foods",
        headers:{
            access_token
        }
    })
    .then(result=>{
        
    })
}
function del(id) {

}

$(document).ready(()=>{
    if (localStorage.getItem("access_token")) {
        showHome()
    } else {
        showLogin()
    }
    //login button
    $("#submit-login").on("click",(event)=>{
        event.preventDefault()
        login()
    })
    //logout button
    $("#submit-logout").on("click",(event)=>{
        event.preventDefault()
        logout()
        showLogin()
    })
})