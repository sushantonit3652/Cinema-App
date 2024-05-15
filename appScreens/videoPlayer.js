import VideoPlayer from 'react-native-reanimated-player';
import { useSharedValue } from 'react-native-reanimated';
export const Vid = () => {
  const videoHeight = useSharedValue(0);
  const isFullScreen = useSharedValue(false);
  const { paused, setPaused } = useContext(false);

  return (
    <VideoPlayer
      source={uri}
      headerTitle={'Title in full screen mode'}
      onTapBack={() => {
        Alert.alert('onTapBack');
      }}
      onTapMore={() => {
        Alert.alert('onTapMore');
      }}
      onPausedChange={state => {
        Alert.alert(`onPausedChange: ${state}`);
        setPaused(state);
      }}
      videoHeight={videoHeight}
      paused={paused}
      isFullScreen={isFullScreen}
    />
  );
};