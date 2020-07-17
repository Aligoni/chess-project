import React, { Component } from 'react';
import { StyleSheet, Button, TouchableOpacity, View, Text } from 'react-native';

export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const todoItem =  this.props.todoItem
    return (
      <TouchableOpacity 
      style={styles.todoItem}
      onPress = {() => this.props.toggleDone()}
      >
          <Text 
            style = {(todoItem.done) ? 
                {
                    color: '#AAAAAA',
                    textDecorationLine: 'line-through',
                    fontStyle: 'italic'
                } : 
                {
                    color: '#313131',
                }
            }
            >
              {todoItem.title}
          </Text>

          <Button 
            title="Remove"
            color = {(todoItem.done) ?  '#AAAAAA' : '#313131' }
            onPress = {this.props.removeTodo}
          />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    todoItem: {
         width: '100%',
         height: 41,
         borderBottomColor: '#DDD',
         borderBottomWidth: 1,
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         paddingLeft: 15,
    },
    todo: {
        fontSize: 19
    }
});