/** 
 * Admissible Client Height is 1120
*/


/**
 * Global Declaration Space
 */

var dataObject;
const maintable = document.getElementById('main-table');
let second_table = document.getElementById('main-table-2');
var whole_table = document.getElementById('whole');
var paper_title;
var reg;

// var student_regno = localStorage.getItem("regno");
//     var std = localStorage.getItem("class");
//     var sub_name = localStorage.getItem("subject");

//     var section = localStorage.getItem("section");
//     var school_name = localStorage.getItem("schoolname");
//     var assign_no = localStorage.getItem("assign-no");
// var printdata = JSON.parse(localStorage.getItem("sendprint"));

var printdata = JSON.parse(localStorage.getItem("sendprint"));
var student_regno = printdata["regno"];
var std = printdata["class"];
var sub_name = printdata["subject"];

var section = printdata["section"];
var school_name = printdata["schoolname"];
var assign_no = printdata["assign-no"];

var send = new FormData();
send.append('regno', student_regno);
send.append('class', std);
send.append('subject', sub_name);
send.append('section', section);
send.append('assign-no', assign_no);
send.append('schoolname', school_name);

fetch('/assignment/print', {
    method: 'POST',
    body: send
}).then(function (response) {

    //console.log(response);

    return response.json();

}).then(function (data) {
    console.log(data);
    if (data.status == "failed" && data.response == "Assignment submission for " + student_regno + " not found") {
        alert("Assignment not found")
    }
    else {
        dataObject = data;
        main();
    }


});

/* ITERATING THE JSON OBJECT */

function main() {
    var sch_name;
    var bar_code = '';
    //maintable.innerHTML = '';
    var table = '';

    maintable.innerHTML += `<div style="padding: 20px"><h1 style="text-align: center; vertical-align: middle; font-size: 25px; font-weight: bold;">Assignment</h1></div>`;

    for (let key in dataObject) {



        // if (key == "type of test") {
        //     if (dataObject[key] == "SSLC Examination" || dataObject[key] == "HSC Examination") {

        //     }
        //     else {
        //         let test = `<table class="mx-auto"><tr style="font-size: 25px;">
        //         <td style="text-align: center; vertical-align: middle;"><b>`+ dataObject[key] + `</b></td>` +
        //             `<tr></table>`;
        //         maintable.innerHTML += test;

        //     }
        //     //paper_title += sch_name;
        //     sch_name = dataObject[key];

        // }

        // else if (key == "school name") {

        //     if (sch_name == "Quarterly Examination" || sch_name == "Half-yearly Examination" || sch_name == "Annual Examination" || sch_name == "SSLC Examination" || sch_name == "HSC Examination") {

        //     }
        //     else {
        //         let school = `<table class="mx-auto"><tr style="font-size: 25px;">
        //         <td style="text-align: center; vertical-align: middle;"><b>`+ dataObject[key] + `</b></td>` +
        //             `<tr></table>`;
        //         maintable.innerHTML += school;

        //     }
        // }

        // else if (key == "standard") {

        //     if (sch_name == "SSLC Examination" || sch_name == "HSC Examination") {

        //     }
        //     else {
        //         let std = `<table class="mx-auto"><tr style="font-size: 25px;">
        //         <td style="text-align: center; vertical-align: middle;"><b>`+ dataObject[key] + `</b></td>` +
        //             `<tr></table>`;
        //         maintable.innerHTML += std;
        //     }
        // }

        if (key == "regno") {

            reg = dataObject[key];

            res = [];
            let html = '';

            html += '<table class="mt-5" style="width: 100%; " id="user"><tr>' +
                '<td><b>Register Number : </b>'+dataObject[key]+'</td><td/>';
            // for (const s2 of reg) {
            //     res.push(s2);
            //     html += '<div class="box" />' + s2 + '</div>';
            // }
            // console.log(res);
            html += '<td><b>Class : </b>'+dataObject["class"]+' - '+dataObject["section"]+'</td></tr>';
            
            html += '<tr><td><b>Subject : </b>'+dataObject["subject"]+'</td><td/>';

            html += '<td><b>Marks : </b>'+dataObject["mark"]+'</td></tr>';
            
            html += '</table>';

            bar_code = dataObject[key] + '-';
            maintable.innerHTML += html;

        }




        else if (key == "subject") {
            // let title = `<table class="mx-auto"><tr style="font-size: 25px;">
            //     <td style="text-align: center; vertical-align: middle;"><b>`+ dataObject[key] + `</b></td>` +
            //     `<tr></table>`;
            // maintable.innerHTML += title;
            paper_title = dataObject["regno"]+'_'+dataObject[key] + '_' + 'Assignment';
            document.getElementById("paper_title").innerHTML = paper_title;


        }


        else if (key == "mark") {
            // let title =
            //     `<table class="mt-5"><tr style="font-size: 15px; width:100%;">` +
            //     // `<td style="width:35%;">Time Allowed: ` + dataObject[key] + `</td>` +
            //     `<td class="align-right" style="width:70%;">Maximum Marks: ` + dataObject["mark"] + `</td>` +
            //     `</tr></table>`;
            // maintable.innerHTML += title;
        }

        else if (key == "maximum marks") {

        }
        else if (key == "class") {

        }

        else if (key == "schoolname") {

        }

        else if (key == "assign-no") {

        }

        else if (key == "section") {
            bar_code += dataObject[key];
            //alert()
            //get_barcode(bar_code);
            //document.getElementById('barcode').value = '';



            //document.getElementById('barcode').value = ;
        }

        else if (key == "user") {

        }

        else if (key == "tag") {

        }


        else if (key == "submitted_date") {

        }

        else if (key == "submitted_time") {

        }


        // else if (key == "instructions") {
        //     let instructionsStatement = '<table style="width:100%; margin-top:0mm"><tr> <td rowspan="2" style="vertical-align:text-top; width:20%;"><b>Instructions:</b></td>';
        //     let instructions = dataObject["instructions"];
        //     let line = 1;
        //     instructions.forEach((value, index) => {
        //         if (line++ != 1)
        //             instructionsStatement += '<td style="width:8%;">(' + (index + 1) + ')</td> <td>' + value + '</td>';
        //         else
        //             instructionsStatement += '<td style="width:8%;">(' + (index + 1) + ')</td> <td>' + value + '</td>';
        //         instructionsStatement += '</tr>'
        //     });
        //     instructionsStatement += '</tr></table>'
        //     maintable.innerHTML += instructionsStatement;
        //     // whole_table.innerHTML = '';
        //     // whole_table.append(maintable);


        // }

        else {

            second_table.innerHTML += print_section(key, dataObject[key]);

            //whole_table.append(table);


        }

    }
    // maintable.innerHTML += `<table  style="width:100%; height:100%; page-break-after: always;"></table>`;

}






