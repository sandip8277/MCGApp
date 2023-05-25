import { Component, OnInit } from '@angular/core';
//import * as ComponentsJson from '../../assets/JSON_Files/component_picker_Final_JSON_2.json';
import * as ComponentsJson from '../../assets/JSON_Files/Components1.json';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  panelOpenState = false;
  panelData: any[] = [];
  ComponentValue: any[] = ComponentsJson;
  hideNext1:boolean;
  hideNext2:boolean;

  constructor() { 
    this.hideNext1=false;
    this.hideNext2=true;
  }
  ngOnInit(): void {
    console.log("Hi" ,JSON.stringify(this.ComponentValue));
    this.ComponentValue;
  }
  addPanel() {
    this.panelData.push({
     ComponentValue2:this.ComponentValue,
      title: '',
      content: ''
    });

   
  }

  onNext(value:any) {
    if(value==='1'){
    this.hideNext1=true;
    this.hideNext2=false;
    }
  }

}
