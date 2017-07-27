Template.pms.helpers({
    inboxMessages() {
        return Session.get("inboxMessages");
    },
    getDate: function (timestamp) {
        return new Date(timestamp * 1000).toUTCString();
    },
    isProcessing() {
        return Session.get("showLoadingSpinner");

    },
})

Template.pms.events({
    'click #inbox' (event, template) {
        Meteor.call('getInbox', document.cookie, (error, result) => {
            Session.set("inboxMessages", result.data.results)
        });
    },
    'click #outbox' (event, template) {
        Meteor.call('getOutbox', document.cookie, (error, result) => {
            Session.set("inboxMessages", result.data.results)
        });
    },
    'click #newMessage' (event, template) {
        Router.go("/newpm")
    },
    'click .inbox-message' (event, template){
        Session.set("currentInboxMessage", this);
        Router.go("/pm")
    }
})

Template.pms.onRendered(function helloOnCreated() {

});

Template.pms.onCreated(function helloOnCreated() {
    Session.set("showLoadingSpinner", true);
    Meteor.call('getInbox', document.cookie, (error, result) => {
        Session.set("inboxMessages", result.data.results)
        Session.set("showLoadingSpinner", false);
    });
});