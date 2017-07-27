Template.mentions.helpers({
    mentions() {
        return Session.get("mentions");
    },
    getDate: function (timestamp) {
        return new Date(timestamp * 1000).toUTCString();
    },    
})

Template.mentions.events({

})

Template.mentions.onRendered(function helloOnCreated() {

});

Template.mentions.onCreated(function helloOnCreated() {
    Session.set("showLoadingSpinner", true);
      if (!Session.get("currentMentionPage")){
        Session.set("currentMentionPage", "1")
      }
    
    Meteor.call('getMentions', document.cookie, Session.get("currentMentionPage"), (error, result) => {
        Session.set("mentions", result.data.results)
        Session.set("showLoadingSpinner", false);
    });
});