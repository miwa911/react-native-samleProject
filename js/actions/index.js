/**
 *
 * @flow
 */

'use strict';


const loginActions = require('./login');
const parseActions = require('./parse');
const notificationActions = require('./notifications');
const installationActions = require('./installation');
module.exports = {
  ...loginActions,
  ...notificationActions,
  ...parseActions,
  ...installationActions,
};
