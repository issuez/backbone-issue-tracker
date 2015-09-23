var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection([
		{username:'do'},
		{username:'jesse'},
		{username:'mitch'}
	]);

	app.tasks = new TaskCollection();
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


	app.gui = new GUI(app.users,
						app.tasks,
						'#app');// selector of main div
});
