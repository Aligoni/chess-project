import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

export default function Turn(props) {
    let turn = props.pos ? 
        props.turn === 'black' ? 'turn' : 'not' :
        props.turn === 'white' ? 'turn' : 'not'
    return (
        <View style={styles.container}>
            <View style={[styles.indicator, styles[turn]]}></View>
        </View>
    )
}

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },

    turn: {
        backgroundColor: 'blue',
        borderWidth: 1
    },

    indicator: {
        width: width / 3,
        height: 5,
        borderRadius: height / 51
    }
})