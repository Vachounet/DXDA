import {
  Template
} from 'meteor/templating';
import {
  ReactiveVar
} from 'meteor/reactive-var';
import {
  Session
} from 'meteor/session'

import 'meteor/zodiase:mdc-styleonly/bundle';

// Import MDC-Ripple from the meteor package.
import {
  default as mdc
} from 'meteor/zodiase:mdc-styleless';
window.mdc = mdc;

import './main.html';

Template.layout.onCreated(function helloOnCreated() {

  Session.set("currentPageTitle", "Home");
  if (document.cookie && document.cookie !== "") {
    Session.set("showLoadingSpinner", true);
    Meteor.call('getUser', document.cookie, (error, result) => {

      Session.set("currentUserInfos", result.data);
      Session.set('unreadPM', result.data.notifications.pmunread.total)
      Session.set('newMentions', result.data.notifications.dbtech_usertag_mentioncount.total);
      Session.set('newQuotes', result.data.notifications.dbtech_usertag_quotecount.total);
      Session.set("showLoadingSpinner", false)

    });
    LoadDatas();
    Router.go('/subscribed');
  } else {
    //
    Router.go('/');
  }
});

Template.layout.helpers({
  counter() {
    return Template.instance().counter.get();
  },
  unreadPM() {
    return Session.get("unreadPM");
  },
  newMentions() {
    return Session.get("newMentions");
  },
  newQuotes() {
    return Session.get("newQuotes");
  },
  currentPageTitle() {
    return Session.get("currentPageTitle");
  }
});

Template.layout.events({
  'click #back_button' (event, instance) {
    Router.go(Session.get("previousPage"));
  },
  'click #link_back' (event, instance) {
    window.history.back();
  }
});