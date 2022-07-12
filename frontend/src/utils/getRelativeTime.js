// in miliseconds
var units = {
  year  : 24 * 60 * 60 * 1000 * 365,
  month : 24 * 60 * 60 * 1000 * 365/12,
  day   : 24 * 60 * 60 * 1000,
  hour  : 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}

var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

var getOutput = (d1, d2) => {
  var elapsed = d1 - d2

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (var u in units) 
    if (Math.abs(elapsed) > units[u] || u == 'second') 
      return rtf.format(Math.round(elapsed/units[u]), u)
}

// test-list of dates to compare with current date


export default function getRelativeTime(a, b) {
 
    
      var d1 = new Date(a)
      var d2 = new Date(b)
      // console.log(d1, " sfsdfsd ", d2)
      // console.log(getOutput(d1,d2))

      return getOutput(d1,d2)

}

// getRelativeTime('2022-05-10T13:49:46.602+00:00','2022-05-11T13:49:46.602+00:00');