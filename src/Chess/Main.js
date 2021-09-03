import React, { Component } from 'react'
import { ImageBackground, ToastAndroid, Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AppNavigator from './navigation/AppNavigator'
import links from './routines/Links'
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

const LATEST_VERSION = 5

export default class Main extends Component {
    state = {
        isReady: false,
    };

    componentDidMount() {
        this._cacheResourcesAsync().then(() => {
            this.setState({isReady: true})
        })
    }

    render() {
        if (!this.state.isReady) {
            return (
                // <AppLoading
                //     startAsync={this._cacheResourcesAsync}
                //     onFinish={() => this.setState({ isReady: true })}
                //     onError={console.warn}
                // />
                <ImageBackground
                    resizeMode={"stretch"}
                    style={{ flex: 1 }}
                    source={links[7][0]}
                >

                </ImageBackground>
            );
        }

        return (
            <AppNavigator />
        );
    }

    async _cacheResourcesAsync() {
        const newProfile = () => {
            console.log('New Profile')
            let profile = {
                id: Math.floor(Math.random() * 111111111),
                progress: {},
                version: LATEST_VERSION
            }

            let settings = {
                playAs: 'white',
                boardType: 1,
                helper: true,
                sound: true
            }

            let progress = {
                vsAI: 3,
                lessons: 1
            }

            let lastGame = {
                status: false
            }

            let boardPreview = '[[{"piece":6,"player":"","style":"","number":0},{"piece":6,"player":"","style":"","number":1},{"piece":2,"player":"black","style":"","number":2},{"piece":5,"player":"black","style":"","number":3},{"piece":6,"player":"","style":"","number":4},{"piece":6,"player":"","style":"","number":5},{"piece":3,"player":"black","style":"","number":6},{"piece":5,"player":"black","style":"","number":7}],[{"piece":6,"player":"","style":"","number":8},{"piece":0,"player":"black","style":"","number":9},{"piece":4,"player":"black","style":"","number":10},{"piece":1,"player":"black","style":"target","number":11},{"piece":0,"player":"black","style":"","number":12},{"piece":0,"player":"black","style":"","number":13},{"piece":6,"player":"","style":"","number":14},{"piece":0,"player":"black","style":"","number":15}],[{"piece":0,"player":"black","style":"","number":16},{"piece":6,"player":"","style":"","number":17},{"piece":0,"player":"black","style":"","number":18},{"piece":0,"player":"black","style":"","number":19},{"piece":6,"player":"","style":"path","number":20},{"piece":6,"player":"","style":"","number":21},{"piece":0,"player":"black","style":"target","number":22},{"piece":6,"player":"","style":"","number":23}],[{"piece":6,"player":"","style":"","number":24},{"piece":3,"player":"white","style":"","number":25},{"piece":6,"player":"","style":"","number":26},{"piece":6,"player":"","style":"","number":27},{"piece":6,"player":"","style":"","number":28},{"piece":6,"player":"","style":"path","number":29},{"piece":6,"player":"","style":"path","number":30},{"piece":6,"player":"","style":"path","number":31}],[{"piece":6,"player":"","style":"","number":32},{"piece":6,"player":"","style":"","number":33},{"piece":1,"player":"white","style":"","number":34},{"piece":3,"player":"black","style":"target","number":35},{"piece":6,"player":"","style":"path","number":36},{"piece":6,"player":"","style":"path","number":37},{"piece":4,"player":"white","style":"yes","number":38},{"piece":6,"player":"","style":"path","number":39}],[{"piece":6,"player":"","style":"","number":40},{"piece":0,"player":"white","style":"","number":41},{"piece":6,"player":"","style":"","number":42},{"piece":6,"player":"","style":"","number":43},{"piece":0,"player":"white","style":"","number":44},{"piece":6,"player":"","style":"path","number":45},{"piece":6,"player":"","style":"path","number":46},{"piece":6,"player":"","style":"path","number":47}],[{"piece":0,"player":"white","style":"","number":48},{"piece":1,"player":"white","style":"","number":49},{"piece":0,"player":"white","style":"","number":50},{"piece":0,"player":"white","style":"","number":51},{"piece":6,"player":"","style":"path","number":52},{"piece":0,"player":"white","style":"","number":53},{"piece":0,"player":"white","style":"","number":54},{"piece":0,"player":"white","style":"","number":55}],[{"piece":1,"player":"black","style":"","number":56},{"piece":6,"player":"","style":"","number":57},{"piece":6,"player":"","style":"","number":58},{"piece":6,"player":"","style":"path","number":59},{"piece":2,"player":"white","style":"","number":60},{"piece":6,"player":"","style":"","number":61},{"piece":3,"player":"white","style":"","number":62},{"piece":5,"player":"white","style":"","number":63}]]'
            boardPreview = JSON.parse(boardPreview)
            
            const save = async () => {
                await AsyncStorage.setItem('profile', JSON.stringify(profile))
                await AsyncStorage.setItem('boardPreview', JSON.stringify(boardPreview))
                await AsyncStorage.setItem('progress', JSON.stringify( progress ))
                await AsyncStorage.setItem('settings', JSON.stringify( settings ))
                await AsyncStorage.setItem('lastGame', JSON.stringify( lastGame ))
                await AsyncStorage.setItem('saveGame12', '')
                await AsyncStorage.setItem('saveGame20', '')
                await AsyncStorage.setItem('saveGame21', '')
                await AsyncStorage.setItem('saveGame22', '')
                await AsyncStorage.setItem('saveGame23', '')
                await AsyncStorage.setItem('saveGame24', '')
                await AsyncStorage.setItem('saveGame32', '')
            }

            save()
        }

        let load
        try {
            load = await AsyncStorage.getItem('profile')
        } catch (error) {
            console.log(error)
            // return
        }

        let feedback
        try {
            feedback = JSON.parse(load)
        } catch (error) {
        }

        if (feedback) {
            console.log(feedback.version < LATEST_VERSION)
            if (feedback.version < LATEST_VERSION) {
                newProfile()
                Platform.OS === 'android' && ToastAndroid.show('New update downloaded! Profile has resetted', ToastAndroid.SHORT)
            }
        } else {
            newProfile()
            Platform.OS === 'android' && ToastAndroid.show('New profile created!', ToastAndroid.SHORT)
        }
        
        let images = []

        links.map((item, index) => {
            if (index < 6) {
                images.push(item.white)
                images.push(item.black)
                return item
            } else if (index === 6) {
                return item
            } else {
                let inner = item.map(temp => {
                    images.push(temp)
                    return temp
                })
                return inner
            }
        })
        
        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages);
    }
}