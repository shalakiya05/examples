@app.route('/teacher/getNameId',methods=["GET", "POST"])
def teacher_get_name_id():
    db = myclient["accounts"]
    collection = db["teacher"]
    if request.method == 'POST':
        email = request.form['email']
        db_response = collection.find_one({"email":email},{"_id":0,"encrypted_pwd":0})
        if db_response != None:
            name = db_response["name"]
            regId = db_response["regId"]
            response_string = reset_teacher_password(email,name,regId)
            return response_string
    return json.dumps({"status": "user not found","response": "User not found"})



def reset_teacher_password(email,name,regId):
    message = MIMEMultipart()
    part1 = MIMEText('Dear '+name+" !\n"+"A password reset has been requested for Teacher ID "+regId+".\nPlease click the below link to verify your identity and set a new password for your account.\n",'plain')
    part2 = MIMEText(u'<a href="http://180.179.48.5:80/teacher/forgot-password">Click here to reset your password</a>','html')
    part3 = MIMEText('\n\nIf you did not request this password reset, please disregard this email.\nWarm Regards and thanks,\nJakstech Team,\nJakstech Solutions.','plain')
    message.attach(part1)
    message.attach(part2)
    message.attach(part3)
    
    try:
        sender = 'angayarbaluu@gmail.com'
        receiver = email        
        message['From'] = 'Jakstech Team <sender>'
        message['To'] = name +'<'+email+'>'
        message['Cc'] = 'Receiver2 Name <>'
        message['Subject'] = 'Eduscribe Account Reset Password'
        msg_full = message.as_string()
        smtplib.SMTP_SSL("smtp.gmail.com", 465)
        smtpObj = smtplib.SMTP(host='smtp.gmail.com', port=587)
        smtpObj.ehlo()
        smtpObj.starttls()
        smtpObj.ehlo()
        smtpObj.login('angayarbaluu@gmail.com','angayarbaluu12')
        smtpObj.sendmail(sender, receiver, msg_full)
        smtpObj.quit()
        print ("Successfully sent email")
        return json.dumps({"status": "success","response": "email sent successfully"})
    except smtplib.SMTPException as error:
        print (str(error))
        print ("Error: unable to send email")
        

#TEACHER FORGOT  PASSWORD
@app.route('/teacher/forgot-password',methods=["POST"])
def teacher_forgot_password():
    db = myclient["accounts"]
    collection = db["teacher"]
    if request.method == 'POST':
        regId = request.form['regId']
        password = request.form['password']
        encrypted_pwd = encryption(password)
        db_response = collection.find_one({"regId": regId})
        if db_response != None:
            update_result = collection.update_one({"_id":ObjectId(db_response['_id'])},{"$set":{"password":password,"encrypted_pwd":encrypted_pwd}})
            if update_result.acknowledged:
                db_res =collection.find_one({"regId": regId})
                if db_res!=None:
                    response_string = update_teacher_password(db_res["email"],db_res["regId"],db_res["password"],db_res["name"])
                    return response_string
            return json.dumps({"status": "failed","response": "database error"})
        else:
            return json.dumps({"status": "failed","response": "User not found"})


        
def update_teacher_password(email,regno,password,name):
    message = MIMEMultipart()
    part1 = MIMEText('Dear '+name+" !\nYour password is successfully reset\nYour ID: "+regno+ '\n Password: '+password+'\n','plain')
    part2 = MIMEText(u'<a href="http://180.179.48.5:80/teacher/login">Click here to login</a>','html')
    part3 = MIMEText('\n\nWarm Regards and thanks,\nJakstech Team,\nJakstech Solutions.','plain')
    message.attach(part1)
    message.attach(part2)
    message.attach(part3)

    try:
        sender = 'angayarbaluu@gmail.com'
        receiver = email
        message['From'] = 'Jakstech Team <sender>'
        message['To'] = name +'<'+email+'>'
        message['Cc'] = 'Receiver2 Name <>'
        message['Subject'] = 'Your password for Eduscribe Account is created successfully!'
        msg_full = message.as_string()
        smtplib.SMTP_SSL("smtp.gmail.com", 465)
        smtpObj = smtplib.SMTP(host='smtp.gmail.com', port=587)
        smtpObj.ehlo()
        smtpObj.starttls()
        smtpObj.ehlo()
        smtpObj.login('angayarbaluu@gmail.com','angayarbaluu12')
        smtpObj.sendmail(sender, receiver, msg_full)

        smtpObj.quit()
        print ("Successfully sent email")
        return json.dumps({"status": "success","response": "password updated"})
    except smtplib.SMTPException as error:
        print (str(error))
        print ("Error: unable to send email")