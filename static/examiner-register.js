

//Examiner registration
function examiner_register() {
    var regno = document.getElementById("examiner-id").value;
    var name = document.getElementById("examiner-username").value;
    var hallno = document.getElementById("examiner-hallno").value;
    var aadhar = document.getElementById("examiner-aadhar").value;
    var mobile = document.getElementById("examiner-mobile").value;
    var email_id = document.getElementById("examiner-email").value;
    var dob = document.getElementById("examiner-date-of-birth").value;
    // var gender = document.getElementById("examiner-gender").value;

    var radios = document.getElementsByName('examiner-gender');
    var gender = ""
    for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
        // alert(radios[i].value);
        gender = radios[i].value;
        break;
    }
    }

    var schoolname = document.getElementById("examiner-schoolname").value;
    var address = document.getElementById("examiner-address").textContent;
    var pincode = document.getElementById("examiner-pincode").value;
    var password = document.getElementById("examiner-password").value;
    
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
                                                    fd.append('examiner_id', regno);
                                                    fd.append('name', name);
                                                    fd.append('hallno', hallno);
                                                    fd.append('password', password);
                                                    fd.append('dob', dateofbirth);
                                                    fd.append('email',email_id)
                                                    fd.append('sex', gender);
                                                    fd.append('mobile', mobile);
                                                    fd.append('schoolname', schoolname);
                                                    fd.append('aadhar', aadhar);
                                                    fd.append('address', address);
                                                    fd.append('pincode', pincode);
                                                    
                                                    fetch('/examiner/registration', {
                                                        method: 'POST',
                                                        body: fd
                                                    }).then(function (response) {
                            
                                                        //console.log(response);
                            
                                                        return response.json();
                            
                                                    }).then(function (data) {
                                                        console.log(data);
                            
                                                        console.log(data.status);
                                                        if (data.status == "success") {
                                                            Swal.fire({
                                                                title: 'Registered successfully!',
                                                                icon: 'success'
                                                            }).then(function(result) {
                                                            if (result.value) {
                                                                window.location.replace("/admin/examiner-details")
                                                            }
                                                            });                                
                                                        }
                                                        else if(data.response == "User account already exists"){
                                                            Swal.fire({
                                                                title: 'Examiner id already exists',
                                                                icon: 'danger'
                                                            }).then(function(result) {
                                                            if (result.value) {
                                                                window.location.replace("/admin/examiner-details")
                                                            }
                                                            });
                                                        }
                            
                                                        else if(data.response == "database error. request not acknowledged"){
                                                            Swal.fire({
                                                                title: 'Could not register examiner, please contact your administrator',
                                                                icon: 'danger'
                                                            }).then(function(result) {
                                                            if (result.value) {
                                                                window.location.replace("/admin/examiner-details")
                                                            }
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

