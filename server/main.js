import {
  Meteor
} from 'meteor/meteor';
import opn from 'opn'
Meteor.startup(() => {
  Meteor.methods({
    openURL: function (url) {
      opn(url);
    },
    userLogin: function (username, password) {

      var res = HTTP.post("https://api.xda-developers.com/v2/user/login", {
        data: {
          username: username,
          password: password
        }
      });

      return res;
    },

    getUser: function (cookies) {

      var res = HTTP.get("https://api.xda-developers.com/v2/user", {
        headers: {
          Cookie: cookies
        }
      });
      return res;
    },

    getAllForums: function (cookies) {

      var res = HTTP.get("https://api.xda-developers.com/v2/forums", {
        headers: {
          Cookie: cookies
        }
      });

      return res;
    },

    getTopForums: function (cookies) {

      var res = HTTP.get("https://api.xda-developers.com/v2/forums/top", {
        headers: {
          Cookie: cookies
        }
      });

      return res;
    },

    getNewestForums: function (cookies) {

      var res = HTTP.get("https://api.xda-developers.com/v2/forums/newest", {
        headers: {
          Cookie: cookies
        }
      });
      return res;
    },
    getGeneralForums: function (cookies) {

      var res = HTTP.get("https://api.xda-developers.com/v2/forums/general", {
        headers: {
          Cookie: cookies
        }
      });
      return res;
    },
    getSubscription: function (cookies) {

      var res = HTTP.get("https://api.xda-developers.com/v2/forums/subscribed", {
        headers: {
          Cookie: cookies
        }
      });
      return res;
    },
    getThreads: function (cookies, forumID) {

      var res = HTTP.get("https://api.xda-developers.com/v2/threads?forumid=" + forumID, {
        headers: {
          Cookie: cookies
        }
      });

      return res;
    },
    getPosts: function (cookies, threadID, page) {

      if (!page) {
        page = 1
      }

      var res = HTTP.get("https://api.xda-developers.com/v2/posts?threadid=" + threadID + "&page=" + page, {
        headers: {
          Cookie: cookies
        }
      });

      return res;
    },
    getUnreadsFeed: function (cookies, threadID) {
      var res = HTTP.get("https://api.xda-developers.com/v2/posts/newpost?threadid=" + threadID, {
        headers: {
          Cookie: cookies
        }
      });

      return res;
    },
    markAsRead: function (cookies, threadID) {
      var res = HTTP.call("PUT", "https://api.xda-developers.com/v2/threads/markread?threadid=" + threadID, {
        headers: {
          Cookie: cookies
        }
      });

      return res;
    },
    markForumAsRead: function (cookies, forumID) {
      var res = HTTP.call("PUT", "https://api.xda-developers.com/v2/forums/markread?forumid=" + forumID, {
        headers: {
          Cookie: cookies
        }
      });

      return res;
    },
    subscribeForum: function (cookies, forumID) {
      var res = HTTP.call("POST", "https://api.xda-developers.com/v2/forums/subscribe", {
        headers: {
          Cookie: cookies
        },
        data: {
          forumid: forumID
        }
      });

      return res;
    },
    unsubscribeForum: function (cookies, forumID) {
      var res = HTTP.call("DELETE", "https://api.xda-developers.com/v2/forums/unsubscribe?forumid=" + forumID, {
        headers: {
          Cookie: cookies
        }
      });

      return res;
    },
    getUserInfos: function (cookies, userID) {
      var res = HTTP.get("https://api.xda-developers.com/v2/user/userinfo?userid=" + userID, {
        headers: {
          Cookie: cookies
        }
      });

      return res;
    },
    addThanks: function (cookies, postID) {
      console.log(postID)
      var res = HTTP.post("https://api.xda-developers.com/v2/posts/thanks", {
        headers: {
          Cookie: cookies
        },
        data: {
          postid: postID
        }
      });

      return res;
    },
    removeThanks: function (cookies, postID) {
      var res = HTTP.call("DELETE", "https://api.xda-developers.com/v2/posts/thanks?postid=" + postID, {
        headers: {
          Cookie: cookies
        }
      });
      return res;
    },
    getInbox: function (cookies) {
      var res = HTTP.get("https://api.xda-developers.com/v2/pms/inbox", {
        headers: {
          Cookie: cookies
        }
      });
      return res;
    },
    getOutbox: function (cookies) {
      var res = HTTP.get("https://api.xda-developers.com/v2/pms/sent", {
        headers: {
          Cookie: cookies
        }
      });
      return res;
    },
    getQuotes: function (cookies, page) {
      var res = HTTP.get("https://api.xda-developers.com/v2/user/quotes?page=" + page, {
        headers: {
          Cookie: cookies
        }
      });
      return res;
    },
    getMentions: function (cookies, page) {
      var res = HTTP.get("https://api.xda-developers.com/v2/user/mentions?page=" + page, {
        headers: {
          Cookie: cookies
        }
      });
      return res;
    },
    sendNewPM: function (cookies, messageInfos) {
      var res = HTTP.post("https://api.xda-developers.com/v2/pms/send", {
        headers: {
          Cookie: cookies
        },
        data: {
          message: messageInfos.message,
          subject: messageInfos.subject,
          username: messageInfos.user
        }
      });
      return res;
    },
  });
});