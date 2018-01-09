(function(){
    var shuffling={};
    shuffling.containeImage=function(interval){
        var $container=document.getElementById('shuffling_container');
        var imgs = document.getElementsByClassName('ui-shuffling-img');
        var imgWidth = imgs[0].offsetWidth;
        var imgsContainer = document.getElementsByClassName('ui-shuffling-imgs');
        imgsContainer[0].style.width = imgWidth * imgs.length + 'px';
        imgsContainer[0].style.left = 0;

        var roundBotton=document.getElementsByClassName('ui-shuffling-round-button');
        var $roundBottonWrapper=document.querySelector('.ui-shuffling-change-button');

        //图片的切换和圆点样式切换
        var currImg=function(){
            var j= (-parseInt(imgsContainer[0].style.left))/imgWidth;
            imgsContainer[0].style.left = parseInt( imgsContainer[0].style.left) - imgWidth  + 'px';
            if(j<roundBotton.length-1){
                roundBotton[j].classList.remove('shuffling-img-active');
                roundBotton[j+1].classList.add('shuffling-img-active');
            } 
            j++;
            if(parseInt(imgsContainer[0].style.left ) <= - (parseInt( imgsContainer[0].style.width) - imgWidth)){
                roundBotton[roundBotton.length-1].classList.remove('shuffling-img-active');
                imgsContainer[0].style.left=0 +'px';
                roundBotton[0].classList.add('shuffling-img-active');
                j=0;
            }
        }

        //无限定时器
        var timer;

        clearInterval(timer);
        timer = setInterval(currImg,interval);

        $container.addEventListener('mouseover',function(){
            clearInterval(timer);
        },false);
        $container.addEventListener('mouseout',function(){
            var j= (-parseInt(imgsContainer[0].style.left))/imgWidth;
            timer = setInterval(currImg,interval);
        },false);

        var $prev= document.querySelector('.ui-shuffling-prev-button');
        var $next= document.querySelector('.ui-shuffling-next-button');
        


        //上一页
        $prev.addEventListener('click',function(){
            clearInterval(timer);
            var j= (-parseInt(imgsContainer[0].style.left))/imgWidth;
            if(parseInt(imgsContainer[0].style.left )!= 0){
                imgsContainer[0].style.left =  parseInt(imgsContainer[0].style.left) + imgWidth +'px';
                roundBotton[j].classList.remove('shuffling-img-active');
                roundBotton[j-1].classList.add('shuffling-img-active');
            }
            else{
                roundBotton[0].classList.remove('shuffling-img-active');
                imgsContainer[0].style.left=-(parseInt( imgsContainer[0].style.width) - imgWidth*2) +'px';
                roundBotton[roundBotton.length-1].classList.add('shuffling-img-active');
            }
            
        },false);

        //下一页
        $next.addEventListener('click',function(){
            clearInterval(timer);
            var j= (-parseInt(imgsContainer[0].style.left))/imgWidth;
            if(parseInt(imgsContainer[0].style.left ) >  -(parseInt( imgsContainer[0].style.width) - imgWidth*2)){
                imgsContainer[0].style.left =  parseInt(imgsContainer[0].style.left) - imgWidth +'px';
                if(j<roundBotton.length-1){
                    roundBotton[j+1].classList.add('shuffling-img-active');
                    roundBotton[j].classList.remove('shuffling-img-active');
                }
            }
            else{
                roundBotton[roundBotton.length-1].classList.remove('shuffling-img-active');
                imgsContainer[0].style.left=0;
                roundBotton[0].classList.add('shuffling-img-active');
            }
        },false);


        //圆点选择（有点问题）
        $roundBottonWrapper.addEventListener('click',function(e){
                clearInterval(timer);
                var target=e.target;
                var index=0;
                for(var i=0;i<roundBotton.length;i++){

                    roundBotton[i].classList.remove('shuffling-img-active');
                }
                if(target.classList.contains('ui-shuffling-round-button')){
                    index=target.getAttribute('index');
                    imgsContainer[0].style.left = -imgWidth * index +'px';
                    target.classList.add('shuffling-img-active');
                }
            },false);
    };
    

    window.shuffling = shuffling;
})();