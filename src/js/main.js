$(document).ready(function() {

	// Declare variables
		const source = $('#astro-template').html(),
					template = Handlebars.compile(source),
					$info = $('.info'),
					$count = $('#count'),
					api = '//api.open-notify.org/astros.json';

		function randomize(min, max) {
			return Math.floor(Math.random() * max - min) + min;
		}

		function getAstros() {
			$.getJSON(api, data => render(data));
		}

		function render(data) {
			let html = template(data);
			$info.html(html);
		}

		getAstros();

});
