// Import MDC components from the meteor package.
import { textfield } from 'meteor/zodiase:mdc-styleless';

Template.login.helpers({
  isProcessing() {
      return Session.get("showLoadingSpinner");

  }    
})

Template.login.onRendered(function templateOnRendered() {
  // Initialize all MDC components.
  this.$('.mdc-textfield:not([data-demo-no-auto-js])').each((index, element) => {
    textfield.MDCTextfield.attachTo(element);
  });
});

Template.login.events({
  'click a' (event, instance) {
    console.log("login")
    event.preventDefault();
     Session.set("showLoadingSpinner", true)
    var username = instance.find("#username").value;
    var password = instance.find("#password").value;

    Meteor.call('userLogin', username, password, (error, result) => {
      if (result.data.success) {
        var resCookies = result.headers["set-cookie"];

        for (var i = 0; i < resCookies.length; i++) {
          var newCookie = resCookies[i].split(";")[0]
          document.cookie = newCookie;
        }
       LoadDatas();
        Router.go('/loggedin');
      }
    });

  },
});