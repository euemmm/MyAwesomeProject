import React, {useState} from 'react';
import {View, Pressable, Text, TextInput, StyleSheet} from 'react-native';

const Login = ({navigation}) => {

    const [ID, onChangeID] = useState('')
    const [PW, onChangePW] = useState('')
    var stars = ''
    var canLogin = false

    for(let i = 0; i < PW.length; i ++) {

        stars = stars + '*';

    }

    if(ID != "" && PW != "" && PW.length >= 8) {

        canLogin = true

    }

    return(
        <View style = {{flex: 1}}>
            <View style = {{display: 'flex', marginHorizontal: '10px', flex: 1}}>
                <TextInput style = {styles.textInput} value = {ID} onChangeText = {onChangeID} placeholder = "ID" placeholderTextColor={'grey'}/>
                <TextInput style = {styles.textInput} value = {stars} onChangeText = {onChangePW} placeholder = "PW" placeholderTextColor={'grey'}/>
            </View>
            <Pressable style = {[styles.loginButton , {backgroundColor: canLogin ? '#4D9DE0': 'grey'}]} onPress={() => {navigation.navigate('Home'); onChangeID(''); onChangePW('')}}>
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
        padding: '10px',
        borderRadius: 4,
        borderColor: 'grey',
        alignSelf: 'center',
        width: '100%',
        fontSize: 20,
        backgroundColor: 'white',
        

    },
    loginButton : {

        marginHorizontal: '10px',
        height: 50,
        marginBottom: '10px',
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