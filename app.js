const db = require('./db');
const { Movie, Person } = db.models;


(async () => {
	await db.sequelize.sync({ force: true });

	try {
		const movieInstances = await Promise.all([
			Movie.create({
				title: 'Inside Out',
				runtime: 95,
				releaseDate: '2015-06-19',
				isAvailableOnVHS: false,
			}),
			Movie.create({
				title: 'Harry Potter and the Sorcerers Stone',
				runtime: 152,
				releaseDate: '2001-11-14',
				isAvailableOnVHS: true,
			}),
			Movie.build({
				title: 'Inside Out 2',
				runtime: 105,
				releaseDate: '2024-06-19',
				isAvailableOnVHS: false,
			}),
		]);
		const moviesJSON = movieInstances.map(movie => movie.toJSON());
		console.log(moviesJSON);

		const personInstances = await Promise.all([
			Person.create({
				firstName: 'Amy',
				lastName: 'Poehler'
			}),
			Person.create({
				firstName: 'Daniel',
				lastName: 'Radcliffe'
			}),
		]);
		const personsJSON = personInstances.map(person => person.toJSON());
		console.log(personsJSON); 

	}	catch (error) {
		if (error.name === 'SequelizeValidationError') {
			const errors = error.errors.map(err => err.message);
			console.error('Validation errors: ', errors);
		} else {
			throw error;
		}
	}
})();

