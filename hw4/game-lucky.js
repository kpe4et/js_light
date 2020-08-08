var questions = {
    1: ["Liam", 1],
    2: ["I'm only happy when it's rains", 5],
    3: ["Cryin'", 10],
    4: ["12 голых баб", 25],
    5: ["Mein Lied", 50],
    6: ["Say 10", 100],
    7: ["Highway to Hell", 200],
    8: ["Alone I Break", 400],
    9: ["Где твой мундир, генерал?", 600],
    10: ["Русское поле экспериментов", 1000],
}

var answers = {                  // думал, сделать 
    "Liam": {
        a: ["In Extremo", true],
        b: ["Rammstein",  false],
        c: ["Tanzwut", false],
        d: ["Стрелки", false],
    }, 
    "I'm only happy when it's rains": {
        a: ["Вопли Видоплясова", false],
        b: ["Led Zeppelin", false], 
        c: ["Backstreet Boys", false],
        d: ["Garbage", true],
    },
    "Cryin'": {
        a: ["Aerosmith", true],
        b: ["Машина времени", false], 
        c: ["Nickelback", false],
        d: ["Madonna", false],
    }, 
    "12 голых баб": {
        a: ["Алиса", false],
        b: ["Кино", false], 
        c: ["Аквариум", true],
        d: ["Metallica", false],
    }, 
    "Mein Lied": {
        a: ["Олег Газманов", false],
        b: ["Schandmaul", true], 
        c: ["Ляпис Трубецкой", false],
        d: ["Sex Pistols", false],
    }, 
    "Say 10": {
        a: ["Aqua", false],
        b: ["Eagles", false], 
        c: ["Marilyn Manson", true],
        d: ["ZZ Top", false],
    }, 
    "Highway to Hell": {
        a: ["AC/DC", true],
        b: ["Юрий Лоза", false], 
        c: ["Deep Purple", false],
        d: ["Eminem", false],
    }, 
    "Alone I Break": {
        a: ["Limp Bizkit", false],
        b: ["Korn", true], 
        c: ["DDT", false],
        d: ["Rage Against The Machines", false],
    }, 
    "Где твой мундир, генерал?": {
        a: ["Автоматические Удовлетворители", false],
        b: ["Пилот", false], 
        c: ["Кино", true],
        d: ["Lumen", false],
    }, 
    "Русское поле экспериментов": {
        a: ["Michael Jackson", false],
        b: ["Elvis Presley", false],
        c: ["The Doors", false],
        d: ["Гражданская Оборона", true],
    },
}

var player = {
    currentQuestion: 1,
    money: { 
        current: 0, 
        ckeckpoint: 0,
    },
    state: {
        incorrectAnswer: false,
        won: false,
    },
}

function questionAsk(questions, player, answers) {
    
    var askQuestion = "Кто исполнитель песни " +questions[player.currentQuestion][0]+ "? \n"+"Ответ принимается в формате a / b / c / d:";
    for (var i in answers[questions[player.currentQuestion][0]]) {
        askQuestion += "\n" + i + ": " + answers[questions[player.currentQuestion][0]][i][0];
    }
    
    var answer;
    while (answer != "a" && answer != "b" && answer != "c" && answer != "d") {
        answer = prompt(askQuestion);
        if (answer != "a" && answer != "b" && answer != "c" && answer != "d") {
            alert("Введите ответ из a / b / c / d");
        }
    }
    
    return answers[questions[player.currentQuestion][0]][answer][1];
}

function moneyMovin(questions, player, result) {
    if (result && player.currentQuestion < 10) {
        player.money.current = questions[player.currentQuestion][1];
        player.currentQuestion++;
        if (player.currentQuestion == 4 || player.currentQuestion == 7 || player) {
            player.money.ckeckpoint = player.money.current;
        }
        alert("Поздравляем! Вы выиграли $" + player.money.current + " и переходите к следующему вопросу!")
    } else if (result && player.currentQuestion == 10) {
        player.money.current = questions[player.currentQuestion][1];
        alert("Поздравляю! Вы выиграли $" + player.money.current + ". А оставшиеся деньги как обычно ушли капиталистам. Разве вы не читали мелкий шрифт?");
        player.state.won = true;
        return;
    } else {
        player.money.current == player.money.checkpoint;
        player.state.incorrectAnswer = true;
        alert("Ответ неверен. Вы получаете свою несгораемую сумму $" + player.money.current);
        return;
    }
    
}

while (!player.state.won && !player.state.incorrectAnswer) {
    var result = questionAsk(questions, player, answers);
    moneyMovin(questions, player, result);
    console.log(player.state.won);
    console.log(player.state.incorrectAnswer);
}