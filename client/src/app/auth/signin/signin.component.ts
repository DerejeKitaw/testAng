import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'pv-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    console.log('---onSignin---');
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signinUser(email, password);
    // .subscribe(
    //   (data) => {
    //     console.log(data);
    //   }, (error: any) => {
    //     console.log(error);

    //     // (this.errorMessage = <any>error)
    //   }
    // );
  }
  // getProjects(): void {
  //   this._projectService.getProjects().subscribe((projects: IProject[]) => {
  //     this.projects = this.performSearch(projects);
  //     this.filteredProjects = this.performFilter(this.listFilter);
  //   }, (error: any) => (this.errorMessage = <any>error));
  // }
}
