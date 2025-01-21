var numberBoxElem = document.getElementById("numberBox");

function appendNumberBoxes(i) {
    localStorage.removeItem("active")
    var numberIndividualBox = document.createElement("div");
    numberIndividualBox.innerText = i; // Set the number inside the box
    numberIndividualBox.classList.add("number-individual-box"); // Add a CSS class for styling
    numberIndividualBox.setAttribute("id",i)
    numberBoxElem.appendChild(numberIndividualBox); // Append the box to the parent container
    numberIndividualBox.addEventListener("click",()=>getNumber(i))
}


function getNumber(i) {
    var selectedNum = i
    for (var j=1;j<=9;j++) {
        var elem1=document.getElementById(j)
        elem1.classList.add("current-btn")
        if (j!=selectedNum) {
            elem1.classList.remove("current-btn")
        }

    }
    localStorage.setItem("active",selectedNum)

}
for (var i = 1; i <= 9; i++) {
    appendNumberBoxes(i);
}

var sudokuBoxElem=document.getElementById("sudokuBox")
function appendboxestosuduko(i,j) {
    var box=document.createElement("div")
    box.classList.add("box-class")
    box.id = i + "_" + j
    box.addEventListener("click",() => fillNumber(i,j))

    sudokuBoxElem.appendChild(box)
}
function fillNumber(i,j) {
    var id1=i + "_" + j
    var boxElem=document.getElementById(id1)
    var val=localStorage.getItem("active")
    boxElem.innerText=val
    }
for (var i=0;i<=8;i++) {
    for(var j=0;j<=8;j++) {
        appendboxestosuduko(i,j)
    }
}
for (var i=0;i<=8;i++) {
    for(var j=0;j<=8;j++) {
        if (i==2 || i==5 || i==8) {
            var id2=i + "_" + j
            var elem = document.getElementById(id2)
            elem.style.borderBottomColor="Black"

        }
        if ( j==2||j==5||j==8) {
            var id3=i + "_" + j
            var elem = document.getElementById(id3)
            elem.style.borderRightColor="Black"
        }
        if (i==0)  {
            var id4=i + "_" + j
            var elem = document.getElementById(id4)
            elem.style.borderTopColor="Black"
        }
        if (j==0)  {
            var id5=i + "_" + j
            var elem = document.getElementById(id5)
            elem.style.borderLeftColor="Black"
        }
    }
}

let sudoku=[]
for (var i=0;i<=8;i++) {
    temp=[]
    for(var j=0;j<=8;j++) {
        temp.push(0)
    }
    sudoku.push(temp)
}

