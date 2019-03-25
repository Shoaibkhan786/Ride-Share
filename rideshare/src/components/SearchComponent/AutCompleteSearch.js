import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import PropTypes from "prop-types";

class AutoCompleteSearch extends React.Component {
  constructor() {
    super();
    this.state = {
      showPlacesList: false
    };
  }
  render() {
    return (
      <GooglePlacesAutocomplete
        placeholder="Enter Location"
        minLength={2} // minimum length of text to search
        autoFocus={true}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        // listViewDisplayed='false'    // true/false/undefined
        fetchDetails={true}
        //renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => this.props.onPress(data, details)}
        // getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyBXVgs2NzqUkMtu_JTF3FdfNigFvJ8aREM",
          language: "en", // language of the results
          types: "(cities)", // default: 'geocode'
          components: 'country:pk'
          
        }}
        styles={{
          textInputContainer: {
            backgroundColor: "#efefef",
            // backgroundColor:'red',
            height: 48,

            borderTopWidth: 0,
            width: "100%"
          },
          textInput: {
            // marginLeft: 4,
            // marginRight: 4,
            backgroundColor: "#fefefe",
            borderRadius: 16,
            height: 38,
            fontSize: 16
          },
          description: {
            fontWeight: "bold"
          }
        }}
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",
          types: "food"
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3"
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  }
}

AutoCompleteSearch.propTypes = {
  onPress : PropTypes.func
}

export default AutoCompleteSearch;
