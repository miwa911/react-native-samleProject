
import path from 'path';
import express from 'express';
//import graphQLHTTP from 'express-graphql';
//import {Schema} from './schema/schema';
import Parse from 'parse/node';
import {ParseServer} from 'parse-server';
import ParseDashboard from 'parse-dashboard';

const SERVER_PORT = process.env.PORT || 8080;
const SERVER_HOST = process.env.HOST || 'localhost';
const APP_ID = process.env.APP_ID || 'sampleProject-app';
const MASTER_KEY = process.env.MASTER_KEY || '70c6093dba5a7e55968a1c7ad3dd3e5a6375gg';
const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://localhost:27017/sampleProject';
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';
const DASHBOARD_AUTH = process.env.DASHBOARD_AUTH;

Parse.initialize(APP_ID);
Parse.serverURL = `http://localhost:${SERVER_PORT}/parse`;
Parse.masterKey = MASTER_KEY;
//Parse.Cloud.useMasterKey();

function getSchema() {
  if (!IS_DEVELOPMENT) {
    return Schema;
  }

  delete require.cache[require.resolve('./schema/schema.js')];
  return require('./schema/schema.js').Schema;
}

const server = express();

server.use(
  '/parse',
  new ParseServer({
    databaseURI: DATABASE_URI,
    //cloud: path.resolve(__dirname, 'cloud.js'),
    appId: APP_ID,
    masterKey: MASTER_KEY,
    //fileKey: 'f33fc1a9-9ba9-4589-95ca-9976c0d52cd5',
    serverURL: `http://${SERVER_HOST}:${SERVER_PORT}/parse`,
    push: {
      ios: {
      pfx: path.resolve(__dirname, 'cert/production_com.test.reactnative.p12'),  // The filename of private key and certificate in PFX or PKCS12 format from disk
      passphrase: '', // optional password to your p12
      bundleId: 'com.test.reactnative', // The bundle identifier associate with your app
      production: true // Specifies which environment to connect to: Production (if true) or Sandbox
      }
    }
  })
);

if (IS_DEVELOPMENT) {
  let users;
  if (DASHBOARD_AUTH) {
    var [user, pass] = DASHBOARD_AUTH.split(':');
    users = [{user, pass}];
    console.log(users);
  }
  server.use(
    '/dashboard',
    ParseDashboard({
      apps: [{
        serverURL: '/parse',
        appId: APP_ID,
        masterKey: MASTER_KEY,
        appName: 'sampleProject-app',
      }],
      users,
    }, IS_DEVELOPMENT)
  );
}

server.listen(SERVER_PORT, () => console.log(
  `Server is now running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${SERVER_PORT}`
));
