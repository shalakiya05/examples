console.log("PARSER INCLUDED!");
var SYN_FLAG = 0;

/**
 * PARSER TYPES
 *
 * MCQ SINGLE LINE - MCQSL
 * MCQ MULTI LINE - MCQML
 * MCQ BRACKET - MCQB
 * MCQ NONE - MCQN
 * MCQ MULTI LINE ARRAY - MCQMLA
 * OR TYPE - ORTYPE
 * POEM OR TYPE - POT (Removed)
 * COMPREHENSION TEXT- COMP
 * COMPREHENSION IMAGE - COMPIMG
 */


function quote(question_data, quotedWords, quoteType) {
    console.log(quotedWords, question_data);


    switch (quoteType) {
        case "underline":
            var a = question_data.replace(quotedWords, '<u>' + quotedWords + '</u>');
            question_data = a;
            break;
        case "bold":
            var a = question_data.replace(quotedWords, '<b>' + quotedWords + '</b>');
            question_data = a;
            break;
        case "italic":
            var a = question_data.replace(quotedWords, '<i>' + quotedWords + '</i>');
            question_data = a;
            break;
    }

    return question_data;
}

function high(para_graph, quotedWords, quoteType) {
    console.log(para_graph, quotedWords, quoteType);

    switch (quoteType) {
        case "underline":
            for (var key in quotedWords) {
                if (quotedWords.hasOwnProperty(key)) {
                    var val = quotedWords[key];
                    var a = para_graph.replace(val, '<u>' + val + '</u>');
                    para_graph = a;
                }
            }
            return para_graph;
        case "bold":
            for (var key in quotedWords) {
                if (quotedWords.hasOwnProperty(key)) {
                    var val = quotedWords[key];
                    var a = para_graph.replace(val, '<b>' + val + '</b>');
                    para_graph = a;
                }
            }
            return para_graph;

        case "italic":
            for (var key in quotedWords) {
                if (quotedWords.hasOwnProperty(key)) {
                    var val = quotedWords[key];
                    var a = para_graph.replace(val, '<i>' + val + '</i>');
                    para_graph = a;
                }
            }
            return para_graph;
    }


}

/* SYNONYMS AND ANTONYMS PARSER */
function synonyms_parser(ques_no, partData) {
    let result_table = '';

    let question = partData;


    let syn_table = `<table style="width:100%;" class="mt-5"><tr>`;
    syn_table += `<td style="width:5%;"><b>` + ques_no + `.</b></td>` + `<td>` + question["heading"] + `</td>
        <td style="width:12%"><b>`+ question["marks"] + `</b></td></tr>`;
    let paragraph = '';
    let paragraph_data = question["paragraph"];

    let q_word = question["quotedWords"];
    let q_type = question["quoteType"];

    paragraph_data.forEach((value) => {
        paragraph += value;
        paragraph += '. ';
    });

    let para_graph = high(paragraph, q_word, q_type);

    syn_table += '<tr> <td></td> <td colspan=2 style="width:80%" class="justify">' + para_graph + '</td></tr>';
    syn_table += `</table>`;

    syn_table += `<table style="width=100%;margin-top:0mm;">`;



    let options = question["options"];
    for (options_key in options) {
        let options_list = options[options_key];
        syn_table += '<tr><td class="no-padding" style="width:10%"></td>'
        syn_table += '<td style="width:7.5%">(' + options_key + ')</td>';

        options_list.forEach((value, index) => {
            syn_table += '<td class="no-padding" style="width:5%">(' + (index + 1) + ')</td>';
            syn_table += '<td class="no-padding">' + value + '</td>';
        });

        syn_table += '</tr>'
    }

    syn_table += `</table>`;

    let answer_data = question["answer"];

    syn_table += '<table>';

    syn_table += '<tr><td style="width:5%;"></td><td><b>Answers : </b> </td></tr>';

    for (answer_key in answer_data) {
        let answer_opt = parseInt(answer_key) + 1;
        syn_table += '<tr><td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td></tr>';

    }

    syn_table += `</table>`;

    result_table += syn_table;

    return result_table;
}

function fill_blanks(ques_no, question) {
    let fill = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + ques_no + `.</b></td><td>` + question["heading"] + `</td><td class="marks">` + question["marks"] + `</td></tr>`;
    let paragraph = '';
    let paragraph_data = question["paragraph"];

    paragraph_data.forEach((value) => {
        paragraph += value;

    });

    fill += '<tr> <td></td> <td colspan=2 style="width:80%" class="justify">' + paragraph + '</td></tr>';
    // if (question["paragraph"] != null) {

    //     fill += ``;

    //     let question_data = quote(question["question"], question["quotedWords"], question["quoteType"]);
    //     fill += `<tr> <td/> <td>` + question_data + `</td></tr>`;
    // }
    // else {
    //     let question_data = quote(question["question"], question["quotedWords"], question["quoteType"]);

    //     fill += `<td>` + question_data + `</td></tr>`;
    // }

    fill += '</table>';

    let words = ["1)","(1)","1","a)","(a)","a","i)","(ii)","ii"];

    let ch;

    for(var i=0;i< words.length;i++){
        if (paragraph.includes(words[i])) {
            ch = words[i];
        }
    }



    fill += '<table style="width:100%;" class="mt-5">';
    for (let option in question["options"]) {

        fill += '<tr><td style="width:5%;"/><td style="width:7.5%">(' + option + ')</td>';
        fill += '<td class="no-padding" >' + question["options"][option] + '</td></tr>';
    }
    fill += '</table>';

    let answer_data = question["answer"];

    fill += '<table>';

    fill += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

    for (answer_key in answer_data) {

        fill += '<tr>';

        let answer_opt = parseInt(answer_key) + 1;

        if (answer_data[answer_key] != null) {

            if (isRomanSmall(ch)) {

                fill += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
            }

            else if (isNaN(parseInt(ch))) {
                fill += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
            }

            else {
                fill += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
            }

            fill += '</tr>';

        }


    }

    fill += '</table>';

    return fill;
}

