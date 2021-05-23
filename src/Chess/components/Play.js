import React, { Component } from 'react';
import { AsyncStorage, 
    View, 
    Animated,
    Modal, 
    Image,
    ImageBackground, 
    StyleSheet, 
    Dimensions, 
    Text, 
    ToastAndroid, 
    StatusBar,
    BackHandler, 
    Platform, 
    TouchableOpacity 
} from 'react-native';

import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import { Ionicons, Foundation } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import AwesomeAlert from 'react-native-awesome-alerts';
import EStyleSheet from "react-native-extended-stylesheet";

import Board from './Board'
import Taken from './Taken'
import Message from "./Message"
import Promotion from './Promotion'
import Loading from './Loading'
import Turn from './Turn'
import MoveList from './MoveList';

import links from "../routines/Links";
import { LegalMoves } from '../routines/LegalMoves'
import { InCheck } from '../routines/InCheck'
import { AllMoves } from '../routines/AllMoves'
import { AI } from '../routines/AI'

//-------------------------------FUNCTION TO INITIALIZE MULTI-DIMENSIONAL ARRAYS------------------------//
function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

//---------------------------------------------COMPONENT---------------------------------------------//
export default class Play extends Component {

    //-------------------------------------OBJECTS---------------------------------------//
    backHandler = null

    //-------------------------------------------ROUTINES--------------------------------------------//
    pathUpdateNeeded = false
    kingOnCheck = false
    checkValid = false
    checkCounter = false

    //-----------------------------------------STATELESS VALUES--------------------------------------//
    mode = this.props.route.params.data
    difficulty = this.props.route.params.diff
    modeText = this.props.route.params.modeText
    turn = 'black'
    aiTimer = 0
    aiSpeed = false
    undoTracker = false
    startAnimation = false
    finished = false
    boardType = 3
    helper = true
    sound = true
    winner = false
    restartGame = false

    //----------------------------CONSTRUCTOR TO SET INITIAL STATE VALUE-----------------------------//
    constructor(props) {
        super(props);

        this.state = this.defaultBoard()
    }

    //----------------------------------RESET GAME TO INITIAL DATA-----------------------------------//
    resetBoard = () => {
        this.setState( this.defaultBoard() )
    }

