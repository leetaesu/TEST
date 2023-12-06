/**
 *@preserve 
 *Copyright (c) <2015> <Sungmin YOON>
 *
 *Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 *1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 *
 *2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 *
 *THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.			
 *
 *@preserve
 *Copyright (c) <2015> <윤성민>
 *
 *다음과 같은 사항을 요구하며 이를 준수하는 경우 개작/배포에 아무런 제한을 받지 않는다.
 *저작권자 표기. BSD 라이선스가 걸린 소프트웨어를 이용하는 경우, 해당 저작권자의 이름과 BSD 라이선스의 내용을 같이 배포해야 한다.
 *보증 부인. BSD 라이선스가 걸린 소프트웨어로 인하여 법률상/도의상 피해가 발생하더라도, 그 책임을 저작권자에게 물을 수 없다.
 *
 *3조항(3-clause) 이상 라이선스를 사용하는 경우 다음 항목이 추가된다.
 *저작권자의 이름을 광고에 사용 금지. 별도의 서면 허락 없이 BSD 소프트웨어를 개발한 단체 또는 개인의 이름을 BSD 소프트웨어 또는 그 파생물의 추천 및 판촉 광고에 사용할 수 없다.
 *
 *4조항(4-clause) 라이선스를 사용하는 경우 다음 항목이 추가된다.
 *광고에서의 저작권자 표기. BSD 소프트웨어를 사용 또는 포함한 것(파생물 포함)을 광고할 때에는 광고에 저작권자를 명시해야 한다.
 *
 *GPL 등에서 요구하는 전염성이 없는게 특징으로, 개작한 부분에 BSD를 적용할 필요가 없다. BSD 소프트웨어는 소스 코드 공개의 의무가 없으며 상업적 이용에도 제한을 받지 않는다. 따라서 BSD를 이용하면 상용 프로그램 개발의 저작권 논쟁에서 굉장히 자유로워진다. MIT 허가서가 이 라이선스를 기반으로 만들어서 둘이 상당히 비슷하다.
 *
 *이러한 자유성은 국가 재정지원(=세금 지원)을 받아서 개발된 소프트웨어를 공중에 돌려준다는 의도에 따른 것으로, 최소한의 규정(저작권자 표기)만으로 자유로운 이용을 보장하는 것이다.
 *
 *4조항 라이센스는 광고에서의 저작권자 표기 조항 때문에 GPL과 호환되지 않는다.			
 */

/**
 * @class 캘린더 : 일자달력, 년월달력, 생일달력, 시간, 일자달력 데이터 바인딩(날짜를 이용해 사용자 정의 데이터를 맵핑) 기능 지원
 * @author iamtheman@naver.com
 * @version
 * @since 작성일(2016.05.11)
 * @description
 */
