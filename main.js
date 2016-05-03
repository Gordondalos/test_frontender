$.getJSON('data/graph1.json', function(data) {
    var chart = AmCharts.makeChart("chartdiv", buildGraph1(data) );

});

function filterDataByDate(filterDate, obj){
    obj = obj || [];
    var data = [];
    for(var i = 0; i < obj.length; i++){
        if(obj[i].date === filterDate){
            data.push({code: obj[i].code, desc: obj[i].desc});
        }
    }
    return data;
}

function buildGraph2(data){
    var newObj =  {
        "type": "serial",
        "theme": "light",
        "rotate": true,
        "dataProvider":  data ,
        "valueAxes": [ {
            "gridAlpha": 0.2,
            "dashLength": 0
        } ],
        "startDuration": 1,
        "columnWidth": 0.4,
        "graphs": [ {
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "code"
        } ],
        "categoryField": "desc",
        "categoryAxis": {
            "inside": true,
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 0
        }

    }

    return newObj;

}

function buildGraph1(obj1){
    var baseObj =  {
        "type": "serial",
        "dataProvider": obj1,
        "startDuration": 1,
        "graphs": [ {
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "value"
        } ],
        "chartCursor": {
            "categoryBalloonEnabled": false
        },
        "categoryField": "date",
        "categoryAxis": {
            "gridPosition": "start"
        },
        "listeners": [{
            "event": "zoomed",
            "method": function(e) {
                var text = e.startValue + " (index: " + e.startIndex + ")";
                text += " -- " + e.endValue + " (index: " + e.endIndex + ")";
                document.getElementById("selection").innerHTML = text;
            }
        }, {
            "event": "clickGraphItem",
            "method": function(e) {
                var date = e.item.category;
                var text = e.item.category + " (value: " + e.item.values.value + ")";
                document.getElementById("clicked").innerHTML = text;

                $.getJSON('data/graph2.json', function(obj) {
                    var data = filterDataByDate(date, obj);
                    var chart2 = AmCharts.makeChart( "chartdiv2", buildGraph2(data));
                });
            }
        }]

    }
    return baseObj;
}








