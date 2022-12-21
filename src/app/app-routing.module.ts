import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './common/login.component';
import { DemandComponent } from './views/demand.component';
import { LoginlogComponent } from './views/loginlog.component';
import { MstgapComponent } from './views/mstgap.component';
import { MstmaterialComponent } from './views/mstmaterial.component';
import { MstpoComponent } from './views/mstpo.component';
import { MstusersComponent } from './views/mstusers.component';
import { MstvfdataComponent } from './views/mstvfdata.component';
import { PlantComponent } from './views/plant.component';
import { PlantaccComponent } from './views/plantacc.component';
import { TrainingDocComponent } from './views/trainingdoc.component';
 

const routes: Routes = [ 
  {path:'',component:MstgapComponent},
  {path:'mstvfwaterfall',component:MstvfdataComponent},
  {path:'mstplant',component:PlantComponent},
  {path:'mstmaterial',component:MstmaterialComponent},
  {path:'fcacc',component:PlantaccComponent},
  {path:'mstusers',component:MstusersComponent},
  {path:'loginlog',component:LoginlogComponent},
  {path:'login',component:LoginComponent},
  {path:'mstpo',component:MstpoComponent},
  {path:'mstdemand',component:DemandComponent},
  {path:'training',component:TrainingDocComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
