import { Component, OnInit, Input, OnChanges, TemplateRef, ViewChild } from '@angular/core';
//import * as ComponentsJson from '../../assets/JSON_Files/component_picker_Final_JSON_2.json';
import * as ComponentsJson_1 from '../../assets/JSON_Files/prime_mover_without_location_1.json';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { componentsdetailsModel } from '../models/componentsdetails.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /* Start alert dialog */
  alertdialogRef: any;
  @ViewChild('alertDialog') alertDialog = {} as TemplateRef<string>;
  /* End alert dialog */
  panelOpenState = false;
  panelDataDetails: string[] = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th"];
  panelData: any[] = [];
  public initialPanelValue: string;
  public intialPanelNumber: number = 0;
  stringJson1: any;
  stringObject1: any;
  components: any;

  constructor(public dialog: MatDialog) {
    this.initialPanelValue = this.panelDataDetails[0];
    this.intialPanelNumber = -1;
    componentsdetailsModel: [];
  }
  ngOnInit(): void {

  }

  addPanel(intialPanelNumber: number) {
    this.intialPanelNumber = this.intialPanelNumber + 1;
    this.initialPanelValue = this.panelDataDetails[this.intialPanelNumber];
    if (this.intialPanelNumber <= 9) {
      this.panelData.push({
        componentValue: this.initialPanelValue,
        value: this.intialPanelNumber,
        content: ''
      });
    }
  }

  removePanel(intialPanelNumber: number) {
    // this.panelData=[];
    // this.intialPanelNumber=-1;
    this.openPopUpForAlert();
  }
  onNext(value: any) {
  }

  cancel() {
    this.alertdialogRef.close();
  }
  Yes() {
    this.panelData = [];
    this.intialPanelNumber = -1;
    this.alertdialogRef.close();
  }
  public openPopUpForAlert() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "40%";
    dialogConfig.width = "60%";
    this.alertdialogRef = this.dialog.open(this.alertDialog, dialogConfig);
    this.alertdialogRef.afterClosed().subscribe((result: any) => {
      let data = result;
    });
  }
}
