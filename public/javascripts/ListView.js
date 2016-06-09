var LitterModel = Backbone.Model.extend({
    urlRoot: '/basuras',
    idAttribute: '_id'
});

var LitterCollection = Backbone.Collection.extend({
    url: '/basuras',
    model: LitterModel
});

var FormView = Backbone.View.extend({
    el: '<div></div>',

    template: _.template('\
  <form method="POST" action="/basuras">\
    <input type="text" name="text">\
    <input type="submit" value="Submit">\
  </form>\
  '),
    initialize: function() {
        this.render();
    },

    render: function() {
        // this is where your business logic goes.
        // it usually starts with...
        $(this.el).html(this.template({
            //sodas: this.collection
        }));
        // this will stick the template inside of the el
        return this;
    }
});
var TaskItemView = Backbone.View.extend({
    el: '<li class="list-group-item"></li>',

    template: _.template('\
    <%= basura.get("basura") %>&nbsp;\
    <img class="like" src="../images/png/like.png" style="height:20px;">\
    <span class="me_gusta"><%= basura.get("__v") %></span>\
    <img class="update" src="../images/png/edit.png" style="height:20px;">\
    <img class="destroy" src="../images/png/error.png" style="height:20px;">\
  '),
  events: {
    'click .destroy': 'handleDestroy',
    'click .update' : 'handleUpdate',
    'click .like' : 'handleLike'
  },
  handleDestroy: function(){
    this.model.destroy();
  },
  handleUpdate: function(){
    this.model.set();
  },
  handleLike: function(){
    this.model.fetch();
    var value = $('span').text();
    //var Clicks = 0;
    console.log(value);
    value = value + 1;
    //document.getElementbyClassNames('me_gusta').innerHTML = Clicks;
    console.log(value);
    this.model.set({
     __v: value});
    this.model.save();
  },
    render: function() {
        $(this.el).html(this.template({basura: this.model}));
        return this;
    }
});

var TasksListView = Backbone.View.extend({
    el: '<ul class="list-group"></ul>',
    initialize: function(){
      //listens to update even from collection and calls this.render
      this.listenTo(this.collection, "update", this.render)
      //this.listenTo(this.model, "remove", this.remove)
    },

    render: function() {
      console.log(this.collection.length);
      //console.log(basura.like);
        var that = this;
        // be sure to reset the container el, because if you re-render for any reason, you'll just keep adding to it
        $(this.el).html('');
        this.collection.each(function(basura) {
            var taskItemView = new TaskItemView({
                model: basura
            });
            $(that.el).append(taskItemView.render().el);
        });
        return this;
    }
});

var tasks = new LitterCollection();
tasks.fetch();
console.log(tasks);
var tasksListView = new TasksListView({
    collection: tasks
});

var formView = new FormView();
//formView.render();
//tasksListView.render();
$('#form').html(formView.el);
$("#content").html(tasksListView.render().el);
