var base            = new Firebase('https://slackfire.firebaseio.com');
var openings        = base.child('openings');
var notifications   = base.child('notifications');

var zip_70817 = [30.472, -90.962];
var zip_70726 = [30.356, -90.989];
var hammond = [30.5043, -90.46119]

notifications.push({uuid: 'a69d528d-b67f-4646-915c-d336355493dc', center: zip_70817, cat: 1});
notifications.push({uuid: 'a69d528d-b67f-4646-915c-d336355493dc', center: zip_70817, cat: 2});
notifications.push({uuid: 'a69d528d-b67f-4646-915c-d336355493dc', center: zip_70726, cat: 1});
notifications.push({uuid: 'a69d528d-b67f-4646-915c-d336355493dc', center: hammond, cat: 2});
notifications.push({uuid: 'bob', center: zip_70726, cat: 1});

openings.push({desc: 'electrical position', center: zip_70817, cat: 1});
openings.push({desc: 'labor position', center: zip_70817, cat: 2});
openings.push({desc: 'electrical position', center: zip_70726, cat: 1});