/** * @type {number} */
let questionCount = 0;
/** @type {{errors: {}}} */
data = {
    title: '', module: '', unit: '', maxAttempts: 0, timeLimit: 0, points: 0,
    questions: [],
    errors: {}
};
/** @type {{}} */
let getSelectInput = {};

function addQuestion() {
    let value = Number($('.select-create-question [id=selQueVal]').val());
    let text = $('.select-create-question #selQueVal option:selected').text();

    switch (value) {
        case 1:
            addHtmlBlankBoxes(text, value);
            break;
        case 2:
            addHtmlCheckboxes(text, value);
            break;
        case 3:
            addHtmlDragDrop(text, value);
            break;
        default:
            break;
    }

    $('#textarea' + questionCount).summernote({
        lang: 'bg-BG', // default: 'en-US'
        height: 150,   //set editable area's height
        codemirror: { // codemirror options
            theme: 'default',
            styleTags: 'h5'
        },
    });
}

let addHtmlBlankBoxes = function (text = '', value = 0) {
    try {
        questionCount++;

        $('#questions').append(
            `<div class="create-question selQueVal${value}" id="question${questionCount}">\n` +

            '\t<div class="container-fluid">\n' +
            htmlQuestionLabelInput() +
            htmlGapContainer(text) +
            `\t\t<textarea id="textarea${questionCount}"></textarea>\n` +
            '\t</div>\n' +

            htmlClarification() +
            '</div>\n'
        );

        createSheet();
    } catch (e) {
        lang.text = 'addHtmlBlankBoxes';
        errorHandling(e, lang.errorHandling);
    }
};

let addHtmlCheckboxes = function (text = '', value = 0) {
    try {
        questionCount++;

        $('#questions').append(
            `<div class="create-question selQueVal${value}" id="question${questionCount}">\n` +

            `\t<div class="container-fluid">\n` +
            htmlQuestionLabelInput() +
            htmlGapContainer(text) +
            '\t\t<div class="question-rows-columns"></div>\n' +
            htmlAddQuestionField() +
            '\t</div>\n' +

            htmlClarification() +
            '</div>\n'
        );

        createSheet();
    } catch (e) {
        lang.text = 'addHtmlCheckboxes';
        errorHandling(e, lang.errorHandling);
    }
};

let addHtmlDragDrop = function (text = '', value = 0) {
    try {
        questionCount++;

        $('#questions').append(
            `<div class="create-question selQueVal${value}" id="question${questionCount}">\n` +

            '\t<div class="container-fluid">\n' +
            htmlQuestionLabelInput() +
            htmlGapContainer(text) +
            `\t\t<textarea id="textarea${questionCount}"></textarea>\n` +
            '\t</div>\n' +

            htmlClarification() +
            '</div>\n'
        );

        createSheet();
    } catch (e) {
        lang.text = 'addHtmlDragDrop';
        errorHandling(e, lang.errorHandling);
    }
};

/** @param event */
function addQuestionFieldColumn(event) {
    try {
        $(event.parentNode).before(
            htmlRowCheckboxOptions(htmlInputColumn())
        );
    } catch (e) {
        lang.text = 'addQuestionFieldColumn';
        errorHandling(e, lang.errorHandling);
    }
}

/** @param event */
function removeQuestionFieldColumn(event) {
    try {
        let questionId = $(event.parentNode.parentNode.parentNode.parentNode.parentNode).attr('id');
        console.log($('#' + questionId + ' [class=select-question-field-val]').val());
        console.log(resultNumberByQuestion(questionId));

    } catch (e) {
        lang.text = 'removeQuestionFieldColumn';
        errorHandling(e, lang.errorHandling);
    }
}

/** @param event */
function addQuestionField(event) {
    try {
        $(event.parentNode.parentNode).find('.question-rows-columns')
            .append(htmlRowInputCheckboxOptions());
    } catch (e) {
        lang.text = 'addQuestionField';
        errorHandling(e, lang.errorHandling);
    }
}