/**
 * Section Printing Utility
 */

function print_section(section_name, section_data) {

    let question = section_data;
    let mcq_none = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + section_name + `.</b></td>`;
    let question_data = '';


    if (question["heading"] != null) {

        mcq_none += `<td>` + question["heading"] + `</td></tr>`;

        if (question["quotedWords"] != null) {
            /* Temporary Changes */
            // if (question["quotedWords"].length > 15) {
            //     question_data += question["quotedWords"] + '<br>' + question["question"];
            // }
            // else {
            question_data = quote(question["question"], question["quotedWords"], question["quoteType"]);
            //}
        }
        else {

            question_data = question["question"];
        }

        mcq_none += `<tr><td /><td>` + question_data + `</td></tr>`;

    }

    else {
        if (question["quotedWords"] != null) {
            // /* Temporary Changes */
            // if (question["quotedWords"].length > 10) {
            //     question_data += question["quotedWords"] + '<br>' + question["question"];
            // }
            // else {
            question_data = quote(question["question"], question["quotedWords"], question["quoteType"]);
            //}
        }
        else {
            question_data = question["question"];
        }

        mcq_none += `<td>` + question_data + `</td></tr>`;
    }

    mcq_none += '</table>';

    if (question["options"] != null) {
        let options_list = question["options"];
        mcq_none += '</table><table class="no-margin"><tr><td style="width:7.5%" />';

        options_list.forEach((value, index) => {
            mcq_none += '<td class="no-padding" style="width:5%">(' + (index + 1) + ')</td>';
            mcq_none += '<td class="no-padding">' + value + '</td>';
        });

        mcq_none += `</tr></table>`;


    }

    if (question["image"] != null) {
        let image = question["image"];

        image = image.replace(/\s/g, '+');

        mcq_none+= `<table style="width:100%;" class="mt-5">`+
    '<tr><td class="no-padding" style="width:5%" /><td><img src=' + image + '  width="350" height="350" alt="Image Here"></td><td/></tr></table>';
    }

   
    if(question["answer"] != null){
        let answer_data = question["answer"];

        mcq_none += '<table>';
    
        mcq_none += '<tr><td style="width:5%;"></td><td><b>Answer : </b>'+answer_data+'</td>';
    
    
        mcq_none += '</tr></table>';
    }


    console.log(section_name.toUpperCase() + " PARSED");


    return mcq_none;


}

/* FUNCTION TO CHOOSE THE PARSE BASED ON TYPES */
function choose_parser(parse_type, question_no, question_data, table) {
    switch (parse_type) {
        case "MCQSL":
            table.innerHTML += mcq_single_line_parser(question_no, question_data);
            break;
        case "MCQML":
            table.innerHTML += mcq_multiline_parser(question_no, question_data);
            break;
        case "MCQB":
            table.innerHTML += mcq_bracket_parser(question_no, question_data);
            break;
        case "MCQN":
            table.innerHTML += mcq_none_parser(question_no, question_data);
            break;
        case "MCQMLA":
            table.innerHTML += mcq_multiline_array_parser(question_no, question_data);
            break;
        case "MCQCH":
            table.innerHTML += or_type(question_no, question_data);
            break;
        case "POT":
            table.innerHTML += poem_or_type(question_no, question_data);
            break;
        case "COMP":
            table.innerHTML += comp_type(question_no, question_data);
            break;
        case "COMPIMG":
            table.innerHTML += comp_img_type(question_no, question_data);
            break;
        case "SYN":
            table.innerHTML += synonyms_parser(question_no, question_data);
            break;
        case "MATCH":
            table.innerHTML += match(question_no, question_data);
            break;
        case "FORMAL":
            table.innerHTML += formal_letter(question_no, question_data);
            break;
        case "INFORMAL":
            table.innerHTML += informal_letter(question_no, question_data);
            break;
        case "FILL":
            table.innerHTML += fill_blanks(question_no, question_data);
            break;
        case "POEM":
            table.innerHTML += poem_phrase(question_no, question_data);
            break;
        case "TRAPIC":
            table.innerHTML += trapic(question_no, question_data);
            break;
    }
}

function get_barcode(code_text) {

    /**
     * Library: JsBarcode
     * Docs: https://lindell.me/JsBarcode/
     */

    JsBarcode("#barcode" + reg, code_text, {
        width: 1,
        height: 40,
        displayValue: false
    });


}

function move_back() {
    location.href = "/teacher/assign/" + printdata["class"] + "th-standard";
}