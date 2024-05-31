import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import { SafeAreaView } from "react-native-safe-area-context";

const VideoScreen = ({ route }) => {
  const { videoUrl } = route.params;
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(true);

  useEffect(() => {
    const lockLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    };

    const lockPortrait = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };

    lockLandscape();

    return () => {
      lockPortrait();
    };
  }, []);

  const iframeHTML = `
  <!DOCTYPE html>
<html>
<head>
  <meta meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #000;
    }
    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
    .btn1{
      position: absolute;
      left:0;
      z-index: 999;
      height: 50%;
      width: 40%;
      visibility: visible; /* Changed from 1 to visible */
      background: transparent;
      border: none;
      outline: none;
      color:transparent;
      cursor: pointer; /* Added cursor style for better UX */
    }
    .btn2 {
      position: absolute;
      right:0;
      z-index: 999;
      height: 50%;
      width: 40%;
      visibility: visible; /* Changed from 1 to visible */
      background: transparent;
      border: none;
      outline: none;
      color:transparent;
      cursor: pointer; /* Added cursor style for better UX */
    }
    .btn1:active, .btn2:active {
      color: #fff; /* Text color on hover */
    }
    /* Added styles for the ripple effect */
    .ripple {
      position: absolute;
      border-radius: 50%;
      transform: scale(0);
      animation: rippleEffect 0.5s linear;
    }
    @keyframes rippleEffect {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  </style>
</head>
<body>
  <button class="btn1" onclick="skipBackward()">
    -10 sec
    <span class="ripple" id="btn1Ripple"></span> <!-- Ripple element for btn1 -->
  </button>
  <button class="btn2" onclick="skipForward()">
    +10 sec
    <span class="ripple" id="btn2Ripple"></span> <!-- Ripple element for btn2 -->
  </button>
  <video width="100%" height="100%" controls autoplay controlsList="nodownload">
    <source src="${videoUrl}" type="video/mp4">
  </video>
  <script>
    const video = document.querySelector('video');
    const btn1Ripple = document.getElementById('btn1Ripple');
    const btn2Ripple = document.getElementById('btn2Ripple');

    function skipForward() {
      video.currentTime += 10; // Skip 10 seconds forward
      displayRipple(btn2Ripple);
    }

    function skipBackward() {
      video.currentTime -= 10; // Skip 10 seconds backward
      displayRipple(btn1Ripple);
    }

    function displayRipple(rippleElement) {
      rippleElement.style.top = event.clientY + 'px';
      rippleElement.style.left = event.clientX + 'px';
      rippleElement.style.background = 'rgba(255, 255, 255, 0.5)'; // Ripple color
      rippleElement.classList.add('ripple'); // Trigger ripple effect
      setTimeout(function() {
        rippleElement.classList.remove('ripple');
      }, 500); // Remove ripple effect after 0.5s
    }
    
  </script>
</body>
</html>

  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: iframeHTML }}
        // style={fullscreen ? styles.fullscreenVideo : styles.video}
        onLoadEnd={() => {
          console.log("WebView content loaded.");
          setLoading(false);
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error: ", nativeEvent);
        }}
        onLoadStart={() => {
          console.log("WebView content loading started.");
          setLoading(true);
        }}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});

export default VideoScreen;
