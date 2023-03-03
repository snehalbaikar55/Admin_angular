import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CountToModule } from 'angular-count-to';
import { NgbActiveModal, NgbDropdownModule, NgbModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { LightboxModule } from 'ngx-lightbox';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SharedModule } from '../shared/shared.module';
import { WidgetModule } from '../shared/widget/widget.module';
import { AppsModule } from './apps/apps.module';
import { ExtraspagesModule } from './extraspages/extraspages.module';
import { ComponentsModule } from './components/components.module';
import { ExtendedModule } from './extended/extended.module';
import { FormModule } from './form/form.module';
import { TablesModule } from './tables/tables.module';
import { ChartModule } from './chart/chart.module';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';

import { ManageleadsComponent } from './manageleads/manageleads.component';
import { ManagelogsComponent } from './managelogs/managelogs.component';
import { ManagepropertiesComponent } from './manageproperties/manageproperties.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { AdddeveloperComponent } from './adddeveloper/adddeveloper.component';
import { ManagedeveloperComponent } from './managedeveloper/managedeveloper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDataComponent } from './add-data/add-data.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { EditusersComponent } from './editusers/editusers.component';
import { EditdeveloperComponent } from './editdeveloper/editdeveloper.component';
import { LayoutsModule } from '../layouts/layouts.module';
import { LayoutComponent } from '../layouts/layout.component';
import { AddPricingComponent } from './properties/add-pricing/add-pricing.component';
import { AgmCoreModule } from '@agm/core';
import { SeokeywordsComponent } from './properties/seokeywords/seokeywords.component';
import { GalleryimagesComponent } from './properties/galleryimages/galleryimages.component';
import { AddLogoComponent } from './properties/add-logo/add-logo.component';
import { AddFaviconComponent } from './properties/add-favicon/add-favicon.component';
import { FeaturedimageComponent } from './properties/featuredimage/featuredimage.component';
import { NearbyLocationComponent } from './properties/nearby-location/nearby-location.component';
import { ChangeColorComponent } from './properties/change-color/change-color.component';
import { FormInfoComponent } from './properties/form-info/form-info.component';
import { LeadsComponent } from './properties/leads/leads.component';
import { LogsComponent } from './properties/logs/logs.component';
import { EditTextareasComponent } from './properties/edit-textareas/edit-textareas.component';
import { YoutubeurlComponent } from './properties/youtubeurl/youtubeurl.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ExtracodesComponent } from './properties/extracodes/extracodes.component';
import { FloorplansComponent } from './properties/floorplans/floorplans.component';
import { AmenitiesComponent } from './properties/amenities/amenities.component';
import { CommericialAmmenitiesComponent } from './properties/commericial-ammenities/commericial-ammenities.component';
import { TextAreasDetailsComponent } from './properties/text-areas-details/text-areas-details.component';
import { ReraComponent } from './properties/rera/rera.component';
import { LocationurlComponent } from './properties/location-url/location-url.component';
import { AdduserComponent } from './adduser/adduser.component';
import { ImagesComponent } from './images/images.component';
import { RegionComponent } from './Region/region/region.component';
import { SubRegionComponent } from './Region/sub-region/sub-region.component';
import { ManageRegionComponent } from './Region/manage-region/manage-region.component';
import { ManageSubregionComponent } from './Region/manage-subregion/manage-subregion.component';
import { EditsubregionComponent } from './Region/editsubregion/editsubregion.component';
import { EditregionComponent } from './Region/editregion/editregion.component';
import { SearchregionsPipe } from './Region/manage-subregion/searchregions.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { DevelopersPropertyComponent } from './settings/developers-property/developers-property.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    DashboardComponent,
    ManageusersComponent,
    ManageleadsComponent,
    ManagelogsComponent,
    ManagepropertiesComponent,
    AddpropertyComponent,
    AdddeveloperComponent,
    ManagedeveloperComponent,
    AddDataComponent,
    EditusersComponent,
    EditdeveloperComponent,
    AddPricingComponent,
    SeokeywordsComponent,
    GalleryimagesComponent,
    AddLogoComponent,
    AddFaviconComponent,
    FeaturedimageComponent,
    NearbyLocationComponent,
    ChangeColorComponent,
    FormInfoComponent,
    LeadsComponent,
    LogsComponent,
    YoutubeurlComponent,
    ExtracodesComponent,
    FloorplansComponent,
    AmenitiesComponent,
    CommericialAmmenitiesComponent,
    TextAreasDetailsComponent,
    EditTextareasComponent,
    ReraComponent,
    LocationurlComponent,
    AdduserComponent,
    ImagesComponent,
    RegionComponent,
    SubRegionComponent,
    ManageRegionComponent,
    ManageSubregionComponent,
    EditsubregionComponent,
    EditregionComponent,
    SearchregionsPipe,
    DevelopersPropertyComponent
  ],
  imports: [
    CommonModule,
    WidgetModule,
    CountToModule,
    SharedModule,
    NgApexchartsModule,
    PagesRoutingModule,
    SimplebarAngularModule,
    CarouselModule,
    FeatherModule.pick(allIcons),
    RouterModule,
    NgbDropdownModule,
    NgbNavModule,
    AppsModule,
    ExtraspagesModule,
    ComponentsModule,
    ExtendedModule,
    LightboxModule,
    FormModule,
    TablesModule,
    ChartModule,
    LeafletModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    Ng2OrderModule,
    NgSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBjhC3xHvTciX4G-XTa454mwyC3fDDzeuI'
    }),
    NgbModule,
    CarouselModule
    

  ],

  providers: [
    NgbActiveModal
]
})
export class PagesModule { 
  
}
