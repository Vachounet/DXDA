
Template.newest.helpers({
      newestForums() {
    return Session.get("newestForums");
  }
})

Template.newest.events({
    'click .list-group-item' (event, instance){
        //console.log(this)
        Session.set("currentSubForums", this.children)
        Session.set("previousPage", "/new")
        Session.set("currentPageTitle", this.title)
        Router.go("subs");
    }
});
