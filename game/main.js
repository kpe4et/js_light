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

// сыграем

var hidden = hiddenNum(0, 9999);
var guess = Number;
var wannaplay = 'y';
var count = 0;

while (wannaplay == 'y') {
    count++;
    guess = guessNum(0, 9999);
    console.log(hidden);
    guessCheck(hidden, guess, count);
    if (guess == hidden) {
        var wannaplay = prompt("сыграем еще? y/n: ");
        if (wannaplay == 'y') {
            hidden = hiddenNum(0, 9999);
            count = 0;
        }
    }
}