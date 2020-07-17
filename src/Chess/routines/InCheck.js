var ATTACKS = [
    20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20, 0,
    0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0,
    0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0,
    0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0,
    0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    24, 24, 24, 24, 24, 24, 56, 0, 56, 24, 24, 24, 24, 24, 24, 0,
    0, 0, 0, 0, 0, 2, 53, 56, 53, 2, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 20, 2, 24, 2, 20, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 20, 0, 0, 24, 0, 0, 20, 0, 0, 0, 0, 0,
    0, 0, 0, 20, 0, 0, 0, 24, 0, 0, 0, 20, 0, 0, 0, 0,
    0, 0, 20, 0, 0, 0, 0, 24, 0, 0, 0, 0, 20, 0, 0, 0,
    0, 20, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 20, 0, 0,
    20, 0, 0, 0, 0, 0, 0, 24, 0, 0, 0, 0, 0, 0, 20
];

// var RAYS = [
//     17, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 15, 0,
//     0, 17, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 15, 0, 0,
//     0, 0, 17, 0, 0, 0, 0, 16, 0, 0, 0, 0, 15, 0, 0, 0,
//     0, 0, 0, 17, 0, 0, 0, 16, 0, 0, 0, 15, 0, 0, 0, 0,
//     0, 0, 0, 0, 17, 0, 0, 16, 0, 0, 15, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 17, 0, 16, 0, 15, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, 0, 17, 16, 15, 0, 0, 0, 0, 0, 0, 0,
//     1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0,
//     0, 0, 0, 0, 0, 0, -15, -16, -17, 0, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, 0, -15, 0, -16, 0, -17, 0, 0, 0, 0, 0, 0,
//     0, 0, 0, 0, -15, 0, 0, -16, 0, 0, -17, 0, 0, 0, 0, 0,
//     0, 0, 0, -15, 0, 0, 0, -16, 0, 0, 0, -17, 0, 0, 0, 0,
//     0, 0, -15, 0, 0, 0, 0, -16, 0, 0, 0, 0, -17, 0, 0, 0,
//     0, -15, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, -17, 0, 0,
//     -15, 0, 0, 0, 0, 0, 0, -16, 0, 0, 0, 0, 0, 0, -17
// ];

var RAYS = [
    9, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 7, 0,
    0, 9, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 7, 0, 0,
    0, 0, 9, 0, 0, 0, 0, 8, 0, 0, 0, 0, 7, 0, 0, 0,
    0, 0, 0, 9, 0, 0, 0, 8, 0, 0, 0, 7, 0, 0, 0, 0,
    0, 0, 0, 0, 9, 0, 0, 8, 0, 0, 7, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 9, 0, 8, 0, 7, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 9, 8, 7, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 0, -1, -1, -1, -1, -1, -1, -1, 0,
    0, 0, 0, 0, 0, 0, -7, -8, -9, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, -7, 0, -8, 0, -9, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, -7, 0, 0, -8, 0, 0, -9, 0, 0, 0, 0, 0,
    0, 0, 0, -7, 0, 0, 0, -8, 0, 0, 0, -9, 0, 0, 0, 0,
    0, 0, -7, 0, 0, 0, 0, -8, 0, 0, 0, 0, -9, 0, 0, 0,
    0, -7, 0, 0, 0, 0, 0, -8, 0, 0, 0, 0, 0, -9, 0, 0,
    -7, 0, 0, 0, 0, 0, 0, -8, 0, 0, 0, 0, 0, 0, -9
];

var SHIFTS = { p: 0, n: 1, b: 2, r: 3, q: 4, k: 5 };

export function InCheck(color, positionIn, king) {

    let position = positionIn
    // console.log(position[king.x][king.y])
    for (let x = 0; x < position.length; x++) {
        for (let y = 0; y < position[x].length; y++) {
            let box = position[x][y]

            if (box.piece !== 6 && box.player !== color) {
                // console.log(box)

                let piece = box;
                let difference = indexing(piece.number) - indexing(king.pos);
                let index = difference + 119;
                // console.log(index, ATTACKS[index])

                if (ATTACKS[index] & (1 << SHIFTS[refactorName(piece.piece)])) {
                    // console.log((ATTACKS[index] & (1 << SHIFTS[refactorName(piece.piece)])) + ', ' + ATTACKS[index])
                   if (piece.piece === '0') {
                        if (difference > 0) {
                            if (piece.player === 'white') return true;
                        } else {
                            if (piece.player === 'black') return true;
                        }
                    }

                    /* if the piece is a knight or a king */
                    if (refactorName(piece.piece) === 'n' || refactorName(piece.piece) === 'k') return true;

                    let offset = RAYS[index];
                    // console.log('Offset '+ offset)
                    let j = piece.number + offset;

                    let blocked = false;
                    while (j !== king.pos) {
                        if (j < 0 || j > 63) {
                            blocked = true;
                            break; 
                        }
                        if (position[toPosition(j).x][toPosition(j).y].piece != '6') { 
                            blocked = true; 
                            break; 
                        }

                        j += offset;
                    }

                    if (!blocked) return true;
                }
            }
        }
    }

    return false
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

function toBig(x, y) {
    return 8 * x + y
}

function toPosition(big) {
    return {
        x: Math.floor((big) / 8),
        y: (big) % 8,
        pos: big
    }
}

function indexing(index) {
    let x = Math.floor((index) / 8)
    return index + x * 8
}