/* MATCH PARSER  */

function match(ques_no, question) {
    let mat_type = '<table style="width:100%;" ><tr>' +
        '<td style="width:5%"><b>' + ques_no + '.</b></td><td>' + question["heading"] + '</td><td class="marks">' + question["marks"] + '</td></tr></table>';
    mat_type += '<table style="width:40%; float:left;">';
    let ch;
    for (let q_no in question["questions"]) {
        ch = q_no;
        mat_type += '<tr><td style="width:13%;"></td>';
        mat_type += '<td>(' + q_no + ')' + ' ' + question["questions"][q_no] + ' </td><td style="width:20%; text-align:center;"> - </td></tr>';
    }
    mat_type += '</table>';



    mat_type += '<table style="width:50%;" >';


    for (let opt_no in question["options"]) {

        mat_type += '<tr><td style="width:5%">' + ' ' + question["options"][opt_no] + '</td></tr>';
    }

    mat_type += '</table>';

    let answer_data = question["answer"];

    mat_type += '<table>';

    mat_type += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

    for (answer_key in answer_data) {

        mat_type += '<tr>';

        let answer_opt = parseInt(answer_key) + 1;

        if (answer_data[answer_key] != null) {

            if (isRomanSmall(ch)) {

                mat_type += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
            }

            else if (isNaN(parseInt(ch))) {
                mat_type += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
            }

            else {
                mat_type += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
            }

            mat_type += '</tr>';

        }


    }

    mat_type += '</table>';

    return mat_type;
}

/* LETTER WRITING */

function formal_letter(ques_no, question) {
    let let_type = '<table style="width:100%;" ><tr>' +
        '<td style="width:5%"><b>' + ques_no + '.</b></td><td/><td class="marks">' + question["marks"] + '</td></tr></table>';

    let ch;
    if (question["answer"] !=""){

    for (let q_no in question["questions"]) {

        ch = q_no;
        let_type += '<table style="width:100%;">';

        let_type += '<tr><td style="padding-left:70px;">(' + q_no + ')' + ' ' + question["questions"][q_no]["question"] + '</td></tr>';

        let_type += '<tr><td style="padding-left:70px;"><b>Answer : </b></td></tr>';

        let_type += '<tr><td style="padding-left:70px;">From</td></tr>';
        // let_type += '<tr><td></td>';
        question["questions"][q_no]["from-address"].forEach((value) => {

            let_type += '<tr><td style="padding-left:130px;">' + value + '</td></tr>';
        });

        let_type += '</table>';

        let_type += '<table style="width:100%;">';

        let_type += '<tr><td style="padding-left:70px;">To</td></tr>';
        // let_type += '<tr><td></td>';
        question["questions"][q_no]["to-address"].forEach((value) => {

            let_type += '<tr><td style="padding-left:130px;">' + value + '</td></tr>';
        });

        let_type += '</table>';

        let_type += '<table style="width:100%;">';

        let_type += '<tr><td style="padding-left:70px;">Respected Sir/Madam,</td></tr>';

        if (question["questions"][q_no]["subject"] != "") {

            let_type += '<tr><td style="padding-left:170px;">Sub : ' + question["questions"][q_no]["subject"] + '</td></tr>';

        }

        let answer_data = question["answer"];

        let_type += '<table>';

        for (answer_key in answer_data) {

            let_type += '<tr>';

            let answer_opt = parseInt(answer_key) + 1;

            if (answer_data[answer_key] != null) {

               
                let_type += '<td style="width:5%;"></td><td>' + answer_data[answer_key] + '</td>';
               

                let_type += '</tr>';

            }

        }

        let_type += '<tr><td/><td style="text-align:center;">Thanking you,</td></tr>';

        let_type += '</table>';

        let_type += '<table style="width:100%;">';

        let_type += '<tr><td style="padding-left:70px;">Place : ' + question["questions"][q_no]["place"] + '</td><td style="padding-left: 300px;">' + question["questions"][q_no]["yours"] + '</td></tr>';

        let_type += '<tr>';

        let_type += '<td style="padding-left:70px;">Date : ' + question["questions"][q_no]["date"] + '</td><td style="padding-left: 320px;">' + question["questions"][q_no]["name"] + '</td></tr>';

        let_type += '</table>';
    }
}


    return let_type;
}

