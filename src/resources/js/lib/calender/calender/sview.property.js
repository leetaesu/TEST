/**
 * 서버 환경에 따라 contextpath 등을 고려하여 어플리케이션에서 사용하는 글로벌 리소스 path 변수 
 */
//iamtheman 수정포인트
var SVIEW_DOCUMENT_BASE = "/";
sview.contextpath = {
		//iamtheman 수정포인트
		/*
		 * sview컴포넌트 위치 (서버기준 루트경로 권장) sview 컴포넌트에서 공통으로사용하는 경로
		 */
		component : "/" + SVIEW_DOCUMENT_BASE + "resources/js/lib/calender/",
		
		/*
		 * SVIEW 컴포넌트 관련 JS 배포시 강제 부라우져 캐쉬 강제를위한 쿼리 스트링 관리
		 */
		SVIEW_VERSION : "3.2",		
};

/**
 * 공통 SVIEW 컴포넌트 관련 전역 정보
 */
sview.common.prop = {
	pageLanguage : "KOR",//SVIEW 컴포넌트 다국어 설정 (다국어는 sview.message.js 참조)
	styleThema : "styleThema1", //SVIEW 컴포넌트 스타일 테마 설정
};