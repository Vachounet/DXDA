// Import MDC components from the meteor package.
import {
  checkbox,
  ripple,
  iconToggle
} from 'meteor/zodiase:mdc-styleless';

Template.subs.helpers({
  subsForums() {
    return Session.get("currentSubForums");
  }
});



Template.subs.events({
  // 'click .list-group-item' (event, instance) {
  //   Meteor.call('getThreads', document.cookie, forumId, (error, result) => {
  //     instance.newestForums.set(result.data.results);
  //   });
  // },
  'click .mdc-list-item' (event, instance) {

    Session.set("previousPage", "subs");
    Router.go("/threads/" + this.forumid);
  }
});

Template.subs.onRendered(function helloOnCreated() {
  this.$('[data-interactive-list] .mdc-list-item').each((index, element) => {
    ripple.MDCRipple.attachTo(element);
  });
});