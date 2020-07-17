import React, {Component} from "react"
import { Text, View } from "react-native"

function Display (props) {
	
	return (
		<View style = {props.styles.display}
		>
			<Text>{props.op == "*" ? "x" : props.op}</Text>
			<Text focus = 'true'>{props.display}</Text>
		</View>
	)
}

export default Display