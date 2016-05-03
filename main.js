var obj1 = [
    {
        "date": "2000",
        "value": 2025
    }, {
        "date": "2001",
        "value": 1882
    }, {
        "date": "2002",
        "value": 1809
    }, {
        "date": "2003",
        "value": 1322
    }, {
        "date": "2004",
        "value": 1122
    }, {
        "date": "2005",
        "value": 1114
    }, {
        "date": "2006",
        "value": 984
    }, {
        "date": "2007",
        "value": 711
    }, {
        "date": "2007",
        "value": 665
    }, {
        "date": "2008",
        "value": 580
    }, {
        "date": "2009",
        "value": 443
    }, {
        "date": "2010",
        "value": 441
    }, {
        "date": "2011",
        "value": 395
    }
];

var obj2 = [
    {
        "desc": "USA",
        "code": 2800,
        "date": "2000"
    },
    {
        "desc": "USA",
        "code": 1500,
        "date": "2005"
    },
    {
        "desc": "USA",
        "code": 290,
        "date": "2005"
    },
    {
        "desc": "USA",
        "code": 3800,
        "date": "2007"
    },
    {
        "desc": "USA",
        "code": 3214,
        "date": "2007"
    },
    {
        "desc": "USA",
        "code": 2650,
        "date": "2007"
    },
    {
        "desc": "USA",
        "code": 2840,
        "date": "2007"
    },
    {
        "desc": "USA",
        "code": 2600,
        "date": "2005"
    },
    {
        "desc": "USA",
        "code": 2700,
        "date": "2000"
    },
    {
        "desc": "USA",
        "code": 1800,
        "date": "2000"
    },
    {
        "desc": "USA",
        "code": 12800,
        "date": "2000"
    }
];

var obj3 = $.getJSON('graph2.json', function(data) {
    var chart = AmCharts.makeChart( "chartdiv", buildbaseObj(data) );

});




var obj2 = $.getJSON('graph2.json', function(data) {
    return data;

});

function filterObj2ByDate(date){
    var data = [];
    for(var i = 0; i < obj2.length; i++){
        if(obj2[i].date === date){
            data.push({code: obj2[i].code, desc: obj2[i].desc});
        }
    }
    return data;
}

function buildnewObj(data){
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

function buildbaseObj(obj1){
    debugger;
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
                var data = filterObj2ByDate(date);
                var newObj = buildnewObj(data);

                var chart = AmCharts.makeChart( "chartdiv2", newObj );

                var text = e.item.category + " (value: " + e.item.values.value + ")";
                document.getElementById("clicked").innerHTML = text;
            }
        }]

    }
    return baseObj;
}








