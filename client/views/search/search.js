import {
    textfield
} from 'meteor/zodiase:mdc-styleless';

Template.search.helpers({
    devices() {
        return Session.get("devices")
    }
})

Template.search.events({
    'input #search_input': function (event, template) {

        if (event.currentTarget.value.length < 2) {
            Session.set("devices", [])
            return;
        }

        var filtered = deviceSearch.devices.filter(function (el) {

            return el.searchable.toLowerCase().indexOf(event.currentTarget.value.toLowerCase()) != -1;
        });

        Session.set("devices", filtered)
        //Session.set("whatever", event.currentTarget.value);
    },
    'click .mdc-list-item' (event, instance) {
        Session.set("showLoadingSpinner", true);
        Meteor.call('getChildForums', document.cookie, this.fid, (error, result) => {

            Session.set("currentSubForums", result.data.results);

            Session.set("showLoadingSpinner", false);
            Router.go("subs");
        });

        
    }
});

Template.search.onRendered(function templateOnRendered() {
    this.$('.mdc-textfield').each((index, element) => {
        textfield.MDCTextfield.attachTo(element);
    });

    //Session.set("devices", deviceSearch.devices)
});