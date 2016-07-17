
import React , {Component} from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native'
var { switchTab, logOutWithPrompt } = require('../actions');
import Button from 'apsl-react-native-button'
import {Actions} from "react-native-router-flux";
var { connect } = require('react-redux');
import LoginButton from '../common/LoginButton'
var t = require('tcomb-form-native');
var Form = t.form.Form;
import Geocoder from 'react-native-geocoder';
import AccordionPicker from './AccordionPicker';

// here we are: define your domain model
var City = t.enums({
  M: 'Male',
  F: 'Female'
});

var Person = t.struct({
  city : City,
  username: t.String,              // a required string
  address: t.String,

});
var options = {
  fields: {
    // password: {
    //   password: true,
    //   secureTextEntry: true
    // },
    username: {
      label: "Ho va ten"
    },
    city: {
      factory: AccordionPicker,
    }

  }}; // optional rendering options (see documentation)
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.loggedIn = this.loggedIn.bind(this);
    this.state = {
    form_fields: Person,
     form_values: {},
     options: options
   }
  }
  componentWillMount() {

  }
  componentDidMount() {
    //console.log('LoginScreen title:' + this.props.routes.scene.title );
  }
  async testgeo() {
    try {
        var value = this.refs.form.getValue();
        const tmp = await Geocoder.geocodeAddress(value.address);
        console.log('address return: '+ JSON.stringify(tmp))
        //Alert.alert(JSON.stringify(tmp))

    }
    catch(err) {
        console.log(err);
    }
  }
  onPress() {
    var value = this.refs.form.getValue();
    if (value) {
      console.log(value);
    }
  }
  render() {
    // Geocoder.geocodeAddress('19 cong hoa, ho chi minh , vietnam').then(res => {
    //     console.log('geo code:'+ JSON.stringify(res));
    // })
    // .catch(err => console.log(err))
    //this.testgeo();


    if (this.props.isLoggedIn) {
      return (
        <View style={styles.logout}>
        <Form
          ref="form"
          type={this.state.form_fields}
          value ={this.state.form_values}
          options={this.state.options}
        />
      <Button style={styles.button} onPress={() => this.logout()}>
        Log out
      </Button>
      <Button style={styles.button} onPress={() => this.onPress()}>
        Print value
      </Button>
      <Button style={styles.button} onPress={() => this.testgeo()}>
        Find address with google
      </Button>
      <Button style = {styles.button} onPress={Actions.map} >
       To MapView
       </Button>
      </View>
    ) ;
    } else {
    return (
      <View style={[styles.container, this.props.style]}>
          {/* display */}
        <Form
          ref="form"
          type={Person}
          options={options}
        />
        <TouchableOpacity style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} underlayColor='blue' >
          <Text style={styles.buttonText}> Login with Facebook  </Text>
          </TouchableOpacity>
          <LoginButton onLoggedIn={() => this.loggedIn()} />
          {/*<Button onPress={Actions.loginModal2}>Login 2</Button>
          <Button onPress={() => Actions.refresh({title:"Changed title"})}>Change title</Button>
          <Button onPress={Actions.pop}>Back</Button>*/}
      </View>
    );
    }
  }
  logout() {
    this.props.dispatch(logOutWithPrompt());
  }
  loggedIn() {
    console.log('facebook logged in');
  }
}
var styles = StyleSheet.create({
  logout : {
    marginTop : 50,
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
  console.log('store2:'+ JSON.stringify(store));
  return {
    routes: store.routes,
    isLoggedIn : store.user.isLoggedIn
  };
}
module.exports = connect(select)(LoginScreen);
