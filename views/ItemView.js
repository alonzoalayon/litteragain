var TaskItemView = Backbone.View.extend({
  el: '<li></li>',

  template: _.template('\
    <%= task.get("text") %>\
  '),

  render: function() {
    $(this.el).html(this.template({ task: this.model }));
    return this;
  }
});
