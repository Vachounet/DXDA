Template.reply.onRendered(function helloOnCreated() {
    
    var quote = Session.get("currentQuote");
    if (quote && quote !== ""){
        var content = "[QUOTE="+Session.get("currentUsername")+";"+Session.get("currentPostID")+"]";
        content += quote;
        content += "[/QUOTE]";

        $('#reply_message').html(content);

        Session.set("currentQuote", "")
        Session.set("currentUsername", "")
        Session.set("currentPostID", "")
    }
    

    var wbbOpt = {
        buttons: "bold,italic,underline,|,img,link,|,code"
    }
    $('#reply_message').wysibb(wbbOpt);
});

Template.reply.events({
    'click #cancel_reply' (event, instance) {
        $(".wysibb").remove();
        window.history.back()
    },
    'click #send_reply' (event, instance) {
        var currentThread = Session.get("currentThread");
        var message = $("#reply_message").bbcode();
        Meteor.call('postReply', document.cookie, currentThread.firstpostid, message, (error, result) => {
            if (error)
                console.log(error)

            $(".wysibb").remove();
            window.history.back()
        });
    }
});