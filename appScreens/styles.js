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
    padding: 20,
  },
  nextButton: {
    backgroundColor: "#DA004E",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: 56,
    marginVertical: 10,
  },
  nextButtonText: {
    fontSize: 18,
    color: "white",
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
    flex: 1,
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
    flex: 1,
    width: "100%",
    alignContent: "center",
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
  //home Screen
  home__searchbackground: {
    flexDirection: "row",
    height: 54,
    width: "90%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DA004E",
  },
  home__serchtextinput: {
    paddingHorizontal: 20,
    height: "100%",
    width: "100%",
    fontSize: 20,
  },
  searchicon: { height: 20, width: 20, marginHorizontal: 10 },
  home__header: { color: "#DA004E", fontSize: 15, fontWeight: "500" },
  home__scrollview: {
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 5,
    color: "#DA004E",
  },

  // movie api styling
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  home__searchbackground: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  searchicon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  home__serchtextinput: {
    flex: 1,
  },
  movieCard_cnt: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  movieCard: {
    margin: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  moviePoster: {
    width: 100,
    height: 170,
  },
  home__moviename: {
    fontWeight: "600",
    marginHorizontal: 5,
    marginVertical: 3,
  },

  // container: {
  //   flex: 1,
  //   padding: 10,
  //   backgroundColor: "#fff",
  //   height: 200,
  // },
  // movieItem: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginBottom: 10,
  //   borderWidth: 1,
  //   borderColor: "#ccc",
  //   padding: 10,
  //   borderRadius: 5,
  // },
  // movieImage: {
  //   width: 80,
  //   height: 80,
  //   marginRight: 10,
  //   borderRadius: 5,
  // },
  // movieName: {
  //   fontSize: 18,
  //   fontWeight: "bold",
  // },
  // movieDuration: {
  //   fontSize: 16,
  //   color: "#888",
  // },
  // movieCard: {
  //   margin: 10,
  //   padding: 10,
  //   backgroundColor: "#f0f0f0",
  //   borderRadius: 8,
  //   alignItems: "center",
  // },
  // moviePoster: {
  //   width: 150,
  //   height: 200,
  //   marginBottom: 10,
  //   borderRadius: 8,
  // },
  // movieTitle: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  // },

  // movieCard: {
  //   margin: 8,
  //   borderRadius: 8,
  //   overflow: "hidden",
  //   backgroundColor: "#f0f0f0",
  //   alignItems: "center",

  // },
  // moviePoster: {
  //   width: 100,
  //   height: 170,
  // },
  // movieTitle: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  //   marginVertical: 5,
  // },
  // buttonContainer: {
  //   marginVertical: 10,
  //   alignItems: "center",
  // },
  // home__moviename:{
  //   fontWeight:'600',
  //   marginHorizontal:5,
  //   marginVertical:3
  // },
  // movieCard_cnt:{
  //   justifyContent:'center',
  //   alignItems:'center'
  // },

  //movieDetail Screen,
  movieContainer: { flex: 1 },
  movieDetail__background: {
    flex: 1,
    width: "100%",
    
    // position: "absolute",
  },
  movidetail__fottrbackround: {
    padding: 30,
  },
  movidetail__sciencebacground: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  sciencetext: { fontSize: 16, color: "#000", fontWeight: "500" },
  movidetail__ditailbackground: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  movidetail__datebackground: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  moviedetails__relasebacground: { paddingHorizontal: 10 },
  movidetail__relasetext: { fontSize: 12, fontWeight: "300", color: "#000" },

  //move card
  poster: {
    width: 105,
    height: 180,
    resizeMode: "cover",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  movieContainer: {
    flex: 1,
  },
  movieDetail__background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  movieDetail__content: {
    padding: 20,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  movieGenre: {
    fontSize: 18,
    color: "#fff",
  },
  movieDuration: {
    fontSize: 16,
    color: "#fff",
  },
  movieReleaseDate: {
    fontSize: 16,
    color: "#fff",
  },
  movieLanguage: {
    fontSize: 16,
    color: "#fff",
  },
  movieDetail__footer: {
    padding: 20,
  },
  nextButton: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});

export default styles;
