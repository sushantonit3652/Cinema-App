import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  //common classes

  startContainer: {
    flex: 1,
    alignItems: "center",
  },
  startScroll: {
    flex: 1,
    width: "100%",
    padding:20,
  },
  nextButton: {
    backgroundColor: "#DA004E",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    marginVertical:10,
  },
  nextButtonText: {
    fontSize: 18,
    color:"white",
    fontWeight: "500",
  },
  input: {
    borderColor: "#00000038",
    borderWidth: 1,
    marginVertical: 15,
    height: 56,
    width: "100%",
    paddingHorizontal: 10,
    textAlignVertical: "center",
  },
  //start Screen
  start__src: {
    flex:1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  start__logoView: {
    width: "100%",
    height: 220,
    overflow: "visible",
  },

  start__logoBg: {
    width: "46%",
    borderRadius: 20,
    marginHorizontal: "27%",
    flex: 1,
    alignItems: "center",
  },
  start__logo: {
    position: "relative",
    width: "200%",
    height: 257,
  },
  start__logotextcontainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 40,
  },
  start__logotext: {
    color: "#6F6F6F",
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 20,
  },

  // Welcome Screen
  welcome__cont: {
    flex: 1,
    width: "100%",
    alignContent: "center",
  },

  welcome__header: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
  },
  welcome__countryPicker: {
    backgroundColor: "#DA004E",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 50,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  welcome__countryPickerText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  welcome__countryPickerDropdown: {
    backgroundColor: "#DA004E60",
    width: "100%", // Set the width to match the parent container
    zIndex: 999,
    alignItems: "center",
    top: 4,
    height: 250,
  },

  welcome__dropdownList: {
    flex: 1,
    width: "100%", // Set the width to match the parent container
  },
  welcome__countryItem: {
    width: "100%",
  },
  welcome__countryItemText: {
    width: "100%",
    padding: 10,
    fontSize: 14,
  },

  //login screen
  login__scroll: {
    flex:1,
    width: "100%",
   alignContent:"center"
  },
  login__cinemacnt: {
    alignItems: "center",
    height: 250,
    justifyContent: "center",
  },
  login__text: {
    fontSize: 20,
    fontWeight: "300",
    color: "#6F6F6F",
  },
  login__cinema: {
    fontSize: 40,
    fontWeight: "700",
    color: "#DA004E",
  },
  login__textinputcnt: {
    width: "100%",
    alignItems: "center",
  },
  login__inputcnt: {
    alignItems: "center",
    width: "100%",
  },
  
  login__buttoncnt: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 0,
  },
  login__forgetText: {
    color: "#DA004E",
    fontSize: 17,
    fontWeight: "500",
  },
  login__skipit: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  login__skipText: {
    color: "#6F6F6F",
    fontSize: 16,
    marginRight: 4,
  },
  login__skipLink: {
    color: "#DA004E",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default styles;
