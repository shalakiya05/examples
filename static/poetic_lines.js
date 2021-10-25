var show_mark = 0;

$(document).ready(function () {
    var poet_counter = 1;
    var counter1 = 1;
    var c = 97;
    var poet_no_of_questions = 0;
    var poet_total_marks = 0;
    var res = "";
    var head = "";
    var res1 = 1;
    var a = 0;
    var st = 0;
    var start_no = 0;
    var ques_no = 0;
    var headings = [];
    var ques = [];
    poet_option = [];
    poet_count_opt = [];
    var cnt = 1;
    poet_numbering = 0;
    poet_checkBox1 = "";
    var poet_choice = 0;
    var val = 0;
    var b = 0
    var num = 1;
    var poet_ch = 0;


    $(document).on('click', "#addButton_poet", function () {

        if (num > 1) {
            $("#poet_d").empty();
            poet_counter = 1;
        }
        num++;
        poet_option = [];
        $("#poet_d").append("<br><br>");
        poet_no_of_questions = $("#number-of-questions_poet").val();
        num_ques_poet = poet_no_of_questions;
        poet_opt1 = 0;
        poet_ch = 0;
        poet_total_marks = $("#marks_poet").val();
        mark_poet = poet_total_marks;
        // ques_no = $("#question-number_poet").val();
        head = $("#heading_poet").val();
        start_no = $("#starting-number_poet").val();
        st = start_no;
        if (poet_no_of_questions != 0 && poet_total_marks != 0 && head != "" && start_no != 0) {
            
            no_of_ques_poet = printNumQuestions(head, poet_no_of_questions);

            for (i = 0; i < poet_no_of_questions; i++) {
                $("#poet_d").append('<div class="row"><div class="col-sm-1"><label style="font-weight:bold;">' + start_no + '. </label></div>' +
                    '<div class="col-sm-9"><div style="height:200px; " name="eachHeading' + poet_counter + '" id="eachHeading_poet' + poet_counter + '" class="form-control" contenteditable="true" data-placeholder="Type your Poemline here..." cols="100" rows="4"></div></div>');
                // $("#poet_d").append('&nbsp;<div class="row"><div class="col-sm-1"><label></label></div>' + '<div class="col-sm-11"><div class="form-control" style="height:50px; overflow: auto;" name="textbox' + poet_counter + '" id="textbox_poet' + poet_counter + '" onkeyup="myFunctionsPoet(' + poet_counter + ')" class="form-control mt-2 mt-md-0" contenteditable="true" data-placeholder="Question" cols="200" rows="100"></div></div></div>' +
                //     '<br><div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-11"><input class="form-control mt-2 mt-md-0" type="text" id="highlightedword_poet' + poet_counter + '" onblur="myhighlightPoet(' + poet_counter + ')" onfocus="myfocusPoet(' + poet_counter + ')" placeholder="Highlighted word"/></div></div>');
                $("#poet_d").append('<div class="row"><div class="col-sm-1"><label></label></div>' + '<div id="Check_poet' + poet_counter + '"></div></div>');
                var table = document.getElementById("Check_poet" + poet_counter);
                //table.innerHTML = '<div class="row"><div class="col-sm-2"><input class="form-control mt-2 mt-md-0" type="text" id="eachmark_poet' + poet_counter + '" value="' + each_mark_poet + '"  placeholder="Mark" readonly></div></div>';
                table.innerHTML += '<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-2"><input type="text" min="0" name="total_mark" id="noofoption_poet' + poet_counter + '" class="form-control" placeholder="Number of Options"></div>&nbsp;<div class="col-sm-2"><input type="button" value="Create Options" class="btn btn-primary" id="addOption_poet' + poet_counter + '" onclick="addOptionPoet(' + poet_counter + ')"></div></div><div id="option_poet' + poet_counter + '"></div><br>';

                start_no++;

                $("#poet_d").append("<br>");
                poet_counter++;
            }
            $("#poet_d").append('<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-2"><input type="button" id="getButtonValue_poet"  class="test btn btn-primary" value="Save" ></div></div>');
        }

        else {
            alert("Please enter all the fields");
        }
    });



    $(document).on('click', "#getButtonValue_poet", function () {

        for (i = 1; i <= poet_no_of_questions; i++) {
            headings[i - 1] = $('#eachHeading_poet' + i).val();
            if (headings[i - 1] == "") {
                //alert("Please enter all the headings");
                break;
            }
            else {
                console.log("Headings : " + headings[i - 1]);
            }
        }

     

        poet_count_opt = [];
        val = 0;
        poet_choice = 0;
        for (j = 0; j < poet_no_of_questions; j++) {

            

                poet_count_opt[j] = $('#noofoption_poet' + (j + 1)).val();

                if (poet_count_opt[j] == 0) {
                    alert("Please enter number of options");
                    break;

                }
                else {

                    for (i = 0; i < poet_count_opt[j]; i++) {

                        poet_option[poet_choice] = ($('#options_poet' + poet_choice).val());
                        poet_choice++;

                    }
                }
            
        }

        item2 = {};
        item = {};
        poet_ch = 0;
        poet_ques_arr = [];
        poemlines = {};
        poet_questions = {};
        poet_opt_obj = [];
        options = {};
        
        poet_opt_arr = [];
        paragraph = {};
        var poet_cnnt = 0;
        item1 = {};
        a = 0;
        b = 0;
        var start_num = st;
    
        
        poet_count_opt = [];

        poet_opt_arr = [];
        for (i = 1; i <= poet_no_of_questions; i++) {
            var character = 97;
            $("#eachHeading_poet" + i).each(function () {
                
                var inData = $(this).text();
                if (inData != "") {
                    poet_ques_arr.push(inData);
                }
              
                poet_count_opt[i] = parseInt($('#noofoption_poet' + i).val());
                poet_cnnt += poet_count_opt[i];

                for (j = 0; j < poet_count_opt[i]; j++) {
                    var alpha = String.fromCharCode(character);
                    poet_option[poet_ch] = $('#options_poet' + poet_ch).val();

                    if (poet_option[poet_ch] == 0) {
                        alert("Please enter the option which you selected");
                        break;
                    }
                    else {
                        console.log("Options : " + poet_option[poet_ch]);
                        poet_opt_obj.push(poet_option[poet_ch]);
                        poet_opt_arr.push(poet_option[poet_ch]);
                        poet_questions[alpha]= poet_option[poet_ch];
                        poet_ch++;
                        character++;
                    }
                }


                poemlines[start_num] = { "heading": null, "type": "COMP", "quotedWords": inData,"question": poet_questions,"quoteType": null, "options": null }
                poet_opt_obj = [];
                poet_questions = {};
                
            });
            start_num++;
        }

      
        con_no = start_num;
        

        
        
        if(poet_no_of_questions < poet_cnnt){
            each_mark_poet = printEachMark(head, poet_total_marks, poet_no_of_questions);
        
        show_mark = each_mark_poet;
        marks_poet = no_of_ques_poet + "x" + each_mark_poet + "=" + mark_poet;
        }
        else{
            each_mark_poet = printEachMark(head, poet_total_marks, poet_cnnt);
            show_mark = each_mark_poet;
            marks_poet = no_of_ques_poet + "x" + each_mark_poet + "=" + mark_poet;
            }

        

        var partno = "";
        for (var v = s_sec + 1; v <= (parseInt(no_of_parts[sec_count]) + s_sec); v++) {
            console.log("retrived " + question_types[v] + " " + v);
            var partarr = question_types[v];
            for (var h = 0; h < partarr.length; h++) {
                if ("Poetic lines with questions" == partarr[h]) {
                    partno = v - s_sec;
                    break;
                }
            }
        }

        console.log(poemlines)

        item_poet = {
            "heading": head,
            "marks": marks_poet
        };
        obj_poet = {
            "user": reg_teacher,
            "heading": head,
            "marks": marks_poet
        };

        for (let key in poemlines) {
            item_poet[key] = poemlines[key];
        }
        for (let key in poemlines) {
            obj_poet[key] = poemlines[key];
        }

        if (poet_ques_arr.length == poet_no_of_questions) {

            var arraySet = new Set(poet_opt_arr)
            if (arraySet.has("")) {
            }
            else {
                if (poet_opt_arr.length == poet_cnnt) {
                    alert("Poetic lines with questions is saved successfully!");
                    console.log(JSON.stringify(item_poet, null, '\t'))

                    document.getElementById("getButtonValue_poet").value = "Saved!";
                    createPoeticLines(JSON.stringify(obj_poet));
                    if (item_poet != {}) {
                        if (part1.hasOwnProperty("part " + partno)) {
                            var temp_item = part1["part " + partno];
                            part1["part " + partno] = { ...temp_item, ...item_poet };
                        }
                        else {
                            part1["part " + partno] = item_poet;
                        }
                        item_poet = {};
                    }
                }
            }

        }
    });
   
});




