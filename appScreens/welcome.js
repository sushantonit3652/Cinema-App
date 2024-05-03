import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import CountryPicker from "react-native-country-picker-modal";
import styles from "./styles";

const countriesData = [
  { cca2: "US", name: "United States" },
  { cca2: "CA", name: "Canada" },
  { cca2: "BZ", name: "Brazil" },
  { cca2: "UK", name: "United Kingdom" },
  { cca2: "GR", name: "Germany" },
  { cca2: "IN", name: "India" },
  { cca2: "JP", name: "Japan" },
  { cca2: "AU", name: "Australia" },
];

const Welcome = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const onSelect = (country) => {
    setSelectedCountry(country);
    setShowCountryPicker(false); // Close the country picker after selection
  };

  return (
    <View style={styles.startContainer}>
      <View style={styles.startScroll}>
        <View style={styles.welcome__cont}>
          <View style={styles.welcome__header}>
            <Text style={styles.login__text}>Welcome to</Text>
            <Text style={styles.login__cinema}>Cinema+</Text>
          </View>

          <TouchableOpacity
            style={styles.welcome__countryPicker}
            onPress={() => setShowCountryPicker(true)}
          >
            <Text style={styles.welcome__countryPickerText}>
              {selectedCountry
                ? `${selectedCountry.name} (${selectedCountry.cca2})`
                : "Choose your Country"}
            </Text>
            <Image source={require("../assets/down_arrow.png")} />
          </TouchableOpacity>

          {showCountryPicker && (
            <View style={styles.welcome__countryPickerDropdown}>
              <FlatList
                data={countriesData}
                keyExtractor={(item) => item.cca2}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.welcome__countryItem}
                    onPress={() => onSelect(item)}
                  >
                    <Text style={styles.welcome__countryItemText}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                style={styles.welcome__dropdownList} // Add this style for dropdown height and width
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate("login")}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;
