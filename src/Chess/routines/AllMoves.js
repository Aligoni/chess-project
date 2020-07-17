import { InCheck } from './InCheck'

export function AllMoves(color, position, king, check, castling) {
    function addMove(position, moves, data, tempX, tempY, type) {
        if (position[data.position.x][data.position.y].piece === 0 && 
            (tempX === 0 || tempX === 7)) {

            var pieces = [1, 3, 4, 5]
            for (let i = 0; i < pieces.length; i++) {
                moves.push(buildMove(position, data, tempX, tempY, type, pieces[i]))
            }
        } else {
            moves.push(buildMove(position, data, tempX, tempY, type))
        }
    }

    let moves = []
    let data = null

    for (let i = 0; i < 64; i++) {
        let X = toPosition(i).x
        let Y = toPosition(i).y

        if (position[X][Y].piece !== 6 && position[X][Y].player === color) {

            data = {
                piece: position[X][Y].piece,
                player: position[X][Y].player,
                position: {
                    x: X,
                    y: Y,
                    pos: i
                }
            }
            let x = data.position.x
            let y = data.position.y

            if (data.piece === 5) {

                let tempX = x
                let tempY = y
                let blocked = false

                
                while (tempY <= 6 && !blocked) {
                    tempY++
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempY >= 1 && !blocked) {
                    tempY--
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }


                tempX = x
                tempY = y
                blocked = false

                while (tempX <= 6 && !blocked) {
                    tempX++
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempX >= 1 && !blocked) {
                    tempX--
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }
            }

            if (data.piece === 1) {

                let tempX = x
                let tempY = y
                let blocked = false

                while (tempX >= 1 && tempY <= 6 && !blocked) {
                    tempX--
                    tempY++

                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempX >= 1 && tempY >= 1 && !blocked) {
                    tempX--
                    tempY--

                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempX <= 6 && tempY >= 1 && !blocked) {
                    tempX++
                    tempY--

                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempX <= 6 && tempY <= 6 && !blocked) {
                    tempX++
                    tempY++

                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }
            }

            if (data.piece === 4) {

                let tempX = x
                let tempY = y
                let blocked = false


                while (tempY <= 6 && !blocked) {
                    tempY++
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempY >= 1 && !blocked) {
                    tempY--
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }


                tempX = x
                tempY = y
                blocked = false

                while (tempX <= 6 && !blocked) {
                    tempX++
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempX >= 1 && !blocked) {
                    tempX--
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempX >= 1 && tempY <= 6 && !blocked) {
                    tempX--
                    tempY++

                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempX >= 1 && tempY >= 1 && !blocked) {
                    tempX--
                    tempY--

                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempX <= 6 && tempY >= 1 && !blocked) {
                    tempX++
                    tempY--

                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                blocked = false

                while (tempX <= 6 && tempY <= 6 && !blocked) {
                    tempX++
                    tempY++

                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        blocked = true

                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }
            }

            if (data.piece === 3) {
                let tempX = x
                let tempY = y

                tempX -= 2
                tempY += 1
                if (tempX >= 0 && tempY <= 7) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX -= 2
                tempY -= 1
                if (tempX >= 0 && tempY >= 0) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX += 2
                tempY += 1
                if (tempX <= 7 && tempY <= 7) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX += 2
                tempY -= 1
                if (tempX <= 7 && tempY >= 0) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX += 1
                tempY -= 2
                if (tempX <= 7 && tempY >= 0) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX += 1
                tempY += 2
                if (tempX <= 7 && tempY <= 7) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX -= 1
                tempY -= 2
                if (tempX >= 0 && tempY >= 0) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX -= 1
                tempY += 2
                if (tempX >= 0 && tempY <= 7) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }
            }

            if (data.piece === 2) {
                let tempX = x
                let tempY = y

                tempX -= 1
                tempY += 1
                if (tempX >= 0 && tempY <= 7) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king, true)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king, true)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX -= 1
                tempY -= 1
                if (tempX >= 0 && tempY >= 0) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king, true)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king, true)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX += 1
                tempY += 1
                if (tempX <= 7 && tempY <= 7) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king, true)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king, true)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX += 1
                tempY -= 1
                if (tempX <= 7 && tempY >= 0) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king, true)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king, true)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX += 1
                if (tempX <= 7) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king, true)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king, true)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempX -= 1
                if (tempX >= 0) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king, true)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king, true)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempY += 1
                if (tempY <= 7) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king, true)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king, true)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y
                tempY -= 1
                if (tempY >= 0) {
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king, true)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                    } else {
                        if (position[tempX][tempY].player != data.player) {
                            if (validMove(position, tempX, tempY, data, king, true)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }

                tempX = x
                tempY = y

                if (!check) {
                    if (!castling.kSide) {
                        if (position[tempX][tempY + 1].piece === 6 &&
                            position[tempX][tempY + 2].piece === 6) {

                            let one = InCheck(data.player, position, { x: tempX, y: tempY + 1, pos: toBig(tempX, tempY + 1) })
                            let two = InCheck(data.player, position, { x: tempX, y: tempY + 2, pos: toBig(tempX, tempY + 2) })

                            if (!one && !two) {
                                addMove(position, moves, data, tempX, tempY + 2, 'kSide')
                            }
                        }
                    }

                    if (!castling.qSide) {
                        if (position[tempX][tempY - 1].piece === 6 &&
                            position[tempX][tempY - 2].piece === 6 &&
                            position[tempX][tempY - 3].piece === 6) {

                            let one = InCheck(data.player, position, { x: tempX, y: tempY - 1, pos: toBig(tempX, tempY - 1) })
                            let two = InCheck(data.player, position, { x: tempX, y: tempY - 2, pos: toBig(tempX, tempY - 2) })

                            if (!one && !two) {
                                addMove(position, moves, data, tempX, tempY - 2, 'qSide')
                            }
                        }
                    }
                }
            }

            if (data.piece === 0) {
                let tempX = x
                let tempY = y

                if (data.player === "white") {
                    tempX--
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                        if (x === 6) {
                            tempX--
                            if (position[tempX][tempY].piece === 6) {
                                if (validMove(position, tempX, tempY, data, king)) {
                                    addMove(position, moves, data, tempX, tempY, 'normal')
                                }
                            }
                        }
                    }

                    tempX = x - 1
                    tempY = y

                    if (tempY <= 6) {
                        tempY++
                        if (position[tempX][tempY].player != data.player && position[tempX][tempY].piece != 6) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }

                    tempY = y

                    if (tempY >= 1) {
                        tempY--
                        if (position[tempX][tempY].player != data.player && position[tempX][tempY].piece != 6) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                } else {
                    tempX = x
                    tempY = y

                    tempX++

                    if (tempX === 8) {
                        // console.log(tempX + " " + tempY)
                        // console.log(position)
                    }
                    if (position[tempX][tempY].piece === 6) {
                        if (validMove(position, tempX, tempY, data, king)) {
                            addMove(position, moves, data, tempX, tempY, 'normal')
                        }
                        if (x === 1) {
                            tempX++
                            if (position[tempX][tempY].piece === 6) {
                                if (validMove(position, tempX, tempY, data, king)) {
                                    addMove(position, moves, data, tempX, tempY, 'normal')
                                }
                            }
                        }
                    }

                    tempX = x + 1
                    tempY = y

                    if (tempY <= 6) {
                        tempY++
                        if (position[tempX][tempY].player != data.player && position[tempX][tempY].piece != 6) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }

                    tempY = y

                    if (tempY >= 1) {
                        tempY--
                        if (position[tempX][tempY].player != data.player && position[tempX][tempY].piece != 6) {
                            if (validMove(position, tempX, tempY, data, king)) {
                                addMove(position, moves, data, tempX, tempY, 'capture')
                            }
                        }
                    }
                }
            }
        }
    }

    return moves
}

