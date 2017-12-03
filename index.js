const firebase = require('firebase');

// firebase config
const config = require('./firebase.config');

// auth config
const {email, password} = require('./auth.config');

// database config
const path = '/GoogleHome';
const key = 'word';

// start process
firebase.initializeApp(config);
const db = firebase.database();

firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log('login');
    db.ref(path).on('value', onValue);
  })
  .catch((error) => console.log(error));

function onValue (changedSnapshot) {
  const value = changedSnapshot.child(key).val();
  console.log('firebase db value = ', value);

  const words = value.split(/\s+/);
  const category = words.shift();

  let action = '';
  switch (category) {
  case 'tv':
    action = parseAction(words);
    break;
  default:
    break;
  }

  if (action) {
    const command = `echo "${action}" | cec-client -s -d 1`;
    console.log(command);
    require('child_process').exec(command);
  }
  db.ref(path).set({[key]: ''});
}

function parseAction (words) {
  console.log('before normalize = ', words);
  words = words.filter((word) => !word.match(/^て$|^に$|^を$|^は$/));
  console.log('after normalize = ', words);

  const ope = words.shift();
  if (ope.match(/起動|軌道|つけ|オン/)) {
    return 'on 0';
  } else if (ope.match(/消し|けし|止め|とめ|停止/)) {
    return 'standby 0';
  } else if (ope.match(/HDMI|エイチディーエムアイ|ゲーム/i)) {
    return changeHdmiCh(words.shift());
  }
}

function changeHdmiCh (channel) {
  if (channel.match(/イチ|1|いち/i)) {
    return 'tx 4f:82:10:00';
  } else {
    return 'tx 4f:82:20:00';
  }
}
