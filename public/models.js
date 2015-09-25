var UserModel = Backbone.Model.extend({
	defaults: {
		username:''
	}
});

var TaskModel = Backbone.Model.extend({
	defaults: {
		title:'',
		description:'',
		creator:'',
		assignee:'',
		status:'Unassigned',
	},
	initialize: function (opts) {
		_.extend(this, opts);
		this.fetch();
	},
	assign: function (newUser) {
		//Change assignment to another person
		this.set('assignee', newUser);
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
	url:'/user'
});


var TaskCollection = Backbone.Collection.extend({
	model:TaskModel,
	url:'/tasks',
	initialize : function () {
		this.fetch();
	}
});
