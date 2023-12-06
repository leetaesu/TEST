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
 * sview 클로벌 오브젝트 서비스 페이지에서 동일명칭 사용 금지 const 키워드로 선언하지 않은 이유는 IE호환성 위함
 */

//iamtheman 수정포인트
/**
 *  자바스크립트 Date 재정의
 * @param f
 * @returns
 */
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
Date.prototype.getWeek = function() {
	var onejan = new Date(this.getFullYear(),0,1);
	return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
}; 


var dataGrid = {
	prop : {
		isMobile : true
	},
	language : {
		setLanguage: function(){
			
		}
	}
};


// var dataGrid = {};
var sview = new Object();

sview.common = {
	/**
	 * @class 페이지 관련 전역 정보 패키지 
	 * @author iamtheman@naver.com
	 * @version
	 * @since 작성일(2016.05.11)
	 * @description
	 */
	pageInfo : {
//		physicalName : "",
//		pageLanguage : "KOR",
//		pageStyleType : "styleThema1",
//		isProcessing : false,
//		is_Gecko : false, 
//		isMobile : null,
//		dgRowBackSizeBase : 30,
//		renderTypeSize_Gecko : 180,
//		renderTypeSize : 400,
//		renderXTypeSize : 30,
		/**
		 * 현재 페이지의 was루트 디렉토리 기준 파일명을 포함 경로를 리턴한다. <br>
		 * ex> /WEB-INF/views/sampleGrid.jsp"
		 * 
		 * @returns {String}
		 */
		getPhysicalName : function() {
			var tempPageName = location.href;
			return tempPageName.substring(tempPageName.lastIndexOf("/")+1, tempPageName.lastIndexOf("."));
		},
		/**
		 * 현재 설정된 언어명을 리턴한다. ex> KOR, ENG 등등 : 서버사이드로 header.jsp에서 셋한다.
		 * 
		 * @returns {String}
		 */
		getPageLanguage : function() {
			return sview.common.prop.pageLanguage;
		},
		
		
		/**
		 * 현재 설정된 테마 css명을 리턴한다. : 서버사이드로 header.jsp에서 셋한다.
		 * 
		 * @returns {String}
		 */
		getPageStyleType : function() {
			return sview.common.prop.styleThema;
		},
		
		/**
		 * 현재 브라우져가 프로세싱중인지 여부를 안려준다.(dataGrid 랜더링, 대용량 dataGrid 핸들링작업 등등 로컬 부하작업에 한하여 관리함)
		 */
		getIsProcessing : function() {
			return dataGrid.prop.isProcessing;
		},
		/**
		 * 현재 디바이스(장비)가 모바일인지 여부를 알려준다.
		 * @returns {Boolean}
		 */
		getIsMobile : function(){
			var isMobile = false;
			//
			if(dataGrid.prop.isMobile != null){
				isMobile = dataGrid.prop.isMobile;
			}else{
				var temoDeviceNm = sview.common.util.getDeviceName();
				if(!(temoDeviceNm == "PC" || temoDeviceNm == "ipad" || temoDeviceNm == "ipad")){
					isMobile = true;
				}			
			}
			
			return isMobile;
		},
		/**
		 * 현재 디바이스(장비)가 모바일이면(갤탭, 아이패드 제외) 
		 * <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
		 * 위 태그를 head에 삽입하여 준다.
		 */
		addMobileMetaTag : function(){
			if(sview.common.pageInfo.getIsMobile()){
			//if(true){
				$("head:eq(0)").append('<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">');
			}
		},
		
		/**
		 * @param sviewStyleDirNm
		 * @param callBackFn
		 * @returns
		 * @returns any
		 * @description  페이지 리로딩 없이 컴포넌트들의 테마 style css을 변경하여 준다.>
		 * @example
		 * <pre>
									sview.common.pageInfo.setStyleSheet(tempRsRow.ETC, function(){
										//서비스 페이지 테마 변경
										//기존 css 제거
										$("link.pageStyleType").remove();								
										var tempPath = pageCom.pageStyleTypePath + tempRsRow.ETC + ".css";
										$("head:eq(0)").append('<link class="pageStyleType" rel="stylesheet" href="'+tempPath+'" type="text/css">');								
									});
		 * </pre>
		 */
		setStyleSheet : function(sviewStyleDirNm, callBackFn){
			//
			$("#sview_div_mask_style").show();
			//
			//기존 css 제거
			$("link.pageStyleType").remove();
			//
			if(typeof callBackFn === "function"){
				//서비스별로 상이한 환경에 따라 동적으로 테마변경시 컴포넌트를 제외한 스타일은 사용자가 알아서 처리해야함
				callBackFn();
			}			

			sview.common.prop.styleThema = sviewStyleDirNm;

			// 캘린더 테마 적용
			var tempStyleType = sview.common.prop.styleThema + "/sviewCalender.css";
			$("head").prepend('<link class="pageStyleType" rel="stylesheet" href="' + sview.contextpath.component + 'calender/' + tempStyleType + '" type="text/css">');			
			
			// 트리 테마 적용
			var tempStyleType = sview.common.prop.styleThema + "/sviewTree.css";
			$("head").prepend('<link class="pageStyleType" rel="stylesheet" href="' + sview.contextpath.component + 'tree/' + tempStyleType + '" type="text/css">');		

			// 레이어 팝업 테마 적용
			if($("#link_css_dynamicPopUp_pageStyle").length == 0){
				// 트리 테마 적용
				var tempStyleType3 = sview.common.prop.styleThema + "/sviewLayer.css";
				$("head").prepend('<link class="pageStyleType" id="link_css_dynamicPopUp_pageStyle" rel="stylesheet" href="'+sview.contextpath.component+'layer/'+tempStyleType3+'" type="text/css">');
			}
			
			//sview.css 적용
			var tempStyleType2 = sview.common.prop.styleThema + "/sview.css";
			$("head").prepend('<link class="pageStyleType" rel="stylesheet" href="' + sview.contextpath.component+"sview/" + "" + tempStyleType2 + '" type="text/css">');		

			$("#sview_div_mask_style").fadeToggle(1000);		
		}
		
	},
	
	/**
	 * @class "SVIEW UI FRAMEWORK SOUTION" 제공 UTIL API 패키지 
	 * @author iamtheman@naver.com
	 * @version
	 * @since 작성일(2016.05.11)
	 * @description
	 */
	util : {
		/**
		 * 해당 요소의 쓰기 가능여부를 알려준다.
		 * isNature : 네츄럴하게 해당 element의 쓰기 가능여부를 따짐
		 * isDrag : 드래그등등 에서 해당 col/fild 단위의 핸들링이 아닌~ 카피붙여넣기시라던지 에서 해당요소의  쓰기여부를 따질때
		 * @param paramObj
		 * @returns {Boolean}
		 */
		isEdit : function(paramFildElement, isNature, isDrag) {
			var returnVal = true;
			var tempDgFildObj = $(paramFildElement);
			//
			if(tempDgFildObj.hasClass("_dg_fild_readonly") || tempDgFildObj.hasClass("_dg_fild_readonly_dy")  || tempDgFildObj.hasClass("_dg_fild_popup_edit")){
				returnVal = false;
			}
			//
			//
			//
			//성능을 위하여 디폴트 동작을 우선하고 옵션 처리시 세부적으로 동작하도록함
			//
			//
			//
			if(isDrag){
				if(tempDgFildObj.hasClass("_dg_fild_readonly") || tempDgFildObj.hasClass("_dg_fild_readonly_dy")){
					returnVal = false;
				}else{
					returnVal = true;
				}	
			}
			//
			if(isNature){
				//★dgFild 무조건 읽기전용 모드로 디자인(더블클릭, F2, keydown 처리시 쓰기가능하도록변경)
				if(tempDgFildObj.prop("readonly") || tempDgFildObj.prop("disabled")){
					returnVal = false;
				}else{
					returnVal = true;
				}
			}
			//
			//
			//
			//
			//
			return returnVal;
		},
		/**
		 * 인자로 받은 객체의 null 여부를 참/거짓 으로 리턴한다.
		 * @param param
		 * @returns {Boolean}
		 */
		isNull : function(param) {
			var returnValue = false;
			if(typeof param == "string"){
				param = sview.common.util.nvl(param);
				if(param == "" || param == "null" || param == "undefined" || param == null || param == undefined){
					returnValue = true;
				}
			}else{
				if(typeof param == "undefined" || typeof param == "null" || param == null){
					returnValue = true;
				}
			}
			return returnValue;
		},
		/**
		 * 
		 * @param paramOrg [<b>{(String | Number | Object | jQueryObject)}</b>] Object 또는 jQueryObject일때는 dataGridFild object일경우만(input, select, textarea 등등등 element)   
		 * @param changeStr "paramOrg"값이 없을때 치환할 문자 
		 * @returns {(String | Object)}
		 * @description 일반적인 nvl처리함수 
		 */
		nvl : function(paramOrg, changeStr) {
			var returnValue = "";
			var tempValue = "";
			if(typeof changeStr == "string"){
				tempValue = changeStr;
			}
			//console.log(typeof paramOrg)
			if(typeof paramOrg == "string"){
				if(paramOrg == "null" || paramOrg == "undefined" || paramOrg == null || paramOrg == undefined|| paramOrg == "" ){
					returnValue = tempValue;
				}else{
					returnValue = paramOrg.trim();
				}
			}else if(typeof paramOrg == "number"){
				if(paramOrg == "null" || paramOrg == "undefined" || paramOrg == null || paramOrg == undefined){
					returnValue = tempValue;
				}else{
					returnValue = (paramOrg+"").trim();
				}
			}else{
				if(typeof paramOrg == "undefined" || typeof paramOrg == "null" || paramOrg == null || paramOrg == undefined || paramOrg == "nvl"    || paramOrg == NaN || paramOrg == "NaN"){
					returnValue = tempValue;
				}else{
					try{
						if(typeof paramOrg === "object" && paramOrg.get){
							returnValue = $(paramOrg).val();							
						}else{
							if(typeof paramOrg === "object" && paramOrg.val){
								returnValue = paramOrg.val();
							}else{
								returnValue = paramOrg	
							}
						}
					}catch(e){
						returnValue = paramOrg;
						console.log(e);
					}
				}
			}
			return returnValue;
		},
		/**
		 * 데이터그리드의 row를 콘솔창에 하나 출력함
		 * @param dataGridSelecter
		 * @param rowIndex
		 */
		GCP : function(dataGridSelecter, rowIndex){
			console.log("row obj ↓");
			console.log($(dataGridSelecter).find(".dataGrid_row:not(._data_row_temp)").eq(rowIndex));
			console.log("row obj ↑\n\n");
			console.log("row data ↓");
			console.log($(dataGridSelecter).find(".dataGrid_row:not(._data_row_temp)").eq(rowIndex).data());
			console.log("row data ↑");
			
		},
		
		/**
		 * 문자값, 캐릭터, 좌측으로 채울 자리수를 인자로 받아 문자값의 자리수가 모자랄경우 캐릭터로 채워서 리턴한다.
		 * @param valueStr
		 * @param character
		 * @param digit
		 * @returns {String}
		 */
		lpad : function(valueStr, character, digit) {    
		    if (! valueStr || ! character || valueStr.length >= digit) {
		        return valueStr;
		    }
		 
		    var max = (digit - valueStr.length)/character.length;
		    for (var i = 0; i < max; i++) {
		        valueStr = character + valueStr;
		    }
	
		    return valueStr;
		},
		/**
		 * 문자값, 캐릭터, 우측으로 채울 자리수를 인자로 받아 문자값의 자리수가 모자랄경우 캐릭터로 채워서 리턴한다.
		 * @param valueStr
		 * @param character
		 * @param digit
		 * @returns {String}
		 */
		rpad : function(valueStr, character, digit) {  
		    if (! valueStr || ! character || valueStr.length >= digit) {
		        return valueStr;
		    }
		 
		    var max = (digit - valueStr.length)/character.length;
		    for (var i = 0; i < max; i++) {
		        valueStr += character;
		    }
		 
		    return valueStr;
		},
		/**
		 * 현재 사용자의 브라우져명을 리턴한다.
		 * <br> ex> explorer, firefox, chrome, safari, opera
		 * @returns {String}
		 */
		getBrowserName : function() {
			/*
			 * var s = navigator.userAgent.toLowerCase(); var match = /(webkit)[
			 * \/](\w.]+)/.exec(s) || /(opera)(?:.*version)?[ \/](\w.]+)/.exec(s) ||
			 * /(msie) ([\w.]+)/.exec(s) || /(mozilla)(?:.*? rv:([\w.]+))?/.exec(s) ||
			 * []; return { name : match[1] || "", version : match[2] || "0" };
			 */
			var a = navigator.userAgent;
			var returnValue = "";
			if(/msie|trident/i.test(a)){
				returnValue = "explorer";
			}else if(/Edge/i.test(a)){
				// 엣지
				returnValue = "edge";
			}else if(/firefox/i.test(a)){
				// 파이어폭스
				returnValue = "firefox";
			}else if(/chrome/i.test(a)){
				// 크롬
				returnValue = "chrome";
			}else if(/safari/i.test(a)){
				// 사파리
				returnValue = "safari";
			}else if(/opera|opr/i.test(a)){
				// 오페라
				returnValue = "opera";
			}
			return returnValue;
		},
		/**
		 * 현재 디바이스(장비)의 명칭을 알려준다.
		 * PC
		 * ipad
		 * iphone
		 * galtab
		 * android phone
		 * @returns {String}
		 */
		getDeviceName : function(){
			var pf = navigator.platform;
			var ua = navigator.userAgent;
			var returnString = "PC";
			if(/ipad/i.test(pf)){ //아이패드일때
				returnString = "ipad";
			}else if(/iphone/i.test(pf)){ //아이폰일때
				returnString = "iphone";
			}else if(/linux armv7/i.test(pf)){ //안드로이드폰일때
				if(/SHW-M/i.test(ua)){ //갤탭일때
					returnString = "galtab";
				}else{ //갤탭 이외에 나머지
					returnString = "android phone";
				}
			}else{
				returnString = "PC";
			}	
			return returnString;
		},
		/**
		 * 배열을 파라미터로 던지면 중복값을 제거하여 리턴해준다.
		 * @param array
		 * @returns {array}
		 */
		removeArrayDuplicate : function(paramArray) {
			var a = {};
			for(var i = 0; i < paramArray.length; i++){
				if(typeof a[paramArray[i]] == "undefined")
					a[paramArray[i]] = 1;
			}
			paramArray.length = 0;
			for( var i in a)
				paramArray[paramArray.length] = i;
			return paramArray;
		},
		/**
		 * 
		 * @param parman
		 */
		logTrace : function(parman){
			if(dataGrid.prop.log.tran.isLog){
				console.log(parman);
			}		
			
		},
		/**
		 * 
		 * @param parman
		 */
		logTraceGrid : function(parman){
			if(dataGrid.prop.log.grid.isLog){
				console.log(parman);
			}		
		},
		/**
		 * 요소의 style 값(string)으로 부터 특정 style의 값을 구해준다.
		 * @param targetObj
		 * @param startStr
		 * @param endStr
		 * @returns {String}
		 */
		getValueOfStyle : function(targetObj, startStr, endStr){
			var returnValue = "";
			var temp_startStr = startStr+":";
			
			var tempStyle = "";
			if(typeof targetObj === "string"){
				tempStyle = targetObj;
			}else{
				tempStyle = $(targetObj).attr("style");	
			}
			
			
			if(sview.common.util.isNull(tempStyle)){
				return returnValue;	
			}
			var temp01 = tempStyle.substr(tempStyle.indexOf(temp_startStr));
			
			if(temp01){
				temp01 = tempStyle.substr(tempStyle.indexOf(startStr));
				
				temp01 = temp01.substr(temp01.indexOf(":"));
			}
			
			if(sview.common.util.isNull(temp01)){
				return returnValue;	
			}
			
			if(tempStyle.indexOf(startStr) > -1){
				var temp02 = temp01.substring(temp01.indexOf(":") + 1, temp01.indexOf(endStr));
				returnValue = temp02.trim();
			}
			return returnValue;
		},
		
		/**
		 * document의 디자인 모드를(에디트) 핸들링한한다. 핸들링 한다.
		 * @param Boolean
		 * @returns void
		 */		
		handleEditMode : function(isEdit){
			//
			//
			if(sview.common.util.getBrowserName() != "explorer"){
				if(isEdit){
					document.designMode = "on";	
				}else{
					document.designMode = "off";
				}	
			}else{
				if(isEdit){
					if(Number(sview.common.util.getInternetExplorerVersion()) < 11){
						document.body.setAttribute("contentEditable", "true");				
					}else{
						document.designMode = "on";
					}				
				}else{
					if(Number(sview.common.util.getInternetExplorerVersion()) < 11){
						document.body.setAttribute("contentEditable", "false");				
					}else{
						document.designMode = "off";
					}				
				}
			}
		},		
		
		/**
		 * 인터넷 익스플러의 경우 브라우저 버젼을 알려준다.
		 * @returns {Number}
		 */
		getInternetExplorerVersion : function() {
			/*
			var rv = -1; // Return value assumes failure.
			if(navigator.appName == 'Microsoft Internet Explorer'){
				var ua = navigator.userAgent;
				var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
				if(re.exec(ua) != null)
					rv = parseFloat(RegExp.$1);
			}
			return rv;
			*/
			
	        var word;
	        var versionOrType = "another";
	        var ieName = navigator.appName;
	        var agent = navigator.userAgent.toLowerCase();
	        
	        /*** 1. IE 버전 체크 ***/
	        // IE old version ( IE 10 or Lower )
	        if ( ieName == "Microsoft Internet Explorer" ){
	            word = "msie ";
	        }else{
	            // IE 11
	            if( agent.search("trident") > -1 ) word = "trident/.*rv:";
	            // IE 12  ( Microsoft Edge )
	            else if( agent.search("edge/") > -1 ) word = "edge/";
	        }
	    
	        var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" );
	        if ( reg.exec( agent ) != null )
	        versionOrType = RegExp.$1 + RegExp.$2;
	        
	        /*** 2. IE가 아닌 경우 브라우저 체크 ***/
	        if( versionOrType == "another" ){
	            if (agent.indexOf("chrome") != -1) versionOrType = "Chrome";
	            else if (agent.indexOf("opera") != -1) versionOrType = "Opera";
	            else if (agent.indexOf("firefox") != -1) versionOrType = "Firefox"; 
	            else if (agent.indexOf("safari") != -1) versionOrType = "Safari";
	        }
	        return versionOrType;
			
			
		},	
		//
		//
		//
	}
};

