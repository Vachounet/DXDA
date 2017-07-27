

Template.user.helpers({
    infos() {
        return Session.get("userinfos");
    },
    bbtohtml: function (text) {
        //console.log(parser.parseString(text))

        var result = XBBCODE.process({
            text: text,
            removeMisalignedTags: true,
            addInLineBreaks: true
        });
        return result.html;
    },
    getDateFromTS: function(ts){
        return new Date(ts*1000).toUTCString();
    }   
});

Template.user.onCreated(function helloOnCreated() {
    Session.set("showLoadingSpinner", true);
    Meteor.call('getUserInfos', document.cookie, Session.get("uid"), (error, result) => {
        
        Session.set("userinfos", result.data);
        Session.set("showLoadingSpinner", false);
    });
});