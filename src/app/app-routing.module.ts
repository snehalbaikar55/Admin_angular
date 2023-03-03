import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout.component';
import { AfetrloginService } from './service/afetrlogin.service';
import { BeforeLoginService } from './service/before-login.service';
import { LoginComponent } from './account/login/login.component';
import { AuthGuard } from './guards/auth.guard';




const routes: Routes = [
  { path: '', redirectTo : 'account/login', component: LayoutComponent, pathMatch :'full', canActivate :[AuthGuard] 
  },
  { path: '', component: LayoutComponent,
   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AfetrloginService] 
  },
  { path: 'pages', 
  loadChildren: () => import('./extrapages/extrapages.module').then(m => m.ExtrapagesModule), 
  canActivate: [AfetrloginService] 
},
  { path: 'account', 
  loadChildren: () => import('./account/account.module').then(m => m.AccountModule) ,
  canActivate: [AuthGuard] 
} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
