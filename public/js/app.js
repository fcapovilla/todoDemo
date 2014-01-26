var TodoApp = TodoApp || {View: {}, Model: {}, Collection: {}};


TodoApp.Model.Todo = Backbone.Model.extend({
});


TodoApp.Collection.Todo = Backbone.Collection.extend({
	model: TodoApp.Model.Todo,
	url: '/todo'
});


$(function() {
	TodoApp.todos = new TodoApp.Collection.Todo();
	TodoApp.todos.fetch();

	console.log(TodoApp.todos);
});
