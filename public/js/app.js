var TodoApp = TodoApp || {View: {}, Model: {}, Collection: {}};


TodoApp.Model.Todo = Backbone.Model.extend({
});


TodoApp.Collection.Todo = Backbone.Collection.extend({
	model: TodoApp.Model.Todo,
	url: '/todo'
});


TodoApp.View.Todo = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#tmpl_todo').html()),

	initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
    },

	render: function() {
		this.$el.html( this.template(this.model.attributes) );
		return this;
	}
});

TodoApp.View.TodoList = Backbone.View.extend({
	el: '#content',
	template: _.template($('#tmpl_todo_list').html()),

	initialize: function(){
		this.listenTo(this.collection, 'add', this.addOne);
		this.listenTo(this.collection, 'reset', this.addAll);

		this.render();
	},

	render: function() {
		this.$el.html( this.template() );
		return this;
	},

	addOne: function(todo) {
		var view = new TodoApp.View.Todo({model: todo});
		this.$("ul").append(view.render().el);
	},

	addAll: function() {
		this.render();
		this.collection.each(this.addOne, this);
	}
});


$(function() {
	TodoApp.todos = new TodoApp.Collection.Todo();
	TodoApp.todoList = new TodoApp.View.TodoList({collection: TodoApp.todos});
	TodoApp.todos.fetch();
});
