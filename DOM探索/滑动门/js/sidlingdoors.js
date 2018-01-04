window.onload=function(){
    var box=document.getElementById('sidlingdoors');
    //获取图片列表NodeList对象
    var imgs=box.getElementsByTagName('img');
    //单张图片的宽度
    var imgWidth=imgs[0].offsetWidth;
    //被掩盖图片露出的宽度
    var exposeWidth=150;
    //设置容器宽度
    var boxWidth=imgWidth+(imgs.length-1)*exposeWidth;
    box.style.width=boxWidth+'px';
    //甚至每张图片的位置
    function setImgsPos(){
        for(var i=1,len=imgs.length;i<len;i++){
            imgs[i].style.left=imgWidth+(i-1)*exposeWidth+'px';
        }
    }
    setImgsPos();

    //每张图片打开时移动的距离
    var translat=imgWidth-exposeWidth;
    //每张图片的mouseover事件
    for(var i=0,len=imgs.length;i<len;i++){
        (function(i){
            imgs[i].onmouseover=function(){
                setImgsPos();
                for(var j=1;j<=i;j++){
                    imgs[j].style.left=parseInt(imgs[j].style.left,10)-translat+'px';
                }
            }
        })(i);
    }
};