export default function(app) {

	var api = app.api.frases;

	app.route('frases/')
		.get(api.lista);
};
