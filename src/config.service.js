app.factory("commonService", ["$rootScope", "$http", "AppConfig",  function($rootScope,$http, AppConfig){

    /**
     *  //拼接URL参数，JSON-->String
     * @param params 参数对象
     * @returns {string} 返回参数url
     */
    function bulidUrlParams(params){
        var result = "";
        for(var key in params){
            if(typeof(params[key]) !="undefined" && params[key]!=null && params[key]!=""){
                result += key + "=" + params[key]+"&";
            }
        }
        var timestamp = "s=" + (+new Date());
        result = result.length>0 ? "?" + result + "&" + timestamp :"?" +　timestamp;
        return result;
    }

    /**
     * 获取RESTFUL接口地址url
     * @param url
     * @param params 参数
     * @returns {string} 返回url
     */
    function getUrl(url,params){
        var _param = bulidUrlParams(params);
        if(AppConfig.active === 'dev'){//开发模式
            return "http://" + AppConfig.host + "/" + url + _param ;
        }else{//发布模式
            return "/sms/v1/" + url + _param ;
        }
    }

    /**
     * 公用Service方法
     */
    return {
        getServerAuthUrl:function(url,params){
            return getUrl(url,params);
        },
        baseQuery : function () {
            var query = {
                pageNow: 1,
                pageSize:20
            }
            return query;
        },
        login:function(data){
            var req = {
                method: "POST",
                url: getUrl("login"),
                data: data
            };
            return $http(req);
        },
        uuid:function(){
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";
            var uuid = s.join("");
            return uuid;
        },
        getToken:function(){
            var req = {
                method: "GET",
                url: getUrl("token")
            };
            return $http(req);
        },
        logout:function(){
            var req = {
                method: "DELETE",
                url: getUrl("loginout")
            };
            return $http(req);
        },
        categoryAllTree:function(){
            var req = {
                method: "GET",
                url: getUrl("category/tree")
            };
            return $http(req);
        },
        catalogAllTree:function(){
            var req = {
                method: "GET",
                url: getUrl("catalog/tree")
            };
            return $http(req);
        }

    };
}]);

/*********************************    factory   ****************************************************/
app.factory("Alert",["$rootScope", "toaster", function($rootScope, toaster) {
    var factory = {
        toasterInstance: null
    };
    /**
     * 清除toaster
     */
    factory.clearToaster = function () {
        toaster.clear(this.toasterInstance);
    };

    /**
     * 显示消息
     * @param actionName 操作名称
     * @param status HTTP响应对象
     * @param type 消息类型 error,info warning,success
     */
    factory.toasterShow = function(actionName,e,type){
        toaster.clear(this.toastInstance);
        var code = e.status ;
        if(code==="415" || code===415){
            $rootScope.$state.go("access.login");//跳转到登录
            return;
        }
        if(code==="403" || code === 403){
            this.toastInstance = toaster.pop({
                type: 'error',
                title: actionName,
                body: 'HTTP请求无效，请核实',
                onHideCallback: function () {
                }
            });
            return;
        }
        if(code==="400" || code === 400){
            this.toastInstance = toaster.pop({
                type: 'error',
                title: actionName,
                body: 'HTTP请求无效，请核实',
                onHideCallback: function () {
                }
            });
            return;
        }
        if(code==="404" || code === 404){
            this.toastInstance = toaster.pop({
                type: 'error',
                title: actionName,
                body: 'HTTP请求URL无效！',
                onHideCallback: function () {
                }
            });
            return;
        }
        if(code==="500" || code === 500){
            this.toastInstance = toaster.pop({
                type: 'error',
                title: actionName,
                body: '系统错误！',
                onHideCallback: function () {
                }
            });
            return;
        }
        code = e.data.status;
        if(code != '200' && code !='201' && code !='202' && code !='203' && code !='204'){
            if(code==="415" || code===415){
                toaster.clear(this.toastInstance);
                $rootScope.$state.go("access.login");//跳转到登录
                return;
            }
            if(!e.data.success){
                if(!type){
                    type = "error";
                }
                this.toastInstance = toaster.pop({
                    type: type,
                    title: actionName,
                    body: e.data.msg,
                    onHideCallback: function () {
                    }
                });
            }
        }
    };

    /**
     * 执行Service
     * @param actionName 操作名称
     * @param service service
     * @param callback 成功回调
     * @param status 状态回写
     */
    factory.doService = function (actionName,service,callback,status) {
        if(typeof(status)=='undefined'){
            status = function(){};
        }
        status('loading');
        service().then(function(e){
            if(e.data.success){
                status('ready');
                callback(e);
            }else{
                status('error');
                factory.toasterShow(actionName, e, "error");
            }
        },function(e){
            status('error');
            factory.toasterShow(actionName, e);
        });
    }

    /**
     *
     * @param actionName 操作名称
     * @param actionText 描述
     * @param service
     * @param callback 成功回调
     * @param status 状态回写
     */
    factory.confirmDoServiceAndCallback = function(actionName,actionText,service,callback,status){
        if(typeof(status)=='undefined'){
            status = function(){};
        }
        swal( {
            title:"确定要" + actionName + "吗?",
            text:actionText,
            type:"warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定!",
            cancelButtonText: "取消!",
            closeOnConfirm: false,
            closeOnCancel: true,
            showLoaderOnConfirm: true
        },function(isConfirm){
            if(isConfirm){
                status('loading');
                service().then(function(e){
                    if(e.data.success){
                        callback(e);
                        status('ready');
                        swal({
                            title: actionName + "成功!",
                            type: "success",
                            confirmButtonColor: "#007AFF"
                        });
                    }else{
                        status('error');
                        factory.toasterShow(actionName,e);
                    }
                },function(e){
                    status('error');
                    factory.toasterShow(actionName,e);
                });
            }
        });
    };
    return factory;
}]);