function isValidSudoku(row, col, num, sudoku) {
    for (let i = 0; i < 9; i++) {
        if (sudoku[row][i] === num || sudoku[i][col] === num) {
            return false;
        }
    }
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (sudoku[i][j] === num) {
                return false;
            }
        }
    }
    return true;
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index between 0 and i
        [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
}
function fillCells(sudoku) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudoku[row][col] === 0) {
                let randomNums=[]
                for(var i=1;i<=9;i++) {
                    randomNums.push(i)
                }
                randomNums=shuffleArray(randomNums)
                for (let num of randomNums) {
                    if (isValidSudoku(row, col, num, sudoku)) {
                        sudoku[row][col] = num;
                        if (fillCells(sudoku)) {
                            return true;
                        } else {
                            sudoku[row][col] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}
function getRandomIntForLevel(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeCells(sudoku, level) {
    for (let i = 0; i < level; i++) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (sudoku[row][col] !== 0) {
            sudoku[row][col] = 0;
        }
    }

}

fillCells(sudoku);

function fillSudokuTable(sudoku) {
    for (var i=0;i<=8;i++) {
        for(var j=0;j<=8;j++) {
            var id = i+"_"+j
            var elem = document.getElementById(id)
            // elem.style.backgroundColor="white"
            // elem.classList.remove("filled-boxes")
            if (sudoku[i][j]!==0) {
                elem.innerText=sudoku[i][j]
                elem.classList.add("filled-boxes")
            }
        }
    }
}
removeCells(sudoku, 40)
sudoku_for_answer=sudoku
fillSudokuTable(sudoku)

result = [];
for (var i = 0; i <= 8; i++) {
    temp = [];
    for (var j = 0; j <= 8; j++) {
        temp.push(0);
    }
    result.push(temp);
}

var submitSudokuElem = document.getElementById("submitSudoku");
submitSudokuElem.addEventListener("click", get_board);

var showTipsAndRulesElem=document.getElementById("showTipsAndRules")
var tipsRulesContainerElem=document.getElementById("tipsRulesContainer")
showTipsAndRulesElem.addEventListener("click",function() {
    tipsRulesContainerElem.style.display="block"
})
function get_board() {
    var errorCountElem = document.getElementById("errorCount");
    errorCountElem.style.display="none"
    for (var i = 0; i <= 8; i++) {
        for (var j = 0; j <= 8; j++) {
            var id = i + "_" + j;
            var elem = document.getElementById(id);
            result[i][j] = elem.textContent;
        }
    }
    for (var i = 0; i <= 8; i++) {
        for (var j = 0; j <= 8; j++) {
            if (result[i][j] === "") {
                result[i][j] = 0;
            } else {
                result[i][j] = parseInt(result[i][j]);
            }
        }
    }
    var errorCountElem = document.getElementById("errorCount");
    empty_cells_array = [];
    for (var i = 0; i <= 8; i++) {
        for (var j = 0; j <= 8; j++) {
            if (result[i][j] === 0) {
                empty_cells_array.push([i, j]);
            }
        }
    }
    if (empty_cells_array.length !== 0) {
        errorCountElem.style.display = "block";
    } else {
        val = resCheck([], []);
        list1=val[0]
        list2=val[1]
        length1 = list1.length;

    for (var i = 0; i < length1; i++) {
        var id = list1[i];
        var element = document.getElementById(id[0] + "_" + id[1]);
        var style = window.getComputedStyle(element);
        var bgcolor = style.backgroundColor;
        if (bgcolor === "rgb(255, 255, 255)") {
            element.style.backgroundColor = "rgb(216, 9, 9)";
        }

    }

    length2 = list2.length;

    for (var i = 0; i < length2; i++) {
        var id = list2[i];
        var element = document.getElementById(id[0] + "_" + id[1]);
        var style = window.getComputedStyle(element);
        var bgcolor = style.backgroundColor;
        if (bgcolor === "rgb(216, 9, 9)") {
            element.style.backgroundColor = "rgb(255, 255, 255)";
        }
        }
        if (length1 === 0) {
            document.getElementById("successMessage").style.display = "block";

        }
        else {
            document.getElementById("successMessage").style.display = "none";
        }
    }

    }


function checkValidSudoku(ind1, ind2, sudoku) {
    let val = sudoku[ind1][ind2];
    let r1 = ind1 % 3;
    let ind11 = ind1 - r1;
    let ind12 = ind11 + 2;
    let r2 = ind2 % 3;
    let ind21 = ind2 - r2;
    let ind22 = ind21 + 2;

    for (let a = ind11; a <= ind12; a++) {
        for (let b = ind21; b <= ind22; b++) {
            if (a !== ind1 || b !== ind2) {
                if (sudoku[a][b] === val) {
                    return false;
                }
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        if (i === ind1) {
            for (let j = 0; j < 9; j++) {
                if (j !== ind2 && sudoku[i][j] === val) {
                    return false;
                }
            }
        } else if (sudoku[i][ind2] === val) {
            return false;
        }
    }
    return true;
}

function resCheck(list1, list2) {
    temp=[]
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!checkValidSudoku(i, j, result)) {
                list1.push([i, j]);
            } else {
                list2.push([i, j]);
            }
        }
    }
    temp.push(list1)
    temp.push(list2)
    return temp
}



// sudoku answer

var sudokuBoxElemAnswer=document.getElementById("sudokuBoxAnswer")
var sudokuAnswerDivElem=document.getElementById("sudokuAnswerDiv")
sudokuAnswerDivElem.style.display="none"

var showAnswerForPuzzleElem=document.getElementById("showAnswerForPuzzle")
showAnswerForPuzzleElem.addEventListener("click",function() {
    var sudokuAnswerDivElem=document.getElementById("sudokuAnswerDiv")
    sudokuAnswerDivElem.style.display="block"
})
function appendboxestosudukoAnswer(i,j) {
    var box=document.createElement("div")
    box.classList.add("box-class")
    box.id = i + "*" + j
    sudokuBoxElemAnswer.appendChild(box)
}
for (var i=0;i<=8;i++) {
    for(var j=0;j<=8;j++) {
        appendboxestosudukoAnswer(i,j)
    }
}

for (var i=0;i<=8;i++) {
    for(var j=0;j<=8;j++) {
        if (i==2 || i==5 || i==8) {
            var id2=i + "*" + j
            var elem = document.getElementById(id2)
            elem.style.borderBottomColor="Black"

        }
        if ( j==2||j==5||j==8) {
            var id3=i + "*" + j
            var elem = document.getElementById(id3)
            elem.style.borderRightColor="Black"
        }
        if (i==0)  {
            var id4=i + "*" + j
            var elem = document.getElementById(id4)
            elem.style.borderTopColor="Black"
        }
        if (j==0)  {
            var id5=i + "*" + j
            var elem = document.getElementById(id5)
            elem.style.borderLeftColor="Black"
        }
    }
}
function fillSudokuTableAnswer(sudoku_for_answer) {
    for (var i=0;i<=8;i++) {
        for(var j=0;j<=8;j++) {
            if (sudoku_for_answer[i][j]!==0) {
                var id = i+"*"+j
                var elem = document.getElementById(id)
                elem.innerText=sudoku_for_answer[i][j]
                elem.classList.add("filled-boxes")
            }
        }
    }
}
fillSudokuTableAnswer(sudoku_for_answer)
function isValidMove(sudoku, row, col, val) {
    for (let i = 0; i < 9; i++) {
        if (sudoku[row][i] === val || sudoku[i][col] === val) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (sudoku[i][j] === val) return false;
        }
    }
    return true;
}

function solveSudokuAnswer(sudoku_for_answer) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (sudoku_for_answer[row][col] === 0) {
                for (let val = 1; val <= 9; val++) {
                    if (isValidMove(sudoku_for_answer, row, col, val)) {
                        sudoku_for_answer[row][col] = val;
                        if (solveSudokuAnswer(sudoku_for_answer)) return true;
                        sudoku_for_answer[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

solveSudokuAnswer(sudoku_for_answer)
for (var i=0;i<=8;i++) {
    for (var j=0;j<=8;j++) {
        var id=i+"*"+j
        var elem=document.getElementById(id)
        elem.innerText=sudoku_for_answer[i][j]
    }
}

function clearSudoku() {
    for (var i=0;i<=8;i++) {
        for (var j=0;j<=8;j++) {
            var elem=document.getElementById(i+"_"+j)
            elem.classList.remove("filled-boxes")
            // elem.style.backgroundColor="white"
            elem.innerText=""
        }
    }
}
function clearSudokuAnswer() {
    for (var i=0;i<=8;i++) {
        for (var j=0;j<=8;j++) {
            var elem=document.getElementById(i+"*"+j)
            elem.classList.remove("filled-boxes")
            elem.innerText=""
        }
    }
}

var difficultyLevelElem = document.getElementById("difficultyLevel");
var chooseDifficultyElem = document.getElementById("chooseDifficulty");
var elemVal1 = chooseDifficultyElem.value;
difficultyLevelElem.innerText = elemVal1;
function getAnotherPuzzle(level) {

    var sudokuAnswerDivElem=document.getElementById("sudokuAnswerDiv")
    var errorCountElem = document.getElementById("errorCount");
    errorCountElem.style.display="none"
    sudokuAnswerDivElem.style.display="none"
    var elemVal = chooseDifficultyElem.value;
    difficultyLevelElem.innerText = elemVal;
    let sudoku=[]
    for (var i=0;i<=8;i++) {
        temp=[]
        for(var j=0;j<=8;j++) {
            temp.push(0)
        }
        sudoku.push(temp)
    }
    clearSudoku()
    fillCells(sudoku)
    removeCells(sudoku, level)
    for (var i=0;i<=8;i++) {
        for(var j=0;j<=8;j++) {
            var dm2 = document.getElementById(i+"_"+j)
            if (sudoku[i][j] !==0) {
                dm2.style.backgroundColor="#c2f8ef"
            }
            else {
                dm2.style.backgroundColor="white"
            }
        }
    }
    var sudoku_for_answer=sudoku
    fillSudokuTable(sudoku)
    result = [];
    for (var i = 0; i <= 8; i++) {
        temp = [];
        for (var j = 0; j <= 8; j++) {
            temp.push(0);
        }
        result.push(temp);
    }
    // get_board()
    clearSudokuAnswer()

    fillSudokuTableAnswer(sudoku_for_answer)
    solveSudokuAnswer(sudoku_for_answer)
    for (var i=0;i<=8;i++) {
        for (var j=0;j<=8;j++) {
            var id=i+"*"+j
            var elem=document.getElementById(id)
            elem.innerText=sudoku_for_answer[i][j]
        }
    }

}

function levelChange() {
    var chooseDifficultyElem = document.getElementById("chooseDifficulty");
    var elemVal1 = chooseDifficultyElem.value;
    if (elemVal1=="Easy") {
        var level = getRandomIntForLevel(20,40)

        getAnotherPuzzle(level)
    }
    else if (elemVal1=="Medium") {
        var level = getRandomIntForLevel(35,45)

        getAnotherPuzzle(level)
    }
    else if (elemVal1=="Hard") {
        var level = getRandomIntForLevel(45,65)

        getAnotherPuzzle(level)
    }
    else {
        console.log("select correctly")
    }
}
chooseDifficultyElem.addEventListener("change",levelChange)
var tryAnotherPuzzleElem = document.getElementById("tryAnotherPuzzle")

tryAnotherPuzzleElem.addEventListener("click",levelChange)
