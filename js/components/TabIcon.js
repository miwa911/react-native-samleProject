import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};

// const TabIcon = (props) => (
//   <View>
//   <Text
//     style={{ color: props.selected ? 'red' : 'black' }}
//   >
//     {props.title}
//   </Text>
//   <Image source={require('../common/image/blackStar.png')} />
//   </View>
// );
class TabIcon extends React.Component {
  render() {
    console.log('this.props:' + JSON.stringify(this.props))
    var color = this.props.selected ? '#FF3366' : '#FFB3B3';

    return (
      <View style={{flex:1, flexDirection:'column', alignItems:'center', alignSelf:'center'}}>
  <Icon style={{color: color}} name={this.props.iconName} size={30} />
  <Text style={{color: color}}>{this.props.title}</Text>
      </View>
    );
  }
}


module.exports =  TabIcon;
