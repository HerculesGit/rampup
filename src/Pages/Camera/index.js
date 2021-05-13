import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, SafeAreaView, StatusBar } from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation, route }) {
  const [hasPermissionCamera, sethasPermissionCamera] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const canRef = useRef(null);
  const [photo, setPhoto] = useState(null);


  useEffect(() => {
    (async () => {

      if (!hasPermissionCamera) {
        await requestCameraPermission();
        await takePhoto();
      }
    }
    )();

  }, []);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    sethasPermissionCamera(status === 'granted')
  }

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    })
    // const data = await canRef.current.takePictureAsync({allowsEditing: true});
    route.params['uri'] = result.uri;
    setPhoto(result.uri)
    navigation.goBack()
  }

  if (hasPermissionCamera === null) {
    return <View />;
  }
  if (hasPermissionCamera === false) {
    return (
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>Ops! É necessário acesso a câmera</Text>
        <Text style={styles.description}> Clique no botão abaixo e dê acesso a câmera</Text>
        <View style={{ marginTop: 10 }} />
        <Button title='Acessar câmera' onPress={() => requestCameraPermission()} />
      </View>);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#171d31" barStyle="light-content" />
      <View style={styles.container}>
        {/* <Camera style={styles.camera} type={type} ref={canRef} >

          <View style={styles.buttonContainer}>
            <Button
              title='Mudar Câmera'
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }} />
          </View>

          <View style={styles.containerPick}>
            <TouchableOpacity onPress={takePhoto} >
              <Ionicons name="checkmark" size={35} color="white" />
            </TouchableOpacity>
          </View>
        </Camera> */}

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          {photo &&
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', width: '100%', height: '100%' }}>
              <Image
                style={
                  {
                    width: '100%',
                    height: '100%',
                    borderRadius: 19,
                  }}
                source={{ uri: photo }}
              />
            </View>
          }

          <View style={
            {
              flex: 0,
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              alignItems: 'stretch',
              marginBottom: 25,
              marginTop: 20,
            }
          }>

            <View style={styles.containerPick}>
              <TouchableOpacity onPress={() => {
                route.params['uri'] = result.uri;
                navigation.goBack()
              }} >
                <Ionicons name="checkmark" size={35} color="white" />
              </TouchableOpacity>
            </View>
            <View style={styles.containerPick}>
              <TouchableOpacity onPress={takePhoto}>
                <Ionicons name="ios-camera-outline" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </View>


        </View>

      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CECECE',
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 5,
  },
  camera: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green',
    paddingBottom: 25,
  },
  buttonContainer: {
    backgroundColor: 'red',
    width: '100%',
  },

  title: {
    fontSize: 22,
    fontWeight: '700'
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
  },

  containerPick: {
    width: 60,
    height: 60,
    borderColor: '#FFFFFF',
    borderWidth: 2.0,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',

  }
});
