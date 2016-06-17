// /////////////////////////////////
// Configuration file for Domoticz-node
// COPY THIS FILE to config.js and
// make all modifications to config.js
// /////////////////////////////////

// /////////////////////////////////
// Do not modify this block ////////
// /////////////////////////////////
var config = {};
config.wit = {};
config.mqtt = {};
config.security = {};
config.events = {};
// /////////////////////////////////


// /////////////////////////////////
// Begin modifications below here //
// /////////////////////////////////


// Replace "WIT_CLIENT_TOKEN" with
// the client access token for your
// wit.ai voice application. If you
// do not have one, you may fork
// mine at:
// https://wit.ai/dcnoren/domoticz-wit
config.wit.key = 'WIT_CLIENT_TOKEN';
// /////////////////////////////////


// Enter details for your MQTT
// broker here. If you do not have
// one, visit cloudmqtt.com and
// sign up for the free plan.
// You must also add an MQTT device
// to Domoticz and enter these
// details on domoticz as well.
config.mqtt.host = 'MQQT_HOST';
config.mqtt.port = 'PORT';
config.mqtt.username = 'USERNAME';
config.mqtt.password = 'PASSWORD';
// /////////////////////////////////


// By default, this is set to
// "password". You may change this
// and use this password to access
// your Domoticz-Node instance via
// http://[ip]:[port]/?p=password
config.security.password = 'password';
// /////////////////////////////////


// Whether event handling and
// processing is enabled. uses
// events.js
config.security.enabled = false;
// /////////////////////////////////


// /////////////////////////////////
// Do not modify below this line ///
// /////////////////////////////////
module.exports = config;
