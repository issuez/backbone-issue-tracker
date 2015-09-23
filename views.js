var TaskView,
		unassignedTasksView,
		userTasksView;

var GUI = (function(){ //IIFE for all Views

TaskView = Backbone.View.extend({
	className: "taskbox",
	render: function () {
		console.log("taskview render beginning");
		var title = "<h2>" + this.model.get('title') + "</h2>";
		var desc = "<p>" + this.model.get('description') + "</p>";
		var selector = $("<select id='assignee'>");
		var infobox = $("<div>");
		var creator = "<p>Creator: " + this.model.get('creator') + "</p>";
		var statusArr = ["Unassigned", "Assigned", "In Progress", "Done"];
		var statuses = "";
		for (var j=0; j<statusArr.length; j++) {
			if (this.model.get('status') === statusArr[j]){
				statuses += "<option selected='selected'>" + statusArr[j] + "</option>";
			} else {
			statuses += "<option>" + statusArr[j] + "</option>";
		}
		}
		selector.append(statuses);
		var assignee = "<p>Assignee: " + this.model.get('assignee') + "</p>";
		infobox.append(creator);
		this.$el.append(title).append(desc).append(selector).append(infobox);
		// this.$el.html(html);
		//Compose this.model into a view
	},
	initialize: function () {
		//initialize
		console.log("task view initializing");
		// this.model.on("change", this.render, this);
		this.render();
		// $("#app").append(this.$el);
	},
	events: {
		'click #description' : 'editDesc',
		'click #title' : 'editTitle',
		'change #assignee' : 'assign',
		'change #status' : 'statusUpdate'
	},
	editDesc: function () {

	},
	editTitle: function () {

	},
	assign: function (newAssignee) {
		console.log("TaskView assign method");
		this.model.statusUpdate(newAssignee.target.value);
		this.removeView();
		// else {
		// 	console.log("yes assignee!");
		// 	var statusArr = ["New", "In progress", "Done"];
		// 	var statuses = "";
		// 	for (var j=0; j<statusArr.length; j++) {
		// 		statuses += "<option>" + statusArr[j] + "</option>";
		// 	}
		// 	selector.append(statuses);
		// 	var assignee = "<p>Assignee: " + this.model.get('assignee') + "</p>";
		// 	taskbox.append(title).append(desc).append(selector).append(infobox);
		// 	infobox.append(creator);
		// 	this.$el.html(taskbox);
		// }
	},
	statusUpdate: function () {

	},
	removeView: function () {
		console.log("TaskLog remove method");
		this.remove();
	}
});

var CreateTaskView = Backbone.View.extend({
	render : function	() {
		if (!($('#title').length)) {
			var title = '<textarea id="title" placeholder="Title"></textarea>';
			var desc = '<textarea id="desc" placeholder="Description"></textarea>';
			var subButton = '<button id="submit"> Submit </button>';
				this.$el.append(title).append(desc).append(subButton);
	}
	},
	initialize : function () {
		var btn = '<button id="new">New Task</button>';
		this.$el.append(btn);
	},
	events : {
		'click #new' : 'render',
		'click #submit': 'removeView'
	},
	removeView : function () {
		this.addTask();
		$('#title, #desc, #submit').remove();
		// this.initialize();
	},
	addTask : function () {
		var title = $('#title').val();
		var desc = $('#desc').val();
		var newTask = {'title': title, 'description': desc};
		app.tasks.add(newTask);
	}
});

var UnassignedTasksView = Backbone.View.extend({
	id: "unassignedTasks",
	render: function () {

		console.log("UnassignedTasksView rendering");
	},
	initialize : function () {
		console.log("UnassignedTasksView initializing");
			// TODO: listen for added tasks
		this.listenTo(app.tasks, 'add', this.addView);
		this.listenTo(app.tasks, 'change:status', this.addView);
		// this.listenTo(Changes to this view and re-render)
		this.render();
	},
	events : {
		'click #submit' : 'addTask',
	},
	addView : function (newModel) {
		if(newModel.get('status') === 'Unassigned') {
			var view = new TaskView({model : newModel});
			this.$el.append(view.$el);
		}
	},

	// removeView: function (newModel) {
	// 	this.$el.remove(newModel);
	// 	// newModel.remove();
	// }
});

var UserTasksView = Backbone.View.extend({
	id: "userTasks",
	render: function () {
		console.log("UserTasksView rendering");
	},
	initialize : function () {
		console.log("UserTasksView initializing");
		this.listenTo(app.tasks, 'change:status', this.addView);
			// TODO: Listen for new assignees
			// this.listenTo(app.tasks, 'assign', this.addView);

			this.render();
			// this.listenTo(this.collection, 'remove', this.removeView);
	},
	addView : function (newModel) {
		if(newModel.get('status') !== 'Unassigned'){
		var view = new TaskView({model : newModel});
		this.$el.append(view.$el);
	}
},

});

var UserView = Backbone.View.extend({
	initialize: function () {
		unassignedTasksView = new UnassignedTasksView({collection: app.tasks});
		userTasksView = new UserTasksView({collection: app.tasks});
		createTaskView = new CreateTaskView();
		// unassignedTasksView.render();
		// userTasksView.render();

		this.$el.append(unassignedTasksView.$el);
		this.$el.append(userTasksView.$el);
		this.$el.append(createTaskView.$el);
		// this.listenTo(app.tasks, 'change:assignee', this.reassign);

	},
	reassign : function (newModel) {
		// var view = new TaskView({model: newModel});
		// newModel.set("value","Enter something here...");
		// var view = new TaskView({model : newModel});
		// view.render();
		this.$el.append(view.$el);
		// this.$el.append(newModel.$el);
		// this.render();

	}
});

var LoginView = Backbone.View.extend({

});

// generic ctor to represent interface:
function GUI(users,tasks,el) {

	var userView = new UserView({collection: tasks});
	$(el).append(userView.$el);
	// new task view
	// attach task view

	// users is collection of User models
	// tasks is collection of Task models
	// el is selector for where GUI connects in DOM

	//...
}

return GUI;
}())
