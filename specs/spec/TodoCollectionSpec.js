describe("TodoModel", function() {
	beforeEach(function() {
		this.server = sinon.fakeServer.create();

		this.server.respondWith("GET", "/todo", [200, '',
			JSON.stringify([
				{id: 1, done: false, label: 'test1'},
				{id: 2, done: false, label: 'test2'},
			])
		]);

		this.todos = new TodoApp.Collection.Todo();
	});

	it("fetches new todos", function() {
		expect(this.todos.length).toEqual(0);

		this.todos.fetch();

		expect(this.server.requests.length).toEqual(1);
		expect(this.server.requests[0].method).toEqual("GET");
		expect(this.server.requests[0].url).toEqual("/todo");

		this.server.respond();

		expect(this.todos.length).toEqual(2);
		expect(this.todos.first().get('label')).toEqual('test1');
	});
});