/* INFORMAL LETTER WRITING */

function informal_letter(ques_no, question) {
    let inlet_type = '<table style="width:100%;" ><tr>' +
        '<td style="width:5%"><b>' + ques_no + '.</b></td><td/><td class="marks">' + question["marks"] + '</td></tr></table>';

    let ch;

    if(question["answer"] !=""){

    for (let data in question["questions"]) {

        ch = data;

        inlet_type += '<table style="width:100%;">';

        inlet_type += '<tr><td style="padding-left:70px;" >(' + data + ')' + ' ' + question["questions"][data]["question"] + '</td></tr>';

        inlet_type += '<tr><td style="padding-left:70px;"><b>Answer : </b></td></tr>';

        question["questions"][data]["place"].forEach((value) => {


            inlet_type += '<tr><td style="padding-left:650px;">' + value + '</td></tr>';
        });

        inlet_type += '<tr><td style="padding-left:650px;">' + question["questions"][data]["date"] + '</td><tr>';

        inlet_type += '</table>';

        inlet_type += '<table style="width:100%;">';

        inlet_type += '<tr><td style="padding-left:70px;">' + question["questions"][data]["start"] + '</td></tr>';
       

        inlet_type += '</table>';

        let answer_data = question["answer"];

                inlet_type += '<table>';

               
                for (answer_key in answer_data) {

                    inlet_type += '<tr>';

                    let answer_opt = parseInt(answer_key) + 1;

                    if (answer_data[answer_key] != null) {

                       
                        inlet_type += '<td style="width:5%;"></td><td>' + answer_data[answer_key] + '</td>';
                       

                        inlet_type += '</tr>';

                    }

                }

                inlet_type += '</table>';



        inlet_type += '<table style="width:100%;">';

        inlet_type += '<tr><td/><td style="padding-left: 200px;">' + question["questions"][data]["yours"] + '</td></tr>';

        inlet_type += '<tr><td/><td style="padding-left: 220px;">' + question["questions"][data]["name"] + '</td></tr>';

        inlet_type += '</table>';

        inlet_type += '<table style="width:100%;">';

        inlet_type += '<tr><td style="padding-left:70px;">Address on the envelope:</td></tr>';

        inlet_type += '<tr><td style="padding-left:70px;">To</td></tr>';

        question["questions"][data]["envelope"].forEach((value) => {

            inlet_type += '<tr><td style="padding-left:100px;">' + value + '</td></tr>';
        });

        inlet_type += '</table>';
    }
}

        return inlet_type;
}

/* MCQML PARSER */

function mcq_multiline_parser(ques_no, question) {
    let mcq_multiline = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + ques_no + `.</b></td>`;

    if (question["heading"] != null) {
        mcq_multiline += `<td>` + question["heading"] + `</td></tr>`;
        let question_data = quote(question["question"], question);
        mcq_multiline += `<tr> <td/> <td>` + question_data + `</td></tr>`;

    }
    else {

        let question_data = quote(question["question"], question);

        mcq_multiline += `<td>` + question_data + `</td></tr>`;
    }

    mcq_multiline += `</table>`;

    mcq_multiline += `<table class="no-margin">`;
    for (option_key in question["options"]) {
        mcq_multiline += `<tr><td style="width:5%" /><td style="width: 7.5%">(` + option_key + `)</td><td>` + question["options"][option_key] + `</td></tr>`;
    }

    mcq_multiline += `</table>`;

    return mcq_multiline;
}


/* MCQSL PARSER */

function mcq_single_line_parser(ques_no, question) {
    let mcq_single_line = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + ques_no + `.</b></td>`;

    if (question["heading"] != null) {

        mcq_single_line += `<td>` + question["heading"] + `</td></tr>`;

        let question_data = quote(question["question"], question["quotedWords"], question["quoteType"]);
        mcq_single_line += `<tr> <td/> <td>` + question_data + `</td></tr>`;
    }
    else {
        let question_data = quote(question["question"], question["quotedWords"], question["quoteType"]);

        mcq_single_line += `<td>` + question_data + `</td></tr>`;
    }

    mcq_single_line += '</table><table class="no-margin"><tr><td style="width:5%" />';

    for (option_key in question["options"]) {
        mcq_single_line += `<td style="width: 7.5%">(` + option_key + `)</td><td>` + question["options"][option_key] + `</td>`;
    }

    mcq_single_line += `</tr></table>`;


    let answer_data = question["answer"];

    mcq_single_line += '<table>';

    mcq_single_line += '<tr><td style="width:5%;"></td><td><b>Answer : </b>';

    for (answer_key in answer_data) {
        // let answer_opt = parseInt(answer_key) + 1;
        mcq_single_line += answer_data[answer_key];

    }

    mcq_single_line += '</td></tr></table>';

    return mcq_single_line;
}


