import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AutomateComponent } from './automate/automate.component';
import { NetworkGraphComponent } from './network-graph/network-graph.component';
import { NetworkTableComponent } from './network-table/network-table.component';


@NgModule({
  declarations: [
    AppComponent,
    AutomateComponent,
    NetworkGraphComponent,
    NetworkTableComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
