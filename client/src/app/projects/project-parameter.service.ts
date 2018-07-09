import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectParameterService {
  filterBy = '';
  displayPosters = false;
  constructor() { }
}
