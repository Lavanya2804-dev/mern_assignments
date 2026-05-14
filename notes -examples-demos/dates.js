//IST=UTC+5:30
//new date()
//new date(yyyy,mm , dd)
//new date(isoDate)
//new date(timestamp)

//create date
let date=new Date()
console.log("date is",date)
console.log(Date.now())
console.log(date.toString())

//create date

let date1=new Date() // with no arguemnts
let date2=new Date('2022-12-2')
let date3=new Date(2022,0,12)
let date4=new Date(Date.now())
let date5=new Date(2022,0) //default date is 1st of the month
let date6=new Date(2022,0,0) //last day of previous month
console.log(date4.toString())

let date7=new Date(2022,0,1)
let date8=new Date(2024,0,1)

/*
getFullYear() 
getMonth()
getDate()
getDay()
getHours()
getMinutes()
getSeconds()
getMilliSeconds()
getTime()

setFullYear()
setMonth or setmonth
setDate(dayofmonth)
no setter for getDay()
setHours(hours)
setMinutes(minutes)
setSeconds(Seconds)
setMilliseconds(milliseconds)
*/

//find difference
if(date1>date2){
    [date1,date2]=[date2,date1]
}

//find years
let years=date2.getFullYear()-date1.getFullYear()
//find months
let months=date2.getMonth()-date1.getMonth()
//find days
let days=date2.getDate()-date1.getDate()

if(months<0){
    years--;
    months=months+12
}
if(days<0){
    months--;
    //get no of days of previous
}
console.log("years:",years)
console.log("months:",months)
console.log("days:",days)
