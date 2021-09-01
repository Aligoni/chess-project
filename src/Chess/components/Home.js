import React, { useState, useEffect } from 'react'
import {  
  Animated,
  Modal, 
  ImageBackground, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  StatusBar, 
  BackHandler, 
  Dimensions 
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import links from "../routines/Links";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Audio } from 'expo-av'
import EStyleSheet from "react-native-extended-stylesheet";

export default function Home (props) {
  const { navigation } = props
  let list = ['Beginner', 'Rookie', 'Casual Player', 'Expert Player', 'Grand Master']

  const [state, setState] = useState({
    item: 0,
    status: false,
    info: {},
  })

  const [progressTracker, setProgressTracker] = useState(0)
  const [lastGameTracker, setLastGameTracker] = useState({status: false})

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => { 
      backActionHandler()
      return true 
    })

    checkProgress()
    const navigationUnsubscribe = navigation.addListener('focus', () => {
      checkProgress()
    })
    
    return function cleanup() {
      console.log('cleanup')
      navigationUnsubscribe()
      backHandler.remove()
    }
  }, []);

  const backgroundMusic = new Audio.Sound()

  const checkProgress = async () => {
    let feedback = JSON.parse(await AsyncStorage.getItem('progress'))
    setProgressTracker(feedback.vsAI)
    let lastGame = JSON.parse(await AsyncStorage.getItem('lastGame'))
    setLastGameTracker(lastGame)
  }

  // checkProgress()

  const backActionHandler = () => {
    state.item != 3 ? setState({ item: 3, status: true }) : null
  }

  const cancelExit = () => {
    setState({ item: 0, status: false })
  }

  const exitApp = () => {
    setState({ item: 0, status: false })
    BackHandler.exitApp()
  }

  const handlePvC = () => {
    setState({item: 2, status: true})
  }

  const closePvC = () => {
    setState({ item: 0, status: false })
  };

  const openSettings = () => {
    navigation.navigate("Settings")
  };

  const checkSavedGame = async (mode, diff, text) => {
    let load
    try {
      load = await AsyncStorage.getItem('saveGame' + mode + diff)
    } catch (error) {
      console.log(error)
      return
    }
    
    let feedback
    try {
      feedback = JSON.parse(load)
    } catch (error) {
      navigate(mode, diff, text)
      return
    }

    !feedback ? navigate(mode, diff, text) : setState({ item: 1, status: true, info: {mode, diff, text} });
  }

  const navigate = (mode, diff, text) => {
    setState({ item: 0, status: false });
    navigation.navigate("Play", { data: mode, diff: diff, modeText: text, textList: list })
  }

  const newGame = async (mode, diff, text) => {
    let lastGame = {
      status: false
    }
    await AsyncStorage.setItem(JSON.stringify(lastGame))
    await AsyncStorage.setItem('saveGame' + mode + diff, '')
    setState({ item: 0, status: false });
    navigate(mode, diff, text)
  }

  const howToPlay = () => {
    navigation.navigate("HowToPlay")
  }

  const continueLastGame = () => {
    navigate(lastGameTracker.mode, lastGameTracker.difficulty, 
      lastGameTracker.mode === 1 ? 'Vs Player' :
        lastGameTracker.mode == 2 ? `${list[lastGameTracker.difficulty]}` : 'AI Vs AI'
      )
  }

  const continueGame = state.status && state.item == 1 ? (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.pVcContainer}>
        <View style={styles.pVcContinue}>
          <TouchableOpacity style={styles.pVcExit} onPress={() => closePvC()}>
            <Ionicons name="md-close" size={41} color="black" />
          </TouchableOpacity>
          <View style={styles.pVcDiff}>
            <TouchableOpacity
              style={styles.diffList}
              onPress={() => navigate(state.info.mode, state.info.diff, state.info.text)}
            >
              <Text style={eStyles.itemTextD}>Continue Saved Game</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.diffList}
              onPress={() => newGame(state.info.mode, state.info.diff, state.info.text)}
            >
              <Text style={eStyles.itemTextD}>Start New Game</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  ) : null;

  const exitGame = state.status && state.item == 3 ? (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.pVcContainer}>
        <View style={styles.pVcContinue}>
          <View style={styles.pVcDiff}>
            <Text style={eStyles.diffText}>Are you sure you want to Quit?</Text>
            <TouchableOpacity
              style={styles.diffList}
              onPress={() => exitApp()}
            >
              <Text style={eStyles.itemTextD}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.diffList}
              onPress={() => cancelExit()}
            >
              <Text style={eStyles.itemTextD}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  ) : null;

  let difficultyList = list.map((difficulty, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={[styles.diffList, styles['save' + (index > progressTracker)]]}
        disabled={index > progressTracker}
        onPress={() => checkSavedGame(2, index, difficulty)}
      >
        <Text style={eStyles.itemTextD}>{difficulty}</Text>
      </TouchableOpacity>
    );
  });

  const selectDifficulty = state.status && state.item == 2 ? (
    <Modal animationType="fade" transparent={true} visible={true}>
      <View style={styles.pVcContainer}>
        <View style={styles.pVc}>
          <TouchableOpacity style={styles.pVcExit} onPress={() => closePvC()}>
            <Ionicons name="md-close" size={41} color="black" />
          </TouchableOpacity>
          <View style={styles.pVcDiff}>
            <Text style={eStyles.diffText}>Select Difficulty:</Text>
            {difficultyList}
          </View>
        </View>
      </View>
    </Modal>
  ) : null;

  const lastGameButton = lastGameTracker.status && (
    <TouchableOpacity
      style={styles.itemOld}
      onPress={() => continueLastGame()}
    >
      <Text style={eStyles.itemText}>Continue Last Game</Text>
      <Text style={[eStyles.itemText, {color: 'red'}]}>{lastGameTracker.mode === 1 ? 'Player vs Player' :
      lastGameTracker.mode == 2 ? `Player Vs AI: ${list[lastGameTracker.difficulty]}`: 'Computer Vs Computer'}</Text>
    </TouchableOpacity>
  ) 

  return (
    <ImageBackground
      resizeMode={"stretch"}
      style={{ flex: 1 }}
      source={links[7][7]}
    >
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={{flexDirection: 'row', alignItems: 'flex-start'}}>
          <Text style={[eStyles.titleText, {marginRight: 8}]}>
            CHESS
          </Text>
          <FontAwesome5 name='chess' size={50} color='blue' />
        </View>
        <Text style={[eStyles.titleText, {fontSize: 20, color: 'white', marginBottom: 20}]}>
          for beginners
        </Text>
        {lastGameButton}
        <View style={styles.selection}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => howToPlay()}
          >
            <Text style={eStyles.itemText}>How To Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => checkSavedGame(1, 2,'Vs Player')}
          >
            <Text style={eStyles.itemText}>Player vs player</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => handlePvC()}>
            <Text style={eStyles.itemText}>Player vs Computer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => checkSavedGame(3, 2, 'AI Vs AI')}
          >
            <Text style={eStyles.itemText}>Computer vs Computer</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.settings} onPress={() => openSettings()}>
          <Ionicons name="md-settings" size={41} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.quit} onPress={() => backActionHandler()}>
          <Ionicons name="md-exit" size={41} color="blue" />
        </TouchableOpacity>
      </View>
      {selectDifficulty}
      {continueGame}
      {exitGame}
    </ImageBackground>
  );
}

