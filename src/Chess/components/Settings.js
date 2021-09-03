import React, { Component } from 'react';
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
import { Audio } from 'expo-av'
import AwesomeAlert from 'react-native-awesome-alerts';

export default class Settings extends Component {
    backHandler = null
    
    constructor(props) {
        super(props);

        this.state = {
            settings: {
                playAs: 'white',
                boardType: 1,
                helper: true,
                touchSound: true
            },

            boardSelected: 0,
            save: false,
            status: false,
            preview: [],
            alert: {
                status: false
            }
        }

    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => { this.closeSettings(); return true })
        this.getSettings()
        this.loadAudio()
    }

    componentDidUpdate() {
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    getSettings = async () => {
        let feedback = JSON.parse(await AsyncStorage.getItem('settings'))
        let preview = JSON.parse(await AsyncStorage.getItem('boardPreview'))
        this.setState(prevState => {
            return {
                settings: feedback,
                preview: preview
            }
        })
    }

    loadAudio = async () => {
        this.moveSound = new Audio.Sound()
        try {
            await this.moveSound.loadAsync(require("../../../assets/audio/moveSound.m4a"))
        } catch (error) {
            console.log(error)
        }
    }

    changePlay = (playAs) => {
        let settings = this.state.settings
        settings.playAs = playAs
        this.setState(prevState => {
            return { 
                settings,
                save: true,
            }
        })
    }

    changeHelper = (helper) => {
        let settings = this.state.settings
        settings.helper = helper
        this.setState(prevState => {
            return {
                settings,
                save: true
            }
        })
    }

    changeSound = (sound) => {
        if (sound) this.moveSound.replayAsync()
        let settings = this.state.settings
        settings.sound = sound
        this.setState(prevState => {
            return {
                settings,
                save: true
            }
        })
    }

    changeBoardType = () => {
        let settings = this.state.settings
        settings.boardType = this.state.boardSelected
        this.setState(prevState => {
            return {
                settings,
                save: true,
                status: false
            }
        })
    }

    previewBoardType = (type) => {
        this.setState(prevState => {
            return {
                boardSelected: type,
                status: true
            }
        })
    }

    cancelBoardPreview = () => {
        this.setState(prevState => {
            return {
                status: false
            }
        })
    }

    confirmClearGames = () => {
        this.setState(prevState => {
            return {
                alert: {
                    status: true,
                    title: 'Confirmation',
                    message: 'Are you sure you want to delete all saved games?',
                    cancel: 'No, cancel',
                    confirm: "Yes, I'm sure",
                    onConfirm: this.clearGames,
                    onCancel: () => {
                        this.setState(prevState => {
                            return {
                                alert: {
                                    status: false
                                }
                            }
                        })
                    }
                }
            }
        })
    }

    clearGames = async () => {
        console.log('clear')
        let lastGame = {
            status: false
        }
        await AsyncStorage.setItem('lastGame', JSON.stringify(lastGame))
        await AsyncStorage.setItem('saveGame12', '')
        await AsyncStorage.setItem('saveGame20', '')
        await AsyncStorage.setItem('saveGame21', '')
        await AsyncStorage.setItem('saveGame22', '')
        await AsyncStorage.setItem('saveGame23', '')
        await AsyncStorage.setItem('saveGame24', '')
        await AsyncStorage.setItem('saveGame32', '')
        this.setState(prevState => {
            return {
                alert: {
                    status: false
                }
            }
        })
        if (Platform.OS === 'android') ToastAndroid.show('All saved games cleared successfully', ToastAndroid.SHORT)
    }

    saveSettings = async () => {
        await AsyncStorage.setItem('settings', JSON.stringify(this.state.settings))
        if (Platform.OS === 'android') ToastAndroid.show('Settings saved successfuly', ToastAndroid.SHORT)
        this.setState({ save: false })
    }

    closeSettings = async () => {
        if (this.state.save) {
            this.setState(prevState => {
                return {
                    alert: {
                        status: true,
                        title: 'Confirmation',
                        message: 'Save changes?',
                        cancel: "No, don't save",
                        confirm: "Yes, Save changes",
                        onConfirm: async () => {
                            await AsyncStorage.setItem('settings', JSON.stringify(this.state.settings))
                            if (Platform.OS === 'android') ToastAndroid.show('Settings saved successfuly', ToastAndroid.SHORT)
                            this.setState({ save: false })
                            this.props.navigation.popToTop()
                        },
                        onCancel: () => {
                            this.setState(prevState => {
                                return {
                                    alert: {
                                        status: false
                                    }
                                }
                            })
                            this.props.navigation.popToTop()
                        }
                    }
                }
            })
        } else {
            // await AsyncStorage.setItem('settings', JSON.stringify(this.state.settings))
            // ToastAndroid.show('Settings saved successfuly', ToastAndroid.SHORT)
            // this.setState({ save: false })
            this.props.navigation.popToTop()
        }
    }

    render() {
        let boardPreview = this.state.status ? (
            <Modal animationType="fade" transparent={true} visible={true}>
                <ImageBackground
                    resizeMode={"stretch"}
                    style={{ flex: 1 }}
                    source={links[7][this.state.boardSelected]}
                >
                    <View style={styles.pVcContainer}>
                        <View style={styles.pVc}>
                            <Text style={eStyles.title}>Preview</Text>
                            <Board type={this.state.boardSelected} preview={this.state.preview}/>
                            <View style={styles.bottom}>
                                <TouchableOpacity
                                    style={[styles.close]}
                                    onPress={() => { this.changeBoardType() }}
                                >
                                    <Text style={eStyles.diffText}>Select</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.close}
                                    onPress={() => { this.cancelBoardPreview() }}
                                >
                                    <Text style={eStyles.diffText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </Modal>
        ) : null;

        let alert = this.state.alert.status ? 
            <AwesomeAlert
                show={true}
                showProgress={false}
                title={this.state.alert.title}
                message={this.state.alert.message}
                closeOnTouchOutside={false}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText={this.state.alert.cancel}
                confirmText={this.state.alert.confirm}
                cancelButtonColor="red"
                confirmButtonColor="blue"
                cancelButtonTextStyle={{ color: 'white' }}
                confirmButtonTextStyle={{ color: 'white' }}
                onCancelPressed={() => {
                    this.state.alert.onCancel()
                }}
                onConfirmPressed={() => {
                    this.state.alert.onConfirm()
                }}
            /> : null

        return (
            <ImageBackground
                resizeMode={"stretch"}
                style={{ flex: 1 }}
                source={links[7][7]}
            >
                <View style={styles.settingsContainer} >
                    <Text style={[styles.bottom1, eStyles.title]}>SETTINGS</Text>
                    <View style={[styles.item, styles['itemboard']]}>
                        <Text style={eStyles.itemText}>Board Style</Text>
                        <View style={[styles.options, styles.optionsBoard]}>
                            <ScrollView style={styles.scroll} horizontal={true}>
                                <TouchableOpacity
                                    style={[styles.board, styles['board1' + this.state.settings.boardType]]}
                                    onPress={() => { this.previewBoardType(1) }}
                                >
                                    <Board type={1} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.board, styles['board2' + this.state.settings.boardType]]}
                                    onPress={() => { this.previewBoardType(2) }}
                                >
                                    <Board type={2} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.board, styles['board3' + this.state.settings.boardType]]}
                                    onPress={() => { this.previewBoardType(3) }}
                                >
                                    <Board type={3} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.board, styles['board4' + this.state.settings.boardType]]}
                                    onPress={() => { this.previewBoardType(4) }}
                                >
                                    <Board type={4} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={eStyles.itemText}>Play As</Text>
                        <View style={styles.options}>
                            <TouchableOpacity
                                style={[styles.option, styles['option' + this.state.alert.status], styles['white'+ this.state.settings.playAs]]}
                                onPress={() => { this.changePlay('white') }}
                            >
                                <Text style={eStyles.diffText}>White</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.option, styles['option' + this.state.alert.status], styles['black' + this.state.settings.playAs]]}
                                onPress={() => { this.changePlay('black') }}
                            >
                                <Text style={eStyles.diffText}>Black</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={eStyles.itemText}>Moves Helper</Text>
                        <View style={styles.options}>
                            <TouchableOpacity
                                style={[styles.option, styles['option' + this.state.alert.status], styles['on' + this.state.settings.helper]]}
                                onPress={() => { this.changeHelper(true) }}
                            >
                                <Text style={eStyles.diffText}>On</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.option, styles['option' + this.state.alert.status], styles['off' + this.state.settings.helper]]}
                                onPress={() => { this.changeHelper(false) }}
                            >
                                <Text style={eStyles.diffText}>Off</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <Text style={eStyles.itemText}>Sounds</Text>
                        <View style={styles.options}>
                            <TouchableOpacity
                                style={[styles.option, styles['option' + this.state.alert.status], styles['soundOn' + this.state.settings.sound]]}
                                onPress={() => { this.changeSound(true) }}
                            >
                                <Text style={eStyles.diffText}>On</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.option, styles['option' + this.state.alert.status], styles['soundOff' + this.state.settings.sound]]}
                                onPress={() => { this.changeSound(false) }}
                            >
                                <Text style={eStyles.diffText}>Off</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.options}>
                            <TouchableOpacity
                                style={[styles.option, styles['option' + this.state.alert.status], styles.alwaysOn]}
                                onPress={() => { this.confirmClearGames() }}
                            >
                                <Text style={eStyles.diffText}>CLEAR SAVED GAMES</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.bottom, styles.bottom1]}>
                        <TouchableOpacity
                            style={[styles.close, styles['option' + this.state.alert.status], styles['save'+ this.state.save]]}
                            disabled={!this.state.save}
                            onPress={() => { this.saveSettings() }}
                        >
                            <Text style={eStyles.diffText}>SAVE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.close, styles['option' + this.state.alert.status]]}
                            onPress={() => { this.closeSettings() }}
                        >
                            <Text style={eStyles.diffText}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {boardPreview}
                {alert}
            </ImageBackground>
        );
    }
}

