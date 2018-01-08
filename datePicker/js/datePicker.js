(function(){
    var datepicker={};

    datepicker.getMonthDate=function(year,month) {
        var ret=[];
        if(!year||!month){
            var today=new Date();
            year=today.getFullYear();
            month=today.getMonth()+1;
        }

        var firstDay=new Date(year,month-1,1);
        var firstDayWeekDay=firstDay.getDay();
        if (firstDayWeekDay===0){ firstDayWeekDay=7; }

        var year=firstDay.getFullYear();
        var month=firstDay.getMonth()+1;

        var lastDayOfLastMonth=new Date(year,month-1,0);
        var lastDateOfLastMonth=lastDayOfLastMonth.getDate();

        var preMonthDayCount=firstDayWeekDay-1;
        var lastDay=new Date(year,month,0);
        var lastDate=lastDay.getDate();

        for(var i=0;i<7*6;i++){
            var date=i+1-preMonthDayCount;
            var showDate=date;
            var thisMonth=month;
            //修正上一个月在当前页显示
            if(date<=0){
                thisMonth=month-1;
                showDate=lastDateOfLastMonth+date;
            }
             //修正下一个月在当前页显示
            else if(date>lastDate){
                thisMonth=month+1;
                showDate=showDate-lastDate;
            }

            if(thisMonth===0) thisMonth=12;
            if(thisMonth===13) thisMonth=1;

            ret.push({
                month:thisMonth,
                date:date,
                showDate:showDate
            });
        }
        return {
            year:year,
            month:month,
            days:ret
        };
    }

    window.datepicker=datepicker;
})();