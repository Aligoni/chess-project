import { InCheck } from './InCheck'

export function LegalMoves(dataIn, positionIn, king, check, castling) {
    let data = dataIn
    let position = positionIn

    if (data.piece === 0) {
        let x = data.position.x
        let y = data.position.y

        let tempX = x
        let tempY = y

        let temp = JSON.parse(JSON.stringify(position))

        if (data.player === "white") {
            tempX--
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

                if (x === 6) {
                    tempX--
                    if (position[tempX][tempY].piece === 6) {
                        temp = position = pathSub(position, temp, tempX, tempY, data, king).position
                    }
                }
            }

            tempX = x - 1
            tempY = y

            if (tempY <= 6) {
                tempY++
                if (positionIn[tempX][tempY].player != data.player && positionIn[tempX][tempY].piece != 6) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }

            tempY = y

            if (tempY >= 1) {
                tempY--
                if (positionIn[tempX][tempY].player != data.player && positionIn[tempX][tempY].piece != 6) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        } else {
            tempX++
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

                if (x === 1) {
                    tempX++
                    if (position[tempX][tempY].piece === 6) {
                        temp = position = pathSub(position, temp, tempX, tempY, data, king).position
                    }
                }
            }

            tempX = x + 1
            tempY = y

            if (tempY <= 6) {
                tempY++
                if (positionIn[tempX][tempY].player != data.player && positionIn[tempX][tempY].piece != 6) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }

            tempY = y

            if (tempY >= 1) {
                tempY--
                if (positionIn[tempX][tempY].player != data.player && positionIn[tempX][tempY].piece != 6) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }
    }

    if (data.piece === 5) {
        let x = data.position.x
        let y = data.position.y

        let tempX = x
        let tempY = y
        let blocked = false

        let temp = JSON.parse(JSON.stringify(position))

        while (tempY <= 6 && !blocked) {
            tempY++
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        blocked = false

        while (tempY >= 1 && !blocked) {
            tempY--
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }


        tempX = x
        tempY = y
        blocked = false

        while (tempX <= 6 && !blocked) {
            tempX++
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        blocked = false

        while (tempX >= 1 && !blocked) {
            tempX--
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }
    }

    if (data.piece === 1) {
        let x = data.position.x
        let y = data.position.y

        let tempX = x
        let tempY = y
        let blocked = false

        let temp = JSON.parse(JSON.stringify(position))

        while (tempX >= 1 && tempY <= 6 && !blocked) {
            tempX--
            tempY++

            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        blocked = false

        temp = JSON.parse(JSON.stringify(position))

        while (tempX >= 1 && tempY >= 1 && !blocked) {
            tempX--
            tempY--

            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        blocked = false

        temp = JSON.parse(JSON.stringify(position))

        while (tempX <= 6 && tempY >= 1 && !blocked) {
            tempX++
            tempY--

            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        blocked = false

        temp = JSON.parse(JSON.stringify(position))

        while (tempX <= 6 && tempY <= 6 && !blocked) {
            tempX++
            tempY++

            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }
    }

    if (data.piece === 4) {
        let x = data.position.x
        let y = data.position.y

        let tempX = x
        let tempY = y
        let blocked = false
        
        let temp = JSON.parse(JSON.stringify(position))

        while (tempX >= 1 && tempY <= 6 && !blocked) {
            tempX--
            tempY++

            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
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
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
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
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
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
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        blocked = false

        while (tempY <= 6 && !blocked) {
            tempY++
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        blocked = false

        while (tempY >= 1 && !blocked) {
            tempY--
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }


        tempX = x
        tempY = y
        blocked = false

        while (tempX <= 6 && !blocked) {
            tempX++
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        blocked = false

        while (tempX >= 1 && !blocked) {
            tempX--
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position
            } else {
                blocked = true

                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }
    }

    if (data.piece === 3) {
        let x = data.position.x
        let y = data.position.y

        let tempX = x
        let tempY = y

        let temp = JSON.parse(JSON.stringify(position))

        tempX -= 2
        tempY += 1
        if (tempX >= 0 && tempY <= 7) {
            if (position[tempX][tempY].piece === 6) {

                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

            } else {
                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX -= 2
        tempY -= 1
        if (tempX >= 0 && tempY >= 0) {
            if (position[tempX][tempY].piece === 6) {

                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

            } else {
                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX += 2
        tempY += 1
        if (tempX <= 7 && tempY <= 7) {
            if (position[tempX][tempY].piece === 6) {

                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

            } else {
                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX += 2
        tempY -= 1
        if (tempX <= 7 && tempY >= 0) {
            if (position[tempX][tempY].piece === 6) {

                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

            } else {
                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX += 1
        tempY -= 2
        if (tempX <= 7 && tempY >= 0) {
            if (position[tempX][tempY].piece === 6) {

                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

            } else {
                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX += 1
        tempY += 2
        if (tempX <= 7 && tempY <= 7) {
            if (position[tempX][tempY].piece === 6) {

                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

            } else {
                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX -= 1
        tempY -= 2
        if (tempX >= 0 && tempY >= 0) {
            if (position[tempX][tempY].piece === 6) {
                
                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

            } else {
                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX -= 1
        tempY += 2
        if (tempX >= 0 && tempY <= 7) {
            if (position[tempX][tempY].piece === 6) {

                temp = position = pathSub(position, temp, tempX, tempY, data, king).position

            } else {
                if (position[tempX][tempY].player != data.player) {
                    position = temp = targetSub(position, temp, tempX, tempY, data, king).position
                }
            }
        }
    }

    if (data.piece === 2) {
        let x = data.position.x
        let y = data.position.y

        let tempX = x
        let tempY = y

        let temp = JSON.parse(JSON.stringify(position))

        tempX -= 1
        tempY += 1
        if (tempX >= 0 && tempY <= 7) {
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king, true).position
            } else {
                if (position[tempX][tempY].player != data.player) {
                    temp = position = targetSub(position, temp, tempX, tempY, data, king, true).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX -= 1
        tempY -= 1
        if (tempX >= 0 && tempY >= 0) {
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king, true).position
            } else {
                if (position[tempX][tempY].player != data.player) {
                    temp = position = targetSub(position, temp, tempX, tempY, data, king, true).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX += 1
        tempY += 1
        if (tempX <= 7 && tempY <= 7) {
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king, true).position
            } else {
                if (position[tempX][tempY].player != data.player) {
                    temp = position = targetSub(position, temp, tempX, tempY, data, king, true).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX += 1
        tempY -= 1
        if (tempX <= 7 && tempY >= 0) {
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king, true).position
            } else {
                if (position[tempX][tempY].player != data.player) {
                    temp = position = targetSub(position, temp, tempX, tempY, data, king, true).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX += 1
        if (tempX <= 7) {
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king, true).position
            } else {
                if (position[tempX][tempY].player != data.player) {
                    temp = position = targetSub(position, temp, tempX, tempY, data, king, true).position
                }
            }
        }

        tempX = x
        tempY = y
        tempX -= 1
        if (tempX >= 0) {
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king, true).position
            } else {
                if (position[tempX][tempY].player != data.player) {
                    temp = position = targetSub(position, temp, tempX, tempY, data, king, true).position
                }
            }
        }

        tempX = x
        tempY = y
        tempY += 1
        if (tempY <= 7) {
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king, true).position
            } else {
                if (position[tempX][tempY].player != data.player) {
                    temp = position = targetSub(position, temp, tempX, tempY, data, king, true).position
                }
            }
        }

        tempX = x
        tempY = y
        tempY -= 1
        if (tempY >= 0) {
            if (position[tempX][tempY].piece === 6) {
                temp = position = pathSub(position, temp, tempX, tempY, data, king, true).position
            } else {
                if (position[tempX][tempY].player != data.player) {
                    temp = position = targetSub(position, temp, tempX, tempY, data, king, true).position
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
                        position = castle(position, tempX, tempY + 2)
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
                        position = castle(position, tempX, tempY - 2)
                    }
                }
            }
        }
    }

    return position
}

function pathSub (positionSub, tempSub, tempXSub, tempYSub, dataSub, kingSub, kingPiece) {
    let x = dataSub.position.x
    let y = dataSub.position.y

    kingSub = clone(kingSub)
    if (kingPiece) {
        kingSub = {
            pos: toBig(tempXSub, tempYSub),
            x: tempXSub,
            y: tempYSub
        }
    }

    positionSub = positionSub.map((post, i) => {
        let inner = post.map((box, j) => {
            if (i === tempXSub && j === tempYSub) {

                return {
                    piece: 6,
                    player: "",
                    style: "path",
                    number: box.number
                }
            } else {
                return box
            }
        })

        return inner
    })

    let newTemp = tempSub.map((post, i) => {
        let inner = post.map((box, j) => {
            if (i === x && j === y) {

                return {
                    piece: 6,
                    player: "",
                    style: "",
                    number: box.number
                }
            }

            if (i === tempXSub && j === tempYSub) {

                return {
                    piece: dataSub.piece,
                    player: dataSub.player,
                    style: "",
                    number: box.number
                }
            } else {
                return box
            }
        })

        return inner
    })

    const feedback = InCheck(dataSub.player, newTemp, kingSub)
    if (feedback) {
        positionSub = tempSub
    }

    tempSub = positionSub

    return {
        temp: tempSub,
        position: positionSub
    }
}

function targetSub(positionSub, tempSub, tempXSub, tempYSub, dataSub, kingSub, kingPiece) {
    let x = dataSub.position.x
    let y = dataSub.position.y

    kingSub = clone(kingSub)
    if (kingPiece) {
        kingSub = {
            pos: toBig(tempXSub, tempYSub),
            x: tempXSub,
            y: tempYSub
        }
    }

    positionSub = positionSub.map((post, i) => {
        let inner = post.map((box, j) => {
            if (i === tempXSub && j === tempYSub) {

                return {
                    piece: box.piece,
                    player: box.player,
                    style: "target",
                    number: box.number
                }
            } else {
                return box
            }
        })

        return inner
    })

    let newTemp = tempSub.map((post, i) => {
        let inner = post.map((box, j) => {
            if (i === x && j === y) {

                return {
                    piece: 6,
                    player: "",
                    style: "",
                    number: box.number
                }
            }

            if (i === tempXSub && j === tempYSub) {

                return {
                    piece: dataSub.piece,
                    player: dataSub.player,
                    style: "",
                    number: box.number
                }
            } else {
                return box
            }
        })

        return inner
    })

    const feedback = InCheck(dataSub.player, newTemp, kingSub)
    if (feedback) {
        positionSub = tempSub
    }

    tempSub = positionSub

    return {
        temp: tempSub,
        position: positionSub
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

function castle(position, tempX, tempY) {
    position = position.map((post, i) => {
        let inner = post.map((box, j) => {
            if (i === tempX && j === tempY) {

                return {
                    piece: 6,
                    player: "",
                    style: "castle",
                    number: box.number
                }
            } else {
                return box
            }
        })

        return inner
    })

    return position
}