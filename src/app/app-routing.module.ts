import { AdminModule } from './core/admin/admin.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'site',
    pathMatch: 'full'
  },
  {
    path: 'site',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./core/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'agent',
    loadChildren: () => import('./core/agent/agent.module').then(m => m.AgentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

