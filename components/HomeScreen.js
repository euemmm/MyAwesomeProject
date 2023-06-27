import React from 'react';
import { View, Image, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

const App = () => {
    const [image, setImage] = React.useState(null);

    const openCamera = async () => {
        
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("You've refused to allow this app to access your camera!");
          return;
        }
    
        const result = await ImagePicker.launchCameraAsync();
    
        // Explore the result
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
          console.log(result.uri);
        }
    }

    const handleChooseImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({

            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1

        })

        if(!result.canceled) {
            setImage(result.assets[0].uri)
        }

    };

    const handleUploadImage = () => {

        const data = new FormData();
        data.append('image', {uri: Platform.OS === 'ios' ? image.replace('file://', '') : image.uri})

        fetch(`https://api.euem.net/ai/mnist/jpg`, {
            method: 'POST',
            body: data,
        })
            .then((response) => response.json())
            .then((response) => {
                console.log('response', response);
            })
            .catch((error) => {
                console.log('error', error);
            });
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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