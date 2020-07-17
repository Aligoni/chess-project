import React from "react"
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native'
import EStyleSheet from "react-native-extended-stylesheet";

function Message (props) {
    let message = ""
    if (!props.started){
        message = "Welcome ,White plays first"
    }

    props.thinking ? console.log('props') : null 
    return (
      <View style={styles.message}>
        <View style={styles.messageContainer}>
          <View style={styles.left}>
            {/* <View style={styles.turn}>
              <Text style={eStyles.turnText}>{"TURN:"}</Text>
              <View
                style={[styles["color"], styles["color" + props.turn]]}
              ></View>
            </View> */}
            <View style={styles.mode}>
              {/* <Text style={eStyles.modeText}>Game Mode</Text> */}
              <Text style={eStyles.turnText}>{"MOVES: " + props.moves}</Text>
            </View>
          </View>
          <View style={styles.right}>
            {/* <View style={styles.moves}>
              <Text style={eStyles.turnText}>{"MOVES: " + props.moves}</Text>
            </View> */}
            <View style={styles.mode}>
              <Text style={eStyles.modeText}>{props.modeText}</Text>
            </View>
          </View>
        </View>
      </View>
    );
}

const { height, width } = Dimensions.get("window");
EStyleSheet.build({
  $rem: height / 150
});

const eStyles = EStyleSheet.create({
  turnText: {
    color: "white",
    fontWeight: "700",
    fontSize: "4.5rem"
  },

  modeText: {
    color: "white",
    fontWeight: "700",
    fontSize: "4.5rem"
  }
});


const styles = StyleSheet.create({
  message: {
    flex: 1,
    marginTop: height / 71,
    borderWidth: 3,
    borderColor: 'blue'
  },

  color: {
    width: width / 15,
    height: width / 15,
    borderWidth: 1,
    borderColor: "blue",
    marginLeft: 7
  },

  colorwhite: {
    backgroundColor: "white",
    borderColor: "blue"
  },

  colorblack: {
    backgroundColor: "black"
  },

  messageContainer: {
    width: width - 5,
    flex: 1,
    paddingTop: 5,
    backgroundColor: "#00000090",
    flexDirection: "row",
    alignItems: 'center'
  },

  left: {
    flex: 1,
    borderRightWidth: 3,
    borderRightColor: "blue"
  },

  right: {
    flex: 1
  },

  turn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  turnText: {
    fontSize: 31,
    color: "white",
    fontWeight: "800"
  },

  moves: {
    alignItems: "center",
    justifyContent: "center"
  },

  mode: {
    marginTop: 9,
    alignItems: 'center'
  }
});

export default Message