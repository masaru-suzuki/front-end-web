document.addEventListener("DOMContentLoaded", function () {
	const main = new Main();
});

class Main {
	constructor() {
		this.header = document.querySelector(".header");
		this.sides = document.querySelectorAll(".side");
		this._observers = [];
		this._init();
	}
	_init() {
		new MobileMenu();
		this.hero = new HeroSlider(".swiper-container");
		// this._scrollInit();
		Pace.on("done", this._paceDone);
	}
	_paceDone = () => {
		this._scrollInit();
	};

	_navAnimation = (el, inview) => {
		if (inview) {
			this.header.classList.remove("triggered");
		} else {
			this.header.classList.add("triggered");
		}
	};
	_sideAnimation = (el, inview) => {
		if (inview) {
			this.sides.forEach((side) => side.classList.add("inview"));
		} else {
			this.sides.forEach((side) => side.classList.remove("inview"));
		}
	};
	_inviewAnimation = (el, inview) => {
		if (inview) {
			el.classList.add("inview");
		} else {
			el.classList.remove("inview");
		}
	};
	_textAnimation = function (el, isIntersecting) {
		// console.log(el instanceof HTMLElement);
		if (isIntersecting) {
			const ta = new TweenTextAnimation(el);
			ta.animate();
		}
	};
	_toggleSlideAnimation = (el, inview) => {
		if (inview) {
			this.hero.start();
		} else {
			this.hero.stop();
		}
	};

	set observers(val) {
		this._observers.push(val);
	}
	get observers() {
		return this._observers;
	}
	_scrollInit() {
		this.observers = new ScrollObserver(".scroll-trigger", this._navAnimation, {
			once: false,
		});
		this.observers = new ScrollObserver(".cover-slide", this._inviewAnimation, {
			once: false,
		});
		this.observers = new ScrollObserver(
			".travel__title",
			this._inviewAnimation,
			{
				once: false,
			}
		);
		this.observers = new ScrollObserver(
			".tween-animate-title",
			this._textAnimation,
			{
				once: true,
			}
		);

		this.observers = new ScrollObserver(
			".swiper-container",
			this._toggleSlideAnimation,
			{
				once: false,
			}
		);
		this.observers = new ScrollObserver(".appear", this._inviewAnimation, {
			once: false,
		});
		this.observers = new ScrollObserver("#main-content", this._sideAnimation, {
			once: false,
			rootMargin: "-300px 0px",
		});
		// console.log(this.observers);
		// 		this.observers.push(
		// 			new ScrollObserver(".cover-slide", this._inviewAnimation, {
		// 				once: false,
		// 			})
		// 		);
		// this.observers.push(
		// 	new ScrollObserver(".travel__title", this._inviewAnimation, {
		// 		once: false,
		// 	})
		// );
		// this.observers.push(
		// 	new ScrollObserver(".tween-animate-title", this._textAnimation)
		// );
		// this.observers.push(
		// 	new ScrollObserver(".swiper-container", this._toggleSlideAnimation, {
		// 		once: false,
		// 	})
		// );
	}
}
