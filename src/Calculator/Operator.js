import React, {Component} from "react"
import { Button } from "react-native"

function Operator(props) {
	
	return (
			<Button 
			className={"op op"+ props.id}
			onPress={() => props.handleOperator(props.id)} 
			title = {props.value}
			style={props.style}
			>
			{props.value}
			</Button>
	)
}

export default Operator