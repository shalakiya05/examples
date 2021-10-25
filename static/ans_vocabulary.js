$(document).ready(function () {
    var ans_vocab_counter = 1;
    var ans_vocab_counter1 = 1;
    var c = 97;
    var ans_vocab_no_of_questions = 0;
    var ans_vocab_total_marks = 0;
    var res = "";
    ans_vocab_numbering = 97;
    var head = "";
    var res1 = 1;
    var a = 0;
    var st = 0;
    var start_no = 0;
    var ques_no = 0;
    var headings = [];
    var ques = [];
   ans_vocab_option = [];
   ans_vocab_count_opt = [];
    var cnt = 1;
    var ans_vocab_choice = 0;
    var val = 0;
    ans_vocab_checkBox = "";
    var b = 0
    var num = 1;

    $("#addButton_ans_vocabulary").click(function () {
        if (num > 1) {
            $("#c").empty();
            ans_vocab_counter = 1;
        }
        num++;
        $("#c").append("<br><br>");
       ans_vocab_option = [];
        ans_vocab_no_of_questions = $("#number-of-questions_ans_vocabulary").val();
        num_ques_ans_voc = ans_vocab_no_of_questions;
        ans_vocab_total_marks = $("#marks_ans_vocabulary").val();
        ans_vocab_opt = 0;
        mark_ans_voc = ans_vocab_total_marks;
        head = $("#heading_ans_vocabulary").val();
        start_no = $("#starting-number_ans_vocabulary").val();
        st = start_no;
        if (ans_vocab_no_of_questions != 0 && ans_vocab_total_marks != 0 && head != "" && start_no!=0) {
            each_mark_ans_vocabulary = printEachMark(head, ans_vocab_total_marks, ans_vocab_no_of_questions);
            no_of_ques_ans_vocabulary = printNumQuestions(head, ans_vocab_no_of_questions);

            for (i = 0; i < ans_vocab_no_of_questions; i++) {
                
                $("#c").append('<div class="row"><div class="col-sm-1"><label style="font-weight:bold;">' + start_no + '. </label></div>' +
                    '<div class="col-sm-9"><input type="text" name="eachHeading' + ans_vocab_counter +
                    '" id="eachHeading_ans_vocabulary' + ans_vocab_counter + '" value="" class="form-control input-lg" placeholder="Heading"></div>' + '<div class="col-sm-2"><input class="form-control mt-2 mt-md-0" type="text" id="eachmark_ans_vocabulary' + ans_vocab_counter + '" value="' + each_mark_ans_vocabulary + '"  placeholder="Mark" readonly></div></div>');
                $("#c").append('&nbsp;<div class="row"><div class="col-sm-1"><label></label></div>' + '<div class="col-sm-11"><div class="form-control" style="height:50px; overflow: auto;" name="textbox' + ans_vocab_counter + '" id="textbox_ans_vocabulary' + ans_vocab_counter + '" onkeyup="myFunctionsAnsVocabulary(' + ans_vocab_counter + ')" class="form-control mt-2 mt-md-0" contenteditable="true" data-placeholder="Question" cols="200" rows="100"></div></div></div>' +
                    '<br><div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-11"><input class="form-control mt-2 mt-md-0" type="text" id="highlightedword_ans_vocabulary' + ans_vocab_counter + '" onblur="myhighlightAnsVocabulary(' + ans_vocab_counter + ')" onfocus="myfocusAnsVocabulary(' + ans_vocab_counter + ')" placeholder="Highlighted word"/></div></div>');
                $("#c").append('<div class="row"><div class="col-sm-1"><label></label></div>' + '<div class="col-sm-2"><input type="checkbox" id="myCheck_ans_vocabulary' + ans_vocab_counter + '" class = "example" name="MCQ" value="MCQ" onclick="myFunctionAnsVocabulary(' + ans_vocab_counter + ')"><label>MCQ</label></div></div><div id="Check_ans_vocabulary' + ans_vocab_counter + '"></div>');
                start_no++;
                    
                $("#c").append("<br>");
                ans_vocab_counter++;
            }

        $("#c").append('<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-2"><input type="button" id="getButtonValue_ans_vocabulary"  class="test btn btn-primary" value="Save" ></div></div>');
        }

        else {
            alert("Please enter all the fields");
        }
    });



    $(document).on('click', "#getButtonValue_ans_vocabulary", function () {

        for (i = 1; i <= ans_vocab_no_of_questions; i++) {
            headings[i - 1] = $('#eachHeading_ans_vocabulary' + i).val();
            if (headings[i - 1] == "") {
                //alert("Please enter all the headings");
                break;
            }
            else {
                console.log("Headings : " + headings[i - 1]);
            }
        }

        for (i = 1; i <= ans_vocab_no_of_questions; i++) {
            ques[i - 1] = $('#textbox_ans_vocabulary' + i).text();
            if (ques[i - 1] == "") {
                alert("Please enter all the questions");
                break;
            }

            else {
                console.log("Questions : " + ques[i - 1]);
            }
        }

        ans_vocab_count_opt = [];
        val = 0;
        ans_vocab_choice = 0;
        for (j = 0; j < ans_vocab_no_of_questions; j++) {
            if (ans_vocab_checkBox.checked == true) {
                ans_vocab_count_opt[j] = $('#noofoption_ans_vocabulary' + (j + 1)).val();

                if (ans_vocab_count_opt[j] == 0) {
                    alert("Please enter number of options");
                    break;

                }
                else {

                    for (i = 0; i < ans_vocab_count_opt[j]; i++) {

                       ans_vocab_option[ans_vocab_choice] = ($('#options_ans_vocabulary' + ans_vocab_choice).val());
                        ans_vocab_choice++;

                    }
                }
            }
        }

        item2 = {};
        item = {};
        var ans_vocab_ch = 0;
        ans_vocab_ans_vocab = [];
        questions = {};
        ans_vocab_opt_obj = [];
       ans_vocab_options = {};
        ans_vocab_opt_arr = [];
        marks_ans_voc = no_of_ques_ans_vocabulary + "x" + each_mark_ans_vocabulary + "=" + mark_ans_voc;
        paragraph = {};
        var cnnt = 0;
        item1 = {};
        a = 0;
        b = 0;
           var start_num = st;
            cnnt = 0;
            ans_vocab_ch = 0;
            ans_vocab_count_opt = [];
            ans_vocab_opt_arr = [];

            for (i = 1; i <= ans_vocab_no_of_questions; i++) {
                $("#textbox_ans_vocabulary" + i).each(function () {
                    var inData = $(this).text();
                    if (inData != "") {
                        ans_vocab_ans_vocab.push(inData);
                    }
                    var ans_head = $("#eachHeading_ans_vocabulary" + i).val();
                    var high = $("#highlightedword_ans_vocabulary" + i).val();
                    ans_vocab_checkBox = document.getElementById("myCheck_ans_vocabulary" + i);
                    if (ans_vocab_checkBox.checked == true) {
                        ans_vocab_count_opt[i] = parseInt($('#noofoption_ans_vocabulary' + i).val());
                        cnnt += ans_vocab_count_opt[i];

                        for (j = 0; j < ans_vocab_count_opt[i]; j++) {
                           ans_vocab_option[ans_vocab_ch] = $('#options_ans_vocabulary' + ans_vocab_ch).val();
                         
                            if (ans_vocab_option[ans_vocab_ch] == 0) {
                                alert("Please enter the option which you selected");
                                break;
                            }
                            else {
                                console.log("Options : " +ans_vocab_option[ans_vocab_ch]);
                                ans_vocab_opt_obj.push(ans_vocab_option[ans_vocab_ch]);
                                ans_vocab_opt_arr.push(ans_vocab_option[ans_vocab_ch]);
                                ans_vocab_ch++;
                            }
                        }


                        if (ans_head != "" && high != "") {
                            questions[start_num] = { "heading": ans_head, "type": "MCQSL", "question": inData, "quotedWords": high, "quoteType": "underline", "options": ArrayToObject(ans_vocab_opt_obj) };
                        }
                        else if (ans_head != "" && high == "") {
                            questions[start_num] = { "heading": ans_head, "type": "MCQSL", "question": inData, "quotedWords": null, "quoteType": null, "options": ArrayToObject(ans_vocab_opt_obj) };
                        }
                        else if (ans_head == "" && high != "") {
                            questions[start_num] = { "heading": null, "type": "MCQSL", "question": inData, "quotedWords": high, "quoteType": "underline", "options": ArrayToObject(ans_vocab_opt_obj) };
                        }
                        else {
                            questions[start_num] = { "heading": null, "type": "MCQSL", "question": inData, "quotedWords": null, "quoteType": null, "options": ArrayToObject(ans_vocab_opt_obj) };
                        }
                        ans_vocab_opt_obj = [];
                    }
                    else {
                        if (ans_head != "" && high != "") {
                            questions[start_num] = { "heading": ans_head, "type": "MCQN", "question": inData, "quotedWords": high, "quoteType": "underline", "options": null };
                        }
                        else if (ans_head != "" && high == "") {
                            questions[start_num] = { "heading": ans_head, "type": "MCQN", "question": inData, "quotedWords": null, "quoteType": null, "options": null };
                        }
                        else if (ans_head == "" && high != "") {
                            questions[start_num] = { "heading": null, "type": "MCQN", "question": inData, "quotedWords": high, "quoteType": "underline", "options": null };
                        }
                        else {
                            questions[start_num] = { "heading": null, "type": "MCQN", "question": inData, "quotedWords": null, "quoteType": null, "options": null };
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
            console.log("retrived " + question_types[v]);
            var partarr = question_types[v];
            for (var h = 0; h < partarr.length; h++) {
                if ("Answer the following - I (Vocabulary)" == partarr[h]) {
                    partno = v - s_sec;
                    break;
                }
            }
        }

        item_ans_voc = {
            "heading": head,
            "marks": marks_ans_voc
        };

        obj_ans_voc = {
            "user": reg_teacher,
            "heading": head,
            "marks": marks_ans_voc
        };


        for (let key in questions) {
            item_ans_voc[key] = questions[key];
        }

        for (let key in questions) {
            obj_ans_voc[key] = questions[key];
        }



        if (ans_vocab_ans_vocab.length == ans_vocab_no_of_questions) {

            var arraySet = new Set(ans_vocab_opt_arr)
            if (arraySet.has("")) {
            }
            else {
                if (ans_vocab_opt_arr.length == cnnt) {
                    alert("Answer the following vocabulary is saved successfully!");
                    console.log(JSON.stringify(item_ans_voc,null,'\t'))
                    document.getElementById("getButtonValue_ans_vocabulary").value = "Saved!";
                    createAnsVocabulary(JSON.stringify(obj_ans_voc));
                    if (item_ans_voc != {}) {
                        if (part1.hasOwnProperty("part " + partno)) {
                            var temp_item = part1["part " + partno];
                            part1["part " + partno] = { ...temp_item, ...item_ans_voc };
                        }
                        else {
                            part1["part " + partno] = item_ans_voc;
                        }
                        item_ans_voc = {};
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

function getResultsAnsVocabulary(elem) {
    $(document).ready(function () {
        elem.checked && elem.value == "Numbers_ans_vocabulary" ? $("#dvtext_ans_vocabulary").show() : $("#dvtext_ans_vocabulary").hide();
    });
}

var text_ans_vocabulary = "";
    var count = 1;
    function myFunctionsAnsVocabulary(count) {
        $(document).ready(function () {
            text_ans_vocabulary = $("#textbox_ans_vocabulary" + count).text();
        });
    }


    function myhighlightAnsVocabulary(count) {
        $(document).ready(function () {
            var s = document.getElementById("highlightedword_ans_vocabulary" + count).value;
            var a = text_ans_vocabulary.replace(s, '<u>' + s + '</u>');
            text_ans_vocabulary = a;
            $("#textbox_ans_vocabulary" + count).html(a);
        });
    }

    function myfocusAnsVocabulary(count) {
        $(document).ready(function () {
            var s = document.getElementById("highlightedword_ans_vocabulary" + count).value;
            if (s == "" || s == null) {
            }
            else {
                var a = text_ans_vocabulary.replace('<u>' + s + '</u>', s);
                text_ans_vocabulary = a;
                $("#textbox_ans_vocabulary").html(a);
            }
        });
    }


    var ans_vocab_no_option = 0;
    var ans_vocab_numbering = 0;
    var ans_vocab_opt = 0;
    var ans_vocab_checkBox = "";
    var ans_vocab_counter = 1;
    var ans_vocab_count_opt = [];
    var ans_vocab_option = [];

    function myFunctionAnsVocabulary(ans_vocab_counter) {
        ans_vocab_checkBox = document.getElementById('myCheck_ans_vocabulary' + ans_vocab_counter);
        //ans_vocab_checkBox = document.querySelectorAll(".example");
        if (ans_vocab_checkBox.checked == true) {
            var table = document.getElementById("Check_ans_vocabulary" + ans_vocab_counter);
            table.innerHTML += '<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-2"><input type="text" min="0" name="total_mark" id="noofoption_ans_vocabulary' + ans_vocab_counter + '" class="form-control" placeholder="Number of Options"></div>&nbsp;<div class="col-sm-2"><input type="button" value="Create Options" class="btn btn-primary" id="addOption_ans_vocabulary' + ans_vocab_counter + '" onclick="addOptionAnsVocabulary(' + ans_vocab_counter + ')"></div></div><div id="option_ans_vocabulary' + ans_vocab_counter + '"></div><br>';

        } else {
            var table = document.getElementById("Check_ans_vocabulary" + ans_vocab_counter);
            while (table.firstChild) {
                table.removeChild(table.firstChild);
            }
        }

    }

    var n = 1;

    function addOptionAnsVocabulary(ans_vocab_counter) {

        for (i = 1; i <= num_ques_ans_voc; i++) {
            if (i == ans_vocab_counter) {
                break;
            }
        }


        ans_vocab_no_option = document.getElementById("noofoption_ans_vocabulary" + ans_vocab_counter).value;
        ans_vocab_numbering = 97;
        var table = document.getElementById("option_ans_vocabulary" + ans_vocab_counter);
        table.innerHTML = "";

        if (ans_vocab_no_option != 0) {
            for (i = 0; i < ans_vocab_no_option; i++) {
                var res = String.fromCharCode(ans_vocab_numbering);

                if (i == 0) {
                    table.innerHTML += '<br><br>';
                }

                table.innerHTML += '<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-3"><input type="text" min="0" name="total_mark" id="options_ans_vocabulary' + ans_vocab_opt + '" class="form-control" placeholder="Option - ' + res + '"></div></div>&nbsp;';
                ans_vocab_numbering++;
                
                ans_vocab_opt++;

            }
            n++;
        }
        else {
            alert("enter all options");
        }

    }

