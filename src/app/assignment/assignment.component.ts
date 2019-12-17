import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentService } from './assignment.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  selectedAssignment: Assignment;

  constructor() { }

  ngOnInit() {
  }

}
