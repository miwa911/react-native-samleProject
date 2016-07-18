'use strict';

import React, { Component } from 'react';
import {
  Alert,
  TouchableOpacity,
  Image,
  View,
  AppRegistry,
  ProgressBarAndroid,
  StyleSheet,
  Text,
  AsyncStorage,
  AppState
} from 'react-native';
import {
  Scene,
  Reducer,
  Router,
  Switch,
  Modal,
  Actions,
  ActionConst,
} from 'react-native-router-flux';

import PushNotificationController from './PushNotificationController'
var { connect } = require('react-redux');
var {serverURL, enableParse} = require('./env');
import LoginScreen from './components/LoginScreen'
import MapViewScreen from './components/MapViewScreen'
import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import ListHomes from './components/ListHomes'
import Icon from 'react-native-vector-icons/Ionicons';
// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
  const style = {
    flex: 1,
    backgroundColor: '#fff',
    shadowColor: null,
    shadowOffset: null,
    shadowOpacity: null,
    shadowRadius: null,
  };
  if (computedProps.isActive) {
    style.marginTop = computedProps.hideNavBar ? 0 : 64;
    style.marginBottom = computedProps.hideTabBar ? 0 : 50;
  }
  return style;
};

const Right = (func) => (
  <TouchableOpacity onPress={onbuttonRight} style={{
    width: 40,
    height: 31,
    position: 'absolute',
    bottom: 4,
    right: 2,

  }} >
  <Icon name="ios-add-circle-outline" size={30} />
  </TouchableOpacity>
);

class App extends Component {
  constructor(props) {
    super(props);
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this._handleMemoryWarning = this._handleMemoryWarning.bind(this);
    this.state = {
      appState: AppState.currentState,
      previousAppStates: [],
      memoryWarnings: 0,
    };

  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    AppState.addEventListener('memoryWarning', this._handleMemoryWarning);
    // TODO: Make this list smaller, we basically download the whole internet
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    AppState.removeEventListener('memoryWarning', this._handleMemoryWarning);
  }

  _handleMemoryWarning() {
    this.setState({memoryWarnings: this.state.memoryWarnings + 1});
  }
  _handleAppStateChange(appState) {
    var previousAppStates = this.state.previousAppStates.slice();
    previousAppStates.push(this.state.appState);
    this.setState({
      appState,
      previousAppStates,
    });
  }

  onbuttonRight() {
    alert('right');
  }

  render() {
    if (enableParse) {
      return (
        <View style={styles.container}>
        <Router getSceneStyle={getSceneStyle}>
          <Scene key="root">

          <Scene key="tabbar" >
            <Scene
              key="main"
              tabs
              tabBarStyle={styles.tabBarStyle}
              tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
            >

              <Scene key="login" component={LoginScreen} title="Login" iconName={"home"}  icon={TabIcon} />
              <Scene key="map" component={MapViewScreen} title="Map" iconName={"map"} hideNavBar  icon={TabIcon} />
              {/* <Scene key="list" component={ListHomes} title="List" iconName={"list"}  icon={TabIcon} renderRightButton={( ) => <Right />} onRight={() => alert('Right button')}/> */}
              <Scene key="list" component={ListHomes} title="List" iconName={"list"}  icon={TabIcon} rightTitle="Add" onRight={() => alert('Right button')}/>
              <Scene key="tab4" component={TabView} title="Tài khoản" iconName={"user"} hideNavBar icon={TabIcon} />
            </Scene>
            </Scene>


          </Scene>
        </Router>

        {/*<PushNotificationController />*/}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text> Hello world ! </Text>
        </View>
      );
    }

  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
function select(store) {

  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}
module.exports = connect(select)(App);
