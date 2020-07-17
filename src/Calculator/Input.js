import React, {Component} from "react"
import Operator from "./Operator"
import Number from "./Number"
import { View } from "react-native";

function Input (props) {

	let buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

	let numbers = ["AC", "+/-", "%", "/", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="];

	let zeroStyle = "width: 50%"
	
	const array = buttons.map( (button, index) => {
		if (button === 1 || 
			button === 2 || 
			button === 3 || 
			button === 4 || 
			button === 8 || 
			button === 12 || 
			button === 16 || 
			button === 19){
			return <Operator 
				value={numbers[index]}
				id={button}
				key={index}
				handleOperator={props.handleOperator}
				style={props.style}
				/>
		}

		return <Number 
			value={numbers[index]}
			key={index}
			handleNumberInput={props.handleNumberInput}
			style={props.style}
			/>
	})
			
	return (
		<View style = {props.styles.input}
		>
			{array}
		</View>
	)
}

export default Input