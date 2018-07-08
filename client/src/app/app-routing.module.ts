import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './home/shell/shell.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';
import { ProjectsModule } from './projects/projects.module';
import { ProjectListComponent } from './projects/project-list/project-list.component';

// export function loadProjectsModule() { return ProjectsModule; }

export function _projectModuleLoader() {
    return ProjectsModule;
 }

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
        { path: 'welcome', component: WelcomeComponent },
        // {
        //     path: 'projects',
        //     // canActivate: [AuthGuard],
        //     // loadChildren: 'src/app/projects/projects.module#ProjectsModule'
        //     loadChildren: _projectModuleLoader
        //     // loadChildren: () => ProjectsModule
        // },
        {
            path: 'projects',
            // canActivate: [AuthGuard],
            // component: ProjectListComponent
            // loadChildren: 'src/app/projects/projects.module#ProjectsModule'
            loadChildren: _projectModuleLoader
            // loadChildren: () => ProjectsModule
        },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ]
},
{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