//iamtheman 수정포인트
sview.util = sview.common.util;
sview.pageInfo = sview.common.pageInfo;

/**
 * @class 그리드의 속성을을 컨트롤하는 관련 기능 패키지
 * @author iamtheman@naver.com
 * @version
 * @since 작성일(2020.08.01)
 * @description
 */	
sview.attr = {
	readWriteCol : function(paramJson){
		
		if(paramJson.dgCol){
			
//			var dgRowRs = null;
//			
//			if(paramJson.dgRowRs){
//				dgRowRs = paramJson.dgRowRs;
//			}else{
//				dgRowRs = paramJson.dgCol.closest(".dataGrid_row").data("rs_row");
//			}
			
			var key = paramJson.bindNm || paramJson.dgCol.attr("data-dg_name");

			
			var dgGroup = paramJson.dgGroup || paramJson.dgCol.closest(".dataGrid_group");
			var temp_DG_readOnlyFildS = dgGroup.data("DG_readOnlyFildS");
			
			
			if(paramJson.isWrite){
				paramJson.dgCol.removeClass("_dg_col_readonly");
				paramJson.dgCol.find(".dataGrid_fild").removeClass("_dg_fild_readonly");
				
				temp_DG_readOnlyFildS[key+"_isReadOnly"] = false;
				
			}else{
				paramJson.dgCol.addClass("_dg_col_readonly");
				paramJson.dgCol.find(".dataGrid_fild").addClass("_dg_fild_readonly");
				temp_DG_readOnlyFildS[key+"_isReadOnly"] = true;
			}		
		}else{
			//paramJson.bindNm
		}
	}
};













