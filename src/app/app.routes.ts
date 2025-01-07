import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'ToDoList',
        loadComponent: () => import('./modules/to-do-list/pages/list/list.component')
        .then(p => p.ListComponent)
    }
];
