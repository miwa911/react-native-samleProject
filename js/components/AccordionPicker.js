import React , {Component} from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import t from 'tcomb-form-native'
import Accordion from 'react-native-collapsible/Accordion'

const Select = t.form.Select

class AccordionPicker extends Select {
  onChangeParent ;
  constructor(props) {
    super(props);
    this.onChangeParent = super.onChange;
    this.onChange = this.onChange.bind(this)
  }
  _renderHeader (locals) {
    const valueText = locals.options.find(element => {
      return element.value === locals.value
    })
    let controlLabelStyle = locals.stylesheet.controlLabel.normal
    if (locals.hasError) {
      controlLabelStyle = locals.stylesheet.controlLabel.error
    }
    return (
      <View style={[styles.header, styles.textContainer]}>
        <Text style={[styles.label, controlLabelStyle]}>
          {locals.label}
        </Text>
        <Text style={[locals.stylesheet.controlLabel.normal, styles.value]}>
          {valueText.text}
        </Text>
      </View>
    )
  }

  _renderContent (locals) {

    return (
      <View>
        {t.form.Form.templates.select({...locals, label: null})}
      </View>
    )
  }
  // onChange(active) {
  //
  //   this.onChangeParent(active);
  // }
  getTemplate () {
    var self = this
    return function (locals) {
      return (
        <Accordion
          style={styles.container}
          sections={['Select']}
          renderHeader={self._renderHeader.bind(self, locals)}
          renderContent={self._renderContent.bind(self, locals)}

        />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {

  },
  textContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  content:{
  },
  label:{
    flex: 1,
    fontSize: 16,
  },
  value: {
    flex: 1,
    textAlign: 'right',
    // backgroundColor:'red',
    fontSize: 16,
  },
  header: {
    flex: 1,
    //height: 44,
    backgroundColor: '#f9f9f9',
    padding: 10
  },
})


module.exports =  AccordionPicker;