/** @param event */
let addInputColumn = function (event) {
    try {
        let token = $(event.parentNode.parentNode.parentNode.parentNode).find('.col-container-in-type');
        token.children().remove();
        token.append(htmlInputColumn());
    } catch (e) {
        lang.text = 'addInputColumn';
        errorHandling(e, lang.errorHandling);
    }
};

/** @param event */
let addCheckboxColumn = function (event) {
    try {
        let token = $(event.parentNode.parentNode.parentNode.parentNode).find('.col-container-in-type');
        token.children().remove();
        token.append(htmlCheckboxColumn());
    } catch (e) {
        lang.text = 'addCheckboxColumn';
        errorHandling(e, lang.errorHandling);
    }
};

/** @param event */
let addCheckboxInputColumn = function (event) {
    try {
        let token = $(event.parentNode.parentNode.parentNode.parentNode).find('.col-container-in-type');
        token.children().remove();
        token.append(htmlCheckboxInputColumn());
    } catch (e) {
        lang.text = 'addCheckboxInputColumn';
        errorHandling(e, lang.errorHandling);
    }
};

/** @param event */
let addInputCheckboxColumn = function (event) {
    try {
        let token = $(event.parentNode.parentNode.parentNode.parentNode).find('.col-container-in-type');
        token.children().remove();
        token.append(htmlInputCheckboxColumn());
    } catch (e) {
        lang.text = 'addInputCheckboxColumn';
        errorHandling(e, lang.errorHandling);
    }
};

let addRadioInput = function (event) {
    //TODO
    try {
        let token = $(event.parentNode.parentNode.parentNode.parentNode).find('.col-container-in-type');
        token.children().remove();
        token.append(htmlRadio());
    } catch (e) {
        lang.text = 'addRadioInput';
        errorHandling(e, lang.errorHandling);
    }
};

/** @param event @returns {boolean} */
let removeInputAndOptionsColumn = function (event) {
    try {
        let row = $(event.parentNode.parentNode.parentNode.parentNode);

        let promise = new Promise(function (resolve, reject) {
            row.css({'border': 'solid', 'border-color': 'red'});
            setTimeout(function () {
                resolve(row);
            }, 100);
        }).catch(function (e) {
            throw e;
        });

        promise.then(function (row) {
            lang.text = 'тази колона';
            if (confirm(lang.removeMessage)) {
                row.remove();
            } else {
                row.removeAttr('style');
            }
        }).catch(function (e) {
            alert(lang.failed);
            lang.text = 'removeInputAndOptionsColumn - promise';
            errorHandling(e, lang.errorHandling);
        });

    } catch (e) {
        lang.text = 'removeInputAndOptionsColumn';
        errorHandling(e, lang.errorHandling);
    }
};

/** @param event */
let createGap = function (event) {
    try {
        let isEmptySelectInput = jQuery.isEmptyObject(getSelectInput);
        let element = $(event.parentNode.parentNode.parentNode).find('.question-rows-columns');

        if (element.length === 0 && event.hasAttributes('id')) {
            createGapForBlankBoxes(event.id);
        } else if (element.length > 0) {

            if (!isEmptySelectInput) {
                createGapForCheckboxes();
            }

            htmlQuestionCheckboxesRowView();
        }

    } catch (e) {
        lang.text = 'createGap';
        errorHandling(e, lang.errorHandling);
    }
};

/** @param event */
function createGapForBlankBoxes(idName) {
    try {
        let gapNum = resultNumberByQuestion(idName);

        if (idName.length === 0 || gapNum === 0) {
            throw new Error('Event id missing or gapNum is zero!');
        }

        let textarea = $('#textarea' + gapNum);
        let gapWord = textarea.summernote('editor.createRange').toString().trim();

        if (gapWord.length === 0) {
            return;
        }

        textarea.summernote('insertNode', htmlSpanGap(gapWord, gapNum),);
    } catch (e) {
        throw new Error('Error in function createGapForBlankBoxes()');
    }
}

$(document).change(function () {
    selectAndChangeInput();
});

$(document).select(function () {
    selectAndChangeInput();
});

