//module is the javascript object.

module.exports.getDate=getDate;//we want to export multipal function


//module.exports= getDate -> if we want to export single function
//by doing this we can export the get date function from date.js or jahan bhi
//date ki jarut pagede whan hum esko use kr skte hai apni kise or file mai.
//example in line 20 of app.js

function getDate (){

let today = new Date()

 let option ={ // according to javascript format of date.
   weekday:"long",
   day: "numeric",
   month: "long"
 }

 let day= today.toLocaleDateString("en-US",option)

 return day;
}

module.exports.getDay=getDay;

function getDay (){

let today = new Date()

 let option ={ // according to javascript format of date.
   weekday:"long" //we write here what we want.
 }

 let day= today.toLocaleDateString("en-US",option)

 return day;
}
