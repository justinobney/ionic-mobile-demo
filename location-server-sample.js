import Firebase from 'Firebase';
import GeoFire from 'GeoFire';
import request from 'request-json';
import btoa from 'btoa';

const base = new Firebase('https://slackfire.firebaseio.com');
const notifications = base.child('notifications');
const notifications_geo = new GeoFire(base.child('locations'));
const openings = base.child('openings');

notifications.on('child_added', (snapshot) => {
  let notificationId = snapshot.key();
  let {center} = snapshot.val();
  console.log(notificationId);
  notifications_geo.set(notificationId, center);
});

let initalSet = false;
openings.once('value', (opening) => {
  initalSet = true;
});
openings.on('child_added', (opening) => {
  if(!initalSet)
    return;

  let {center, desc, cat} = opening.val();
  const params = { center: center, radius: 10.5 };
  const query = notifications_geo.query(params);
  
  query.on("key_entered", (key, location, distance) => {
    console.log(key, location, distance);
    notifications.child(key).on('value', (found) => {
      let notification = found.val();
      console.log(notification);
      if(notification && notification.cat == cat){
        base.child(`people/${notification.uuid}`).once('value',(user)=>{
          let {token} = user.val() || {};
          let distance = GeoFire.distance(notification.center, center) * 0.62137;
          let msg = `${desc}: ${distance.toFixed(1)}mi`;
          console.log(msg);
          token && sendPush(token, msg);
        });
      }
    });
  });

  query.on("ready", function() {
    query.cancel();
  });
});

function sendPush(token, msg){
  let client = request.createClient('https://push.ionic.io');
   
  let data = {
    tokens: [token],
    notification: {
      "alert":msg
    }
  };

  let auth = btoa('70b7c70dcb140e2bf08fd0fc2117b5c44e250b24169e57ab:');

  client.headers['X-Ionic-Application-Id'] = '63cff715';
  client.headers['Authorization'] = `basic ${auth}`;

  client.post('api/v1/push', data, function(err, res, body) {
    return console.log(res.statusCode);
  });
}