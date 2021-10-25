$(document).ready(function () {
    $("#prosepara_dvtext").hide();

    var counter = 1;
    var counter1 = 1;
    var c = 97;
    var no_of_questions = 0;
    var total_marks = 0;
    var count3 = 0;
    var res = "";
    var head = "";
    var res1 = 1;
    var start_no = 0;
    var st = 0;
    var ques_no = 0;
    var para_ques = [];
    var cnt = 1;
    var num = 1;


    $(document).on('click', "#prosepara_addButton",function () {
        if (num > 1) {
            $("#prosepara").empty();
            counter = 1;
        }
        $("#prosepara").append("<br><br>");
        no_of_questions = $("#prosepara-number-of-questions").val();
        num_ques_pro_para = no_of_questions;
        total_marks = $("#prosepara_marks").val();
        mark_pro_para_ques = total_marks;
        ques_no = $("#prosepara-question-number").val();
        head = $("#prosepara_heading").val();
        start_no = $("#prosepara-starting-number").val();
        st = start_no;
        if (no_of_questions != 0 && total_marks != 0 && head != "" && ques_no != 0 && $("input[name=type]").is(":checked")) {
            each_mark_pro_para = printEachMark(head, total_marks, no_of_questions);
            no_of_ques_pro_para_ques = printNumQuestions(head, no_of_questions);
            var c1 = 97;
            var roman = 1;
            for (i = 0; i < no_of_questions; i++) {

                var res = String.fromCharCode(c1);

                if ($("input[name='type'][value='prosepara_Alphabets']").prop("checked")) {
                    $("#prosepara").append('<div class="row"><div class="col-sm-1"><label style="font-weight:bold;">' + res + '. </label></div>' +
                        '<div class="col-sm-8"><input type="text"  name="prosepara_textbox' + counter +
                        '" id="prosepara_textbox' + counter + '" value="" class="form-control input-lg" placeholder="Question"></div>' + '&nbsp;&nbsp;&nbsp;' + '<div class="col-sm-2"><input style=" text-align:center; "type="text" class="form-control" id="prosepara_eachmark' + counter + '" value="' + each_mark_pro_para + '" size="4" placeholder="Mark" readonly></div></div>'
                    );
                }

                else if ($("input[name='type'][value='prosepara_Numbers']").prop("checked")) {
                    if (start_no != 0) {
                        $("#prosepara").append('<div class="row"><div class="col-sm-1"><label style="font-weight:bold;">' + start_no + '. </label></div>' +
                            '<div class="col-sm-8"><input type="text" name="prosepara_textbox' + counter +
                            '" id="prosepara_textbox' + counter + '" value="" class="form-control input-lg" placeholder="Question"></div>' + '&nbsp;&nbsp;&nbsp;' + '<div class="col-sm-2"><input style=" text-align:center;"type="text" class="form-control" id="prosepara_eachmark' + counter + '" value="' + each_mark_pro_para + '" size="4" placeholder="Mark" readonly></div></div>'
                        );
                        start_no++;
                    }
                }

                else if ($("input[name='type'][value='prosepara_Roman letters']").prop("checked")) {
                    var res2 = integer_to_roman(roman);
                    $("#prosepara").append('<div class="row"><div class="col-sm-1"><label style="font-weight:bold;">' + res2 + '.</label></div>' +
                        '<div class="col-sm-8"><input type="text"  name="prosepara_textbox' + counter +
                        '" id="prosepara_textbox' + counter + '" value="" class="form-control input-lg" placeholder="Question"></div>' + '&nbsp;' + '<div class="col-sm-2"><input class="form-control w-5" style=" text-align:center;"type="text" id="prosepara_eachmark' + counter + '" value="' + each_mark_pro_para + '" size="4" placeholder="Mark" readonly></div></div>');
                    roman++;
                }
                $("#prosepara").append("<br>");
                c1++;
                counter++;
            }

            if ($("input[name='type'][value='prosepara_Alphabets']").prop("checked")) {
                $("#prosepara").append('<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-2"><input type="button" id="prosepara_getButtonValue"  class="test btn btn-primary" value="Save" ></div></div>');
            }

            else if ($("input[name='type'][value='prosepara_Numbers']").prop("checked")) {
                if (start_no != 0) {
                    $("#prosepara").append('<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-2"><input type="button" id="prosepara_getButtonValue"  class="test btn btn-primary" value="Save" ></div></div>');
                }
                else {
                    alert("Please enter the starting number");
                }
            }

            else if ($("input[name='type'][value='prosepara_Roman letters']").prop("checked")) {
                $("#prosepara").append('<div class="row"><div class="col-sm-1"><label></label></div><div class="col-sm-2"><input type="button" id="prosepara_getButtonValue"  class="test btn btn-primary" value="Save" ></div></div>');
            }

        }

        else {
            alert("Please enter all the fields");
        }
        num++;
    });

    $(document).on('click', "#prosepara_getButtonValue", function () {
        for (i = 1; i <= no_of_questions; i++) {
            para_ques[i - 1] = $('#prosepara_textbox' + i).val();
            if (para_ques[i - 1] == "") {
                alert("Please enter all the questions");
                break;
            }
            else {
                console.log(para_ques[i - 1]);
            }
        }

        item2 = {};
        item = {};

        marks_pro_para_ques = no_of_ques_pro_para_ques + "x" + each_mark_pro_para + "=" + mark_pro_para_ques;
        ques_arr = [];
        item1 = {};
        if ($("input[name='type'][value='prosepara_Numbers']").prop("checked")) {
            var start_num = st;
            for (i = 1; i <= no_of_questions; i++) {
                $("#prosepara_textbox" + i).each(function () {
                    var inData = $(this).val();
                    ques_arr.push(inData);
                    //var Mark = $("#eachmark"+i).val();
                    item[start_num] = inData;
                });
                start_num++;
            }
        }

        if (ques_no != 0) {
            con_no = parseInt(ques_no) + 1;
        }
        else {
            con_no = start_num;
        }

        if ($("input[name='type'][value='prosepara_Roman letters']").prop("checked")) {
            for (i = 1; i <= no_of_questions; i++) {
                var roman = integer_to_roman(i);
                $("#prosepara_textbox" + i).each(function () {
                    var inData = $(this).val();
                    ques_arr.push(inData);
                    item[roman] = inData;
                });
            }
        }

        if ($("input[name='type'][value='prosepara_Alphabets']").prop("checked")) {
            var character = 97;
            for (i = 1; i <= no_of_questions; i++) {
                var alpha = String.fromCharCode(character);
                $("#prosepara_textbox" + i).each(function () {
                    var inData = $(this).val();
                    ques_arr.push(inData);
                    item[alpha] = inData;
                });
                character++;
            }
        }

        var partno = "";
        for (var v = s_sec + 1; v <= (parseInt(no_of_parts[sec_count]) + s_sec); v++) {
            
            console.log("retrived " + question_types[v]);
            var partarr = question_types[v];
            for (var h = 0; h < partarr.length; h++) {
                if ("Paragraph questions (Prose)" == partarr[h]) {
                    partno = v - s_sec;
                    alert(s_sec)
                    break;
                }
            }
        }

        item2[ques_no] = { "heading": null, "marks": null, "type": "MCQCH", "question": item };
        item3 = { "heading": null, "marks": null, "question": item };
        item_pro_paraques = {
            "heading": head,
            "marks": marks_pro_para_ques,
            "quotedWords": null,
            "quoteType": null,
            "options": null
        };

        obj_pro_paraques = {
            "user": reg_teacher,
            "heading": head,
            "marks": marks_pro_para_ques,
            "quotedWords": null,
            "quoteType": null,
            "options": null
        };

        for (let key in item2) {
            item_pro_paraques[key] = item2[key];
        }
        for (let key in item3) {
            obj_pro_paraques[key] = item3[key];
        }

        if (ques_arr.length == no_of_questions) {
            var arraySet = new Set(ques_arr)
            if (arraySet.has("")) {
            }
            else {
                alert("Prose paragraph questions is saved successfully!");
                document.getElementById("prosepara_getButtonValue").value = "Saved!";
                // createProseParaQuestions(JSON.stringify(obj_pro_paraques));
                if (item_pro_paraques != {}) {
                    if (part1.hasOwnProperty("part " + partno)) {
                        var temp_item = part1["part " + partno];
                        part1["part " + partno] = { ...temp_item, ...item_pro_paraques };
                    }
                    else {
                        part1["part " + partno] = item_pro_paraques;
                    }
                    item_pro_paraques = {};
                    console.log(JSON.stringify(part1,null,'\t'))
                }
            }

        }
    });
});

function getResults_prosepara(elem) {
    $(document).ready(function () {
        elem.checked && elem.value == "prosepara_Numbers" ? $("#prosepara_dvtext").show() : $("#prosepara_dvtext").hide();
    })

};