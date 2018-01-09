(function(){
    var datepicker=window.datepicker;
    var $wrapper;
    var monthDate;
    datepicker.buikdUi=function(year,month){
       monthDate=datepicker.getMonthDate(year,month);
        //渲染日历
        var html='<div class="ui-datepicker-header">'+
                '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>'+
                '<span class="ui-datepicker-curr-month">'+monthDate.year+'-'+monthDate.month+'</span>'+
                '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>'+
            '</div>'+
            '<div class="ui-datepicker-body">'+
                '<table>'+
                    '<thead>'+
                        '<th>一</th>'+
                        '<th>二</th>'+
                        '<th>三</th>'+
                        '<th>四</th>'+
                        '<th>五</th>'+
                        '<th>六</th>'+
                        '<th>日</th>'+
                    '</thead>'+
                    '<tbody>';
                    for(var i=0;i<monthDate.days.length;i++){
                        var date=monthDate.days[i];
                        if(i%7===0){
                            html+='<tr>';
                        }
                        html+='<td data-date="'+date.date+'">'+date.showDate+'</td>';
                        if(i%7===6){
                            html+='</tr>';
                        }
                    }
                       

                   html+= '</tbody>'+
                '</table>'+
            '</div>';

            return html;
    };
    //创建日历的包裹层
    datepicker.render=function(direction){
        var year,month;
        if(monthDate){
            year=monthDate.year;
            month=monthDate.month;
        }
        //上一月
        if(direction==='prev'){
            month--;
            if(month===0){
                month=12;
                year--;
            }
        }
        //下一月
        if(direction==='next') month++;
        var html=datepicker.buikdUi(year,month);
        if(!$wrapper){
            $wrapper=document.createElement('div');
            document.body.appendChild($wrapper);
            $wrapper.className='ui-datepicker-wrapper';    
        }
        $wrapper.innerHTML=html;
        
    };
    datepicker.init=function(input){
        datepicker.render();
        var $input=document.querySelector(input);
        var isOpen=false;
        //显示和隐藏日历表
        $input.addEventListener('click',function(){
            if(isOpen){
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen=false;
            }else{
                $wrapper.classList.add('ui-datepicker-wrapper-show');
                var left=$input.offsetLeft;
                var top=$input.offsetTop;
                var height=$input.offsetHeight;
                $wrapper.style.top=top+height+2+'px';
                $wrapper.style.left=left+'px';
                isOpen=true;
            }

        },false);
        //上一月，下一月按钮的点击事件
        $wrapper.addEventListener('click',function(e){
            var $target=e.target;
            if(!$target.classList.contains('ui-datepicker-btn'))
              return;
            if($target.classList.contains('ui-datepicker-prev-btn')){
                datepicker.render('prev');
            }else if($target.classList.contains('ui-datepicker-next-btn')){
                datepicker.render('next');
            }
        },false);
        //日历表中具体日期的点击
        $wrapper.addEventListener('click',function(e){
            var $target=e.target;
            if($target.tagName.toLowerCase() !=='td') return;

            var date=new Date(monthDate.year,monthDate.month-1,$target.dataset.date);
            $input.value = format(date);
            $wrapper.classList.remove('ui-datepicker-wrapper-show');
            isOpen=false;
        },false);
    };
    var format=function(date){
        var ret='';
        var padding=function(num){
            if(num<=9){
                return '0'+num;
            }
            return num;
        }
        ret += date.getFullYear()+'-';
        ret += padding(date.getMonth()+1) + '-';
        ret += padding(date.getDate());
        return ret;
    }
})();