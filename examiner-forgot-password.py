@app.route('/examiner/getNameId',methods=["GET", "POST"])
def examiner_get_name_id():
    db = myclient["accounts"]
    collection = db["examiner"]
    if request.method == 'POST':
        email = request.form['email']
        db_response = collection.find_one({"email":email},{"_id":0,"encrypted_pwd":0})
        if db_response != None:
            name = db_response["name"]
            examiner_id = db_response["examiner_id"]
            response_string = reset_examiner_password(email,name,examiner_id)
            return response_string
    return json.dumps({"status": "user not found","response": "User not found"})



def reset_examiner_password(email,name,examiner_id):
    message = MIMEMultipart()
    part1 = MIMEText('Dear '+name+" !\n"+"A password reset has been requested for examiner ID "+examiner_id+".\nPlease click the below link to verify your identity and set a new password for your account.\n",'plain')
    part2 = MIMEText(u'<a href="http://180.179.48.5:80/examiner/forgot-password">Click here to reset your password</a>','html')
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


#examiner FORGOT  PASSWORD
@app.route('/examiner/forgot-password',methods=["POST"])
def examiner_forgot_password():
    db = myclient["accounts"]
    collection = db["examiner"]
    if request.method == 'POST':
        examiner_id = request.form['examiner_id']
        password = request.form['password']
        encrypted_pwd = encryption(password)
        db_response = collection.find_one({"examiner_id": examiner_id})
        if db_response != None:
            update_result = collection.update_one({"_id":ObjectId(db_response['_id'])},{"$set":{"password":password,"encrypted_pwd":encrypted_pwd}})
            if update_result.acknowledged:
                db_res =collection.find_one({"examiner_id": examiner_id})
                if db_res!=None:
                    response_string = update_examiner_password(db_res["email"],db_res["examiner_id"],db_res["password"],db_res["name"])
                    return response_string
            return json.dumps({"status": "failed","response": "database error"})
        else:
            return json.dumps({"status": "failed","response": "User not found"})

            
def update_examiner_password(email,examiner_id,password,name):
    message = MIMEMultipart()
    part1 = MIMEText('Dear '+name+" !\nYour password is successfully reset\nYour ID: "+examiner_id+ '\n Password: '+password+'\n','plain')
    part2 = MIMEText(u'<a href="http://180.179.48.5:80/examiner/login">Click here to login</a>','html')
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