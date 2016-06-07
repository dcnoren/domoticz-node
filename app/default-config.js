var config = {};

config.wit = {};
config.mqtt = {};

config.wit.key = process.env.TWITTER_USER || 'username';
config.wit.password=  process.env.TWITTER_PASSWORD || 'password';
config.mqtt.host = process.env.MQTT_HOST || 'MQTT HOST';
config.mqtt.port = process.env.MQTT_PORT || 'MQTT PORT';
config.mqtt.username = process.env.MQTT_USERNAME || 'MQTT USERNAME';
config.mqtt.password=  process.env.MQTT_PASSWORD || 'MQTT PASSWORD';

module.exports = config;
