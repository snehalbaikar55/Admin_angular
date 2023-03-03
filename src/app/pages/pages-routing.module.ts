import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

import { AdduserComponent } from './adduser/adduser.component';

import { ManageusersComponent } from './manageusers/manageusers.component';

import { ManageleadsComponent } from './manageleads/manageleads.component';

import { ManagelogsComponent } from './managelogs/managelogs.component';

import { ManagepropertiesComponent } from './manageproperties/manageproperties.component';

import { AddpropertyComponent } from './addproperty/addproperty.component';

import { AdddeveloperComponent } from './adddeveloper/adddeveloper.component';

import { ManagedeveloperComponent } from './managedeveloper/managedeveloper.component';
import { AddDataComponent } from './add-data/add-data.component';
import { EditusersComponent } from './editusers/editusers.component';
import { EditdeveloperComponent } from './editdeveloper/editdeveloper.component';
import { GalleryimagesComponent } from './properties/galleryimages/galleryimages.component';
import { NearbyLocationComponent } from './properties/nearby-location/nearby-location.component';
import { LeadsComponent } from './properties/leads/leads.component';
import { LogsComponent } from './properties/logs/logs.component';
import { EditTextareasComponent } from './properties/edit-textareas/edit-textareas.component';
import { TextAreasDetailsComponent } from './properties/text-areas-details/text-areas-details.component';
import { ImagesComponent } from './images/images.component';
import { RegionComponent } from './Region/region/region.component';
import { SubRegionComponent } from './Region/sub-region/sub-region.component';
import { ManageRegionComponent } from './Region/manage-region/manage-region.component';
import { ManageSubregionComponent } from './Region/manage-subregion/manage-subregion.component';
import { EditregionComponent } from './Region/editregion/editregion.component';
import { EditsubregionComponent } from './Region/editsubregion/editsubregion.component';
import { DevelopersPropertyComponent } from './settings/developers-property/developers-property.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'adduser', component: AdduserComponent
  },
  {
    path: 'images/:id', component: ImagesComponent
  },
  {
    path: 'manageusers', component: ManageusersComponent
  },
  {
    path: 'nearby-location', component: NearbyLocationComponent
  },
  {
    path: 'manageleads', component: ManageleadsComponent
  },
  {
    path: 'managelogs', component: ManagelogsComponent
  },
  {
    path: 'manageproperties', component: ManagepropertiesComponent
  },
  {
    path: 'addproperty', component: AddpropertyComponent
  },

  {
    path: 'adddeveloper', component: AdddeveloperComponent
  },

  {
    path: 'managedeveloper', component: ManagedeveloperComponent
  },
  {
    path: 'edit/:id', component: TextAreasDetailsComponent
  },
  {
    path: 'add-data', component: AddDataComponent
  },
  {
    path: 'addData/:id', component: AddDataComponent
  },
  {
    path: 'EditUsers/:id', component: EditusersComponent
  },
  {
    path: 'leads/:id', component: LeadsComponent
  },
  {
    path: 'EditUsers/:id', component: EditusersComponent
  },
  {
    path: 'logs/:id', component: LogsComponent
  },
  {
    path: 'EditTextAreas/:id', component: EditTextareasComponent
  },
  {
    path: 'adddeveloper', component: AdddeveloperComponent
  },
  
  {
    path: 'managedeveloper', component: ManagedeveloperComponent
  },
  {
    path: 'editdeveloper/:id', component: EditdeveloperComponent
  },
  {
    path: 'image', component: GalleryimagesComponent
  },
  {
    path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
  },
  {
    path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule)
  },
  {
    path: 'ui', loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule)
  },
  {
    path: 'extended', loadChildren: () => import('./extended/extended.module').then(m => m.ExtendedModule)
  },
  {
    path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule)
  },
  {
    path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'chart', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule)
  },
  {
    path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
  },
  {
    path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule)
  },
  {
    path: 'region', component: RegionComponent
  },
  {
    path: 'editsubregion/:id', component: EditsubregionComponent
  },
  {
    path: 'manage_region', component: ManageRegionComponent
  },
  {
    path: 'sub_region', component: SubRegionComponent
  },
  {
    path: 'manage_sub_region', component: ManageSubregionComponent
  },
  {
    path: 'editregion/:id', component: EditregionComponent
  },
  {
    path: 'devproperty', component: DevelopersPropertyComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