var poet_no_option = 0;
var poet_numbering = 0;
var poet_opt1 = 0;
var poet_checkBox1 = "";
var poet_counter = 1;
var poet_count_opt = [];
var poet_option = [];

function myFunctionPoet(poet_counter) {
    poet_checkBox1 = document.getElementById('myCheck_poet' + poet_counter);
    //checkBox = document.querySelectorAll(".example");
    if (poet_checkBox1.checked == true) {

        var table = document.getElementById("Check_poet" + poet_counter);
        table.innerHTML += '<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-2"><input type="text" min="0" name="total_mark" id="noofoption_poet' + poet_counter + '" class="form-control" placeholder="Number of Options"></div>&nbsp;<div class="col-sm-2"><input type="button" value="Create Options" class="btn btn-primary" id="addOption_poet' + poet_counter + '" onclick="addOptionPoet(' + poet_counter + ')"></div></div><div id="option_poet' + poet_counter + '"></div><br>';

    } else {
        var table = document.getElementById("Check_poet" + poet_counter);
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

    }
}
function addOptionPoet(poet_counter) {

    poet_no_option = document.getElementById("noofoption_poet" + poet_counter).value;
    poet_numbering = 97;
    

    if (poet_no_option != 0) {

        // var tab = document.getElementById("option_poet" + poet_counter);
        // tab.innerHTML = '<div class="row"><div class="col-sm-2"><input class="form-control mt-2 mt-md-0" type="text" id="eachmark_poet' + poet_counter + '" value="' + show_mark + '"  placeholder="Mark" readonly></div></div>';

        for (i = 0; i < poet_no_option; i++) {
            var res = String.fromCharCode(poet_numbering);
            var table = document.getElementById("option_poet" + poet_counter);

            if (i == 0) {
                table.innerHTML += '<br><br>';
            }
            //table.innerHTML+='<input style="margin-left:90px;"type="text" min="0" name="total_mark" id="options'+i+'" class="form-control col-sm-2" placeholder="Option - '+res+'">&nbsp;';
            table.innerHTML += '<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-3"><input type="text" min="0" name="total_mark" id="options_poet' + poet_opt1 + '" class="form-control" placeholder="Question - ' + res + '"></div></div>&nbsp;';
            poet_numbering++;
            poet_opt1++;

        }
    }
    else {
        alert("enter all options");
    }
}


function getResultsPoet(elem) {
    $(document).ready(function () {
        elem.checked && elem.value == "Numbers_poet" ? $("#dvtext_poet").show() : $("#dvtext_poet").hide();
    });
}