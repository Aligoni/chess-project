import React from "react"
import { View, StyleSheet, Alert, Modal, TouchableOpacity, Image, Text } from 'react-native';
import links from "../routines/Links"

function Promotion (props) {
    let player = props.player === "white" ? "black" : "white"
    const promotion = !props.status ? 
      <Modal
          animationType='fade'
          transparent={true}
          visible={!props.status}
          onRequestClose={() => {
              Alert.alert("Please select piece to promote to");
          }}
      >
        <View style={styles.modal}>
            <View style={[styles.container, styles['container'+ player + props.mode]]}>
              <Text style={styles.message}>Select Piece:</Text>
              <View style={styles.group}>
                  <TouchableOpacity
                      style={styles.imageContainer}
                      onPress={() => props.handlePromotion(1)} >
                      <Image
                          style={[styles.image, styles['image'+ player]]}
                          source={links[1][player]}
                      />
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.imageContainer}
                      onPress={() => props.handlePromotion(3)} >
                      <Image
                          style={[styles.image, styles['image'+ player]]}
                          source={links[3][player]}
                      />
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.imageContainer}
                      onPress={() => props.handlePromotion(4)} >
                      <Image
                          style={[styles.image, styles['image'+ player]]}
                          source={links[4][player]}
                      />
                  </TouchableOpacity>
                  <TouchableOpacity
                      style={styles.imageContainer}
                      onPress={() => props.handlePromotion(5)} >
                      <Image
                          style={[styles.image, styles['image'+ player]]}
                          source={links[5][player]}
                      />
                  </TouchableOpacity>
                </View>
            </View>
        </View>
      </Modal>
      : null

    return <View>{promotion}</View>;
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    backgroundColor: "#00000070",
    borderWidth: 3,
    width: 266,
    height: 170,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 11
  },

  message: {
    color: "white",
    fontSize: 19,
    fontWeight: '700'
  },

  group: {
    flexDirection: "row"
  },

  image: {
    height: 50,
    width: 50
  },

  containerblack1: {
    transform: [
      {
        rotate: "180deg"
      }
    ]
  },
  
  // imageblack: {
  //   transform: [
  //     {
  //       rotate: "180deg"
  //     }
  //   ]
  // },

  imageContainer: {
    margin: 4
  }
});

export default Promotion