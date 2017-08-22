Template.reply.onRendered(function helloOnCreated() {
    var wbbOpt = {
        buttons: "bold,italic,underline,|,img,link,|,code"
    }
    $('textarea').wysibb(wbbOpt);
});

Template.posts.events({
    'click #cancel_reply' (event, instance) {
        $(".wysibb").remove();
        window.hostory.back()
    },
    'click #send_reply' (event, instance) {
        var currentThread = Session.get("currentThread");
        var message = $("textarea").bbcode();
        Meteor.call('postReply', document.cookie, currentThread.firstpostid, message, (error, result) => {
            if (error)
                console.log(error)

            Session.set("postReply", false);
            Router.go(Router.current().url);
            $(".wysibb").remove();
            window.hostory.back()
        });
    }
});