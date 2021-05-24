class HeroSlider {
	constructor(el) {
		this.el = el;
		this.swiper = this._initSwiper();
	}

	_initSwiper = () => {
		return new Swiper(this.el, {
			// Optional parameters
			// direction: "vertical",
			loop: true,
			effect: "coverflow",
			centeredSlides: true,
			slidesPerView: 1,
			speed: 1000,
			breakpoints: {
				1024: {
					slidesPerView: 2,
				},
			},
		});
	};

	start = (options = {}) => {
		console.log(this.swiper.params); //ここにオプションが格納されている
		//autoplayのオブジェクトを上書きする
		//Object.assignで上書きをしている
		options = Object.assign(
			{
				delay: 4000,
				disableOnInteraction: true,
			},
			options
		);
		this.swiper.params.autoplay = options;
		this.swiper.autoplay.start(); //swiper jsに組み込まれているメソッド
	};

	stop = () => {
		this.swiper.autoplay.stop(); //swiper jsに組み込まれているメソッド
	};
}