/*********************************    filter    **********************************************/
/********   调度任务状态颜色filter   ************/

app.filter("status_joblog_color",function(){
    return function(input){
        switch(input){
            case 10:
                return "info";
            case 20:
                return "success";
            case 30:
                return "danger";
            default:
                return "default";
        }
    };
});
app.filter("status_joblog_text",function($sce){
    return function(input){
        switch(input){
            case 10:
                return $sce.trustAsHtml("执行中");
            case 20:
                return $sce.trustAsHtml("成功");
            case 30:
                return $sce.trustAsHtml("失败");
            default:
                return $sce.trustAsHtml("未知");
        }
    };
});

/********   商品相关filter   ************/
app.filter("item_is_on_sales_color",function(){
    return function(input){
        return input ? "success" : "default";
    };
});
app.filter("item_is_on_sales_info",function($sce){
    return function(input){
        if(input){
            return $sce.trustAsHtml('<i class="fa fa-fw m-r-xs text-success fa-check"></i>');
        }else{
            return $sce.trustAsHtml('<i class="fa fa-fw m-r-xs text-default fa-info-circle"></i>');
        }
    };
});
app.filter("item_name_text",function($sce){
    return function(input){
        if(input.length > 20 ){
            return input.substr(0,19) + '...';
        }
        return input ;
    };
});

/**
 * 分页按钮计算
 */
app.filter("pagination_filter",function(){
    return function(page){
        var array = [];
        if(page){
            var pageNow = page.pageNow;
            var pageCount = page.pageCount;
            var isHasHide = pageCount > 5;
            if(isHasHide){
                if(pageNow >= 3){
                    var subMax = pageCount - pageNow;
                    if(subMax >= 2){
                        array.push(pageNow - 2);
                        array.push(pageNow - 1);
                        array.push(pageNow - 0);
                        array.push(pageNow + 1);
                        array.push(pageNow + 2);
                    }else{
                        var offset = 0;
                        switch (subMax){
                            case 2:
                                offset = 3;break;
                            case 1:
                                offset = 4;break;
                            case 0:
                                offset = 5;break;
                        }
                        for(var i = offset;i >=1;i--){
                            array.push(pageCount-i + 1);
                        }
                    }
                }else{
                    for(var i=1 ; i<=pageNow ; i++){
                        array.push(i);
                    }
                    for(var i=pageNow ; i<=4 ; i++){
                        array.push(i + 1);
                        if(i==pageCount){
                            break;
                        }
                    }
                }

            }else{
                for(var i = 1;i <= pageCount; i++){
                    array.push(i);
                }
            }
        }
        return array;
    };
});
