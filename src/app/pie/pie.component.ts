import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  data: any={
    "New": 30,
    "ShowStopper": 5,
    "Closed": 27,
    "Rejected": 6,
    "Removed": 4
}
  option: EChartsOption = {};
  constructor() { }

  ngOnInit() {
    this.data={
      "New": 30,
      "ShowStopper": 5,
      "Closed": 27,
      "Rejected": 6,
      "Removed": 4
  }
    this.makechart()
  }

  makechart(){
    var d = {
      "New": 30,
      "ShowStopper": 5,
      "Closed": 27,
      "Rejected": 6,
      "Removed": 4
  }
    this.option={
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'left'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        bottom: '0%',
        formatter: function (name) {
          return  name + "      " + d[name]
      } ,  
      itemGap:40,
      // itemHeight:14,
      },
      color:["#845EC2","#FF9671","#F9F871",'#ff9c33','#33b5e5','#bbdefb','#26873b','#88f7a0','#ffab91','#563266','#2d4262','#443355','#738678','#bfb095','#ed5564','#ff4500','#443355','#435740','#cac8c0','#bfb095'],
      series: [
        {
          name: '',
          type: 'pie',
          radius: '80%',
          stillShowZeroSum:true,
          showEmptyCircle:true,
          emptyCircleStyle:{
            color : 'lightgray'
          },
          label:{
            show:true,
            formatter:'{d}%'
          },
          labelLine:{
            // showAbove:true
            // length:40,
            minTurnAngle:140,
            maxSurfaceAngle:16,
            lineStyle:{
              color:'#e0e0e0'
            }
          },
          labelLayout:{
            // draggable:true
          },
          data: [
            { value: 30, name: 'New', },
            { value: 5, name: 'ShowStopper' },
            { value: 27, name: 'Closed' },
            { value: 6, name: 'Rejected' },
            { value: 4, name: 'Removed' }
          ],
          select:{
            label:{
              // formatter:'{b} : {d}% ({c})'
            }
          },
          tooltip:{
            formatter:'{b} : {d}% ({c})'
          },
          emphasis: {
            scale:true,
            scaleSize:4,
            label:{
              // formatter:'{b} : {d}% ({c})'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

}
