import { Pipe, PipeTransform, TemplateRef } from '@angular/core';
import { Assignment } from './assignment.model';

@Pipe({
  name: 'assignmentsFilterPipe'
})
export class AssignmentsFilterPipe implements PipeTransform {
  
  transform(assignments: Assignment[], term: string): any {
    let filteredArray: Assignment[] = [];
  
    if(term && term.length > 0) { 

    filteredArray = assignments.filter((assignment: Assignment) => assignment.name.toLowerCase().includes(term.toLowerCase())
    );
    }
    return filteredArray.length > 0 ? filteredArray : assignments;
    }

  }
