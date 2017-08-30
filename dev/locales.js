const fs    = require('fs');
const path  = require('path');
const Date            = require('sugar-date').Date;

console.log(Date.getAllLocaleCodes());

const dirname = path.join(__dirname, '../node_modules/moment/locale/');
var data = [];
var filenames = fs.readdirSync(dirname);
filenames.forEach(function(filename) {
  var content = fs.readFileSync(dirname + filename, 'utf-8');
  var regex = new RegExp(/^\/\/\!\s+locale\s+:\s+([^\[]+)\[([\w-]+)\]/m);
  var match = regex.exec(content);
  data.push({label: `${ match[1] } (${ match[2] })`, value: match[2]});
});

require('fs').writeFileSync('locals.json', JSON.stringify(data));
