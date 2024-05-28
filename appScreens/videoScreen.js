import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Video } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { SafeAreaView } from "react-native";

const VideoPlayer = () => {
  const [fullscreen, setFullscreen] = useState(true);

  useEffect(() => {
    const lockLandscape = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    };

    const lockPortrait = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };

    lockLandscape();

    return () => {
      lockPortrait();
    };
  }, []);

  const toggleFullscreen = async () => {
    if (fullscreen) {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    }
    setFullscreen(!fullscreen);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:'black'
    },
    video: {
      width: "100%",
      height: "100%",
    },
    fullscreenVideo: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    fullscreenButton: {
      position: "absolute",
      top: 10,
      right: 10,
      zIndex: 1,
      marginTop: 20,
    },
    fullscreenButtonText: {
      color: "white",
      fontSize: 18,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 5,
      borderRadius: 5,
      marginTop: 20,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.fullscreenButton}
        onPress={toggleFullscreen}
      >
        
      </TouchableOpacity>
      <Video
        source={{
          uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        }}
        style={fullscreen ? styles.fullscreenVideo : styles.video}
        useNativeControls
        resizeMode="contain"
        shouldPlay
        isLooping
      />
    </SafeAreaView>
  );
};

export default VideoPlayer;
