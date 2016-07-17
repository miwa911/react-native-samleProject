'use strict';

var App = require('./App');
var FacebookSDK = require('FacebookSDK');
var Parse = require('parse/react-native');
var React = require('React');
//var Relay = require('react-relay');

var { Provider } = require('react-redux');
var configureStore = require('./store/configureStore');

var {serverURL, enableParse} = require('./env');
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

function setup(): React.Component {
  //console.disableYellowBox = true;
  if (enableParse) {
    console.log('---------initialize Parse------');
    Parse.initialize('sampleProject-app');
    console.log(`${serverURL}/parse`);
    Parse.serverURL = `${serverURL}/parse`;
  }

  FacebookSDK.init();
  Parse.FacebookUtils.init();
  //Relay.injectNetworkLayer(
  //  new Relay.DefaultNetworkLayer(`${serverURL}/graphql`, {
  //    fetchTimeout: 30000,
  //    retryDelays: [5000, 10000],
  //  })
  //);

  class Root extends React.Component {
    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({isLoading: false})),
      };
    }
    render() {
      if (this.state.isLoading) {
       return null;
      }
      console.log('before render setup store:' + JSON.stringify(this.state.store));
      return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

global.LOG = (...args) => {
  console.log('/------------------------------\\');
  console.log(...args);
  console.log('\\------------------------------/');
  return args[args.length - 1];
};

module.exports = setup;
