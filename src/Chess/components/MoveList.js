import React from 'react'
import { Modal, Dimensions, StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import EStyleSheet from "react-native-extended-stylesheet";
import links from "../routines/Links"

export default function MoveList(props) {
    // const DATA = { list: props.moveList, moves: props.moves }
    let items = []
    let list = props.moveList
    let movesCounter = props.moves
    if (props.status) {
        while (list.move) {
            let data = list.move
            if (data.from.x != undefined) {
                data.from = data.from.pos
                data.to = data.to.pos
            }

            const captured = data.type === 'capture' ?
                <View style = {styles.captured}>
                    <Image
                        style={[styles.image]}
                        source={links[data.captured][swapColor(data.color)]}
                    />
                </View> : null
            items.push(
                <View style={styles.itemContainer} key={movesCounter}>
                    <View style={[styles.header, styles['header'+ data.type]]}>
                        <Text style={eStyles.listTitle}>{movesCounter--}:</Text>
                        <View style={styles.imageContainer}>
                            <Image
                                style={[styles.image]}
                                source={links[data.piece][data.color]}
                            />
                        </View>
                        {captured}
                    </View>
                    <View style={styles.info}>
                        <Text style={eStyles.endGameType}>From: {toLettering(toPosition(data.from))}</Text>
                        <Text style={eStyles.endGameType}>To: {toLettering(toPosition(data.to))}</Text>
                    </View>
                </View>
            )
            list = list.undo
        }
    }

    const component = props.status ?
        <Modal animationType="fade" transparent={true} visible={true}>
            <View style={styles.listContainer}>
                <View style={styles.container}>
                    <View style={styles.list}>
                        {/* <FlatList
                            data={DATA}
                            extraData={props.moveList}
                            keyExtractor={(item, index) => index.toString()}
                        /> */}
                        <ScrollView style={styles.scroll}>
                            {items}
                        </ScrollView>
                    </View>
                    <TouchableOpacity
                        style={styles.diffList}
                        onPress={() => props.toggleMoveList()}
                    >
                        <Text style={eStyles.endGameType}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
        : null

    return (
        <View>
            {component}
        </View>
    )
}

const { height, width } = Dimensions.get("window");
EStyleSheet.build({
    $rem: height / 150
});

const eStyles = EStyleSheet.create({
    listTitle: {
        color: "white",
        fontWeight: "900",
        fontSize: '6rem'
    },

    endGameType: {
        color: "white",
        fontWeight: "900",
        fontSize: '4.5rem'
    }
});

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00000050"
    },

    container: {
        width: width / 1.3,
        height: height / 1.3,
        backgroundColor: "#00000099",
        borderRadius: 17,
        borderWidth: 3,
        alignItems: "center",
        justifyContent: "center",
    },

    list: {
        width: width / 1.6,
        flex: 1,
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

    scroll: {
        flex: 1,
    },

    itemContainer: {
        flex: 1,
        margin: 4
    },

    header: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center'
    },

    headercapture: {
        backgroundColor: 'rgb(190, 11, 11)',
    },

    headernormal: {
        backgroundColor: 'green',
    },

    headerqSide: {
        backgroundColor: 'rgb(187, 187, 16)',
    },

    headerkSide: {
        backgroundColor: 'rgb(187, 187, 16)',
    },

    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: width / 7
    },

    image: {
        height: width / 8 - 3,
        width: width / 8 - 3
    },

    captured: {
        position: 'absolute',
        right: 5,
    }
});

function toPosition(big) {
    return {
        x: Math.floor((big) / 8),
        y: (big) % 8,
        pos: big
    }
}

function toLettering(xy) {
    let lettering = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    let numbering = [1, 2, 3, 4, 5, 6, 7, 8]
    return lettering[xy.y] + numbering[xy.x]
}

function swapColor(obj) {
    return obj === 'white' ? 'black' : 'white'
}