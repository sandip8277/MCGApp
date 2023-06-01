import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LogoutComponent } from './logout/logout.component';
@NgModule({
  declarations: [
    TopBarComponent,
    LogoutComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedRoutingModule
  ],
  exports:[TopBarComponent,LogoutComponent]
})
export class SharedModule { }
