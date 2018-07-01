var moment = require('moment');

//jan 1st 1970 00:00:00 am


// date.add(1, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));
// //console.log(date.getMonth());

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
 

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm A'));
