import React, { useState, useEffect } from 'react';
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

import links from "../routines/Links";
import EStyleSheet from "react-native-extended-stylesheet";
import { Ionicons } from '@expo/vector-icons';

const lessons = [
    'Introduction',
    'Basics of the game',
    'Piece Movement (Rook)',
    'Piece Movement (Bishop)',
    'Piece Movement (Queen)',
    'Piece Movement (Knight)',
    'Piece Movement (King)',
    'Piece Movement (Pawn)',
]

export default function HowToPlay(props) {
    const { navigation } = props
    const [lessonProgress, setLessonProgress] = useState(1)
    useEffect(() => {
        getProgress()
    }, [])

    const getProgress = async () => {
        let progress = await AsyncStorage.getItem('progress')
        progress = JSON.parse(progress)
        setLessonProgress(progress.lessons)
    }

    const openLesson = () => {
        navigation.navigate('Lesson')
    }

    return (
        <ImageBackground
            resizeMode={"stretch"}
            style={{ flex: 1 }}
            source={links[7][7]}
        >
            <View style={styles.container}>
                <View style={styles.top}>
                    <TouchableOpacity
                        style={styles.backButton} 
                        onPress={() => navigation.popToTop()}
                    >
                        <Ionicons name="md-arrow-back" size={41} color="rgb(0, 101, 241)" />
                        <Text style={eStyles.backText}>
                            Go Back
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={eStyles.lessonTitle}>Lessons list</Text>
                <ScrollView style={styles.scrollContainer}>
                    {lessons.map((lesson, index) => 
                        <View style={styles.lessonContainer} key={index}>
                            <TouchableOpacity 
                                style={[styles.lesson, styles['active'+ (index < lessonProgress)]]}
                                disabled={index >= lessonProgress}
                                onPress={() => openLesson(index)}
                            >
                                <Text style={eStyles.lessonText}>
                                    Lesson {index + 1}: {lesson}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </ScrollView>
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
    }
});

const styles  =StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        position: 'relative',
    },

    top: {
        width: '100%',
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
        width: '100%',
        marginBottom: 12
    },

    lessonContainer: {
        width: '100%',
        alignItems: 'center',
    },

    lesson: {
        width: '85%',
        backgroundColor: "rgba(0, 101, 241, 0.9)",
        elevation: 10,
        borderRadius: 8,
        marginVertical: 8,
        padding: 16,
    },

    activefalse: {
        backgroundColor: 'rgba(128, 128, 128, 0.85)'
    }

});