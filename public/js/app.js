var TodoApp = TodoApp || {View: {}, Model: {}, Collection: {}};


TodoApp.Model.Todo = Backbone.Model.extend({
});


TodoApp.Collection.Todo = Backbone.Collection.extend({
	model: TodoApp.Model.Todo,
	url: '/todo'
});

TodoApp.View.TodoList = Backbone.View.extend({
	el: '#content',
	template: _.template($('#tmpl_todo_list').html()),

	initialize: function(){
		this.render();
	},

	render: function(){
		this.$el.html( this.template() );
		return this;
	}
});


$(function() {
	TodoApp.todos = new TodoApp.Collection.Todo();
	TodoApp.todoList = new TodoApp.View.TodoList({collection: TodoApp.todos});
	TodoApp.todos.fetch();
});
