function addToTable(tableId, row_name, value) {
    const tableBody = document.getElementById(tableId + "Body");
    const newRow = tableBody.insertRow(-1);
    const cell_name = newRow.insertCell(0);
    cell_name.innerText = row_name;
    const cell_value = newRow.insertCell(1);
    cell_value.innerText = value;
}

function addToTable2(tableId, valArray) {
    const tableBody = document.getElementById(tableId + "Body");
    const newRow = tableBody.insertRow(-1);

    for (const element of valArray) {
        const cell = newRow.insertCell(-1);
        cell.innerText = element;
    }
}

var global_indexes = [[], [], []];
var global_pointers = [];
var global_Q = 16;
var coding_array = [];

function executeTask2() {
    parceQ()

    function parseInputTask2() {
        let inputArray = [];
        for (let i = 1; i < 8; i++) {
            let element = document.getElementById("Task2_Input" + i).value;
            inputArray.push(element);
        }

        return inputArray
    }

    function findStrings(array, element, index) {
        let resArray = [];
        for (let i = 0; i < array.length; i++) {
            let str = array[i]
            if (str.toString().charAt(str.length + index) === element.toString()) {
                resArray.push(i + 1)
            }
        }
        return resArray
    }

    function checkIfOnlyOneOne(array, mainArray) {
        let resArray = [[], []];
        for (const index of array) {
            let element = mainArray[index - 1].toString();
            let count_one = element.split("1").length - 1;
            if (count_one === 1) {
                resArray[0].push(index);
            } else {
                resArray[1].push(index);
            }
        }
        return resArray;
    }

    function arrayToTableRow(array) {
        return array.join(", ");
    }

    function removewithfilter(arr) {
        let outputArray = arr.filter(function (v, i, self) {

            // It returns the index of the first
            // instance of each value
            return i == self.indexOf(v);
        });

        return outputArray;
    }

    function getIndexesInclude(array1, array2, array3) {
        let array = removewithfilter(array1[1].concat(array2[1]).concat(array3[1])).sort();
        // console.log(array)
        return array
    }


    function fill_task1_table2(include_indexes) {
        let resArray = []
        for (let i = 1; i < global_Q; i++) {
            let word = "X_" + i.toString();
            let code = i.toString(2).padStart(4, '0');
            let current_index = 3;
            let current_row = ["-", "-", "-", "-", "-", "-", "-", "-"]
            // for (let j = 0; j < 8; j++) {
            //     if (include_indexes.includes(j-1)) {
            //         current_row[j] = code[current_index];
            //         current_index += 1;
            //     }
            // }
            for (const index of include_indexes) {
                current_row[8 - index] = code[current_index]
                current_index -= 1
            }

            resArray.push(current_row)
            let valArray = [word, code].concat(current_row)

            addToTable2("Task2_table2", valArray)
        }
        return resArray;
    }

    function calculateFromIndexes(array_row, array_indexes) {
        for (const left_index of array_indexes[0]) {
            let val = 0;
            for (const right_index of array_indexes[1]) {
                let res = val ^ array_row[8 - right_index]
                // console.log(right_index, val, array_row[8 - right_index], res)
                val = res;

            }
            array_row[8 - left_index] = val;
            // console.log(array_row, val)
        }

        return array_row
        //TODO этот ряд вывести в таблицу
    }

    function fill_task1_table3(input_array, array1, array1_, array1__, twoMistakes) {
        let resArray = []
        for (let i = 0; i < global_Q - 1; i++) {
            let word = "X_" + (i + 1).toString();
            let code = (i + 1).toString(2).padStart(4, '0');

            let current_row = calculateFromIndexes(input_array[i], array1);
            current_row = calculateFromIndexes(current_row, array1_);
            current_row = calculateFromIndexes(current_row, array1__);
            current_row = calculateFromIndexes(current_row, twoMistakes);


            resArray.push([code, current_row.join("")])
            let valArray = [word, code].concat(current_row)

            addToTable2("Task2_table3", valArray)
        }
        return resArray;
    }


    // purge table 1
    const Task1_table1 = document.getElementById("Task2_table1Body");
    Task1_table1.innerHTML = "";

    let inputArray = parseInputTask2();
    let endsWith1Array = findStrings(inputArray, "1", -1)
    addToTable("Task2_table1", "Заканчиваются на 1", arrayToTableRow(endsWith1Array))
    let endsWith1_Array = findStrings(inputArray, "1", -2)
    addToTable("Task2_table1", "1 - вторая с конца", arrayToTableRow(endsWith1_Array))
    let endsWith1__Array = findStrings(inputArray, "1", -3)
    addToTable("Task2_table1", "1 - третья с конца", arrayToTableRow(endsWith1__Array))

    global_indexes = [endsWith1Array, endsWith1_Array, endsWith1__Array]
    global_pointers = inputArray.slice()

    addToTable("Task2_table1", "Слева только 1 единица в записи", '--------')

    let endsWith1ArraySplit = checkIfOnlyOneOne(endsWith1Array, inputArray);
    addToTable("Task2_table1", "Заканчивается на 1", endsWith1ArraySplit[0].join(" + ") + " = " + endsWith1ArraySplit[1].join(" + "));
    let endsWith1_ArraySplit = checkIfOnlyOneOne(endsWith1_Array, inputArray);
    addToTable("Task2_table1", "1 - вторая с конца", endsWith1_ArraySplit[0].join(" + ") + " = " + endsWith1_ArraySplit[1].join(" + "));
    let endsWith1__ArraySplit = checkIfOnlyOneOne(endsWith1__Array, inputArray);
    addToTable("Task2_table1", "1 - третья с конца", endsWith1__ArraySplit[0].join(" + ") + " = " + endsWith1__ArraySplit[1].join(" + "));

    let twoMistakesArraySplit = [[8], [1, 2, 3, 4, 5, 6, 7]];
    addToTable("Task2_table1", "Для исправления 2х ошибок", twoMistakesArraySplit[0].join(" + ") + " = " + twoMistakesArraySplit[1].join(" + "));


    // purge table 2
    const Task1_table2 = document.getElementById("Task2_table2Body");
    Task1_table2.innerHTML = "";

    let include_indexes = getIndexesInclude(endsWith1ArraySplit, endsWith1_ArraySplit, endsWith1ArraySplit)
    let table2_array = fill_task1_table2(include_indexes)

    // purge table 3
    const Task2_table3 = document.getElementById("Task2_table3Body");
    Task2_table3.innerHTML = "";

    let table3_array = fill_task1_table3(table2_array, endsWith1ArraySplit, endsWith1_ArraySplit, endsWith1__ArraySplit, twoMistakesArraySplit)
    // TODO сделать кодирование на сонове ввода и этой таблицы
    coding_array = table3_array.slice()
    // console.log(coding_array)

    document.getElementById("Task2_table1").style.display = "table"
    document.getElementById("Task2_table2").style.display = "table"
    document.getElementById("Task2_table3").style.display = "table"
    document.getElementById("task3").style.display = "block"
    document.getElementById("task4").style.display = "block"
    return table3_array;
}