    //---------------------------------------DEFAULT STARTING DATA-----------------------------------//
    defaultBoard = () => {
        let boxes = createArray(8, 8)

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (i % 2 === 0 && j % 2 === 0) {
                    boxes[i][j] = "black"
                } else if (i % 2 === 1 && j % 2 === 1) {
                    boxes[i][j] = "black"
                } else {
                    boxes[i][j] = "white"
                }
            }
        }

        let number = 0

        let position = boxes.map((row, i) => {
            let cell = row.map((col, j) => {
                if (i === 0) {
                    let index = 0
                    switch (j) {
                        case 0: index = 5
                            break;
                        case 1: index = 3
                            break;
                        case 2: index = 1
                            break;
                        case 3: index = 4
                            break;
                        case 4: index = 2
                            break;
                        case 5: index = 1
                            break;
                        case 6: index = 3
                            break;
                        case 7: index = 5
                            break;
                        default: index = 6
                            break;
                    }

                    return {
                        piece: index,
                        player: "black",
                        style: "",
                        number: number++
                    }
                }
                if (i === 1) {
                    let index = 0
                    return {
                        piece: index,
                        player: "black",
                        style: "",
                        number: number++
                    }
                }

                if (i === 7) {
                    let index = 0
                    switch (j) {
                        case 0: index = 5
                            break;
                        case 1: index = 3
                            break;
                        case 2: index = 1
                            break;
                        case 3: index = 4
                            break;
                        case 4: index = 2
                            break;
                        case 5: index = 1
                            break;
                        case 6: index = 3
                            break;
                        case 7: index = 5
                            break;
                        default: index = 6
                            break;
                    }
                    return {
                        piece: index,
                        player: "white",
                        style: "",
                        number: number++
                    }
                }

                if (i === 6) {
                    let index = 0
                    return {
                        piece: index,
                        player: "white",
                        style: "",
                        number: number++
                    }
                }

                return {
                    piece: 6,
                    player: "",
                    style: "",
                    number: number++
                }
            })

            return cell
        })

        return {
            undo: {
                status: false
            },
            selected: {
                status: false,
                piece: 0,
                player: "",
                position: {
                    pos: 111
                }
            },
            castling: {
                white: {
                    kSide: false,
                    qSide: false
                },
                black: {
                    kSide: false,
                    qSide: false
                }
            },
            kings: {
                white: {
                    pos: 60,
                    x: 7,
                    y: 4,
                    check: false
                },
                black: {
                    pos: 4,
                    x: 0,
                    y: 4,
                    check: false
                }
            },
            endGame: {
                status: false
            },
            turn: "white",
            promotion: {},
            animation: {
                animate: new Animated.ValueXY({ x: 0, y: 0 }),
                animating: false,
            },
            paused: false,
            moveCounter: 0,
            thinking: false,
            moveList: {},
            started: false,
            displayList: false,
            nextLevel: false,
            alert: {
                status: false
            },
            totalMoves: 0,
            moves: 0,
            menu: false,
            playable: true,
            taken: {
                white: [],

                black: []
            },
            position: position,
            boxes: boxes
        };
    }

    //--------------------------------PLAYER CLICKS HANDLER----------------------------------//
    handleClick = data => {
        if (this.state.playable ) {
            if (!this.state.started) {
                this.setState({ started: true })
            }

            if (data.isPiece) {
                if (data.info.player === this.state.turn) {
                    if (this.state.selected.position.pos === data.info.number) {
                        let position = this.state.position.map(value => {
                            let post = value.map(val => {
                                if (val.number === this.state.kings[this.state.turn].pos && this.state.kings[this.state.turn].check) {
                                    return {
                                        piece: val.piece,
                                        player: val.player,
                                        style: "check",
                                        number: val.number
                                    }
                                }else {
                                    return {
                                        piece: val.piece,
                                        player: val.player,
                                        style: "",
                                        number: val.number
                                    }
                                }
                            })
                            return post
                        })

                        this.pathUpdateNeeded = false
                        this.kingOnCheck = false

                        this.setState(prevState => {
                            return {
                                selected: {
                                    status: false,
                                    piece: 0,
                                    player: "",
                                    position: {
                                        pos: 111
                                    }
                                },

                                position: position
                            }
                        })
                    } else {
                        let position = this.state.position.map(value => {
                            let post = value.map(val => {
                                if (data.info.number === val.number) {
                                    return {
                                        piece: val.piece,
                                        player: val.player,
                                        style: "yes",
                                        number: val.number
                                    }
                                }

                                if (val.number === this.state.kings[this.state.turn].pos && this.state.kings[this.state.turn].check) {
                                    return {
                                        piece: val.piece,
                                        player: val.player,
                                        style: "check",
                                        number: val.number
                                    }
                                }

                                return {
                                    piece: val.piece,
                                    player: val.player,
                                    style: "",
                                    number: val.number
                                }
                            })
                            return post
                        })

                        this.pathUpdateNeeded = true
                        this.kingOnCheck = false

                        this.setState(prevState => {
                            return {
                                selected: {
                                    status: true,
                                    piece: data.info.piece,
                                    player: data.info.player,
                                    position: {
                                        x: data.posX,
                                        y: data.posY,
                                        pos: data.info.number
                                    }
                                },

                                position: position
                            }
                        })
                    }
                } else {
                    if (data.info.style === "target") {
                        let kings = JSON.parse(JSON.stringify(this.state.kings))

                        let position = this.state.position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (box.number === this.state.selected.position.pos) {
                                    return {
                                        piece: 6,
                                        player: "",
                                        style: "prev",
                                        number: box.number
                                    }
                                } else if (box.number === data.info.number) {
        
                                    return {
                                        piece: this.state.selected.piece,
                                        player: this.state.selected.player,
                                        style: "prev",
                                        number: box.number
                                    }
                                }

                                return {
                                    piece: box.piece,
                                    player: box.player,
                                    style: "",
                                    number: box.number
                                }
                            })

                            return inner
                        })

                        this.pathUpdateNeeded = false
                        this.kingOnCheck = true

                        let promotion = JSON.parse(JSON.stringify(this.state.promotion))

                        if (this.state.selected.piece === 0) {
                            if (this.state.selected.player === "white") {
                                if (this.state.selected.position.x === 1) {
                                    this.kingOnCheck = false   //------------useful for movelist
                                    promotion = data.info
                                }
                            }

                            if (this.state.selected.player === "black") {
                                if (this.state.selected.position.x === 6) {
                                    this.kingOnCheck = false   //------------useful for movelist
                                    promotion = data.info
                                }
                            }
                        }

                        let castling = JSON.parse(JSON.stringify(this.state.castling))

                        if (this.state.selected.piece === 2) {
                            kings[this.state.selected.player] = {
                                pos: data.info.number,
                                x: this.toPosition(data.info.number).x,
                                y: this.toPosition(data.info.number).y
                            }

                            castling[this.state.selected.player].kSide = castling[this.state.selected.player].qSide = true
                        }

                        if (this.state.selected.piece === 5) {
                            if (this.state.selected.position.y === 0) {
                                castling[this.state.selected.player].qSide = true
                            }
                            if (this.state.selected.position.y === 7) {
                                castling[this.state.selected.player].kSide = true
                            }
                        } 

                        if (data.info.piece === 5) {
                            if (data.posY === 0) {
                                castling[data.info.player].qSide = true
                            }
                            if (data.posY === 7) {
                                castling[data.info.player].kSide = true
                            }
                        } 

                        this.startAnimation = true
                        // console.warn(data.info)
                        position[this.toPosition(data.info.number).x][this.toPosition(data.info.number).y] = {
                            piece: data.info.piece,
                            player: data.info.player,
                            style: 'prev',
                            number: data.info.number
                        }
                        this.setState(prevState => {
                            let taken = JSON.parse(JSON.stringify(this.state.taken))

                            if (data.info.player === "white") {
                                taken.white.push(data.info)
                            } else {
                                taken.black.push(data.info)
                            }

                            kings['white'].check = false
                            kings['black'].check = false

                            return {
                              undo: {
                                status: true,

                                undo: prevState.undo,
                                castling: prevState.castling,
                                moveList: prevState.moveList,
                                kings: prevState.kings,
                                moves: prevState.moves,
                                totalMoves: prevState.totalMoves,
                                position: prevState.position,
                                turn: prevState.turn,
                                taken: prevState.taken,
                                selected: prevState.selected
                              },

                                animation: {
                                    animating: true,
                                    animate: new Animated.ValueXY({ x: 0, y: 0 })
                                },
                              moveList: {
                                  undo: prevState.moveList,
                                  move: {
                                      from: this.toPosition(this.state.selected.position.pos),
                                      to: this.toPosition(data.info.number),
                                      color: prevState.turn,
                                      type: 'capture',
                                      piece: prevState.selected.piece,
                                      promotion: !this.kingOnCheck,
                                      captured: data.info.piece
                                  }
                              },
                              selected: {
                                status: false,
                                piece: 0,
                                player: "",
                                position: {
                                  pos: 111
                                }
                              },

                              kings,
                              castling,
                              moveCounter: 0,
                              promotion,
                              totalMoves: prevState.totalMoves + 1,
                              moves:
                                prevState.turn === "white"
                                  ? prevState.moves + 1
                                  : prevState.moves,
                              taken: taken,
                              turn:
                                prevState.turn === "white" ? "black" : "white",
                              position: position
                            };
                        })
                    }
                }
            } else {
                if (this.state.selected.status) {
                    if (data.info.style === "path") {

                        let kings = JSON.parse(JSON.stringify(this.state.kings))

                        let position = this.state.position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (box.number === this.state.selected.position.pos) {
                                    return {
                                        piece: 6,
                                        player: "",
                                        style: "prev",
                                        number: box.number
                                    }
                                } else if (box.number === data.info.number) {
                                    
                                    return {
                                        piece: this.state.selected.piece,
                                        player: this.state.selected.player,
                                        style: "prev",
                                        number: box.number
                                    }
                                }

                                return {
                                    piece: box.piece,
                                    player: box.player,
                                    style: "",
                                    number: box.number
                                }
                            })

                            return inner
                        })

                        this.pathUpdateNeeded = false
                        this.kingOnCheck = true

                        let promotion = JSON.parse(JSON.stringify(this.state.promotion))

                        if (this.state.selected.piece === 0) {
                            if (this.state.selected.player === "white") {
                                if (this.state.selected.position.x === 1) {
                                    this.kingOnCheck = false    //------------useful for movelist
                                    promotion = data.info
                                }
                            }

                            if (this.state.selected.player === "black") {
                                if (this.state.selected.position.x === 6) {
                                    this.kingOnCheck = false    //------------useful for movelist
                                    promotion = data.info
                                }
                            }
                        }

                        let castling = JSON.parse(JSON.stringify(this.state.castling))

                        if (this.state.selected.piece === 2) {
                            kings[this.state.selected.player] = {
                                pos: data.info.number,
                                x: this.toPosition(data.info.number).x,
                                y: this.toPosition(data.info.number).y
                            }

                            castling[this.state.selected.player].kSide = castling[this.state.selected.player].qSide = true
                        }

                        if (this.state.selected.piece === 5) {
                            if (this.state.selected.position.y === 0) {
                                castling[this.state.selected.player].qSide = true
                            } 
                            if (this.state.selected.position.y === 7) {
                                castling[this.state.selected.player].kSide = true
                            } 
                        } 

                        this.startAnimation = true
                        position[this.toPosition(data.info.number).x][this.toPosition(data.info.number).y] = {
                            piece: 6,
                            player: '',
                            style: 'prev',
                            number: data.info.number
                        }
                        this.setState(prevState => {

                            kings['white'].check = false
                            kings['black'].check = false

                            return {
                              undo: {
                                status: true,

                                undo: prevState.undo,
                                moveList: prevState.moveList,
                                castling: prevState.castling,
                                kings: prevState.kings,
                                totalMoves: prevState.totalMoves,
                                position: prevState.position,
                                turn: prevState.turn,
                                moves: prevState.moves,
                                taken: prevState.taken,
                                selected: prevState.selected
                              },

                                animation: {
                                    animating: true,
                                    animate: new Animated.ValueXY({ x: 0, y: 0 })
                                },
                                moveList: {
                                    undo: prevState.moveList,
                                    move: {
                                        from: this.toPosition(this.state.selected.position.pos),
                                        to: this.toPosition(data.info.number),
                                        color: prevState.turn,
                                        type: 'normal',
                                        piece: prevState.selected.piece,
                                        promotion: !this.kingOnCheck
                                    }
                                },

                              selected: {
                                status: false,
                                piece: 0,
                                player: "",
                                position: {
                                  pos: 111
                                }
                              },

                              kings,
                              castling,
                              promotion,
                              moveCounter: prevState.moveCounter + 1,
                              totalMoves: prevState.totalMoves + 1,
                              moves:
                                prevState.turn === "white"
                                  ? prevState.moves + 1
                                  : prevState.moves,
                              turn:
                                prevState.turn === "white" ? "black" : "white",
                              position: position
                            };
                        })

                    } else if (data.info.style === "castle") {

                        let kings = JSON.parse(JSON.stringify(this.state.kings))

                        let qSide = this.toPosition(data.info.number).y === 2

                        let position = this.state.position.map((post, i) => {
                            let inner = post.map((box, j) => {
                                if (qSide) {
                                    if (box.number === data.info.number - 2) {
                                        return {
                                            piece: 6,
                                            player: "",
                                            style: "",
                                            number: box.number
                                        }
                                    }

                                    if (box.number === data.info.number + 1) {
                                        return {
                                            piece: 5,
                                            player: this.state.selected.player,
                                            style: "",
                                            number: box.number
                                        }
                                    } 
                                } else {
                                    if (box.number === data.info.number + 1) {
                                        return {
                                            piece: 6,
                                            player: "",
                                            style: "",
                                            number: box.number
                                        }
                                    }

                                    if (box.number === data.info.number - 1) {
                                        return {
                                            piece: 5,
                                            player: this.state.selected.player,
                                            style: "",
                                            number: box.number
                                        }
                                    } 
                                }

                                if (box.number === this.state.selected.position.pos) {
                                    return {
                                        piece: 6,
                                        player: "",
                                        style: "prev",
                                        number: box.number
                                    }
                                } else if (box.number === data.info.number) {

                                    return {
                                        piece: this.state.selected.piece,
                                        player: this.state.selected.player,
                                        style: "prev",
                                        number: box.number
                                    }
                                }

                                return {
                                    piece: box.piece,
                                    player: box.player,
                                    style: "",
                                    number: box.number
                                }
                            })

                            return inner
                        })

                        let castling = JSON.parse(JSON.stringify(this.state.castling))

                        kings[this.state.selected.player] = {
                            pos: data.info.number,
                            x: this.toPosition(data.info.number).x,
                            y: this.toPosition(data.info.number).y
                        }

                        castling[this.state.selected.player].kSide = castling[this.state.selected.player].qSide = true

                        this.pathUpdateNeeded = false
                        this.kingOnCheck = true

                        this.playTouchSound()
                        this.setState(prevState => {

                            kings['white'].check = false
                            kings['black'].check = false

                            return {
                              undo: {
                                status: true,

                                undo: prevState.undo,
                                castling: prevState.castling,
                                kings: prevState.kings,
                                moveList: prevState.moveList,
                                totalMoves: prevState.totalMoves,
                                position: prevState.position,
                                turn: prevState.turn,
                                moves: prevState.moves,
                                taken: prevState.taken,
                                selected: prevState.selected
                              },

                              moveList: {
                                  undo: prevState.moveList,
                                  move: {
                                      from: this.state.selected.position.pos,
                                      to: data.info.number,
                                      color: prevState.turn,
                                      type: this.toPosition(data.info.number).y === 6 ? 'kSide' : 'qSide',
                                      piece: prevState.selected.piece,
                                  }
                              },

                              selected: {
                                status: false,
                                piece: 0,
                                player: "",
                                position: {
                                  pos: 111
                                }
                              },

                              kings,
                              castling,
                              moveCounter: prevState.moveCounter + 1,
                              totalMoves: prevState.totalMoves + 1,
                              moves:
                                prevState.turn === "white"
                                  ? prevState.moves + 1
                                  : prevState.moves,
                              turn:
                                prevState.turn === "white" ? "black" : "white",
                              position: position
                            };
                        })

                    } else {
                        let position = this.state.position.map(value => {
                            let post = value.map(val => {
                                if (val.number === this.state.kings[this.state.turn].pos && this.state.kings[this.state.turn].check) {
                                    return {
                                        piece: val.piece,
                                        player: val.player,
                                        style: "check",
                                        number: val.number
                                    }
                                }

                                return {
                                    piece: val.piece,
                                    player: val.player,
                                    style: "",
                                    number: val.number
                                }
                            })
                            return post
                        })

                        this.pathUpdateNeeded = false
                        this.kingOnCheck = false

                        this.setState(prevState => {

                            return {
                                selected: {
                                    status: false,
                                    piece: 0,
                                    player: "",
                                    position: {
                                        pos: 111
                                    }
                                },
                                position
                            }
                        })
                    }
                }
            }
        }
    }

    //-----------------------------------PIECE PROMOTION HANDLER---------------------------------//
    handlePromotion = piece => {
        this.kingOnCheck = true

        let position = this.state.position.map(value => {
            let post = value.map(val => {
                if (val.number === this.state.promotion.number) {
                    return {
                        piece: piece,
                        player: val.player,
                        style: "prev",
                        number: val.number
                    }
                }
                return val
            })
            return post
        })

        this.setState(prevState => {
            return {
                promotion: {},
                position: position
            }
        })
    }

    //------------------------------WHEN THE GAME IS LOADED-------------------------------//
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => { this.handleBack(); return true })

        this.loadSettings()

        this.checkSavedGame()

        activateKeepAwake()

        this.loadAudio()

        if (this.mode === 2) this.aiTimer = setTimeout(() => { this.mode2() }, 1111);

        if (this.mode === 3) this.aiTimer = setTimeout(() => { this.mode3() }, this.aiSpeed ? 411: 1111);
    }

    //--------------------------------WHEN THE GAME IS BEING CLOESD------------------------------//
    componentWillUnmount() {
        this.backHandler.remove()

        deactivateKeepAwake()
        
        if (this.aiTimer) {
            clearTimeout(this.aiTimer)
        }
    }

    //-----------------------THIS METHOD IS CALLED AFTER EVERY STATE UPDATE------------------------//
    async componentDidUpdate() {
        if (this.kingOnCheck) this.checkKing()

        this.editProgress()

        if (this.checkValid) this.threeFoldRepeatition()

        if (this.checkCounter) this.fiftyMovesCounter()

        if (this.pathUpdateNeeded) this.setPath()

        if (this.mode === 2 && !this.state.thinking) {
            this.aiTimer = setTimeout(() => {
              this.mode2();
            }, 111);
        }

        if (this.restartGame) {
            this.restartGame = false
            this.setState(prevState => {
                return {
                    thinking: false
                };
            });
        }
        
        if (this.startAnimation) {
            // console.warn(this.state.moveList.move)
            this.startAnimation = false

            // let toX = (this.turn === 'white' && this.mode === 2)
            let toX = true ? 
                boxSize * (this.state.moveList.move.to.y - this.state.moveList.move.from.y) :
                boxSize * (this.state.moveList.move.from.y - this.state.moveList.move.to.y)

            let toY = true ? 
                boxSize * (this.state.moveList.move.to.x - this.state.moveList.move.from.x) :
                boxSize * (this.state.moveList.move.from.x - this.state.moveList.move.to.x)

            Animated.timing(this.state.animation.animate, {
                toValue: { 
                    x: toX ,
                    y: toY 
                },
                duration: this.aiSpeed ? 200 : 500,
                useNativeDriver: true,
            }).start(({ finished }) => {
                this.kingOnCheck = true
                this.setState(prevState => {
                    return {
                        animation: {
                            animating: false,
                        }
                    };
                });
            });

            await this.sleep(this.aiSpeed ? 100 : 300)
            this.playTouchSound()
            await this.sleep(this.aiSpeed ? 50 : 100)
            this.setState(prevState => {
                let final = this.state.position
                final[this.state.moveList.move.to.x][this.state.moveList.move.to.y] = {
                    piece: this.state.moveList.move.piece,
                    player: this.state.moveList.move.color,
                    style: 'prev',
                    number: final[this.state.moveList.move.to.x][this.state.moveList.move.to.y].number
                }
                return {
                    position: final
                };
            });
        }
    }

    //---------------------------METHOD TO HANDLE AI VERSUS AI MOVEMENTS---------------------------//
    mode3 = () => {
        if (!this.state.menu && this.state.playable) {
            this.setState(prevState => {
              return {
                thinking: true
              };
            });

            let feedback = this.makeMove(true)

            this.setState(prevState => {
              return {
                thinking: false
              };
            });

            this.kingOnCheck = true

            this.playTouchSound()

            this.startAnimation = true

            if (feedback.AIMove.type === 'capture') {
                feedback.position[feedback.AIMove.to.x][feedback.AIMove.to.y] = {
                    piece: feedback.AIMove.captured,
                    player: this.swapColor(feedback.AIMove.color),
                    style: 'prev',
                    number: feedback.position[feedback.AIMove.to.x][feedback.AIMove.to.y].number
                }
            } else {
                feedback.position[feedback.AIMove.to.x][feedback.AIMove.to.y] = {
                    piece: 6,
                    player: '',
                    style: 'prev',
                    number: feedback.position[feedback.AIMove.to.x][feedback.AIMove.to.y].number
                }
            }

            this.setState(prevState => {
                return {
                    undo: {
                        status: true,

                        undo: prevState.undo,
                        castling: prevState.castling,
                        kings: prevState.kings,
                        moveList: prevState.moveList,
                        totalMoves: prevState.totalMoves,
                        position: prevState.position,
                        turn: prevState.turn,
                        moves: prevState.moves,
                        taken: prevState.taken,
                        selected: prevState.selected
                    },
                  turn: prevState.turn === "white" ? "black" : "white",
                  castling: feedback.castling,
                  moveList: {
                      undo: prevState.moveList,
                      move: feedback.AIMove
                  },
                    animation: {
                        animating: true,
                        animate: new Animated.ValueXY({ x: 0, y: 0 })
                    },
                  taken: feedback.taken,
                  moveCounter: feedback.AIMove.type === 'capture' ?
                    0: prevState.moveCounter + 1,
                  kings: feedback.kings,
                  totalMoves: prevState.totalMoves + 1,
                  moves:
                    prevState.turn === "white"
                      ? prevState.moves + 1
                      : prevState.moves,
                  position: feedback.position
                };
            })

            this.aiTimer = setTimeout(() => {
                this.mode3()
            }, this.aiSpeed ? 411 : 1511)
        }
    }
    
    //-----------------------------METHOD TO HANDLE AI VERSUS USER MOVEMENTS----------------------//
    mode2 = async () => {
        if (!this.state.menu && 
            this.state.turn === this.turn && 
            this.state.playable && 
            !this.state.thinking &&
            this.state.promotion.player == undefined) {

            this.setState(prevState => {
                console.log('thinking');
              return {
                thinking: true
              };
            });
            console.log('mode 2');
            await this.sleep(1111)
            let start = new Date().getTime()
            let feedback = this.makeMove()
            console.log('Finished searching in ' + (new Date().getTime() - start))

            this.setState(prevState => {
              return {
                thinking: false
              };
            });

            // console.log('Setting state');
            // console.warn(feedback.AIMove)
            this.startAnimation = true

            if (feedback.AIMove.type === 'capture') {
                feedback.position[feedback.AIMove.to.x][feedback.AIMove.to.y] = {
                    piece: feedback.AIMove.captured,
                    player: this.swapColor(feedback.AIMove.color),
                    style: 'prev',
                    number: feedback.position[feedback.AIMove.to.x][feedback.AIMove.to.y].number
                }
            } else {
                feedback.position[feedback.AIMove.to.x][feedback.AIMove.to.y] = {
                    piece: 6,
                    player: '',
                    style: 'prev',
                    number: feedback.position[feedback.AIMove.to.x][feedback.AIMove.to.y].number
                }
            }

            this.setState(prevState => {
                return {
                    animation: {
                        animating: true,
                        animate: new Animated.ValueXY({ x: 0, y: 0 })
                    },
                  turn: prevState.turn === "white" ? "black" : "white",
                  moveList: {
                      undo: prevState.moveList,
                      move: feedback.AIMove
                  },
                  castling: feedback.castling,
                  taken: feedback.taken,
                  moveCounter: feedback.AIMove.type === 'capture' ?
                    0: prevState.moveCounter + 1,
                  kings: feedback.kings,
                  totalMoves: prevState.totalMoves + 1,
                  moves:
                    prevState.turn === "white"
                      ? prevState.moves + 1
                      : prevState.moves,
                  position: feedback.position
                };
            })
            // console.log('done');
        }
    }

    //----------------------------FUNCTION TO RECORD AI MOVEMENTS------------------------------//
    makeMove = (isAI) => {
        const AIMove = AI(
            this.state.turn,
            this.state.position,
            this.state.kings,
            this.state.castling,
            this.difficulty,
            this.aiSpeed ? false : isAI
        )

        if (AIMove.from === undefined) {
            console.log('----------------------------------------------------------------------')
            console.log(AllMoves(
                this.state.turn,
                this.state.position,
                this.state.kings[this.state.turn],
                this.state.kings[this.state.turn].check,
                this.state.castling[this.state.turn]
            ))
            this.saveGame()
        }

        let kings = JSON.parse(JSON.stringify(this.state.kings))
        let castling = JSON.parse(JSON.stringify(this.state.castling))

        kings['white'].check = false
        kings['black'].check = false

        let position = this.state.position.map(value => {
            let post = value.map(val => {
                if (val.number === AIMove.from.pos) {
                    return {
                        piece: 6,
                        player: '',
                        style: "prev",
                        number: val.number
                    }
                } if (val.number === AIMove.to.pos) {
                    if (AIMove.promotion) {
                        return {
                            piece: AIMove.promotion,
                            player: AIMove.color,
                            style: "prev",
                            number: val.number
                        }
                    } else {
                        return {
                            piece: AIMove.piece,
                            player: AIMove.color,
                            style: "prev",
                            number: val.number
                        }
                    }
                }
                return {
                    piece: val.piece,
                    player: val.player,
                    style: "",
                    number: val.number
                }
            })
            return post
        })

        if (AIMove.piece === 2) {
            kings[AIMove.color] = {
                x: AIMove.to.x,
                y: AIMove.to.y,
                pos: AIMove.to.pos,
                status: false
            }

            if (AIMove.type === 'kSide') {
                position[AIMove.to.x][AIMove.to.y - 1].piece = 5
                position[AIMove.to.x][AIMove.to.y - 1].player = AIMove.color
                position[AIMove.to.x][AIMove.to.y + 1] = {
                    piece: 6,
                    player: '',
                    style: '',
                    number: position[AIMove.to.x][AIMove.to.y + 1].number
                }
            } else if (AIMove.type === 'qSide') {
                position[AIMove.to.x][AIMove.to.y + 1].piece = 5
                position[AIMove.to.x][AIMove.to.y + 1].player = AIMove.color
                position[AIMove.to.x][AIMove.to.y - 2] = {
                    piece: 6,
                    player: '',
                    style: '',
                    number: position[AIMove.to.x][AIMove.to.y - 2].number
                }
            }

            castling[AIMove.color].kSide = castling[AIMove.color].qSide = true
        }

        if (AIMove.piece === 5) {
            if (AIMove.from.y === 0) {
                castling[AIMove.color].qSide = true
            } else if (AIMove.from.y === 7) {
                castling[AIMove.color].kSide = true
            }
        }

        if (AIMove.captured === 5) {
            if (AIMove.to.y === 0) {
                castling[this.swapColor(AIMove.color)].kSide = true
            } else if (AIMove.to.y === 7) {
                castling[this.swapColor(AIMove.color)].qSide = true
            }
        }

        let taken = JSON.parse(JSON.stringify(this.state.taken))

        if (AIMove.type === 'capture') {

            taken[this.swapColor(AIMove.color)].push({
                piece: AIMove.captured,
                player: this.swapColor(AIMove.color)
            })
        }
        
        return {
            castling,
            taken,
            kings,
            position,
            AIMove
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    //--------------------------------CONVERTS Z COORDINATES TO X AND Y------------------------------//
    toPosition(big) {
        return {
            x: Math.floor((big) / 8),
            y: (big) % 8,
            pos: big
        }
    }

    //---------------------------------------SWAPS PLAYER COLORS---------------------====------------//
    swapColor(obj) {
        return obj === 'white' ? 'black' : 'white'
    }

    //----------------------SETS THE VALID PATH OF THE PIECE SELECTED BY A PLAYER----------------------//
    setPath = () => {
        this.pathUpdateNeeded = false

        // const position = Moves(this.state.selected, this.state.position)
        const position = LegalMoves(
            this.state.selected, 
            this.state.position, 
            this.state.kings[this.state.turn], 
            this.state.kings[this.state.turn].check,
            this.state.castling[this.state.turn]
        )

        this.setState(prevState => {
            return {
                position: position
            }
        })
    }

    //------------------------CHECKS TO SEE IF KING IS ON CHECK OR CHECKMATE-------------------------//
    checkKing = () => {
        this.kingOnCheck = false

        let kings = JSON.parse(JSON.stringify(this.state.kings))
        let position = this.state.position
        let playable = this.state.playable
        const feedback = InCheck(this.state.turn, this.state.position, this.state.kings[this.state.turn])

        const validMoves = AllMoves(
            this.state.turn,
            this.state.position,
            this.state.kings[this.state.turn],
            this.state.kings[this.state.turn].check,
            this.state.castling[this.state.turn]
        )

        if (feedback) {
            kings[this.state.turn].check = true
            position = this.state.position.map(value => {
                let post = value.map(val => {
                    if (val.number === this.state.kings[this.state.turn].pos) {
                        return {
                            piece: val.piece,
                            player: val.player,
                            style: "check",
                            number: val.number
                        }
                    }
                    return val
                })
                return post
            })
        }
        let endGame = this.state.endGame
        let nextLevel = this.state.nextLevel

        if (validMoves.length === 0) {
            this.finished = true
            if (this.aiTimer) {
                clearTimeout(this.aiTimer)
                this.aiTimer = 0
            }
            if (feedback) {
                console.log("checkmate")
                if (!this.undoTracker) nextLevel = true
                endGame = {
                    status: true,
                    type: 1
                }
            } else {
                console.log("stalemate")
                endGame = {
                    status: true,
                    type: 2
                }
            }
            playable = false
        }

        this.checkValid = true
        this.checkCounter = true

        this.setState(prevState => {
            return {
                kings,
                nextLevel,
                position,
                playable,
                endGame,
            }
        })
    }

    //-------------------------SUB-ROUTINE FOR THREE FOLD REPEATITION RULE----------------------//
    checkRepeatition = (temp1, temp2) => {
        if (temp1.move.to == temp1.undo.undo.move.from && temp1.move.from == temp1.undo.undo.move.to) {
            if (temp2.move.to == temp2.undo.undo.move.from && temp2.move.from == temp2.undo.undo.move.to) {
                return true
            }
        }

        return false
    }

    //------------------------------CHECKS FOR THREE FOLD REPEATITION------------------------------//
    threeFoldRepeatition = () => {
        this.checkValid = false

        if (this.state.moves < 8) return

        const moveList = JSON.parse(JSON.stringify(this.state.moveList))
        let temp1 = moveList
        let temp2 = moveList.undo

        let searching = true
        for (let i = 0; i < 6; i++) {
            if (this.checkRepeatition(temp1, temp2)) {
                if (i === 5) {
                    searching = false
                    this.finished = true
                    let endGame = this.state.endGame
                    let playable = this.state.playable
                    console.log("stalemate")
                    if (this.aiTimer) {
                        clearTimeout(this.aiTimer)
                        this.aiTimer = 0
                    }
                    endGame = {
                        status: true,
                        type: 3
                    }
                    playable = false

                    this.setState({
                        playable,
                        endGame,
                    })

                    i = 6
                    break
                }
                if (searching) {
                    temp1 = temp1.undo.undo
                    temp2 = temp2.undo.undo
                }
            } else {
                break
            }
        }
    }


    //---------------------------------CHECKS FOR FIFTY MOVES RULE---------------------------------//
    fiftyMovesCounter = () => {
        this.checkCounter = false

        if (this.state.moveCounter >= 50) {

            this.finished = true
            let endGame = this.state.endGame
            let playable = this.state.playable
            console.log("stalemate")
            if (this.aiTimer) {
                clearTimeout(this.aiTimer)
                this.aiTimer = 0
            }
            endGame = {
                status: true,
                type: 4
            }
            playable = false

            this.setState({
                playable,
                endGame,
            })
        }

        return false
    }

    //---------------------------------FUNCTION TO RESET BOARD AND DATA----------------------------//
    restart = () => {
        this.setState(prevState => {
            return {
                alert: {
                    status: true,
                    title: 'Confirmation',
                    message: 'Are you sure you want to start new game?',
                    cancel: "No, don't reset game",
                    confirm: "Yes, start new game",
                    onConfirm: () => this.reset(),
                    onCancel: () => {
                        this.setState(prevState => {
                            return {
                                alert: {
                                    status: false
                                }
                            }
                        })
                    }
                }
            }
        })
    }

    //---------------------------------SHOWS HINT FOR NEXT MOVE-------------------------------------//
    hint = () => {
        if (this.state.playable) {
            this.setState(prevState => {
                return {
                    thinking: true
                };
            });

            const AIMove = AI(
              this.state.turn,
              this.state.position,
              this.state.kings,
              this.state.castling,
              3
            );

            let position = this.state.position.map(value => {
              let post = value.map(val => {
                if (val.number === AIMove.from.pos) {
                  return {
                    piece: val.piece,
                    player: val.player,
                    style: "hint",
                    number: val.number
                  };
                }
                if (val.number === AIMove.to.pos) {
                    return {
                        piece: val.piece,
                        player: val.player,
                        style: "hint",
                        number: val.number
                    };
                }
                if (val.number === this.state.kings[this.state.turn].pos && this.state.kings[this.state.turn].check) {
                    return {
                        piece: val.piece,
                        player: val.player,
                        style: "check",
                        number: val.number
                    }
                }
                return {
                  piece: val.piece,
                  player: val.player,
                  style: "",
                  number: val.number
                };
              });
              return post;
            });

            this.setState(prevState => {
              return {
                position,
                thinking: false
              };
            });
        }
    }

    //--------------------------------TAKES PLAYER TO NEXT LEVEL----------------------------------//
    nextLevel = () => {
        this.difficulty++
        this.modeText = this.props.route.params.textList[this.difficulty]
        this.reset()
    }

    playTouchSound = () => {
        if (this.sound) this.moveSound.replayAsync()
    }

    editProgress = async () => {
        if (!this.state.endGame.status) return
        if (this.mode != 2) return
        if (this.undoTracker) return

        let feedback = JSON.parse(await AsyncStorage.getItem('progress'))
        if (feedback.vsAI < (this.difficulty + 1)) {
            feedback.vsAI = this.difficulty + 1
            await AsyncStorage.setItem('progress', JSON.stringify(feedback))
        }

    }

    loadAudio = async () => {
        if (!this.sound) return
        this.moveSound = new Audio.Sound()
        try {
            await this.moveSound.loadAsync(require("../../../assets/audio/moveSound.m4a"))
            // this.playTouchSound()
        } catch (error) {
            console.log(error)
            this.sound = false
        }
    }

    //-----------------------------------HANDLES UNDO REQUESTS------------------------------------//
    undoMove = () => {
        if (this.state.undo.status) {
            if (!this.undoTracker && this.mode === 2) {
                if (this.finished) {
                    if (!this.state.playable) this.setState({ playable: true });
                    this.undo();
                    return
                }
                this.setState(prevState => {
                    return {
                        alert: {
                            status: true,
                            title: 'Are You Sure?',
                            message: 'If you undo, you wont be able to unlock the next level',
                            cancel: "No, don't undo",
                            confirm: "Yes, undo last move",
                            onConfirm: () => {
                                if (!this.state.playable) this.setState({ playable: true });
                                this.undoTracker = true
                                this.undo();
                                this.setState(prevState => {
                                    return {
                                        alert: {
                                            status: false
                                        }
                                    }
                                })
                            },
                            onCancel: () => {
                                this.setState(prevState => {
                                    return {
                                        alert: {
                                            status: false
                                        }
                                    }
                                })
                            }
                        }
                    }
                })
            } else {
                if (!this.state.playable) this.setState({ playable: true });
                this.undo();
            }
        }else {
            if (Platform.OS === 'android') ToastAndroid.show('No moves to undo', ToastAndroid.SHORT)
        }
    }

    //-------------------------------------SUB-ROUTINE FOR UNDO-----------------------------------//
    undo = () => {
        this.setState(prevState => {
            return {
                undo: prevState.undo.undo,

                moveList: this.mode === 2 ? prevState.moveList.undo.undo: prevState.moveList.undo,
                position: prevState.undo.position,
                castling: prevState.undo.castling,
                kings: prevState.undo.kings,
                moves: prevState.undo.moves,
                totalMoves: prevState.undo.totalMoves,
                turn: prevState.undo.turn,
                taken: prevState.undo.taken,
                selected: prevState.undo.selected
            }
        })
    }

    //--------------------------------- SUB-ROUTINE TO RESET BOARD---------------------------------//
    reset = async () => {
        this.setState(prevState => {
            return {
                thinking: true,
                alert: {
                    status: false
                }
            };
        });
        await this.sleep(888)

        this.pathUpdateNeeded = false
        this.kingOnCheck = false
        this.undoTracker = false
        this.finished = false

        this.resetBoard()

        this.removeSavedGame()

        this.loadSettings()

        if (this.mode === 3) this.aiTimer = setTimeout(() => { this.mode3() }, this.aiSpeed ? 411 : 1111);

        if (this.mode === 2) this.aiTimer = setTimeout(() => { this.mode2() }, 1111);
        this.restartGame = true
    }

    //-----------------------------HANDLES REQUEST TO RETURN TO MAINMENU-----------------------------//
    endGameMainMenu = (fromMenu) => {
        this.setState({endGame: {status: false}});
        if (fromMenu) this.setState({ menu: false });

        this.props.navigation.popToTop()
    }

    setEndGame = () => {
        this.finished = true
        this.undoTracker = true
        if (this.aiTimer) {
            clearTimeout(this.aiTimer)
            this.aiTimer = 0
        }
    }

    //-------------------------------REVEALS GAME-BOARD AFTER END GAME--------------------------------//
    inspectBoard = () => {
        this.setState({endGame: {status: false}, paused: true});
    }

    //----------------------------------------------BACK HANDLER--------------------------------------//
    handleBack = () => {
        if (!this.state.menu || !this.state.endGame.status) this.playMenu();
    }

    //-----------------------------------PAUSES AUTO AI MOVES TO INSPECT------------------------------//
    toggleAIPaused = (speed) => {
        this.aiSpeed = speed ? true : false
        console.log(this.aiSpeed)
        if (!this.state.paused) {
            clearTimeout(this.aiTimer)
            this.aiTimer = 0
        } else {
            if (!this.state.playable) {
                this.checkKing()
            }
            this.aiTimer = setTimeout(() => {
                this.mode3()
            }, this.aiSpeed ? 611 : 1111)
        }
        this.setState(prevState => {
            return {
                paused: !prevState.paused
            };
        });
    }

    //----------------------------------MENU HANDLER DURING GAME------------------------------------//
    playMenu = () => {
        if (!this.state.playable) {
            this.checkKing()
            return
        }

        let paused = this.state.paused
        if (this.mode === 3) {
            if (this.state.menu) {
                paused = false
                this.aiTimer = setTimeout(() => {
                    this.mode3()
                }, this.aiSpeed ? 411 : 1111)
            } else {
                paused = true
                clearTimeout(this.aiTimer)
                this.aiTimer = 0
            }
        }

        this.setState(prevState => {
            return { menu: !prevState.menu, paused }
        });
    }

    loadSettings = async () => {
        let feedback = JSON.parse(await AsyncStorage.getItem('settings'))
        this.turn = this.swapColor(feedback.playAs)
        this.boardType = feedback.boardType
        this.helper = feedback.helper
        this.sound = feedback.sound
        this.setState({position: this.state.position})
    }

    //-----------------------------HANDLES REQUESTS TO SAVE GAME AND QUIT---------------------------------//
    saveGame = async (extra) => {

        // if (extra === 5) {
        //     await AsyncStorage.setItem('boardPreview', JSON.stringify({
        //         position: this.state.position,
        //         selected: this.state.selected,
        //     }))
            
        //     console.log(JSON.stringify(this.state.position))
        // }
        
        await AsyncStorage.setItem('saveGame' + this.mode + this.difficulty, JSON.stringify({
            status: true,
            position: this.state.position,
            undo: this.state.undo,
            selected: this.state.selected,
            moveList: this.state.moveList,
            totalMoves: this.state.totalMoves,
            moves: this.state.moves,
            moveCounter: this.state.moveCounter,
            kings: this.state.kings,
            castling: this.state.castling,
            taken: this.state.taken,
            turn: this.state.turn,
            aiTurn: this.turn,
            undoTracker: this.undoTracker
        }))

        if (extra) this.endGameMainMenu(true)
    }

    removeSavedGame = async () => {

        await AsyncStorage.setItem('saveGame' + this.mode + this.difficulty, "")
    }

    //--------------------------CHECKS FOR SAVED GAME DURING INITIALIZATION-------------------------//
    checkSavedGame = async () => {
        let load
        try {
            load = await AsyncStorage.getItem('saveGame' + this.mode + this.difficulty)
        } catch (error) {
            console.log(error)
            return
        }

        let feedback
        try {
            feedback = JSON.parse(load)
        } catch (error) {
            return
        }

        if (!feedback) return

        this.kingOnCheck = true
        this.turn = feedback.aiTurn
        this.undoTracker = feedback.undoTracker

        this.setState(prevState => {
            return {
                undo: feedback.undo,
                castling: feedback.castling,
                kings: feedback.kings,
                turn: feedback.turn,
                moveCounter: feedback.moveCounter,
                moveList: feedback.moveList,
                moves: feedback.moves,
                taken: feedback.taken,
                totalMoves: feedback.totalMoves,
                position: feedback.position,
                selected: feedback.selected
            }
        })
    }

    //-----------------------------DISPLAYS ALL MOVES MADE DURING GAME IN ODER---------------------------//
    toggleMoveList = () => {
        this.setState({ displayList: !this.state.displayList });
    }

    //-----------------------------METHOD THAT RENDERS THE COMPONENTS-------------------------------//
    render() {
        const { height, width } = Dimensions.get("window");
        
        let end = null
        const endGame = this.state.endGame;
        if (endGame.status && !this.state.displayList) {
            const type = endGame.type === 1 ?
                'Checkmate!' : 'Stalemate!'
                
            const winner = endGame.type === 1 ?
                this.mode === 2 ? this.swapColor(this.state.turn) === this.turn ?
                'Your Opponent wins!' : 'You win!' :
                this.swapColor(this.state.turn).toUpperCase() + " wins!" :
                endGame.type === 2 ? 'No Legal Moves' : 
                endGame.type === 3 ? '3 Fold Repeatition': 
                endGame.type === 4 ? '50 Moves Rule': null

            let nextLvl = this.mode === 2 && 
                this.difficulty < 4 && 
                this.state.nextLevel &&
                this.swapColor(this.state.turn) != this.turn ?
                <TouchableOpacity
                    style={styles.diffList}
                    onPress={() => this.nextLevel()}
                >
                    <Text style={eStyles.endGameType}>Next Level</Text>
                </TouchableOpacity> : null
            
            end = (
              <Modal animationType="fade" transparent={true} visible={true}>
                <View style={styles.endContainer}>
                  <View style={styles.end}>
                    <View style={styles.endGame}>
                      <Text style={eStyles.endGameTitle}>{type}</Text>
                      <Text style={eStyles.endGameTitle}>{winner}</Text>
                      <TouchableOpacity
                        style={styles.diffList}
                        onPress={() => this.endGameMainMenu()}
                      >
                        <Text style={eStyles.endGameType}>Main Menu</Text>
                      </TouchableOpacity>
                        <TouchableOpacity
                            disabled={this.state.moves < 1}
                            style={[styles.diffList, styles['diffList' + (this.state.moves < 1 ? 'D' : '')]]}
                            onPress={() => this.toggleMoveList()}
                        >
                            <Text style={eStyles.endGameType}>Moves List</Text>
                        </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.diffList}
                        onPress={() => this.inspectBoard()}
                      >
                        <Text style={eStyles.endGameType}>Inspect Board</Text>
                      </TouchableOpacity>
                      { nextLvl }
                        
                    </View>
                  </View>
                </View>
              </Modal>
            );
        }

        let menu = this.state.menu && !this.state.displayList ? 
            (
                <Modal animationType="fade" transparent={true} visible={true}>
                    <View style={styles.endContainer}>
                        <View style={styles.end}>
                            <View style={styles.endGame}>
                                <Text style={eStyles.endGameTitle}>{this.modeText}</Text>
                                <TouchableOpacity
                                    style={styles.diffList}
                                    onPress={() => this.endGameMainMenu(true)}
                                >
                                    <Text style={eStyles.endGameType}>Main Menu</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={this.state.moves < 1}
                                    style={[styles.diffList, styles['diffList' + (this.state.moves < 1 ? 'D' : '')]]}
                                    onPress={() => this.toggleMoveList()}
                                >
                                    <Text style={eStyles.endGameType}>Moves History</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity
                                    style={styles.diffList}
                                    onPress={() => this.saveGame(5)}
                                >
                                    <Text style={eStyles.endGameType}>Copy</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity
                                    disabled={this.state.moves < 3}
                                    style={[styles.diffList, styles['diffList' + (this.state.moves < 3 ? 'D': '')]]}
                                    onPress={() => this.saveGame(true)}
                                >
                                    <Text style={eStyles.endGameType}>Save and Exit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.diffList}
                                    onPress={() => this.playMenu()}
                                >
                                    <Text style={eStyles.endGameType}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            ): null

        let pause = this.mode === 3 ?
            <TouchableOpacity
                style={styles.barItem}
                disabled={this.state.paused ? false : this.aiSpeed}
                onPress={() => this.toggleAIPaused()}
            >
                <Ionicons 
                    name={this.aiSpeed ? "md-play" : !this.state.paused ? 'md-pause': 'md-play'} 
                    size={height / 25} 
                    color={!this.aiSpeed || this.state.paused ? "white" : "black"}
                />
            </TouchableOpacity> : null

        let dynamic = this.mode === 3 ? 
            <TouchableOpacity
                style={styles.barItem}
                disabled={this.state.paused ? false : !this.aiSpeed}
                onPress={() => this.toggleAIPaused(true)}
            >
                {this.aiSpeed ? 
                    this.state.paused ?
                        <Foundation name="fast-forward" size={height / 19} color="white" /> :
                        <Ionicons name='md-pause' size={height / 25} color="white" />
                    : 
                    <Foundation
                        name="fast-forward"
                        size={height / 19}
                        color={!this.state.paused ? "black" : "white"}
                    />
                }
            </TouchableOpacity> : 
            <TouchableOpacity
                style={styles.barItem}
                disabled={this.mode === 3 && !this.state.paused}
                onPress={() => this.hint()}
            >
                <Ionicons name="md-bulb" size={height / 21} color={this.mode === 3 && !this.state.paused ? "black" : "white"} />
            </TouchableOpacity>
            
        let alert = this.state.alert.status ?
            <AwesomeAlert
                show={true}
                showProgress={false}
                title={this.state.alert.title}
                message={this.state.alert.message}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText={this.state.alert.cancel}
                confirmText={this.state.alert.confirm}
                cancelButtonColor="red"
                confirmButtonColor="blue"
                cancelButtonTextStyle={{ color: 'white' }}
                confirmButtonTextStyle={{ color: 'white' }}
                onCancelPressed={() => {
                    this.state.alert.onCancel()
                }}
                onConfirmPressed={() => {
                    this.state.alert.onConfirm()
                }}
            /> : null

        let pieceAnimation = () => {
            
            if (!this.state.animation.animating) return null

            return (
                <Animated.View
                    style={[styles.touch,
                    {
                        left: boxSize * (this.state.moveList.move.from.y) + 2,
                        top: boxSize * (this.state.moveList.move.from.x) + 2,
                        transform: [
                            { translateX: this.state.animation.animate.x },
                            { translateY: this.state.animation.animate.y }
                        ],
                    }
                    ]}
                >
                    <View style={[styles['box']]} >
                        <Image
                            style={[
                                styles.image, 
                                styles['image' + this.mode],
                                styles['image' + this.mode + this.turn],
                                styles['image' + this.state.moveList.move.color + this.mode]
                            ]}
                            source={links[this.state.moveList.move.piece][this.state.moveList.move.color]}
                        />
                    </View>
                </Animated.View>
            );
        }

        return (
          <ImageBackground
            resizeMode={"stretch"}
            style={{ flex: 1 }}
            source={links[7][this.boardType]}
          >
            <StatusBar hidden={true} />

            <View style={styles.menuBar}>
              <TouchableOpacity
                style={styles.barItem}
                onPress={() => this.playMenu()}
              >
                <Ionicons name="md-menu" size={height / 21} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.barItem}
                disabled = {this.mode === 3 && !this.state.paused}
                onPress={() => this.restart()}
              >
                <Ionicons name="md-refresh" size={height / 21} color={this.mode === 3 && !this.state.paused ? "black":"white"} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.barItem}
                disabled = {this.mode === 3 && !this.state.paused}
                onPress={() => this.undoMove()}
              >
                <Ionicons name="md-arrow-undo-sharp" size={height / 21} color={this.mode === 3 && !this.state.paused ? "black":"white"} />
              </TouchableOpacity>
              {dynamic}
              {pause}
            </View>

            <View style={styles["container"]}>
              <Taken color={true} mode={this.mode} taken={this.state.taken} />
              <Turn turn={this.state.turn} pos={true}/>
              <View style={[styles.board, styles['flip'+ (this.turn === 'white' && this.mode === 2)]]}>
                <Board
                  mode={this.mode}
                  boxes={this.state.boxes}
                  position={this.state.position}
                  handleClick={this.handleClick}
                  type={this.boardType}
                  helper={this.helper}
                  flip={this.turn === 'white' && this.mode === 2}
                />
                {pieceAnimation()}
              </View>
              <Turn turn={this.state.turn} pos={false}/>
              <Taken color={false} taken={this.state.taken} />
              <Message
                modeText={this.modeText}
                turn={this.state.turn}
                started={this.state.started}
                thinking={this.state.thinking}
                moves={this.state.moves}
              />
              <Promotion
                mode={this.mode}
                player={this.state.turn}
                status={this.state.promotion.player == undefined}
                handlePromotion={this.handlePromotion}
              />
              <MoveList 
                status={this.state.displayList}
                moveList={this.state.moveList}
                moves={this.state.totalMoves}
                toggleMoveList={this.toggleMoveList}
              />
            </View>
            <Loading thinking={this.state.thinking}/>
            {end}
            {menu}
            {alert}
          </ImageBackground>
        );
    }
}

