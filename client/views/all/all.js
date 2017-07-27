
Template.all.helpers({
      allForums() {
    return Session.get("allForums");
  }
})



Template.all.events({
    'click .list-group-item' (event, instance){
        //console.log(this)
        Session.set("currentSubForums", this.children)
        Session.set("currentPageTitle", this.title)
        Session.set("previousPage", "/all")
        Router.go("subs");
    }
});
