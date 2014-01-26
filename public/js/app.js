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


TodoApp.View.Todo = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#tmpl_todo').html()),

	events: {
		'click .delete': 'delete',
		'click .edit': 'edit',
		'click .done': 'toggleDone',
		"keypress .label":  "updateOnEnter"
	},

	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
    },

	render: function() {
		this.$el.html( this.template(this.model.attributes) );

		if(this.model.get('editing') === true) {
			this.$('.label').focus();
		}

		return this;
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

TodoApp.View.TodoList = Backbone.View.extend({
	el: '#content',
	template: _.template($('#tmpl_todo_list').html()),

	events: {
		'click .newTodo': 'newTodo'
	},

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
		this.$("ul").prepend(view.render().el);
	},

	addAll: function() {
		this.render();
		this.collection.each(this.addOne, this);
	},

	newTodo: function() {
		this.collection.add({label: '', done: false, editing: true});
	}
});


$(function() {
	TodoApp.todos = new TodoApp.Collection.Todo();
	TodoApp.todoList = new TodoApp.View.TodoList({collection: TodoApp.todos});
	TodoApp.todos.fetch();
});
