import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';
import { Subscription } from 'rxjs';
import 'echarts-wordcloud';
import { HttpService } from '../http.service';
import panzoom from 'panzoom'
import Panzoom from '@panzoom/panzoom'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  panzoomInstance;
  option: echarts.EChartsOption = {};
  echartsInstance;
  constructor(private httpservice: HttpService) { }


  data = [
    {
        "IdLists": "MB-D-1",
        "size": 26,
        "freq": 1,
        "text": "null_history_data",
        "name": "null_history_data",
        "value": 26
    },
    {
        "IdLists": "MB-D-6",
        "size": 25,
        "freq": 1,
        "text": "result_none_misintepretation",
        "name": "result_none_misintepretation",
        "value": 25
    }
]

  @ViewChild("echartsss", { static: false }) echartsss: ElementRef<HTMLElement>;

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    var chart = echarts.init(this.echartsss.nativeElement,null,{renderer:'svg'});
    let elm = document.getElementById("echartsss");
    this.data = this.data.filter(d => d.size > 0);
    chart.setOption(
      {
      
        legend: { show: false },
        tooltip: {
          trigger: "item",
          enterable: true,
          formatter: '{b}:{c}',
        },
        visualMap: {
          type: 'piecewise',
          splitNumber: 2, pieces: [{ min: 25 }, { min: 0, max: 25 }], color: ['#c969c9', '#8282ff'], show: false
        },

        color: ['#8282ff', '#c969c9'],
        series: [{
          type: 'wordCloud',
          roam:true,
          shape: 'circle',
          left: 'center',
          top: 'center',
          width: '70%',
          height: '80%',
          right: null,
          bottom: null,
          sizeRange: [12, 60],
          rotationRange: [0, 0],
          rotationStep: 45,
          gridSize: 15,
          drawOutOfBound: false,
          layoutAnimation: true,
          textStyle: {
            fontFamily: 'Courier New',
            fontWeight: '800',
          },
          emphasis: {
            textStyle: {
              shadowBlur: 10,
              shadowColor: '#333',
              color: '#FF0000'
            }
          },
          data: this.data,
          animation:true,
          animationDuration:1000,
          animationEasing:'cubicOut'
        }]
      }
    );
    // const panzoom = Panzoom(elm, {
    //   maxScale: 5,
    //   canvas:true,
    //   panOnlyWhenZoomed:true
    // })
    // panzoom.pan(1, 100)
    // elm.addEventListener('scroll', panzoom.zoomWithWheel)
// panzoom.zoom(1, { animate: true })
this.panzoomInstance = panzoom(document.querySelector('#echartsss > div:nth-child(1) > svg'));

  }

}
