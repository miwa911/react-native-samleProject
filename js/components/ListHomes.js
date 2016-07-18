/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */
'use strict';
import React, {Component} from 'react';
import{
  Alert,
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  RecyclerViewBackedScrollView
}from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
// var THUMB_URLS = [
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
//   require('./../../common/image/book1.jpg'),
// ];

export default class ListHomes extends Component{

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
        return true;
        }});
    this.state = {
       isDataReady: false,
       dataSource: {} ,
    };
    this._renderRow = this._renderRow.bind(this);
    this.load_data = this.load_data.bind(this);
    this._pressRow = this._pressRow.bind(this);
    this.state.dataSource = ds.cloneWithRows(this._genRows({}));

  }
  _pressData = ({}: {[key: number]: boolean})

  componentWillMount() {
    this._pressData = {};
  }
  componentDidMount() {

  }

  load_data(error, response) {

  }


  render() {
    return (
      <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this._renderSeperator}
        />
    );
  }

  _renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
      return (
        <View
          key={`${sectionID}-${rowID}`}
          style={{
            height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
          }}
        />
      );
    }


  _renderRow(rowData , sectionID: number, rowID: number) {
    //var imgSource = THUMB_URLS[1 % THUMB_URLS.length];
    var imgSource = {uri:'http://www.jqueryscript.net/images/Minimal-jQuery-Loading-Overlay-Spinner-Plugin-Easy-Overlay.jpg'};

    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)} underlayColor="transparent">

        <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <View style={{flex:2}}>
              <Text style={{textAlign:'left',padding:5}}>
                Ten  : {rowData.name}
              </Text>
              <View style={{flex:1,}}>
              <Text style= {{color:'red',flexWrap:'wrap',padding:2,  }} numberOfLines={5} >
                testdata:  {rowData.address}
              </Text>
              <Text style= {{color:'red',flexWrap:'wrap',padding:2,  }} numberOfLines={5} >
                testdata:  {rowData.address}
              </Text>
              </View>
            </View>

          </View>

      </TouchableHighlight>
    );
  }

  _genRows(pressData: {[key: number]: boolean}): Array<any> {
      var dataBlob = [];
      for (var ii = 0; ii < 10; ii++) {
        var temp = {
          name: 'miwa',
          address: '19 cong hoa, ho chi minh, vietnam dat nuoc'
        }
        dataBlob.push(temp);
      }
      return dataBlob;

  }

  _pressRow(rowID: number) {

  }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
var styles = StyleSheet.create({
  list: {
    justifyContent: 'space-around',
    //flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',

  },
  thumb: {
    flex:1,
  },
  text: {
    flex: 1,
  },
});

module.exports = ListHomes;
