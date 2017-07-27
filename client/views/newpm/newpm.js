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

Template.newpm.onCreated(function templateOnRendered() {

});

Template.newpm.onRendered(function templateOnRendered() {
    console.log("NEW PM RENDERED")
    this.$('.mdc-textfield').each((index, element) => {
        textfield.MDCTextfield.attachTo(element);
    });

    this.$('textarea').froalaEditor({
      // Set custom buttons with separator between them.
      toolbarButtons: ['undo', 'redo' , '|', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'outdent', 'indent', 'clearFormatting', 'insertTable', 'html'],
      toolbarButtonsXS: ['undo', 'redo' , '-', 'bold', 'italic', 'underline'],
      pluginsEnabled: null
    });
});