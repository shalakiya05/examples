$(document).ready(function () {
    var ans_gram1_counter = 1;
    var ans_gram1_counter1 = 1;
    var c = 97;
    var ans_gram1_no_of_questions = 0;
    var ans_gram1_total_marks = 0;
    var res = "";
    var head = "";
    var res1 = 1;
    var a = 0;
    var st = 0;
    var start_no = 0;
    var ques_no = 0;
    var headings = [];
    var ques = [];
    ans_gram1_option = [];
    ans_gram1_count_opt = [];
    var cnt = 1;
    ans_gram1_numbering = 0;
    ans_gram1_checkBox1 = "";
    var ans_gram1_choice = 0;
    var val = 0;
    var b = 0
    var num = 1;


    $(document).on('click', "#addButton_ans_gram1", function () {

        if (num > 1) {
            $("#d").empty();
            ans_gram1_counter = 1;
        }
        num++;
        $("#d").append("<br><br>");
        ans_gram1_no_of_questions = $("#number-of-questions_ans_gram1").val();
        num_ques_ans_grmr1 = ans_gram1_no_of_questions;
        ans_gram1_option = [];
        ans_gram1_opt1 = 0;
        var ch = 0;
        ans_gram1_total_marks = $("#marks_ans_gram1").val();
        mark_ans_grmr1 = ans_gram1_total_marks;
        ques_no = $("#question-number_ans_gram1").val();
        head = $("#heading_ans_gram1").val();
        start_no = $("#starting-number_ans_gram1").val();
        st = start_no;
        if (ans_gram1_no_of_questions != 0 && ans_gram1_total_marks != 0 && head != "" && start_no!=0) {
            each_mark_ans_gram1 = printEachMark(head, ans_gram1_total_marks, ans_gram1_no_of_questions);
            no_of_ques_ans_grmr1 = printNumQuestions(head, ans_gram1_no_of_questions);

            for (i = 0; i < ans_gram1_no_of_questions; i++) {
                $("#d").append('<div class="row"><div class="col-sm-1"><label style="font-weight:bold;">' + start_no + '. </label></div>' +
                    '<div class="col-sm-9"><input type="text" name="eachHeading' + ans_gram1_counter +
                    '" id="eachHeading_ans_gram1' + ans_gram1_counter + '" value="" class="form-control input-lg" placeholder="Heading"></div>' + '<div class="col-sm-2"><input class="form-control mt-2 mt-md-0" type="text" id="eachmark_ans_gram1' + ans_gram1_counter + '" value="' + each_mark_ans_gram1 + '"  placeholder="Mark" readonly></div></div>');
                $("#d").append('&nbsp;<div class="row"><div class="col-sm-1"><label></label></div>' + '<div class="col-sm-11"><div class="form-control" style="height:50px; overflow: auto;" name="textbox' + ans_gram1_counter + '" id="textbox_ans_gram1' + ans_gram1_counter + '" onkeyup="myFunctionsAnsGrammar1(' + ans_gram1_counter + ')" class="form-control mt-2 mt-md-0" contenteditable="true" data-placeholder="Question" cols="200" rows="100"></div></div></div>' +
                    '<br><div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-11"><input class="form-control mt-2 mt-md-0" type="text" id="highlightedword_ans_gram1' + ans_gram1_counter + '" onblur="myhighlightAnsGrammar1(' + ans_gram1_counter + ')" onfocus="myfocusAnsGrammar1(' + ans_gram1_counter + ')" placeholder="Highlighted word"/></div></div>');
                $("#d").append('<div class="row"><div class="col-sm-1"><label></label></div>' + '<div class="col-sm-2"><input type="checkbox" id="myCheck_ans_gram1' + ans_gram1_counter + '" class = "example" name="MCQ" value="MCQ" onclick="myFunctionAnsGrammar1(' + ans_gram1_counter + ')"><label>MCQ</label></div></div><div id="Check_ans_gram1' + ans_gram1_counter + '"></div>');

                start_no++;

                $("#d").append("<br>");
                ans_gram1_counter++;
            }
            $("#d").append('<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-2"><input type="button" id="getButtonValue_ans_gram1"  class="test btn btn-primary" value="Save" ></div></div>');
        }

        else {
            alert("Please enter all the fields");
        }
    });



    $(document).on('click', "#getButtonValue_ans_gram1", function () {

        for (i = 1; i <= ans_gram1_no_of_questions; i++) {
            headings[i - 1] = $('#eachHeading_ans_gram1' + i).val();
            if (headings[i - 1] == "") {
                //alert("Please enter all the headings");
                break;
            }
            else {
                console.log("Headings : " + headings[i - 1]);
            }
        }

        for (i = 1; i <= ans_gram1_no_of_questions; i++) {
            ques[i - 1] = $('#textbox_ans_gram1' + i).text();
            if (ques[i - 1] == "") {
                alert("Please enter all the questions");
                break;
            }

            else {
                console.log("Questions : " + ques[i - 1]);
            }
        }

        ans_gram1_count_opt = [];
        val = 0;
        ans_gram1_choice = 0;
        for (j = 0; j < ans_gram1_no_of_questions; j++) {

            if (ans_gram1_checkBox1.checked == true) {

                ans_gram1_count_opt[j] = $('#noofoption_ans_gram1' + (j + 1)).val();

                if (ans_gram1_count_opt[j] == 0) {
                    alert("Please enter number of options");
                    break;

                }
                else {

                    for (i = 0; i < ans_gram1_count_opt[j]; i++) {

                        ans_gram1_option[ans_gram1_choice] = ($('#options_ans_gram1' + ans_gram1_choice).val());
                        ans_gram1_choice++;

                    }
                }
            }
        }

        item2 = {};
        item = {};
        var ans_gram1_ch = 0;
        ans_gram1_ques_arr = [];
        ans_gram1_questions = {};
        ans_gram1_opt_obj = [];
        options = {};
        marks_ans_grmr1 = no_of_ques_ans_grmr1 + "x" + each_mark_ans_gram1 + "=" + mark_ans_grmr1;
        ans_gram1_opt_arr = [];
        paragraph = {};
        var ans_gram1_cnnt = 0;
        item1 = {};
        a = 0;
        b = 0;
            var start_num = st;
            ans_gram1_cnnt = 0;
            ans_gram1_ch = 0;
            ans_gram1_count_opt = [];

            ans_gram1_opt_arr = [];
            for (i = 1; i <= ans_gram1_no_of_questions; i++) {
                $("#textbox_ans_gram1" + i).each(function () {
                    var inData = $(this).text();
                    if (inData != "") {
                        ans_gram1_ques_arr.push(inData);
                    }
                    var ans_head = $("#eachHeading_ans_gram1" + i).val();
                    var high = $("#highlightedword_ans_gram1" + i).val();
                    ans_gram1_checkBox1 = document.getElementById("myCheck_ans_gram1" + i);
                    if (ans_gram1_checkBox1.checked == true) {
                        ans_gram1_count_opt[i] = parseInt($('#noofoption_ans_gram1' + i).val());
                        ans_gram1_cnnt += ans_gram1_count_opt[i];

                        for (j = 0; j < ans_gram1_count_opt[i]; j++) {
                            ans_gram1_option[ans_gram1_ch] = $('#options_ans_gram1' + ans_gram1_ch).val();

                            if (ans_gram1_option[ans_gram1_ch] == 0) {
                                alert("Please enter the option which you selected");
                                break;
                            }
                            else {
                                console.log("Options : " + ans_gram1_option[ans_gram1_ch]);
                                ans_gram1_opt_obj.push(ans_gram1_option[ans_gram1_ch]);
                                ans_gram1_opt_arr.push(ans_gram1_option[ans_gram1_ch]);
                                ans_gram1_ch++;
                            }
                        }



                        if (ans_head != "" && high != "") {
                            ans_gram1_questions[start_num] = { "heading": ans_head, "type": "MCQSL", "question": inData, "quotedWords": high, "quoteType": "underline", "options": ArrayToObject(ans_gram1_opt_obj) };
                        }
                        else if (ans_head != "" && high == "") {
                            ans_gram1_questions[start_num] = { "heading": ans_head, "type": "MCQSL", "question": inData, "quotedWords": null, "quoteType": null, "options": ArrayToObject(ans_gram1_opt_obj) };
                        }
                        else if (ans_head == "" && high != "") {
                            ans_gram1_questions[start_num] = { "heading": null, "type": "MCQSL", "question": inData, "quotedWords": high, "quoteType": "underline", "options": ArrayToObject(ans_gram1_opt_obj) };
                        }
                        else {
                            ans_gram1_questions[start_num] = { "heading": null, "type": "MCQSL", "question": inData, "quotedWords": null, "quoteType": null, "options": ArrayToObject(ans_gram1_opt_obj) };
                        }
                        ans_gram1_opt_obj = [];
                    }
                    else {
                        if (ans_head != "" && high != "") {
                            ans_gram1_questions[start_num] = { "heading": ans_head, "type": "MCQN", "question": inData, "quotedWords": high, "quoteType": "underline", "options": null };
                        }
                        else if (ans_head != "" && high == "") {
                            ans_gram1_questions[start_num] = { "heading": ans_head, "type": "MCQN", "question": inData, "quotedWords": null, "quoteType": null, "options": null };
                        }
                        else if (ans_head == "" && high != "") {
                            ans_gram1_questions[start_num] = { "heading": null, "type": "MCQN", "question": inData, "quotedWords": high, "quoteType": "underline", "options": null };
                        }
                        else {
                            ans_gram1_questions[start_num] = { "heading": null, "type": "MCQN", "question": inData, "quotedWords": null, "quoteType": null, "options": null };
                        }
                    }
                });
                start_num++;
            }
        
        if (ques_no != 0) {
            con_no = parseInt(ques_no) + 1;
        }
        else {
            con_no = start_num;
        }
        
        var partno = "";
        for (var v = s_sec + 1; v <= (parseInt(no_of_parts[sec_count]) + s_sec); v++) {
            console.log("retrived " + question_types[v] + " " + v);
            var partarr = question_types[v];
            for (var h = 0; h < partarr.length; h++) {
                if ("Answer the following - I (Grammar)" == partarr[h]) {
                    partno = v - s_sec;
                    break;
                }
            }
        }

        item_ans_grmr1 = {
            "heading": head,
            "marks": marks_ans_grmr1
        };
        obj_ans_grmr1 = {
            "user": reg_teacher,
            "heading": head,
            "marks": marks_ans_grmr1
        };

        for (let key in ans_gram1_questions) {
            item_ans_grmr1[key] = ans_gram1_questions[key];
        }
        for (let key in ans_gram1_questions) {
            obj_ans_grmr1[key] = ans_gram1_questions[key];
        }

        if (ans_gram1_ques_arr.length == ans_gram1_no_of_questions) {

            var arraySet = new Set(ans_gram1_opt_arr)
            if (arraySet.has("")) {
            }
            else {
                if (ans_gram1_opt_arr.length == ans_gram1_cnnt) {
                    alert("Answer the following (Grammar) - I is saved successfully!");
                    console.log(JSON.stringify(item_ans_grmr1,null,'\t'))
                
                    document.getElementById("getButtonValue_ans_gram1").value = "Saved!";
                    createAnsGrammar1(JSON.stringify(obj_ans_grmr1));
                    if (item_ans_grmr1 != {}) {
                        if (part1.hasOwnProperty("part " + partno)) {
                            var temp_item = part1["part " + partno];
                            part1["part " + partno] = { ...temp_item, ...item_ans_grmr1 };
                        }
                        else {
                            part1["part " + partno] = item_ans_grmr1;
                        }
                        item_ans_grmr1 = {};
                    }
                }
            }

        }
    });
    function ArrayToObject(arr) {
        var obj = {};
        for (var i = 1; i <= arr.length; i++) {
            obj[i] = arr[i - 1];
        }
        return obj
    }
});



