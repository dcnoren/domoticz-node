# About

This is a Node.JS project for interfacing with Domoticz, a home automation control panel. This is essentially a replacement UI built for mobile and tablet consumption. It's sole purpose is to build an easy and attractive interface to turn lights, fans, and other switch-based hardware on and off. Has limited support for scenes (work in progress) and security sensors, such as motion and door/window sensors, and finally, support for graphing temperatures.

Utilizes Express for static file serving and API handling, and socket.io for websocket and real-time streaming.

# Quick-start

1) Make a copy of the default-config file, and name it config.js.

2) Sign up for wit at http://wit.ai and fork my Wit application: https://wit.ai/dcnoren/domoticz-wit

3) Generate a wit.ai access token for the app, and enter it in config file

4) Sign up for an MQTT broker if you do not have one already, and enter details in config file

5) Setup a new device in Domoticz for sending all MQTT traffic to it. Point it at the same broker you signed up for.

6) Fill in remaining items in config

7) run "npm install" from the app directory

8) Launch using node, or pm2. Make sure you launch from app directory. Ex:

8.1) cd /var/www/domoticz-node/app

8.2) sudo DOMOTICZ_PORT=80 pm2 start app.js --name="domoticz"

9) If launched without DOMOTICZ_PORT env variable, it will start on port 3000.

10) Until I have more time to put more info into config files, you will need to check app/app.js to see the IDX for various devices that will or will not be shown on the GUI.


# To-Do

Lots!

# Help!

Please feel free to fork or contact me or file issues/suggestions!
