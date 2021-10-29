import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


var capital: any;
var population: any;
var latlng: any;
var flagicon: any;

export function HomeScreen({ navigation }) {
  const [inputCountry, onChangeText] = React.useState('');
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  const getCountryInfo = async () => {
    try {
      const response = await fetch('https://restcountries.com/v2/name/' + inputCountry);
      const json = await response.json();
      setData(json);
      console.log("API response", inputCountry);
      capital = json[0].capital;
      population = json[0].population;
      latlng = json[0].latlng;
      flagicon = json[0].flag;
      navigation.navigate('Details');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter country"
        style={{ padding: 20, margin: 30, height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={inputCountry}
      />
      <View style={{ margin: 10 }}>
        <Button
          disabled={!inputCountry.length}
          title="Submit"
          color="black"
          onPress={getCountryInfo}
        />
      </View>
    </View>
  );
}



export function DetailsScreen({ navigation }) {

  var [temp, setTemp] = useState('')
  var [weather_icon, setWeatherIcon] = useState('')
  var [wind_speed, setWindSpeed] = useState('')
  var [prec_ip, setPrecip] = useState('')


  const getWeatherInfo = async () => {
    try {
      const response = await fetch('http://api.weatherstack.com/current?access_key=419af70de782f72154c5f8b8a618c21b&query=' + capital);
      const json = await response.json();
      console.log("Weather API response", json.current.temperature);
      setTemp(json.current.temperature);
      setWeatherIcon(json.current.weather_icons[0]);
      setWindSpeed(json.current.wind_speed);
      setPrecip(json.current.precip);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <View style={{ flex: 1, alignItems: 'flex-start', padding: 20 }}>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}> Capital: {capital}</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}> Population: {population} </Text>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}> Lat Lng: {latlng}</Text>
      <Image
        style={styles.tinyLogo}
        source={
          flagicon
        }
      />

      <View style={{ alignSelf: 'center', margin: 50 }}>
        <Button
          title="Capital Weather"
          color="tomato"
          onPress={getWeatherInfo}
        />
      </View>

      <Text style={{ fontWeight: 'bold', marginTop: 10 }}> Temparature: {temp}</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}> Wind Speed: {wind_speed}</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}> Precip: {prec_ip}</Text>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}> Weather icon: </Text>
      <Image
        style={styles.tinyLogo}
        source={
          weather_icon
        }
      />


    </View>
  );
}

const Stack = createNativeStackNavigator();

export function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'Weather App',
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{
          title: 'Information',
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
    alignContent: 'center',
    padding: 50,
    justifyContent: 'center',
  },
  baseText: {
    fontWeight: 'bold'
  },
  innerText: {
    color: 'red'
  },
  tinyLogo: {
    alignSelf: 'center',
    width: 80,
    height: 55,
  }
});

export default App;
