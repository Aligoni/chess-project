import { AllMoves } from './AllMoves'
import { InCheck } from './InCheck'

let position = null
let color = ''
let kings = null
let castling = null
let undoHolder = []

let depthCounter = 0

function initCounter() { depthCounter = 0 }
function addCounter() { depthCounter++ }
function getCounter() { return depthCounter }

export function AI(colorIn, positionIn, kingsIn, castlingIn, depth, isAI) {

    position = positionIn.map(value => {
        let post = value.map(val => {
            return {
                piece: val.piece,
                player: val.player,
                style: "",
                number: val.number
            }
        })
        return post
    })

    color = colorIn
    kings = clone(kingsIn)
    castling = JSON.parse(JSON.stringify(castlingIn))

    if (isAI) depth += Math.floor(Math.random() * 2);

    initCounter()
    const move = minimaxRoot(depth, color === 'black')
    console.log(getCounter())
    
    return move
}

let minimaxRoot = function (depth, isMaximisingPlayer) {
    var newGameMoves = genAllMoves();
    if (depth == 0) {
        return newGameMoves[Math.floor(Math.random() * newGameMoves.length)];
    }
    var bestMove = (color === 'black') ? -9999: 9999;
    let randomize = []
    let randomBestMove = (color === 'black') ? 
        [{ value: -9999, move: null }, { value: -9999, move: null }, { value: -9999, move: null }] : 
        [{ value: 9999, move: null }, { value: 9999, move: null }, { value: 9999, move: null }]
    var bestMoveFound;
    for (var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i]
        // console.log(newGameMove)
        makeMove(newGameMove);
        var value = minimax(depth - 1, -10000, 10000, !isMaximisingPlayer);
        // console.log(value)
        undo();
        randomize.push({
            move: newGameMove,
            value: value
        })
        if (color === 'black') {
            if (value >= bestMove) {
                bestMove = value;
                bestMoveFound = newGameMove;
            }
        } else {
            if (value <= bestMove) {
                bestMove = value;
                bestMoveFound = newGameMove;
            }
        }
    }

    if (randomize.length >= 3) {
        if (color === 'black') {
            for (let index = 0; index < randomize.length; index++) {
                if (randomize[index].value > randomBestMove[0].value) {
                    let temp = randomBestMove[0]
                    randomBestMove[0] = randomize[index]
                    let newTemp = randomBestMove[1]
                    randomBestMove[1] = temp
                    randomBestMove[2] = newTemp
                } else if (randomize[index].value > randomBestMove[1].value) {
                    let newTemp = randomBestMove[1]
                    randomBestMove[1] = randomize[index]
                    randomBestMove[2] = newTemp
                } else if (randomize[index].value > randomBestMove[2].value) {
                    randomBestMove[2] = randomize[index]
                }
            }
        } else {
            for (let index = 0; index < randomize.length; index++) {
                if (randomize[index].value < randomBestMove[0].value) {
                    let temp = randomBestMove[0]
                    randomBestMove[0] = randomize[index]
                    let newTemp = randomBestMove[1]
                    randomBestMove[1] = temp
                    randomBestMove[2] = newTemp
                } else if (randomize[index].value < randomBestMove[1].value) {
                    let newTemp = randomBestMove[1]
                    randomBestMove[1] = randomize[index]
                    randomBestMove[2] = newTemp
                } else if (randomize[index].value < randomBestMove[2].value) {
                    randomBestMove[2] = randomize[index]
                }
            }
        }


        // console.log(randomBestMove)
        if (color === 'black') {
            if (randomBestMove[0].value - randomBestMove[2].value <= 3) {
                bestMoveFound = randomBestMove[Math.floor(Math.random() * 3)].move
            }
        } else {
            if (randomBestMove[2].value - randomBestMove[0].value <= 3) {
                bestMoveFound = randomBestMove[Math.floor(Math.random() * 3)].move
            }
        }
    }

    // console.log(randomize)
    // console.log(randomBestMove)
    // console.log(bestMoveFound)

    // console.log(bestMoveFound)
    return bestMoveFound;
};

let minimax = function (depth, alpha, beta, isMaximisingPlayer) {
    addCounter()

    if (depth === 0) {
        return -evaluateBoard();
    }

    var newGameMoves = genAllMoves();

    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            makeMove(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
            undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            makeMove(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, alpha, beta, !isMaximisingPlayer));
            undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
    }
    return bestMove;
};

let evaluateBoard = function () {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(position[i][j], i, j);
        }
    }
    return totalEvaluation;
};

var reverseArray = function (array) {
    return array.slice().reverse();
};

