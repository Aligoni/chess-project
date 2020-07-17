import React from "react"
import { View, StyleSheet } from 'react-native';
import Square from "./Square"
import links from "../routines/Links"

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

function Board(props) {

    let component

    if (props.position) {
        component = props.boxes.map((row, i) => {

            let innerBox = row.map((box, j) => {
                return <Square
                    key={i + '' + j}
                    name={box}
                    src={links[props.position[i][j].piece][props.position[i][j].player]}
                    posX={i}
                    posY={j}
                    info={props.position[i][j]}
                    handleClick={props.handleClick}
                    mode={props.mode}
                    flip={props.flip}
                    type={props.type}
                    helper={props.helper}
                />
            })

            return innerBox
        })
    } else if (props.preview) {
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

        component = boxes.map((row, i) => {

            let innerBox = row.map((box, j) => {
                return <Square
                    key={i + '' + j}
                    name={box}
                    src={links[props.preview[i][j].piece][props.preview[i][j].player]}
                    posX={i}
                    posY={j}
                    info={props.preview[i][j]}
                    type={props.type}
                />
            })

            return innerBox
        })
    }else {
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

        component = boxes.map((row, i) => {

            let innerBox = row.map((box, j) => {
                return <Square
                    key={i + '' + j}
                    name={box}
                    posX={i}
                    posY={j}
                    type={props.type}
                />
            })

            return innerBox
        })
    }
    
    return (
        <View style = {[styles.board, styles['flip'+ props.flip]]}>
            <View style= {styles.row} >
                {component[0]}
            </View>
            <View style={styles.row} >
                {component[1]}
            </View>
            <View style={styles.row} >
                {component[2]}
            </View>
            <View style={styles.row} >
                {component[3]}
            </View>
            <View style= {styles.row} >
                {component[4]}
            </View>
            <View style= {styles.row} >
                {component[5]}
            </View>
            <View style= {styles.row} >
                {component[6]}
            </View>
            <View style={styles.row} >
                {component[7]}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    board: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 2
    },

    fliptrue: {
        transform: [
            {
                rotate: "180deg"
            }
        ],
    },

    row: {
        flexDirection: 'row',
    }
});

export default Board;