
module.exports = {
    
    folderName: 'onkyo',
    // Inject Boxs in dashboard
    // dashboadBoxs is an array of dashboardBox 
    dashboardBoxs: [{
        title: 'Onkyo AVR',
        // the name of your Angular Controller for this box (put an empty string if you don't use angular)
        ngController: 'onkyoCtrl as vm',
        file : 'box.ejs',
        icon: 'fa fa-download',
        type: 'box-primary'
    }],
 
    // link assets to project
    linkAssets: true
};