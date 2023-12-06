var KW_GUIDE = (function (kw, $) {
    kw.init = function () {
        // Set layout
        kw.layout.init();
    };

    // About layout
    kw.layout = {
        init: function() {
            // Progress init
            this._setProgress();            
            // LNB selection
            this._lnbChange();              
            // Sub page load
            // this._pageLoad();
        },
        _setProgress: function() {
            var totalPage = $('.progress-count .count-total');
            var completePage = $('.progress-count .count-txt');
            var holdPage = $('.progress-count .count-hold');
            var deletePage = $('.progress-count .count-del');
            var findAll = $('.table-guide tbody tr').length;
            var findComplete = $('tr.complete').length;
            var findHold = $('tr.hold').length;
            var findDelete = $('tr.delete').length;

            totalPage.text(findAll);
            completePage.text(findComplete);
            holdPage.text(findHold);
            deletePage.text(findDelete);
        },
        _lnbChange: function() {
            var menuSelector = $('.guide-menu li');
            menuSelector.on('click', function() {
                var $this = $(this);
                myIdx = $this.index();
                menuSelector.removeClass('on');
                $this.addClass('on');
            });
        },
        _pageLoad: function() {
            $('.guide-menu a').on('click', function() {
                var checkData = $(this).data('load');
                if(!checkData) return;

                var url = 'pages/' + checkData + '.html';

                $.get(url, function(data) {
                    var data = data.substring(data.indexOf("<body"), data.indexOf("</body>") + 8);
                    $('.guide-content').html(data);

                    KW_MOBILE.init();
                });
            });
        }
    }

    kw.init();
    return kw;
}(window.KW_GUIDE || {}, jQuery));
