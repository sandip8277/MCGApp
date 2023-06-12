import { Component, OnInit } from '@angular/core';
//import * as ComponentsJson from '../../assets/JSON_Files/component_picker_Final_JSON_2.json';
import * as ComponentsJson_1 from '../../assets/JSON_Files/prime_mover_without_location_1.json';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { componentsdetailsModel } from '../models/componentsdetails.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  panelOpenState = false;
  panelDataDetails: string[] = ["1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th"];
  panelData: any[] =[];
  public initialPanelValue:string;
  public intialPanelNumber:number=0;
  stringJson1: any;
  stringObject1:any;
  components:any;

  constructor() { 
    this.initialPanelValue=this.panelDataDetails[0];
    this.intialPanelNumber=-1;
    componentsdetailsModel:[];
  }
  ngOnInit(): void {
    
  }

  addPanel(intialPanelNumber:number) {
    this.intialPanelNumber=this.intialPanelNumber+1;
    this.initialPanelValue=this.panelDataDetails[this.intialPanelNumber];
    if(this.intialPanelNumber<=9){
    this.panelData.push({
     componentValue:this.initialPanelValue,
      value: this.intialPanelNumber,
      content: ''
    });
  }
  }

  removePanel(intialPanelNumber:number) {
    if(intialPanelNumber>9){
      this.intialPanelNumber=9;
    }

    if(intialPanelNumber!=-1){
      this.intialPanelNumber=this.intialPanelNumber-1;
    }
    let index = this.panelData.findIndex(d => d.value === intialPanelNumber);
    this.panelData.splice(index, 1);
  }
  onNext(value:any) {
    // if(value==='1'){
    // this.hideNext1=true;
    // this.hideNext2=false;
    // }
  }
}
