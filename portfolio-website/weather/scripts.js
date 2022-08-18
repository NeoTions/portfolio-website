
var url2 = "https://api.openweathermap.org/data/2.5/forecast?lat=42.726200&lon=-71.190895&appid=61bde29c15bb75519edf53fe39b7b2be";
var endpoint = "/forecast.json"
var params = "?key=8b57628e3abb4a4087b203742221807&q=42.726200,71.190895&days=1"
var url = "http://api.weatherapi.com/v1/forecast.json?key=8b57628e3abb4a4087b203742221807&q=01844&days=1&aqi=yes&alerts=no";
var url3 = "http://api.weatherapi.com/v1/" + endpoint + params;
var url4 = "/Users/johnst.hilaire/Desktop/weather/offline_call.json"

async function funcName(url){
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);
    charts(data);
    }

funcName(url);
function charts(data) {

    // current hour in mt
    var current_hour = parseInt(moment().format("HH"));
    // hour array
    var hours = []
    // for list itteration
    var current_hour_mt = current_hour;
    // format 
    for (i=0;i<6;i++) {

        if (current_hour == 24) {
            current_hour = 0;
        }

        if (current_hour >= 12) {
            corrected_hour = current_hour - 12;
            hour = (corrected_hour.toString()) + "pm";
            hours.push(hour)
        }
        else {
            if (current_hour == 0){
                corrected_hour = 12;
                hour = (corrected_hour.toString()) + "am";
                hours.push(hour);
            }
            else {
                hour = (current_hour.toString()) + "am";
                hours.push(hour);
            }

        }
        current_hour += 1;
    }

    //console.log(hours)

    // sorting through data
    var daily_data = data["forecast"]["forecastday"];
    var day_object = daily_data[0];
    var current = data["current"];
    var hourly_data = day_object["hour"];
    var six_hours = [];

    console.log(day_object)

    //location

    var city = data["location"]["name"];
    var state = data["location"]["region"];

    document.getElementById("location").innerHTML = city + ", " + state;

    // filtered data
    var chance_of_rain = [];
    var humidity_percent = current["humidity"];
    var uv_index = current["uv"];
    var aqi_num = (current["air_quality"]["pm2_5"]).toFixed(2);
    //console.log(humidity_percent)

    var wind = current["wind_mph"];
    var gust = current["gust_mph"];

    for (i=current_hour_mt;i<(current_hour_mt+6);i++) {
        six_hours.push(hourly_data[i]);
    }

    for (i=0;i<six_hours.length;i++) {
        let h = six_hours[i];
        chance_of_rain.push(h["chance_of_rain"]);
    }

    //console.log(six_hours);
    hourly_precipitation = chance_of_rain;
    const precip_canvas = document.getElementById('myChart');
    const precip_chart  = new Chart(precip_canvas, {

        options: {
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max : 100
                }
            }
        },
        
        type: 'bar',
        data: {
        labels: hours,
        datasets: [{
            data: hourly_precipitation,
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)'
                ],
                borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
    });
    //console.log(six_hours);
    hourly_precipitation = chance_of_rain;
    const windspeed_canvas = document.getElementById('myWindspeed');
    const windspeed_chart  = new Chart(windspeed_canvas, {

        options: {
            indexAxis: "y",
            plugins: {
                legend: {
                    display: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max : 100,
                    stacked: true
                },
                x: {
                    beginAtZero: true,
                    max : 100,
                    stacked: true
                }
            }
        },
        
        type: 'bar',
        data: {
        labels: " ",
        datasets: [{
            label: 'Windspeed (MPH)',
            backgroundColor: "#caf270",
            data: [wind],
          }, {
            label: 'Gust (MPH)',
            backgroundColor: "#45c490",
            data: (current["wind_mph"])+current["gust_mph"],
          },]
        },
    });

    
    var humidity = function(p) {
        console.log(humidity_percent)
        p.percent = humidity_percent;
        p.setup = function() {
            p.pixelDensity(2);
            p.canvas = p.createCanvas(200, 200);
            p.canvas.parent("humidity");
            p.angleMode(p.DEGREES);
            p.strokeWeight(10);
            p.noFill();
            p.noLoop();
            // type
            p.textAlign(p.CENTER);
            p.textSize(p.height/5);
    }
        p.draw = function() {
            p.stroke(255);
            p.circle(p.width/2,p.height/2,p.height/2)
            p.stroke(0, 194, 58);
            p.arc(p.width/2,p.height/2,p.height/2,p.height/2,90,(p.map(p.percent,0,100,0,360)+90%360));
            p.noStroke();
            p.fill(0, 194, 58);
            p.text(p.str(p.percent),p.width/2,p.height*0.56)
        }
    }
    
    var uv = function(a) {
    a.setup = function() {
        a.canvas = a.createCanvas(400, 200);
        a.canvas.parent("uv_index");
        a.sw = a.width/10;
        a.strokeWeight(a.sw);
        a.strokeCap(a.SQUARE);
        a.textAlign(a.CENTER);
        a.textSize(a.width/4);
      }
    a.draw = function() {
        a.pixelDensity(2);
        a.background(255,255,255,0);
        a.stroke(33, 219, 0);
        a.line(0,a.height,a.width*0.2,a.height);
        a.stroke(227, 227,0);
        a.line(a.width*0.2,a.height,a.width*0.5,a.height); 
        a.stroke(227, 106, 0);
        a.line(a.width*0.5,a.height,a.width*0.7,a.height);
        a.stroke(227, 0, 0);
        a.line(a.width*0.7,a.height,a.width*0.9,a.height);
        a.stroke(117, 0, 227);
        a.line(a.width*0.9,a.height,a.width,a.height);
        a.stroke(255);
        a.place = a.map(uv_index,0,10,0,a.width);
        a.line(a.place,a.height,a.place+10,a.height) 
        a.noStroke();

        if (uv_index < 2) {
            a.fill(33, 219, 0);
        }
        else if (uv_index > 2 && uv_index < 5) {
            a.fill(227, 227,0);
        }
        else if (uv_index > 5 && uv_index < 7) {
            a.fill(227, 106, 0);
        }
        else if (uv_index > 7 && uv_index < 9) {
            a.fill(227, 0, 0);
        }
        else {
            a.fill(117, 0, 227);
        }

        a.text(uv_index.toString(),a.width/2,a.height/1.75);
      }
    }
    
    var aqi = function(a) {
        a.setup = function() {
            a.pixelDensity(2);
            a.canvas = a.createCanvas(400, 200);
            a.canvas.parent("aqi");
            a.sw = a.width/10;
            a.strokeWeight(a.sw);
            a.strokeCap(a.SQUARE);
            a.textAlign(a.CENTER);
            a.textSize(a.width/4);
            a.pixelDensity(4)
          }
        a.draw = function() {
            a.background(255,255,255,0);
            a.stroke(33, 219, 0);
            a.line(0,a.height,a.width*0.2,a.height);
            a.stroke(227, 227,0);
            a.line(a.width*0.2,a.height,a.width*0.4,a.height); 
            a.stroke(227, 106, 0);
            a.line(a.width*0.4,a.height,a.width*0.6,a.height);
            a.stroke(227, 0, 0);
            a.line(a.width*0.6,a.height,a.width*0.8,a.height);
            a.stroke(117, 0, 227);
            a.line(a.width*0.8,a.height,a.width,a.height);
            a.stroke(255);
            a.place = a.width*0.10;
            a.line(a.place,a.height,a.place+10,a.height) 
            a.fill(33, 219, 0);
            a.noStroke();
            a.text(aqi_num,a.width/2,a.height/1.75);
          }
        }
    
    var sketch1 = new p5(humidity);
    var sketch2 = new p5(uv);
    var sketch2 = new p5(aqi);
}





