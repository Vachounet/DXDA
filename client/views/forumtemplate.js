import { checkbox, ripple, iconToggle } from 'meteor/zodiase:mdc-styleless';

Template.forumtemplate.onRendered(function helloOnCreated() {
  this.$('[data-interactive-list]').each((index, element) => {
    ripple.MDCRipple.attachTo(element);
  });
});

Template.forumtemplate.helpers({
    getPicURL: function(url){
        return "https://forum.xda-developers.com/images/forumpics_new/" + url.split("/")[url.split("/").length - 1];
    }
});

Template.forumtemplate.events({
    'click .mdc-list-item' (event, instance) {
        //console.log(this)
        if (this.children.length > 0) {
        Session.set("currentSubForums", this.children)
        Session.set("previousPage", "/top")
        Session.set("currentPageTitle", this.title)
        Router.go("subs");
    } else {
        Router.go("/threads/" + this.forumid);
    }
}
});
