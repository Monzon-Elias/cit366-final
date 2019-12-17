import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentService } from '../assignment.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css']
})
export class AssignmentDetailComponent implements OnInit {
  
  assignment: Assignment;
  id: string;
  
  constructor(
    private assignmentService: AssignmentService,
    private route: ActivatedRoute,
    private router: Router) {}

    ngOnInit() {
      this.route.params
      .subscribe(
          (params: Params) => {
            this.id = params['id'];
            this.assignment = this.assignmentService.getAssignment(this.id);
          });
    }

    onDelete() {
      if (confirm(`Are you sure you want to delete ${this.assignment.name} from your assignments?`)) {
      this.assignmentService.deleteAssignment(this.assignment)
      this.router.navigateByUrl('/assignments', {relativeTo: this.route})
    }
  }
}
