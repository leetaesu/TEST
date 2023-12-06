/* *
 * @author : adj
 * @version : v1.0.1-20210623 
 * @see : jqeury.tmpl.js util
 * 
 */
 
(function() {
	if (typeof $ != 'function') {
		console.log('jqeury.js not found');
		return;
	}
	
	// data value undefined error 대응 로직
	$.tmpl.tag = {
		"tmpl": {
			_default: { $2: "null" },
			open: "try{if($notnull_1){__=__.concat($item.nest($1,$2));}}catch(e){}"
			// tmpl target parameter can be of type function, so use $1, not $1a (so not auto detection of functions)
			// This means that {{tmpl foo}} treats foo as a template (which IS a function).
			// Explicit parens can be used if foo is a function that returns a template: {{tmpl foo()}}.
		},
		"wrap": {
			_default: { $2: "null" },
			open: "try{$item.calls(__,$1,$2);__=[];",
			close: "call=$item.calls();__=call._.concat($item.wrap(call,__));}catch(e){}"
		},
		"each": {
			_default: { $2: "$index, $value" },
			open: "try{if($notnull_1){$.each($1a,function($2){with(this){",
			close: "}});}}catch(e){}"
		},
		"if": {
			open: "try{if(($notnull_1) && $1a){",
			close: "}}catch(e){}"
		},
		"else": {
			_default: { $1: "true" },
			open: "}else if(($notnull_1) && $1a){"
		},
		"html": {
			// Unecoded expression evaluation.
			open: "try{if($notnull_1){__.push($1a);}}catch(e){}"
		},
		"=": {
			// Encoded expression evaluation. Abbreviated form is ${}.
			_default: { $1: "$data" },
			open: "try{if($notnull_1){__.push($.encode($1a));}}catch(e){}"
		},
		"!": {
			// Comment tag. Skipped by parser
			open: ""
		}
	};
	
	/**
	 * adj_20210624
	 * {{valiableName}} or {{= valiableName}}
	 * jquery.tmpl.js function buildTmplFn(markup){markup = $.markupFilter(markup); ...} 
	 * 내부 최상위에서 markup 필터 적용을 해야 한다 markup = $.markupFilter(markup); 를 먼저 진행 해야 한다
	 */
	$.markupFilter = function(markup) {
		if (!markup) {
			return markup;
		}
		
		var markupArr = markup.split("{{");
		var tags = Object.keys(jQuery.tmpl.tag);
		// if else /if : 대응
		tags.push("/");
		
		var isTagStart = false;
		markupArr.forEach(function(v, i) {
			
			if (v.indexOf("}}") >= 0) {
				isTagStart = false;
				tags.forEach(function(v2, i2) {
					if (v.indexOf(v2) == 0) {
						isTagStart = true;
						return true;
					}
				});
				if (!isTagStart) {
					if (v.indexOf(" ") != 0) {
						v = " " + v;
					}
					
					markupArr[i] = "=" + v; 
				}
			}
		});
		
		markup = markupArr.join("{{");
		
		return markup;
	}
	
	/* *
	 * @param {String} elementId : template replace to element id '#' 생략 가능
	 * @param {Object} obj : template  replace to data 
	 */
	$.tmpl_set = function(elementId, tmplId, obj) {		
		// elementId
		if (elementId && elementId.indexOf('#') != 0) {
			elementId = '#' + elementId;
		}

		if (typeof obj === 'undefined') {
			if (!(typeof tmplId === 'string' && tmplId.indexOf('_tmpl') === tmplId.length - 5)) {
				obj = tmplId;
				tmplId = '';
			}
		}
		
		if (!tmplId) {
			// tmplId
			tmplId = elementId + '_tmpl';
		}
		
		if (tmplId && tmplId.indexOf('#') != 0) {
			tmplId = '#' + tmplId;
		}
		
		$(elementId).html('');
		$(tmplId).tmpl(obj).appendTo(elementId);
	};

	/* *
	 * @param {String} elementId : template replace to element id '#' 생략 가능
	 * @param {Object} obj : template  replace to data 
	 */
	$.tmpl_after = function(elementId, tmplId, obj) {
		// elementId
		if (elementId && elementId.indexOf('#') != 0) {
			elementId = '#' + elementId;
		}

		if (typeof obj === 'undefined') {
			if (!(typeof tmplId === 'string' && tmplId.indexOf('_tmpl') === tmplId.length - 5)) {
				obj = tmplId;
				tmplId = '';
			}
		}
		
		if (!tmplId) {
			// tmplId
			tmplId = elementId + '_tmpl';
		}
		
		if (tmplId && tmplId.indexOf('#') != 0) {
			tmplId = '#' + tmplId;
		}
		
		$(elementId).after($(tmplId).tmpl(obj));
	};

	/* *
	 * @see template append to element  
	 *
	 * @param {String} elementId : template replace to element id '#' 생략 가능
	 * @param {Object} obj : template  replace to data > Array > auto for
	 * @param {Boolean} isRefresh : append before element innerHTML remove
	 */
	$.tmpl_append = function(elementId, tmplId, obj, isRefresh) {
		// elementId
		if (elementId && elementId.indexOf('#') != 0) {
			elementId = '#' + elementId;
		}

		if (typeof obj === 'undefined') {
			if (!(typeof tmplId === 'string' && tmplId.indexOf('_tmpl') === tmplId.length - 5)) {
				obj = tmplId;
				tmplId = '';
			}
		}
		
		if (!tmplId) {
			// tmplId
			tmplId = elementId + '_tmpl';
		}
		
		if (tmplId && tmplId.indexOf('#') != 0) {
			tmplId = '#' + tmplId;
		}
		
		if (isRefresh) {
			$(elementId).html('');
		}
		
		var list = [];
		if (Array.isArray(obj)) {
			list = obj;
		} else {
			list.push(obj);
		}
		
		list.forEach(function(v) {
			$(tmplId).tmpl(v).appendTo(elementId);
		});
	};
	
	/* *
	 * @see template prepend to element  
	 *
	 * @param {String} elementId : element id '#' 생략 가능
	 * @param {Object} obj : template  replace to data > Array > auto for
	 * @param {Boolean} isRefresh : prepend before element innerHTML remove
	 */
	$.tmpl_prepend = function(elementId, tmplId, obj, isRefresh) {
		// elementId
		if (elementId && elementId.indexOf('#') != 0) {
			elementId = '#' + elementId;
		}

		if (typeof obj === 'undefined') {
			if (!(typeof tmplId === 'string' && tmplId.indexOf('_tmpl') === tmplId.length - 5)) {
				obj = tmplId;
				tmplId = '';
			}
		}
		
		if (!tmplId) {
			// tmplId
			tmplId = elementId + '_tmpl';
		}
		
		if (tmplId && tmplId.indexOf('#') != 0) {
			tmplId = '#' + tmplId;
		}
		
		if (isRefresh) {
			$(elementId).html('');
		}
		
		var list = [];
		if (Array.isArray(obj)) {
			list = obj;
		} else {
			list.push(obj);
		}
		
		list.forEach(function(v) {
			$(tmplId).tmpl(v).prependTo(elementId);
		});
	};
})();

