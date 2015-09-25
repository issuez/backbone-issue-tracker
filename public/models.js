var UserModel = Backbone.Model.extend({
	defaults: {
		username:''
	},
	urlRoot: '/users',
});

var TaskModel = Backbone.Model.extend({
	defaults: {
		title:'',
		description:'',
		creator:'',
		assignee:'',
		status:'Unassigned',
	},
	urlRoot: '/tasks',
	initialize: function (opts) {
		// _.extend(this, opts);
		if(opts) {
		this.fetch();
	} else {
		this.createTask();
	}
	},
	assign: function (newUser) {
		//Change assignment to another person
		this.set('assignee', newUser);
		this.save();
	},
	statusUpdate: function (newStatus) {
		//Set new status
		this.set('status', newStatus);
	},
	editTitle: function (newTitle) {
		this.set('title', newTitle);
		//Update title
	},
	editDescription: function (newDesc) {
		this.set('description', newDesc);
		//Update desc
	},
	createTask : function() {
		this.save();
		this.fetch();
	}
	// Add methods if needed...
	//TODO: Copy this
	// var TextField = Backbone.Model.extend({
	//   defaults: {"string": ""},
	//   add: function (newText) {
	//     var str = this.get("string");
	//     this.set("string", str + " " + newText);
	//   }
	// });
});

var UserCollection = Backbone.Collection.extend({
	model:UserModel,
	url:'/users',
	initialize: function () {
		this.fetch();
	}
});


var TaskCollection = Backbone.Collection.extend({
	model:TaskModel,
	url:'/tasks',
	initialize : function () {
		this.fetch();
	}
});
