import React, { Component } from 'react';
import { StatusBar, Platform, View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Header from './Header'
import Input from './Input'
import TodoItem from './TodoItem'

export default class Main extends Component {
  constructor() {
    super();
    
    this.state = {
      todoInput: '',
      todos: [
        {
          id: 0,
          title: "Take out the trash",
          done: false,
        },
        {
          id: 1,
          title: "Cook Rice and Stew for dinner",
          done: true,
        }
      ],
    };
  }

  addTodo = () => {
    if (!this.state.todoInput) {
      Alert.alert('Error', 'Please enter a to-do')
    } else {
      let todos = this.state.todos

      todos.unshift({
        id: todos.length,
        title: this.state.todoInput,
        done: false,
      })

      this.setState({
        todos,
        todoInput: ''
      })
    }
  }

  toggleDone = item => {
    let todos = this.state.todos
    todos = todos.map(todo => {
      if(todo.id == item.id) {
        todo.done = !todo.done
      }

      return todo
    })

    this.setState({
      todos
    })
  }

  removeTodo = item => {
    let todos = this.state.todos

    todos = todos.filter(todo => todo.id != item.id)

    this.setState({
      todos
    })
  }

  render() {

    const statusbar = (Platform.OS == 'ios') ? <View style = {styles.statusBar}></View>: null
    
    return (
      <View style = {styles.container}>

        <StatusBar 
        hidden={true}
        />

        {statusbar}

        <Header title={"Todo App"}/>

        <Input 
        textChange = {todoInput => this.setState({todoInput})}
        todoInput = {this.state.todoInput}
        addNewTodo = {this.addTodo}
        />

        <FlatList 
          data = {this.state.todos}
          extraData = {this.state}
          keyExtractor = {(item, index) => index.toString()}
          renderItem = { ({item, index}) => 
            <TodoItem 
              todoItem={item} 
              toggleDone = {() => this.toggleDone(item)} 
              removeTodo = {() => this.removeTodo(item)}
            /> 
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      flex: 1,
    },

    statusBar: {
      backgroundColor: 'black',
      height: 23.8
    },
});