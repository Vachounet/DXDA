import { textfield } from 'meteor/zodiase:mdc-styleless';

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

Template.newpm.onRendered(function templateOnRendered() {
    // Initialize all MDC components.
    this.$('.mdc-textfield').each((index, element) => {
        console.log(element.id)
        textfield.MDCTextfield.attachTo(element);
    });
});