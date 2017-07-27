Template.quotes.helpers({
    userquotes() {
        return Session.get("userquotes");
    },
    getDate: function (timestamp) {
        return new Date(timestamp * 1000).toUTCString();
    },    
})

Template.quotes.events({

})

Template.quotes.onRendered(function helloOnCreated() {

});

Template.quotes.onCreated(function helloOnCreated() {
    Session.set("showLoadingSpinner", true);
      if (!Session.get("currentQuotePage")){
        Session.set("currentQuotePage", "1")
      }
    
    Meteor.call('getQuotes', document.cookie, Session.get("currentQuotePage"), (error, result) => {
        Session.set("userquotes", result.data.results)
        Session.set("showLoadingSpinner", false);
    });
});