/* *
 * @param {String} elementId : template replace to element id '#' 생략 가능
 * @param {Object} obj : template  replace to data 
 */
function ao_html(elementId, tmplId, obj) {
	$.tmpl_set(elementId, tmplId, obj);
};

/* *
 * @param {String} elementId : template replace to element id '#' 생략 가능
 * @param {Object} obj : template  replace to data 
 */
function ao_after(elementId, tmplId, obj) {
	$.tmpl_after(elementId, tmplId, obj);
};

/* *
 * @see template append to element  
 *
 * @param {String} elementId : template replace to element id '#' 생략 가능
 * @param {Object} obj : template  replace to data > Array > auto for
 * @param {Boolean} isRefresh : append before element innerHTML remove
 */
function ao_append(elementId, tmplId, obj, isRefresh) {
	$.tmpl_append(elementId, tmplId, obj, isRefresh);
}

/* *
 * @see template prepend to element  
 *
 * @param {String} elementId : element id '#' 생략 가능
 * @param {Object} obj : template  replace to data > Array > auto for
 * @param {Boolean} isRefresh : prepend before element innerHTML remove
 */
function ao_prepend(elementId, obj, isRefresh) {
	$.tmpl_prepend(elementId, obj, isRefresh);
}

/**
 * ao로 해당 부분을 그렸을때 해당 Dom 엘리먼트 그 자손 엘리먼트 자체나
 * 엘리먼트에서 작동한 이벤트로 부터 데이터를 가져옵니다
 *
 * @param {HTMLElement | Event | jQuery.Event} obj - 이벤트나 html 태그
 * @returns {Object}
 */
function ao_data(obj) {
	if(!obj) throw new TypeError();

	var isElement = obj instanceof HTMLElement;
	var target = isElement ? obj : obj.target;

	return $(target).tmplItem().data;
}