var app = {};

$(function() { //when DOM is ready...
	app.users = new UserCollection([
		{username:'do'},
		{username:'jesse'},
		{username:'mitch'}
	]);

	app.tasks = new TaskCollection([
		{
			title: 'finish project',
			description: "let's figure out backbone goddammit",
			creator: 'mitch',
			assignee: '',
			status: 'unassigned'
		},
		{
			title: 'eat a snack',
			description: "healthy one",
			creator: 'do',
			assignee: 'do',
			status: 'New'
		}
		// test data here
	]);


	app.gui = new GUI(app.users,
						app.tasks,
						'#app');// selector of main div
});
