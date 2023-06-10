import {SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
	
    return (

		<SafeAreaView style = {{width: '100%', height: '100%'}}>

			<NavigationContainer style = {{width: '100%', height: '100%'}}>

				<Stack.Navigator style = {{width: '100%', height: '100%'}}>

					<Stack.Screen
						style = {{width: '100%', height: '100%'}}
						name = "Login"
						component = {LoginScreen}
					/>

					<Stack.Screen
						style = {{width: '100%', height: '100%'}}
						name = "Home"
						component = {HomeScreen}
					/>
					
				</Stack.Navigator>

			</NavigationContainer>

		</SafeAreaView>

    )

}

export default App
