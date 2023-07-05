import React from 'react';
import { View, Image, Button, Platform, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

const App = () => {
    const [image, setImage] = React.useState(null);
    const [prediction, setPrediction] = React.useState(0);

    const openCamera = async () => {
        
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your camera!");
          return;
        }
    
        const result = await ImagePicker.launchCameraAsync();
    
        // Explore the result
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          console.log(result.assets[0].uri);
        }
    }

    const handleChooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1

        })

        if(!result.canceled) {
            setImage(result.assets[0].uri)
        }

    };

    const handleUploadImage = () => {

        if(Platform.OS === 'ios'){
            console.log(image)
            setImage(image.replace('file://', ''))
            console.log(image)
        }

        const data = new FormData();
        data.append('image', {uri: image, name: 'image.jpg', type: 'image/jpg'})

        console.log(data._parts)

        var responseClone;

        fetch(`http://api.euem.net/ai/mnist/jpg`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Connection': 'keep-alive',
                Accept: 'application/json',
            },
            body: data
        })
            .then((response) => {responseClone = response.clone(); return response.json()})
            .then((response) => {
                setPrediction(response.prediction)
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {!!prediction && (
                <>
                    <Text style={{marginBottom: 50, fontWeight: 'bold', fontSize: 30}}>The AI thinks its {prediction}</Text>
                </>
            )}
            {image && (
                <>
                    <Image
                        source={{ uri: image }} 
                        style={{ width: 300, height: 300 }}
                    />
                    <Button title="Upload Image" onPress={handleUploadImage} />
                </>
            )}
            <Button title="Choose Image" onPress={handleChooseImage} />
            <Button title="Take Photo" onPress={openCamera} />
        </View>
    );
};

export default App;