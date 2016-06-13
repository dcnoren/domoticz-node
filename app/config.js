var config = {};

config.wit = {};
config.mqtt = {};

config.wit.key = process.env.WIT_KEY || 'username';
config.mqtt.host = process.env.MQTT_HOST || 'm10.cloudmqtt.com';
config.mqtt.port = process.env.MQTT_PORT || '12556';
config.mqtt.username = process.env.MQTT_USERNAME || 'soaring';
config.mqtt.password=  process.env.MQTT_PASSWORD || 'password';

module.exports = config;
