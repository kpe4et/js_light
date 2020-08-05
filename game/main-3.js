// загадаем число
function hiddenNum(numberOfDigits) {
    return Math.floor((Math.pow(10, numberOfDigits) - 1) * Math.random());
}

//разобьем число на цифры и положим в массив
function numberToArray(number) {
    var numberArr = [];
    var cicle = true;
    while (cicle) {
        numberArr.push(number % 10);
        if (Math.floor(number / 10) == 0) {
            cicle = false;
        }
        else {
            number = Math.floor(number / 10);
         }
    }
    return numberArr;
}

//проверим, есть ли в массиве одинаковые цифры, может, перезагадать надо
function numberCheck(number) {
    numberArr = numberToArray(number);
    for (var i = 0; i < numberArr.length; i++ ) {
        for (var j = i + 1; i < numberArr.length; j++ ) {
            if (numberArr[i] == numberArr[j]) {
                return true; // останемся в цикле
            }
            else {
                return false; // выйдем из цикла
            }
        }
    }
}

//введем догадку
function guessNum(number) {
    var guess = Number;
    while (!(guess > 0) || (isNaN(guess)) || (numberToArray(guess).length != number)) {             // ну и что тут с отрицательными???
        guess = prompt("введите положительное число, состоящиее из " +number+ " разных цифр.");
    }
    return guess;
}

//сравним введенное число и загаданное, поищем быков
function bullsCounter(hidden, guess) {
    guessArr = numberToArray(guess);
    hiddenArr = numberToArray(hidden);
    var counter = 0;
    for (var i=0; i < Math.min(guessArr.length, hiddenArr.length); i++) { //вообще тут проверка по идее не нужна, но пока пусть так
        if (guessArr[i] == hiddenArr[i]) {
            counter++;
        }
    }
    return counter;
}

//сравним введенное число и загаданное и поищем коров
function cowsCounter(hidden, guess) {
    guessArr = numberToArray(guess);
    hiddenArr = numberToArray(hidden);
    var counter = 0;
    for (var i=0; i < guessArr.length; i++) { 
        for (var j=0; j < hiddenArr.length; j++) {
            if ((guessArr[i] == hiddenArr[j]) && i != j) {
                counter++;
            }
        }
    }
    return counter;
}

var NUMBER = 4;

// сыграем
var hidden = hiddenNum(NUMBER);
var guess = Number;
var wannaplay = 'y';
var count = 0;

while (wannaplay == 'y') {
    count++;
    guess = guessNum(NUMBER);
    console.log(hidden);
    alert("Ваш результат " +bullsCounter(hidden, guess)+ " бык (-а/-ов) и " +cowsCounter(hidden, guess)+ " коров(-а/ы)."); //я мог бы натыкать еще пару ифов для плюральных форм, но нет =/
    if (guess == hidden) {
        var wannaplay = prompt("Вы угадали за " +count+ " попыток. Сыграем еще? y/n: ");
        if (wannaplay == 'y') {
            hidden = hiddenNum(NUMBER);
            count = 0;
        }
    }
}