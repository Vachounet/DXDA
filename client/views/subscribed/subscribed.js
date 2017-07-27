// Import MDC components from the meteor package.

Template.subscribed.helpers({
    subscribeds() {
        return Session.get("subscribeds");
    }
})

Template.subscribed.onRendered(function helloOnCreated() {
Session.set("showLoadingSpinner", false);
});

Template.subscribed.onCreated(function helloOnCreated() {

});