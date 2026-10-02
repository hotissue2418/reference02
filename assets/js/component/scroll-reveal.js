/* 전 페이지 공통 스크롤 리빌
   ------------------------------------------------------------------
   섹션(.sect)이 뷰포트에 들어올 때마다 슬라이드업 되며 나타난다.
   한 번 나타난 섹션은 다시 스크롤해서 벗어나도 상태를 유지한다.
   히어로(.sect-main-visual)는 첫 화면이라 대상에서 제외한다(scroll-reveal.css 참고). */

function scrollRevealInit(){
	const $sections = $(".sect").not(".sect-main-visual");
	if( $sections.length === 0 ) return;
	if( !("IntersectionObserver" in window) ){
		$sections.addClass("is-active");
		return;
	}
	const observer = new IntersectionObserver(function(entries){
		entries.forEach(function(entry){
			if( entry.isIntersecting === false ) return;
			entry.target.classList.add("is-active");
			observer.unobserve(entry.target);
		});
	}, {
		threshold:0.15,
		rootMargin:"0px 0px -60px 0px"
	});
	$sections.each(function(){
		observer.observe(this);
	});
}

$(function(){
	scrollRevealInit();
});
