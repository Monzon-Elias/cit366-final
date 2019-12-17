import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentComponent } from './assignment/assignment.component';
import { AssignmentEditComponent } from './assignment/assignment-edit/assignment-edit.component';
import { AssignmentDetailComponent } from './assignment/assignment-detail/assignment-detail.component';

const routes: Routes = [
  {path: 'assignments', component: AssignmentComponent,
    children: 
    [
        {path: 'new', component: AssignmentEditComponent}, 
        {path: ':id', component: AssignmentDetailComponent},
        {path: ':id/edit', component: AssignmentEditComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
