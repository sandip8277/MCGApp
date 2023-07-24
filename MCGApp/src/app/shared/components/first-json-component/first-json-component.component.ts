import { Component, OnInit, Input, OnChanges, TemplateRef, ViewChild } from '@angular/core';
import * as ComponentsJson_1 from '../../../../assets/JSON_Files/prime_mover_without_location_1.json';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule, MatExpansionPanel } from '@angular/material/expansion';

import { componentsdetailsModel } from '../../../models/componentsdetails.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-first-json-component',
  templateUrl: './first-json-component.component.html',
  styleUrls: ['./first-json-component.component.scss'],
  viewProviders: [MatExpansionPanel]
})
export class FirstJsonComponentComponent implements OnInit {
  /* Start Speed change dialog */
  speedChangedialogRef: any;
  @ViewChild('speedChangeDialog') speedChangeDialog = {} as TemplateRef<string>;
  /* End Speed change dialog */

  @Input() panel: any;
  panelOpenState = false;
  public showBothButtons: boolean = true;
  public intialPanelNumber: number = 0;
  public selectedData: string[];
  public selectedDataToPrint: string = "";
  stringJson1: any;
  stringObject1: any;
  components: any;
  currentState: any;
  currentComponents: any;
  previousState: any;
  previousComponents: [] = [];

  currentSelectedValue: string = "";
  previousSelectedValue: string;
  componentStateTitle: string = "";
  currentComponentStateTitle: string;
  previousComponentStateTitle: string;
  currentEAKey: string;
  previousEAKey: string;

  isPrimeMoverNotMonitored: boolean;
  isCloseCoupled: boolean;
  isBeltOrChainDrive: boolean;
  isCoupling: boolean;
  isGearbox: boolean;
  isDriven: boolean;
  closeCoupledSelectedValue: string;

  lstselctedComponentDetails: Array<componentsdetailsModel> = [];

  /* Start Speed change dialog */
  public isSpeedChangeControl: boolean = false;
  public speedChangeTypeSelected = "Speed Reducer";
  public speedChangeValue1: number = 1.00;
  public speedChangeValue2: number = 1.00;
  public speedChangeBeltRatio: number = 1.00;
  public displayChangeBeltRatio: string = "";
  public speedChangeErrorMessage: string = "";
  /* End Speed change dialog */

  /* Start ratio control Gearbox */
  public isRatioControl: boolean = false;
  public iscValue: number = 1;
  public R1_1: string = "";
  public R1_2: string = "";
  public R2_1: string = "";
  public R2_2: string = "";
  public R3_1: string = "";
  public R3_2: string = "";
  public errorRatioValueRequired: string = "";
  public nolValue: string = "";
  /* End ratio control Gearbox*/
  /* Start driven */
  driven: string = '';
  drivenc: string = '';
  not_monitored_driven: string = "";
  rotorOH: string = "";
  Aop: string = "";
  drivenbrgs: any = "";
  drivenbb: string = "";
  type: any = "";
  public isDrivenComponentTextinput: boolean = false;
  drivenVanesEntered: string = '';
  Impelleronmain:string="";
  crankintbrg:string="";
  /* End driven */
  constructor(public dialog: MatDialog) {
    this.showBothButtons = true;
    this.isPrimeMoverNotMonitored = false;
    this.isCloseCoupled = false;
    this.isBeltOrChainDrive = false;
    this.isCoupling = false;
    this.isGearbox = false;
    this.isDriven = false;
    this.closeCoupledSelectedValue = "";
    this.intialPanelNumber = -1;
    this.previousSelectedValue = "";
    this.currentEAKey = '';
    this.previousEAKey = '';
    this.selectedData = [];
    this.selectedDataToPrint = "";
    this.previousComponentStateTitle = '';
    this.currentComponentStateTitle = '';
    this.isSpeedChangeControl = false;
    this.isDrivenComponentTextinput = false;
    this.drivenVanesEntered = "";
    this.isRatioControl = false;
    this.iscValue = 1;
    this.nolValue = "1";
  }

  public initializeSelectedCompnents() {
    this.currentComponents = [];
    this.previousState = "";
    this.previousComponents = [];
    this.components = [];
    this.componentStateTitle = '';
    this.currentSelectedValue = "Prime Mover";
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

    let objcomponentsdetailsModel = {} as componentsdetailsModel;
    objcomponentsdetailsModel.eaKey = this.currentEAKey;
    objcomponentsdetailsModel.state = this.currentState;
    objcomponentsdetailsModel.selectedValue = this.currentSelectedValue;
    objcomponentsdetailsModel.components = this.components;
    objcomponentsdetailsModel.componentStateTitle = this.componentStateTitle;
    this.lstselctedComponentDetails.push(objcomponentsdetailsModel);
  }
  ngOnInit(): void {
    this.initializeSelectedCompnents();
  }

