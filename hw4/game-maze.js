var gameBoard = {
    cells: [],
    startCoords: {
        x: 0,
        y: 0,
        direction: "up",
    }
};

var player = {
    coords: {
        x: 0, 
        y: 0,
        direction: "up",
    },
    state: {
        hasKey: false,
        exitFound: false,
    }
};

var BOARD = ["==========",
             "=        =",
             "=  K     =",
             "=        =",
             "=        =",
             "=     E  =",
             "=        =",
             "=        =",
             "=        =",
             "=========="];

var STARTPOSITION = {
    x : 1,
    y : 8,
    direction: "up",
};

function initBoard(board, startPosition) {
    gameBoard.cells = [];
    for (var i = 0; i < board.length ; i++) {
        gameBoard.cells[i] = [];
        for (var j = 0; j < board.length; j++) {
            switch(board[i][j]) {
                case "K" :
                    gameBoard.cells[i][j] = { type : "Key"};
                    break;
                case "E":
                    gameBoard.cells[i][j] = { type : "Exit"};
                    break;
                case " ":
                    gameBoard.cells[i][j] = { type : "Empty"};
                    break;
                case "=":
                    gameBoard.cells[i][j] = { type : "Wall"};
                    break;
            }
        }
    }
    
    gameBoard.startCoords.x = startPosition.x;
    gameBoard.startCoords.y = startPosition.y;
    gameBoard.startCoords.direction = startPosition.direction;
}

function initPlayer(board) {
    player.coords.x = board.startCoords.x;
    player.coords.y = board.startCoords.y;
    player.coords.direction = board.startCoords.direction;
    player.state.hasKey = false;
    player.state.exitFound = false; 
}

function renderBoard(board) {
    for (var i = 0; i<board.cells.length; i++) {
        var line = "";
        for (var j = 0; j < board.cells[i].length; j++) {
            if (i == player.coords.y && j == player.coords.x) {
                line += "@";
            } else {
                switch (board.cells[i][j].type) {
                    case "Key":
                        line += "K";
                        break;
                    case "Exit":
                        line += "E";
                        break;
                    case "Empty":
                        line += " ";
                        break;
                    case "Wall":
                        line += "=";
                        break;
                }
            }
        }
    console.log(i+ " : " +line);
    }
}

function getNewCoords(player) {
    var result = {
        x: player.coords.x,
        y: player.coords.y,
    }
    switch (player.coords.direction) {
        case "up":
            result.y--;
            break;
        case "down":
            result.y++;
            break;
        case "left":
            result.x--;
            break;
        case "right":
            result.x++;
            break;
    }
    return result;
}

function canMove(player, board) {
    var result = true;
    
    switch (player.coords.direction) {
        case "up": 
            if (player.coords.y == 0 || board.cells[player.coords.y-1][player.coords.x].type == "Wall") {
                result = false;
            }
            break;
        case "down":
            if (player.coords.y == board.cells.length-1 || board.cells[player.coords.y+1][player.coords.x].type == "Wall") {
                result = false;
            }
            break;
        case "left":
            if (player.coords.x == 0 || board.cells[player.coords.y][player.coords.x-1].type == "Wall") {
                result = false;
            }
            break;
        case "right":
            if (player.coords.x == board.cells[player.coords.y].length-1 || board.cells[player.coords.y][player.coords.x+1].type == "Wall") {
                result = false;
            }
            break;
    }
    return result;
}

function movePlayer(player, board) {
    if (canMove(player, board)) {
        var newCoords = getNewCoords(player);

        switch (board.cells[newCoords.y][newCoords.x].type) {
            case "Key":
                player.state.hasKey = true;
                alert("Вы нашли ключ, пора к выходу!");
                break;
            case "Exit":
                if (player.state.hasKey == false) {
                    alert("Выход тут, но он закрыт. Ищите ключ");
                } else {
                    alert("Вы вышли из лабиринта, поздравляю!");
                    player.state.exitFound = true;
                };
                break;
        }
        player.coords.x = newCoords.x;
        player.coords.y = newCoords.y;
        
    } else {
        alert("Вы не можете двигаться в данном направлении");
    }
}


initBoard(BOARD, STARTPOSITION);
initPlayer(gameBoard);


var leftDirection = {
    left: "down", 
    down: "right",
    right: "up",
    up: "left",
}

initBoard(BOARD, STARTPOSITION);
initPlayer(gameBoard);

var rightDirection = {
    left: "up", 
    up: "right",
    right: "down",
    down: "left",
}

var counter = 0;
var stepHistory = {};  // вообще было бы проще это запихнуть в список, но раз уж тема - объекты, будем через них

function stepRecords(counter, command, player) {        //задание №2 я понял так, записывать историю ходов и вывести по требованию старые и новые координаты.
    stepHistory[counter] = {old: {x: player.coords.x ,y: player.coords.y,}, new: getNewCoords(player)} ;
}

while (!player.state.exitFound) {
    renderBoard(gameBoard);
    var command = prompt("Введите команду (go/left/right/exit/show). Текущее направление " +player.coords.direction);
    
    switch (command) {
        case "go":
            counter++; 
            stepRecords(counter, command, player);
            console.log(stepHistory);
            movePlayer(player, gameBoard);
            break;
        case "left":
            player.coords.direction = leftDirection[player.coords.direction];
            break;
        case "right":
            player.coords.direction = rightDirection[player.coords.direction];
            break;
        case "exit":
            player.state.exitFound = true;
            break;
        case "show":
            var showStep = prompt("Введите номер шага, который хотите увидеть");
            console.log(stepHistory[showStep]);
            break;
        default:
            alert("неизвестная команда");
    }
}
    
alert("гейм овер. вы победили на ходе #" +counter);