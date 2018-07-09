import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ProjectEditComponent } from './project-edit.component';

@Injectable()
export class ProjectEditGuard implements CanDeactivate<ProjectEditComponent> {

    canDeactivate(component: ProjectEditComponent): boolean {
        if (component.isDirty) {
            const title = component.project.customerName || 'New Project';
            return confirm(`Navigate away and lose all changes to ${title}?`);
        }
        return true;
    }
}
