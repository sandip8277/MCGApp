import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LogoutComponent } from './logout/logout.component';
import { FirstJsonComponentComponent } from './components/first-json-component/first-json-component.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SecondJsonComponentComponent } from './components/second-json-component/second-json-component.component';
import {MatRadioModule} from '@angular/material/radio';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    TopBarComponent,
    LogoutComponent,
    FirstJsonComponentComponent,
    SecondJsonComponentComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedRoutingModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatDialogModule
  ],
  exports:[TopBarComponent,LogoutComponent,FirstJsonComponentComponent,SecondJsonComponentComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class SharedModule { }
