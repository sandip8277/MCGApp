import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as ComponentsJson_1 from '../../../../assets/JSON_Files/prime_mover_without_location_1.json';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';

import { componentsdetailsModel } from '../../../models/componentsdetails.model';

@Component({
  selector: 'app-first-json-component',
  templateUrl: './first-json-component.component.html',
  styleUrls: ['./first-json-component.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class FirstJsonComponentComponent implements OnInit {
  @Input() panel: any;
  panelOpenState = false;
  panelDataDetails: string[] = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
  public showBothButtons:boolean=true;
  public initialPanelValue: string;
  public intialPanelNumber: number = 0;
  public selectedData: string[];
  public selectedDataToPrint: string="";
  stringJson1: any;
  stringObject1: any;
  components: any;
  currentState: any;
  currentComponents: [];
  previousState: any;
  previousComponents: [];

  currentSelectedValue: string;
  previousSelectedValue: string;
  componentStateTitle: string;
  currentComponentStateTitle: string;
  previousComponentStateTitle: string;
  currentEAKey: string;
  previousEAKey: string;

  isPrimeMoverNotMonitored: boolean;
  isCloseCoupled: boolean;
  closeCoupledSelectedValue: string;
  constructor() {
    this.showBothButtons=true;
    this.isPrimeMoverNotMonitored = false;
    this.isCloseCoupled = false;
    this.closeCoupledSelectedValue = "";
    this.initialPanelValue = this.panelDataDetails[0];
    this.intialPanelNumber = -1;
    componentsdetailsModel: [];
    this.components = [];
    this.currentComponents = [];

    this.previousState = "";
    this.previousComponents = [];

    this.currentSelectedValue = "Prime Mover";
    this.previousSelectedValue = "";

    this.currentEAKey = '';
    this.previousEAKey = '';
    this.selectedData = [];
    this.selectedDataToPrint="";
    this.componentStateTitle = '';
    this.previousComponentStateTitle = '';
    this.currentComponentStateTitle = '';
  }

  ngOnInit(): void {
    this.stringJson1 = JSON.stringify(ComponentsJson_1);
    this.stringObject1 = JSON.parse(this.stringJson1);
    let start = this.stringObject1.start;
    this.currentState = start; //i.e. 'D-S39'
    let states = this.stringObject1.states[start];
    let options = states["options"];
    this.componentStateTitle = states["text"];
    this.currentComponentStateTitle = this.componentStateTitle;
    this.currentEAKey = states["eaKey"];
    this.previousEAKey = this.currentEAKey;
    this.components = this.stringObject1.data[options];
    this.currentComponents = this.components;
  }

  onValChange(value: any) {
    this.currentSelectedValue = value;
  }

  checkIsPrimeMoverNotMonitored() {
    if (this.currentEAKey == 'PRIME_MOVER' && this.currentSelectedValue == 'Not Monitored') {
      this.isPrimeMoverNotMonitored = true;
    }
  }

  checkIsCloseCoupled() {
    if (this.currentEAKey == 'component' && this.currentSelectedValue == 'Close Coupled Machine') {
      this.isCloseCoupled = true;
    }
  }
  checkCloseCoupledValue() {
    if (this.isCloseCoupled && this.currentEAKey !== 'component' && this.closeCoupledSelectedValue == "") {
      this.closeCoupledSelectedValue = this.currentSelectedValue;
    }
  }
  onNext() {
    this.checkIsPrimeMoverNotMonitored();
    this.checkIsCloseCoupled();
    this.checkCloseCoupledValue();
    this.previousEAKey = this.currentEAKey;
    this.previousState = this.currentState;
    this.previousSelectedValue = this.currentSelectedValue;
    this.previousComponents = this.currentComponents;
    

    let transitions = this.stringObject1.transitions;
    let key = '';
    if (isNaN(Number(this.currentSelectedValue))) {
      key = this.currentEAKey + "==" + "'" + this.currentSelectedValue + "'";
    } else {
      key = this.currentEAKey + "==" + this.currentSelectedValue;
    }

    let currentSelectedDataToPush=key.replace("==",":").replace("'","");
    this.selectedData.push(currentSelectedDataToPush);
    this.selectedDataToPrint=this.selectedData.toString();
    let finalKey = this.constructFinalKey(this.currentState, this.currentEAKey, key);
    key = finalKey;
    // let toState = transitions.filter((x: {
    //   on: string; from: any;
    // }) => (x.from === this.currentState && x.on.includes(key)));
    if (key !== 'exit') {
      let toState1 = transitions.filter((x: {
        on: string; from: any;
      }) => (x.from === this.currentState));

      let toState = toState1.filter((x: {
        on: string; from: any;
      }) => (x.on !== undefined && x.on.includes(key)));

      if (toState1.length === 1) {
        toState = toState1;
      }
      this.currentState = toState[0].to;
      let nextState = toState[0].to;
      let states = this.stringObject1.states[nextState];
      let currentSelectedEAKey = states.eaKey;
      this.currentEAKey = currentSelectedEAKey;
      let options = states["options"];
      this.componentStateTitle = states["text"];
      this.components = this.stringObject1.data[options];
      this.currentComponents = this.components;

      this.previousComponentStateTitle = this.currentComponentStateTitle;
      this.currentComponentStateTitle = this.componentStateTitle;
    }
    else{
      this.panelOpenState = false;
      this.showBothButtons=false;
    }
  }
  onBack() {
    if(this.selectedData.length>0){
    this.selectedData.pop();
    this.selectedDataToPrint=this.selectedData.toString();
    }
    this.currentEAKey = this.previousEAKey;
    this.currentState = this.previousState;
    this.currentComponents = this.previousComponents;
    this.components = this.currentComponents;
    this.currentSelectedValue = this.previousSelectedValue;

    this.currentComponentStateTitle = this.previousComponentStateTitle;
    this.componentStateTitle = this.currentComponentStateTitle;
  }
  constructFinalKey(currentState: string, currentEAKey: string, key: string) {
    let constructedKey = '';
    switch (currentState) {
      case "D-S15": {
        if (key == 'Driver_locations==1' && !this.isPrimeMoverNotMonitored && !this.isCloseCoupled) {
          constructedKey = "Driver_locations==1 && PRIME_MOVER!='Not Monitored'";
        }
        else if (key == 'Driver_locations==1' && this.isCloseCoupled && ((this.closeCoupledSelectedValue === 'Motor') || (this.closeCoupledSelectedValue === 'Turbine'))) {
          constructedKey = "(closeCoupled=='Motor' || closeCoupled=='Turbine') && Driver_locations != 2";
        }
        else {
          constructedKey = 'exit';
        }
        break;
      }
      case "D-S16": {
        constructedKey = 'exit';
        break;
      }
      case "D-S54": {
        constructedKey = 'exit';
        break;
      }
      case "CCPL-S6": {
        if (this.closeCoupledSelectedValue == 'Motor' && key!="driven=='Compressor'") {
          constructedKey = "closeCoupled=='Motor' && " + key;
        }
        else if (this.closeCoupledSelectedValue == 'Motor' && key!="driven=='Compressor'") {
          constructedKey = "closeCoupled=='Turbine' && " + key;
        }
        else {
          constructedKey = key;
        }
        break;
      }
      default: {
        constructedKey = key;
        break;
      }
    }
    return constructedKey;
  }
 

  getImageFromIconKey(value: string) {
    let imageName = this.getImageName(value);
    if (value !== "0") {
      return "../../../../assets/Icons/" + imageName;
    }
    else {
      return "";
    }
  }

  getImageName(value: string) {
    // let imageName="ic_ac_motor.SVG";
    let imageName = "";
    switch (value) {
      case "1": {
        imageName = "ic_ac_motor.svg";
        break;
      }
      case "2": {
        imageName = "ic_dc_motor.svg";
        break;
      }
      case "3": {
        imageName = "ic_vfd_motor.svg";
        break;
      }
      case "4": {
        imageName = "ic_electric_motor.svg";
        break;
      }
      case "5": {
        imageName = "ic_diesel_engine.svg";
        break;
      }
      case "6": {
        imageName = "ic_turbine.svg";
        break;
      }
      case "8": {
        imageName = "ic_flexible_coupling.svg";
        break;
      }
      case "9": {
        imageName = "ic_magnetic_coupling.svg";
        break;
      }
      case "10": {
        imageName = "ic_belt_drive.svg";
        break;
      }
      case "11": {
        imageName = "ic_chain_drive.svg";
        break;
      }
      case "12": {
        imageName = "ic_centrifugal_pump.svg";
        break;
      }
      case "13": {
        imageName = "ic_gear_pump.svg";
        break;
      }
      case "14": {
        imageName = "ic_screw_pump.svg";
        break;
      }

      case "15": {
        imageName = "ic_radial_reciprocating_pump.svg";
        break;
      }
      case "16": {
        imageName = "ic_rotary_thread_pump.svg";
        break;
      }
      case "17": {
        imageName = "ic_axial_piston_pump.svg";
        break;
      }
      case "18": {
        imageName = "ic_vacuum_pump.svg";
        break;
      }
      case "19": {
        imageName = "ic_rotary_vane_pump.svg";
        break;
      }
      case "20": {
        imageName = "ic_supported_centrifugal_pump.svg";
        break;
      }
      case "21": {
        imageName = "ic_overhung_centrifugal_pump.svg";
        break;
      }
      case "22": {
        imageName = "ic_propeller_pump.svg";
        break;
      }
      case "23": {
        imageName = "ic_stage_fan_1.svg";
        break;
      }
      case "24": {
        imageName = "ic_stage_fan_2.svg";
        break;
      }
      case "25": {
        imageName = "ic_decanter.svg";
        break;
      }
      case "26": {
        imageName = "ic_geared_centrifugal_compressor.svg";
        break;
      }
      case "27": {
        imageName = "ic_spindle_shaft_bearing.svg";
        break;
      }
      case "28": {
        imageName = "ic_1_sp_change_gearset.svg";
        break;
      }
      case "29": {
        imageName = "ic_2_sp_change_gearset.svg";
        break;
      }
      case "30": {
        imageName = "ic_1_sp_change_gearset__multi_.svg";
        break;
      }
      case "31": {
        imageName = "ic_twin_screw_compressor.svg";
        break;
      }
      case "32": {
        imageName = "ic_oil_purifier.svg";
        break;
      }
      case "33": {
        imageName = "ic_screw_compressor.svg";
        break;
      }
      case "34": {
        imageName = "ic_fan_or_blower.svg";
        break;
      }
      case "50": {
        imageName = "ic_rigid_coupling.svg";
        break;
      }
      case "51": {
        imageName = "ic_fan_with_slinger.svg";
        break;
      }
      case "35": {
        imageName = "ic_centrifugal_compressor.svg";
        break;
      }
      case "36": {
        imageName = "ic_compressor.svg";
        break;
      }
      case "37": {
        imageName = "ic_generator.svg";
        break;
      }
      case "38": {
        imageName = "ic_reciprocating_compressor.svg";
        break;
      }
      case "101":
      default: {
        imageName = "ic_not_monitored.svg";
        break;
      }
    }
    imageName = "a_sample_not_to_use.svg"; //Remve later on
    return imageName;
  }
}
