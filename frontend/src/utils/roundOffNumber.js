 export default function roundOffNumber(num) {
  const lookup = [
    { value: 1, symbol: "", digits: 0 },
    { value: 1e3, symbol: "k", digits: 0 },
    { value: 1e6, symbol: "M", digits: 1 },
    { value: 1e9, symbol: "G", digits: 1 },
    { value: 1e12, symbol: "T", digits: 1 },
    { value: 1e15, symbol: "P", digits: 1 },
    { value: 1e18, symbol: "E", digits: 1 }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup.slice().reverse().find(function(item) {
    return num >= item.value;
  });
  return item ? (num / item.value).toFixed(item.digits).replace(rx, "$1") + item.symbol : "0";
}

/*
 * Tests
 */
// const tests = [
//   { num: 0, digits: 1 },
//   { num: -1000, digits: 1 },
//   { num: -989, digits: 1 },
//   { num: 100000000, digits: 1 },
//   { num: -299792458, digits: 1 },
//   { num: 759878, digits: 1 },
//   { num: 759878, digits: 0 },
//   { num: 123, digits: 1 },
//   { num: 123.456, digits: 1 },
//   { num: 123.456, digits: 2 },
//   { num: 123.456, digits: 4 }
// ];
// tests.forEach(function(test) {
//   console.log("nFormatter(" + test.num + ", " + test.digits + ") = " + roundOffNumber(test.num, test.digits));
// });