$(document).ready(function() {

		const source = $('#astro-template').html(),
					template = Handlebars.compile(source),
					$info = $('.info'),
					$count = $('#count'),
					$window = $(window),
					ctx = $('canvas.stars')[0].getContext('2d'),
					cW = $window.width(),
					cH = $window.height(),
					numStars = 100,
					minSize = 1,
					maxSize = 2,
					stars = [],
					api = '//api.open-notify.org/astros.json';

		ctx.canvas.width = cW;
		ctx.canvas.height = cH;

		function drawCanvas() {
			ctx.clearRect(0, 0, cW, cH);
			ctx.fillStyle = 'rgba(0, 0, 0, .15)';
			ctx.fillRect(0, 0, cW, cH);
		}

		function createStars() {
			for (let i = 0; i < numStars; i++) {
				let star = {
					x: randomize(0, cW),
					y: randomize(0, cH),
					s: randomize(minSize, maxSize),
					opacity: Math.random(),
					inc: Math.random() * .03,
					factor: randomFactor()
				};
				stars.push(star);
			}
			console.log('Create stars:', stars)
		}

		function drawStars() {
			for (let i = 0; i < stars.length; i++) {
				ctx.beginPath();
				ctx.fillStyle = `rgba(255, 255, 255, ${stars[i].opacity})`;
				ctx.arc(stars[i].x, stars[i].y, stars[i].s, 0, Math.PI * 2, false);
				ctx.fill();
			}

			glow();
		}

		function glow() {
			console.log('Glow:', stars[0]);
			drawCanvas();
			for (let i = 0; i < stars.length; i++) {
				if (stars[i].opacity > 1) {
					stars[i].factor = -1;
				}
				else if (stars[i].opacity <= 0) {
					stars[i].factor = 1;
					stars[i].x = randomize(0, cW);
					stars[i].y = randomize(0, cH);
				}
				stars[i].opacity += stars[i].inc * stars[i].factor;

				ctx.beginPath();
				ctx.fillStyle = `rgba(255, 255, 255, ${stars[i].opacity})`;
				ctx.arc(stars[i].x, stars[i].y, stars[i].s, 0, Math.PI * 2, false);
				ctx.fill();
			}

			window.requestAnimationFrame(glow);
		}

		function randomize(min, max) {
			return Math.floor(Math.random() * max - min) + min;
		}

		function randomFactor() {
			return (Math.round(Math.random()) === 1) ? 1 : - 1;
		}

		function getAstros() {
			$.getJSON(api, data => render(data));
		}

		function render(data) {
			let html = template(data);
			$info.html(html);
		}

		function init() {
			getAstros();
			drawCanvas();
			createStars();
			drawStars();
		}

		init();

});