/* MCQB PARSER */
function mcq_bracket_parser(ques_no, question) {
    let mcq_b = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + ques_no + `.</b></td>`;

    if (question["heading"] != null) {
        let heading_data = quote(question["heading"], question);
        mcq_b += `<td>` + heading_data + `</td></tr>`;
        mcq_b += '<tr> <td/> <td>' + question["question"] + '(';
        for (option_key in question["options"]) {
            mcq_b += question["options"][option_key] + ', ';
        }
        mcq_b += ') </td></tr>';
    }
    else {
        mcq_b += '<td>' + question["question"] + '(';

        for (option_key in question["options"]) {
            mcq_b += question["options"][option_key] + ', ';
        }

        mcq_b += ') </td></tr>'
    }

    mcq_b += '</table>';

    return mcq_b;
}


/* MCQ NONE PARSER */
function mcq_none_parser(ques_no, question) {
    let mcq_none = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + ques_no + `.</b></td>`;
    let question_data = '';

    if (question["heading"] != null) {

        mcq_none += `<td>` + question["heading"] + `</td></tr>`;

        if (question["quotedWords"] != null) {
            /* Temporary Changes */
            if (question["quotedWords"].length > 15) {
                question_data += question["quotedWords"] + '<br>' + question["question"];
            }
            else {
                question_data = quote(question["question"], question["quotedWords"], question["quoteType"]);
            }
        }
        else {

            question_data = question["question"];
        }

        mcq_none += `<tr><td /><td>` + question_data + `</td></tr>`;

    }
    else {
        if (question["quotedWords"] != null) {
            /* Temporary Changes */
            if (question["quotedWords"].length > 10) {
                question_data += question["quotedWords"] + '<br>' + question["question"];
            }
            else {
                question_data = quote(question["question"], question["quotedWords"], question["quoteType"]);
            }
        }
        else {
            question_data = question["question"];
        }

        mcq_none += `<td>` + question_data + `</td></tr>`;
    }

    mcq_none += '</table>';

    let answer_data = question["answer"];

    mcq_none += '<table>';

    mcq_none += '<tr><td style="width:5%;"></td><td><b>Answer : </b>';

    for (answer_key in answer_data) {
        // let answer_opt = parseInt(answer_key) + 1;
        mcq_none += answer_data[answer_key];

    }

    mcq_none += '</td></tr></table>';


    return mcq_none;
}


/* MCQ ML ARRAY PARSER */
function mcq_multiline_array_parser(ques_no, question) {
    let mcq_mla = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + ques_no + `.</b></td>`;
    let question_data = '';
    if (question["heading"] != null) {

        mcq_mla += `<td>` + question["heading"] + `</td></tr></table><table class="no-margin">`;

        question["question"].forEach(element => question_data += '<tr><td>' + element + '</td></tr>');

        mcq_mla += question_data;

    }
    else {

        question["question"].forEach(element => question_data += '<tr><td>' + element + '</td></tr>');
        mcq_mla += `</tr></table><table>` + question_data;
    }
    mcq_mla += '</table>';
    return mcq_mla;
}

function or_type(ques_no, question) {
 
    let or_type = '<table style="width:100%;" ><tr>' +
        '<td style="width:5%"><b>' + ques_no + '.</b></td>';
    let ch;
    if(question["heading"] !=null || question["heading"] != undefined){
        or_type += '<td>' + question["heading"] + '</td><td class="marks">'+question["marks"]+'</td>';
    or_type += '</tr><tr>';
   
    let count = 0;
    for(let qno in question["question"]){
        count++;
    }
   
    for (let q_no in question["question"]) {
        ch = q_no;
        if(isRomanSmall(q_no)){
            or_type += '<td></td>';
            or_type += '<td style="width:5%">(' + q_no + ')' + ' ' + question["question"][q_no] + '</td></tr>';
       
            if(count>roman_to_Int(q_no)){
              or_type += '<tr><td/><td style="text-align: center;"><b>OR</b></td></tr>';
            }
            else{
                break;
            }
        }

        else if(isNaN(parseInt(q_no))){
            or_type += '<td></td>';
            or_type += '<td style="width:5%">(' + q_no + ')' + ' ' + question["question"][q_no] + '</td></tr>';
       
            if(count>sumChars(q_no)){
                or_type += '<tr><td/><td style="text-align: center;"><b>OR</b></td></tr>';
            }
            else{
                break;
            }
        }
       
        else{  
            or_type += '<td></td>';
            or_type += '<td style="width:5%">(' + (parseInt(q_no)) + ')' + ' ' + question["question"][q_no] + '</td></tr>';
           
            if(count>parseInt(q_no)){
                or_type += '<tr><td/><td style="text-align: center;"><b>OR</b></td></tr>';
            }
            else{
                break;
            }      
        }
       
     
       
    }
   
    or_type += '</table>';
}
else{
    let count = 0;
    for (let qno in question["question"]) {
        count++;
    }
    for (let q_no in question["question"]) {
        ch = q_no;
        // or_type += '<td style="width:7.5%">(' + q_no + ')</td>';
        // or_type += '<td class="no-padding">' + question["question"][q_no] + '</td></tr>';
        if (isRomanSmall(q_no)) {
            or_type += '<td style="width:7.5%">(' + q_no + ')</td>';
            or_type += '<td class="no-padding">' + question["question"][q_no] + '</td></tr>';

            if (count > roman_to_Int(q_no)) {
                or_type += '<tr><td/><td/><td style="text-align: center;"><b>OR</b></td></tr>';
            }
            else {
                break;
            }
        }

        else if (isNaN(parseInt(q_no))) {
            or_type += '<td style="width:7.5%">(' + q_no + ')</td>';
            or_type += '<td class="no-padding">' + question["question"][q_no] + '</td></tr>';

            if (count > sumChars(q_no)) {
                or_type += '<tr><td/><td/><td style="text-align: center;"><b>OR</b></td></tr>';
            }
            else {
                break;
            }
        }

        else {
            or_type += '<td style="width:7.5%">(' + q_no + ')</td>';
            or_type += '<td class="no-padding">' + question["question"][q_no] + '</td></tr>';

            if (count > parseInt(q_no)) {
                or_type += '<tr><td/><td/><td style="text-align: center;"><b>OR</b></td></tr>';
            }
            else {
                break;
            }
        }
        or_type += '<tr><td/>';
    }

    or_type += '<td/><td/></tr></table>';
}

let answer_data = question["answer"];

or_type += '<table>';

or_type += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

for (answer_key in answer_data) {

    or_type += '<tr>';

    if (answer_data[answer_key] != null) {

        let answer_opt = parseInt(answer_key) + 1;

        if (isRomanSmall(ch)) {

            or_type += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
        }

        else if (isNaN(parseInt(ch))) {
            or_type += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
        }

        else {
            or_type += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
        }

        or_type += '</tr>';

    }


}

or_type += '</table>';


    return or_type;
}

