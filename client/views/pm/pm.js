Template.pm.helpers({
    getDate: function (timestamp) {
        return new Date(timestamp * 1000).toUTCString();
    },    
})