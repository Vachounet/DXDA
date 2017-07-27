Template.top.helpers({
    allForums() {
        return Session.get("topForums");
    }
});

Template.top.events({
    'click .list-group-item' (event, instance) {
        //console.log(this)
        Session.set("currentSubForums", this.children)
        Session.set("previousPage", "/top")
        Session.set("currentPageTitle", this.title)
        Router.go("subs");
    }
});