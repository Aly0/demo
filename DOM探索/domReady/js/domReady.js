function myReady(fn){
    //对于现代浏览器，对DOMContentLoaded事件的处理采用标准的事件绑定方式
    if(document.addEventListener){
        document,addEventListener('DOMContentLoaded',fn,false);
    }
    else{
        IEContentloaded(fn);
    }

    //IE模拟DOMContentLoaded
    function IEContentLoaded(fn){
        var d=window.document;
        var done=false;

        //只执行一次用户的执行函数init)()
        var init=function(fn){
            if (!done){
                done=true;
                fn();
            }
        }

        (function(){
            try {
                //DOM树未创建完成之前调用doScroll回会抛出错误
                d.documentElement.doScroll('left');
            } catch (e) {
                //延迟执行一次
                setTimeout(arguments.callee,50);
                return;
            }
            //没有错误表示DOM树创建完成，立即执行用户回调
            init();
        })();

        //监听document的加载状态
        d.onreadystatechange=function(){
            //如果用户是在domReady之后绑定的函数，就立即执行
            if(d.readyState=='complete'){
                d.onreadystatechange=null;
                init();
            }
        }


    }
}