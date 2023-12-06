/* --------------------------------------------------------------- *
 * @version : 2.3
 * @date : 2022.06.17
 * @description : 키움증권 마이데이터 모바일 UI/UX Script
 * --------------------------------------------------------------- */

var KW_MOBILE = (function (kw, $) {  
    kw.init = function () {
        // Layout
        kw.layout.init();

        // GUI Components
        kw.guiEvent.init();

        // Forms
        kw.formEvent.init();
    }

    /**
     * Layout
     */ 
    kw.layout = {
        init: function () {

        }
    }

    /**
     * GUI Components
     */
    kw.guiEvent = {
        init: function () {
            kw.guiEvent.pageInform.init();
            // kw.guiEvent.buttons.init();
            kw.guiEvent.tabs.init();
            kw.guiEvent.accordion.init();
            kw.guiEvent.toolTip.init();
            kw.guiEvent.popup.init();
            kw.guiEvent.swiper.init();
            kw.guiEvent.detailBox.init();
            kw.guiEvent.mainLoader.init();
        }
    }

    kw.guiEvent.buttons = {
        init: function() {

        }
    }

    kw.guiEvent.tabs = {
        init: function () {
            // 탭 초기화
            this._setDefaultTab();
            // 탭 버튼 클릭
            this._setTabClick();
        },
        _setDefaultTab: function() {
            $('.tab-head').each(function () {
                var setDefault = $(this).find('.tab-btn.is-selected');

                if (!setDefault.length) {
                    setDefault = $(this).find('.tab-btn')
                        .first()
                        .addClass('is-selected');
                }

                $('#' + setDefault.attr('aria-controls')).addClass('is-selected');
            });
        },
        _setTabClick: function() {
            $('.tab-btn').off('click').on('click', function () {
                $(this).addClass('is-selected')
                    .siblings()
                    .removeClass('is-selected');

                $('#' + $(this).attr('aria-controls'))
                    .addClass('is-selected')
                    .siblings('.tab-panel')
                    .removeClass('is-selected');
                    
                // $('.tab-panel.is-selected').scrollTop(0);
            });
        }
    }

    // 메인 탭 고정 및 위치 이동, 스크롤과 연동 (.page-wrapper 부분에 .sticky-wrap 필히 포함)
    // el이 있는경우 첫번째 탭 커스텀 (금융사 선택)
    kw.guiEvent.stickyTab = {
        init: function (el) {
            var scrollModule = $('.sticky-wrap > main'),
                stickyTab = $('.sticky-wrap .sticky-tab'),
                stickyTabHeight = stickyTab.innerHeight(),
                tabBtn = stickyTab.find('.tab-btn'),
                tabBtnDefault = tabBtn.first().attr('aria-controls'),
                tabBtnList = tabBtn.map(function () {
                    var target = '#' + $(this).attr('aria-controls');
                    if ($(target).length) return $(target);
                });

            if ($('.sticky-wrap header').length) stickyTabHeight += $('header').innerHeight()

            var chkScroll = function() {
                // 분석홈 탭 라운드 처리 제거
                if (stickyTab.offset().top == 0) stickyTab.addClass('is-pinned');
                else stickyTab.removeClass('is-pinned');

                var current = tabBtnList.map(function() {
                    if ($(this).offset().top < stickyTabHeight + 1) return this;
                });

                current = current[current.length - 1];
                var id;

                if (el == undefined) {
                    id = (current && current.length) ? current[0].id : tabBtnDefault;
                } else {
                    if ($('#' + tabBtnDefault).hasClass('is-selected')) {
                        id = tabBtnDefault;
                    } else {
                        id = current[0].id;
                        if (id == tabBtnDefault) id = tabBtn.next().attr('aria-controls');
                        
                    }
                };
                
                tabBtn.removeClass('is-selected').filter("[aria-controls='" + id + "']").addClass('is-selected');
                
                var btnPos = parseInt($('[aria-controls="' + id + '"]').position().left + 20);
                if (stickyTab.width() < btnPos) $('.sticky-tab').scrollLeft(btnPos);
                else $('.sticky-tab').scrollLeft(-btnPos);
            }

            var chkTab = function(e) {
                e.preventDefault();

                var target = '#' + $(this).attr('aria-controls'),
                    targetOffsetTop = $(target).offset().top,
                    targetPosition = targetOffsetTop + scrollModule.scrollTop() - stickyTabHeight;

                scrollModule.off('scroll').animate(
                    {scrollTop: targetPosition}, 
                    {complete: function() {scrollModule.off('scroll').on('scroll', chkScroll);}}
                );
            }

            scrollModule.on('scroll', chkScroll);
            tabBtn.on('click', chkTab);
        }
    }

    kw.guiEvent.accordion = {
        init: function(target) {
            if(target) this.$accordion = $(target+' .accordion');
            else this.$accordion = $('.accordion');
            // 아코디언 초기화
            this._setDefaultAccordion();
            // 아코디언 클릭
            this._setButtonClick();
        },
        _setDefaultAccordion: function() {
            this.$accordion.each(function() {
                var $foldBody = $(this).find('.fold-body');
                $(this).hasClass('is-open') ? $foldBody.slideToggle(200) : $foldBody.hide();
            });
        },
        _setButtonClick: function() {
            this.$accordion.each(function() {
                var _this = $(this);
                var $btnFold = _this.find('.btn-fold');
                var $foldBody = _this.find('.fold-body');

                $btnFold.off('click').on('click', function() {
                    if (_this.hasClass('disabled')) return false;
                    _this.toggleClass('is-open');
                    $foldBody.stop().slideToggle(200);

                    if (_this.parent().hasClass('type-close')) siblingsClose();
                });

                function siblingsClose() {
                    _this.siblings()
                    .find('.fold-body')
                    .slideUp(200, function() {
                        _this.siblings().removeClass('is-open');
                    });
                    return false;
                }
            });
        }
    }

    kw.guiEvent.toolTip = {
        init: function() {
            this._bindEvent();
        },
        _bindEvent: function() {
            $('.tooltip').off('click').on('click', function() {
                var dataTooltip = $(this).data('tooltip');
                var dataTooltipBox = $('[data-tooltip-box = ' + dataTooltip + ']');

                dataTooltipBox.addClass('is-open').after('<div class="dimmed"></div>');
                $('.dimmed').off('click').on('click', function() {
                    $(this).prev().removeClass('is-open');
                    $(this).remove();
                    kw.guiEvent.bodyFixed.scroll();
                });
                kw.guiEvent.bodyFixed.fixed();
            });

            $('.tooltip-close').off('click').on('click', function() {
                $(this).parent().removeClass('is-open').next('.dimmed').remove();
                kw.guiEvent.bodyFixed.scroll();
            });
        }
    }

    kw.guiEvent.pageInform = {
        init: function() {
            this._hideBox();
        },
        _hideBox: function() {
            $('.page-inform button').off('click').on('click', function() {
                var pageInform = $(this).closest('.page-inform');

                pageInform.addClass('hide').one('transitionend', function() {
                    $(this).slideUp();
                });
            });
        }
    }

    kw.guiEvent.popup = {
        init: function() {
            this._bindEvent();
        },
        _bindEvent: function() {
            var _this = this;

            $('.modal-close').off('click').on('click', function() {
                var targetId = $(this).closest('article').attr('id');
                if (targetId) _this.closePop('#' + targetId);
            });
        },
        openPop: function(el, url, callback) {
            let _opend = $(document).find('.is-open').length;
            let  zIndex;
            var _this = this,
                target = $(el);
            if (el === undefined || target.length === 0) return;
            if( _opend> 0){
                zIndex = _opend * 510;
            }
            if (url) target.load(url, callback);

            target.css('z-index',zIndex).addClass('is-open').after('<div class="dimmed"></div>');
            kw.guiEvent.bodyFixed.fixed(); 
            
            $('.dimmed').off('click').on('click', function() {
                var targetId = $(this).prev('.modal-popup').not('.popup-alert').attr('id');
                if (targetId) _this.closePop('#' + targetId);
            });
        },
        closePop: function(el) {
            var target = $(el);
            if (el === undefined || target.length === 0) return;

            target.removeClass('is-open').css('z-index','').next('.dimmed').remove();
            kw.guiEvent.bodyFixed.scroll();
        }
    }

      

    kw.guiEvent.swiper = {
        init: function () {
            // Swiper 초기화
            this.setDefaultSwiper();
            // this.runSwiper();
        },
        setDefaultSwiper: function() {
            $('.custom-swiper').each(function() {
                var boxShadow = $(this).find('.swiper-slide > .box-shadow');
                boxShadow.height(boxShadow.height());
            });
        },
        runSwiper: function(slide_target, autoplayFlag, typeFlag='bullets', space=20) {
            var mySwiper = new Swiper(slide_target, {
                spaceBetween: space, // 우축마진(default: 20px)
                // loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: true
                },
                pagination: {
                    type: typeFlag, // bullets, fraction
                    el: slide_target + ' .swiper-pagination'
                },
                observer: true,
                observeParents: true
            });
            
            try {
                if(!autoplayFlag) mySwiper.autoplay.stop();
            } catch(e) {console.log(e);}
        },
        runSwiperEffect: function(slide_target2, effectName, delaySec=2000, speedSec=1000, space=20) { 
            new Swiper(slide_target2, {
                spaceBetween: space,
                loop: true,
                autoplay: {
                    delay: delaySec,
                    disableOnInteraction: true
                },
                effect: effectName, // slide, cube, coverflow, flip, cards etc.
                speed: speedSec,
                observer: true,
                observeParents: true
            });
        },
        
    }
    
    // 계좌 상세보기 - 두줄을 제외한 show/hide box (자동)
    kw.guiEvent.detailBox = {
        init: function() {
            this._bindEvent();
        },
        _bindEvent: function() {
            var _this = this;
            var setTarget = $('.detail-collapse');

            setTarget.each(function() {
                var listNum = $(this).find('.data-list').length;
                var collapseBtn = $(this).siblings().find('a');

                (listNum <= 2) ? collapseBtn.hide() : $(this).height(60);

                collapseBtn.off('click').on('click', _this.toggleBtn);
            });
        },
        toggleBtn: function() {
            var target = $(this).parent().siblings('.detail-collapse');
            var curHeight = parseInt(target.height());
            var autoHeight = target.css('height', 'auto').height();

            if(curHeight !== 60) {
                target.animate({height: 60}, 'fast', 'linear');
                $(this).toggleClass('down').text('상세보기');
            } else {
                target.height(curHeight).animate({height: autoHeight}, 'fast', 'linear');
                $(this).toggleClass('down').text('닫기');
            }
        }
    }

    // 유의사항 - Show/hide box (수동)
    kw.guiEvent.collapseBox = function(el, targetText='더 보기') {
        if (el == undefined) return;

        var target = $(event.target);

        if (target.hasClass('down')) target.text(targetText);
        else target.text('닫기');

        $(el).slideToggle();
        target.toggleClass('down');
    }

    kw.guiEvent.toastBox = function(el) {
        if (el == undefined) return;

        var target = $(el);

        target.fadeIn(300, function() {
            setTimeout(function() {
                target.fadeOut(300);
            }, 700);
        });
    }

    // IOS 대응 Background scroll 방지
    kw.guiEvent.bodyFixed = {
        scroll: function() {   
            // 2중팝업 ios 스크롤이슈로 dimmed체크 추가 
            if (!$(".dimmed").is(":visible")) {
                $('body').removeClass('fixed').css({top: 0});
                $(window).scrollTop(this.ypos);
                $('.page-wrapper.main, .page-wrapper main').css({'overflow-y': ''}); // 22.08.25[수정]
            }
        },
        fixed: function() {
            this.ypos = $(document).scrollTop();            
            $('body').addClass('fixed').css({top: -1 * this.ypos});
            $('.page-wrapper.main, .page-wrapper main').css({'overflow-y': 'hidden'}); // 22.08.25[수정]
        }
    }

    // Home header loader
    kw.guiEvent.mainLoader = {
        init: function() {
            this.mainReloadBtn = $('.main-reload');
        },
        _floatLoader: function() {
            var floatHtml = `<div class="float-loading">Loading</div>`;
            var floatBtn = $('.float-loading');

            if(!floatBtn.length) $('.page-wrapper').append(floatHtml);            

            $(window).scroll(function() {
                var scrollTop = $(this).scrollTop();
                var floatBtn = $('.float-loading');

                if (scrollTop > 100) floatBtn.css({'top': '24px', 'opacity': 1});
                else floatBtn.css({'top': '-50px', 'opacity': 0});
            });

            this._loaderCounter();
        },
        _loaderCounter: function() {
            this.mainReloadBtn.find('span').show();

            $({val: 0}).animate({val: 99}, {
                duration: 10000,
                easing: 'linear',
                step: function() {
                    var num = Math.floor(this.val);
                    $('.main-reload i').text(num);
                },
                complete: function() {
                    var num = Math.floor(this.val);
                    $('.main-reload i').text(num);
                }
            });
        },
        start: function() {
            this.mainReloadBtn.addClass('start');
            this._floatLoader();
        },
        stop: function() {
            this.mainReloadBtn.removeClass('start');
            $('.float-loading').remove();
        }
    }

    // Go to Top
    kw.guiEvent.goTop = {   // main tag가 있는 경우만 사용 가능
        init: function() {
            $('.page-wrapper').append('<a href="#;" class="btn-go-top"></a>');
            
            var targetBtn = $('.btn-go-top');

            targetBtn.on('click', function(e) {
                e.preventDefault();
                $('.page-wrapper, main').animate({scrollTop: 0}, 500);
            });

            $('.page-wrapper, main').scroll(function() {
                $(this).scrollTop() > 180 ? targetBtn.fadeIn(300) : targetBtn.fadeOut(300);
            });
        }
    }

    /**
     * Form
     */
    kw.formEvent = {
        init: function () {
            kw.formEvent.inputClear.init();
            kw.formEvent.customSelect.init();
            // kw.formEvent.chkScrollBottom.init();
            kw.formEvent.calendar.init();
        }
    }

    kw.formEvent.customSelect = {
        init: function(target) {

            if(target) this.selectBox = $(target+'.custom-select2');
            else this.selectBox = $('.custom-select2');

            if(this.selectBox.length) {
                this._bindEvent();
                this.setTemplate();
                this.openSelect();
            }
        },
        _bindEvent: function() {
            this.selectBox.each(function() {                
                var chkRender = $(this).find('p.selected-item').length;
                if(!chkRender) {
                    var originSelect = $(this).find('select'),
                        selectedFlag = originSelect.find('option:selected') || originSelect.find('option:ep(0)'),
                        chkPlaceholder = $(this).data('placeholder');

                    if(chkPlaceholder) originSelect.after(`<p class="selected-item fc-gray-l">${chkPlaceholder}</p>`);
                    else originSelect.after(`<p class="selected-item">${selectedFlag.text()}</p>`);
                }                
            });
        },        
        setTemplate: function() {
            var bottomsheet = `
                <div class="modal-popup bottomsheet popup-select" id="custom_select_option">
                    <div class="modal-header">
                        <h1></h1>
                        <button type="button" class="modal-close">닫기</button>
                    </div>
                    <div class="modal-body"></div>
                    <div class="modal-footer">
                        <div class="btn-box">
                            <button type="button" class="btn btn-footer btn-primary">선택하기</button>
                        </div>
                    </div>
                </div>
            `;

            if($('#custom_select_option').length) $('#custom_select_option').remove();
            $('body').append(bottomsheet);
        },
        openSelect: function() {
            var _this = this;
            this.selectBox.not('.custom-popup').off('click').on('click', function() {
                var disabledFlag = $(this).hasClass('disabled');
                if(!disabledFlag) {
                    var selectTitle = $(this).data('title') || '선택하세요';
                    var originSelect = $(this).find('select'),                    
                        selectOption = originSelect.children('option'),
                        selectedIdx = originSelect[0].selectedIndex, 
                        optionChk = 'checked',
                        disabledChk = 'disabled',
                        bottomSheetTitle = $('#custom_select_option .modal-header h1'),
                        bottomSheetBody = $('#custom_select_option .modal-body');

                    bottomSheetTitle.text(selectTitle);
                    bottomSheetBody.empty();
                    for (var i = 0; i < selectOption.length; i++) {
                        var optionList = `
                            <div class="custom-radio radio-vertical">
                                <input type="radio" name="select-radio" id="select-radio-${i}" ${i == selectedIdx ? optionChk : ''} ${selectOption.eq(i).hasClass(disabledChk) ? disabledChk : ''} />
                                <label for="select-radio-${i}"><i></i>${selectOption.eq(i).text()}</label>
                            </div>`;

                        bottomSheetBody.append(optionList);
                    }

                    KW_MOBILE.guiEvent.popup.openPop('#custom_select_option');

                    var targetTop = $('[name=select-radio]:checked').closest('.custom-radio').position().top, 
                        isVisible = targetTop >= 0 && targetTop <= bottomSheetBody.outerHeight();
                    if (!isVisible) {
                        bottomSheetBody.animate({
                            scrollTop: bottomSheetBody.scrollTop() + targetTop - 88 /* -(Header-height + padding-top) */
                        }, 500);
                    }

                    _this.closeSelect(originSelect);
                }
            });
        },
        closeSelect: function(target) {
            var targetOption = target.find('option'),
                optionClose = $('#custom_select_option .modal-close'),
                optionSelect = $('#custom_select_option .btn-footer');
                
            optionClose.off('click').on('click', function()  {
                KW_MOBILE.guiEvent.popup.closePop('#custom_select_option');
            });

            optionSelect.off('click').on('click', function() {
                var radioIdx = $('[name="select-radio"]:checked').index('[name="select-radio"]'),
                    targetText = targetOption.eq(radioIdx).text();
                targetOption.prop('selected', false).eq(radioIdx).prop('selected', true);
                target.change().next('.selected-item').removeClass('fc-gray-l').text(targetText);
                KW_MOBILE.guiEvent.popup.closePop('#custom_select_option');
                $('#custom_select_option .modal-body').empty();
            });
        }
    }

    kw.formEvent.inputClear = {
        init: function() {
            this._setKeyUp();
            this._setClearButton();
        },
        _setKeyUp: function() {
            var target = $('.custom-input.clear');
            var setClearBtn = `<button type="button">초기화</button>`;
            target.wrap('<div class="input-clear"/>').after(setClearBtn);

            target.on('focus blur keyup', function() {
                var btnClear = $(this).next('button');
                $(this).val().length ? btnClear.show() : btnClear.hide();
            })
        },
        _setClearButton: function() {
            $('.input-clear > button').off('click').on('click', function() {
                $(this).hide().prev('input').val('').change();
            });
        }
    }

    // Scroll 맨 밑인지 여부 체크 - Footer btn(.chk-disabled) disabled 해제
    kw.formEvent.chkScrollBottom = {
        init: function() {
            this.checkScroll();
        },
        checkScroll: function() {
            var targetScroll = $('.module-wrapper, .modal-body');
            var chkDisabledBtn = $('.chk-disabled');

            if(!chkDisabledBtn.length) return false;

            chkDisabledBtn.prop('disabled', true);

            targetScroll.scroll(function() {
                if(targetScroll.scrollTop() + targetScroll.height() > targetScroll[0].scrollHeight - 100) {
                    chkDisabledBtn.prop('disabled', false);
                }
            });
        }
    }

    kw.formEvent.calendar = {
        init: function () {
            var date = new Date();
            this.currentMonth = date.getMonth();
            this.currentDate = date.getDate();
            this.currentYear = date.getFullYear();

            this._setMonthCal();
            this._setDayCal();
        },
        _setMonthCal: function() {
            $('.custom-input.calendar.month').datepicker({
                language: 'ko',
                autoClose: true,
                navTitles: {
                    days: 'yyyy<span>년</span> MM ',
                    months: 'yyyy<span>년</span>',
                    years: 'yyyy1 - yyyy2'
                },
                view: 'months',
                minView: 'months',
                dateFormat: 'yyyy.mm',
                minDate: new Date(this.currentYear, this.currentMonth-60, this.currentDate),
                maxDate: new Date(this.currentYear, this.currentMonth-12, this.currentDate),
                prevHtml: '<svg><path d="M 17,9 l -7,7 l 7,7"></path></svg>',
                nextHtml: '<svg><path d="M 14,9 l 7,7 l -7,7"></path></svg>',
                onShow: function(param) {
                    $('body').css('overflow','hidden');
                    var isDim = $('#datepickers-container > .dimmed').length;
                    if(isDim == 0) param.$datepicker.after('<div class="dimmed"></div>');
                },
                onHide: function() {
                    $('body').css('overflow','');
                    $('#datepickers-container > .dimmed').remove();
                },
                onSelect: function(fd, date, param) {
                    $(param.el).change();
                }
            });
        },
        _setDayCal: function() {
            $('.custom-input.calendar.day').datepicker({
                language: 'ko',
                autoClose: true,
                navTitles: {
                    days: 'yyyy<span>년</span>&nbsp;MM ',
                    months: 'yyyy<span>년</span>',
                    years: 'yyyy1 - yyyy2'
                },
                view: 'days',
                minView: 'days',
                dateFormat: 'yyyy.mm.dd',
                // minDate: new Date(this.currentYear, this.currentMonth, this.currentDate),
                maxDate: new Date(this.currentYear, this.currentMonth, this.currentDate),
                prevHtml: '<svg><path d="M 17,9 l -7,7 l 7,7"></path></svg>',
                nextHtml: '<svg><path d="M 14,9 l 7,7 l -7,7"></path></svg>',
                showOtherMonths: false,
                selectOtherMonths: false,
                onRenderCell: function(date, cellType) {
                    if (cellType == 'day') {
                        var day = date.getDay(),
                        isSun = [0].indexOf(day) != -1,
                        isSat = [6].indexOf(day) != -1;
    
                        if(isSun == true) return { classes: 'fc-red' }
                        if(isSat == true) return { classes: 'fc-blue' }
                    }
                },
                onShow: function(param) {
                    $('body').css('overflow','hidden');
                    var isDim = $('#datepickers-container .dimmed').length;
                    if(isDim <= 0) param.$datepicker.after('<div class="dimmed"></div>');
                },
                onHide: function() {
                    $('body').css('overflow','');
                    $('.datepickers-container > .dimmed').remove();
                },
                onSelect: function(fd, date, param) {
                    $(param.el).change();
                }
            });
        },
    }

    /**
     * Highcharts
     */
    kw.highcharts = {
        general: {
            chart: {
                style: {
                    fontFamily: 'Spoqa Han Sans Neo'
                }
            },
            credits: {enabled: false},
            exporting: {enabled: false},
            chart: {backgroundColor: null},
            title: {text: null},
            tooltip: {enabled: false},
            legend: {
                enabled: false,
                symbolWidth: 9,
                symbolHeight: 9,
                itemMarginBottom: 5,
                itemStyle: { 
                    color: '#1e1e1e',
                    fontSize: '11px' 
                },
                itemDistance: 10,
                padding: 0,
            },
            xAxis: {
                // plotLines: [{
                //     color: '#00ff00',
                //     width: 2,
                //     value: 5.5
                // }],
                gridLineColor: '#f5f5f5',
                lineColor: '#ddd'
                
            },
            yAxis: {
                gridLineColor: '#f5f5f5',
                lineColor: '#ddd',
                labels: {
                    style: { fontSize: '10px', color: '#888' }
                }
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        style: {
                            fontFamily: 'Spoqa Han Sans Neo',
                            fontWeight: 'normal'
                        }
                    },
                    events: {
                        legendItemClick: function(){
                            return false;
                        }
                    }
                },
                line: {
                    marker: {
                        radius: 3,
                        symbol: 'circle',
                        fillColor: '#2969ba'
                    },
                    states: {
                        hover: {enabled: false},
                        inactive: false
                    }
                },
                area: {
                    marker: {
                        radius: 3,
                        symbol: 'circle',
                        fillColor: '#2969ba'
                    },
                    states: {
                        hover: {enabled: false},
                        inactive: false
                    }
                },
                bar: {
                    borderWidth: 0,
                    states: {
                        hover: {enabled: false},
                        inactive: false
                    }
                },
                column: {
                    borderWidth: 0,
                    states: {
                        hover: {enabled: false},
                        inactive: false
                    }
                },
                pie: {
                    borderWidth: 0,
                    states: {
                        hover: {enabled: false},
                        inactive: false
                    }
                }
            },
            lang: {
                thousandsSep: ','
            }
        },
        // themes: {
        //     blue: {
        //         colors: ['#b9e6ec', '#8fd0d9', '#6dc2cd', '#3fabcb', '#3d94c0', '#3474ac', '#2a5599', '#1f3686', '#131c57', '#0c1138']
        //     },
        //     red: {
        //         colors: ['#fee0d2', '#ffc5aa', '#ff9b7a', '#fb6a4a', '#ef3a2d', '#cb181d', '#a50f15', '#67000c', '#500009', '#390007']
        //     }
        // },
        types: {
            line: {
                chart: { type: 'line' },
                yAxis: {
                    visible: true,
                    title: { enabled : false }
                },
                plotOptions: {
                    series: {
                        lineColor: '#96bae4',
                        label: { enabled: false },
                        dataLabels: {
                            useHTML: true,
                            inside: false,
                            overflow: 'none',
                            crop: false
                        }
                    }
                }
            },
            spline: {
                chart: {
                    type: 'spline',
                    scrollablePlotArea: {
                        minwidth: 600,
                        scrollPositionX: 1
                    }
                },
                spline: {
                    animation: { enabled: false }
                },                    
                xAxis: {
                    title: {
                        enabled: false,
                    },
                    labels: {
                        enabled: false
                    },
                    tickWidth: 0
                },
                yAxis: {
                    title: {
                        enabled: false,
                    },
                    labels: {
                        enabled: false
                    }
                }

            },
            area: {
                chart: { type: 'area' },
                xAxis: {
                    type: 'category',
                    labels: {
                        style: {
                            fontSize: '10px'
                        }
                    },
                    
                },
                yAxis: {
                    visible: true,
                    title: { enabled : false },
                    allowDecimals: false
                },
                plotOptions: {
                    series: {
                        lineWidth: 1,
                        label: { enabled : false }
                    }
                }
            },
            bar: {
                chart: { type: 'bar' },
                xAxis: {},
                yAxis: {},
                plotOptions: {}
            },
            stackedBar: {
                chart: { 
                    type: 'bar',
                    marginLeft: 1,
                    marginRight: 1
                },
                xAxis: {
                    visible: true,
                },
                yAxis: {
                    min: 0,
                    max: 100,
                    tickInterval: 20,
                    title: { enabled : false }
                },
                plotOptions: {
                    series: {
                        stacking: 'percent'
                    }
                }
            },
            column: {
                colors: ['#6666cc', '#d1d6e8'],
                chart: {
                    type: 'column',
                    marginTop: 20
                },
                xAxis: {
                    lineWidth: 1,
                    labels: { y: 20 },
                    style: {
                        color: '#888',
                        fontSize: '11px'
                    }
                },
                yAxis: {
                    visible: true,
                    title: { enabled : false }
                },
                plotOptions: {
                    column: {
                        customColumnRadius: 5, // Set Column Minus radius
                        dataLabels: {
                            enabled: false,
                            color: '#1e1e1e',
                            style: {
                                fontSize: '10px',
                                textOutline: false
                            },
                            y: -1
                        }                                              
                    }
                }
            },
            stackedColumn: {
                chart: {
                    type: 'column',
                    marginTop: 40
                },
                xAxis: {
                    visible: true
                },
                yAxis: {
                    enable: true,
                    visible: true,
                    title: { enabled : false },
                    labels: {
                        visible: true,
                        enable: true,
                        style: { fontSize: 10, color: '#bbb' }
                    },
                    stackLabels: {
                        enabled: false,
                        useHTML: true,
                        inside: false,
                        overflow: 'none',
                        crop: false,
                        backgroundColor: null,
                        borderWidth: 0,
                        y: -6,
                        // formatter: function(){
                        //     return '<span class="chart-tooltip">' + Highcharts.numberFormat(this.total, 0) +'만원</span>'
                        // }
                    }
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    },
                    column: {
                        // groupPadding: 0.2,
                        // grouping: false,
                        // borderWidth: 0,
                        // pointWidth: 48
                    }
                }
            },            
            pie: {
                chart: {
                    type: 'pie'
                },
                legend: { enabled: true },
                plotOptions: {
                    pie: {
                        borderWidth: 1,
                        allowPointSelect: false,
                        dataLabels: { enabled: false },
                        showInLegend: false
                    }
                }
                
            },
            donut: {
                colors: ['#ff95ad', '#ad77df', '#7d7cdb', '#64cee5', '#c0d54f'],
                chart: {
                    type: 'pie'
                },
                legend: { enabled: true },
                plotOptions: {
                    pie: {
                        borderWidth: 1,
                        innerSize: '50%',
                        allowPointSelect: false,
                        dataLabels: { enabled: false },
                        showInLegend: true
                    }
                }
                
            },
            donutLegend: {
                colors: ['#f36b7f', '#fbe0dc', '#81b3a3', '#3040c4', '#f8cf61'],
                chart: {
                    type: 'pie',
                    // width: 320,
                    height: 180,
                    margin: [0, 0, 0, 10]
                },
                legend: {
                    enabled: true,
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    x: 0,
                    y: 5,
                    useHTML: true,
                    labelFormatter: function() {
                        return '<div class="chart-legend-text"><span class="w70 ellipsis">' + this.name +' </span><span class="text-right w40">' + this.y + '%</span></div>'
                    }
                },
                plotOptions: {
                    pie: {
                        center: [60, 70],
                        borderWidth: 0,
                        innerSize: '50%',
                        allowPointSelect: false,
                        dataLabels: { enabled: false },
                        showInLegend: true
                    }
                }
                
            },
            halfgauge: {
                chart: { 
                    type: 'solidgauge'
                },
                yAxis: {
                    // min: 0,
                    // max: 100,
                    // minColor: '#ff0000',
                    // maxColor: '#ff0000',
                    lineWidth: 0,
                    tickWidth: 0,
                    minorTickInterval: null,
                    labels: { 
                        enabled: false,
                        y: 20,
                        x: -18
                    },
                },
                pane: {
                    size: '160%',
                    center: ['50%', '90%'],
                    startAngle: -90,
                    endAngle: 90,
                    background: {
                        shape: 'arc',
                        borderWidth: 20,
                        outerRadius: '90%',
                        innerRadius: '90%',
                        // borderColor: 'rgba(255, 255, 255, 0.1)'
                    }

                },
                plotOptions: {
                    solidgauge: {
                        // borderColor: '#ff9900',
                        borderWidth: 20,
                        radius: 90,
                        innerRadius: '90%',
                        linecap: 'round',
                        rounded: true,
                        dataLabels: {
                            enabled: false,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }
            },
            solidgauge: {
                chart: { 
                    type: 'solidgauge',
                },
                yAxis: {
                    tickWidth: 0,
                    minorTickInterval: null,
                    labels: { 
                        enabled: false
                    }
                },
                pane: {
                    size: '100%',
                    startAngle: 0,
                    endAngle: 360,
                    background: {
                        borderWidth: 0,
                        outerRadius: '100%',
                        innerRadius: '70%',
                        backgroundColor: '#d8d8d8'
                    }

                },
                plotOptions: {
                    solidgauge: {
                        outerRadius: '100%',
                        innerRadius: '70%',
                        // rounded: true,
                        dataLabels: {
                            enabled: false,
                            borderWidth: 0,
                            useHTML: true
                        }
                    }
                }
            }
        },
        // Gauge chart border rounded
        gaugeRound: function(t) {
            var target = $('#' + t).find('svg');
            if(target.length > 0) {
                var path = target[0].getElementsByTagName('path');
                if(path.length > 0) {                        
                        path[0].setAttributeNS(null, 'stroke-linejoin', 'round');
                }
            }
        }
    }

    kw.init();
    return kw;
}(window.KW_MOBILE || {}, jQuery));