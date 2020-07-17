import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const Input = props => {
    return (
        <View style = {styles.inputContainer}>
            <TextInput 
            style = {styles.textInput}
            value = {props.todoInput}
            onChangeText = {todoInput => props.textChange(todoInput)}
            placeholder = 'Add Todo...'
            />
            <TouchableOpacity style = {styles.addButton} onPress = {props.addNewTodo}>
                <Text style = {styles.addButtonText} >ADD</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowOffset: {width: 0, height: 3},
        shadowColor: '#171717',
        shadowOpacity: .1
    },

    textInput: {
        backgroundColor: '#F3F3F3',
        flex: 1,
        fontSize: 18,
        height: 35,
    },

    addButton: {
        width: 100,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',

    },

    addButtonText: {
        color: '#171717',
        fontSize: 18,
        fontWeight: '700'
    }
});

export default Input