var text_ans_gram1 = "";

    function myFunctionsAnsGrammar1(count) {
        $(document).ready(function () {
            text_ans_gram1 = $("#textbox_ans_gram1" + count).text();
        });
    }
    function myhighlightAnsGrammar1(count) {
        $(document).ready(function () {

            var s = document.getElementById("highlightedword_ans_gram1" + count).value;
            var a = text_ans_gram1.replace(s, '<u>' + s + '</u>');
            text_ans_gram1 = a;
            $("#textbox_ans_gram1" + count).html(a);
        });

    }
    function myfocusAnsGrammar1(count) {
        $(document).ready(function () {
            var s = document.getElementById("highlightedword_ans_gram1" + count).value;
            if (s == "" || s == null) {

            }
            else {
                var a = text_ans_gram1.replace('<u>' + s + '</u>', s);
                text_ans_gram1 = a;
                $("#textbox_ans_gram1").html(a);
            }
        });
    }

    var ans_gram1_no_option = 0;
    var ans_gram1_numbering = 0;
    var ans_gram1_opt1 = 0;
    var ans_gram1_checkBox1 = "";
    var ans_gram1_counter = 1;
    var ans_gram1_count_opt = [];
    var ans_gram1_option = [];

    function myFunctionAnsGrammar1(ans_gram1_counter) {
        ans_gram1_checkBox1 = document.getElementById('myCheck_ans_gram1' + ans_gram1_counter);
        //checkBox = document.querySelectorAll(".example");
        if (ans_gram1_checkBox1.checked == true) {

            var table = document.getElementById("Check_ans_gram1" + ans_gram1_counter);
            table.innerHTML += '<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-2"><input type="text" min="0" name="total_mark" id="noofoption_ans_gram1' + ans_gram1_counter + '" class="form-control" placeholder="Number of Options"></div>&nbsp;<div class="col-sm-2"><input type="button" value="Create Options" class="btn btn-primary" id="addOption_ans_gram1' + ans_gram1_counter + '" onclick="addOptionAnsGrammar1(' + ans_gram1_counter + ')"></div></div><div id="option_ans_gram1' + ans_gram1_counter + '"></div><br>';

        } else {
            var table = document.getElementById("Check_ans_gram1" + ans_gram1_counter);
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }

        }
    }
    function addOptionAnsGrammar1(ans_gram1_counter) {

        ans_gram1_no_option = document.getElementById("noofoption_ans_gram1" + ans_gram1_counter).value;
        ans_gram1_numbering = 97;
        if (ans_gram1_no_option != 0) {
            for (i = 0; i < ans_gram1_no_option; i++) {
                var res = String.fromCharCode(ans_gram1_numbering);
                var table = document.getElementById("option_ans_gram1" + ans_gram1_counter);

                if (i == 0) {
                    table.innerHTML += '<br><br>';
                }
                //table.innerHTML+='<input style="margin-left:90px;"type="text" min="0" name="total_mark" id="options'+i+'" class="form-control col-sm-2" placeholder="Option - '+res+'">&nbsp;';
                table.innerHTML += '<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-3"><input type="text" min="0" name="total_mark" id="options_ans_gram1' + ans_gram1_opt1 + '" class="form-control" placeholder="Option - ' + res + '"></div></div>&nbsp;';
                ans_gram1_numbering++;
                ans_gram1_opt1++;

            }
        }
        else {
            alert("enter all options");
        }
    }


function getResultsAnsGrammar1(elem) {
    $(document).ready(function () {
        elem.checked && elem.value == "Numbers_ans_gram1" ? $("#dvtext_ans_gram1").show() : $("#dvtext_ans_gram1").hide();
    });
}