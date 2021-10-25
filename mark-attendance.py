@app.route('/student/attendance',methods=["POST"])
def mark_student_attendance():
    db = myclient["Class"]
    collection = db["attendance"]
    # regno = request.form['regno']
    # print(regno)
    # std = request.form['class']
    # section = request.form['section']
    # schoolname = request.form['schoolname']
    # attendance = request.form['attendance']
    # time = request.form['time']
    # mydate = {}
    # mytime = {}
    # current_date = request.form['date']
    
    # mytime[time] = attendance
    # mydate[current_date] = mytime
    # my_attendance = {
    #     "regno":regno,
    #     "class":std,
    #     "section":section,
    #     "schoolname":schoolname,
    #     "attendance":mydate
    # }
    data = json.loads(request.form['name'])
    regno = data['regno']
    print(regno)
    std = data['class']
    section = data['section']
    
    schoolname = data['schoolname']
    attendance = data['attendance']
    
    a = {}
    b = {}
    time = {}
    if request.method == 'POST':
        db_response = collection.find_one({"regno":regno,"class":std,"section":section,"schoolname":schoolname})
        
        if db_response != None:
            obj = db_response["attendance"]
            for i in obj:
                print(i)
                for k in attendance:
                    print(k)
                    if i == k:
                    print("equal")
                        b.update(a)

                        time[i] = b
                        obj[i].update(time[i])
                    else:
                        boo = {}
                        boo.update(a)
                        time[i] = boo
                        obj.update(time)
            print(obj)
            # attend_time = db_response["attendance"]
            # print(attend_time)
            # attend_time[current_date][time] = attendance
            update_result = collection.update_one({"regno":regno,"class":std,"section":section,"schoolname":schoolname},{"$set":{"attendance":obj}})
            if update_result.acknowledged == True and update_result.modified_count == 1:
                response_string = {"status": "success","response":"ok"}
            else:
                response_string = {"status":"failed","response":"database error"}
            return json.dumps(response_string, indent=4)
            
        else:
            db_response = collection.insert_one(data)
            if db_response.acknowledged == True:
                response_string = {"status": "success","response":"ok"}
            else:
                response_string = {"status":"failed","response":"database error. request not acknowledged"}
            return json.dumps(response_string, indent=4)