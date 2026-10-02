/* 마우스를 따라다니는 커스텀 커서 (PC 전용)
   ------------------------------------------------------------------
   실제 포인터는 숨기고(css/component/cursor.css의 body{cursor:none}),
   점(.cursor-inner)과 원(.cursor-outer)이 매 프레임 마우스 좌표를 그대로
   따라간다. footer는 배경이 어두워서 그 위에 있는 동안만 흰색(.on)으로
   바뀐다. */

function customCursorMove(){
	const $cursorInner = $(".cursor-inner"),
		$cursorOuter = $(".cursor-outer");
	if( $cursorInner.length === 0 || $cursorOuter.length === 0 ) return;

	let mouseX = -100,
		mouseY = -100;

	$(document).on("mousemove", function(e){
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	(function render(){
		const transform = "translate3d(" + mouseX + "px," + mouseY + "px,0)";
		$cursorInner[0].style.transform = transform;
		$cursorOuter[0].style.transform = transform;
		requestAnimationFrame(render);
	})();
}

function customCursorFooterState(){
	const $footer = $(".footer");
	if( $footer.length === 0 ) return;

	$footer.on("mouseenter", function(){
		$(".cursor-inner, .cursor-outer").addClass("on");
	});
	$footer.on("mouseleave", function(){
		$(".cursor-inner, .cursor-outer").removeClass("on");
	});
}

$(function(){
	customCursorMove();
	customCursorFooterState();
});