function selectAndChangeInput() {
    if (window.getSelection().toString().length === 0) {
        getSelectInput = {};
    } else {
        let input = $(document.activeElement);
        getSelectInput = {
            getSelectStartIndex: input[0].selectionStart,
            getSelectEndIndex: input[0].selectionEnd,
            getSelectText: input.val(),
            getInput: input
        };
    }
}

function htmlQuestionCheckboxesRowView() {
    let tokensRows = $('div.container.questions-container #questions .create-question .judge-container-column-input');
    for (let rowNum = 0; rowNum < tokensRows.length; rowNum++) {
        let rowElement = $(tokensRows.get(rowNum));
        let rowsType = rowElement.find('.col-container-in-type');
        let htmlText = '<p>';

        for (let i = 0; i < rowsType.length; i++) {
            let hasCheckbox = false;
            let columns = rowsType.get(i).children;

            for (let columnNum = 0; columnNum < columns.length; columnNum++) {
                if (!columns[columnNum].hasAttribute('type')) {
                    continue;
                }

                if (columns[columnNum].getAttribute('type') === 'checkbox') {
                    hasCheckbox = true;
                    break;
                }
            }

            for (let columnNum = 0; columnNum < columns.length; columnNum++) {
                if (!columns[columnNum].hasAttribute('type')) {
                    continue;
                }
                let isText = columns[columnNum].getAttribute('type') === 'text';
                let word = columns[columnNum].value.trim();

                if (isText && hasCheckbox) {
                    htmlText += ' <i>' + word + '</i>';
                } else if (isText && !hasCheckbox) {
                    htmlText += ' ' + word;
                } else if (hasCheckbox && columns[columnNum].checked) {
                    htmlText += ' <span class="gap" style="background-color: #FDC4A9;';
                    htmlText += ' padding: 2px 3px 0 0; border-radius: 5px;">';
                    htmlText += '<input type="checkbox" style="margin-left: 5px"></span>';
                } else if (hasCheckbox && !columns[columnNum].checked) {
                    htmlText += '<input type="checkbox" style="margin-left: 10px">';
                }
            }
        }

        htmlText += '</p>';
        htmlText = htmlText.trim();
        htmlText = htmlText.replace(/[\s]+/g, ' ');

        if (!rowElement.parent().children().hasClass('judge-container-column-row-view')) {
            rowElement.before($('<div class="judge-container-column-row-view">'));
        }

        rowElement.parent().children('.judge-container-column-row-view').html(htmlText);
    }
}

function createGapForCheckboxes() {
    try {
        let getSelectWord = getSelectInput.getSelectText.substring(
            getSelectInput.getSelectStartIndex, getSelectInput.getSelectEndIndex
        );

        let newText = getSelectInput.getSelectText.substring(0, getSelectInput.getSelectStartIndex);
        newText += '<gap class="gap">' + getSelectWord + '</gap>';
        newText += getSelectInput.getSelectText.substring(
            getSelectInput.getSelectEndIndex, getSelectInput.getSelectText.length
        );

        getSelectInput.getInput.val(newText);
    } catch (e) {
        throw new Error('Error in function createGapForCheckboxes()');
    }
}

/**
 * @param word
 * @param number
 * @returns {HTMLSpanElement}
 */
function htmlSpanGap(word = '', number = 0) {
    let spanGap = document.createElement('span');
    spanGap.style.backgroundColor = '#FDC4A9';

    if (number === 0) {
        spanGap.className = 'gap';
    } else {
        spanGap.className = 'gap question' + number;
    }

    spanGap.textContent = word;
    return spanGap;
}

/** @param event @returns {boolean} */
function removeQuestionFieldRow(event) {
    try {
        let row = $(event.parentNode.parentNode.parentNode);

        let promise = new Promise(function (resolve, reject) {
            row.css({'border': 'solid', 'border-color': 'red'});
            setTimeout(function () {
                resolve(row);
            }, 100);
        }).catch(function (e) {
            throw e;
        });

        promise.then(function (row) {
            lang.text = 'този ред';
            if (confirm(lang.removeMessage)) {
                row.remove();
            } else {
                row.removeAttr('style');
            }
        }).catch(function (e) {
            alert(lang.failed);
            lang.text = 'removeQuestionFieldRow - promise';
            errorHandling(e, lang.errorHandling);
        });

    } catch (e) {
        lang.text = 'removeQuestionFieldRow';
        errorHandling(e, lang.errorHandling);
    }
}