function parceQ() {
    global_Q = document.getElementById("global_Q_query").value
}

function executeTask3() {
    function parseInputTask3() {
        let inputArray = [];
        for (let i = 1; i < 4; i++) {
            let element = document.getElementById("Task3_Input" + i).value;
            inputArray.push(element);
        }

        return inputArray
    }

    let inputArray = parseInputTask3();
    parceQ()
    document.getElementById("Task3_table1").style.display = "table"

    // purge table 1
    const Task3_table1 = document.getElementById("Task3_table1Body");
    Task3_table1.innerHTML = "";

    for (const element of inputArray) {
        for (const pair of coding_array) {
            if (pair[0] === element) {
                addToTable2("Task3_table1", [element, pair[1]])
            }
        }
    }
}

function executeTask4() {
    function parseInputTask4() {
        let inputArray = [];
        for (let i = 1; i < 5; i++) {
            let element = document.getElementById("Task4_Input" + i).value;
            inputArray.push(element);
        }
        return inputArray
    }

    function xorByIndexes(array, indexes) {
        var res = 0;
        for (const index of indexes) {
            res = res ^ array[array.length - index]
            // console.log(index, res, array[array.length - index])
        }
        return res
    }

    function bitwiseXor(first, second) {
        let res = []
        for (let i = 0; i < 7; i++) {
            res[i] = first[i] ^ second[i]
        }
        return res.join("")
    }

    function convertTable() {
        let res = []
        for (const pair of coding_array) {
            let element = pair[1].toString().slice(1, 8)
            res.push(element)
        }
        return res
    }


    function fixMessage(msg) {
        let b1 = xorByIndexes(msg.split(""), global_indexes[0])
        let equationB1 = indexesToEquation("b1", global_indexes[0], b1)
        let b2 = xorByIndexes(msg.split(""), global_indexes[1])
        let equationB2 = indexesToEquation("b2", global_indexes[1], b2)
        let b3 = xorByIndexes(msg.split(""), global_indexes[2])
        let equationB3 = indexesToEquation("b3", global_indexes[2], b3)
        let pointer = b3.toString() + b2.toString() + b1.toString()

        let vector_num = global_pointers.indexOf(pointer) + 1
        let vector = ("0".repeat(7 - vector_num) + "1" + "0".repeat(vector_num)).slice(0, 7)
        let res = bitwiseXor(msg, vector)
        // console.log(pointer, vector_num, vector, res)

        let bit7 = convertTable()

        let msg_in_table = bit7.includes(msg)
        let res_in_table = bit7.includes(res)

        let flag = "Нет"
        if (msg_in_table == false && res_in_table == true) {
            flag = "Да"
        }

        let htmlVersion = equationsToHTML(msg, equationB1, equationB2, equationB3, pointer, vector, res)

        return [msg, res, flag, htmlVersion]
    }

    function indexesToEquation(left_part, indexes, result) {
        function indexToIndexesLetter(cher, index) {
            return cher.toString() + "" + index.toString()
        }

        let right_part = indexes.map(x => indexToIndexesLetter("a", x)).join(" ⊕ ")
        return left_part + " = " + right_part + " = " + result
    }

    function equationsToHTML(msg, equation1, equation2, equation3, b3b2b1, vector, result) {
        return "<li><article class='4taskdetails'>" + "<h3>Решение задачи 4 для (" + msg + ")</h3>" +
            "<ol>" +
            "<li>" + equation1 + "</li>" +
            "<li>" + equation2 + "</li>" +
            "<li>" + equation3 + "</li>" +
            "</ol>" +
            "<p>b3b2b1 = " + b3b2b1 + "</p>" +
            "<p>Соответствующий этому опознавателю вектор ошибок:</p>" +
            "<p>(" + vector + ")</p>" +
            "<p>Суммируем кодовую комбинацию с вектором ошибок:</p>" +
            "<p>(" + msg + ') ⊕ (' + vector + ") = (" + result + ")</p>" +
            "</article></li>";
    }

    function writeToDetails(newValue) {
        const body = document.getElementById("Task4DetailsBody")
        body.innerHTML = body.innerHTML + newValue
    }


    let inputArray = parseInputTask4();

    // purge table 1
    const Task4_table1 = document.getElementById("Task4_table1Body");
    Task4_table1.innerHTML = "";

    // purge details
    const Task4DetailsBody = document.getElementById("Task4DetailsBody");
    Task4DetailsBody.innerHTML = ""

    for (const msg of inputArray) {

        let asd = fixMessage(msg)

        addToTable2("Task4_table1", asd.slice(0, 3))
        writeToDetails(asd[3])
    }
    // TODO Сделать вывод исправлений для каждого элемента
    document.getElementById("Task4_table1").style.display = "table"

}