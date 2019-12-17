import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-assignment-edit',
  templateUrl: './assignment-edit.component.html',
  styleUrls: ['./assignment-edit.component.css']
})
export class AssignmentEditComponent implements OnInit {

  id: string;
  originalAssignment: Assignment;
  assignment: Assignment = null;
  editMode: boolean = false;

  constructor(private assignmentService: AssignmentService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        
        if(this.id === undefined || this.id === null) {
          this.editMode = false;
          return;
        }
        
        this.originalAssignment = this.assignmentService.getAssignment(this.id);

        if(this.originalAssignment === undefined || this.originalAssignment === null) {
          return;
        }
        this.editMode = true;
        this.assignment = JSON.parse(JSON.stringify(this.originalAssignment));

      });
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const newAssignment = new Assignment(
      '',
      values['id'], 
      values.name, 
      values.course_name, 
      values.due_date, 
      values.done, 
      values.alive,
      values.points,
      values.desc,
      values.personal_notes,
      );

    if(this.editMode === true) {
      this.assignmentService.updateAssignment(this.originalAssignment, newAssignment);
      } else {
        this.assignmentService.addAssignment(newAssignment);
      }
      this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  isInvalidAssignment(newAssignment: Assignment) {
    if(!newAssignment) {
      return true;
    }
    if(newAssignment.id === this.assignment.id) {
      return true;
    }
    return false;
  }

}
