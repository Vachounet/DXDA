// Import MDC components from the meteor package.

Template.subscribed.helpers({
    subscribeds() {
        return Session.get("subscribeds");
    },
        isProcessing() {
        return Session.get("showLoadingSpinner");

    },
})

Template.subscribed.events({
    'click #refresh' (event, instance) {
        Session.set("showLoadingSpinner", true);
        Meteor.call('getSubscription', document.cookie, (error, result) => {
            Session.set("subscribeds", result.data.results);
            Session.set("showLoadingSpinner", false);
        });
    },
});

Template.subscribed.onRendered(function helloOnCreated() {
    Session.set("showLoadingSpinner", false);
});

Template.subscribed.onCreated(function helloOnCreated() {

});