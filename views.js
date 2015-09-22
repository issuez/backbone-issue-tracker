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
		var users = app.users.pluck("username"); //????
		users.unshift(" ");
		var userOption = "";
		for (var i=0; i<users.length; i++) {
			userOption += "<option>" + users[i] + "</option>";
		}
		selector.append(userOption);
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
		this.model.assign(newAssignee.target.value);
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

});

var UnassignedTasksView = Backbone.View.extend({
	id: "unassignedTasks",
	render: function () {
		var btn = '<button>New Task</button>';
		console.log("UnassignedTasksView rendering");
	},
	initialize : function () {
		console.log("UnassignedTasksView initializing");
			// TODO: listen for added tasks
		this.listenTo(app.tasks, 'add', this.addView);
		this.listenTo(app.tasks, 'change:assignee', this.render);
		// this.listenTo(Changes to this view and re-render)
		this.render();
	},
	addView : function (newModel) {
		var view = new TaskView({model : newModel});
		this.$el.append(view.$el);
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
		this.listenTo(app.tasks, 'change:assignee', this.addView);
			// TODO: Listen for new assignees
			// this.listenTo(app.tasks, 'assign', this.addView);

			this.render();
			// this.listenTo(this.collection, 'remove', this.removeView);
	},
	addView : function (newModel) {
		var view = new TaskView({model : newModel});
		this.$el.append(view.$el);
	}
});

var UserView = Backbone.View.extend({
	initialize: function () {
		// this.listenTo(app.tasks, 'change:assignee', this.reassign);

	},
	reassign : function (newModel) {
		console.log("reassign method of UserTasksView");
		console.log(newModel);
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
unassignedTasksView = new UnassignedTasksView({collection: tasks});
userTasksView = new UserTasksView({collection: tasks});

// unassignedTasksView.render();
// userTasksView.render();

$(el).append(unassignedTasksView.$el);
$(el).append(userTasksView.$el);

	// new task view
	// attach task view

	// users is collection of User models
	// tasks is collection of Task models
	// el is selector for where GUI connects in DOM

	//...
}

return GUI;
}())