/** @returns {string} */
function htmlInputColumn() {
    return '<input type="text">';
}

/** @returns {string} */
function htmlCheckboxColumn() {
    return '<input type="checkbox" style="margin: auto; margin-top: 6px; margin-bottom: 5px;">';
}

/** @returns {string} */
function htmlCheckboxInputColumn() {
    return '<input type="checkbox" style="margin: auto;"><input type="text" style="width: 80%;">';
}

/** @returns {string} */
function htmlInputCheckboxColumn() {
    return '<input type="text" style="width: 80%;"><input type="checkbox" style="margin: auto;">';
}

/** @returns {string} */
function htmlRowInputCheckboxOptions() {
    return '<div class="container-fluid row-input-checkbox-options">\n' +
        '\t<div class="judge-container-column-input">\n' +

        htmlRowCheckboxOptions(htmlInputColumn()) +

        '\t\t<div class="judge-btn-add-rem">\n' +
        '\t\t\t<input type="button" onclick="addQuestionFieldColumn(this);" value="Добавяне на колона">\n' +
        '\t\t\t<input type="button" onclick="removeQuestionFieldRow(this);" value="Изтриване на реда">\n' +
        '\t\t</div>\n' +

        '\t</div>\n' +
        '</div>\n';
}

/** @param inputType @returns {string} */
function htmlRowCheckboxOptions(inputType) {
    return '<div class="container-fluid col-container-in">\n' +
        `\t<div class="col-container-in-type" style="display: flex">${inputType}</div>\n` +
        '\t<div class="dropdown col-container-in-dropdown">\n' +
        `\t\t<input class="dropdown center" type="text" data-toggle="dropdown" value="${lang.htmlRowCheckboxOptionsValue}" readonly>\n` +
        '\t\t<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">\n' +
        '\t\t\t<li role="presentation">\n' +
        '\t\t\t\t<a role="menuitem" href="#" onclick="addInputColumn(this); return false;">Добавяне на (input)</a>\n' +
        '\t\t\t</li>\n' +
        '\t\t\t<li role="presentation">\n' +
        '\t\t\t\t<a role="menuitem" href="#" onclick="addCheckboxColumn(this); return false;">Добавяне на (checkbox)</a>\n' +
        '\t\t\t</li>\n' +
        '\t\t\t<li role="presentation">\n' +
        '\t\t\t\t<a role="menuitem" href="#" onclick="addCheckboxInputColumn(this); return false;">Добавяне на (checkbox: input)</a>\n' +
        '\t\t\t</li>\n' +
        '\t\t\t<li role="presentation">\n' +
        '\t\t\t\t<a role="menuitem" href="#" onclick="addInputCheckboxColumn(this); return false;">Добавяне на (input: checkbox)</a>\n' +
        '\t\t\t</li>\n' +
        '\t\t\t<li role="presentation">\n' +
        '\t\t\t\t<a role="menuitem" href="#" onclick="addRadioInput(this); return false;">Добавяне на (Radio: input)</a>\n' +
        '\t\t\t</li>\n' +
        '\t\t\t<li role="presentation">\n' +
        '\t\t\t\t<a role="menuitem" href="#" onclick="removeInputAndOptionsColumn(this); return false;">Изтриване на колоната</a>\n' +
        '\t\t\t</li>\n' +
        '\t\t</ul>\n' +
        '\t</div>\n' +
        '</div>\n';
}

/**
 * @param text
 * @param name
 * @param id
 * @param value
 * @param checked
 * @returns {string}
 */
