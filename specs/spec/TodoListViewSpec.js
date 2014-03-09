describe("TodoListViewSpec", function() {
	beforeEach(function() {
		this.server = sinon.fakeServer.create();

		this.server.respondWith("GET", "/todo", [200, '',
			JSON.stringify([
				{id: 1, done: false, label: 'test1'},
				{id: 2, done: false, label: 'test2'},
			])
		]);

		this.todos = new TodoApp.Collection.Todo();
		this.view = new TodoApp.View.TodoList({collection: this.todos, el: ''});

		// To fetch fake items
		this.todos.fetch();
		this.server.respond();
	});

	describe("Rendering", function() {
		it("renders all items", function() {
			expect(this.view.children.length).toEqual(2);
			expect(this.view.$el.find('li').length).toEqual(2);
		});
	});
});
