import React from "react"
import {View} from 'react-native'
import SwitchBall from "./SwitchBall"

function SwitchContainer (props) {
    return (
        <View className = "container" onClick={props.handleChange}>
            <SwitchBall ballClass={props.ballClass} handleChange = {props.handleChange} />
        </View>
    )
}

export default SwitchContainer