function htmlRadio(name = 'optionsRadios', id = '', value = '', checked = false) {
    let check = '';
    if (checked) {
        check = checked;
    }

    return `<input type="radio" name="${name}" id="${id}" value="${value}" ${check}>\n` +
        '<input type="text" style="width: 80%;">\n';
}

/** @returns {string} */
function htmlQuestionLabelInput() {
    return `<div class="container-fluid question-label-input">\n` +
        `\t<label for="questionContentGap${questionCount}">Въпрос ${questionCount}:</label>\n` +
        `\t<input type="text" id="questionContentGap${questionCount}">\n` +
        `\t<img src="/images/close.png" onclick="removeQuestion(${questionCount})">\n` +
        '</div>\n';
}

/**
 * @param btnGap
 * @param points
 * @returns {string}
 */
function htmlGapContainer(text = '', btnGap = 'block', points = 'block') {
    let labelText = '\t\t<label>';
    if (text.length > 0) {
        labelText = `\t\t<label>(Въпросник - ${text})`;
    }
    labelText += '</label>\n';

    return '<div class="container-fluid btn-gap-points">\n' +
        `\t<div class="btn-gap" style="display: ${btnGap}">\n` +
        `\t\t<button type="button" id="createGap${questionCount}" onclick="createGap(this)" class="btn-default">Create Gap</button>\n` +
        `\t\t<button type="button" id="addHintGap${questionCount}" class="btn-info">Add a Hint</button>\n` +
        '\t</div>\n' +

        `\t<div class="points-label-input" style="display: ${points}">\n` +

        labelText +
        `\t\t<label for="pointsGap${questionCount}">Точки за въпрос ${questionCount}:</label>\n` +
        `\t\t<input type="number" id="pointsGap${questionCount}" value="1">\n` +
        '\t</div>\n' +
        '</div>\n';
}

/** @returns {string} */
function htmlAddQuestionField() {
    return '<div class="container form-group question-add-row">\n' +
        '\t<input type="button" onclick="addQuestionField(this);" value="Добавяне на ред">\n' +
        '</div>\n';
}

/** @returns {string} */
function htmlClarification() {
    return '<div class="container-fluid explanation-container">\n' +
        `\t<label for="explanationTextarea${questionCount}">Oбяснение:</label>\n` +
        `\t<textarea rows="2" id="explanationTextarea${questionCount}"></textarea>\n` +
        `\t<img src="/images/link_wall.gif" onclick="generateTinyMCEforExplanation(${questionCount})">\n` +
        '</div>\n';
}

/** @param id */
function generateTinyMCEforExplanation(id) {
    try {
        let textarea = $('#explanationTextarea' + id);

        if (textarea.css("display") === 'none') {
            textarea.summernote('destroy');
        } else if (textarea.css("display") !== 'none') {
            textarea.summernote({
                airMode: false,
                lang: 'bg-BG', // default: 'en-US'
                height: 50,   //set editable area's height
                codemirror: { // codemirror options
                    theme: 'default'
                },
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']],
                ]
            });
        }
    } catch (e) {
        lang.text = 'generateTinyMCEforExplanation';
        errorHandling(e, lang.errorHandling);
    }
}

function createSheet() {
    try {
        let sheetQuestions = $('.container.questions-container');

        if (questionCount > 0 && sheetQuestions.css('display') === 'none') {
            sheetQuestions.css('display', 'block');
        }
    } catch (e) {
        lang.text = 'createSheet';
        errorHandling(e, lang.errorHandling);
    }
}

/** @param number */
function removeQuestion(number) {
    try {
        let question = $('.container.questions-container #questions #question' + number);
        lang.text = question.find('.question-label-input > label').text();

        if (confirm(lang.removeMessage)) {
            question.remove();

            let questionsElement = $('#questions .create-question');
            let lengthQuestions = questionsElement.length;

            if (lengthQuestions === 0) {
                questionCount = 0;
            } else {
                let idLast = $(questionsElement[lengthQuestions - 1]).attr('id');
                questionCount = resultNumberByQuestion(idLast);
            }
        }
    } catch (e) {
        lang.text = 'removeQuestion';
        errorHandling(e, lang.errorHandling);
    }
}