//-------------------------------------------------STYLING----------------------------------------------//
const { width, height } = Dimensions.get("window");
const boxSize = width / 8 - 1

EStyleSheet.build({
  $rem: height / 150
});

const eStyles = EStyleSheet.create({
  endGameTitle: {
    color: "white",
    fontWeight: "900",
    fontSize: '5rem'
  },

  endGameType: {
    color: "white",
    fontWeight: "900",
    fontSize: '4.5rem'
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },

    fliptrue: {
        transform: [
            {
                rotate: "180deg"
            }
        ],
    },

    touch: {
        position: 'absolute',
        height: boxSize,
        width: boxSize
    },

    image: {
        height: width / 8 - 3,
        width: width / 8 - 3
    },

    image3: {
        transform: [
            {
                rotate: "180deg"
            }
        ]
    },

    image2black: {
        transform: [
            {
                rotate: "180deg"
            }
        ]
    },

    imagewhite1: {
        transform: [
            {
                rotate: "180deg"
            }
        ]
    },

    box: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        transform: [
            {
                rotate: "180deg"
            }
        ]
    },

  menuBar: {
    height: height / 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: height / 75,
    backgroundColor: "#00000070",
    borderWidth: 3,
    borderBottomColor: "blue"
  },

  barItem: {
    padding: 5
  },

  board: {
    margin: height / 75
  },

  endContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000050"
  },

  end: {
    width: width / 1.3,
    height: height / 1.7,
    backgroundColor: "#00000099",
    borderRadius: 17,
    borderWidth: 3
  },

  endGame: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  diffList: {
    width: width * 0.6,
    backgroundColor: "blue",
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    margin: 9,
    paddingTop: height / 111,
    paddingBottom: height / 111,
  },

    diffListD: {
        backgroundColor: "#00000050",
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 9,
    }
});
