# google-home
Turn on/off TV by GoogleHome (Using HDMI-CEC &amp; RaspberryPi &amp; Firebase)

## Description

Turn on/off TV or change to HDMI 1,2 Ch using Google Home.
I use HDMI-CEC(cec-client) on Raspberry Pi, it is implemented Node.js.
Also I use Firebase Realtime Database for connection of Google Home and RaspberryPi.
Useful control of TV.

## Requirement

- Raspberry Pi (Raspian)
- Node.js v9
- npm packages
  - cec-client
  - forever

## Usage

1. Setup Firebase Realtime Database.
2. Make `firebase.config.js` and write Firebase Snippets.
3. (Optional) Make `auth.config.js` and write Firebase Authentication's Information. (Email & Password)
4. Make IFTTT Applet. `this` is Google Assistant, `that` is Webhook which url is Firebase's URL. 
5. Exec `forever start index.js` on Raspberry Pi.

## Installation

Login Raspberry Pi.
$ sudo apt-get install -y node.js npm
$ npm i -g n forever
$ n stable
$ sudo apt-get purge -y node.js npm
$ ln -sf /usr/local/bin/node.js /usr/bin/ (Also npm)

## Author

[@matsnow](https://twitter.com/matsnow0)

## License

[MIT](http://matsnow0.mit-license.org)
