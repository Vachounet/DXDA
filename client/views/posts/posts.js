import pagination from 'pagination'

Template.post.helpers({
    bbtohtml: function (text) {
        var result = XBBCODE.process({
            text: text,
            removeMisalignedTags: true,
            addInLineBreaks: true
        });
        return result.html;
    },
    getDate: function (timestamp) {
        return new Date(timestamp * 1000).toUTCString();
    },
    getAvatarURL: function (url) {
        if (url) {
            var imgName = url.split("/")[url.split("/").length - 1];
            return "https://forum.xda-developers.com/customavatars/" + imgName
        }

        return "";
    },
    isPostAuthor: function (userID) {
        return userID === Session.get("currentUserInfos").userid
    }
});

Template.post.events({
    'click a' (event, instance) {
        event.preventDefault();
        Meteor.call('openURL', event.target.href, (error, result) => {});

    },
    'click #thanks' (event, instance) {
        event.preventDefault();

        if (this.thanks_usernames.indexOf(Session.get("currentUserInfos").username) == -1) {
            Meteor.call('addThanks', document.cookie, this.postid, (error, result) => {
                Meteor.call('getPosts', document.cookie, Session.get("tid"), Session.get("currentPage"), (error, result) => {
                    Session.set("posts", result.data.results);

                });
            });
        } else {
            Meteor.call('removeThanks', document.cookie, this.postid, (error, result) => {
                Meteor.call('getPosts', document.cookie, Session.get("tid"), Session.get("currentPage"), (error, result) => {
                    Session.set("posts", result.data.results);

                });
            });
        }
    }
});

Template.posts.helpers({
    posts() {
        return Session.get("posts");
    },
    isProcessing() {
        return Session.get("showLoadingSpinner");

    },
    pager() {
        return Session.get("pager");
    }
});

Template.posts.events({
    'click [data-page]' (event, instance) {

        event.preventDefault();
        Session.set("showLoadingSpinner", true);
        var page = event.target.getAttribute("data-page");
        Session.set("currentPage", page)
        Meteor.call('getPosts', document.cookie, Session.get("tid"), page, (error, result) => {

            Session.set("posts", result.data.results);
            Session.set("showLoadingSpinner", false);

            var boostrapPaginator = new pagination.TemplatePaginator({
                prelink: '/',
                current: result.data.current_page,
                rowsPerPage: result.data.per_page,
                totalResult: result.data.total_pages * result.data.per_page,
                slashSeparator: false,
                pageLinks: 10,
                template: function (result) {
                    var i, len, prelink;
                    var html = '<div class="btn-group">';
                    if (result.pageCount < 2) {
                        html += '</div>';
                        return html;
                    }
                    prelink = this.preparePreLink(result.prelink);
                    if (result.previous) {

                        let link = Router.current().url + "/" + result.previous

                        html += '<button data-page="' + result.previous + '" class="mdc-button mdc-button--dense">' + this.options.translator('PREVIOUS') + '</a></li>';
                    }
                    if (result.range.length) {
                        for (i = 0, len = result.range.length; i < len; i++) {

                            let link = Router.current().url + "/" + result.range[i]

                            if (result.range[i] === result.current) {
                                html += '<button data-page="' + result.range[i] + '" class="mdc-button--raised mdc-button mdc-button--dense">' + result.range[i] + '</a></li>';
                            } else {
                                html += '<button data-page="' + result.range[i] + '" class="mdc-button mdc-button--dense">' + result.range[i] + '</a></li>';
                            }
                        }
                    }
                    if (result.next) {
                        let link = Router.current().url + "/" + result.next
                        html += '<button data-page="' + result.next + '" class="mdc-button mdc-button--dense">' + this.options.translator('NEXT') + '</a></li>';
                    }
                    html += '</div>';
                    return html;
                }
            });
            Session.set("pager", boostrapPaginator.render());
        });

    },
    'click #markRead' (event, instance) {
       
        Meteor.call('markAsRead', document.cookie, Session.get("tid"), (error, result) => {
            Meteor.call('getPosts', document.cookie, Session.get("tid"), Session.get("currentPage"), (error, result) => {
                Session.set("posts", result.data.results);

            });
        });
    },
});

Template.posts.onRendered(function helloOnCreated() {

});

Template.posts.onCreated(function helloOnCreated() {
    Session.set("showLoadingSpinner", true);

    if (!Session.get("currentPage")) {
        Session.set("currentPage", "1");
    }



    Meteor.call('getPosts', document.cookie, Session.get("tid"), Session.get("currentPage"), (error, result) => {
        Session.set("posts", result.data.results);
        Session.set("showLoadingSpinner", false);

        var boostrapPaginator = new pagination.TemplatePaginator({
            prelink: '/',
            current: result.data.current_page,
            rowsPerPage: result.data.per_page,
            totalResult: result.data.total_pages * result.data.per_page,
            slashSeparator: false,
            pageLinks: 10,
            template: function (result) {
                var i, len, prelink;
                var html = '<div class="btn-group">';
                if (result.pageCount < 2) {
                    html += '</div>';
                    return html;
                }
                prelink = this.preparePreLink(result.prelink);
                if (result.previous) {

                    let link = Router.current().url + "/" + result.previous

                    html += '<button data-page="' + result.previous + '" class="mdc-button mdc-button--dense">' + this.options.translator('PREVIOUS') + '</a></li>';
                }
                if (result.range.length) {
                    for (i = 0, len = result.range.length; i < len; i++) {

                        let link = Router.current().url + "/" + result.range[i]

                        if (result.range[i] === result.current) {
                            html += '<button data-page="' + result.range[i] + '" class="mdc-button--raised mdc-button mdc-button--dense">' + result.range[i] + '</a></li>';
                        } else {
                            html += '<button data-page="' + result.range[i] + '" class="mdc-button mdc-button--dense">' + result.range[i] + '</a></li>';
                        }
                    }
                }
                if (result.next) {
                    let link = Router.current().url + "/" + result.next
                    html += '<button data-page="' + result.next + '" class="mdc-button mdc-button--dense">' + this.options.translator('NEXT') + '</a></li>';
                }
                html += '</div>';
                return html;
            }
        });

        Session.set("pager", boostrapPaginator.render());
    });
});