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
 * @class <b>레이어 팝업</b> : 시스템 메세지, 질문, 단위화면 포함 모든 팝업성 처리를 레이어 팝업으로 쉽고 쾌적한 UI로 처리 및 제공<br>팝업 드래그 위치이동, 팝업 드래그 리사이즈, "<u>멀티 팝업 지원</u>" 등등 기능 제공<br>팝업 리소스 재활용 옵션으로 사용시 <u>클라이언트 자원 및 리소스 절약</u> 가능 
 * @author iamtheman@naver.com
 * @version
 * @since 작성일(2016.05.11)
 * @description
 */
var sviewLayer = {
		/**
		 * @param {Object} paramJson JSON OBJECT
		 * @param {String} [<b>paramJson.mod</b>]
		 * <pre>
		 * 		msg = 메세지타입(alert대용) /
		 * 		url = contents내용이 url주소를 이용하여 보이고자 할때 /
		 * 		html = contents를 html 스트링 또는 jquery 샐랙터를 이용한 object를 표현 / 
		 * 		conf = 질문창(confirm대용) /
		 * 		loding = 프로그래스바(로딩중을 표현하고자 할때 사용)
		 * </pre>
		 * @param {String} [<b>paramJson.btnTitle</b>]
		 * <pre>
		 * 		[paramJson.btnTitle.conf=null] 디폴트 "확인" 사용자 정의 확인 버튼 타이틀
		 * 		[paramJson.btnTitle.cancel=null] 디폴트 "취소" 사용자 정의 취소 버튼 타이틀
		 * </pre>
		 * @param {String} [<b>paramJson.recycling=N</b>]
		 * <pre>
		 *		contents 재활용 여부 /
		 *		Y = 해당컨텐츠 재활용(성능 및 자원 절약 권장사항) /
		 *		"mod"옵션이 "html"이고 "cnt"가 object일때만 재활용 아닐때는 매번 새로 그림
		 * <pre>
		 * @param {String} [<b>paramJson.pos</b>]
		 * <pre>
		 * 		c = 중앙
		 * 		g = 클릭위치 기준으로
		 * 		d = 0,0 좌표에
		 * 		p = 센터에 뜨면 fixed 속성을 가짐
		 * 		x = 임의 좌표에 뛰움
		 * </pre>
		 * @param {jQueryObject} [<b>paramJson.obj</b>]
		 * <pre>
		 * 		"pos"옵션이 "g"일때 팝업을 호출한 대상 요소(버튼, input박스 등등) 클릭위치에서 팝얼을 호출시 필수 입력값
		 * </pre>
		 * @param {Number} [<b>paramJson.top</b>] 좌표값 / "pos"옵션 x일때 유효함
		 * @param {Number} [<b>paramJson.left</b>] 좌표값 / "pos"옵션 x일때 유효함
		 * @param {Number} [<b>paramJson.width</b>]
		 * <pre>
		 * 		넓이값 / "mod"옵션이 "html"일때 원본contents자체에서 원하는 사이즈로 디자인하고 해당값은 부여하지 않고 뛰우길 권장함(디자인 값으로 자동 팝업됨)
		 * </pre>
		 * @param {Number} [<b>paramJson.height</b>]
		 * <pre>
		 * 		높이값 / "mod"옵션이 "html"일때 원본contents자체에서 원하는 사이즈로 디자인하고 해당값은 부여하지 않고 뛰우길 권장함(디자인 값으로 자동 팝업됨)
		 * </pre>
		 * @param {(String | jQueryObject)} [<b>paramJson.cnt</b>]
		 * <pre>
		 * 		"mod"옵션이 msg = 텍스트, url = url, html = html문자 또는 다큐먼트객체(jQueryObject) /
		 * 		이때 contents구성중 최상위 요소는 식별할수 있는 class명이나 또는 id를 가져야한다.
		 * </pre>
		 * @param {(Number | Object)} [<b>paramJson.padding</b>]
		 * <pre>
		 *		contest영역의 여백을 조정할수 있는 옵션 /
		 *		디폴트 : 여백 없음
		 *		ex : "padding : 10" 또는 "padding : {top : 10, right : 10, bottom : 10, left : 10}"
		 * </pre>
		 * @param {Boolean} [<b>paramJson.isShowAnimation=true</b>] 팝업오픈시 에니메이션 동작 여부
		 * @param {Boolean} [<b>paramJson.title=null</b>] 헤더 타이틀
		 * @param {(Object | Boolean)} [<b>paramJson.isModal=true</b>]
		 * <pre>
		 * 		팝업오픈시 모달 백그라운드 사용여부 또는 
		 * 		모달 백그라운드 클릭시 팝업 닫기 여부를 옵션 설정한다. (paramJson.hearderUse=Y 일때는 기본적으로 모달클릭시 팝업 닫기 처리됨)
		 * 		isModal : {
		 * 			isClickClosePopup : true <font color='#9a9a9a'>■ {Boolean} [<b>isClickClosePopup=false</b>]</font> 
		 * 		}
		 * </pre>		
		 * @param {Boolean} [<b>paramJson.isHalfMode=true</b>]
		 * <pre>
		 * 		떠있는 팝업을 window의 상/하/좌/우 끝으로 움직였을때 자동으로 절반으로 사이즈 처리해주는 모드
		 * </pre> 
		 * @param {String} [<b>paramJson.hearderUse=Y</b>]
		 * <pre>
		 * 		팝업 헤더(닫기 및 팝업 위치 이동가능) 사용여부 (paramJson.hearderUse=Y 일때는 기본적으로 모달클릭시 팝업 닫기 처리됨)
		 * </pre>
		 * @param {String} [<b>paramJson.footerUse=N</b>] 팝업 풋터(팝업 사이즈 조정 가능) 사용여부
		 * @param {Function} [<b>paramJson.successFn</b>]
		 * <pre>
		 * 		팝업 로드시 실행 함수 / 인자로 옵션값 등등 필요값을 JSON 객체로 보내줌
		 * </pre>
		 * @param {Boolean} [<b>paramJson.isReverseCallBackFnExe=false</b>]
		 * <pre>
		 * 		콜백함수를 정의한 팝업의 경우 팝업을 닫을때 정의된 콜백함수를 선행하여 실행후 열린팝업을 닫는다.
		 * 		이때 열린팝업을 선행하여 닫고 콜백함수를 실행하고자 할때 사용
		 * 
		 * 		ex : 팝업에서 팝업을 호출한 상황에서(다중팝업 호촐상황) 자식 팝업을 닫을때 부모팝업까지 동시에 닫고자할때
		 *		var popOptionJson = {
		 *			mod : "html",
		 *			pos : "g",
		 *			obj : tempSelectDgCol,
		 *			width : "140",
		 *			cnt : tempHtml,
		 *			successFn : function(resJson) {
		 *				var parentPopCntObj = $(resJson.div.c);					
		 *				//자식팝업 호출
		 *				parentPopCntObj.find(".dataGridRowPaste").off("click").on("click", function(e) {
		 *					//				
		 *					var popOptionJson2 = {
		 *						mod : "msg",
		 *						hearderUse : "N",
		 *						pos : "c",
		 *						cnt : sview.message.sview.msg.msgType15,
		 *						isReverseCallBackFnExe : true, 
		 *						callBackFn : function(){		
		 *							//
		 *							//자식팝업의 콜백 정의 부분에 부모팝업을 닫는 스크립트를 정의한다.
		 *							var tempPopClose2 = parentPopCntObj.getSlClose();
		 *							sviewLayer.closePopUp("", tempPopClose2);												
		 *						}					
		 *					};
		 *					sviewLayer.openPopUp(popOptionJson2);
		 *				});
		 *				//
		 *			}
		 *		};
		 *		sviewLayer.openPopUp(popOptionJson);	
		 * </pre> 
		 * @param {Function} [<b>paramJson.callBackFn</b>] 
		 * <pre>
		 *			닫기 클릭시 실행 함수 /
		 *			인자로 옵션값 등등 필요값을 JSON 객체로 보내줌 /
		 *			ex : "mod"타입이 "conf"일때 사용자가 선택한 예/아니오 의사정보값을 콜백함수에서 "paramJson.choiceYN"값으로 받을수 있음 
		 * </pre>
		 * @description 레이어 팝업을 화면에 뛰운다.
		 * @example
		 * <pre>
		 * var popOptionJson = {
		 * 	mod : "msg",
		 * 	hearderUse : "N",
		 * 	pos : "p",
		 * 	cnt : "SVIEW UI FRAMEWORK"
		 * };
		 * sviewLayer.openPopUp(popOptionJson);
		 *
		 * -----------------------------------------------------------
	     *
		 * var popOptionJson = {
		 * 	mod : "conf",
		 * 	hearderUse : "N",
		 * 	pos : "p",
		 * 	cnt : "SVIEW UI FRAMEWORK",
		 * 	callBackFn : function(resJson) {
		 * 		//
		 * 		//현재 열려진 팝업 OBJECT
		 * 		var popContentsObj =  $(resJson.div.c);						
		 * 		//
		 * 		//			
		 * 		if(sview.util.nvl(resJson.choiceYN) == "Y"){
		 * 			// yes
		 * 		}else{
		 * 			// no
		 * 		}
		 * 	}			
		 * };
		 * sviewLayer.openPopUp(popOptionJson);	
		 * </pre>			
		 */
		openPopUp : function(paramJson){
			sviewLayerCore.openPopUp(paramJson);
		},
		
		/**
		 * @param {(String | Object)} [<b>resData</b>]  보통 Y/N값을 가짐 
		 * @param {HTMLElement} [<b>paramCloseBtnObj</b>] 팝업닫기 버튼 요소
		 * @param {HTMLElement} [<b>paramEtcObj</b>] 필요시 추가적으로 element 요소를 인자로 넘겨 콜백 구현부에서 "resJson.etcObj"값으로 받고자할때 사용
		 * @description 공통 팝업 닫기
		 * 보통 열린 팝업창의 닫기 버튼이나, 메세지 팝업의 확인, 질문 팝업의 예/아니오 를 통하여 자동 호출되는 함수지만
		 * 사용자 정의 팝업에서 필요시 호출하여 정확하게 해당팝업의 콜백처리를 위하여 사용
		 * @example
		var htmlString = $("#textareaHtml_05").val();
		var popOptionJson = {
			mod : "html",
			pos : "g",
			obj : paramThisObj,
			isModal : false,
			cnt : htmlString,
			successFn : function(resJson) {
				//
				//현재 열려진 팝업 OBJECT
				var popContentsObj =  $(resJson.div.c);
				//
				//
				//팝업창에 사용자가 직접구현한 확인 버튼 클릭시 정확하게 콜백 처리하기위하여 아래와 같이 "sviewLayer.closePopUp"함수를 호출한다.
				
				
				//사용타입 1 : 해당 타입으로 사용시는 팝업 옵션값 "mod" = "conf"으로 설정하고 아래와 같이 응용 한다.
				$("button.customCheck").on("click", function(){
					var tempPopCloseBtnObject = $(this).getSlClose();
					<b>sviewLayer.closePopUp("", tempPopCloseBtnObject);</b>					
				});
				
				-----------------------------------------------------------
				
				//사용타일 2
				$("button.customConfirm").off("click").on("click", function(){
					var tempPopCloseBtnObject = $(this).getSlClose();
					<b>sviewLayer.closePopUp("Y", tempPopCloseBtnObject);</b>				
				});
				//
			},
			callBackFn : function(resJson) {
				//팝업 닫기시 처리할 로직 구현........
				var tempEtcObject = resJson.etcObj;
			}
		};
		sviewLayer.openPopUp(popOptionJson);
		 */
		closePopUp : function(resData, paramCloseBtnObj, paramEtcObj){
			sviewLayerCore.closePopUp(resData, paramCloseBtnObj, paramEtcObj);
		},
		
		/**
		 * @description 로딩바 호출
		 * @example
		 * sviewLayer.openLoding();
		 */
		openLoding : function(){
			sviewLayerCore.openLoding();
		},
		
		/**
		 * @description 로딩바 닫기
		 * @example
		 * sviewLayer.closeLoding();
		 */	
		closeLoding : function(){
			sviewLayerCore.closeLoding();
		},
		
		/**
		 * @param {Function} [<b>paramCallBackFn</b>] 프로세싱바를 뛰운후에 실행할 코드
		 * @param {Function} [<b>paramNotCheck=true</b>] 내부적으로 현재 프로세싱중임을 관리하는 프로퍼티값을 함께 관리할껀지 여부
		 * @description 
		 * 		프로세싱바 호출<br>
		 * 		작업 처리시간이 오래 걸리는 작업 진행시(ajax통신 제외) 사용<br>
		 * 		작업 진행을 사용자에게 시각적으로 알려고 파람으로 받은 장시간 작업을(callBackFn) 진행한다.<br>
		 * @example
		sviewLayer.openProcessing(function(){
			//장시간 작업 로직...........
			//
		});
		 */
		openProcessing : function(paramCallBackFn, paramNotCheck){
			sviewLayerCore.openProcessing(paramCallBackFn, paramNotCheck);
		},		

		/**
		 * @param {Function} [<b>paramNotCheck=true</b>] 내부적으로 현재 프로세싱중임을 관리하는 프로퍼티값을 함께 관리할껀지 여부
		 * @description 프로세싱바 닫기
		 * @example
		 * sviewLayer.closeProcessing();
		 */		
		closeProcessing : function(paramNotCheck){
			sviewLayerCore.closeProcessing(paramNotCheck);
		},		

		/**
		 * @description 헤더를 선택한 팝업을 가리킴(현재 최상위에 뛰워진것)
		 * @returns {popUpContentsObject}
		 * @example
		 * sviewLayer.getCurrPopContents();
		 */			
		getCurrPopContents : function(){
			sviewLayerCore.getCurrPopContents();
		},
		
		
		/**
		 * @description 다이나믹 팝업 리소스 로링을 확인하고 스크립트를 실행하고자 할때 사용
		 * @example
		 * sviewLayer.lodingCheckAndExe();
		 */			
		lodingCheckAndExe : function(paramCallBackFn){
			sviewLayerCore.lodingCheckAndExe(paramCallBackFn);
		},
		
		/**
		 * @returns void
		 * @description 모바일 환경에서 필요시 해당함수를 호출하여 오픈되여있는 팝업의 사이즈를 최적화 한다.
		 * <pre>
		 * 		모바일에서 화면의 가로세로 변경시 해당함수를 호출하면 오픈되여있는 팝업의 사이즈를 최적화 할수있다
		 * </pre>
		 * @example
		 * <pre>
		 * </pre>
		 */
		reSizeMobile : function(){
			sviewLayerCore.reSizeMobile();
		}
		
};
