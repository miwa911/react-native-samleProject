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

  render() {
    if (enableParse) {
      return (
        <View style={styles.container}>
        <Router getSceneStyle={getSceneStyle}>
          <Scene key="root">
          <Scene key="login" component={LoginScreen} title="Login"/>
          <Scene key="map" component={MapViewScreen} title="MapView" />

          <Scene key="tabbar" >
            <Scene
              key="main"
              tabs
              tabBarStyle={styles.tabBarStyle}
              tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
            >
              <Scene
                key="tab1"
                title="Home"
                iconName={"home"}
                icon={TabIcon}
                navigationBarStyle={{ backgroundColor: 'red' }}
                titleStyle={{ color: 'white' }}
              >
                <Scene
                  key="tab1_1"
                  component={TabView}
                  title="Tab #1_1"
                  onRight={() => alert('Right button')}
                  rightTitle="Right"
                />
                <Scene
                  key="tab1_2"
                  component={TabView}
                  title="Tab #1_2"
                  titleStyle={{ color: 'black' }}
                />
              </Scene>


              <Scene key="tab3" component={TabView} title="Tab #3" iconName={"gear"} hideTabBar icon={TabIcon} />
              <Scene key="tab4" component={TabView} title="Tab #4" iconName={"sign-out"} hideNavBar icon={TabIcon} />
              <Scene key="tab5" component={TabView} title="Tab #5" iconName={"sign-out"} hideTabBar icon={TabIcon} />
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
  console.log('after render setup store:' + JSON.stringify(store));
  return {
    isLoggedIn: store.user.isLoggedIn || store.user.hasSkippedLogin,
  };
}
module.exports = connect(select)(App);
