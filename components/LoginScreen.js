import React, {useEffect, useState} from 'react';
import {View, Pressable, Text, TextInput, StyleSheet} from 'react-native';
import CheckBox from 'expo-checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {

    const [ID, onChangeID] = useState('')
    const [PW, onChangePW] = useState('')
    const [isChecked, setCheck] = useState(false)
    var stars = ''
    var canLogin = false

    for(let i = 0; i < PW.length; i ++) {

        stars = stars + '*';

    }

    if(ID != "" && PW != "" && PW.length >= 8) {

        canLogin = true

    }

    _storeID = async () => {

        if(isChecked) {

            try {

                await AsyncStorage.setItem(
                    'userID', ID
                )

                await AsyncStorage.setItem(
                    'saveID', String(setCheck)
                )

            } catch(error) {

                await AsyncStorage.setItem(
                    'userID', ""
                )

                await AsyncStorage.setItem(
                    'saveID', 'false'
                )
                
            }

        }

    }

    _fetchID = async () => {

        console.log("asdf")

        try {

            let tmp = await AsyncStorage.getItem("userID")

            if(tmp !== null) {

                onChangeID(tmp)

            }

            tmp = await AsyncStorage.getItem("saveID")

            if(tmp == "false") {

                setCheck(false)

            } else {

                setCheck(true)

            }

        } catch (error) {

            onChangeID("")

        }

    }

    useEffect(() => {_fetchID()})

    return(
        <View style = {{flex: 1}}>
            <View style = {{display: 'flex', marginHorizontal: 10, flex: 1}}>
                <TextInput style = {styles.textInput} value = {ID} onChangeText = {onChangeID} placeholder = "ID" placeholderTextColor={'grey'}/>
                <TextInput style = {styles.textInput} value = {stars} onChangeText = {onChangePW} placeholder = "PW" placeholderTextColor={'grey'}/>
                <View style = {{flexDirection: 'row'}}>
                    <CheckBox style = {{margin: 8}} value = {isChecked} onValueChange = {setCheck} color = {isChecked ? "#4D9DE0" : undefined}/>
                    <Text style={{margin: 8, marginLeft: 0, marginTop: 9}}>Check to save ID</Text>
                </View>
            </View>
            <Pressable style = {[styles.loginButton , {backgroundColor: canLogin ? '#4D9DE0': 'grey'}]} onPress={() => {_storeID(); navigation.navigate('Home'); onChangeID(''); onChangePW(''); setCheck(false)}}>
                <Text style = {{fontSize: 20, fontWeight: 'bold', textAlignVertical: 'center', color: canLogin ? '#C5FFFD' : 'darkgray'}}>Login</Text>
            </Pressable>
        </View>

    )

}

const styles = StyleSheet.create({

	textInput : {

        margin: 10,
        height: 50,
        borderWidth: 0.1,
        padding: 10,
        borderRadius: 4,
        borderColor: 'grey',
        alignSelf: 'center',
        width: '100%',
        fontSize: 20,
        backgroundColor: 'white',
        

    },
    loginButton : {

        marginHorizontal: 10,
        height: 50,
        marginBottom: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 4,
        shadowColor: 'black',
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowOpacity: 0.16,
        shadowRadius: 5.68,
        elevation: 11

    }

})

export default Login;