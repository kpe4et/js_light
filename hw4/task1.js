var obj = {}, number = Number;

function numberToObject(number) {
    var numberObj = {};
    if (number >= 0 && number <= 999) {
        numberObj['единицы'] = number % 10;       // хотел циклом, да тут все равно вручную называть, хоть через список, хоть так
        if (Math.floor(number / 10) != 0) {
            number = Math.floor(number / 10);
            numberObj['десятки'] = number % 10;
            if (Math.floor(number / 10) != 0) {
                number = Math.floor(number / 10);
                numberObj['сотни'] = number % 10;
            }
        }
    } else {
        console.log("Вы ввели некорректное число");
    }
    return numberObj;
}

number = prompt("Введите число от 0 до 999: ");
obj = numberToObject(number);
console.log(obj);