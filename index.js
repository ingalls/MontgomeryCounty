var utils = require('utils')

var casper = require('casper').create({
    logLevel: 'debug',
    verbose: true
});

casper.on('remote.message', function(message) {
    this.echo(message, 'INFO');
});

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

casper.waitForSelector('#MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_ucEnterData_txtStreenNumber', function() {
    casper.evaluate(function() {
        var streetAddr = document.getElementById('MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_ucEnterData_txtStreenNumber');
        var streetName = document.getElementById('MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_ucEnterData_txtStreetName');

        streetAddr.value = '19524';
        streetName.value = 'Gallatin';
        
        var button = $('#MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_StepNavigationTemplateContainerID_btnStepNextButton').click();
    });
});

casper.waitForSelector('#MainContent_MainContent_cphMainContentArea_ucSearchType_wzrdRealPropertySearch_ucDetailsSearch_dlstDetaisSearch', function() {
    casper.evaluate(function() {
        console.log('HERE');
    });
});

casper.run();
