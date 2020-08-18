// загадаем число
function hiddenNum(minNum, maxNum) {
    return Math.floor(minNum + maxNum * Math.random());
}

//введем догадку
function guessNum(minNum, maxNum) {
    var guess = Number;
    while (isNaN(guess)) {
        guess = prompt("введите число от " +minNum+ " до " +maxNum+ ".");
    }
    return guess;
}

// проверим догадку
function guessCheck(hidden, guess, count) {
    if (guess == hidden) {
        alert("Вы угадали за " +count+ " попыток!");
    }
    else if (guess > hidden) {
        alert("Загаданное число меньше!");
    }
    else {
        alert("Загаданное число больше!");
    }
}


var MIN = 0, MAX = 9999;

// сыграем
var hidden = hiddenNum(MIN, MAX);
var guess = Number;
var wannaplay = 'y';
var count = 0;

while (wannaplay == 'y') {
    count++;
    guess = guessNum(MIN, MAX);
    console.log(hidden);
    guessCheck(hidden, guess, count);
    if (guess == hidden) {
        var wannaplay = prompt("сыграем еще? y/n: ");
        if (wannaplay == 'y') {
            hidden = hiddenNum(MIN, MAX);
            count = 0;
        }
    }
}