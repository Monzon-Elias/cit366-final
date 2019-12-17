import { Injectable } from '@angular/core';
import { Assignment } from './assignment.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class AssignmentService {

  private assignments: Assignment[]=[];
  assignmentListChanged = new Subject<Assignment[]>();

  constructor(private http: HttpClient) {}

  //este bicho sustituye código que está alfinal de varios métodos
  sortAndSend() {
    this.assignments.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    this.assignmentListChanged.next(this.assignments.slice());
}

  getAssignments() {
    this.http
    .get<{ message: string, assignments: Assignment[] }>('http://localhost:3000/assignments/')
    .subscribe(
       (assignmentData) => {
          this.assignments = assignmentData.assignments;
          this.sortAndSend();
       }, 
       (err: any) => {console.log(err);
       });
  }

  getAssignment(id: string): Assignment {
    for(const assignment of this.assignments) {
      if(assignment.id === id) {
        return assignment;
      }
    }
    return null;
  }

  addAssignment(assignment: Assignment) {
    if(!assignment) {
    return;
    }

    //make sure id of the new document is empty
    assignment.id = '';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    //add to database
    this.http.post<{ message: string, assignment: Assignment}>('http://localhost:3000/assignments/'
    ,assignment
    ,{headers: headers})
      .subscribe(
        (responseData) => {
          //add new document to documents
          this.assignments.push(responseData.assignment);
          this.sortAndSend();
        });
  }

  updateAssignment(originalAssignment: Assignment, newAssignment: Assignment) {
    if(!originalAssignment || !newAssignment) {
      return;
    }

    const pos = this.assignments.findIndex(d => d.id === originalAssignment.id);
    if(pos < 0 ){ //original document not in list
      return;
    }
    //set the id of the new Document to the id of the old Document
    newAssignment.id = originalAssignment.id;
    newAssignment._id = originalAssignment._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.put('http://localhost:3000/assignments/' + originalAssignment.id
    , newAssignment
    , {headers: headers})
      .subscribe(
        (response: Response) => {
          this.assignments[pos] = newAssignment;
          this.sortAndSend();
        });
  }

  deleteAssignment(assignment: Assignment) {

    if(!assignment) {
      return;
    }

    const pos = this.assignments.findIndex(d => d.id === assignment.id);

    if(pos < 0) {
      return;
    }

    this.http.delete('http://localhost:3000/assignments/' + assignment.id)
      .subscribe(
        (response: Response) => {
          this.assignments.splice(pos,1);
          this.sortAndSend();
        });
  }

}