function buildMove(position, data, tempX, tempY, type, promotion) {
    var move = {
        color: data.player,
        from: data.position,
        to: {
            x: tempX,
            y: tempY,
            pos: toBig(tempX, tempY)
        },
        type: type,
        piece: data.piece
    };

    if (promotion) {
        move.promotion = promotion;
    }

    if (type === 'capture') {
        move.captured = position[tempX][tempY].piece
    }

    return move;
}

function validMove(position, tempX, tempY, data, king, kingPiece) {
    let x = data.position.x
    let y = data.position.y

    // if (kingPiece) console.log('king')
    king = clone(king)
    if (kingPiece) {
        king = {
            pos: toBig(tempX, tempY),
            x: tempX,
            y: tempY
        }
    }
    // console.log(king)

    // let temp = position.map((post, i) => {
    //     let inner = post.map((box, j) => {
    //         if (i === x && j === y) {

    //             return {
    //                 piece: 6,
    //                 player: "",
    //                 style: "",
    //                 number: box.number
    //             }
    //         }

    //         if (i === tempX && j === tempY) {

    //             return {
    //                 piece: data.piece,
    //                 player: data.player,
    //                 style: "",
    //                 number: box.number
    //             }
    //         } else {
    //             return box
    //         }
    //     })

    //     return inner
    // })

    let from = {
        piece: position[x][y].piece,
        player: position[x][y].player,
        style: position[x][y].style,
        number: position[x][y].number
    }
    let to = {
        piece: position[tempX][tempY].piece,
        player: position[tempX][tempY].player,
        style: position[tempX][tempY].style,
        number: position[tempX][tempY].number
    }

    position[x][y] = {
        piece: 6,
        player: "",
        style: "",
        number: position[x][y].number
    }

    position[tempX][tempY] = {
        piece: data.piece,
        player: data.player,
        style: "",
        number: position[tempX][tempY].number
    }

    let feedback = InCheck(data.player, position, king, kingPiece)
    feedback = !feedback
    
    position[x][y] = from
    position[tempX][tempY] = to
    return feedback
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