var pawnEvalWhite =
    [
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        [5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0],
        [1.0, 1.0, 2.0, 3.0, 3.0, 2.0, 1.0, 1.0],
        [0.5, 0.5, 1.0, 2.5, 2.5, 1.0, 0.5, 0.5],
        [0.0, 0.0, 0.0, 2.0, 2.0, 0.0, 0.0, 0.0],
        [0.5, -0.5, -1.0, 0.0, 0.0, -1.0, -0.5, 0.5],
        [0.5, 1.0, 1.0, -2.0, -2.0, 1.0, 1.0, 0.5],
        [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
    ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0, 0.0, 0.0, 0.0, 0.0, -2.0, -4.0],
        [-3.0, 0.0, 1.0, 1.5, 1.5, 1.0, 0.0, -3.0],
        [-3.0, 0.5, 1.5, 2.0, 2.0, 1.5, 0.5, -3.0],
        [-3.0, 0.0, 1.5, 2.0, 2.0, 1.5, 0.0, -3.0],
        [-3.0, 0.5, 1.0, 1.5, 1.5, 1.0, 0.5, -3.0],
        [-4.0, -2.0, 0.0, 0.5, 0.5, 0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var bishopEvalWhite = [
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 1.0, 1.0, 0.5, 0.0, -1.0],
    [-1.0, 0.5, 0.5, 1.0, 1.0, 0.5, 0.5, -1.0],
    [-1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, -1.0],
    [-1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0],
    [-1.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, -1.0],
    [-2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
    [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
    [0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [-0.5, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -0.5],
    [0.0, 0.0, 0.0, 0.5, 0.5, 0.0, 0.0, 0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [-1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-0.5, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [0.0, 0.0, 0.5, 0.5, 0.5, 0.5, 0.0, -0.5],
    [-1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.0, -1.0],
    [-1.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, -1.0],
    [-2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [-2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [-1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [2.0, 2.0, 0.0, 0.0, 0.0, 0.0, 2.0, 2.0],
    [2.0, 3.0, 1.0, 0.0, 0.0, 1.0, 3.0, 2.0]
];

var kingEvalBlack = reverseArray(kingEvalWhite);

var getPieceValue = function (piece, x, y) {
    if (piece.piece === 6) {
        return 0;
    }

    var getAbsoluteValue = function (piece, isWhite, x, y) {
        if (piece.type === 'p') {
            return 10 + (isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x]);
        } else if (piece.type === 'r') {
            return 50 + (isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x]);
        } else if (piece.type === 'n') {
            return 30 + knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + (isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x]);
        } else if (piece.type === 'q') {
            return 90 + evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + (isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x]);
        }
        throw "Unknown piece type: " + piece.type;
    };


    let temp = {
        type: refactorName(piece.piece),
    }
    var absoluteValue = getAbsoluteValue(temp, piece.player === 'white', x, y);
    return piece.player === 'white' ? absoluteValue : -absoluteValue;
};


function genAllMoves() {
    let check = InCheck(color, position, kings[color])
    const validMoves = AllMoves( color, position, kings[color], check, castling[color] )

    return validMoves
}

function makeMove(move) {
    // undoHolder = {
    //     undo: clone(undoHolder),
    //     position: clone(position),
    //     color: color,
    //     kings: clone(kings),
    //     castling: clone(castling)
    // }

    undoHolder.push({
        position: clone(position),
        color: color,
        kings: clone(kings),
        castling: clone(castling)
    })
    
    position = position.map((post, i) => {
        let inner = post.map((box, j) => {
            if (i === move.to.x && j === move.to.y) {
                if (move.promotion) {
                    return {
                        piece: move.promotion,
                        player: move.color,
                        style: "",
                        number: box.number
                    }
                }
                return {
                    piece: move.piece,
                    player: move.color,
                    style: "",
                    number: box.number
                }
            }

            if (move.piece === 2) {
                if (move.type === 'kSide') {
                    if (i === move.to.x && j === move.to.y + 1) {
                        return {
                            piece: 6,
                            player: '',
                            style: "",
                            number: box.number
                        }
                    }

                    if (i === move.to.x && j === move.to.y - 1) {
                        return {
                            piece: 5,
                            player: move.color,
                            style: "",
                            number: box.number
                        }
                    }
                } else if (move.type === 'qSide') {
                    if (i === move.to.x && j === move.to.y - 2) {
                        return {
                            piece: 6,
                            player: '',
                            style: "",
                            number: box.number
                        }
                    }

                    if (i === move.to.x && j === move.to.y + 1) {
                        return {
                            piece: 5,
                            player: move.color,
                            style: "",
                            number: box.number
                        }
                    }
                }
            } 

            if (i === move.from.x && j === move.from.y) {

                return {
                    piece: 6,
                    player: '',
                    style: "",
                    number: box.number
                }
            }
            
            return box
        })

        return inner
    })

    if (move.piece === 2) {
        kings[color] = {
            x: move.to.x,
            y: move.to.y,
            pos: move.to.pos
        }

        castling[color].kSide = castling[color].qSide = true
    }

    if (move.piece === 5) {
        if (move.from.y === 0) {
            castling[color].qSide = true
        } else if (move.from.y === 7) {
            castling[color].kSide = true
        }
    }

    if (move.captured === 5) {
        if (move.to.y === 0) {
            castling[swapColor(color)].kSide = true
        } else if (move.to.y === 7) {
            castling[swapColor(color)].qSide = true
        }
    }

    color = swapColor(color)
}

function undo() {
    var history = undoHolder.pop()
    
    position = history.position
    color = history.color
    kings = history.kings
    castling = history.castling
}

function swapColor(obj) {
    return obj === 'white' ? 'black' : 'white'
}


// function clone(obj) {
//     return JSON.parse(JSON.stringify(obj))
// }

function clone(obj) {
    var dupe = (obj instanceof Array) ? [] : {};

    for (var property in obj) {
        if (typeof property === 'object') {
            dupe[property] = clone(obj[property]);
        } else {
            dupe[property] = obj[property];
        }
    }

    return dupe;
}

function toPosition(big) {
    return {
        x: Math.floor((big) / 8),
        y: (big) % 8,
        pos: big
    }
}

function toBig(x, y) {
    return 8 * x + y
}

function refactorName(piece) { 
    if (piece === 0) {
        return 'p'
    }
    if (piece === 1) {
        return 'b'
    }
    if (piece === 2) {
        return 'k'
    }
    if (piece === 3) {
        return 'n'
    }
    if (piece === 4) {
        return 'q'
    }
    if (piece === 5) {
        return 'r'
    }
}