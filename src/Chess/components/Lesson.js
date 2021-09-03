import React, {useState, useEffect} from 'react'
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ImageBackground,
    ToastAndroid,
    ScrollView,
    BackHandler,
    Platform,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import Board from './Board'
import links from "../routines/Links";
import EStyleSheet from "react-native-extended-stylesheet";
import { Ionicons } from '@expo/vector-icons';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function Lesson(props) {
    const { navigation } = props

    const [lessonProgress, setLessonProgress] = useState([])
    useEffect(() => {
        getProgress()
    }, [])

    const getProgress = async () => {
        let preview = JSON.parse(await AsyncStorage.getItem('boardPreview'))
        setLessonProgress(preview)
    }

    return (
        <ImageBackground
            resizeMode={"stretch"}
            style={{ flex: 1 }}
            source={links[7][7]}
        >
            <View style={styles.container}>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HowToPlay')}>
                        <Ionicons name="md-arrow-back" size={41} color="rgb(0, 101, 241)" />
                    </TouchableOpacity>
                </View>
                <Text style={eStyles.lessonTitle}>Lesson 1</Text>
                <Text style={eStyles.title}>Introduction to Chess for begineers</Text>
                <View style={styles.boardContainer}>
                    {lessonProgress.length ? <Board type={3} preview={lessonProgress} /> : <View />}
                </View>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.content}>
                        <Text style={eStyles.infoText}>
                            Random Test
                            Will use this to test the messages displayed in the tutorial section
                            It should go the next line auto matically
                            testing testing testing
                            one two
                            Random Test
                            Will use this to test the messages displayed in the tutorial section
                            It should go the next line auto matically
                            testing testing testing
                            one two
                            Random Test
                            Will use this to test the messages displayed in the tutorial section
                            It should go the next line auto matically
                            testing testing testing 
                            one two
                            Random Test
                            Will use this to test the messages displayed in the tutorial section
                            It should go the next line auto matically
                            testing testing testing 
                            one two
                            Random Test
                            Will use this to test the messages displayed in the tutorial section
                            It should go the next line auto matically
                            testing testing testing
                            one two
                        </Text>
                    </View>
                </ScrollView>
                <View style={styles.bottomButtons}>
                    <TouchableOpacity
                        style={[styles.button]}
                    >
                        <Text style={eStyles.buttonText}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: 'green'}]}
                    >
                        <Text style={eStyles.buttonText}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}
const { height, width } = Dimensions.get("window");
EStyleSheet.build({
    $rem: height / 150
});

const eStyles = EStyleSheet.create({
    lessonTitle: {
        color: "white",
        fontWeight: "700",
        fontSize: "6rem",
        margin: height / 50,
    },

    lessonText: {
        color: "white",
        fontSize: "3.5rem",
    },

    backText: {
        color: "rgb(0, 101, 241)",
        fontSize: "4rem",
    },

    title: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '3.5rem'
    },

    buttonText: {
        textAlign: 'center',
        color: 'white',
    },

    infoText: {
        color: 'white',
        fontSize: '4rem',
        textAlign: 'justify', 
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    },

    top: {
        position: 'absolute',
        top: 0,
        left: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },

    backButton: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    scrollContainer: {
        flex: 1,
        width: '96%',
        marginVertical: 10,
        backgroundColor: "rgba(36, 33, 33, 0.945)",
        borderRadius: 8,
    },

    content: {
        flex: 1,
        padding: 10,
    },

    lessonContainer: {
        width: '100%',
        alignItems: 'center',
    },

    lesson: {
        width: '85%',
        backgroundColor: "rgba(36, 33, 33, 0.945)",
        elevation: 10,
        borderRadius: 8,
        marginVertical: 8,
        padding: 16,
    },

    boardContainer: {
        marginTop: 20
    },

    bottomButtons: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginBottom: 10
    },

    button: {
        padding: 10,
        backgroundColor: "blue",
        width: '45%',
        marginHorizontal: '2.5%',
        borderRadius: 8
    },

});