  onValChange(value: any) {
    this.currentSelectedValue = value;
    let len = this.lstselctedComponentDetails.length;
    this.lstselctedComponentDetails[len - 1].selectedValue = this.currentSelectedValue;
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
  checkIsBeltOrChainDrive() {
    if (this.currentEAKey == 'component' && this.currentSelectedValue == 'Belt or Chain Drive') {
      this.isBeltOrChainDrive = true;
    }
  }
  checkIsCoupling() {
    if (this.currentEAKey == 'component' && this.currentSelectedValue == 'Coupling') {
      this.isCoupling = true;
    }
  }
  checkIsGearBox() {
    if (this.currentEAKey == 'component' && this.currentSelectedValue == 'Gearbox') {
      this.isGearbox = true;
    }
  }
  checkIsDriven() {
    if (this.currentEAKey == 'component' && this.currentSelectedValue == 'Driven') {
      this.isDriven = true;
    }
  }

  checkDrivenPumpType() {
    if ((this.currentState === "DR-S2" || this.currentState === "DR-S3" || this.currentState === "DR-S6") && this.isDriven) {
      this.drivenc = this.currentSelectedValue;
    }

    if (this.currentState === "DR-S41" && this.isDriven && this.driven === 'Not Monitored') {
      this.drivenc = this.currentSelectedValue;
    }
  }

  checkDrivenComponent() {
    if ((this.currentState === "DR-S1") && this.isDriven) {
      this.driven = this.currentSelectedValue;
    }
  }

  checkNotMonitoredDrivenComponent() {
    if (this.currentState === "DR-S41" && this.isDriven && this.currentEAKey === "not_monitored_driven") {
      this.not_monitored_driven = this.currentSelectedValue;
    }
  }
  checkCloseCoupledValue() {
    if (this.isCloseCoupled && this.currentEAKey !== 'component' && this.closeCoupledSelectedValue == "") {
      this.closeCoupledSelectedValue = this.currentSelectedValue;
    }
  }

  addNextStepComponent() {
    let objcomponentsdetailsModel = {} as componentsdetailsModel;
    objcomponentsdetailsModel.eaKey = this.currentEAKey;
    objcomponentsdetailsModel.state = this.currentState;
    objcomponentsdetailsModel.selectedValue = this.currentSelectedValue;
    objcomponentsdetailsModel.components = this.components;
    objcomponentsdetailsModel.componentStateTitle = this.componentStateTitle;
    this.lstselctedComponentDetails.push(objcomponentsdetailsModel);
  }

  removeCurrentStepComponentAndBack() {
    this.isRatioControl = false;
    this.resetRatioControls();
    this.isSpeedChangeControl = false;
    this.isDrivenComponentTextinput = false;
    this.drivenVanesEntered = "";
    this.lstselctedComponentDetails.pop();
    let len = this.lstselctedComponentDetails.length;

    let currentData = this.lstselctedComponentDetails[len - 1];
    if (currentData !== undefined) {
      this.currentEAKey = currentData.eaKey;
      this.currentState = currentData.state;
      this.currentComponents = currentData.components;
      this.components = this.currentComponents;
      this.currentSelectedValue = currentData.selectedValue;
      this.currentComponentStateTitle = currentData.componentStateTitle;
      this.componentStateTitle = this.currentComponentStateTitle;
    }
    if (this.currentState === "G-S16") {
      this.isRatioControl = true;
    }
    if (this.currentState === "DR-S10" ||this.currentState === "DR-S28" || this.currentState === "DR-S29" || this.currentState === "DR-S30" || this.currentState === "DR-S31" || this.currentState === "DR-S35" || this.currentState === "DR-S39"|| this.currentState === "DR-S32" || this.currentState === "DR-S36") {
      this.isDrivenComponentTextinput = true;
    }
    if( this.currentState === "DR-S10" && this.drivenc==="Lobed Vacuum Pump"){
      this.isDrivenComponentTextinput = false;
    }
    if( this.currentState === "DR-S10" && this.drivenc==="Reciprocating Vacuum Pump"){
      this.isDrivenComponentTextinput = false;
    }
  }
  onNext() {
    this.checkDrivenPumpType();
    this.checkDrivenComponent();
    this.checkNotMonitoredDrivenComponent();
    if (this.currentState === "G-S16" && this.isRatioControl) {
      this.errorRatioValueRequired = "";
      if (this.R1_1 === "" || this.R1_2 === "") {
        this.errorRatioValueRequired = "* marked fields are mandatory."
      }
      else {
        this.errorRatioValueRequired = "";
        this.executeNext();
      }
    }
    else {
      this.executeNext();
    }
  }
  /* Start ratio control Gearbox */
  public setNOLValueForRatioControlGearboxComponent(selectedValue: any) {
    if (this.currentState === "G-S11" && this.currentEAKey === "NOL") {
      this.nolValue = selectedValue;
    }
  }
  /* End ratio control Gearbox */

  /* Start Driven */
  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  public set_drivenbb(currentEAKey: string, selectedValue: any) {
    if (currentEAKey === "drivenbb") {
      this.drivenbb = selectedValue;
    }
  }
  public set_rotorOH(currentEAKey: string, selectedValue: any) {
    if (currentEAKey === "rotorOH") {
      this.rotorOH = selectedValue;
    }
  }

  public set_Aop(currentEAKey: string, selectedValue: any) {
    if (currentEAKey === "Aop") {
      this.Aop = selectedValue;
    }
  }
  public set_Impelleronmain(currentEAKey: string, selectedValue: any) {
    if (currentEAKey === "Impelleronmain") {
      this.Impelleronmain = selectedValue;
    }
  }
  public set_crankintbrg(currentEAKey: string, selectedValue: any) {
    if (currentEAKey === "crankintbrg") {
      this.crankintbrg = selectedValue;
    }
  }
  public set_drivenbrgs(currentEAKey: string, selectedValue: any) {
    if (currentEAKey === "drivenbrgs") {
      this.drivenbrgs = selectedValue;
    }
  }
  public set_type(currentEAKey: string, selectedValue: any) {
    if (currentEAKey === "type") {
      this.type = selectedValue;
    }
  }
  public executeDrivenRelatedData() {
    this.set_drivenbb(this.currentEAKey, this.currentSelectedValue);
    this.set_rotorOH(this.currentEAKey, this.currentSelectedValue);
    this.set_Aop(this.currentEAKey, this.currentSelectedValue);
    this.set_Impelleronmain(this.currentEAKey, this.currentSelectedValue);
    this.set_crankintbrg(this.currentEAKey, this.currentSelectedValue);
    this.set_drivenbrgs(this.currentEAKey, this.currentSelectedValue);
    this.set_type(this.currentEAKey, this.currentSelectedValue);
  }

  /* End Driven */
  public executeNext() {
    this.checkIsPrimeMoverNotMonitored();
    this.checkIsCloseCoupled();
    this.checkCloseCoupledValue();
    this.checkIsBeltOrChainDrive();
    this.checkIsCoupling();
    this.checkIsGearBox();
    this.checkIsDriven();
    if (this.lstselctedComponentDetails.length === 1) {
      this.lstselctedComponentDetails[0].selectedValue = this.currentSelectedValue;
    }
    let transitions = this.stringObject1.transitions;
    let key = '';
    if (isNaN(Number(this.currentSelectedValue))) {
      key = this.currentEAKey + "==" + "'" + this.currentSelectedValue + "'";
    } else {
      key = this.currentEAKey + "==" + this.currentSelectedValue;
    }

    this.setNOLValueForRatioControlGearboxComponent(this.currentSelectedValue);
    /* Start Driven */
    this.executeDrivenRelatedData();
    /* End Driven */
    let currentSelectedDataToPush = this.constructSelectedDataToPush(key);

    let finalKey = this.constructFinalKey(this.currentState, this.currentEAKey, key, this.currentSelectedValue);
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
      if (toState.length > 0) {
        this.currentState = toState[0].to;
        let nextState = toState[0].to;
        let states = this.stringObject1.states[nextState];
        let currentSelectedEAKey = states.eaKey;
        this.currentEAKey = currentSelectedEAKey;
        let options = states["options"];
        let optionFilters = states["optionFilters"];
        if (options !== undefined) {
          this.components = this.stringObject1.data[options];
          this.currentComponents = this.components;
          if (this.currentState === "DR-S11" || this.currentState === "DR-S12" || this.currentState === "DR-S19" || this.currentState === "DR-S20") {
            this.components = [];
            this.currentComponents = this.components;
            this.setStateBasedComponent(nextState, states, key, this.currentSelectedValue);
          }
        }
        else {
          this.components = [];
          this.currentComponents = this.components;
          this.setStateBasedComponent(nextState, states, key, this.currentSelectedValue);
        }

        this.decideControlVisibility(states, key);
        this.componentStateTitle = states["text"];
        if (this.componentStateTitle.includes("${drivenc}")) {
          this.componentStateTitle = this.componentStateTitle.replace("${drivenc}", this.drivenc);
        }
        if (this.componentStateTitle.includes("${Driven}")) {
          this.componentStateTitle = this.componentStateTitle.replace("${Driven}", this.driven);
        }

        if (this.componentStateTitle.includes("${closeCoupled}")) {
          this.componentStateTitle = this.componentStateTitle.replace("${closeCoupled}", this.closeCoupledSelectedValue);
        }

        if (this.componentStateTitle.includes("${not_monitored_driven}")) {
          this.componentStateTitle = this.componentStateTitle.replace("${not_monitored_driven}", this.not_monitored_driven);
        }
        this.currentComponentStateTitle = this.componentStateTitle;
        this.selectDefaultItem();
        this.addSelectedData(currentSelectedDataToPush);
        if (this.currentState === "DR-S35" || this.currentState === "DR-S36"){
          this.drivenVanesEntered="";
        }
        this.addNextStepComponent();
      }
    }
    else {
      this.panelOpenState = false;
      this.showBothButtons = false;
      this.addSelectedData(currentSelectedDataToPush);
    }
  }
  setStateBasedComponent(nextState: string, states: any, key: any, selectedValue: any) {
    switch (nextState) {
      case "G-S12":
      case "G-S13":
      case "G-S14":
      case "G-S15":
        {
          if (states["filterOption"] !== undefined && states["optionFilters"] !== undefined && states["filterOption"] === true) {
            let dataOption = "";
            if (this.iscValue === 1) {
              dataOption = "locationOption1";
            }
            if (this.iscValue === 2) {
              dataOption = "locationOption2";
            }
            if (this.iscValue === 3) {
              dataOption = "locationOption3";
            }
            this.components = this.stringObject1.data[dataOption];
            this.currentComponents = this.components;
            if (selectedValue === "2") {
              let arr = [] = this.components;
              this.components = arr.slice(0, -1);
              this.currentComponents = this.components;
            }
            if (selectedValue === "3") {
              let arr = [] = this.components;
              this.components = arr.slice(0, -2);
              this.currentComponents = this.components;
            }
            if (selectedValue === "4") {
              let arr = [] = this.components;
              this.components = arr.slice(0, -3);
              this.currentComponents = this.components;
            }

            if (selectedValue.includes("brg") && this.nolValue === "2") {
              let arr = [] = this.components;
              let index = arr.indexOf(selectedValue)
              this.components = arr.slice(index + 1, arr.length);
              this.currentComponents = this.components;
            }

            if (selectedValue.includes("brg") && this.nolValue === "3" && states["eaKey"] !== undefined && states["eaKey"] === "location_2") {
              let arr = [] = this.components;
              let index = arr.indexOf(selectedValue)
              this.components = arr.slice(index + 1, arr.length - 1);
              this.currentComponents = this.components;
            }
            if (selectedValue.includes("brg") && this.nolValue === "3" && states["eaKey"] !== undefined && states["eaKey"] !== "location_2") {
              let arr = [] = this.components;
              let index = arr.indexOf(selectedValue)
              this.components = arr.slice(index + 1, arr.length);
              this.currentComponents = this.components;
            }

            if (selectedValue.includes("brg") && this.nolValue === "4" && states["eaKey"] !== undefined && states["eaKey"] === "location_2") {
              let arr = [] = this.components;
              let index = arr.indexOf(selectedValue)
              this.components = arr.slice(index + 1, arr.length - 2);
              this.currentComponents = this.components;
            }
            if (selectedValue.includes("brg") && this.nolValue === "4" && states["eaKey"] !== undefined && states["eaKey"] === "location_3") {
              let arr = [] = this.components;
              let index = arr.indexOf(selectedValue)
              this.components = arr.slice(index + 1, arr.length - 1);
              this.currentComponents = this.components;
            }
            if (selectedValue.includes("brg") && this.nolValue === "4" && states["eaKey"] !== undefined && states["eaKey"] === "location_4") {
              let arr = [] = this.components;
              let index = arr.indexOf(selectedValue)
              this.components = arr.slice(index + 1, arr.length);
              this.currentComponents = this.components;
            }
          }
          break;
        }
        case "DR-S10":
          {
            if (states["optionFilters"] !== undefined) {
              let dataOption = "";
              if (this.driven === 'Generator') {
                dataOption = "generatorBearingTypes";
              }
              if (this.driven === 'Vacuum Pump' && this.drivenc === "Axial Recip Vacuum Pump" && this.Aop === "Yes") {
                dataOption = "vacuumBearingTypes1";
              }
              if (this.driven === 'Vacuum Pump' && this.drivenc === "Radial Recip Vacuum Pump" ) {
                dataOption = "notSpecified";
              }
              if (this.driven === 'Vacuum Pump' && this.drivenc === "Axial Recip Vacuum Pump" && this.Aop === "No") {
                dataOption = "vacuumBearingTypes";
              }
              if (this.driven === 'Vacuum Pump' && this.drivenc === "Reciprocating Vacuum Pump" ) {
                dataOption = "reciprocatingBearing";
              }
              if (this.driven === 'Vacuum Pump' && this.drivenc === "Lobed Vacuum Pump" ) {
                dataOption = "lobedBearing";
              }
              if (this.driven === 'Vacuum Pump' && this.drivenc === "Centrifugal Vacuum Pump" && this.Impelleronmain === "Yes") {
                dataOption = "centrifugalBearing";
              }
              if (this.driven === 'Vacuum Pump' && this.drivenc === "Centrifugal Vacuum Pump" && this.Impelleronmain === "No") {
                dataOption = "centrifugalBearing1";
              }
              if (this.driven === 'Vacuum Pump' && this.drivenc === "Centrifugal Vacuum Pump" && this.rotorOH === "No") {
                dataOption = "centrifugalBearing2";
              }
              if (this.driven === 'Vacuum Pump' && this.drivenc === "Centrifugal Vacuum Pump" && this.rotorOH === "Yes") {
                dataOption = "centrifugalBearing3";
              }
              if (this.not_monitored_driven === 'Generator') {
                dataOption = "generatorBearingTypes";
              }
              if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === "Axial Recip Vacuum Pump" && this.Aop === "Yes") {
                dataOption = "vacuumBearingTypes1";
              }
              if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === "Radial Recip Vacuum Pump" ) {
                dataOption = "notSpecified";
              }
              if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === "Axial Recip Vacuum Pump" && this.Aop === "No") {
                dataOption = "vacuumBearingTypes";
              }
              if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === "Reciprocating Vacuum Pump" ) {
                dataOption = "reciprocatingBearing";
              }
              if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === "Lobed Vacuum Pump" ) {
                dataOption = "lobedBearing";
              }
              if (this.nolValue === 'Vacuum Pump' && this.drivenc === "Centrifugal Vacuum Pump" && this.Impelleronmain === "Yes") {
                dataOption = "centrifugalBearing";
              }
              if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === "Centrifugal Vacuum Pump" && this.Impelleronmain === "No") {
                dataOption = "centrifugalBearing1";
              }
              if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === "Centrifugal Vacuum Pump" && this.rotorOH === "No") {
                dataOption = "centrifugalBearing2";
              }
              if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === "Centrifugal Vacuum Pump" && this.rotorOH === "Yes") {
                dataOption = "centrifugalBearing3";
              }

              if((dataOption==="" || dataOption===undefined) && states["options"]!==undefined){
                dataOption=states["options"];
              }

              this.components = this.stringObject1.data[dataOption];
              this.currentComponents = this.components;
            }
            break;
          }
        case "DR-S11":
        {
          if (states["optionFilters"] !== undefined) {
            let dataOption = "";
            if (this.driven === 'Pump' && this.drivenc === 'Sliding Vane Pump') {
              dataOption = "yesNoNotSpecified";
            }
            if (this.not_monitored_driven === 'Pump' && this.drivenc === 'Sliding Vane Pump') {
              dataOption = "yesNoNotSpecified";
            }
            this.components = this.stringObject1.data[dataOption];
            this.currentComponents = this.components;
          }
          break;
        }
        
      case "DR-S12":
        {
          if (states["optionFilters"] !== undefined) {
            let dataOption = "";
            if (this.driven === 'Pump' && (this.drivenc === 'Rotary Thread Pump' || this.drivenc === "Propeller Pump" || (this.rotorOH === "No" && this.drivenc !== "Sliding Vane Pump"))) {
              dataOption = "yesNoBoth";
            }
            if (this.driven === 'Pump' && (this.drivenc === "Screw Pump" || (this.drivenc === "Sliding Vane Pump" && this.rotorOH !== "Not Specified") || this.Aop === "Yes")) {
              dataOption = "yes";
            }
            if (this.not_monitored_driven === 'Pump' && (this.drivenc === "Rotary Thread Pump" || this.drivenc === "Propeller Pump" || (this.rotorOH === "No" && this.drivenc !== "Sliding Vane Pump"))) {
              dataOption = "yesNoBoth";
            }
            if (this.not_monitored_driven === 'Pump' && (this.drivenc === "Screw Pump" || (this.drivenc === "Sliding Vane Pump" && this.rotorOH !== "Not Specified") || this.Aop === "Yes")) {
              dataOption = "yes";
            }
            if (this.drivenc === 'Sliding Vane Pump' && this.rotorOH === "Not Specified") {
              dataOption = "no";
            }
            if (this.drivenc === 'Radial Recip Pump') {
              dataOption = "notSpecified";
            }
            if((dataOption==="" || dataOption===undefined) && states["options"]!==undefined){
              dataOption=states["options"];
            }
            this.components = this.stringObject1.data[dataOption];
            this.currentComponents = this.components;
          }
          break;
        }
      case "DR-S13":
        {
          if (states["optionFilters"] !== undefined) {
            let dataOption = "";
            if (((this.driven === 'Pump') && (this.drivenc !== 'Axial Recip Pump')) && ((this.drivenbb === "Yes") || (this.drivenbb === "Both"))) {
              dataOption = "yesNo";
            }
            if (((this.driven === 'Pump') && (this.drivenc !== 'Axial Recip Pump')) && (this.rotorOH === "No") && (this.drivenbb === "No")) {
              if (dataOption === "") {
                dataOption = "thrustBearing1";
              }
            }
            if (((this.driven === 'Pump') && (this.drivenc !== 'Axial Recip Pump')) && (this.drivenbb === "No")) {
              if (dataOption === "") {
                dataOption = "thrustBearing";
              }
            }
            if (this.driven === 'Compressor') {
              if (dataOption === "") {
                dataOption = "yesNo";
              }
            }
            if (((this.driven === 'Pump') && ((this.drivenc === 'Axial Recip Pump' && this.Aop === "Yes") || (this.drivenc === 'Radial Recip Pump')))) {
              if (dataOption === "") {
                dataOption = "no";
              }
            }
            if (this.driven === 'Pump' && this.drivenc === 'Axial Recip Pump' && this.Aop === "No" && this.drivenbb === "Yes") {
              if (dataOption === "") {
                dataOption = "thrustBearing2";
              }
            }
            if (this.driven === 'Pump' && this.drivenc === 'Axial Recip Pump' && this.Aop === "No" && this.drivenbb === "No") {
              if (dataOption === "") {
                dataOption = "thrustBearing3";
              }
            }
            if (this.driven === 'Vacuum Pump' && this.drivenc === 'Axial Recip Vacuum Pump' && this.drivenbrgs == "Ball Bearings") {
              if (dataOption === "") {
                dataOption = "no";
              }
            }
            if (this.driven === 'Vacuum Pump' && this.drivenc === 'Axial Recip Vacuum Pump' && this.drivenbrgs == "Journal") {
              if (dataOption === "") {
                dataOption = "vacuumThrustBearing";
              }
            }
            if (this.driven === 'Vacuum Pump' && this.drivenc !== 'Centrifugal Vacuum Pump' && this.drivenc !== 'Axial Recip Vacuum Pump' && this.drivenc !== 'Radial Recip Vacuum Pump') {
              if (dataOption === "") {
                dataOption = "vacuumThrustBearing";
              }
            }
            if (this.driven === 'Vacuum Pump' && this.drivenc === 'Centrifugal Vacuum Pump' && this.type === 'Impeller') {
              if (dataOption === "") {
                dataOption = "yesNo";
              }
            }
            if (this.driven === 'Vacuum Pump' && this.drivenc === 'Centrifugal Vacuum Pump' && this.type === 'Rotor' && this.rotorOH === "Yes" && this.drivenbrgs === "Journal") {
              if (dataOption === "") {
                dataOption = "vacuumThrustBearing1";
              }
            }
            if (this.driven === 'Vacuum Pump' && this.drivenc === 'Centrifugal Vacuum Pump' && this.type === 'Rotor' && this.rotorOH === "No" && this.drivenbrgs === "Journal") {
              if (dataOption === "") {
                dataOption = "vacuumThrustBearing3";
              }
            }
            if (this.driven === 'Vacuum Pump' && this.drivenc === 'Radial Recip Vacuum Pump') {
              if (dataOption === "") {
                dataOption = "no";
              }
            }
            if (this.not_monitored_driven === 'Pump' && this.drivenc !== 'Axial Recip Pump' && (this.drivenbb === "Yes" || this.drivenbb === "Both")) {
              if (dataOption === "") {
                dataOption = "yesNo";
              }
            }
            if (this.not_monitored_driven === 'Pump' && this.drivenc !== 'Axial Recip Pump' && this.rotorOH === "No" && this.drivenbb === "No") {
              if (dataOption === "") {
                dataOption = "thrustBearing1";
              }
            }
            if (this.not_monitored_driven === 'Pump' && this.drivenc !== 'Axial Recip Pump' && this.drivenbb === "No") {
              if (dataOption === "") {
                dataOption = "thrustBearing";
              }
            }
            if (this.not_monitored_driven === 'Compressor') {
              if (dataOption === "") {
                dataOption = "yesNo";
              }
            }
            if (this.not_monitored_driven === 'Pump' && ((this.drivenc === 'Axial Recip Pump' && this.Aop === "Yes") || (this.drivenc === "Radial Recip Pump"))) {
              if (dataOption === "") {
                dataOption = "no";
              }
            }
            if (this.not_monitored_driven === 'Pump' && this.drivenc === 'Axial Recip Pump' && this.Aop === "No" && this.drivenbb === "Yes") {
              if (dataOption === "") {
                dataOption = "thrustBearing2";
              }
            }
            if (this.not_monitored_driven === 'Pump' && this.drivenc === 'Axial Recip Pump' && this.Aop === "No" && this.drivenbb === "No") {
              if (dataOption === "") {
                dataOption = "thrustBearing3";
              }
            }
            if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === 'Axial Recip Vacuum Pump' && this.drivenbrgs === "Ball Bearings") {
              if (dataOption === "") {
                dataOption = "no";
              }
            }
            if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === 'Axial Recip Vacuum Pump' && this.drivenbrgs === "Journal") {
              if (dataOption === "") {
                dataOption = "vacuumThrustBearing";
              }
            }
            if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc !== 'Centrifugal Vacuum Pump' && this.drivenc !== "Axial Recip Vacuum Pump" && this.drivenc !== "Radial Recip Vacuum Pump") {
              if (dataOption === "") {
                dataOption = "vacuumThrustBearing";
              }
            }
            if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === 'Centrifugal Vacuum Pump' && this.type === "Impeller") {
              if (dataOption === "") {
                dataOption = "yesNo";
              }
            }
            if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === 'Centrifugal Vacuum Pump' && this.type === "Rotor" && this.rotorOH === "Yes" && this.drivenbrgs === "Journal") {
              if (dataOption === "") {
                dataOption = "vacuumThrustBearing1";
              }
            }
            if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === 'Centrifugal Vacuum Pump' && this.type === "Rotor" && ((this.rotorOH === "Yes" && this.drivenbrgs === "Ball Bearings") || (this.rotorOH === "No" && (this.drivenbrgs === "Ball Bearings" || this.drivenbrgs === "Both")))) {
              if (dataOption === "") {
                dataOption = "vacuumThrustBearing2";
              }
            }
            if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === 'Centrifugal Vacuum Pump' && this.type === "Rotor" && this.rotorOH === "No" && this.drivenbrgs === "Journal") {
              if (dataOption === "") {
                dataOption = "vacuumThrustBearing3";
              }
            }
            if (this.not_monitored_driven === 'Vacuum Pump' && this.drivenc === 'Radial Recip Vacuum Pump') {
              if (dataOption === "") {
                dataOption = "no";
              }
            }
            //  started line
            this.components = this.stringObject1.data[dataOption];
            this.currentComponents = this.components;
          }
          break;
        }
        case "DR-S19":
          {
            if (states["optionFilters"] !== undefined) {
              let dataOption = "";
              if (this.drivenc === 'Radial Recip Pump' || this.drivenc === 'Radial Recip Vacuum Pump') {
                dataOption = "no";
              }

              if((dataOption==="" || dataOption===undefined) && states["options"]!==undefined){
                dataOption=states["options"];
              }

              this.components = this.stringObject1.data[dataOption];
              this.currentComponents = this.components;
            }
            break;
          }
          case "DR-S20":
            {
              if (states["optionFilters"] !== undefined) {
                let dataOption = "";
                if (this.drivenc === 'Screw (twin) Compressor') {
                  dataOption = "yesNoScrewTwin";
                }
                if (this.drivenc === 'Screw Compressor') {
                  dataOption = "yesNoBoth";
                }
                if (this.drivenc === 'Reciprocating Compressor' && this.crankintbrg!=='Not Specified') {
                  dataOption = "no";
                }
                if (this.drivenc === 'Reciprocating Compressor' && this.crankintbrg==='Not Specified') {
                  dataOption = "yes";
                }
                this.components = this.stringObject1.data[dataOption];
                this.currentComponents = this.components;
              }
              break;
            }
      default: {
        this.components = [];
        this.currentComponents = this.components;
        break;
      }
    }
  }
  decideControlVisibility(states: any, key: any) {
    //this.iscValue = 1;
    if (states["inputType"] !== undefined && states["inputType"] === 'speedChange') {
      this.isSpeedChangeControl = true;
    }
    else {
      this.isSpeedChangeControl = false;
    }

    if (states["inputType"] !== undefined && states["inputType"] === 'ratios' && states["optionFilters"] !== undefined) {
      this.isRatioControl = true;
      if (key == 'ISC==1') {
        this.iscValue = 1;
      }
      if (key == 'ISC==2') {
        this.iscValue = 2;
      }
      if (key == "ISC=='Multi'") {
        this.iscValue = 3;
      }
    }
    else {
      this.isRatioControl = false;
    }

    if (states["inputType"] !== undefined && states["inputType"] === 'text') {
      this.isDrivenComponentTextinput = true;
    }
    else {
      this.isDrivenComponentTextinput = false;
    }
  }
  constructSelectedDataToPush(key: any) {
    let constructedData = key.replace("==", ":").replace("'", "").replace("'", "");
    if (this.currentState === "B-S1") {
      constructedData = "speed:" + this.displayChangeBeltRatio;
    }
    if (this.currentState === "G-S16") {
      constructedData = "ratios :{R1=" + this.R1_1 + ":" + this.R1_2 + "}";
      if ((this.R2_1 !== "" && this.R2_2 !== "") && (this.R3_1 === "" || this.R3_2 === "")) {
        constructedData = "ratios :{R1=" + this.R1_1 + ":" + this.R1_2 + "}" + "{R2=" + this.R2_1 + ":" + this.R2_2 + "}";
      }
      if ((this.R2_1 === "" || this.R2_2 === "") && (this.R3_1 !== "" && this.R3_2 !== "")) {
        constructedData = "ratios :{R1=" + this.R1_1 + ":" + this.R1_2 + "}" + "{R3=" + this.R3_1 + ":" + this.R3_2 + "}";
      }
      if ((this.R2_1 !== "" && this.R2_2 !== "") && (this.R3_1 !== "" && this.R3_2 !== "")) {
        constructedData = "ratios :{R1=" + this.R1_1 + ":" + this.R1_2 + "}" + "{R2=" + this.R2_1 + ":" + this.R2_2 + "}" + "{R3=" + this.R3_1 + ":" + this.R3_2 + "}";
      }
    }
    if (this.currentState === "DR-S28") {
      constructedData = "vanes:" + this.drivenVanesEntered;
    }
    if (this.currentState === "DR-S29") {
      constructedData = "Driven_Threads:" + this.drivenVanesEntered;
    }
    if (this.currentState === "DR-S30") {
      constructedData = "teeth:" + this.drivenVanesEntered;
    }
    if (this.currentState === "DR-S31") {
      constructedData = "pistons:" + this.drivenVanesEntered;
    }
    if (this.currentState === "DR-S32") {
      constructedData = "input_lobes:" + this.drivenVanesEntered;
    }
    if (this.currentState === "DR-S36") {
      constructedData = "Idler_lobes:" + this.drivenVanesEntered;
    }
    if (this.currentState === "DR-S35") {
      constructedData = "Idler_threads:" + this.drivenVanesEntered;
    }
    if (this.currentState === "DR-S39") {
      constructedData = "propeller_blades:" + this.drivenVanesEntered;
    }
    return constructedData;
  }
  /* Start ratio change */
  public resetRatioControls() {
    this.R1_1 = "";
    this.R1_2 = "";
    this.R2_1 = "";
    this.R2_2 = "";
    this.R3_1 = "";
    this.R3_2 = "";
    this.errorRatioValueRequired = "";
  }
  /* End ratio change */

  /* Start Speed change dialog */
  public openPopUpForSpeedChange() {
    this.speedChangeTypeSelected = "Speed Reducer";
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "90%";
    dialogConfig.width = "60%";
    this.speedChangedialogRef = this.dialog.open(this.speedChangeDialog, dialogConfig);
    this.speedChangedialogRef.afterClosed().subscribe((result: any) => {
      let data = result;
    });
    this.speedChangeErrorMessage = '';
    this.speedChangeValue1 = 1;
    this.speedChangeValue2 = 1;
    this.speedChangeBeltRatio = 1;
    this.componentStateTitle = "Show Speed Widget";
  }
  onCancelSpeedChangeDialog() {
    this.speedChangedialogRef.close();
  }
  speedChangeRadioChange(event: any) {
    this.speedChangeTypeSelected = event.value;
    this.speedChangeValue1 = 1;
    this.speedChangeValue2 = 1;
    this.speedChangeBeltRatio = 1;
    this.displayChangeBeltRatio = "1:1";
    this.checkValidationsForSpeedChangeCirclevalues();
    this.validateSpeedChangeValues();
    if (this.speedChangeErrorMessage === "") {
      this.calculateSpeedChangeBeltRatio();
    }
  }
  onSaveSpeedChangeDialog() {
    this.checkValidationsForSpeedChangeCirclevalues();
    this.validateSpeedChangeValues();
    if (this.speedChangeErrorMessage === "") {
      this.componentStateTitle = "Speed ratio :" + " " + this.displayChangeBeltRatio;
      this.speedChangedialogRef.close();
    }
  }

  validateSpeedChangeValues() {
    if (this.speedChangeErrorMessage === "") {
      if (this.speedChangeValue1.toString() !== "" && this.speedChangeValue1.toString() !== "0" && this.speedChangeValue2.toString() !== "" && this.speedChangeValue2.toString() !== "0") {
        this.speedChangeErrorMessage = "";
      }
      else {
        this.speedChangeErrorMessage = "Enter all the values";
      }
    }
  }
  speedChangeValue(selectedValue: any) {
    this.checkValidationsForSpeedChangeCirclevalues();
    this.validateSpeedChangeValues();
    if (this.speedChangeErrorMessage === "") {
      this.calculateSpeedChangeBeltRatio();
    }
  }

  calculateSpeedChangeBeltRatio() {
    this.displayChangeBeltRatio = "";
    if (this.speedChangeValue1 > 0 && this.speedChangeValue2 > 0) {
      if (this.speedChangeTypeSelected === "Speed Increaser") {
        this.speedChangeBeltRatio = Number((this.speedChangeValue2 / this.speedChangeValue1).toFixed(3));
        this.displayChangeBeltRatio = "1:" + this.speedChangeBeltRatio;
      }
      if (this.speedChangeTypeSelected === "Speed Reducer") {
        this.speedChangeBeltRatio = Number((this.speedChangeValue1 / this.speedChangeValue2).toFixed(3));
        this.displayChangeBeltRatio = this.speedChangeBeltRatio + ":1";
      }
    }
  }
  checkValidationsForSpeedChangeCirclevalues() {
    this.speedChangeErrorMessage = "";
    if (this.speedChangeValue1 > 0 && this.speedChangeValue2 > 0) {
      if (this.speedChangeTypeSelected === "Speed Increaser") {
        if (this.speedChangeValue1 < this.speedChangeValue2) {
          this.speedChangeErrorMessage = "Value in second circle should be less than the value in first circle";
        }
      }
      if (this.speedChangeTypeSelected === "Speed Reducer") {
        if (this.speedChangeValue2 < this.speedChangeValue1) {
          this.speedChangeErrorMessage = "Value in first circle should be less than the value in second circle";
        }
      }
    }
  }
  /* End  Speed change dialog */
  addSelectedData(currentSelectedDataToPush: any) {
    this.selectedData.push(currentSelectedDataToPush);
    this.selectedDataToPrint = this.selectedData.toString();
  }
  selectDefaultItem() {
    if (this.currentComponents !== undefined && this.currentComponents.length > 0) {
      if (this.currentComponents[0].text !== undefined) {
        this.currentSelectedValue = this.currentComponents[0].text;
      }
      else {
        this.currentSelectedValue = this.currentComponents[0];
      }
    }
  }
  onBack() {
    if (this.selectedData.length > 0) {
      this.selectedData.pop();
      this.selectedDataToPrint = this.selectedData.toString();
    }
    this.removeCurrentStepComponentAndBack();
  }
  constructFinalKey(currentState: string, currentEAKey: string, key: string, currentSelectedValue: any) {
    let constructedKey = '';
    switch (currentState) {
      case "B-S1": {
        constructedKey = 'exit';
        break;
      }
      case "D-S2": {
        if (this.isPrimeMoverNotMonitored) {
          constructedKey = 'exit';
        }
        else if (!this.isPrimeMoverNotMonitored && (this.isBeltOrChainDrive || this.isCoupling || this.isGearbox || this.isDriven)) {
          constructedKey = 'exit';
        }
        else {
          constructedKey = key;
        }
        break;
      }
      case "D-S3": {
        if (key == "drive=='Unknown'") {
          constructedKey = 'exit';
        }
        break;
      }
      case "D-S9": {
        if (this.isPrimeMoverNotMonitored) {
          constructedKey = 'exit';
        }
        else if (!this.isPrimeMoverNotMonitored && (this.isBeltOrChainDrive || this.isCoupling || this.isGearbox || this.isDriven)) {
          constructedKey = 'exit';
        }
        else {
          constructedKey = key;
        }
        break;
      }
      case "D-S12": {
        if (key === "turbineTbrg=='No'" && this.isPrimeMoverNotMonitored) {
          constructedKey = 'exit';
        }
        else if (key === "turbineTbrg=='No'" && !this.isPrimeMoverNotMonitored && (this.isBeltOrChainDrive || this.isCoupling || this.isGearbox || this.isDriven)) {
          constructedKey = 'exit';
        }
        else if (key === "turbineTbrg=='Yes'") {
          constructedKey = key;
        }
        else {
          constructedKey = key;
        }
        break;
      }
      case "D-S14": {
        if (this.isPrimeMoverNotMonitored) {
          constructedKey = 'exit';
        }
        else if (!this.isPrimeMoverNotMonitored && (this.isBeltOrChainDrive || this.isCoupling || this.isGearbox || this.isDriven)) {
          constructedKey = 'exit';
        }
        else {
          constructedKey = key;
        }
        break;
      }
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
      case "D-S40": {
        if (key == "nonPrimeMovers=='Skip'") {
          if (this.selectedData.includes("component:Driven")) {
            constructedKey = "nonPrimeMovers=='Skip' && component=='Driven'";
          }
          if (this.selectedData.includes("component:Coupling")) {
            constructedKey = "nonPrimeMovers=='Skip' && component=='Coupling'";
          }
          if (this.selectedData.includes("component:Gearbox")) {
            constructedKey = "nonPrimeMovers=='Skip' && component=='Gearbox'";
          }
          if (this.selectedData.includes("component:Belt or Chain Drive")) {
            constructedKey = "nonPrimeMovers=='Skip' && component=='Belt or Chain Drive'";
          }
        }
        else if (key == "nonPrimeMovers=='Add'") {
          constructedKey = key;
        }
        else {
          constructedKey = 'exit';
        }
        break;
      }
      case "D-S46": {
        constructedKey = 'exit';
        break;
      }
      case "D-S54": {
        constructedKey = 'exit';
        break;
      }
      case "CCPL-S6": {
        if (this.closeCoupledSelectedValue == 'Motor' && key != "driven=='Compressor'") {
          constructedKey = "closeCoupled=='Motor' && " + key;
        }
        else if (this.closeCoupledSelectedValue == 'Motor' && key != "driven=='Compressor'") {
          constructedKey = "closeCoupled=='Turbine' && " + key;
        }
        else if (this.closeCoupledSelectedValue == 'Motor' && key == "driven=='Fan'") {
          constructedKey = "closeCoupled=='Motor' && " + key;
        }
        else if (this.closeCoupledSelectedValue == 'Turbine' && key == "driven=='Fan'") {
          constructedKey = "closeCoupled=='Turbine' && " + key;
        }
        else {
          constructedKey = key;
        }
        break;
      }
      case "G-S12": {
        if (this.nolValue === "1") {
          constructedKey = 'exit';
        }
        if (Number(this.nolValue) > 1) {
          constructedKey = 'NOL>1';
        }
        break;
      }
      case "G-S13": {
        if (this.nolValue === "1" || this.nolValue === "2") {
          constructedKey = 'exit';
        }
        if (Number(this.nolValue) > 2) {
          constructedKey = 'NOL>2';
        }
        break;
      }
      case "G-S14": {
        if ((this.nolValue === "1") || (this.nolValue === "2") || (this.nolValue === "3")) {
          constructedKey = 'exit';
        }
        if (Number(this.nolValue) > 3) {
          constructedKey = 'NOL>3';
        }
        break;
      }
      case "G-S15": {
        constructedKey = 'exit';
        break;
      }
      case "DR-S2": {
        if (this.drivenc === "Centrifugal Pump" || this.drivenc === "Sliding Vane Pump") {
          constructedKey = "drivenc=='Centrifugal Pump' || drivenc=='Sliding Vane Pump'";
        }
        if (this.drivenc === "Propeller Pump" || this.drivenc === "Rotary Thread Pump" || this.drivenc === "Gear Pump" || this.drivenc === "Screw Pump") {
          constructedKey = "drivenc=='Propeller Pump' || drivenc=='Rotary Thread Pump' || drivenc=='Gear Pump' || drivenc== 'Screw Pump'";
        }
        if (this.drivenc === "Axial Recip Pump" || this.drivenc === "Radial Recip Pump" ) {
          constructedKey = "drivenc=='Axial Recip Pump' || drivenc=='Radial Recip Pump'";
        }
        break;
      }
      case "DR-S10": {
        if (this.driven === "Generator") {
          constructedKey = "Driven=='Generator'";
        }
        if (this.not_monitored_driven === "Generator") {
          constructedKey = "not_monitored_driven=='Generator'";
        }
        if (this.driven === "Vacuum Pump" && this.drivenc=="Centrifugal Vacuum Pump" &&(this.drivenbrgs=="Journal bearings on main" || this.drivenbrgs=="Ball Bearings on main")) {
          constructedKey = "Driven=='Vacuum Pump' && drivenc=='Centrifugal Vacuum Pump' && (drivenbrgs=='Journal bearings on main' || drivenbrgs=='Ball Bearings on main')";
        }
        if((this.driven==="Vacuum Pump" || this.not_monitored_driven==="Vacuum Pump") && (this.drivenc==="Axial Recip Vacuum Pump" || this.drivenc==="Radial Recip Vacuum Pump" || (this.drivenc==='Centrifugal Vacuum Pump' && this.drivenbrgs!=="Journal bearings on main" && this.drivenbrgs!=="Ball Bearings on main"))){
          constructedKey="(Driven=='Vacuum Pump' || not_monitored_driven=='Vacuum Pump') && (drivenc=='Axial Recip Vacuum Pump' || drivenc=='Radial Recip Vacuum Pump' || (drivenc=='Centrifugal Vacuum Pump' && drivenbrgs!='Journal bearings on main' && drivenbrgs!='Ball Bearings on main'))";
        }
        if(this.driven==="Vacuum Pump" && this.drivenc==="Reciprocating Vacuum Pump"){
          constructedKey="Driven=='Vacuum Pump' && drivenc=='Reciprocating Vacuum Pump'"
        }
        if(this.driven==="Vacuum Pump" && this.drivenc==="Lobed Vacuum Pump"){
          constructedKey="Driven=='Vacuum Pump' && drivenc=='Lobed Vacuum Pump'";
        }
        if(this.not_monitored_driven==="Vacuum Pump" && this.drivenc==="Centrifugal Vacuum Pump" && (this.drivenbrgs==="Journal bearings on main" || this.drivenbrgs==="Ball Bearings on main")){
          constructedKey="not_monitored_driven=='Vacuum Pump' && drivenc=='Centrifugal Vacuum Pump' && (drivenbrgs=='Journal bearings on main' || drivenbrgs=='Ball Bearings on main')";
        }
        if(this.not_monitored_driven==="Vacuum Pump" && this.drivenc==="Reciprocating Vacuum Pump"){
          constructedKey="not_monitored_driven=='Vacuum Pump' && drivenc=='Reciprocating Vacuum Pump'";
        }
        if(this.not_monitored_driven==="Vacuum Pump" && this.drivenc==="Lobed Vacuum Pump"){
          constructedKey="not_monitored_driven=='Vacuum Pump' && drivenc=='Lobed Vacuum Pump'";
        }
        break;
      }
      case "DR-S12": {
        if (((this.driven === 'Pump') || (this.driven === 'Not Monitored')) && ((this.drivenc === "Centrifugal Pump") || (this.drivenc === "Axial Recip Pump") || (this.drivenc === "Radial Recip Pump"))) {
          constructedKey = "(Driven=='Pump' || Driven=='Not Monitored') && drivenc=='Centrifugal Pump' || drivenc=='Axial Recip Pump' || drivenc=='Radial Recip Pump'";
        }
        if (this.drivenc === "Propeller Pump") {
          constructedKey = "drivenc=='Propeller Pump'";
        }
        if (this.drivenc === "Sliding Vane Pump") {
          constructedKey = "drivenc=='Sliding Vane Pump'";
        }
        if ((this.driven === 'Not Monitored') && (this.drivenc === "Sliding Vane Pump")) {
          constructedKey = "Driven=='Not Monitored' && drivenc=='Sliding Vane Pump'";
        }
        if ((this.driven === 'Pump') && ((this.drivenc === "Rotary Thread Pump") || (this.drivenc === "Screw Pump"))) {
          constructedKey = "Driven=='Pump' && drivenc=='Rotary Thread Pump' || drivenc== 'Screw Pump'";
        }
        if ((this.not_monitored_driven === 'Pump') && ((this.drivenc === "Rotary Thread Pump") || (this.drivenc === "Screw Pump"))) {
          constructedKey = "not_monitored_driven=='Pump' && drivenc=='Rotary Thread Pump' || drivenc== 'Screw Pump'";
        }
        if (this.drivenc === "Gear Pump") {
          constructedKey = "drivenc=='Gear Pump'";
        }
        break;
      }
      case "DR-S13": {
        if ((this.driven === 'Not Monitored')) {
          constructedKey = "Driven=='Not Monitored'";
        }
        if ((this.drivenc !== 'Axial Recip Pump')) {
          constructedKey = "drivenc!='Axial Recip Pump'";
        }
        if ((this.driven === 'Vacuum Pump' || this.driven === 'Pump') && this.drivenc === "Axial Recip Pump" || this.drivenc === "Axial Recip Vacuum Pump" || this.drivenc === "Radial Recip Pump" || this.drivenc === "Radial Recip Vacuum Pump") {
          constructedKey = "(Driven=='Vacuum Pump' || Driven=='Pump') && drivenc=='Axial Recip Pump' || drivenc=='Axial Recip Vacuum Pump' || drivenc=='Radial Recip Pump' || drivenc=='Radial Recip Vacuum Pump'";
        }
        if ((this.not_monitored_driven === 'Vacuum Pump' || this.not_monitored_driven === 'Pump') && this.drivenc === "Axial Recip Pump" || this.drivenc === "Axial Recip Vacuum Pump" || this.drivenc === "Radial Recip Pump" || this.drivenc === "Radial Recip Vacuum Pump") {
          if(constructedKey===""){
          constructedKey = "(not_monitored_driven=='Vacuum Pump' || not_monitored_driven=='Pump') && drivenc=='Axial Recip Pump' || drivenc=='Axial Recip Vacuum Pump' || drivenc=='Radial Recip Pump' || drivenc=='Radial Recip Vacuum Pump'";
          }
        }
        break;
      }
      case "DR-S14":
        {
          let val = currentEAKey + "==" + currentSelectedValue;
          if (val === "Driven_locations==1") {
            constructedKey = 'Driven_locations==1';
          }
          else if (val !== "Driven_locations==1") {
            constructedKey = 'exit';
          }

          break;
        }
        case "DR-S16": {
          if (this.drivenc==="Centrifugal Compressor") {
            constructedKey = "drivenc=='Centrifugal Compressor'";
          }
          if (this.drivenc=="Centrifugal Vacuum Pump") {
            constructedKey = "drivenc=='Centrifugal Vacuum Pump'";
          }
          break;
        }
        case "DR-S19": {
          if (this.driven === 'Pump'  || this.not_monitored_driven === 'Pump'  ) {
            constructedKey = "Driven=='Pump' || not_monitored_driven=='Pump'";
          }
          if (this.drivenc === 'Axial Recip Vacuum Pump'  || this.drivenc === 'Radial Recip Vacuum Pump'  ) {
            constructedKey = "drivenc=='Axial Recip Vacuum Pump' || drivenc=='Radial Recip Vacuum Pump'";
          }
          break;
        }
        case "DR-S20": {
          if (this.drivenc === 'Centrifugal Compressor'  && this.Impelleronmain === 'Yes'  ) {
            constructedKey = "drivenc=='Centrifugal Compressor' && Impelleronmain == 'Yes'";
          }
          if (this.drivenc === 'Centrifugal Compressor'  && this.Impelleronmain !== 'Yes'  ) {
            constructedKey = "drivenc=='Centrifugal Compressor' && Impelleronmain != 'Yes'";
          }
          if (this.not_monitored_driven==='Compressor' && this.drivenc === 'Centrifugal Compressor'  && this.Impelleronmain !== 'Yes'  ) {
            constructedKey = "not_monitored_driven=='Compressor' && drivenc=='Centrifugal Compressor' && Impelleronmain != 'Yes'";
          }
          if ( this.driven === 'Compressor'  && this.drivenc === 'Reciprocating Compressor'  ) {
            constructedKey = "Driven=='Compressor' && drivenc=='Reciprocating Compressor'";
          }
          if ( this.not_monitored_driven === 'Compressor'  && this.drivenc === 'Reciprocating Compressor'  ) {
            constructedKey = "not_monitored_driven=='Compressor' && drivenc=='Reciprocating Compressor'";
          }
          if ((this.driven === 'Compressor')  && (this.drivenc === 'Screw Compressor' || this.drivenc==='Screw (twin) Compressor')) {
            constructedKey = "(Driven=='Compressor') && (drivenc=='Screw Compressor' || drivenc=='Screw (twin) Compressor')";
          }
          if ((this.not_monitored_driven === 'Compressor')  && (this.drivenc === 'Screw Compressor' || this.drivenc==='Screw (twin) Compressor')) {
            constructedKey = "(not_monitored_driven=='Compressor')  && (drivenc=='Screw Compressor' || drivenc=='Screw (twin) Compressor')";
          }
          break;
        }
      case "DR-S23": {
        constructedKey = 'exit';
        break;
      }
      case "DR-S29": {
        if (this.driven === 'Pump'  && this.drivenc !== "Screw Pump" ) {
          constructedKey = "Driven=='Pump' && drivenc!= 'Screw Pump'";
        }
        if (this.not_monitored_driven === 'Pump'  && this.drivenc !== "Screw Pump" ) {
          constructedKey = "not_monitored_driven=='Pump' && drivenc!= 'Screw Pump'";
        }
        if ((this.driven === 'Pump'  || this.driven === "Compressor") &&(this.drivenc==="Screw Pump" ||this.drivenc==="Screw Compressor"|| this.drivenc==="Screw (twin) Compressor")) {
          constructedKey = "(Driven=='Pump' || Driven=='Compressor') && drivenc== 'Screw Pump' || drivenc=='Screw Compressor' || drivenc=='Screw (twin) Compressor'";
        }
        break;
      }
      case "DR-S45": {
        if (this.driven === 'Pump'  && this.drivenc !== "Screw Pump" ) {
          constructedKey = "Driven=='Pump' && drivenc!= 'Screw Pump'";
        }
        if (this.not_monitored_driven === 'Pump'  && this.drivenc !== "Screw Pump" ) {
          constructedKey = "not_monitored_driven=='Pump' && drivenc!= 'Screw Pump'";
        }
        if ((this.driven === 'Pump'  || this.driven === "Compressor") &&(this.drivenc==="Screw Pump" ||this.drivenc==="Screw Compressor"|| this.drivenc==="Screw (twin) Compressor'")) {
          constructedKey = "(Driven=='Pump' || Driven=='Compressor') && drivenc== 'Screw Pump' || drivenc=='Screw Compressor' || drivenc=='Screw (twin) Compressor'";
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
