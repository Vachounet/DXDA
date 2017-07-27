Template.loggedin.helpers({
    userInfos() {
        return Session.get("currentUserInfos")
    },
    isProcessing() {
        return Session.get("showLoadingSpinner");

    },
    getAvatarURL: function (url) {
        if (url) {
            var imgName = url.split("/")[url.split("/").length - 1];
            return "https://forum.xda-developers.com/customavatars/" + imgName
        }

        return "";
    },
    getDate: function (timestamp) {
        return new Date(timestamp * 1000).toUTCString();
    },
})

Template.loggedin.events({
    'click a' (event, instance) {
        Session.set("showLoadingSpinner", true)
        Meteor.call('getUser', document.cookie, (error, result) => {

            Session.set("currentUserInfos", result.data);
            Session.set("showLoadingSpinner", false)
        });
    },
});

Template.loggedin.onCreated(function () {
    
    if (!Session.get("currentUserInfos")) {
        Session.set("showLoadingSpinner", true)
        Meteor.call('getUser', document.cookie, (error, result) => {

            Session.set("currentUserInfos", result.data);
            Session.set('unreadPM', result.data.notifications.pmunread.total)
            Session.set('newMentions', result.data.notifications.dbtech_usertag_mentioncount.total);
            Session.set('newQuotes', result.data.notifications.dbtech_usertag_quotecount.total);
            Session.set("showLoadingSpinner", false)

        });
    }

})

Template.loggedin.onRendered(function helloOnCreated() {

});