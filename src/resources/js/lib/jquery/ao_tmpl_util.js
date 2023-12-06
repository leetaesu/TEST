/*!
 * AlphaOmega Util JS
 * Copyright (c) 2020 Kang,dong-hyeon
 * Examples and documentation at: https://hidongh.tistory.com/13
 * Dual licensed under the MIT and GPL licenses.
 */
function ao_init(id_aoSuperBlock, callbackFn) { // aoSuperBlock 포함한 하위의 aoBlock 최초 캐싱   
  if (!ao_tmpl.remarkBlock[id_aoSuperBlock]) { // 캐싱 저장소인 remarkBlock 전역변수 체크
	var aoSuperBlock = null;
	try { aoSuperBlock = document.querySelector(id_aoSuperBlock); } catch(e) { console.log(e); }     
    ao_tmpl.separate(aoSuperBlock ? aoSuperBlock.innerHTML : id_aoSuperBlock);
    if (callbackFn) callbackFn(true);
  } else {
    if (callbackFn) callbackFn(false);
  }
}
/**
 * ao_html() : id_tmpl 영역 ao_tmpl.link 적용 후, id_rndr 영역 innerHTML 적용
 * @param id_rndr : 렌더링 영역 id for querySelector
 * @param id_tmpl : 템플릿 영역 id for querySelector (object 타입이면 obj_dataItem으로 취함. id_tmpl=id_rndr 치환)
 * @param obj_dataItem : an item object for mapping to tmpl
 * @return N/A
 */
function ao_html(id_rndr, id_tmpl, obj_dataItem) {
	if (typeof obj_dataItem == "undefined") {
		obj_dataItem = id_tmpl; id_tmpl = id_rndr + '_tmpl'; // ao_tmpl v1.7 이상이 필요
	}		
		
	if (typeof obj_dataItem != 'object') {
		obj_dataItem = {'': obj_dataItem};
	}
	
	document.querySelector(id_rndr).innerHTML = ao_tmpl.link(id_tmpl, obj_dataItem);
	// $(id_rndr).html( ao_tmpl.link(id_tmpl, obj_dataItem) );
}
/**
 * ao_append() : id_tmpl 영역 ao_tmpl.link 적용 후, id_rndr 영역 insertAdjacentHTML() 함수 적용
 * @param id_rndr : 렌더링 영역 id for querySelector
 * @param id_tmpl : 템플릿 영역 id for querySelector (object 타입이면 obj_dataItem으로 취함. id_tmpl=id_rndr 치환)
 * @param obj_dataItem : an item object for mapping to tmpl
 * @return N/A
 */
function ao_append(id_rndr, id_tmpl, obj_dataItem) {
	if (typeof obj_dataItem == "undefined") {
		obj_dataItem = id_tmpl; id_tmpl = id_rndr + '_tmpl'; // ao_tmpl v1.7 이상이 필요
	}		
		
	if (typeof obj_dataItem != 'object') {
		obj_dataItem = {'': obj_dataItem};
	}
	
	document.querySelector(id_rndr).insertAdjacentHTML('beforeend', ao_tmpl.link(id_tmpl, obj_dataItem));
	// $(id_rndr).append( ao_tmpl.link(id_tmpl, obj_dataItem) );
}