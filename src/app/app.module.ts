import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar.component';
import { FooterComponent } from './shared/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { paginationFunction } from './Function/paginationfunction';
import { DataService } from './service/data.service';
import { MstgapComponent } from './views/mstgap.component';
import { MstvfdataComponent } from './views/mstvfdata.component';
import { MstmaterialComponent } from './views/mstmaterial.component';
import { PlantComponent } from './views/plant.component';
import { MstusersComponent } from './views/mstusers.component';
import { PlantaccComponent } from './views/plantacc.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginlogComponent } from './views/loginlog.component';
import { MstpoComponent } from './views/mstpo.component';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './common/login.component';
import { DemandComponent } from './views/demand.component';
import { TrainingDocComponent } from './views/trainingdoc.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    MstgapComponent,
    MstvfdataComponent,
    MstmaterialComponent,
    PlantComponent,
    MstusersComponent,
    PlantaccComponent,
    LoginlogComponent,
    LoginComponent,
    MstpoComponent,
    DemandComponent,
    TrainingDocComponent

  ],
  imports: [
    BrowserModule, 
    HttpClientModule,   
    ReactiveFormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule 
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: DataService, multi: true },   
    paginationFunction,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
