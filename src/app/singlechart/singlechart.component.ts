import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { EChartsOption } from 'echarts';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-singlechart',
  templateUrl: './singlechart.component.html',
  styleUrls: ['./singlechart.component.css']
})
export class SinglechartComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild("Image", { static: false }) Image: ElementRef<HTMLElement>
  @ViewChild("menu", { static: false }) menu: ElementRef<HTMLElement>
  data: any;
  option: EChartsOption = {};
  isMenuOpen: boolean = false
  constructor(private httpservice: HttpService) { }

  ngOnInit(): void {

    let menuEx = document.getElementById('exportMenu');
    // menuEx.addEventListener('mouseover',()=>{ 
    //  this.trigger.openMenu()
    // })
    // menuEx.addEventListener('mouseout',()=>{
    //   this.trigger.closeMenu();
    //   menuEx.classList.remove('cdk-focused')
    //   menuEx.classList.remove('cdk-program-focused')

    // })


    this.data = {
      "uname": "root",
      "mindate": "20181018",
      "maxdate": "20211018",
      "project": "all",
      "label": [
        422
      ],
      "id": "TF27",
      "sheet": "Defect Data",
      "projectToolId": [
        393
      ],
      "modelType": "Topic Modelling NMF",
      "allStatus": [
        "New",
        "Closed",
        "Rejected",
        "Removed"
      ],
      "defectId": "MB-D-1"
    }
    this.httpservice.fetchDataSingle(this.data).subscribe(data => {
      this.data = JSON.parse(data[0])
      // data['treemap'].children[0].children.forEach(child => {
      //   if(child.name==='Status'){
      //     child['collapsed']=false
      //   }
      // });


      this.option = this.httpservice.makeChart(data);
    })
  }


  timedOutCloser;

  mouseEnter() {
    if (this.timedOutCloser) {
      clearTimeout(this.timedOutCloser);
    }
    this.trigger.openMenu();
  }

  mouseLeave() {
    this.timedOutCloser = setTimeout(() => {
      this.trigger.closeMenu();
    }, 500);

  }

  toImg(type) {
    let mime = "image/" + type
    let frame = document.getElementById("echartss").children[0].children[0] as HTMLCanvasElement;
    let finalImg;
    let a = document.createElement("a");
    if (type === "png") {
      finalImg = frame.toDataURL(mime);
      a.href = finalImg;
      a.download = "filename." + type;
      a.click();
    }
    else {
      let img = frame.toDataURL();
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let image = new Image();
      image.src = img;
      image.addEventListener("load", () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0);
        let divContainer = document.getElementById("showData");
        divContainer.appendChild(canvas)
        finalImg = canvas.toDataURL("image/jpeg");
        a.href = finalImg;
        a.download = "filename." + type;
        a.click();
      })
    }
  }

  toJson() {
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data));
    let a = document.createElement("a");
    a.href = dataStr;
    a.download = "filename.json";
    a.click();
  }

  print() {
    let canvas = document.getElementById("echartss").children[0].children[0] as HTMLCanvasElement
    let dataUrl = canvas.toDataURL();
    let windowContent = `<!DOCTYPE html><html><head>
    <style type="text/css" media="print">
  @page {  margin-left: 0cm; }
</style>
    <title>Insights</title></head>''<body>`
    windowContent += '<div style="display:block,width:90%,position: static"><img src="' + dataUrl + '"/></div></body></html>';
    let printWin = window.open();
    printWin.document.open("", "", 'width=100,height=100');
    printWin.document.write(windowContent);
    printWin.document.addEventListener('load', function () {
      printWin.focus();
      printWin.print();
      printWin.document.close();
      printWin.close();
    }, true);
  }


  saveHtml() {
    let col = [];
    for (let i = 0; i < Object.keys(this.data).length; i++) {
      for (let key in this.data[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }


    let table = document.createElement("table");
    let tr = table.insertRow(-1);

    for (let i = 0; i < col.length; i++) {
      let th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);
    }
    for (let i = 0; i < this.data.length; i++) {

      tr = table.insertRow(-1);

      for (let j = 0; j < col.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = this.data[i][col[j]];
      }
    }

    let link = document.createElement('a');
    link.setAttribute('download', "data.html");
    link.setAttribute('href', 'data:' + "text/html" + ';charset=utf-8,' + encodeURIComponent(table.outerHTML));
    link.click();

  }



  download_table_as_csv(separator = ',') {
    let json = this.data
    let fields = Object.keys(json[0])
    let replacer = function (key, value) { return value === null ? '' : value }
    let csv = json.map(function (row) {
      return fields.map(function (fieldName) {
        return JSON.stringify(row[fieldName], replacer)
      }).join(',')
    })
    csv.unshift(fields.join(',')) // add header column
    csv = csv.join('\r\n');
    let link = document.createElement('a');
    link.setAttribute('download', "data.csv");
    link.setAttribute('href', "data:text/csv;charset=utf-8," + escape(csv));
    link.click();
  }


  onX() {
    let col = [];
    for (let i = 0; i < Object.keys(this.data).length; i++) {
      for (let key in this.data[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }


    let table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    let tr = table.insertRow(-1);                   // TABLE ROW.

    for (let i = 0; i < col.length; i++) {
      let th = document.createElement("th");      // TABLE HEADER.
      th.innerHTML = col[i];
      tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (let i = 0; i < this.data.length; i++) {

      tr = table.insertRow(-1);

      for (let j = 0; j < col.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = this.data[i][col[j]];
      }
    }
    // let divContainer = document.getElementById("showData");
    // console.log(table);

    // divContainer.innerHTML = "";
    // divContainer.appendChild(table);
    let ifr = document.createElement("iframe");
    ifr.src = table.innerHTML
    // console.log(ifr);
    let url = 'data:application/octet-stream,' + ifr;
    let anchor = document.createElement('a');
    anchor.setAttribute('href', url);
    anchor.setAttribute('download', 'myNote.html');
    // let canvas = document.getElementById("echartss").children[0].children[0] as HTMLCanvasElement;
    // console.log(canvas.width);
    // console.log(canvas.height);

    //   console.log(canvas);
    //   let ctx = canvas.getContext("2d");
    // ctx.fillStyle = "#fff";
    // ctx.fillRect(0,0,canvas.width,canvas.height);
    // let img = canvas.toDataURL("image/jpeg");
    // img = img.split(',')[1]
    // let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data));
    // let a = document.createElement("a"); //Create <a>
    // a.href = img; //Image Base64 Goes here
    // a.download = "data.jpeg"; //File name Here
    // a.click(); //Downloaded file

    // let uriContent = URL.createObjectURL(new Blob(["data:image/png;base64," + img], {type : 'image/png'}));
    // let link = document.createElement('a');
    // console.log(uriContent);

    // link.setAttribute('href', uriContent);
    // link.setAttribute('download', "img");
    // let event = new MouseEvent('click');
    // link.dispatchEvent(event);
  }

  enter() {
    this.trigger.openMenu()
    if (!this.isMenuOpen)
      this.isMenuOpen = true
  }
  leave() {
    this.trigger.closeMenu()
    if (this.isMenuOpen)
      this.isMenuOpen = false
  }

  isOpened(evt: any) {
    // set you flag here that you can use in ng-class for the button.
  }

}
