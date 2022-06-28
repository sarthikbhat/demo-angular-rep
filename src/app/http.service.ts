import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EChartsOption } from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  data: any;
  option: EChartsOption = {};
  constructor(private http: HttpClient) { }
  headers = new HttpHeaders()
    .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJEYXRlIjoxNjM1MjI1ODM3OTIxLCJpc3MiOiJDYW52YXMgSW5zaWdodHMiLCJzdWIiOiJtZWVuYSIsImlhdCI6MTYzNTIyNTgzNywiZXhwIjoxNjM1MjI3MzM3fQ.qS0MvbRAzFdRuz2jt1Q-7uyjfXPioBMLuaVxc-fsJ4s')
    .set('Auth-Type', 'jwt');
  fetchData(data) {
    return this.http.post('http://localhost:8080/Glassbox_Service/service/Treemap', data, { 'headers': this.headers });
  }

  fetchDataSingle(data) {
    // return this.http.post('http://localhost:8080/Glassbox_Service/service/Treemapsingledefect', data, { 'headers': this.headers });
    return this.http.get('/assets/data.json');
  }

  checkAndMarkRed(d, highlightData, statusClosed) {
    for (let z = 0; z < Object.keys(d['children']).length; z++) {
      if (highlightData !== "" && statusClosed !== "") {
        var level1child = d['children'][z].children || d['children'][z]._children;
        for (var i = 0; i < Object.keys(level1child).length; i++) {
          var child = level1child[i];
          if (child.name.includes("Status")) {
            var level2child = child.children || child._children;
            if (level2child) {
              for (var j = 0; j < level2child.length; j++) {
                child = level2child[j];
                var statusArray = statusClosed.split(",");
                for (var k = 0; k < statusArray.length; k++) {
                  if (child.name.includes(statusArray[k])) {
                    var statusCheck = false;
                    break;
                  } else {
                    var statusCheck = true;
                  }
                }
              }
            }
          }
          if (child.name.includes("Severity") && statusCheck) {
            var level2child = child.children || child._children;
            if (level2child) {
              for (var j = 0; j < level2child.length; j++) {
                child = level2child[j];
                if (child.name.includes(highlightData)) {
                  d['children'][z]['label']={}
                  d['children'][z]["label"]["color"]="red"
                  console.log(d['children'][z])
                }
              }
            }
            break;
          }
        }
      }
      
    }
    console.log(d);
    
    return this.makeChart(d)

  }

  makeChart(data){
      console.log(Math.round(data[3]));
      var n = Math.round(data[3])
      data = JSON.parse(data[0])
      let finalData = [];
      data.forEach(elm => {
        finalData.push(elm.color)
      });
      let obj = data[2];
      const myarray = "XYZ";
      let text = 'Total Person days lost: ' + n;
      return this.option ={
        title: {
          text: text,
          left: 'left',
          textStyle: {
            color: 'red'
          }
        },
        dataZoom: [{
          type: "slider", showDataShadow: false, handleSize: '100%', xAxisIndex: [0, 1],
          yAxisIndex: [0, 1], top: 24, moveHandleSize: 0,
        },
        {
          type: 'slider', show: true, yAxisIndex: 0, width: 12, showDataShadow: false, left: '93%', moveHandleSize: 0,
        }],
        legend: { show: false },
        tooltip: {
        },
        dataset: {
          dimensions: ['count', 'TotalCount'],
          source: data
        },
        xAxis: {
          type: 'category', name: myarray, nameLocation: 'middle',
          nameTextStyle: {
            fontWeight: 'bold', fontSize: 15, color: "black"
          },
          nameGap: 20,
          axisTick: { show: false }, splitLine: { show: true }
        },
        yAxis: {},
        color: finalData,
        series: [{ type: 'bar', colorBy: "data", label: { show: true, position: 'top', fontWeight: 'bold' } 
      ,
      animation:true,animationDuration:300,stateAnimation:{
        duration:300,
        easing:'cubicOut'
      }}],
        
      }
  }
  
}
