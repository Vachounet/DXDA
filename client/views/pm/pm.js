Template.pm.helpers({
    getDate: function (timestamp) {
        return new Date(timestamp * 1000).toUTCString();
    },
    bbtohtml: function (text) {
        var result = XBBCODE.process({
            text: text,
            removeMisalignedTags: true,
            addInLineBreaks: true
        });
        return result.html;
    }, 
})