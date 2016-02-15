var utils = require('utils')

var casper = require('casper').create({
//    logLevel: 'debug',
//    verbose: true
});

var num = casper.cli.args[0];
var str = casper.cli.args[1];

casper.on('remote.message', function(message) {
    this.echo(message, 'INFO');
});

//Main Page
casper.start('http://sdat.dat.maryland.gov/RealProperty/Pages/default.aspx', function() {
    var doc = this.evaluate(function() {
        try {
            var formCounty = document.getElementById('MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_ucSearchType_ddlCounty');
            var formSearch = document.getElementById('MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_ucSearchType_ddlSearchType');

            formCounty.value = '16'; //Montgomery County
            formSearch.value = '01'; //Address Search

            var button = $('#MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_StartNavigationTemplateContainerID_btnContinue').click();

        } catch (err) {
            console.log(mmr)
        }
        return document;
    });

});

//Search Box
casper.waitForSelector('#MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_ucEnterData_txtStreenNumber', function() {
    casper.evaluate(function(num, str) {
        var streetAddr = document.getElementById('MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_ucEnterData_txtStreenNumber');
        var streetName = document.getElementById('MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_ucEnterData_txtStreetName');

        streetAddr.value = num.toString();
        streetName.value = str.toString();
        
        var button = $('#MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_StepNavigationTemplateContainerID_btnStepNextButton').click();
    }, num, str);
});

casper.waitWhileSelector('#MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_ucEnterData_txtStreenNumber', function() {
    var doc = casper.evaluate(function() {
        return document;
    });
    casper.echo(doc.all[0].outerHTML)
});

casper.run();
