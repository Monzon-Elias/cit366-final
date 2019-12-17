import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';

import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentEditComponent } from './assignment/assignment-edit/assignment-edit.component';
import { AssignmentDetailComponent } from './assignment/assignment-detail/assignment-detail.component';
import { AssignmentItemComponent } from './assignment/assignment-item/assignment-item.component';
import { AssignmentsFilterPipe } from './assignment/assignments-filter.pipe';
import { AssignmentListComponent } from './assignment/assignment-list/assignment-list.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    AssignmentComponent,
    AssignmentEditComponent,
    AssignmentDetailComponent,
    AssignmentItemComponent,
    AssignmentListComponent,
    AssignmentsFilterPipe,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
