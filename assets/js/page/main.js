/* 메인 페이지(신촌) 전용 스크립트
   ------------------------------------------------------------------
   히어로 배너와 시술 소개 캐러셀에 Swiper를 초기화한다. */

$(function(){
	if( typeof Swiper === "undefined" ) return;

	new Swiper(".main-visual-swiper", {
		loop:true,
		effect:"fade",
		fadeEffect:{ crossFade:true },
		autoplay:{ delay:4500, disableOnInteraction:false },
		speed:800
	});

	new Swiper(".procedure-swiper", {
		slidesPerView:"auto",
		centeredSlides:true,
		spaceBetween:20,
		loop:true,
		autoplay:{ delay:4000, disableOnInteraction:false },
		speed:600,
		pagination:{
			el:".procedure-swiper .swiper-pagination",
			clickable:true
		}
	});
});

/* 1mm 섹션 - 아이콘 4개 좌→우 순차 노출
   ------------------------------------------------------------------
   .concept-list가 뷰포트에 들어오는 시점에 is-active를 한 번만 붙이고,
   각 아이콘의 순차 딜레이는 main.css의 nth-child transition-delay가
   처리한다(레퍼런스 사이트의 컬럼별 400ms 간격 애니메이션과 동일). */
function conceptListReveal(){
	const $list = $(".concept-list");
	if( $list.length === 0 ) return;
	if( !("IntersectionObserver" in window) ){
		$list.addClass("is-active");
		return;
	}
	const observer = new IntersectionObserver(function(entries){
		entries.forEach(function(entry){
			if( entry.isIntersecting === false ) return;
			entry.target.classList.add("is-active");
			observer.unobserve(entry.target);
		});
	}, {
		threshold:0.2,
		rootMargin:"0px 0px -60px 0px"
	});
	$list.each(function(){
		observer.observe(this);
	});
}

/* 1mm 섹션 - 사진 패럴랙스
   ------------------------------------------------------------------
   레퍼런스 사이트(Salient/Nectar 테마)의 CascadingParallax를 그대로 이식했다.
   레퍼런스는 사진을 별도 틀로 잘라내지 않는다(overflow 마스킹 없음) —
   .concept-photo가 만드는 "영역"은 레이아웃 상의 여백만 잡아줄 뿐이고,
   scaleY(1.2)로 세로만 확대된 사진 자체가 그 영역 위/아래 경계 밖으로
   살짝 걸쳐 나온 채 통째로 위아래로 움직인다. 그래서 움직이는 건 틀 안의
   콘텐츠가 아니라 사진(영역) 자체다. PC에서는 가로를 scale하지 않아 항상
   container 폭 안에 머물고, 모바일·태블릿(1023px 이하)은 레퍼런스처럼 가로세로
   모두 1.2배 확대되어 container 밖으로 나온다.
   - lastY는 실제 scrollY를 그대로 쓰지 않고 매 프레임 18%씩 뒤쫓아가는
     lerp 값이라, 스크롤을 멈춰도 몇 프레임 동안 관성처럼 따라붙는다.
   - offset은 "섹션 중심이 뷰포트 중심을 지났는지"를 기준으로 하기 때문에
     섹션이 화면 아래쪽에 있을 땐 사진이 살짝 내려가 있다가, 스크롤해서
     중심을 지나 위로 올라갈수록 사진이 조금씩 더 위로 밀려 올라간다.
   - 화면 밖(IntersectionObserver 기준)에서는 계산을 멈춰 불필요한 연산을
     줄인다. */
function conceptPhotoParallax(){
	const $wrap = $(".concept-photo");
	const $img = $(".concept-photo-box");
	if( $wrap.length === 0 || $img.length === 0 ) return;
	const img = $img[0];
	const intensity = 0.045; // 레퍼런스 값(0.09)의 절반 — 움직이는 범위를 절반으로 줄임
	const layerFactor = (1 / 1.5) + 1;
	let offsetTop = 0,
		vertCenter = 0,
		lastY = window.scrollY,
		inView = false;

	function calculatePos(){
		offsetTop  = $wrap.offset().top;
		vertCenter = $(window).height() / 2 - $wrap.outerHeight() / 2;
	}

	function tick(){
		if( inView ){
			lastY = 0.82 * lastY + 0.18 * window.scrollY;
			const offset = (lastY - offsetTop + vertCenter) * intensity * layerFactor;
			// 모바일·태블릿(1023px 이하)은 레퍼런스와 같이 가로세로 균일 1.2배 확대
				const scale = window.innerWidth <= 1023 ? "scale(1.2)" : "scaleY(1.2)";
				img.style.transform = scale + " translate3d(0," + (-offset).toFixed(1) + "px,0)";
		}
		requestAnimationFrame(tick);
	}

	calculatePos();
	$(window).on("resize", calculatePos);

	if( "IntersectionObserver" in window ){
		new IntersectionObserver(function(entries){
			entries.forEach(function(entry){ inView = entry.isIntersecting; });
		}, { rootMargin:"250px" }).observe($wrap[0]);
	} else {
		inView = true;
	}

	requestAnimationFrame(tick);
}

/* 배너(하이라이트) 섹션 - flip-in-vertical 순차 노출
   ------------------------------------------------------------------
   레퍼런스 사이트는 이미지 2장이 뒤로 45도 젖혀진 채 숨어있다가, 뷰포트에
   들어오면 앞으로 세워지며(rotateX) 나타난다(테마의 flip-in-vertical
   애니메이션과 동일, 300ms 간격으로 순차 노출). */
function highlightListReveal(){
	const $list = $(".highlight-list");
	if( $list.length === 0 ) return;
	if( !("IntersectionObserver" in window) ){
		$list.addClass("is-active");
		return;
	}
	const observer = new IntersectionObserver(function(entries){
		entries.forEach(function(entry){
			if( entry.isIntersecting === false ) return;
			entry.target.classList.add("is-active");
			observer.unobserve(entry.target);
		});
	}, {
		threshold:0.2,
		rootMargin:"0px 0px -60px 0px"
	});
	$list.each(function(){
		observer.observe(this);
	});
}

$(function(){
	conceptListReveal();
	conceptPhotoParallax();
	highlightListReveal();
});
