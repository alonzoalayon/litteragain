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
    el: '<li class="list-group-item"></br></li>',

    template: _.template('\
    <%= basura.get("basura") %>&nbsp;&nbsp;&nbsp;\
    <img class="like faa-bounce animated-hover" src="../images/png/like.png" style="height:20px;" faa-bounce animated>\
    <span class="me_gusta"><%= basura.get("like") %></span>&nbsp;&nbsp;&nbsp;\
    <img class="update faa-pulse animated-hover" src="../images/png/edit.png" style="height:20px;">&nbsp;&nbsp;&nbsp;\
    <img class="destroy faa-flash animated-hover" src="../images/png/error.png" style="height:20px;">\
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
    //event && event.preventDefault();
    var likes = this.model.get('like') // this will be a Number
    if(likes == 0 || likes == null){
      this.model.set('like', 1);
    }
    else{
      this.model.set('like', likes + 1);
    }

this.model.save();
this.render();
  },
    render: function() {
      //e.preventDefault();
      //event && event.preventDefault();
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
