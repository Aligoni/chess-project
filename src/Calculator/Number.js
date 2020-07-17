import React, {Component} from "react"
import { Button } from "react-native"

function Number(props) {
	return (
			<Button 
			className={"number button"+ props.value} 
			onPress={() => props.handleNumberInput(props.value)} 
			title = {props.value + ''}
			style={props.style}
			>
				{props.value}
			</Button>
	)
}

export default Number