angular.module('commentApp', [])
  .controller('CommentListController', function() {
    var commentList = this;

    commentList.comments = [
      {id:0, parent:null, text:'Comment 0', deleted:false},
      {id:1, parent:0, text:'Comment 1', deleted:false},
      {id:2, parent:0, text:'Comment 2', deleted:false},
      {id:3, parent:2, text:'Comment 3', deleted:false},
      {id:4, parent:2, text:'Comment 4', deleted:false},
      {id:5, parent:4, text:'Comment 5', deleted:false},
      {id:6, parent:null, text:'Comment 6', deleted:false}];

    commentList.newCommentId = commentList.comments.length;

    commentList.set_deleted = function(id) {
      angular.forEach(commentList.comments, function(comment) {
        if (comment.id == id) {
          comment.deleted = true;
        }
      });
      commentList.myTree = commentList.tree();
    };

    commentList.reply_add = function(data) {
      if(!!data.replyText){
        commentList.comments.push({
          id:commentList.newCommentId, 
          parent:data.id,
          text:data.replyText,
          deleted:false});
        commentList.newCommentId += 1;
        data.replyText = "";
        data.replying = false;
        commentList.myTree = commentList.tree();
      }
    };

    commentList.findChildren = function(parent) {
      //to get root comments find children of null
      
      var result = [];
  
      angular.forEach(commentList.comments, function(comment) {
        if (comment.parent == parent) {
          result.push(comment);
        }
      });

      return result;
    };

    commentList.getChildren = function (parent, depth) {
      var result = [];
      var childComments = commentList.findChildren(parent);

      angular.forEach(childComments, function(comment) {
        var nodes = commentList.getChildren(comment.id, depth + 1);
        var comment_text = '';
        if (comment.deleted) {
          comment_text = "~~THIS COMMENT HAS BEEN DELETED~~"
        } else {
          comment_text = comment.text;
        }
        var has_children = nodes.length > 0;

        result.push({
          id:comment.id, 
          text:comment_text, 
          replying:false, 
          deleted:comment.deleted,
          replyText:'', 
          depth: depth,
          has_children: has_children,
          nodes:nodes});
      });

      return result;
    };

    commentList.tree = function () {
      return commentList.getChildren(null, 1);
    };

    commentList.myTree = commentList.tree();

  });