const { height, width } = Dimensions.get("window");
EStyleSheet.build({
  $rem: height / 150
});

const eStyles = EStyleSheet.create({
  itemText: {
    color: "white",
    fontWeight: "700",
    fontSize: "4rem",
    textAlign: 'center',
  },

  diffText: {
    color: "#F3F3F3",
    fontWeight: "900",
    fontSize: "4.5rem",
    marginBottom: 5,
  },

  itemTextD: {
    color: "white",
    fontWeight: "900",
    fontSize: "4rem"
  },

  titleText: {
    fontSize: '10rem',
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    // backgroundColor: 'rgba(0,0,0,0.5)'
  },

  fadingContainer: {
    position: 'absolute',
    top: 60,
    left: 60,
    backgroundColor: 'red',
    width: 60,
    height: 60
  },

  selection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  itemOld: {
    width: width * 0.96,
    paddingTop: height / 111,
    paddingBottom: height / 111,
    backgroundColor: "rgba(0, 101, 241, 0.8)",
    borderColor: 'blue',
    // borderWidth: 2,
    borderRadius: height / 75,
    alignItems: "center",
    justifyContent: "center",
    margin: height / 61,
  },

  item: {
    width: width * 0.46,
    // paddingTop: height / 111,
    // paddingBottom: height / 111,
    padding: 10,
    height: width * 0.45,
    backgroundColor: "rgba(0, 101, 241, 0.8)",
    borderRadius: height / 100,
    alignItems: "center",
    justifyContent: "center",
    // marginVertical: height / 61,
    margin: width * 0.02,
  },

  pVcContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000070"
  },

  pVc: {
    width: width * 0.8,
    height: height * 0.5,
    backgroundColor: "rgba(23, 163, 8, 1)",
    borderRadius: height / 34,
    borderWidth: 3
  },

  pVcContinue: {
    width: width * 0.85,
    height: height * 0.3,
    backgroundColor: "rgba(23, 163, 8, 1)",
    borderRadius: height / 34,
    borderWidth: 3
  },

  pVcExit: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "blue",
    width: width / 10,
    height: width / 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 61
  },

  savetrue: {
    backgroundColor: "grey",
  },

  savefalse: {
    backgroundColor: "blue",
  },

  pVcDiff: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center'
  },

  diffList: {
    width: width * 0.6,
    backgroundColor: "blue",
    borderRadius: height / 51,
    alignItems: "center",
    justifyContent: "center",
    margin: height / 85,
    paddingTop: height / 181,
    paddingBottom: height / 181,
    elevation: 9,
  },

  colorSelect: {
    flexDirection: "row",
    justifyContent: "center"
  },

  selectColor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 11,
    borderWidth: 3
  },

  colorText: {
    color: "white",
    fontWeight: "900",
    fontSize: 31
  },

  settings: {
    position: 'absolute',
    top: 9,
    left: 6,
    padding: 5,
  },

  quit: {
    position: 'absolute',
    bottom: 9,
    right: 6,
  }
});