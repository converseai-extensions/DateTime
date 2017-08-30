require('fs').writeFileSync('zones.json', JSON.stringify(require('moment-timezone').tz.names()));
