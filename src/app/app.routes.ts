import { Routes } from '@angular/router';
import { SharedFolderComponent } from './components/shared-folder/shared-folder.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { PersonalComponent } from './components/personal/personal.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PublicLinksComponent } from './components/public-links/public-links.component';

export const routes: Routes = [
    {   path: '', 
        component: LoginComponent,
    },
    {   path: '', 
        component: BaseLayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent  },
            { path: 'shared', component: SharedFolderComponent },
            { path: 'personal', component: PersonalComponent },
            { path: 'public-links', component: PublicLinksComponent },
            { path: '**', redirectTo: '' }
        ]
    },
    { path: '**', redirectTo: '' }
];
