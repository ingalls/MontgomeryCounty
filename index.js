var GeoJSONStream = require('geojson-stream');
var fs = require('fs');

var s = GeoJSONStream.parse();

console.log('set -e');

fs.createReadStream(__dirname + '/addresses.geojson').pipe(s);

s.on('data', function(data) {
    if (!data.properties['ADDR_NUMBE']) return; 
    if (parseInt(data.properties['ADDR_NUMBE']) === 0) return;

    var num = data.properties['ADDR_NUMBE'];
    var str = data.properties['ST_NAME'];
    var file = num + '_' + str;
    file = file.replace(/\ /gi, "_");

    try {
        fs.statSync('./results/'+file);
    } catch(err) {
        console.log('casperjs scrape.js "'+num+'" "'+str+'" > results/'+file);
        console.log('sleep 2');
    }
});
