describe("TodoModel", function() {
	beforeEach(function() {
		this.server = sinon.fakeServer.create();

		this.todo = new TodoApp.Model.Todo({id: 1, done: true, label: 'test'});
		this.todo.collection = {url: '/todo'};
	});

	it("does a GET request on fetch", function() {
		this.todo.fetch();

		expect(this.server.requests.length).toEqual(1);
		expect(this.server.requests[0].method).toEqual("GET");
		expect(this.server.requests[0].url).toEqual("/todo/1");
	});

	it("does a POST request on creation", function() {
		var todo = new TodoApp.Model.Todo({done: true, label: 'test2'});
		todo.collection = {url: '/todo'};
		todo.save();

		expect(this.server.requests.length).toEqual(1);
		expect(this.server.requests[0].method).toEqual("POST");
		expect(this.server.requests[0].url).toEqual("/todo");
	});

	it("does a PUT request on save", function() {
		this.todo.save();

		expect(this.server.requests.length).toEqual(1);
		expect(this.server.requests[0].method).toEqual("PUT");
		expect(this.server.requests[0].url).toEqual("/todo/1");
	});

	it("does a DELETE request on deletion", function() {
		this.todo.destroy();

		expect(this.server.requests.length).toEqual(1);
		expect(this.server.requests[0].method).toEqual("DELETE");
		expect(this.server.requests[0].url).toEqual("/todo/1");
	});

	it("changes the 'done' value of the todo when toggled", function() {
		expect(this.todo.get('done')).toEqual(true);

		this.todo.toggle();

		expect(this.todo.get('done')).toEqual(false);
		expect(this.server.requests.length).toEqual(1);
		expect(this.server.requests[0].method).toEqual("PUT");
		expect(this.server.requests[0].url).toEqual("/todo/1");
		expect(this.server.requests[0].requestBody).toContain('"done":false')

		this.todo.toggle();

		expect(this.todo.get('done')).toEqual(true);
		expect(this.server.requests.length).toEqual(2);
		expect(this.server.requests[1].method).toEqual("PUT");
		expect(this.server.requests[1].url).toEqual("/todo/1");
		expect(this.server.requests[1].requestBody).toContain('"done":true')
	});
});
