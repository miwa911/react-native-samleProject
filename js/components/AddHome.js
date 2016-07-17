
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
// here we are: define your domain model
var Person = t.struct({
  homename: t.String,              // a required string
  city: t.String,
  district: t.String,
  ward: t.String,

});
var options = {
  fields: {
    homename: {
      label: "Thanh pho"
    },
    city : {
      item: [ // one options object for each concrete type of the union
    {
      label: 'Ho Chi Minh'
    },
    {
      label: 'Ha Noi'
    }
    ]
    },
    district : {

    },
    ward : {

    }

  }}; // optional rendering options (see documentation)
class AddHome extends Component {
  constructor(props) {
    super(props);
    this.loggedIn = this.loggedIn.bind(this);
  }
  componentWillMount() {

  }
  componentDidMount() {
    //console.log('AddHome title:' + this.props.routes.scene.title );
  }
  async testgeo() {
    try {
        const tmp = await Geocoder.geocodeAddress('19 cong hoa, ho chi minh , vietnam');
        Alert.alert(JSON.stringify(tmp))

    }
    catch(err) {
        console.log(err);
    }
  }
  render() {
    // Geocoder.geocodeAddress('19 cong hoa, ho chi minh , vietnam').then(res => {
    //     console.log('geo code:'+ JSON.stringify(res));
    // })
    // .catch(err => console.log(err))
    this.testgeo();


    if (this.props.isLoggedIn) {
      return (
        <View style={styles.logout}>
      <Button style={styles.button} onPress={() => this.logout()}>
        Log out
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
module.exports = connect(select)(AddHome);
