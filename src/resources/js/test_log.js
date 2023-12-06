/**
 * log
 */
(function (root, definition) {
	"use strict";
	root.log = definition();
}(this, function() {
	"use strict";
	var noop = function () {};
	var undefinedType = 'undefined';
	var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
		/Trident\/|MSIE /.test(window.navigator.userAgent)	
	);
	
	var logMethods = ['trace', 'debug', 'info', 'warn', 'error'];
	
	function bindMethod(obj, methodName) {
		var method = obj[methodName];
		if (typeof method.bind === 'function') {
			return method.bind(obj);
		} else {
			try {
				return Function.prototype.bind.call(method, obj);
			} catch (e) {
				return function () {
					return Function.prototype.apply.apply(method, [obj, arguments]);
				};
			}
		}
	}
	
	function realMethod(methodName) {
		if (methodName === 'debug') {
			methodName = 'log';
		}
		
		if (typeof console === undefinedType) return false;
		else if (methodName === 'trace' && isIE) return false;
		else if (console[methodName] !== undefined) return bindMethod(console, methodName);
		else if (console.log !== undefined) bindMethod(console, 'log');
		else return noop;
	}
	
	function replaceLoggingMethods(lv, loggerName) {
		for (var i = 0; i < logMethods.length; i++) {
			var methodName = logMethods[i];
			this[methodName] = (i < lv) ?
					noop : this.methodFactory(methodName, lv, loggerName);
		}
		
		this.log = this.debug;
	}
	
	function lazyLogger(methodName, lv, loggerName) {
		return function () {
			if (typeof console !== undefinedType) {
				replaceLoggingMethods.call(this, lv, loggerName);
				this[methodName].apply(this, arguments);
			}
		};
	}
	
	function defaultMethodFactory(methodName, lv, loggerName) {
		return realMethod(methodName) ||
		lazyLogger.apply(this, arguments);
	}
	
	function Logger(name, defaultLv, factory) {
		var self = this;
		var currLv;
		var storageKey = 'logLv';
		if (name) {
			storageKey += ':' + name;
		}
		

		function persistLvIfPossible(lv) {
			var lvNm = (logMethods[lv] || 'silent').toUpperCase();
			
			if (typeof window === undefinedType) return;
			
			try {
				window.sessionStorage[storageKey] = lvNm; return;
			} catch(ignore) {console.log(ignore);}
			
			try {
				window.document.cookie = encodeURIComponent(storageKey) + '=' + lvNm + ';';
			} catch (ignore) {console.log(ignore);}
		}
		
		function getPersistedLv() {
			var storedLv;
			
			if (typeof window === undefinedType) return;
			
			try {
				storedLv = window.sessionStorage[storageKey];
			} catch (ignore) {console.log(ignore);}
			
			if (typeof storedLv === undefinedType) {
				try {
					var cookie = window.document.cookie;
					var location = cookie.indexof(
						encodeURIComponent(storageKey) + '='	
					);
					if (location !== -1) {
						storedLv = /^([^;]+)/.exec(cookie.slice(location))[1];
					}
				} catch (ignore) {console.log(ignore);}
			}
			
			if (self.levels[storedLv] === undefined) {
				storedLv = undefined;
			}
			return storedLv;
		}
		
		self.name = name;
		
		self.levels = {
				'TRACE': 0, 'DEBUG': 1, 'INFO': 2, 'WARN': 3,
				'ERROR': 4, 'SILENT': 5
		};
		
		self.methodFactory = factory || defaultMethodFactory;
		
		self.getLv = function () {
			return currLv;
		}
		
		self.setLv = function (lv, persist) {
			if (typeof lv === 'string' && self.levels[lv.toUpperCase()] !== undefined) {
				lv = self.levels[lv.toUpperCase()];
			}
			if (typeof lv === 'number' && lv >=0 && lv <= self.levels.SILENT) {
				currLv = lv;
				if (persist !== false) {
					persistLvIfPossible(lv);
				}
				replaceLoggingMethods.call(self, lv, name);
				if (typeof console === undefinedType && lv < self.levels.SILENT) {
					return '콘솔이 없다.';
				}
			} else {
				throw '잘못된 로그레벨 요청: ' + lv; 
			}
		};
		
		self.setDefaultLv = function (lv) {
			if (!getPersistedLv()) {
				self.setLv(lv, false);
			}
		};
		
		self.enableAll = function (persist) {
			self.setLv(self.levels.TRACE, persist);
		};
		
		self.disableAll = function (persist) {
			self.setLv(self.levels.SILENT, persist);
		};
		
		var initialLv = getPersistedLv();
		if (initialLv == null) {
			initialLv = defaultLv == null ? 'WARN' : defaultLv;
		}
		self.setLv(initialLv, false);
		
	}
	
	return new Logger();
}));


