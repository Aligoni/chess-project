export function Moves(dataIn, positionIn) {
        let data = dataIn
        let position = positionIn

        if (data.piece === 0) {
            let x = data.position.x
            let y = data.position.y
            

            if (data.player === "white") {
                if (position[x - 1][y].piece === 6) {
                    position = position.map((post, X) => {
                        let inner = post.map((box, Y) => {
                            if (X === (x - 1) && Y === y) {
                                return {
                                    piece: 6,
                                    player: "",
                                    style: "path",
                                    number: box.number
                                }
                            }

                            return box
                        })

                        return inner
                    })

                    if (x === 6) {
                        if (position[x - 2][y].piece === 6) {
                            position = position.map((post, X) => {
                                let inner = post.map((box, Y) => {
                                    if (X === (x - 2) && Y === y) {
                                        return {
                                            piece: 6,
                                            player: "",
                                            style: "path",
                                            number: box.number
                                        }
                                    }

                                    return box
                                })

                                return inner
                            })
                        }
                    }
                }

                let tempX = x - 1
                let tempY = y

                if (tempY <= 6) {
                    if (positionIn[tempX][tempY + 1].player != data.player && positionIn[tempX][tempY + 1].piece != 6) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === (tempX) && j === (tempY + 1)) {

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
                    }
                }

                if (tempY >= 1) {
                    if (positionIn[tempX][tempY - 1].player != data.player && positionIn[tempX][tempY - 1].piece != 6) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === (tempX) && j === (tempY - 1)) {

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
                    }
                }
            } else {
                if (position[x + 1][y].piece === 6) {
                    position = position.map((post, X) => {
                        let inner = post.map((box, Y) => {
                            if (X === (x + 1) && Y === y) {
                                return {
                                    piece: 6,
                                    player: "",
                                    style: "path",
                                    number: box.number
                                }
                            }

                            return box
                        })

                        return inner
                    })

                    if (x === 1) {
                        if (position[x + 2][y].piece === 6) {
                            position = position.map((post, X) => {
                                let inner = post.map((box, Y) => {
                                    if (X === (x + 2) && Y === y) {
                                        return {
                                            piece: 6,
                                            player: "",
                                            style: "path",
                                            number: box.number
                                        }
                                    }

                                    return box
                                })

                                return inner
                            })
                        }
                    }
                }

                let tempX = x + 1
                let tempY = y

                if (tempY <= 6) {
                    if (positionIn[tempX][tempY + 1].player != data.player && positionIn[tempX][tempY + 1].piece != 6) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === (tempX) && j === (tempY + 1)) {

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
                    }
                }

                if (tempY >= 1) {
                    if (positionIn[tempX][tempY - 1].player != data.player && positionIn[tempX][tempY - 1].piece != 6) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === (tempX) && j === (tempY - 1)) {

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

            while (tempY <= 6 && !blocked) {
                tempY++
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            blocked = false

            while (tempY >= 1 && !blocked) {
                tempY--
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }


            tempX = x
            tempY = y
            blocked = false

            while (tempX <= 6 && !blocked) {
                tempX++
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            blocked = false

            while (tempX >= 1 && !blocked) {
                tempX--
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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

            while (tempX >= 1 && tempY <= 6 && !blocked) {
                tempX--
                tempY++
                
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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

            while (tempX >= 1 && tempY <= 6 && !blocked) {
                tempX--
                tempY++

                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            blocked = false

            while (tempY <= 6 && !blocked) {
                tempY++
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            blocked = false

            while (tempY >= 1 && !blocked) {
                tempY--
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }


            tempX = x
            tempY = y
            blocked = false

            while (tempX <= 6 && !blocked) {
                tempX++
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            blocked = false

            while (tempX >= 1 && !blocked) {
                tempX--
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    blocked = true

                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }
        }

        if (data.piece === 3) {
            let x = data.position.x
            let y = data.position.y

            let tempX = x
            let tempY = y

            tempX -= 2
            tempY += 1
            if (tempX >= 0 && tempY <= 7) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX -= 2
            tempY -= 1
            if (tempX >= 0 && tempY >= 0) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX += 2
            tempY += 1
            if (tempX <= 7 && tempY <= 7) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX += 2
            tempY -= 1
            if (tempX <= 7 && tempY >= 0) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX += 1
            tempY -= 2
            if (tempX <= 7 && tempY >= 0) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX += 1
            tempY += 2
            if (tempX <= 7 && tempY <= 7) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX -= 1
            tempY -= 2
            if (tempX >= 0 && tempY >= 0) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX -= 1
            tempY += 2
            if (tempX >= 0 && tempY <= 7) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }
        }

        if (data.piece === 2) {
            let x = data.position.x
            let y = data.position.y

            let tempX = x
            let tempY = y

            tempX -= 1
            tempY += 1
            if (tempX >= 0 && tempY <= 7) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX -= 1
            tempY -= 1
            if (tempX >= 0 && tempY >= 0) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX += 1
            tempY += 1
            if (tempX <= 7 && tempY <= 7) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX += 1
            tempY -= 1
            if (tempX <= 7 && tempY >= 0) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX += 1
            if (tempX <= 7) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempX -= 1
            if (tempX >= 0) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempY += 1
            if (tempY <= 7) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }

            tempX = x
            tempY = y
            tempY -= 1
            if (tempY >= 0) {
                if (position[tempX][tempY].piece === 6) {
                    position = position.map((post, i) => {
                        let inner = post.map((box, j) => {
                            if (i === tempX && j === tempY) {

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
                } else {
                    if (position[tempX][tempY].player != data.player) {
                        position = position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (i === tempX && j === tempY) {

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
                    }
                }
            }
        }

        return position
    }