
// Login
function login() {
    var regno = document.getElementById("admin-id").value;
    var password = document.getElementById("admin-password").value;
    localStorage.setItem("admin-id",regno);
    localStorage.setItem("admin-password",password);
    

    var fd = new FormData();
    fd.append('admin_id', regno);
    fd.append('password', password);

    fetch('/admin/login', {
        method: 'POST',
        body: fd
    }).then(function (response) {

        //console.log(response);

        return response.json();

    }).then(function (data) {
        console.log(data);

        console.log(data.status);
        if (data.status == "success") {
            localStorage.setItem("adminId", regno);
            localStorage.setItem("password", password);
            window.location.replace("/admin/home-page")
        }
        else if (data.status == "successful") {
            localStorage.setItem("adminId", regno);
            localStorage.setItem("password", password);
            window.location.replace("/admin/home-page")
        }
        else if(regno=="" || password==""){
            Swal.fire({
                title: 'Please enter both Admin Id and Password'
            })
        }
        else if(data.response=="wrong password"){
            Swal.fire({
                title: 'Password is incorrect, please enter correct password'
            })
        }
        else if(data.response=="You are already logged in on another device"){
            Swal.fire({
                title: 'You are logged in on another device'
            })
        }
        else{
            Swal.fire({
                title: 'Something went wrong, please try again later',
                icon:'error'
            })
        }
    });
}




// Logout

var regno = localStorage.getItem("admin-id");
var pwd = localStorage.getItem("admin-password");

function logout() {

    var send = new FormData();
    send.append('adminId', regno);
    send.append('password', pwd);


    fetch('/admin-portal/admin-logout', {
        method: 'POST',
        body: send
    }).then(function (response) {

        //console.log(response);

        return response.json();

    }).then(function (data) {
        console.log(data);
        window.location.replace("/admin/login")
        
    });
}





// Password reset