/**
 * loa
 */
var loa = new (function Loa() {
	var self = this;
	
	/**
	 * 프로퍼티 모음
	 */
	self.prop = {
		key: {
			isLogCollapsed: 'loa.prop.isLogCollapsed',
			isDummy: 'loa.prop.isDummy'
		}
	}
	
	/**
	 * 자주쓰는 유틸성 함수(fn) 모음.
	 */
	self.fn = {
		/**
		 * $.ajax 래퍼
		 * - param의 동적 키값 매핑 처러
		 * - successCallback 에 settings 값을 보내줘서, request 등 send 당시 파라미터 공유 가능
		 * - 사실 백엔드 개발도 가능한 상황이라 굳이 콜백지옥을 위한 promise 쓸 필요 없지만, 융통성을 위해 추가
		 */
		ajax: (url, param, successCallback, errorCallback) => {
			return new Promise(async (success, error) => {
				url = $.trim(url);

				if (param) {
					param = self.fn.deepClone(param);
					// 없는 값의 키는 제거
					Object.keys(param).forEach(k => (param[k] === undefined || param[k] === null || param[k] === '') && delete param[k]);
				}

				var settings = {
					url: url,
					type: 'POST',
					data: param,
					dataType: 'json'
				};

				var then0 = (data) => successCallback ? successCallback(data, settings) : success([data, settings]);
				var then1 = (jqXHR, textStatus, textErrorThrown) => errorCallback ? errorCallback(jqXHR, textStatus, textErrorThrown) : error([jqXHR, textStatus, textErrorThrown]);
				
				if (self.fn.isDummy()) {
					self.prop.dummy || (self.prop.dummy = await promise('/resources/js/views/loan/dummy/20210913.json'));
					then0(self.prop.dummy[url]);
					alert(self.prop.dummy[url], settings);
				} else {
					$.ajax($.extend(true, settings, {success: then0, error: then1}));
				}
			});
		},
		/**
		 * Loa.js 전용 로그를 펼치는 여부
		 */
		isLogCollapsed: () => sessionStorage.getItem(self.prop.key.isLogCollapsed) === 'Y',
		onLogCollapsed: () => sessionStorage.setItem(self.prop.key.isLogCollapsed, 'Y'),
		offLogCollapsed: () => sessionStorage.setItem(self.prop.key.isLogCollapsed, 'N'),
		/**
		 * Dummy 데이터
		 */
		isDummy: () => sessionStorage.getItem(self.prop.key.isDummy) === 'Y',
		onDummy: () => sessionStorage.setItem(self.prop.key.isDummy, 'Y'),
		offDummy: () => sessionStorage.setItem(self.prop.key.isDummy, 'N'),
		// 깊은 복사
		deepClone: obj => JSON.parse(JSON.stringify(obj)),
		/**
		 * 환경 프로파일 체크
		 */
		isLoc: pageCom.prop.profile === 'loc' || location.href.indexOf('localhost') > -1 || location.href.indexOf('192.168') > -1,
		isDev: pageCom.prop.profile === 'dev' || location.href.indexOf('mdd.kiwoom.com') > -1,
		isPrd: pageCom.prop.profile === 'prd'
	}

	
	var promise = (url, settings={}) => {
		return new Promise((success, error) => {
            $.ajax(url, {
                type: settings.type || 'get',
                dataType: settings.dataType || 'json',
                success: success,
                error: (a, b, c, d) => {
                    error([a,b,c,d]);
                }
            });
        });
	}
	
	var alert = function (resJson, settings) {
		Object.values(resJson).forEach(v => {
			if (v && v.resp_gubn) {
				if (v.resp_gubn > 0) {
					// 여러번 alert 호출하면 최후에 호출된 내용만 남음.
					mydataCommon.msg.alert({
						msg: v.resp_mesg,
						msg2: settings.url + (v.svcId ? ' | ' + v.svcId : '')
					});
				}
			}
		})
	}
	/**
	 * jquery 전역 event 초기화. 외부에서는 접근 불가.
	 */
	var listener = function () {
		// 전역 ajax 설정
		$(window).ajaxSend(function (evt, jqxhr, settings) {
			jqxhr.startTime = Date.now();
		}).ajaxSuccess(function (evt, jqxhr, settings) {
			if (log.getLv() <= log.levels.DEBUG) {
				var reqParam = settings.data;
				var reqContentType = settings.contentType;
				var res = (settings.dataType === 'json') ? JSON.stringify(jqxhr.responseJSON, null, 2) : jqxhr.responseText.substring(0, 100);
				
				if (reqContentType) {
					if (reqContentType.includes('application/x-www-form-urlencoded')) {
						reqParam = reqParam ? decodeURIComponent(reqParam.replace(/\+/g, ' ')) : '';
					} else if (reqContentType.includes('application/json')) {
						reqParam = reqParam ? JSON.stringify(JSON.parse(reqParam), null, 2) : '';
					}
				}
				
				var leadTime = (Date.now() - jqxhr.startTime) / 1000;
				var logCss = leadTime > 1 ? 'background: pink; color: black' : '';
				var sum = settings.type + ' - ' + settings.url + ' : %c' + leadTime + 's%c' 
						+ (reqParam ? '\n' + reqParam : '');
				
				if (self.fn.isLogCollapsed()) {
					console.groupCollapsed(sum, logCss, '');
					//log.trace(res);
					console.groupEnd();
				} else {
					console.group(sum, logCss, '');
						log.log(res);
						console.groupCollapsed(`${settings.url} stacktrace`);
							//log.trace();
						console.groupEnd();
					console.groupEnd();
				}
			}
			
			if (self.fn.isDummy()) return;
			
			var resJson = (settings.dataType === 'json') ? jqxhr.responseJSON : JSON.parse(jqxhr.responseText);
			alert(resJson, settings);
			
		}).ajaxError(function (evt, jqxhr, settings, err) {
			var res = (settings.dataType === 'json') ? jqxhr.responseJSON : (jqxhr.responseText ? jqxhr.responseText.substring(0, 100) : jqxhr);
			
			log.error({
				status: jqxhr.status,
				statusText: jqxhr.statusText,
				type: settings.type,
				url: settings.url,
				data: settings.data
			}, res, err);
			
			mydataCommon.msg.alert({
				msg: '오류가 발생하였습니다. \n계속발생시 시스템 담당자에게 문의 하시길 바랍니다.',
				msg2: `${settings.url} | ${jqxhr.status}: ${jqxhr.statusText}`
			});
		});
	}

	
	/**
	 * Loa.js 임포트 시에 최초 실행
	 */
	var init = function () {
		// 개발계에서만 log 활성화
		if (self.fn.isLoc || self.fn.isDev) {
			log.enableAll();
		} else {
			log.disableAll();
		}
		
		listener();
	}
	
	init();
})();
