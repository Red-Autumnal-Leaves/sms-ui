'use strict';

/*自定义指令*/
angular.module('app.directives', ['ui.load'])
    .directive('uiToggleClass', ['$timeout', '$document', function($timeout, $document) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                el.on('click', function(e) {
                    e.preventDefault();
                    var classes = attr.uiToggleClass.split(','),
                        targets = (attr.target && attr.target.split(',')) || Array(el),
                        key = 0;
                    angular.forEach(classes, function( _class ) {
                        var target = targets[(targets.length && key)];
                        ( _class.indexOf( '*' ) !== -1 ) && magic(_class, target);
                        $( target ).toggleClass(_class);
                        key ++;
                    });
                    $(el).toggleClass('active');

                    function magic(_class, target){
                        var patt = new RegExp( '\\s' +
                            _class.
                            replace( /\*/g, '[A-Za-z0-9-_]+' ).
                            split( ' ' ).
                            join( '\\s|\\s' ) +
                            '\\s', 'g' );
                        var cn = ' ' + $(target)[0].className + ' ';
                        while ( patt.test( cn ) ) {
                            cn = cn.replace( patt, ' ' );
                        }
                        $(target)[0].className = $.trim( cn );
                    }
                });
            }
        };
    }])
    .directive('uiNav', ['$timeout', function($timeout) {
        return {
            restrict: 'AC',
            link: function(scope, el, attr) {
                var _window = $(window),
                    _mb = 768,
                    wrap = $('.app-aside'),
                    next,
                    backdrop = '.dropdown-backdrop';
                // unfolded
                el.on('click', 'a', function(e) {
                    next && next.trigger('mouseleave.nav');
                    var _this = $(this);
                    _this.parent().siblings( ".active" ).toggleClass('active');
                    _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();
                    // mobile
                    _this.next().is('ul') || ( ( _window.width() < _mb ) && $('.app-aside').removeClass('show off-screen') );
                });

                // folded & fixed
                el.on('mouseenter', 'a', function(e){
                    next && next.trigger('mouseleave.nav');
                    $('> .nav', wrap).remove();
                    if ( !$('.app-aside-fixed.app-aside-folded').length || ( _window.width() < _mb )) return;
                    var _this = $(e.target)
                        , top
                        , w_h = $(window).height()
                        , offset = 50
                        , min = 150;

                    !_this.is('a') && (_this = _this.closest('a'));
                    if( _this.next().is('ul') ){
                        next = _this.next();
                    }else{
                        return;
                    }

                    _this.parent().addClass('active');
                    top = _this.parent().position().top + offset;
                    next.css('top', top);
                    if( top + next.height() > w_h ){
                        next.css('bottom', 0);
                    }
                    if(top + min > w_h){
                        next.css('bottom', w_h - top - offset).css('top', 'auto');
                    }
                    next.appendTo(wrap);

                    next.on('mouseleave.nav', function(e){
                        $(backdrop).remove();
                        next.appendTo(_this.parent());
                        next.off('mouseleave.nav').css('top', 'auto').css('bottom', 'auto');
                        _this.parent().removeClass('active');
                    });

                    $('.smart').length && $('<div class="dropdown-backdrop"/>').insertAfter('.app-aside').on('click', function(next){
                        next && next.trigger('mouseleave.nav');
                    });

                });

                wrap.on('mouseleave', function(e){
                    next && next.trigger('mouseleave.nav');
                    $('> .nav', wrap).remove();
                });
            }
        };
    }])
    .directive('setNgAnimate', ['$animate', function ($animate) {
        return {
            link: function ($scope, $element, $attrs) {
                $scope.$watch( function() {
                    return $scope.$eval($attrs.setNgAnimate, $scope);
                }, function(valnew, valold){
                    $animate.enabled(!!valnew, $element);
                });
            }
        };
    }])
    .directive('checkAll', checkAll)
    .directive('scrollTable', function () {
        return{
            restrict: 'A',
            replace: false,
            link:function(scope, element, attrs){ initScorllTable(scope, element, attrs);}
        }
    })
    .directive('tablePagination', function () {
        return{
            restrict: 'E',
            replace: true,
            scope:{
                page:'=',
                sizeOptions:"=",
                goPage:"&",
                selectPageSize:"&"
            },
            template:function (element,attr) {
                return  '<div class="row"> <div style="text-align: center" ng-if="page.total==0">暂无数据</div> <div class="col-sm-4 hidden-xs" ng-if="page.total>0"> 共{{page.total}}条记录,{{page.pageNow}}/{{page.pageCount}}页</div>' +
                        '<div class="col-lg-8 text-right">' +
                            '<ul class="pagination pagination-sm" ng-if="page.total>0">' +
                                '<li><a ng-click = "goPage({pageNow:1});" ng-if="page.pageNow>1">«</a></li>' +
                                '<li  ng-class="{\'active\':index == page.pageNow}" ng-repeat="index in (page|pagination_filter)"><a ng-click = "goPage({pageNow:index});">{{index}}</a></li>' +
                                '<li><a ng-click = "goPage({pageNow:page.pageCount});" ng-if="page.pageNow<page.pageCount">»</a></li>' +
                            '</ul>' +
                            '<select class="input-sm form-control w-sm inline v-middle pagination-ps-select" ng-model="page.pageSize" ng-change="selectPageSize({pageSize:page.pageSize})" ng-if="page.total > 0">' +
                                '<option value="{{size}}" ng-repeat="size in (sizeOptions ? sizeOptions : [10,20,30,50])">{{size}}</option>' +
                            '</select>' +
                        '</div></div>';
            }
         }
    });
;
//全选
function checkAll () {
    var directive = {
        link: link,
        restrict: 'A',
        scope:{
            selectItems:'='
        }
    };
    return directive;

    function link(scope, element) {
        element.on('change', function() {
            var $this = $(this),
                index= $this.index() + 1,
                checkbox = $this.find('input[type="checkbox"]'),
                table = $this.parents('table');
            var checkboxs = table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]');
            checkboxs.prop('checked', checkbox[0].checked);
            scope.selectItems = [];
            checkboxs.each(function(){
                if(checkbox[0].checked){
                    scope.selectItems.push($(this).val());
                }
            });
            scope.$apply();//强刷
        });
    }
}

//初始化带滚动条的table
function initScorllTable(scope, element, attrs){
    var height = $(document).height();
    var fix = attrs.fix || 30;
    $(element).css('height',  height * fix / 100);
    $(element).on('scroll',function(e){
        var scrollTop = this.scrollTop;
        var thread = $(element).find('thead');
        $(thread).css('transform','translateY(' + scrollTop + 'px)');
    });
}