function poem_or_type(ques_no, question) {
    let pot = '<table style="width:100%;" class="mt-5"><tr>' +
        '<td style="width:5%"><b>' + ques_no + '.</b></td>';
    for (let q_no in question["question"]) {
        pot += '<td style="width:7.5%">(' + q_no + ')</td>';
        pot += '<td class="no-padding">' + question["question"][q_no] + '</td></tr><tr><td/><td/><td style="text-align: center;"><b>OR</b></td></tr><tr><td/>';
    }
    pot += '<td/><td/></tr></table>';
    return pot;
}

function comp_type(ques_no, question) {

    let comp='';
    if (question["heading"] != null){
    comp = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + ques_no + `.</b></td><td>` + question["heading"] + '</td><td class="marks">' + question["marks"] + '</td></tr></table>';
    }
    else{
    comp = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + ques_no + `.</b></td><td>` + question["quotedWords"] + '</td><td class="marks"></td></tr></table>';
  
    }
    let q_no;

    if (question["questions"] != undefined) {

        if (question["paragraph"] != undefined) {

            comp += '<table style="width:100%;" class="mt-5">';

            question["paragraph"].forEach((value, index) => {
                comp += '<tr><td style="width:5%"/><td class="no-padding" style="padding:10px;">' + value + '</td><td class="marks"/></tr>';
            });

            comp += '<tr><td/><td><b>Questions:</td><td/></tr></table>';

            for (let p_no in question["questions"]) {
                q_no = p_no;
                comp += '<table style="width:100%; margin-top:-5px;" class="mt-5">';
                comp += '<tr><td style="width:5%;"/><td style="width:7.5%">(' + p_no + ')</td>';
                comp += '<td class="no-padding">' + question["questions"][p_no]["question"] + '</td></tr>';
                comp += '</table>';
                if (question["questions"][p_no]["options"] != null) {
                    comp += '<table style="width:100%; margin-top:-5px;" class="mt-5"><tr>';
                    question["questions"][p_no]["options"].forEach((value, index) => {
                        comp += '<td style="width:5%;"/><td style="width:7.5%"/><td>(' + (index + 1) + ')&nbsp' + value + '</td>';
                    });
                    comp += '</tr></table>'
                }
            }

            if (question["questions"][q_no] != null) {

                let answer_data = question["answer"];

                comp += '<table>';

                comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

                for (answer_key in answer_data) {

                    comp += '<tr>';

                    let answer_opt = parseInt(answer_key) + 1;

                    if (answer_data[answer_key] != null) {

                        if (isRomanSmall(q_no)) {

                            comp += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else if (isNaN(parseInt(q_no))) {
                            comp += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else {
                            comp += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        comp += '</tr>';

                    }


                }

                comp += '</table>';
            }

            else {
                let answer_data = question["answer"];

                comp += '<table>';

                comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

                for (answer_key in answer_data) {

                    comp += '<tr>';

                    let answer_opt = parseInt(answer_key) + 1;

                    if (answer_data[answer_key] != null) {

                        if (isRomanSmall(q_no)) {

                            comp += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else if (isNaN(parseInt(q_no))) {
                            comp += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else {
                            comp += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        comp += '</tr>';

                    }


                }

                comp += '</table>';
            }


            return comp;
        }
        else {


            for (let p_no in question["questions"]) {

                q_no = p_no;

                comp += '<table style="width:100%; margin-top:-5px;" class="mt-5">';
                comp += '<tr><td style="width:5%;"/><td style="width:7.5%">(' + p_no + ')</td>';
                comp += '<td>' + question["questions"][p_no]["question"] + '</td></tr>';
                comp += '</table>';
                if (question["questions"][p_no]["options"] != null) {

                    comp += '<table style="width:100%; margin-top:-5px;" class="mt-5">';
                    comp += '<tr><td style="width:5%;"/><td style="width:7.5%">';
                    question["questions"][p_no]["options"].forEach((value, index) => {

                        comp += '<td>(' + (index + 1) + ')&nbsp' + value + '</td>';
                    });
                    comp += '</tr></table>'
                }
            }

            if (question["questions"][q_no] != null) {

                let answer_data = question["answer"];

                comp += '<table>';

                comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

                for (answer_key in answer_data) {

                    comp += '<tr>';

                    let answer_opt = parseInt(answer_key) + 1;

                    if (answer_data[answer_key] != null) {

                        if (isRomanSmall(q_no)) {

                            comp += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else if (isNaN(parseInt(q_no))) {
                            comp += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else {
                            comp += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        comp += '</tr>';

                    }

                }

                comp += '</table>';
            }

            else {
                let answer_data = question["answer"];

                comp += '<table>';

                comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

                for (answer_key in answer_data) {

                    comp += '<tr>';

                    let answer_opt = parseInt(answer_key) + 1;

                    if (answer_data[answer_key] != null) {

                        if (isRomanSmall(q_no)) {

                            comp += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else if (isNaN(parseInt(q_no))) {
                            comp += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else {
                            comp += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        comp += '</tr>';

                    }

                }

                comp += '</table>';
            }

            return comp;
        }
    }

    // console.log(question);
    else {
        comp += '<table style="width:100%;" class="mt-5">';
        for (let p_no in question["question"]) {
            q_no = p_no;
            comp += '<tr><td style="width:5%;"/><td style="width:7.5%">(' + p_no + ')</td>';
            comp += '<td class="no-padding" >' + question["question"][p_no] + '</td></tr>';
        }
        comp += '</table>';

        if (question["question"][q_no] != null) {

            let answer_data = question["answer"];

            comp += '<table>';

            comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

            for (answer_key in answer_data) {

                comp += '<tr>';

                let answer_opt = parseInt(answer_key) + 1;

                if (answer_data[answer_key] != null) {

                    if (isRomanSmall(q_no)) {

                        comp += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                    }

                    else if (isNaN(parseInt(q_no))) {
                        comp += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                    }

                    else {
                        comp += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
                    }

                    comp += '</tr>';

                }


            }

            comp += '</table>';

        }

        else {
            let answer_data = question["answer"];

            comp += '<table>';

            comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

            for (answer_key in answer_data) {

                comp += '<tr>';

                let answer_opt = parseInt(answer_key) + 1;

                if (answer_data[answer_key] != null) {

                    if (isRomanSmall(q_no)) {

                        comp += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                    }

                    else if (isNaN(parseInt(q_no))) {
                        comp += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                    }

                    else {
                        comp += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
                    }

                    comp += '</tr>';

                }


            }

            comp += '</table>';
        }

        return comp;
    }

}



function comp_img_type(ques_no, question) {



    let image = question["image"];

    image = image.replace(/\s/g, '+');

    console.log(question["heading"])

    let q_no;

    let comp = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + ques_no + `.</b></td><td>` + question["heading"] + '</td><td class="marks">' + question["marks"] + '</td></tr>' +
        '<tr><td/><td><img src=' + image + '  width="350" height="350" alt="Image Here"></td><td/></table>';


    if (question["paragraph"] != undefined) {
        comp += '<table style="width:100%;" class="mt-5">';

        question["paragraph"].forEach((value, index) => {
            comp += '<tr><td style="width:5%"/><td class="no-padding">' + value + '</td><td class="marks"/></tr>';
        });

        comp += '<tr><td/><td><b>Questions:</td><td/></tr></table>';
        comp += '<table style="width:100%; margin-top:-5px;" class="mt-5">';
        for (let p_no in question["question"]) {
            q_no = p_no;
            comp += '<tr><td style="width:5%;"/><td style="width:7.5%">(' + p_no + ')</td>';
            comp += '<td class="no-padding">' + question["question"][p_no] + '</td></tr>';
        }
        comp += '</table>';

        if (question["question"][q_no] != null) {

            let answer_data = question["answer"];

                comp += '<table>';

                comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

                for (answer_key in answer_data) {

                    comp += '<tr>';

                    let answer_opt = parseInt(answer_key) + 1;

                    if (answer_data[answer_key] != null) {

                        if (isRomanSmall(q_no)) {

                            comp += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else if (isNaN(parseInt(q_no))) {
                            comp += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else {
                            comp += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        comp += '</tr>';

                    }


                }

                comp += '</table>';

        }

        else {
            let answer_data = question["answer"];

                comp += '<table>';

                comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

                for (answer_key in answer_data) {

                    comp += '<tr>';

                    let answer_opt = parseInt(answer_key) + 1;

                    if (answer_data[answer_key] != null) {

                        if (isRomanSmall(q_no)) {

                            comp += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else if (isNaN(parseInt(q_no))) {
                            comp += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else {
                            comp += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        comp += '</tr>';

                    }


                }

                comp += '</table>';

        }

        return comp;
    }

    if (question["question"] != undefined) {
        comp += '<table style="width:100%;" class="mt-5">';
        for (let p_no in question["question"]) {
            if (question["question"][p_no]["question"] != undefined) {
                q_no = p_no;
                comp += '<table style="width:100%;" class="mt-5">';
                comp += '<tr><td style="width:5%;"/><td style="width:7.5%">(' + p_no + ')</td>';
                comp += '<td>' + question["question"][p_no]["question"] + '</td></tr>';
                comp += '</table>';
                if (question["question"][p_no]["options"] != null) {
                    comp += '<table style="width:100%;" class="mt-5">';
                    comp += '<tr><td style="width:5%;"/><td style="width:7.5%"></td>';
                    question["question"][p_no]["options"].forEach((value, index) => {

                        comp += '<td>(' + (index + 1) + ')&nbsp' + value + '</td>';
                    });
                    comp += '</tr>';
                    comp += '</table>';
                }
            }

            else {
               
                if(question["question"] instanceof Object){
                   
                    comp += '<tr><td style="width:5%;"/><td style="width:7.5%">(' + p_no + ')</td>';
                    comp += '<td class="no-padding">' + question["question"][p_no] + '</td></tr>';
     
                }
               
                else{
                   
                    comp += '<tr><td style="width:7%;"/>';
                    comp += '<td class="no-padding" style="padding:10px;">' + question["question"] + '</td></tr>';
                   
                    break;
                }
                   
            }
           
        }
       
        comp += '</table>';

        if (question["question"][q_no] != null) {

            let answer_data = question["answer"];

                comp += '<table>';

                comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

                for (answer_key in answer_data) {

                    comp += '<tr>';

                    let answer_opt = parseInt(answer_key) + 1;

                    if (answer_data[answer_key] != null) {

                        if (isRomanSmall(q_no)) {

                            comp += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else if (isNaN(parseInt(q_no))) {
                            comp += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else {
                            comp += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        comp += '</tr>';

                    }


                }

                comp += '</table>';

        }

        else {
            let answer_data = question["answer"];

                comp += '<table>';

                comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

                for (answer_key in answer_data) {

                    comp += '<tr>';

                    let answer_opt = parseInt(answer_key) + 1;

                    if (answer_data[answer_key] != null) {

                       
                        comp += '<td style="width:5%;"></td><td>' + answer_data[answer_key] + '</td>';
                       

                        comp += '</tr>';

                    }


                }

                comp += '</table>';

        }

        return comp;
    }

        let answer_data = question["answer"];

            comp += '<table>';

            comp += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

            for (answer_key in answer_data) {

                comp += '<tr>';

                let answer_opt = parseInt(answer_key) + 1;

                if (answer_data[answer_key] != null) {

                 
                        comp += '<td style="width:5%;"></td><td>'+ answer_data[answer_key] + '</td>';
                 

                    comp += '</tr>';

                }


            }

            comp += '</table>';

   

    return comp;

}

function poem_phrase(ques_no, question) {
    let poem_ph = `<table style="width:100%;" class="mt-5"><tr>` +
        `<td style="width:5%"><b>` + ques_no + `.</b></td><td>` + question["heading"] + '</td><td class="marks">' + question["marks"] + '</td></tr></table>';

    poem_ph += '<table>';



    poem_ph += '<tr><td style="text-align:center;">' + question["poem"] + '</td></tr>';


    question["poemlines"].forEach((value) => {

        poem_ph += '<tr><td style="text-align:center;">' + value + '</td></tr>';
    });

    poem_ph += '<tr><td style="text-align:right;"> - ' + question["author"] + '</td></tr>';

    poem_ph += '<tr>'

    let paragraph = '';


    question["paragraph"].forEach((value) => {

        paragraph += value;

    });

    poem_ph += '<td style="padding-left:70px;">' + paragraph + '</td>';

    poem_ph += '</tr>';

    poem_ph += '</table>';

    let words = ["1)","(1)","1","a)","(a)","a","i)","(ii)","ii"];

    let q_no;

    for(var i=0;i< words.length;i++){
        if (paragraph.includes(words[i])) {
            q_no = words[i];
        }
    }

    let answer_data = question["answer"];

    poem_ph += '<table>';

    poem_ph += '<tr><td style="width:5%;"></td><td><b>Answer : </b></td></tr>';

                for (answer_key in answer_data) {

                    poem_ph += '<tr>';

                    let answer_opt = parseInt(answer_key) + 1;

                    if (answer_data[answer_key] != null) {

                        if (isRomanSmall(q_no)) {

                            poem_ph += '<td style="width:5%;"></td><td>(' + integer_to_roman(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else if (isNaN(parseInt(q_no))) {
                            poem_ph += '<td style="width:5%;"></td><td>(' + numToalp(answer_opt) + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        else {
                            poem_ph += '<td style="width:5%;"></td><td>(' + answer_opt + ')' + ' ' + answer_data[answer_key] + '</td>';
                        }

                        poem_ph += '</tr>';

                    }


                }

                poem_ph += '</table>';


    return poem_ph;
}

function trapic(ques_no, question) {



    let tran_pic = '<table style="width:100%;" class="mt-5"><tr>' +
        '<td style="width:5%"><b>' + ques_no + '.</b></td><td/><td class="marks">' + question["marks"] + '</td></tr></table>';

    tran_pic += '<table>';

    for (let key in question["questions"]) {



        tran_pic += '<tr><td style="width:5%;" /><td style="width:5%;">(' + key + ')</td><td>' + question["questions"][key]["heading"] + '</td></tr>';
        if (question["questions"][key]["question"] != undefined) {
            tran_pic += '<tr><td style="width:5%;" /><td style="width:5%;" /><td style="padding-left:85px;">' + question["questions"][key]["question"] + '</td></tr>'
        }
        if (question["questions"][key]["image"] != undefined) {

            let image = question["questions"][key]["image"]

            image = image.replace(/\s/g, '+');

            tran_pic += '<tr><td style="width:5%;" /><td style="width:5%;" /><td><img src=' + image + ' width="350" height="350" alt="Image Here"></td></tr>'
        }
    }

    tran_pic += '</table>';

    let answer_data = question["answer"];

    tran_pic += '<table>';

    tran_pic += '<tr><td style="width:5%;"></td><td><b>Answer : </b>';

    for (answer_key in answer_data) {
        // let answer_opt = parseInt(answer_key) + 1;
        tran_pic += answer_data[answer_key];

    }

    tran_pic += '</td></tr></table>';

    return tran_pic;
}

function integer_to_roman(num) {
    if (typeof num !== 'number')
        return false;

    var digits = String(+num).split(""),
        key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
            "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
            "", "i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix"],
        roman_num = "",
        i = 3;
    while (i--)
        roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
    return Array(+digits.join("") + 1).join("M") + roman_num;

}

function numberToWords(number) {
    var digit = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    var elevenSeries = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    var countingByTens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var shortScale = ['', 'thousand', 'million', 'billion', 'trillion'];

    number = number.toString(); number = number.replace(/[\, ]/g, ''); if (number != parseFloat(number)) return 'not a number'; var x = number.indexOf('.'); if (x == -1) x = number.length; if (x > 15) return 'too big'; var n = number.split(''); var str = ''; var sk = 0; for (var i = 0; i < x; i++) { if ((x - i) % 3 == 2) { if (n[i] == '1') { str += elevenSeries[Number(n[i + 1])] + ' '; i++; sk = 1; } else if (n[i] != 0) { str += countingByTens[n[i] - 2] + ' '; sk = 1; } } else if (n[i] != 0) { str += digit[n[i]] + ' '; if ((x - i) % 3 == 0) str += 'hundred '; sk = 1; } if ((x - i) % 3 == 1) { if (sk) str += shortScale[(x - i - 1) / 3] + ' '; sk = 0; } } if (x != number.length) { var y = number.length; str += 'point '; for (var i = x + 1; i < y; i++) str += digit[n[i]] + ' '; } str = str.replace(/\number+/g, ' '); return str.trim();

}
function sumChars(s) {
    var i, n = s.length, acc = 0;
    for (i = 0; i < n; i++) {
      acc += parseInt(s[i], 36) - 9;
    }
    return acc;
  }

function roman_to_Int(str1) {
    if(str1 == null) return -1;
    var num = char_to_int(str1.charAt(0));
    var pre, curr;
   
    for(var i = 1; i < str1.length; i++){
    curr = char_to_int(str1.charAt(i));
    pre = char_to_int(str1.charAt(i-1));
    if(curr <= pre){
    num += curr;
    } else {
    num = num - pre*2 + curr;
    }
    }
   
    return num;
    }
   
    function char_to_int(c){
    switch (c){
    case 'i': return 1;
    case 'v': return 5;
    case 'x': return 10;
    case 'l': return 50;
    case 'c': return 100;
    case 'd': return 500;
    case 'm': return 1000;
    default: return -1;
    }
    }

    function numToalp(num){
        let s = '', t;
     
        while (num > 0) {
          t = (num - 1) % 26;
          s = String.fromCharCode(97 + t) + s;
          num = (num - t)/26 | 0;
        }
        return s || undefined;
      }
   
      function isRomanCap(string){
        // regex pattern
        const pattern = /^(M{1,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|C?D|D?C{1,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|X?L|L?X{1,3})(IX|IV|V?I{0,3})|M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|I?V|V?I{1,3}))$/
        return pattern.test(string);
    }
   
    function isRomanSmall(string) {
        // regex pattern
        const pattern = /^(m{1,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})|m{0,4}(cm|c?d|d?c{1,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})|m{0,4}(cm|cd|d?c{0,3})(xc|x?l|l?x{1,3})(ix|iv|v?i{0,3})|m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|i?v|v?i{1,3}))$/
        return pattern.test(string);
    }

