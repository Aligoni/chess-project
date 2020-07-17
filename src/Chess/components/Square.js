import React from "react";
import { View, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native';

function Square(props) {
  if (props.handleClick) {
    if (props.src) {
      let data = {
        isPiece: true,
        info: props.info,
        posX: props.posX,
        posY: props.posY
      };

      return (
        <TouchableHighlight
          touchSoundDisabled={true}
          style={styles.touch}
          onPress={() => props.handleClick(data)}
        >
          <View style={[styles['box'], styles['box' + props.name + props.type], styles.box, styles['' + props.info.style]]} >
            <View style={[styles['box' + props.name + props.type], styles["inner" + props.info.style]]}></View>
            <Image
              style={[styles.image, styles['image' + props.mode + data.info.player], styles['flip' + props.flip]]}
              source={props.src}
            />
          </View>
        </TouchableHighlight>
      );
    } else {
      let data = {
        isPiece: false,
        info: props.info,
        posX: props.posX,
        posY: props.posY
      };

      let extra = props.helper ? '' : props.info.style === 'prev' ? '': 'off'
      return (
        <TouchableHighlight
          touchSoundDisabled={true}
          style={styles.touch}
          onPress={() => props.handleClick(data)}
        >
          <View style={[styles['box' + props.name + props.type], styles.box, styles['' + props.info.style + extra]]} >
            <View style={[styles['box' + props.name + props.type], styles["inner" + props.info.style + extra]]}></View>
          </View>
        </TouchableHighlight>
      );
    } 
  } else if (props.info) {
    if (props.src) {
      let data = {
        isPiece: true,
        info: props.info,
        posX: props.posX,
        posY: props.posY
      };

      return (
        <View
          style={styles.touch}
        >
          <View style={[styles['box'], styles['box' + props.name + props.type], styles.box, styles['' + props.info.style]]} >
            <View style={[styles['box' + props.name + props.type], styles["inner" + props.info.style]]}></View>
            <Image
              style={[styles.image, styles['image' + props.mode + data.info.player]]}
              source={props.src}
            />
          </View>
        </View>
      );
    } else {
      let data = {
        isPiece: false,
        info: props.info,
        posX: props.posX,
        posY: props.posY
      };

      return (
        <View
          style={styles.touch}
        >
          <View style={[styles['box' + props.name + props.type], styles.box, styles['' + props.info.style]]} >
            <View style={[styles['box' + props.name + props.type], styles["inner" + props.info.style]]}></View>
          </View>
        </View>
      );
    }
  }else {
    return (
      <View style={styles.smalltouch}>
        <View style={[styles['box' + props.name + props.type], styles.box, styles['']]} >
          <View style={[styles['box' + props.name + props.type], styles["inner"]]}></View>
        </View>
      </View>
    );
  }
}


const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  image: {
    height: width / 8 - 3,
    width: width / 8 - 3
  },

  image1black: {
    transform: [
      {
        rotate: "180deg"
      }
    ]
  },

  fliptrue: {
    transform: [
      {
        rotate: "180deg"
      }
    ],
  },

  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  boxwhite: {
    backgroundColor: "rgb(90, 42, 20)"
  },

  boxblack: {
    backgroundColor: "rgb(214, 214, 213)"
  },
  
  boxwhite1: {
    backgroundColor: "rgb(88, 52, 18)"
  },

  boxblack1: {
    backgroundColor: "rgb(214, 186, 160)"
  },

  boxwhite2: {
    backgroundColor: "rgb(9, 56, 23)"
  },

  boxblack2: {
    backgroundColor: "rgb(214, 214, 213)"
  },

  boxwhite3: {
    backgroundColor: "rgb(12, 12, 177)"
  },

  boxblack3: {
    backgroundColor: "rgb(181, 227, 243)"
  },

  boxwhite4: {
    backgroundColor: "rgb(48, 44, 43)"
  },

  boxblack4: {
    backgroundColor: "rgb(184, 188, 189)"
  },

  touch: {
    height: width / 8 - 1,
    width: width / 8 - 1
  },

  smalltouch: {
    height: width / 31,
    width: width / 31
  },


  yes: {
    backgroundColor: "green"
  },

  target: {
    backgroundColor: "red"
  },

  innerpath: {
    position: "absolute",
    backgroundColor: "blue",
    margin: "31%",
    borderRadius: 61
  },
  
  prev: {
    backgroundColor: "green"
  },

  innerprev: {
    position: "absolute",
    top: 4,
    left: 4,
    bottom: 4,
    right: 4
  },

  check: {
    backgroundColor: "red"
  },

  innercheck: {
    position: "absolute",
    top: 4,
    left: 4,
    bottom: 4,
    right: 4
  },

  innercastle: {
    position: "absolute",
    backgroundColor: "yellow",
    margin: "31%",
    borderRadius: 61
  },

  hint: {
    backgroundColor: "blue"
  },

  innerhint: {
    position: "absolute",
    top: 4,
    left: 4,
    bottom: 4,
    right: 4
  }
});

export default Square;
