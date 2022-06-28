import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { PieComponent } from './pie/pie.component';
import { SinglechartComponent } from './singlechart/singlechart.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path:'charts',
    component:ChartsComponent
  },
  {
    path:'single',
    component:SinglechartComponent
  },
  {
    path:'pie',
    component:PieComponent
  },
  {
    path:'test',
    component:TestComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
