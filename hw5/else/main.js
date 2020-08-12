var BOARDLENGTH = 8;
var PIECES = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook', 'pawn'];
var LETTERS = 'ABCDEFGH';
var board = {};

//создаем нумерованные объекты ячеек и добавляем им цвет
function boardGeneration(boardLength, letters, board) {
    board = {};
    for (var i = boardLength; i>0; i--) {
        for (var j = 0; j<boardLength; j++) {
            var a = letters[j] + i; 
            if ((i+j)%2==0) {
                board[a] = ['whitebg'];
            } else {
                board[a] = ['darkbg'];
            }
        }
    }
    return board;
}

//добавляем в ячейки соответствующие фигуры, пока не придумал, как сделать лучше
function addPieces(boardLength, letters, board, pieces) {
    for (var i = 1; i<=boardLength; i++) {
        var a = letters[i-1];
        board[a+1].push([pieces[i-1], 'whitePiece']); // сначала делал одноуровневый, но потом решил, что правильнее двухуровневый, т.к. элементы относятся к разному
        board[a+2].push([pieces[boardLength], 'whitePiece']);
        board[a+7].push([pieces[boardLength], 'blackPiece']);
        board[a+8].push([pieces[boardLength-i], 'blackPiece']);
    }
    return board;
}

//выведем доску и фигуры
function renderBoard(boardLength, letters, board) {
    var gameBoard = {};                           // не уверен, что это правильное решение, но показалось проще, чем переделывать доску
    gameBoard.element = document.getElementById('gameboard');
    gameBoard.cells = [];
    
    for (var i = 0; i < boardLength; i++) {    
        for (var j = boardLength; j > 0; j--) {
            var cell = document.createElement('div');
            var a = letters[i] + j;
            cell.classList.add('cell');
            cell.classList.add(board[a][0]);
            gameBoard.cells[a] = { type:board[a][0], element: cell };
            
            if (board[a].length > 1) {            // не придумал лучше способа узнать, существует ли фигура в ячейке
                cell.classList.add('fa');
                cell.classList.add('fa-chess-'+board[a][1][0], board[a][1][1]);
            }
            
            gameBoard.element.appendChild(cell);
        }
    }
}

board = boardGeneration(BOARDLENGTH, LETTERS, board);
board = addPieces(BOARDLENGTH, LETTERS, board, PIECES);
renderBoard(BOARDLENGTH, LETTERS, board);