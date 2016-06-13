var config = {};

config.wit = {};
config.mqtt = {};

config.wit.key = process.env.WIT_KEY || 'username';
config.mqtt.host = 'm10.cloudmqtt.com';
config.mqtt.port = '12556';
config.mqtt.username = 'soaring';
config.mqtt.password = 'password';

module.exports = config;
