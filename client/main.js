function showHome() {
    $("#mainjs-login").hide()
    $("#mainjs-main").show()
    get()
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
    $("#form-add-text").val("")
    $("#form-add-price").val("")
    $("#form-add-ingredients").val("")
    $("#form-add-tag").val("")
}

function post() {
    if(
        $("#form-add-text").val()!=="" &&
        $("#form-add-ingredients").val()!==""
    ){
    $.ajax({
        method:"POST",
        url:"http://localhost:3000/foods",
        data:{
            title:$("#form-add-text").val(),
            price:!$("#form-add-price").val()?0:$("#form-add-price").val(),
            ingredients:$("#form-add-ingredients").val(),
            tag:$("#form-add-tag").val(),
        },
        headers:{
            access_token:localStorage.getItem("access_token")
        }
    })
    .done(_=>{get()
        $("#form-add-text").val("")
        $("#form-add-price").val("")
        $("#form-add-ingredients").val("")
        $("#form-add-tag").val("")})
    .fail(_=>console.log("Error in inserting"))
    }
    else console.log("Fill all the form!")
}
function get() {
    $("#main-list").empty()
    $.ajax({
        method:"GET",
        url:"http://localhost:3000/foods",
        headers:{
            access_token:localStorage.getItem("access_token")
        }
    })
    .then(result=>{
        result.forEach(el=>{
            $("#main-list").append(`
            <div class="card">
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between mb-0">
              <div class="col-9">
                <h5 class="font-weight-bold">${el.title} </h5>
                <p>Rp.${el.price}</p>
              </div>
              <div class="col-3 d-flex align-items-baseline">
                <i class="fas fa-tag text-grey mr-2"></i>
                <p class="text-grey">${el.tag}</p>
                <button class="fas fa-trash text-danger ml-auto cursor-pointer" onclick="deleteById(${el.id})"></button>
              </div>
            </div>
            <div class="card-body border-bottom">
              ${el.ingredients}
            </div>
          </div>
        </div>
        `)
        })
    })
}

function deleteById(id) {
    $.ajax({
        method:"DELETE",
        url:`http://localhost:3000/foods/${id}`,
        headers:{
            access_token:localStorage.getItem("access_token")
        }
    })
    .always(_=>get())
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
    //add button
    $("#submit-add").on("click",(event)=>{
        event.preventDefault()
        post()
    })
})