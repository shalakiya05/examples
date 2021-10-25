
function login() {
    var regno = document.getElementById("teacher-id").value;
    var password = document.getElementById("teacher-password").value;
    localStorage.setItem("teacher-id",regno);
    localStorage.setItem("teacher-password",password);
    

    var fd = new FormData();
    fd.append('regId', regno);
    fd.append('password', password);

    fetch('/teacher/login', {
        method: 'POST',
        body: fd
    }).then(function (response) {

        //console.log(response);

        return response.json();

    }).then(function (data) {
        console.log(data);

        console.log(data.status);
        if (data.status == "success") {
            localStorage.setItem("regId", regno);
            localStorage.setItem("password", password);
            window.location.replace("/teacher/home-page")
        }
        else if (data.status == "successful") {
            localStorage.setItem("regId", regno);
            localStorage.setItem("password", password);
            window.location.replace("/teacher/home-page")
        }
        else if(regno=="" || password==""){
            Swal.fire({
                title: 'Please enter both Teacher Id and Password'
            })
        }
        else if(data.response == "You are not approved by admin"){
            Swal.fire({
                title: 'You are not approved by admin. Please wait for approval'
            })
        }

        else if(data.response =="User not found"){
            Swal.fire({
                title: 'Teacher Id not found or Invalid User',
                icon:'error'
            })
        }
        
        else if(data.response =="wrong password"){
            Swal.fire({
                title: 'Invalid Password',
                icon:'error'
            })
        }
        else if(data.response == "You are already logged in on another device"){
            Swal.fire({
                title: 'You are already logged in on another device'
            })
        }
        else{
            Swal.fire({
                title: 'Something went wrong, please try again'
            })
        }

    });
}


var regno = localStorage.getItem("teacher-id");
var pwd = localStorage.getItem("teacher-password");
// console.log(regno)


function logout() {

    var send = new FormData();
    send.append('regId', regno);
    send.append('password', pwd);


    fetch('/teacher/logout', {
        method: 'POST',
        body: send
    }).then(function (response) {

        //console.log(response);

        return response.json();

    }).then(function (data) {
        console.log(data);
        if(data.status=="logout success"){
            window.location.replace("/teacher/login")
        }   
    });
}



function reset() {
    var regno = localStorage.getItem('teacher-id');
    var old_password = document.getElementById("teacher-old-password").value;
    var password = document.getElementById("teacher-new-password").value;
    var new_password = document.getElementById("teacher-confirm-password").value;
    if(old_password!=""){
        if(password !="" && new_password !=""){
            if (password == new_password) {
                if (password.length >= 8) {
                    var fd = new FormData();
                    alert(old_password)
                    alert(new_password)
                    alert(regno)
                    fd.append('regId', regno);
                    fd.append('old_password', old_password);
                    fd.append('new_password', password);
                    fetch('/teacher/reset-password', {
                        method: 'POST',
                        body: fd
                    }).then(function (response) {
    
                        //console.log(response);
    
                        return response.json();
    
                    }).then(function (data) {
                        console.log(data);
    
                        console.log(data.status);
                        console.log(data.response);
                        if (data.status == "success") {
                            alert("Successfully reset password");
                            window.location.replace("/teacher/edit-profile")
                        }
                        else if (data.status == "user not found") {
                            alert("Please enter valid proctor id")
                        }
                        else if (data.response == "old password is incorrect") {
                            alert("Old password is incorrect, please enter the correct password");
                        }
                    });
                }
                else {
                    alert("Password length should be greater than 8")
                }
            }
            else {
                alert("Passwords mismatch")
            }
        }else{
            alert('Please enter new password and confirm password')
        }
    }
}



