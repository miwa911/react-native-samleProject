

import React , {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native'
import MapView from 'react-native-maps';
import Button from 'apsl-react-native-button'
import {Actions} from "react-native-router-flux";
var { connect } = require('react-redux');

class MapViewScreen extends Component {
  constructor(props) {
    super(props);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.state = {
      region: {
        latitude: 10.801540,
        longitude: 106.650527,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  onRegionChange(region) {
    this.setState({ region });
  }
  componentWillMount() {

  }
  componentDidMount() {
    //console.log('LoginScreen title:' + this.props.routes.scene.title );
  }
  render() {

    return (
      <MapView style={styles.map}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      />
    );

  }
  logout() {
    this.props.dispatch(logOutWithPrompt());
  }
  loggedIn() {
    console.log('facebook logged in');
  }
}
var styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

function select(store) {
  return {
    routes: store.routes,
  };
}
module.exports = connect(select)(MapViewScreen);
