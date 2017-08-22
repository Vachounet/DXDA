import {
    textfield
} from 'meteor/zodiase:mdc-styleless';

Template.newpm.events({
    'click #send' (event, template) {

        var recipient = template.find("#to-user").value;
        var subject = template.find("#subject").value;
        var message = template.find("#message").value;

        var data = {
            message: message,
            subject: subject,
            user: recipient

        }

        Meteor.call('sendNewPM', document.cookie, data, (error, result) => {
            Router.go("/pms")
        });
    },
})

Template.newpm.onCreated(function templateOnRendered() {

});

Template.newpm.onRendered(function templateOnRendered() {
    this.$('.mdc-textfield').each((index, element) => {
        textfield.MDCTextfield.attachTo(element);
    });
    var wbbOpt = {
        buttons: "bold,italic,underline,|,img,link,|,code"
    }
    $('textarea').wysibb(wbbOpt);
});