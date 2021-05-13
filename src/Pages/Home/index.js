import React, { useState, useEffect } from 'react';

import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CAMERA_SCREEN } from '../../Routers/index'
import * as ImagePicker from 'expo-image-picker';

export default function HomeScreen({ navigation, route }) {

  // all variables
  const [image, setImage] = useState(null)

  const imageUri = {
    uri: null
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (event) => {
      console.log('Ixi! Foi focada', imageUri)
      
      if (imageUri['uri']) {
      console.log('Setado', imageUri['uri'])

        setImage(imageUri['uri'])
      }
    })
    return unsubscribe;
  }, [navigation]);


  //  all functions
  const requestGaleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {

      alert('Ops!, Precisamos de permissão para isso!');
      return false;
    } else if (status === 'granted') {
      return true;
    }
  }
  const pickImageGalery = async () => {
    const hasPermission = await requestGaleryPermission();
    if (hasPermission) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.cancelled) {
        setImage(result.uri);
      }
    }


  }

  const pickImageCamera = () => {
    navigation.navigate(CAMERA_SCREEN, imageUri);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content" />

      <View style={styles.column}>

        {image &&
          <View style={styles.containerNoImage}>
            <Image
              style={
                {
                  width: '100%',
                  height: '100%',
                  borderRadius: 19,
                }
                
              }
              source={{ uri: image }}
            />
          </View>
        }

        {!image &&
          <View style={styles.containerNoImage}>
            <Text style={styles.text}>Nenhuma imagem selecionada</Text>
          </View>
        }

        <View style={styles.rowIcons}>
          <TouchableOpacity
            onPress={pickImageCamera}>
            <View style={styles.icon}>
              <Ionicons name="ios-camera-outline" size={40} color="black" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={pickImageGalery}>
            <View style={styles.icon}>
              <Ionicons name="image-outline" size={40} color="black" />
            </View>
          </TouchableOpacity>

          {/* <View> </View>

          <View></View> */}
        </View>

      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  image: {
    flex: 1,
    flexDirection: 'row',
    width: '100',
    height: 50,
  },

  containerNoImage: {
    flex: 3,
    flexDirection: 'row',
    width: '90%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 2.0,
    borderRadius: 20,

  },

  text: {
    fontSize: 22,
    fontWeight: '700'
  },

  rowIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },

  // Normal
  icon: {
    width: 80,
    height: 80,
    borderRadius: 100,
    backgroundColor: '#CECECE',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});