/** @param idNameStr @returns {number} */
function resultNumberByQuestion(idNameStr) {
    try {
        let match = idNameStr.match(/[0-9]+/g);
        return Number(match[0]);
    } catch (e) {
        return 0;
    }
}

/** @param event */
function onUserSelectsCategory(event) {
    try {
        console.log(event);
    } catch (e) {
        lang.text = 'onUserSelectsCategory';
        errorHandling(e, lang.errorHandling);
    }
}

function btnJudgeShowQuiz() {
    try {
        const questionsContainer = $('div.container.questions-container');
        let tokens = questionsContainer.find('#questions.container-fluid').children();
        dataVerification.questionsContainer = questionsContainer;

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens.eq(i);
            let idNum = resultNumberByQuestion(token.attr('id'));
            let textarea = token.find('#textarea' + idNum);
            let explanationTextarea = token.find('#explanationTextarea' + idNum);
            let rowViewCheckbox = token.find('.judge-container-column-row-view > p');

            let questionId = {title: '', points: 0, body: '', explanation: ''};
            questionId.title = (questionIdVerification.title = [token, idNum]);
            questionId.points = (questionIdVerification.points = [token, idNum]);

            if (textarea.length > 0 && !textarea.summernote('isEmpty')) {
                questionId.body += textarea.summernote('code');
            } else if (rowViewCheckbox.length > 0) {
                for (let j = 0; j < rowViewCheckbox.length; j++) {
                    questionId.body += rowViewCheckbox.get(j).outerHTML;
                }
            }

            if (explanationTextarea.parent().find(".note-editable").length === 1) {
                if (!explanationTextarea.summernote('isEmpty')) {
                    questionId.explanation += explanationTextarea.summernote('code');
                }

            } else if (explanationTextarea.val().length > 0) {
                questionId.explanation += explanationTextarea.val();
            }

            data.questions.push(questionId);
        }

        console.log(data);
        //$('#judgeShowQuiz').html(htmlText);
        //$('#judgeShowQuiz').css('display', 'block');

    } catch (e) {
        alert(e);

        lang.text = 'btnJudgeShowQuiz';
        errorHandling(e, lang.errorHandling);
    }
}

/** @type {{questionsContainer}} */
let dataVerification = {
    set questionsContainer(questionsContainer) {

        let inputQuestionTitle = questionsContainer.find('#inputQuestionTitle');
        let inputQuestionValue = inputQuestionTitle.val();
        if (inputQuestionValue.length > 0) {
            data.title = inputQuestionValue;
        } else {
            inputQuestionTitle.focus();
            lang.text = inputQuestionTitle.prev().text();
            throw  lang.throwInputQuestionTitle;
        }

        let judgeModule = questionsContainer.find('[id=judgeModule]');
        let judgeModuleValue = judgeModule.val();
        if (judgeModuleValue.length > 0) {
            data.module = judgeModuleValue;
        } else {
            judgeModule.focus();
            lang.text == judgeModule.prev().text();
            throw lang.throwJudgeModule;
        }

        let judgeUnit = questionsContainer.find('#judgeUnit');
        let judgeUnitValue = judgeUnit.val();
        if (judgeUnitValue.length > 0) {
            data.unit = judgeUnitValue;
        } else {
            judgeUnit.focus();
            lang.text = judgeUnit.prev().text();
            throw lang.throwJudgeUnit;
        }

        let numMaxAttempts = questionsContainer.find('#numMaxAttempts');
        let numMaxAttemptsValue = Number(numMaxAttempts.val());
        if (numMaxAttemptsValue > 0) {
            data.maxAttempts = numMaxAttemptsValue;
        } else {
            numMaxAttempts.focus();
            lang.text = numMaxAttempts.prev().text();
            throw lang.throwNumMaxAttempts;
        }

        let numTimeLimit = questionsContainer.find('#numTimeLimit');
        let numTimeLimitValue = Number(numTimeLimit.val());
        if (numTimeLimitValue > 9) {
            data.timeLimit = numTimeLimitValue;
        } else {
            numTimeLimit.focus();
            lang.text = numTimeLimit.prev().text();
            throw lang.throwNumTimeLimit;
        }

        let numAllPoints = questionsContainer.find('#numAllPoints');
        let numAllPointsValue = Number(numAllPoints.val());
        if (numAllPointsValue > 9) {
            data.points = numAllPointsValue;
        } else {
            numAllPoints.focus();
            lang.text = numAllPoints.prev().text();
            throw lang.throwNumAllPoints;
        }
    }
};

