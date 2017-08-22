Template.edit.onRendered(function helloOnCreated() {

    var content = Session.get("currentEdit");

        $('#edit_message').html(content);

    var wbbOpt = {
        buttons: "bold,italic,underline,|,img,link,|,code",
        traceTextarea: true
    }
    $('#edit_message').wysibb(wbbOpt);



    Session.set("currentEdit", "")

});

Template.edit.events({
    'click #cancel_edit' (event, instance) {
        $(".wysibb").remove();
        window.history.back()
    },
    'click #send_edit' (event, instance) {
        var postID = Session.get("currentPostID")
        var message = $("textarea").bbcode();
        Meteor.call('editReply', document.cookie, postID, message, (error, result) => {
            if (error)
                console.log(error)


            $(".wysibb").remove();
            window.history.back()
        });
    }
});