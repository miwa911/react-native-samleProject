/**
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import{
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
}from 'react-native';
import Button from 'apsl-react-native-button'

const { logInWithFacebook } = require('../actions');
const {connect} = require('react-redux');

class LoginButton extends React.Component {
  props: {
    style: any;
    source?: string; // For Analytics
    dispatch: (action: any) => Promise;
    onLoggedIn: ?() => void;
  };
  state: {
    isLoading: boolean;
  };
  _isMounted: boolean;

  constructor() {
    super();
    this.state = { isLoading: false };
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Button style={[styles.button, this.props.style]}>
          Please wait...
        </Button>
      );
    }
    {/*<Button
    style={[styles.button, this.props.style]}
    icon={require('../login/img/f-logo.png')}
    caption="Log in with Facebook"

    />*/}
    return (
      <Button style={[styles.button, this.props.style]} onPress={() => this.logIn()}>

         Log in with Facebook 
      </Button>

    );
  }

  async logIn() {
    const {dispatch, onLoggedIn} = this.props;

    this.setState({isLoading: true});
    try {
      await Promise.race([
        dispatch(logInWithFacebook(this.props.source)),
        timeout(15000),
      ]);
    } catch (e) {
      const message = e.message || e;
      if (message !== 'Timed out' && message !== 'Canceled by user') {
        alert(message);
        console.warn(e);
      }
      return;
    } finally {
      this._isMounted && this.setState({isLoading: false});
    }

    onLoggedIn && onLoggedIn();
  }
}

async function timeout(ms: number): Promise {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error('Timed out')), ms);
  });
}

var styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: 270,
  },
});

module.exports = connect()(LoginButton);
