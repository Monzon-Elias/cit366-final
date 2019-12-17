import { Component, OnInit, OnDestroy } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css']
})

export class AssignmentListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  assignments: Assignment[] = [];
  term: string;

  constructor(private assignmentService: AssignmentService) { }

  ngOnInit() {
    this.assignmentService.getAssignments();
    this.subscription = this.assignmentService.assignmentListChanged.subscribe(
      (assignmentsList: Assignment[]) => {
        this.assignments = assignmentsList;
      }
    );
  }

  onKeyPress(value: string) {
    this.term = value;
}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
