/**
 *
 *
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  routes: require('./routes'),
  user: require('./user'),
  notifications: require('./notifications'),
});
