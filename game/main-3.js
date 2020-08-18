//разобьем число на цифры и положим в массив
function numberToArray(number, digits) {
    var numberArr = [];
    for (var i=0; i < digits; i++) {
        numberArr.push(number % 10);
        number = Math.floor(number / 10);
    }
    return numberArr;
}

//проверим, есть ли в массиве одинаковые цифры, может, перезагадать надо.
function numberCheck(number, digits) {
    var numberArr = numberToArray(number, digits);
    for (var i = 0; i < digits; i++ ) {
        for (var j = i + 1; j < digits; j++ ) {
            if (numberArr[i] == numberArr[j]) {
                return true; // останемся в цикле
            }
        }
    }
    return false; // выйдем из цикла
}


// загадаем число
function hiddenNum(digits) {
    var hidden = Number;
    hidden = Math.floor((Math.pow(10, digits) - 1) * Math.random());
    alert(hidden);
    alert(numberCheck(hidden, digits));
//    while(numberCheck(hidden, digits)) {
//        hidden = Math.floor((Math.pow(10, digits) - 1) * Math.random());
//        alert(hidden);
//    }
    return hidden;
}


//введем догадку
function guessNum(digits) {
    var guess = Number;
    while (!(guess > 0) || (isNaN(guess)) || (numberToArray(guess, digits).length != digits)) {            
        guess = prompt("введите положительное число, состоящиее из " +digits+ " разных цифр.");
    }
    return guess;
}

//сравним введенное число и загаданное, поищем быков
function bullsCounter(hidden, guess, digits) {
    var guessArr = numberToArray(guess, digits);
    var hiddenArr = numberToArray(hidden, digits);
    var counter = 0;
    for (var i=0; i < digits; i++) {
        if (guessArr[i] == hiddenArr[i]) {
            counter++;
        }
    }
    return counter;
}

//сравним введенное число и загаданное и поищем коров
function cowsCounter(hidden, guess, digits) {
    var guessArr = numberToArray(guess, digits);
    var hiddenArr = numberToArray(hidden, digits);
    var counter = 0;
    for (var i=0; i < digits; i++) { 
        for (var j=0; j < hiddenArr.length; j++) {
            if ((guessArr[i] == hiddenArr[j]) && (i != j)) {
                counter++;
            }
        }
    }
    return counter;
}

var NUMBER = 4;

// сыграем
var hidden = hiddenNum(NUMBER);
console.log(hidden);
var guess = Number;
var wannaplay = 'y';
var count = 0;


while (wannaplay == 'y') {
    count++;
    guess = guessNum(NUMBER);
    console.log(hidden);
    alert("Ваш результат " +bullsCounter(hidden, guess, NUMBER)+ " бык (-а/-ов) и " +cowsCounter(hidden, guess, NUMBER)+ " коров(-а/ы)."); //я мог бы натыкать еще пару ифов для плюральных форм, но нет =/
    if (guess == hidden) {
        var wannaplay = prompt("Вы угадали за " +count+ " попыток. Сыграем еще? y/n: ");
        if (wannaplay == 'y') {
            hidden = hiddenNum(NUMBER);
            count = 0;
        }
    }
}