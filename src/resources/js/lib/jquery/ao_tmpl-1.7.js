/*!
 * AlphaOmega Templating JS - inspired by Remarkable pre-processor(separator and linker)
 * version: v1.7-2020.10.20
 * Copyright (c) 2020 Kang,dong-hyeon
 * Examples and documentation at: https://hidongh.tistory.com/13
 * Dual licensed under the MIT and GPL licenses.
 */
var ao_tmpl = {}; ao_tmpl.remarkBlock = {};

if (typeof("".trim) == "undefined") {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g,"");
	};
}

/**
 * 리마커블 분리기(Remarkable separator) 개념을 용용한 알파오메가 분리기능
 *
 * @param content : AlphaOmega SuperBlock's content
 * @return htmlString for separated new content. tmpl 영역은 remarkBlock 전역변수에 바로 캐싱됨.
 */
ao_tmpl.separate  = function (content, isUIComponent) {
	var beginTag = "<!--[", endTag = "]-->";
//	var alphaTag = [1, "<!--ALPHA[", "]-->", "<!--a[", "]-->", "<ao>", ""];
//	var omegaTag = [1, "<!--OMEGA[", "]-->", "<!--o-->" , "", "</ao>", ""];
	var alphaTag = [1, "<ao>", ""];
	var omegaTag = [1, "</ao>", ""];
	
	var idxBegin = ao_tmpl.getAlphaTagIdx(content, alphaTag);
	var idxA = alphaTag[0]; // alphaTag[] self's Array index. default 1.
	while (idxBegin > -1) {
		var idxEnd = content.indexOf(alphaTag[idxA+1], idxBegin + alphaTag[idxA].length);
		var id = content.substring(idxBegin + alphaTag[idxA].length, idxEnd);
		var omegaSuffix = omegaTag[idxA] + (omegaTag[idxA+1] ? id + omegaTag[idxA+1] : ""); // <!--o--> 대응로직
		var idxOmega = content.indexOf(omegaSuffix, idxBegin);
		if (!id) {
			var idxIdBegin = content.lastIndexOf("id=\"", idxBegin);
			var idxIdBegin2 = content.lastIndexOf("id='", idxBegin);
			var idxIdEnd = -1;
			
			if (idxIdBegin > idxIdBegin2) {
				idxIdEnd = content.indexOf("\"", idxIdBegin + 4);
			} else if (idxIdBegin < idxIdBegin2) {
				idxIdBegin = idxIdBegin2;
				idxIdEnd = content.indexOf("'", idxIdBegin + 4);
			}
			id = content.substring(idxIdBegin + 4, idxIdEnd).trim();
		}
		ao_tmpl.remarkBlock["#" + id.trim()] = content.substring(idxEnd + alphaTag[idxA+1].length, idxOmega);
		content = content.substring(0, idxBegin) + beginTag + id + endTag + content.substring(idxOmega + omegaSuffix.length);
		idxBegin = ao_tmpl.getAlphaTagIdx(content, alphaTag);
		idxA = alphaTag[0];
	}
	return content;
};

ao_tmpl.getAlphaTagIdx = function (content, alphaTag) {
	var idxBegin = -1, idxBeginNew = -1;
	for (var i = 1; i < alphaTag.length; i+=2) {
		if (i == 1) {
			idxBegin = content.lastIndexOf(alphaTag[i]);
			alphaTag[0] = 1;
		} else {
			idxBeginNew = content.lastIndexOf(alphaTag[i]);
			if (idxBeginNew > idxBegin) {
				idxBegin = idxBeginNew;
				alphaTag[0] = i;
			}
		}
	}
	return idxBegin;
};

/**
 * 리마커블 결합기(Remarkable linker) 개념을 용용한 알파오메가 결합기능
 *
 * @param tmplKey : templating area's identifier for querySelector
 * @param jsonData : a key-value object for mapping to templating area
 * @return htmlString for rendering
 */
ao_tmpl.link = function (tmplKey, jsonData) {
	var tmpl = ao_tmpl.remarkBlock[tmplKey]; // tmpl 캐시 참조
	if (!tmpl) { // 캐시에 없으면
		tmpl = document.querySelector(tmplKey);
		if (!tmpl) return "";
		tmpl = tmpl.innerHTML; // tmpl 영역
		ao_tmpl.remarkBlock[tmplKey] = tmpl; // tmpl 캐싱
	}
	
	var aTag = "{{";
	var oTag = "}}";
	var idx = tmpl.lastIndexOf(aTag);
	while (idx > -1) {
		var idxEnd = tmpl.indexOf(oTag, idx);
		var key = tmpl.substring(idx + aTag.length, idxEnd).trim();
		
		var arr = ["=", "if/", "ifNot/", "/if", "/EndifForInterProcessing/"];
		var i = 0;
		for (; i < arr.length; i++) {
			if (key.indexOf(arr[i]) == 0) {
				key = key.substring(arr[i].length).trim();
				break;
			}
		}
		
		var subObj = jsonData;
		var idxDot = key.indexOf(".");
		while (idxDot > -1) {
			var subKey = key.substring(0, idxDot);
			subObj = subObj[subKey];
			if (typeof subObj == 'undefined') {
				subObj = '';
			}
			key = key.substring(idxDot + 1);
			idxDot = key.indexOf(".");
		}
		var item = subObj[key];
		if (typeof item == 'undefined') {
			item = '';
		}
		
		if (i == 0) {
			item += "";
			item = item.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
		} else if (i == 1 || i == 2) {
			if (i == 1 && !item || i == 2 && item) {
				idxEnd = tmpl.indexOf(arr[4], idxEnd + 1);
				idxEnd = tmpl.indexOf(oTag, idxEnd + 1);
			} else {
				var idxEndif = tmpl.indexOf(arr[4], idxEnd + 1);
				tmpl = tmpl.substring(0, idxEndif) + aTag + arr[4] + oTag + tmpl.substring(idxEndif + arr[4].length + oTag.length);
			}
			item = "";
		} else if (i == 3) {
			item = arr[4] + oTag;
		} else if (i == 4) {
			item = "";
		} else {
			item += "";
		}
		
		tmpl = tmpl.substring(0, idx) + item + tmpl.substring(idxEnd + oTag.length);
		idx = tmpl.lastIndexOf(aTag);
	}
	return tmpl;
};
