var TodoApp = TodoApp || {View: {}, Model: {}, Collection: {}};


TodoApp.Model.Todo = Backbone.Model.extend({
	defaults: {
		'editing': false,
		'end_date': new Date()
	},

	initialize: function() {
		if(this.get('done') == '0') {
			this.set('done', false);
		}
	},

	toggle: function() {
		this.save({done: !this.get('done')});
	}
});


TodoApp.Collection.Todo = Backbone.Collection.extend({
	model: TodoApp.Model.Todo,
	url: '/todo'
});


TodoApp.View.Todo = Marionette.ItemView.extend({
	tagName: 'li',
	template: '#tmpl_todo',

	events: {
		'click .delete': 'delete',
		'click .edit': 'edit',
		'click .done': 'toggleDone',
		"keypress .label":  "updateOnEnter"
	},

	modelEvents: {
		'change': 'render'
	},

	onRender: function() {
		if(this.model.get('editing') === true) {
			this.$('.label').focus();
		}
	},

	delete: function() {
		this.model.destroy();
	},

	edit: function() {
		this.model.set('editing', true);
	},

	toggleDone: function() {
		this.model.toggle();
		return false;
	},

	updateOnEnter: function(e) {
		var value = this.$('.label').val();

		if (e.keyCode != 13) return;
		if (!value) return;

		this.model.save({label: value, editing: false});
	}
});

TodoApp.View.TodoList = Marionette.CompositeView.extend({
	el: '#content',
	template: '#tmpl_todo_list',
	itemViewContainer: 'ul',
	itemView: TodoApp.View.Todo,

	events: {
		'click .newTodo': 'newTodo'
	},

	newTodo: function() {
		this.collection.add({label: '', done: false, editing: true});
	}
});


$(function() {
	TodoApp.todos = new TodoApp.Collection.Todo();
	TodoApp.todoList = new TodoApp.View.TodoList({collection: TodoApp.todos});
	TodoApp.todoList.render();
	TodoApp.todos.fetch();
});
