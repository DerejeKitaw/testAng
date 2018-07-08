import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsModule } from './projects/projects.module';
import { ShellComponent } from './home/shell/shell.component';
import { WelcomeComponent } from './home/welcome/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ProjectsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }