/* footer reveal 효과
   ------------------------------------------------------------------
   footer는 fixed로 화면 하단에 깔려있고, #container가 그 위에서 불투명하게
   가리고 있다가 문서 끝까지 스크롤되면 아래에서 드러난다. #container 하단에
   footer 높이만큼 여백을 확보해줘야 그만큼 더 스크롤할 수 있다.
   모바일/태블릿(footer.css 미디어쿼리)에서는 footer가 position:static인
   일반 노출 방식이라 이 여백이 필요 없다. */

function footerRevealSpace(){
	const $footer = $(".footer"),
		$container = $("#container");
	if( $footer.length === 0 || $container.length === 0 ) return;
	if( $footer.css("position") !== "fixed" ){
		$container.css("margin-bottom", "");
		return;
	}
	$container.css("margin-bottom", $footer.outerHeight());
}

$(function(){
	footerRevealSpace();
	$(window).on("load resize", footerRevealSpace);
});
