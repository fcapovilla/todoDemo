describe("TodoView", function() {
	beforeEach(function() {
		this.todo = new TodoApp.Model.Todo({id: 1, done: true, label: 'test'});

		this.view = new TodoApp.View.Todo({model: this.todo});
		this.view.render();
	});

	it("renders the todo item.", function() {
		expect(this.view.el.nodeName).toEqual("LI");
		expect(this.view.$el.text()).toContain("test");
	});

	it("deletes the item when the delete button is clicked.", function() {
		spyOn(this.todo, 'destroy');

		this.view.$el.find('.delete').click();

		expect(this.todo.destroy).toHaveBeenCalled();
	});
});
