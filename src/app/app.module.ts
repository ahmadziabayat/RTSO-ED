import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CopComponent } from './cop/cop.component';
import { SidebarComponent } from './sidebar/sidebar.component';


import { AngularEsriModule } from 'angular-esri-components';
import { TreeModule } from 'angular-tree-component'; // an angular treeview component
import { SidebarModule } from 'ng-sidebar';
import { AngularSplitModule } from 'angular-split';
import { PlotlyModule } from 'angular-plotly.js'; // an angular plotly.js component
import { ColorPickerModule } from 'ngx-color-picker'; // angular color picker

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgGridModule } from 'ag-grid-angular'; // for showing data in the table


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CopComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularEsriModule,
    SidebarModule.forRoot(),
    AngularSplitModule.forRoot(),
    TreeModule.forRoot(),
    AgGridModule.withComponents([]),
    PlotlyModule,
    HttpClientModule,
    ColorPickerModule,
    AngularFontAwesomeModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