const { height, width } = Dimensions.get("window");
EStyleSheet.build({
    $rem: height / 150
});

const eStyles = EStyleSheet.create({
    itemText: {
        color: "white",
        fontWeight: "700",
        fontSize: "6rem",
        margin: height / 99,
    },

    diffText: {
        color: "#F3F3F3",
        fontWeight: "900",
        fontSize: "4.5rem",
        marginBottom: 5,
    },
    
    title: {
        color: "#F3F3F3",
        fontWeight: "500",
        fontSize: "7.5rem",
        padding: height / 111,
    }
});

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        alignItems: 'center'
    },

    item: {
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center',
    },

    itemboard: {
        flex: 2,
        width: width
    },

    options: {
        width: width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    optionsBoard: {
        width: width,
        padding: height / 181,
        backgroundColor: '#00000099',
        borderWidth: 3,
    },


    alwaysOn: {
        backgroundColor: "blue",
    },

    whitewhite: {
        backgroundColor: "blue",
    },

    blackblack: {
        backgroundColor: "blue",
    },

    ontrue: {
        backgroundColor: "blue",
    },

    offfalse: {
        backgroundColor: "blue",
    },

    soundOntrue: {
        backgroundColor: "blue",
    },

    soundOfffalse: {
        backgroundColor: "blue",
    },

    option: {
        flex: 1,
        margin: width / 111,
        backgroundColor: "grey",
        borderRadius: height / 51,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: height / 181,
        paddingBottom: height / 181,
        elevation: 9,
    },

    optiontrue: {
        elevation: 0,
    },

    optionfalse: {
        elevation: 9,
    },

    board: {
        margin: 5,
        borderWidth: 2,
    },

    board11: {
        borderColor: 'red'
    },

    board22: {
        borderColor: 'red'
    },

    board33: {
        borderColor: 'red'
    },

    board44: {
        borderColor: 'red'
    },

    savetrue: {
        backgroundColor: "blue",
    },

    savefalse: {
        backgroundColor: "grey",
    },

    close: {
        width: width * 0.3,
        margin: width / 19,
        backgroundColor: "blue",
        borderRadius: height / 51,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: height / 181,
        paddingBottom: height / 181,
        elevation: 9,
    },

    closetrue: {
        elevation: 0,
    },

    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    bottom1: {
        backgroundColor: '#00000099',
        borderWidth: 3,
        width: width,
        textAlign: 'center'
    },

    pVcContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    pVc: {
        width: width,
        height: height,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
});