import React, { useState } from "react";
// import { AppLoading } from "expo";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { View, ImageBackground, AsyncStorage, Text } from "react-native";
import { Provider, useDispatch } from "react-redux";
import store from "./src/store";
import QuranScreen from "./src/screens/quran/";
import Navs from "./src/navigation";
import { Root } from "native-base";
import { init } from "./src/store/db.js";
init()
  .then(() => {
    // console.log('Initialized database');
  })
  .catch((err) => {
    console.log("Initializing db failed.");
    console.log(err);
  });

const Main = () => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false);
  const getData = async () => {
    try {
      const theme = await AsyncStorage.getItem("theme");
      const font = await AsyncStorage.getItem("font");
      const resTheme = JSON.parse(theme);
      const resFont = JSON.parse(font);
      if (resTheme) {
        dispatch({ type: "SET_THEME", payload: resTheme });
      }
      if (resFont) {
        dispatch({ type: "SET_FONT", payload: resFont });
      }
      const s = await AsyncStorage.getItem("islamghanyModdakir");
      dispatch({ type: "SET_AYAY_STOP", payload: JSON.parse(s) });
    } catch (err) {
      console.log(err);
    }
    setIsReady(true);
  };
  React.useEffect(() => {
    getData();
  }, []);
  if (!isReady) {
    return <AppLoading />;
  }
  return (
    <View style={{ flex: 1 }}>
      <Navs />
    </View>
  );
};
export default function App() {
  const [isReady, setIsReady] = useState(false);

  const fetchAssests = async () => {
    const images = [require("./src/assets/images/checkerboard-cross.png")];
    const fonts = [
      { hfs: require("./src/assets/fonts/hfs.otf") },
      { cairo: require("./src/assets/fonts/Cairo-Regular.ttf") },
      { amiri: require("./src/assets/fonts/Amiri-Regular.ttf") },
      { qlm: require("./src/assets/fonts/AlQalamQuran.ttf") },
      { kufy: require("./src/assets/fonts/ReemKufi-Regular.ttf") },
      { ar: require("./src/assets/fonts/ar-Quran1.ttf") },
      { tijwal: require("./src/assets/fonts/Tajawal-Regular.ttf") },
      { Roboto_black: require("./src/assets/fonts/Roboto-Black.ttf") },
      {
        Roboto_blackItalic: require("./src/assets/fonts/Roboto-BlackItalic.ttf"),
      },
      { Roboto_bold: require("./src/assets/fonts/Roboto-Bold.ttf") },
      {
        Roboto_boldItalic: require("./src/assets/fonts/Roboto-BoldItalic.ttf"),
      },
      { Roboto_italic: require("./src/assets/fonts/Roboto-Italic.ttf") },
      { Roboto_light: require("./src/assets/fonts/Roboto-Light.ttf") },
      {
        Roboto_lightItalic: require("./src/assets/fonts/Roboto-LightItalic.ttf"),
      },
      { Roboto_medium: require("./src/assets/fonts/Roboto-Medium.ttf") },
      {
        Roboto_mediumItalic: require("./src/assets/fonts/Roboto-MediumItalic.ttf"),
      },
      { Roboto_regular: require("./src/assets/fonts/Roboto-Regular.ttf") },
      { Roboto_thin: require("./src/assets/fonts/Roboto-Thin.ttf") },
      {
        Roboto_thinItalic: require("./src/assets/fonts/Roboto-ThinItalic.ttf"),
      },
    ];
    const chachedImages = images.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );
    const chachedFonts = fonts.map((font) => Font.loadAsync(font));

    return Promise.all([...chachedImages, ...chachedFonts]);
  };
  if (!isReady) {
    return (
      <AppLoading
        startAsync={fetchAssests}
        onFinish={() => {
          setIsReady(true);
        }}
        onError={console.warn}
      />
    );
  }

  return (
    <Provider store={store}>
      <Root>
        <Main />
      </Root>
    </Provider>
  );
  // return <View style={{
  //   backgroundColor:'red',
  //   justifyContent:'center',
  //   alignItems:'center'
  // }}>
  // <Text>
  //   Please Work!!!
  // </Text>
  // </View>
}