/** @type {{title: *[], points: *[]}} */
let questionIdVerification = {
    set title([token, idNum]) {
        let questionContentGap = token.find('#questionContentGap' + idNum);
        let questionContentValue = questionContentGap.val();

        if (questionContentValue.length > 0) {
            return questionContentValue;
        } else {
            questionContentGap.focus();
            lang.text = questionContentGap.prev().text();
            throw lang.throwTitle;
        }
    },

    set points([token, idNum]) {
        let pointsGap = token.find('#pointsGap' + idNum);
        let points = Number(pointsGap.val());

        if (points > 0) {
            return points;
        } else {
            pointsGap.focus();
            lang.text = pointsGap.prev().text();
            throw lang.throwPoints;
        }
    }
};

function btnJudgeSave() {
    console.log(data);

    data.title = '';
    data.module = '';
    data.unit = '';
    data.maxAttempts = 0;
    data.timeLimit = 0;
    data.points = 0;
    data.questions = [];
    data.errors = {}
    console.log(data);
}

function errorHandling(error, message) {
    data.errors = {message: `${message}\n\r${error.toString()}`};
    console.log(data);
    //return;
}

lang = {


    set text(text) {
        this.text.push(text);
    },

    get throwInputQuestionTitle() {
        return "Поле '" + this.text + "' не може да остане празно!";
    },

    get throwJudgeModule() {
        return "Поле '" + this.text + "' не може да остане празно!";
    },

    get throwJudgeUnit() {
        return "Поле '" + this.text + "' не може да остане празно!";
    },

    get throwNumMaxAttempts() {
        return "Поле '" + this.text + "' не може да бъде по-малко от 1!";
    },

    get throwNumTimeLimit() {
        return "Поле '" + this.text + "' не може да бъде по-малко от 10 минути!";
    },

    get throwNumAllPoints() {
        return "Поле '" + this.text + "' не може да бъде по-малко от 10!";
    },

    get throwPoints() {
        return "Поле '" + this.text + "' не може да бъде по-малко от 1!";
    },

    get throwTitle() {
        return "Поле '" + this.text + "' не може да остане празно!";
    },

    get removeMessage() {
        return "Наистина ли искате да изтриете '" + this.text + "'?";
    },

    get errorHandling() {
        return "Error in function '" + this.text + "'";
    },

    get failed() {
        return 'Командата не-може да бъде изпълнена!';
    },

    get htmlRowCheckboxOptionsValue() {
        return 'Тип на колоната';
    },

    text: [],

    "emptyMessage": [
        {'message': "1. В поле 'Търсене' можеш да търсиш по: id, потребител, име, фамилия, име и фамилия, имейл или модул."},
        {'message': "2. При 'Търсене' по id трябва да въведете id: и номера. Например id:1234."},
        {'message': "3. При 'Търсене' по име, фамилия, име и фамилия - преобразува латиница в кирилица и обратно."},
        {'message': "4. При 'Търсене' по модул трябва да въведете името на модула. (Например: A1.1)"},
        {'message': "5. 'Изгледани проценти от модула' ти дават справка каква част от видеата курсистът е изгледал напълно."},
        {'message': "6. 'Само регистриран' - тук излизат всички регистрирани потребители, които са гледали безплатни видеа."},
        {'message': "7. 'С достъп до модул' - тук излизат само курсистите, които имат даден достъп до определен модул."},
        {'message': `8. 'Търсене в таблицата по-долу:' - търси по допълнителен критерий в изготвената вече справка.`}
    ],
};