Router.configure({
  layoutTemplate: 'layout', // here we say that layout template will be our main layout
  loadingTemplate: 'spinner'
});

Router.route('/', function () {
  this.render('login');
});

Router.route('/loggedin', function () {
  this.render('loggedin');
});

Router.route('/top', function () {
  Session.set("currentPageTitle", "Top Forums")
  this.render('top');
});

Router.route('/all', function () {
  Session.set("currentPageTitle", "Forums")
  this.render('all');
});

Router.route('/new', function () {
  Session.set("currentPageTitle", "Newest Forums")
  this.render('newest');
});

Router.route('/subs', function () {
  this.render('subs');
});

Router.route('/threads', function () {
  this.render('threads');
});

Router.route('/threads/:_fid',  function () {
  var params = this.params; 
  var fid = params._fid;
  Session.set("fid", fid);

  this.render('threads');
});

Router.route('/posts/:_tid',  function () {
  var params = this.params;
  var tid = params._tid; 
  Session.set("tid", tid);
  this.render('posts');
});

Router.route('/posts/:_tid/:_page',  function () {
  var params = this.params;
  var tid = params._tid; 
  var page = params._page; 
  Session.set("currentPage", page);
  Session.set("tid", tid);
  this.render('posts');
});

Router.route('/subscribed', function () {
  this.render('subscribed');
});

Router.route('/user/:_uid',  function () {
  var params = this.params;
  var uid = params._uid; 
  Session.set("uid", uid);
  this.render('user');
  
});

Router.route('/pms', function () {
  this.render('pms');
});

Router.route('/pm', function () {
  this.render('pm', {
    data: function () {
      return Session.get("currentInboxMessage");
    }
  });
});