function reset() {
    var regno = localStorage.getItem('admin-id');
    var old_password = document.getElementById("admin-old-password").value;
    var password = document.getElementById("admin-new-password").value;
    var new_password = document.getElementById("admin-confirm-password").value;
    if(old_password!=""){
        if(password !="" && new_password !=""){
            if (password == new_password) {
                if (password.length >= 8) {
                    var fd = new FormData();
                    alert(old_password)
                    alert(new_password)
                    alert(regno)
                    fd.append('admin_id', regno);
                    fd.append('old_password', old_password);
                    fd.append('new_password', password);
                    fetch('/admin/reset-password', {
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
                            window.location.replace("/admin/edit-profile")
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



// Registration

function register() {
    var regno = document.getElementById("admin-id").value;
    var name = document.getElementById("admin-username").value;
    var aadhar = document.getElementById("admin-aadhar").value;
    var mobile = document.getElementById("admin-mobile").value;
    var dob = document.getElementById("admin-date-of-birth").value;
    var email_id = document.getElementById("admin-email").value;
    var radios = document.getElementsByName('admin-gender');
    var gender = ""
    for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
        gender = radios[i].value;
        break;
    }
    }
    var schoolname = document.getElementById("admin-schoolname").value;
    var address = document.getElementById("admin-address").textContent;
    var pincode = document.getElementById("admin-pincode").value;
    var password = document.getElementById("admin-password").value;
    

    if (regno!=0 && name!="" && gender!="" && email_id!="" && dob!="" && schoolname!="" && address!="" && pincode!="" && password!="" && mobile != "" && aadhar != "") {
        //var reexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var reexp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reexp.test(email_id) == true){
        if (mobile.length == 10) {
            if (aadhar.length == 12) {
                    if (password.length >= 8) {
                            
                        var fd = new FormData();
                        fd.append('aadhar', aadhar);
                        fetch('/user/aadharcheck', {
                            method: 'POST',
                            body: fd
                        }).then(function (response) {

                            //console.log(response);

                            return response.json();

                        }).then(function (data) {
                            console.log(data);
                            if(data.status=="success"){
                                Swal.fire({
                                    title: 'Aadhar number already exists, enter valid aadhar number',
                                })
                            }else{
                                var fd = new FormData();
                                fd.append('mobile', mobile);
                                fetch('/user/phnocheck', {
                                    method: 'POST',
                                    body: fd
                                }).then(function (response) {

                                    //console.log(response);

                                    return response.json();

                                }).then(function (data) {
                                    console.log(data);
                                    if(data.status=="success"){
                                        Swal.fire({
                                            title: 'Mobile number already exists, try with another',
                                        })
                                    }else{
                                        var fd = new FormData();
                                        fd.append('email', email_id);
                                        fetch('/user/mailid_check', {
                                            method: 'POST',
                                            body: fd
                                        }).then(function (response) {

                                            //console.log(response);

                                            return response.json();

                                        }).then(function (data) {
                                            console.log(data);
                                            if(data.status=="success"){
                                                Swal.fire({
                                                    title: 'Email id already exists, try with another mail id',
                                                })
                                            }else{
                                                var val_email = getEmail(email_id)
                                                if(val_email==true){
                                                    const d = new Date(dob)
                                                    const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d)
                                                    const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d)
                                                    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
                                                    var dateofbirth = `${da}-${mo}-${ye}`;
                                                    var fd = new FormData();
                                                    fd.append('admin_id', regno);
                                                    fd.append('name', name);
                                                    fd.append('password', password);
                                                    fd.append('dob', dateofbirth);
                                                    fd.append('sex', gender);
                                                    fd.append('email', email_id);
                                                    fd.append('mobile', mobile);
                                                    fd.append('schoolname', schoolname);
                                                    fd.append('aadhar', aadhar);
                                                    fd.append('address', address);
                                                    fd.append('pincode', pincode);
                                                    
                                                    fetch('/admin/registration', {
                                                        method: 'POST',
                                                        body: fd
                                                    }).then(function (response) {
                            
                                                        //console.log(response);
                            
                                                        return response.json();
                            
                                                    }).then(function (data) {
                                                        console.log(data);
                            
                                                        console.log(data.status);
                                                        if (data.status == "success") {
                                                            // alert("Registered successfully");
                                                            Swal.fire({
                                                                title: 'Successfully Registered!',
                                                                text: 'Do you want to go to the Log In page?',
                                                                icon: 'success',
                                                                showCancelButton: true,
                                                                confirmButtonColor: '#3085d6',
                                                                cancelButtonColor: '#d33',
                                                                confirmButtonText: 'Yes, send me there!'
                                                            }).then(function(result) {
                                                            if (result.value) {
                                                                localStorage.setItem('schoolname',schoolname);
                                                                localStorage.setItem('admin-id',regno);
                                                                window.location.replace("/admin/login"); 
                                                            }
                                                            });
                                                        }
                                                        else if(data.status == "failed"){
                                                            Swal.fire({
                                                                title: 'Teacher id already exists, please try again',
                                                                icon: 'error'
                                                            });
                                                        }
                                                    });
                                                }
                                                else{
                                                    Swal.fire({
                                                        title: 'Please enter the proper email id',
                                                    })
                                                }
                                            }
                                        }); 
                                    }
                                });     
                            }
                        });
                        

                        }
                    else {
                        Swal.fire({
                            title: 'Password length should be greater than 8',
                        })
                        // alert("Password length should be greater than 8")
                    }
            }
            else {
                Swal.fire({
                    title: 'Aadhar number should have 12 digits',
                })
                // alert("Aadhar number should have 12 digits");
            }
        }
        else {
            Swal.fire({
                title: 'Mobile number should have 10 digits',
            })
        }
    }else{
        Swal.fire({
            title: 'Please enter the email id properly',
        })
    }
}
    else{
        Swal.fire({
            title: 'Please enter all the fields',
        })
    }

}


function getEmail(email){
    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
      if (regexEmail.test(email)) {
          return true
      } else {
          return false
      }
  }







// teacher - delete all
function teacher_deleteAll() {
    fetch('/admin-portal/teacher/deleteAll', {
        method: 'POST'
    }).then(function (response) {

        //console.log(response);

        return response.json();

    }).then(function (data) {
        console.log(data);

        console.log(data.status);
        if (data.status == "success") {
            alert("All the teachers are deleted successfully!");
            window.location.replace("/admin/home-page");
        }
    });
}


