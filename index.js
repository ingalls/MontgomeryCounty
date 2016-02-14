var GeoJSONStream = require('geojson-stream');
var fs = require('fs');

var s = GeoJSONStream.parse();
fs.createReadStream(__dirname + '/addresses.geojson').pipe(s);

s.on('data', function(data) {
    if (data.properties['ADDR_NUMBE'] && parseInt(data.properties['ADDR_NUMBE']) !== 0) {
        console.log(JSON.stringify({
            street: data.properties['ST_NAME'],
            number: data.properties['ADDR_NUMBE']
        }));
    }
});
