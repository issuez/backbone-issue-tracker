var TaskView,
		unassignedTasksView,
		userTasksView;

var GUI = (function(){ //IIFE for all Views

TaskView = Backbone.View.extend({
	className: "taskbox",
	render: function () {
		// console.log("taskview render beginning");
		var title = "<h2>" + this.model.get('title') + "</h2>";
		var desc = "<p>" + this.model.get('description') + "</p>";
		var selector = $("<select id='status'>");
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
		infobox.append(creator).append(assignee);
		this.$el.append(title).append(desc).append(selector).append(infobox);
		// this.$el.html(html);
		//Compose this.model into a view
	},
	initialize: function () {
		//initialize
		// console.log("task view initializing");
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

	},
	statusUpdate: function (newStatus) {
		console.log("TaskView statusUpdate method");
		this.model.statusUpdate(newStatus.target.value);
		// this.removeView();
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
	// removeView: function () {
	// 	console.log("TaskLog remove method");
	// 	this.remove();
	// }
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
		var creator = localStorage.getItem('userName');
		var newTask = {'title': title, 'description': desc, 'creator': creator};
		app.tasks.add(newTask);
	}
});

var UnassignedTasksView = Backbone.View.extend({
	id: "unassignedTasks",
	render: function () {
		this.$el.remove();
		var title = '<h2> Unassigned Tasks</h2>';
		this.$el.append(title);
		var self = this;
		var unassigned = app.tasks.where({'status': 'Unassigned'});
		unassigned.forEach(function(e){
			console.log();
			var tasks = new TaskView({model: e});
			self.$el.append(tasks.$el);
		});
		// console.log("UnassignedTasksView rendering");
	},
	initialize : function () {
		console.log("UnassignedTasksView initializing");
		this.listenTo(app.tasks, 'add', this.addView);
		this.listenTo(app.tasks, 'change:status', this.render);
		// this.listenTo(Changes to this view and re-render)
		this.listenTo(app.tasks, 'update', this.render);
		this.render();
	},
	events : {
		'click #submit' : 'addTask',
		// 'click #login'	: 'render'
	},
	// addView : function (newModel) {
	// 	if(newModel.get('status') === 'Unassigned') {
	// 		var view = new TaskView({model : newModel});
	// 		this.$el.append(view.$el);
	// 	}
	// },

	// removeView: function (newModel) {
	// 	this.$el.remove(newModel);
	// 	// newModel.remove();
	// }
});

var UserTasksView = Backbone.View.extend({
	id: "userTasks",
	render: function () {
		var creator = localStorage.getItem('userName');
		var userTasks = app.tasks.where({'creator': creator});
		userTasks.forEach(function(e){
			var tasks = new TaskView({model: e});
		});
		// console.log("UserTasksView rendering");
	},
	initialize : function () {
		// console.log("UserTasksView initializing");
		this.listenTo(app.tasks, 'change:status', this.addView);
		this.listenTo(app.tasks, 'add', this.addView);
			// TODO: Listen for new assignees
			// this.listenTo(app.tasks, 'assign', this.addView);

			this.render();
			// this.listenTo(this.collection, 'remove', this.removeView);
	},
	addView : function (newModel) {
		if(newModel.get('creator') === localStorage.getItem('userName') || newModel.get('assignee') === localStorage.getItem('userName')){
		var view = new TaskView({model : newModel});
		this.$el.append(view.$el);
	}
},

});

var UserView = Backbone.View.extend({
	id: 'userView',
	render : function () {
		console.log('UserView Rendering');
		var logout = '<button id="logout"> Logout </button>';
		var title = '<h1> Hi ' + this.model.get('username') + ' !</h1>';
		// var cookie = localStorage.getItem('userName');
		// var userTasks = app.tasks.where({'assignee': cookie, 'creator': cookie });
		// console.log(userTasks)
		unassignedTasksView = new UnassignedTasksView({model: this.model});
		userTasksView = new UserTasksView({model: this.model});
		createTaskView = new CreateTaskView();

		// unassignedTasksView.render();
		// userTasksView.render();
		this.$el.remove();
		this.$el.append(logout);
		this.$el.append(title);
		this.$el.append(unassignedTasksView.$el);
		this.$el.append(userTasksView.$el);
		this.$el.append(createTaskView.$el);
	},
	initialize: function () {
		// app.tasks.fetch();
		// app.users.fetch();
		this.render();
		// app.tasks.add([
		// 	{
		// 		title: 'finish project',
		// 		description: "let's figure out backbone goddammit",
		// 		creator: 'mitch',
		// 		assignee: '',
		// 		status: 'Unassigned'
		// 	},
		// 	{
		// 		title: 'eat a snack',
		// 		description: "healthy one",
		// 		creator: 'do',
		// 		assignee: 'do',
		// 		status: 'New'
		// 	},
		// 	{
		// 		title: 'Third',
		// 		description: "not one",
		// 		creator: 'do',
		// 		assignee: '',
		// 		status: 'Unassigned'
		// 	}
		// 	// test data here
		// ]);
		// this.listenTo(app.tasks, 'change:assignee', this.reassign);
	},
	events : {
		'click #logout' : 'logout',
		'change #users' : 'render',
		'click #login'	: 'render'
	},
	reassign : function (newModel) {
		// var view = new TaskView({model: newModel});
		// newModel.set("value","Enter something here...");
		// var view = new TaskView({model : newModel});
		// view.render();
		this.$el.append(view.$el);
		// this.$el.append(newModel.$el);
		// this.render();

	},
	logout : function () {
		localStorage.clear();
		this.$el.remove();
		this.render();
		$('#loginView').show();
		// document.location.reload();
	}
});

var LoginView = Backbone.View.extend({
	id: 'loginView',
	render : function () {
		console.log("LoginView rendering");
		var welcome = '<h2 id=""></h2>';
		var selector = $("<select id='users'>");
		var users = "<option selected='selected'> </option>";
		var people = app.users.pluck('username');
		console.log(app.users);
		for (var j=0; j<people.length; j++) {
			users += "<option>" + people[j] + "</option>";
		}
		selector.append(users);
		this.$el.html(selector);
	},
	events : {
		'change #users' : 'setCookie',
		'click #logout' : 'initialize'
 	},
	initialize : function () {
		this.listenTo(UserView.logout, 'change', this.render);
		this.render();
		this.listenTo(app.users, 'update', this.render);
	},
	setCookie : function (newUser) {
		// console.log("Cookies are being set");
		var name = newUser.target.value;
		// console.log(name);
		// localStorage.setItem('userName', name);
		// var person = app.users.pluck('username');
		// var num = person.indexOf(name);
		// var neoUser = new UserModel({"id": num});
		var neoUser = app.users.where({username: name})[0];
		var userView = new UserView({"model": neoUser});
		// console.log('neoUser', neoUser);
		$('#app').html(userView.$el);
	},
});

// generic ctor to represent interface:
function GUI(users,tasks,el) {
	var loginView = new LoginView({collection: users});
	// var userView = new UserView({collection: tasks});
	// if(localStorage.getItem('userName')) {
		// $(el).append(userView.$el.hide());
	// } else {
		$(el).append(loginView.$el);
	// }
	// new task view
	// attach task view

	// users is collection of User models
	// tasks is collection of Task models
	// el is selector for where GUI connects in DOM

	//...
}

return GUI;
}());
