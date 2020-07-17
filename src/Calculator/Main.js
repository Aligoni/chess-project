import React, {Component} from "react"
import {View, StyleSheet} from "react-native"
import Display from "./Display"
import Input from "./Input"

class Main extends Component {
	
	constructor () {
		super() 
		
		this.state = {
			display: "0",
			operator: "",
			holder: "",
			buttons: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
			numbers: ["AC", "+/-", "%", "/", 7, 8, 9, "*", 4, 5, 6, "-", 1, 2, 3, "+", 0, ".", "="],
			clicked: false
		}
	}
	
	handleNumberInput = number => {
		this.setState(prevState => {
			
			if (prevState.clicked){
				if (number == "."){
					console.log(prevState.display.indexOf("."))
					if (prevState.display.indexOf(".") == -1){
						if (prevState.display.length > 10){
							return { 
								display: prevState.display +"",
								clicked: true
							}
						}else {
							return { 
								display: prevState.display +""+ number ,
								clicked: true
							}
						}
					}else {
						return {}
					}
				}
				if (prevState.display == "0"){
					return { 
						display: number +"" ,
						clicked: true
					}
				} else {
					if (prevState.display.length > 10){
						return { 
							display: prevState.display +"",
							
							clicked: true
						}
					}else {
						return { 
							display: prevState.display +""+ number,
							clicked: true
						}
					}
				}
			} 
			
			if (!prevState.clicked){
				if (number == "."){
					return {
						display: "0.",
						clicked: true
					}
				}
				return {
					display: number +"",
					clicked: true
				}
			}
		})
		
	} 
	
	handleOperator = id => {
		console.log(id)
		
		switch(id){
			case 1: 
				this.setState({
					display: "0",
					operator: "",
					holder: "",
					clicked: false
				})
				break;
			
			case 4:
			case 8:
			case 12:
			case 16:
				this.setState(prevState => {
					if (prevState.operator == "" && prevState.holder == ""){
						return {
							operator: prevState.numbers[id - 1],
							holder: prevState.display,
							clicked: false
						}
					} else if (prevState.holder != "" && prevState.operator != "" && prevState.clicked){
						
						if (prevState.operator == "/" && prevState.display == "0"){
							return {
								display: "0",
							
								operator: "",
							
								holder: "",
							
								clicked: false
							}
						}
						
						let result = (eval(prevState.holder + prevState.operator + prevState.display)) +""
						
						if (result.length > 11){
							return {
								display: result.slice(0, 11),

								operator: prevState.numbers[id - 1],

								holder: (eval(prevState.holder + prevState.operator + prevState.display)),

								clicked: false
							}
							
						}else {
							return {
								display: (eval(prevState.holder + prevState.operator + prevState.display)),

								operator: prevState.numbers[id - 1],

								holder: (eval(prevState.holder + prevState.operator + prevState.display)),

								clicked: false
							}
						}
						
					} else if (prevState.holder != "" && prevState.operator != ""){
						return {
							operator: prevState.numbers[id - 1]
						}
					}
				})
				break;
			
			case 19:
				this.setState(prevState => {
					if (prevState.holder != "" && prevState.operator != "" && prevState.clicked){
						
						if (prevState.operator == "/" && prevState.display == "0"){
							return {
								display: "0",
							
								operator: "",
							
								holder: "",
							
								clicked: false
							}
						}
						
						let result = (eval(prevState.holder + prevState.operator + prevState.display)) +""
						
						if (result.length > 11){
							return {
								display: result.slice(0, 11),

								operator: "",
							
								holder: "",
							
								clicked: false
							}
							
						}else {
							return {
								display: (eval(prevState.holder + prevState.operator + prevState.display)),

								operator: "",
							
								holder: "",
							
								clicked: false
							}
						}
	
					} if (prevState.holder != "" && prevState.operator != "" && !prevState.clicked) {
						return {
							operator: "",
							
							holder: "",
							
							clicked: false
						}
					}
				})
		}
	}

	styles = StyleSheet.create({
		app: {
			flex: 1,
			width: '100%',
			height: '100%'
		},
	
		display: {
		},
	
		input: {
			flex: 1,
			width: '100%',
			height: '80%'
		},

		button: {
			flex: 1,
			width: 50
		},

		operator: {
			flex: 1,
			width: 50
		},
	})
	
	render() {
		// document.onkeydown = event => {
			
		// 	let value = event.key.toLowerCase()
		// 	console.log(value)
			
		// 	if (value == "enter" || value == "=") this.handleOperator(19)
			
		// 	if (value == "escape") this.handleOperator(1)
			
		// 	if (value == "1" || 
		// 		value == "2" || 
		// 		value == "3" || 
		// 		value == "4" || 
		// 		value == "5" || 
		// 		value == "6" || 
		// 		value == "7" || 
		// 		value == "8" || 
		// 		value == "9" || 
		// 		value == "0") this.handleNumberInput(value)
			
		// 	if (value == "/" ||
		// 	    value == "d") this.handleOperator(4)
			
		// 	if (value == "x" || 
		// 		value == "*" || 
		// 		value == "m") this.handleOperator(8)
			
		// 	if (value == "-") this.handleOperator(12)
			
		// 	if (value == "+" || value == "a") this.handleOperator(16)
			
		// 	if (value == ".") this.handleNumberInput(".")
		// }
		
		return (
			<View style = {this.styles.app}
			>
				<Display 
				 	op={this.state.operator} 
					 display={this.state.display}
					 styles={this.styles}
				/> 	
			
				<Input 
					handleNumberInput={this.handleNumberInput} 
					handleOperator={this.handleOperator}
					styles={this.styles}
				/>
			</View>
		)
	}
}

export default Main