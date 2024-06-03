import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StatusBar,
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

    const hideStatusBar = () => {
      StatusBar.setHidden(true, "fade");
    };

    const showStatusBar = () => {
      StatusBar.setHidden(false, "fade");
    };

    hideStatusBar();
    lockLandscape();

    return () => {
      showStatusBar();
      lockPortrait();
    };
  }, []);

  const iframeHTML = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
  <head>
      <meta charset="utf-8">
      <title>Custom Video Player</title>
      <link rel="stylesheet" href="style.css">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- These 3 links are only for icons -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
  </head>
  <body>
      <style>
          /* Import Google font - Poppins */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
  }
  body{
    height: 100vh;
    background: #E3F2FD;
  }
  body, .container, .video-controls, .video-timer, .options{
    display: flex;
    align-items: normal;
    justify-content: center;
  }
  li.options.left{
    display: flex;
    align-items: center;
  }
  .container{
    width: 100%;
    user-select: none;
    overflow: hidden;
    background: #000;
    aspect-ratio: 16 / 9;
    position: relative;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  .container.fullscreen{
    max-width: 100%;
    width: 100%;
    height: 100vh;
    border-radius: 0px;
  }
  .wrapper{
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1;
    opacity: 0;
    bottom: -15px;
    transition: all 0.08s ease;
  }
  .container.show-controls .wrapper{
    opacity: 1;
    bottom: 0;
    transition: all 0.13s ease;
  }
  .wrapper::before{
    content: "";
    bottom: 0;
    width: 100%;
    z-index: -1;
    position: absolute;
    height: calc(100% + 35px);
    pointer-events: none;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  }
  .video-timeline{
    height: 7px;
    width: 100%;
    cursor: pointer;
  }
  .video-timeline .progress-area{
    height: 3px;
    position: relative;
    background: rgba(255, 255, 255, 0.6);
  }
  .progress-area span{
    position: absolute;
    left: 50%;
    top: -25px;
    font-size: 13px;
    color: #fff;
    pointer-events: none;
    transform: translateX(-50%);
  }
  .progress-area .progress-bar{
    width: 0%;
    height: 100%;
    position: relative;
    background: #2289ff;
  }
  .progress-bar::before{
    content: "";
    right: 0;
    top: 50%;
    height: 13px;
    width: 13px;
    position: absolute;
    border-radius: 50%;
    background: #2289ff;
    transform: translateY(-50%);
  }
  .progress-bar::before, .progress-area span{
    display: none;
  }
  .video-timeline:hover .progress-bar::before,
  .video-timeline:hover .progress-area span{
    display: block;
  }
  .wrapper .video-controls{
    padding: 5px 20px 10px;
  }
  .video-controls .options{
    width: 100%;
  }
  .video-controls .options:first-child{
    justify-content: flex-start;
  }
  .video-controls .options:last-child{
    justify-content: flex-end;
  }
  .options button{
    height: 40px;
    width: 40px;
    font-size: 19px;
    border: none;
    cursor: pointer;
    background: none;
    color: #efefef;
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  .options button :where(i, span) {
    height: 100%;
    width: 100%;
    line-height: 40px;
  }
  .options button:hover :where(i, span){
    color: #fff;
  }
  .options button:active :where(i, span){
    transform: scale(0.9);
  }
  .options button span{
    font-size: 23px;
  }
  .options input{
    height: 4px;
    margin-left: 3px;
    max-width: 75px;
    accent-color: #0078FF;
  }
  .options .video-timer{
    color: #efefef;
    margin-left: 15px;
    font-size: 14px;
  }
  .video-timer .separator{
    margin: 0 5px;
    font-size: 16px;
    font-family: "Open sans";
  }
  .playback-content{
    display: flex;
    position: relative;
  }
  .playback-content .speed-options{
    position: absolute;
    list-style: none;
    left: -40px;
    bottom: 40px;
    width: 95px;
    overflow: hidden;
    opacity: 0;
    border-radius: 4px;
    pointer-events: none;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: opacity 0.13s ease;
  }
  .playback-content .speed-options.show{
    opacity: 1;
    pointer-events: auto;
  }
  .speed-options li{
    cursor: pointer;
    color: #000;
    font-size: 14px;
    margin: 2px 0;
    padding: 5px 0 5px 15px;
    transition: all 0.1s ease;
  }
  .speed-options li:where(:first-child, :last-child){
    margin: 0px;
  }
  .speed-options li:hover{
    background: #dfdfdf;
  }
  .speed-options li.active{
    color: #fff;
    background: #3e97fd;
  }
  .container video{
    width: 100%;
  }
  .faded-lock{
    z-index: 9999;
  }
  .container .faded-lock {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 40px;
    color: rgba(255, 255, 255, 0.6);
    display: none;
  }
  .options .lock {
    font-size: 19px;
  }
  
  .container .faded-lock {
    display: none;
  }
  
  .container.locked .faded-lock {
    display: block;
  }
  
  
  @media screen and (max-width: 540px) {
    .wrapper .video-controls{
      padding: 3px 10px 7px;
    }
    .options input, .progress-area span{
      display: none!important;
    }
    .options button{
      height: 30px;
      width: 30px;
      font-size: 17px;
    }
    .options .video-timer{
      margin-left: 5px;
    }
    .video-timer .separator{
      font-size: 14px;
      margin: 0 2px;
    }
    .options button :where(i, span) {
      line-height: 30px;
    }
    .options button span{
      font-size: 21px;
    }
    .options .video-timer, .progress-area span, .speed-options li{
      font-size: 12px;
    }
    .playback-content .speed-options{
      width: 75px;
      left: -30px;
      bottom: 30px;
    }
    .speed-options li{
      margin: 1px 0;
      padding: 3px 0 3px 10px;
    }
    .right .pic-in-pic{
      display: none;
    }
  }
      </style>
      <div class="container show-controls">
          <div class="faded-lock"><i class="fa-solid fa-lock"></i></div>
          <div class="wrapper">
              <div class="video-timeline">
                  <div class="progress-area">
                      <span>00:00</span>
                      <div class="progress-bar"></div>
                  </div>
              </div>
              <ul class="video-controls">
                  <li class="options left">
                      <button class="volume"><i class="fa-solid fa-volume-high"></i></button>
                      <input type="range" min="0" max="1" step="any">
                      <div class="video-timer">
                          <p class="current-time">00:00</p>
                          <p class="separator"> / </p>
                          <p class="video-duration">00:00</p>
                      </div>
                  </li>
                  <li class="options center">
                      <button class="skip-backward"><i class="fa-solid fa-rotate-left"></i></button>
                      <button class="play-pause"><i class="fa-solid fa-play"></i></button>
                      <button class="skip-forward"><i class="fa-solid fa-rotate-right"></i></button>
                  </li>
                  <li class="options right">
                      <div class="playback-content">
                          <button class="playback-speed"><span class="material-symbols-rounded">slow_motion_video</span></button>
                          <ul class="speed-options">
                              <li data-speed="0.5">0.5x</li>
                              <li data-speed="0.75">0.75x</li>
                              <li data-speed="1" class="active">Normal</li>
                              <li data-speed="1.25">1.25x</li>
                              <li data-speed="1.5">1.5x</li>
                              <li data-speed="2">2x</li>
                          </ul>
                      </div>
                      <button class="pic-in-pic"><span class="material-symbols-rounded">picture_in_picture_alt</span></button>
                      <button class="fullscreen"><i class="fa-solid fa-expand"></i></button>
                      <button class="lock"><i class="fa-solid fa-lock"></i></button>
                  </li>
              </ul>
          </div>
          <video src="${videoUrl}"></video>
      </div>
      <script>
      // Get the elements
      const container = document.querySelector(".container"),
          mainVideo = container.querySelector("video"),
          videoTimeline = container.querySelector(".video-timeline"),
          progressBar = container.querySelector(".progress-bar"),
          volumeBtn = container.querySelector(".volume i"),
          volumeSlider = container.querySelector(".left input"),
          currentVidTime = container.querySelector(".current-time"),
          videoDuration = container.querySelector(".video-duration"),
          skipBackward = container.querySelector(".skip-backward i"),
          skipForward = container.querySelector(".skip-forward i"),
          playPauseBtn = container.querySelector(".play-pause i"),
          speedBtn = container.querySelector(".playback-speed"),
          speedOptions = container.querySelector(".speed-options"),
          picInPicBtn = container.querySelector(".pic-in-pic span"),
          fullscreenBtn = container.querySelector(".fullscreen i"),
          fadedLock = container.querySelector(".faded-lock i"),
          lockBtn = container.querySelector(".lock i");
  
      let timer, isDragging = false;
  
      // Play/Pause Video Function
      const playPauseVideo = () => {
          playPauseBtn.classList.toggle("fa-play", mainVideo.paused);
          playPauseBtn.classList.toggle("fa-pause", !mainVideo.paused);
          mainVideo.paused ? mainVideo.play() : mainVideo.pause();
      }
  
      // Add click event to play or pause the video
      playPauseBtn.addEventListener("click", playPauseVideo);
      mainVideo.addEventListener("play", () => playPauseBtn.classList.replace("fa-play", "fa-pause"));
      mainVideo.addEventListener("pause", () => playPauseBtn.classList.replace("fa-pause", "fa-play"));
  
      // Function to format the time
      const formatTime = time => {
          let seconds = Math.floor(time % 60),
              minutes = Math.floor(time / 60) % 60,
              hours = Math.floor(time / 3600);
  
          seconds = seconds < 10 ? "0" + seconds : seconds;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          hours = hours > 0 ? hours + ":" : "";
  
          return hours + minutes + ":" + seconds;
      }
  
      // Set the video duration
      mainVideo.addEventListener("loadeddata", e => {
          videoDuration.innerText = formatTime(mainVideo.duration);
      });
  
      // Update the progress bar as the video plays
      mainVideo.addEventListener("timeupdate", e => {
          let currentTime = e.target.currentTime,
              duration = e.target.duration;
          let percent = (currentTime / duration) * 100;
          progressBar.style.width = percent + "%";
          currentVidTime.innerText = formatTime(currentTime);
      });
  
      // Function to update the video time
      const updateVideoTime = (offsetX, timelineWidth) => {
          mainVideo.currentTime = (offsetX / timelineWidth) * mainVideo.duration;
      };
  
      // Update the video current time when seeking
      videoTimeline.addEventListener("click", e => {
          let timelineWidth = videoTimeline.clientWidth;
          updateVideoTime(e.offsetX, timelineWidth);
      });
  
      // Handle volume controls
      volumeBtn.addEventListener("click", () => {
          mainVideo.muted = !mainVideo.muted;
          volumeBtn.classList.toggle("fa-volume-high", !mainVideo.muted);
          volumeBtn.classList.toggle("fa-volume-mute", mainVideo.muted);
      });
  
      volumeSlider.addEventListener("input", e => {
          mainVideo.volume = e.target.value;
      });
  
      // Handle skip backward
      skipBackward.addEventListener("click", () => {
          mainVideo.currentTime -= 10;
      });
  
      // Handle skip forward
      skipForward.addEventListener("click", () => {
          mainVideo.currentTime += 10;
      });
  
      // Handle playback speed
      speedOptions.querySelectorAll("li").forEach(option => {
          option.addEventListener("click", () => {
              mainVideo.playbackRate = option.dataset.speed;
              speedOptions.querySelector(".active").classList.remove("active");
              option.classList.add("active");
          });
      });
  
      speedBtn.addEventListener("click", () => {
          speedOptions.classList.toggle("show");
      });
  
      // Handle picture-in-picture
      picInPicBtn.addEventListener("click", () => {
          mainVideo.requestPictureInPicture();
      });
  
      // Handle fullscreen
      fullscreenBtn.addEventListener("click", () => {
          container.classList.toggle("fullscreen");
          if (document.fullscreenElement) {
              document.exitFullscreen();
              fullscreenBtn.classList.replace("fa-compress", "fa-expand");
          } else {
              container.requestFullscreen();
              fullscreenBtn.classList.replace("fa-expand", "fa-compress");
          }
      });
  
      // Handle lock functionality
      lockBtn.addEventListener("click", () => {
          container.classList.toggle("locked");
          const isLocked = container.classList.contains("locked");
          fadedLock.style.display = isLocked ? "block" : "none";
          if (isLocked) {
              container.classList.remove("show-controls");
          } else {
              container.classList.add("show-controls");
          }
      });
  
      fadedLock.addEventListener("click", () => {
          container.classList.toggle("locked");
          const isLocked = container.classList.contains("locked");
          fadedLock.style.display = isLocked ? "block" : "none";
          if (isLocked) {
              container.classList.remove("show-controls");
          } else {
              container.classList.add("show-controls");
          }
      });
  
      // Show controls on mouse move
      container.addEventListener("mousemove", () => {
          if (!container.classList.contains("locked")) {
              container.classList.add("show-controls");
              clearTimeout(timer);
              timer = setTimeout(() => container.classList.remove("show-controls"), 5000);
          }
      });
  
      // Make progress bar draggable on mobile devices
      videoTimeline.addEventListener("touchstart", e => {
          isDragging = true;
      });
      
      videoTimeline.addEventListener("touchmove", e => {
          if (isDragging) {
              let timelineWidth = videoTimeline.clientWidth;
              let touchX = e.touches[0].clientX - videoTimeline.getBoundingClientRect().left;
              updateVideoTime(touchX, timelineWidth);
          }
      });
      
      videoTimeline.addEventListener("touchend", () => {
          isDragging = false;
      });
  
      videoTimeline.addEventListener("mousedown", e => {
          isDragging = true;
      });
      
      videoTimeline.addEventListener("mousemove", e => {
          if (isDragging) {
              let timelineWidth = videoTimeline.clientWidth;
              updateVideoTime(e.offsetX, timelineWidth);
          }
      });
  
      document.addEventListener("mouseup", () => {
          isDragging = false;
      });
  </script>
  
  
  
  
  </body>
  </html>
  

  `;

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },

  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
});

export default VideoScreen;
