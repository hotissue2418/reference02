/* 전 페이지 공통 헤더 동작
   ------------------------------------------------------------------
   스크롤이 시작되면 투명 헤더를 흰 배경 헤더로 전환하고,
   모바일 폭에서는 햄버거 버튼으로 우측 드로어 내비게이션을 연다. */

function headerScrollActive(){
	const $header = $(".header");
	if( $header.length === 0 ) return;
	$header.toggleClass("is-scrolled", $(window).scrollTop() > 10);
}

function mobileNavToggle(open){
	$("body").toggleClass("is-nav-open lock", open);
}

function mobileNavAccordionToggle(){
	$(".mobile-nav-arrow").on("click", function(){
		const $item = $(this).closest(".mobile-nav-item"),
			isOpen = $item.hasClass("is-open");

		$(".mobile-nav-item.is-open").not($item).removeClass("is-open").find(".mobile-nav-sub").stop().slideUp(300);
		$item.toggleClass("is-open", !isOpen).find(".mobile-nav-sub").stop().slideToggle(300);
	});
}

$(function(){
	headerScrollActive();
	$(window).on("scroll", headerScrollActive);

	$(".mobile-menu-btn").on("click", function(){
		mobileNavToggle( !$("body").hasClass("is-nav-open") );
	});

	$(".nav-dim").on("click", function(){
		mobileNavToggle(false);
	});

	mobileNavAccordionToggle();
});
