/**
 * 자바스크립트 String 프로토타입 재정의
 */
String.prototype.format = function(formatStr) {
	if(!this.valueOf()){
		return "";
	}
	
	if(typeof formatStr == "undefined" || typeof param == "null"){
		return this.valueOf();
	}
	
	var tempValue = this.valueOf();
	var tempFarr = [];
	var tempSarr = [];
	var tempReturnValueArr = [];
	// 포맷 스트링을 char 단위로 배열에 담음
	for(var i = 0; i < formatStr.length; i++){
		tempFarr.push(formatStr.substr(i, 1));
	}
	// 해당 문자 스트링을 char 단위로 배열에 담음
	for(var i = 0; i < tempValue.length; i++){
		tempSarr.push(tempValue.substr(i, 1));
	}
	var targetStringCheckCnt = 0;
	for(var i = 0; i < tempFarr.length; i++){
		if(tempFarr[i] == "#"){
			// 리턴할 배열에 포맷대상 스트링의 char단위로 삽입
			tempReturnValueArr.push(tempSarr[targetStringCheckCnt]);
			targetStringCheckCnt++;
		}else{
			// 리턴할 배열에 포맷 char을 삽입
			tempReturnValueArr.push(tempFarr[i]);
		}
	}
	return tempReturnValueArr.join("");
};

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