var sviewCalender = {
	/**
	 * <pre>
	 * <b>sviewCalender.prop.isServerTimeUse = false</b>
	 * 캘린더 서버시간 사용여부 SVIEW는 디폴트 클라이언트 시간을 사용한다.
	 * 서버시간 사용시는 일자정보를 구하기위한 ajax서비스 URL을 정의해 줘야한다.
	 * 캘린더에서 사용하는 sview.contextpath.calenderDayListURL 서버 ajax서비스 맵핑URL
	 * 서버 서비스 구축 가이드는 sviewCalender.appendCalender() 함수 api 가이드 참조
	 * </pre>
	 * @const
	 */
	prop : {
		/**
		 * <pre>
		 * 캘린더 서버시간 사용여부 SVIEW는 디폴트 클라이언트 시간을 사용한다.
		 * 서버시간 사용시는 일자정보를 구하기위한 ajax서비스 URL을 정의해 줘야한다.
		 * 캘린더에서 사용하는 sview.contextpath.calenderDayListURL 서버 ajax서비스 맵핑URL
		 * 서버 서비스 구축 가이드는 sviewCalender.appendCalender() 함수 api 가이드 참조
		 * </pre>
		 * @type {boolean}
		 */	
		isServerTimeUse : false//sviewCalender.prop.isServerTimeUse//서버시간 사용여부 (서버시간 사용시는 서버환경 구축요망)
	},
	/**
	 * 캘린더를 오픈한다.
	 */
	openCalender : function(paramJson) {
		sviewCalenderCore.openCalender(paramJson);
	},
	
	
	
	/**
	 * @param {Object} paramJson JSON OBJECT
	 * @param {jQueryObject} [<b>paramJson.dataGridFild</b>] 물리적 데이터필드 요소 데이터가 바인딩 되여 I/O 발생되며 보통 input, select elemment(jQuery selector한 object)
	 * @param {jQueryObject} [<b>paramJson.callBackFn</b>] 콜백처리한 함수
	 * <pre>
	 * 		해당 함수 실행시 2가지 파라미터를 리턴해준다.  callBackFn(resJson, dataGridFild)
	 * 		resJson : 해당 캘린더의 시스탬 내부 값
	 * 		dataGridFild : 해당 캘린더를 호출한 dataGridFild(jQuery selector)요소
	 * 		해당 옵션값을 null값으로 셋하면 콜백함수를 clear한다.
	 * </pre>
	 * @returns void
	 * @description <font color="#ff0000">[주요API]</font> 캘린더 값 선택후 실행할 콜백함수를 set
	 * <pre>
	 * 캘린더가 바인딩되여 있는 dataGrid_fild 요소를 클릭하기전에 선행하여 셋하여야한다.
	 * </pre>
	 * @example
	 * <pre>
		var paramJson = {
			dataGridFild : $("input[name=BASE_YYYMM]"),
			callBackFn : function(resJson, tempDataGridFild){
				alert(tempDataGridFild.val());
			},
		};
		sviewCalender.setCallBackFn(paramJson);
	 * </pre>
	 */	
	setCallBackFn : function(paramJson){
		sviewCalenderCore.setCallBackFn(paramJson);
	},	
	
	/**
	 * 화면에서 추가하고자하는 요소에 캘린더 버튼을 추가시킨다.
	 */
	bindCalender : function(paramJson) {
		sviewCalenderCore.bindCalender(paramJson);
	},
	/**
	 * 파라미터로 받은 요소 오브젝트 뒤에 캘린더 버튼을 달아준다.
	 * 
	 */
	addCalender : function(calender_val_obj_s) {
		sviewCalenderCore.addCalender(calender_val_obj_s);
	},
	/**
	 * @param {Object} paramJson JSON OBJECT
	 * @param {jQueryObject} [<b>paramJson.targetSelector</b>] 통신결과의 바인딩 대상 캘린더 그리드  sviewCalender.appendCalender함수로 동적 캘린더 삽입시 targetSelector옵션값의 jQuery selector한 object
	 * @param {String} [<b>paramJson.DATE_VAL=null</b>] YYYMMDD 포맷의 일자값 해당값이 없으면 이달달력으로 디폴트 로딩된다.
	 * @param {Function} [<b>paramJson.callBackFn=null</b>] 캘린더를 그린후 실행할 스크립트
	 * @param {String} [<b>paramJson.titleDateFormat=null</b>] 해당월의 타이틀 텍스트의 표시 포맷 지정
	 * @param {boolean} [<b>paramJson.isStartSunDay=false</b>] 해당 옵션 부여서 일주일의 시작일을 일요일 기준으로 설정(일월화수목금토) 아닐때는 월요일 부터 시작(월화수목금토일)
	 * @param {boolean} [<b>paramJson.isLongTitle=false</b>] 요일 타이틀의 약어표시 여부를 정한다.
	 * @param {boolean} [<b>paramJson.UI_type=A</b>] 캘린더의 UI type을 변경한다.
	 * <pre>
	 * 		"A" : 기본타입
	 *      "B" : 이전/다음/년월타이틀 상단 센터 디자인
	 * <pre>
	 * @returns void
	 * @description 특정위치에 캘린더를 추가시킨다.
	 * <pre>
	 *-------------------------------------------------------------------------------------------------------
	 *sviewCalender 캘린더는 디폴트로 로컬시간을 이용하여 일자 리스트를 구합니다.
 	 *이를 서버시간으로 변경하고자 할경우는 sviewCalender.prop.isServerTimeUse = true 하시고
	 *일자 데이터를 서버기준으로 가져오기 위한 서비스 경로를 아래 sview.contextpath.js 에 맵핑하여 주십시요.
	 *예 > sview.contextpath.calenderDayListURL = "/business/businessCalenderList.do"; 
 	 *-------------------------------------------------------------------------------------------------------
	 *서버 서비스 구현은 <b>SVIEW에서 제공하는 sview.jar를</b> 서버 환경에 배포하여주십시요. 
	 *다음은 스프링 자바 서버 환경에서 컨트롤러 구현 예제 입니다.
	 *-------------------------------------------------------------------------------------------------------
	 *예>
	 *_@RequestMapping(value = "/business/businessCalenderList.do", method = RequestMethod.POST, consumes = "application/json;charset=UTF-8")
	 *public @ResponseBody List<Map<String, Object>> businessCalenderList(@RequestBody Map<String, Object> requestBodyMap) throws Exception {
	 *	DataGrid dataGrid = new DataGrid();
	 *	String paramYYYYMM = "";
	 *	if(requestBodyMap.get("DATE_VAL") != null){
	 *		paramYYYYMM = requestBodyMap.get("DATE_VAL").toString().trim();
	 *	}
	 *	//dataGrid.getDayList() 해당 메소드에 일자는 yyyyMM 패턴으로 넣어주시면 해당하는 일자 리스트를 반환합니다. 빈문자일때는 이달의 일자리스트 반환
	 *	List<Map<String, Object>> result = dataGrid.getDayList(paramYYYYMM);
	 *	return result;
	 *}
	 *-------------------------------------------------------------------------------------------------------
	 * </pre>
	 * @example
	 * <pre>
	 * </pre>
	 */	
	appendCalender : function(paramJson) {
		sviewCalenderCore.appendCalender(paramJson);
	},
	/** 
	 * @param {Object} paramJson JSON OBJECT
	 * @param {jQueryObject} [<b>paramJson.targetSelector</b>] 통신결과의 바인딩 대상 캘린더 그리드  sviewCalender.appendCalender함수로 동적 캘린더 삽입시 targetSelector옵션값의 jQuery selector한 object
	 * @param {Object} [<b>paramJson.dataGridListMap</b>] 캘린더의 날짜와 바인딩하여 삽입할 sview.tran.ajax 통신결과 result 구룹
	 * @param {String} [<b>paramJson.dataGrid=null</b>] sview 데이터그리드 규약의 Object (리스트 맵형태[key/value]) 보통 서버의 쿼리결과의 result값
	 * <pre>
				[{
					dataGridSepc : result2,
					key : "REG_DATE",
					contents : {
						element : "<span class='sviewCalenderLabel label label-mCountReg'> </span>",
						script : function(paramElement, dataGridRowSepc){
							paramElement.text("등록 : " + sview.util.nvl(dataGridRowSepc.REG_COUNT));
						}
					}
				}, {
					dataGridSepc : result1,
					key : "UPD_DATE",
					contents : {
						element : "<span class='sviewCalenderLabel label label-mCountReg'> </span>",
						script : function(paramElement, dataGridRowSepc){
							paramElement.text("수정 : " + sview.util.nvl(dataGridRowSepc.UPD_COUNT));
						}
					}
				}]
	 * </pre>
	 * @returns void
	 * @description  캘린더의 날짜에 사용자 정의 데이터를 바인딩 시킨다.
	 * @example
	 * <pre>
			var paramJson = {
				targetSelector : $("#div_calender"),
				callBackFn : function(paramDagaGridTable, paramResJson) {
					//
					// STR 통신결과 추출
					var paramJson1 = {
						resJson : paramResJson,
						key : "dataGrid2"
					};
					var result1 = sview.dataGrid.getDataGridByResult(paramJson1).response;
					//
					//
					var paramJson2 = {
						resJson : paramResJson,
						key : "dataGrid3"
					};
					var result2 = sview.dataGrid.getDataGridByResult(paramJson2).response;
					// END 통신결과 추출
					//
					//
					//
					var paramJson = {
						targetSelector : paramDagaGridTable,
						dataGridListMap : [{
							dataGridSepc : result2,
							key : "REG_DATE",
							contents : {
								element : "<span class='sviewCalenderLabel label label-mCountReg'> </span>",
								script : function(paramElement, dataGridRowSepc){
									paramElement.text("등록 : " + sview.util.nvl(dataGridRowSepc.REG_COUNT));
								}
							}
						}, {
							dataGridSepc : result1,
							key : "UPD_DATE",
							contents : {
								element : "<span class='sviewCalenderLabel label label-mCountReg'> </span>",
								script : function(paramElement, dataGridRowSepc){
									paramElement.text("수정 : " + sview.util.nvl(dataGridRowSepc.UPD_COUNT));
								}
							}
						}]
					};
					//
					sviewCalender.bindDayContents(paramJson);
					//
				}
			};
			sviewCalender.appendCalender(paramJson);
	 * </pre>
	 */		
	bindDayContents : function(paramJson){
		sviewCalenderCore.bindDayContents(paramJson);
	},
	/**
	 * @param {Object} paramJson JSON OBJECT
	 * @param {jQueryObject} [<b>paramJson.targetSelector</b>] 통신결과의 바인딩 대상 캘린더 그리드  sviewCalender.appendCalender함수로 동적 캘린더 삽입시 targetSelector옵션값의 jQuery selector한 object
	 * @param {String} [<b>paramJson.date=null</b>] 가져올 월 YYYYMMDD 패턴 string 값
	 * @param {boolean} [<b>paramJson.isAppend=false</b>] 캘린더를 클리어하고 해당 년월데이터만 가져올껀지 아닌지 여부 디폴트는 클리어한다.
	 * @param {Function} [<b>paramJson.callBackFn=null</b>] 캘린더를 그린후 실행할 스크립트
	 * @returns void
	 * @description 캘린더를 특정월값으로 갱신한다..
	 * <pre>
	 * </pre>
	 * @example
	 * <pre>
	 * </pre>
	 */		
	getMoonth : function(paramJson){
		sviewCalenderCore.getMoonth(paramJson);
	},
	getParam : function(paramJson){
		var temp_sviewCalenderParam = paramJson.targetSelector.find(".sviewCalenderParam");
		return temp_sviewCalenderParam.val();
	},
	setParam : function(paramJson){
		var temp_sviewCalenderParam = paramJson.targetSelector.find(".sviewCalenderParam");
		temp_sviewCalenderParam.val(paramJson.value);
	}
};
//
//