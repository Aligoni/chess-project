import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import links from "../routines/Links";

export default function Taken(props) {

    let taken = null
    if (!props.color) {
        taken = props.taken.black.map(taken => {
          return (
            <Image
              key={Math.random()}
              style={[styles.image, styles[taken.player]]}
              source={links[taken.piece][taken.player]}
              alt="white"
            />
          );
        });
    }else {
        taken = props.taken.white.map(taken => {
          return (
            <Image
              key={Math.random()}
              style={[styles.image, styles["i"+ props.mode + taken.player]]}
              source={links[taken.piece][taken.player]}
              alt="white"
            />
          );
        });
    }

    return (
      <View style={[styles.container, styles[taken.player]]}>
        {taken}
      </View>
    );
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height / 10,
    width: width - 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  i1white: {
    transform: [
      {
        rotate: "180deg"
      }
    ]
  },

  image: {
    width: height / 21,
    height: height / 21
  }
});