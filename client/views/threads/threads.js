Template.threads.helpers({
    threads() {
        return Session.get("threads");
    },
    isProcessing() {
        return Session.get("showLoadingSpinner");

    },
    userFollow: function () {

        var follow = false;
        for (var i = 0; i < Session.get("subscribeds").length; i++) {
            if (Session.get("subscribeds")[i].forumid === Session.get("fid"))
                follow = true;
        }
        return follow;

    }
});

Template.thread.helpers({
    unreads: function (val) {
        return val === 1
    },
    isSticky: function (val) {
        return val === "1"
    }
});


Template.threads.events({
    'click .mdc-list-item__text__primary' (event, instance) {
        Session.set("showLoadingSpinner", true);
        Session.set("currentPage", 0)
        Router.go("/posts/" + this.threadid);
    },
    'click .mdc-list-item__end-detail' (event, instance) {
        Session.set("showLoadingSpinner", true);
        Meteor.call('getUnreadsFeed', document.cookie, this.threadid, (error, result) => {
            Session.set("threads", result.data.results);
            Session.set("showLoadingSpinner", false);
            Router.go("/posts/" + this.threadid + "/" + result.data.current_page);
        });

    },
    'click .userdetails' (event, instance) {
        Session.set("showLoadingSpinner", true);
        Router.go("/user/" + this.firstpost.userid);
    },
    'click #markRead' (event, instance) {
        Session.set("showLoadingSpinner", true);
        Meteor.call('markForumAsRead', document.cookie, Session.get("fid"), (error, result) => {
            Meteor.call('getThreads', document.cookie, Session.get("fid"), (error, result) => {
                Session.set("threads", result.data.results);
                Session.set("showLoadingSpinner", false);
            });
        });
    },
    'click #unsubscribe' (event, instance) {
        Session.set("showLoadingSpinner", true);
        Meteor.call('unsubscribeForum', document.cookie, Session.get("fid"), (error, result) => {
            Meteor.call('getSubscription', document.cookie, (error, result) => {
                Session.set("subscribeds", result.data.results);
                Session.set("showLoadingSpinner", false);
            });
        });
    },
    'click #subscribe' (event, instance) {
        Session.set("showLoadingSpinner", true);
        Meteor.call('subscribeForum', document.cookie, Session.get("fid"), (error, result) => {
            Meteor.call('getSubscription', document.cookie, (error, result) => {
                Session.set("subscribeds", result.data.results);
                Session.set("showLoadingSpinner", false);
            });
        });
    },
});

Template.threads.onCreated(function helloOnCreated() {
    Session.set("showLoadingSpinner", true);
    Meteor.call('getThreads', document.cookie, Session.get("fid"), (error, result) => {
        Session.set("threads", result.data.results);
        Session.set("showLoadingSpinner", false);
    });
});