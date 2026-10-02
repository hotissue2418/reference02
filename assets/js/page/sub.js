/* 서브 페이지 전용 스크립트
   ------------------------------------------------------------------
   서브 비주얼 배경 패럴랙스. 원본(Salient row-bg translate)과 동일하게
   스크롤한 거리의 0.6배만큼 배경을 아래로 이동시킨다. */

function subVisualParallax(){
	$(".sect-sub-visual, .sect-gentlemax-visual, .sect-lifting-visual").each(function(){
		const $visual = $(this),
			$bg = $visual.find(".sub-visual-bg, .gentlemax-visual-bg, .lifting-visual-bg"),
			speed = parseFloat($visual.data("parallax-speed")) || 0.6;
		if( $bg.length === 0 ) return;

		let ticking = false;

		function update(){
			const scrollTop = $(window).scrollTop();
			ticking = false;
			if( scrollTop > $visual.outerHeight() + $visual.offset().top ) return;
			$bg.css("transform", "translate3d(0," + Math.round(scrollTop * speed) + "px,0)");
		}

		update();
		$(window).on("scroll", function(){
			if( ticking ) return;
			ticking = true;
			window.requestAnimationFrame(update);
		});
	});
}

$(function(){
	subVisualParallax();
});

/* 등장 애니메이션
   ------------------------------------------------------------------
   .ani-fade-* 요소가 뷰포트 하단 10% 안쪽으로 들어오면 is-active 를 한 번만 붙인다.
   지연 시간은 sub.css 의 .ani-delay-* 가 처리한다. */
function subAniReveal(){
	const $targets = $(".ani-fade-bottom, .ani-fade-right, .ani-fade-left, .ani-fade-in");
	if( $targets.length === 0 ) return;
	if( !("IntersectionObserver" in window) ){
		$targets.addClass("is-active");
		return;
	}
	const observer = new IntersectionObserver(function(entries){
		entries.forEach(function(entry){
			if( entry.isIntersecting === false ) return;
			entry.target.classList.add("is-active");
			observer.unobserve(entry.target);
		});
	}, {
		rootMargin:"0px 0px -10% 0px"
	});
	$targets.each(function(){
		observer.observe(this);
	});
}

$(function(){
	subAniReveal();
});

/* 행(row) 배경 패럴랙스
   ------------------------------------------------------------------
   .sect-gentlemax-parallax 가 화면 하단에 들어오는 순간부터 지나갈 때까지,
   배경(.gentlemax-parallax-bg)을 (스크롤 + 화면높이 - 섹션 top)의 0.6배만큼 아래로 이동시킨다.
   배경은 CSS 에서 섹션 아래쪽에 맞춰 위로 61vh 만큼 더 크게 잡아 두었다.
   행에 data-parallax-speed 가 있으면 그 값을 속도로 쓴다(원본 fast = 0.25, 이때 CSS 는 25vh + 60px). */
function subRowParallax(){
	const $rows = $(".sect-gentlemax-parallax, .sect-lifting-parallax"),
		speed = 0.6;
	if( $rows.length === 0 ) return;

	let ticking = false;

	function update(){
		const scrollTop = $(window).scrollTop(),
			winH = $(window).height();
		ticking = false;
		$rows.each(function(){
			const $row = $(this),
				dist = scrollTop + winH - $row.offset().top,
				rowSpeed = parseFloat($row.data("parallax-speed")) || speed;
			if( dist < 0 || dist > winH + $row.outerHeight() ) return;
			$row.find(".gentlemax-parallax-bg, .lifting-parallax-bg").css("transform", "translate3d(0," + (dist * rowSpeed).toFixed(2) + "px,0) scale(1.005)");
		});
	}

	update();
	$(window).on("scroll resize", function(){
		if( ticking ) return;
		ticking = true;
		window.requestAnimationFrame(update);
	});
}

$(function(){
	subRowParallax();
});

/* 진료일정 휴무 달력 슬라이더 (FlexSlider v2.2.2, 원본 옵션: fade / 500ms / 7초 자동재생 / 페이징 숨김) */
function scheduleSliderAction(){
	const $slider = $(".schedule-slider");
	if( $slider.length === 0 || typeof $.fn.flexslider !== "function" ) return;

	$slider.flexslider({
		animation:"fade",
		animationSpeed:500,
		slideshow:true,
		slideshowSpeed:7000,
		controlNav:false,
		directionNav:true,
		prevText:"<span class=\"blind\">이전 달</span>",
		nextText:"<span class=\"blind\">다음 달</span>"
	});
}

$(window).on("load", function(){
	scheduleSliderAction();
});
