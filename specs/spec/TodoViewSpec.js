describe("TodoView", function() {
	beforeEach(function() {
		this.server = sinon.fakeServer.create();

		this.todo = new TodoApp.Model.Todo({id: 1, done: true, label: 'test'});
		this.todo.collection = {url: '/todo'};

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

	it("displays a text input when the edit button is clicked.", function() {
		expect(this.view.$el.find('input[type="text"]').length).toEqual(0);
		expect(this.todo.get('editing')).toEqual(false);

		this.view.$el.find('.edit').click();

		expect(this.view.$el.find('input[type="text"]').length).toEqual(1);
		expect(this.todo.get('editing')).toEqual(true);
	});

	it("updates the todo when 'Enter' is pressed", function() {
		spyOn(this.todo, 'save');
		this.view.$el.find('.edit').click();

		var input = this.view.$el.find('input[type="text"]');
		var keypress = $.Event('keypress');
		keypress.keyCode = 13

		input.val('UPDATED VALUE');
                input.trigger(keypress);

		expect(this.todo.save).toHaveBeenCalled();
	});

	it("does nothing if 'Enter' is pressed with no value", function() {
		spyOn(this.todo, 'save');
		this.view.$el.find('.edit').click();

		var input = this.view.$el.find('input[type="text"]');
		var keypress = $.Event('keypress');
		keypress.keyCode = 13

		input.val('');
                input.trigger(keypress);

		expect(this.todo.save).not.toHaveBeenCalled();
	});

	it("toggles the 'done' value if the element is changed", function() {
		spyOn(this.todo, 'toggle').and.callThrough();
		expect(this.view.$el.find('s').length).toEqual(1);

		this.view.$el.find('.done').change();

		expect(this.view.$el.find('s').length).toEqual(0);
		expect(this.todo.toggle.calls.count()).toEqual(1);

		this.view.$el.find('.done').change();

		expect(this.view.$el.find('s').length).toEqual(1);
		expect(this.todo.toggle.calls.count()).toEqual(2);
	});
});
