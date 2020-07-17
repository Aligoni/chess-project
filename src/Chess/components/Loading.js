import React, { useEffect } from 'react'
import {Dimensions, View, Modal, StyleSheet, Text} from 'react-native'
import LottieView from 'lottie-react-native'

export default class Loading extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.animation.play()
        // this.state.thinking ? this.animation.play() : null
    }

    render() {
        const promotion = this.props.thinking ? 
            <Modal
                animationType='fade'
                transparent={true}
                visible={true}
                onRequestClose={() => { console.log('close') }}
            >
                <View style={[styles.container]} >
                    <LottieView
                        source={require("../../../assets/lottie/1049-hourglass.json")}
                        style={styles.animated}
                        autoPlay
                        loop
                    />
                </View>
            </Modal> : null

        // this.props.thinking ? this.animation.play() : null
        return (
            <View>{promotion}</View>
        )
    }
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#00000010",
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
    },

    loading: {
        backgroundColor: "#00000090",
    },

    animated: {
        width: width / 3,
        height: width / 3,
        alignItems: 'center',
    }
})