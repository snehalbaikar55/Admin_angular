import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getusers(data: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/users', data)
  }

  getusersdetails() {
    return this.httpClient.get('http://127.0.0.1:8000/api/users');
  }

  addproperty(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblproperty', data);

  }

  getProperties() {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblproperty');
  }

  deleteProperty(ID: any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblproperty/' + ID);
  }

  getProppertiesD(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblproperty/' + ID);
  }

  addrera(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblrera', data)
  }

  addToPropertyDetails(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblpropertydetails', data)
  }
  getProppertiesDetails(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblpropertydetails/' + ID);

  }

  /* get sub regions from database */
  getSubRegions(region_id : any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/getRegionsOfSubregion/' + region_id);
  }

  addDeveloper(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tbldeveloper', data);
  }

  checkDeveloper(data: string | number) {
    return this.httpClient.get('http://127.0.0.1:8000/api/developerMatch/' + data);
  }

  /* tpo get unique developers name list */
  getDistDeveloper() {
    return this.httpClient.get('http://127.0.0.1:8000/api/distDeveloper');
  }

  /* get Developers Properties */
  getDeveloperProperty(Developer : string) {
    return this.httpClient.get('http://127.0.0.1:8000/api/allDeveloperMatchs/'+Developer);
  }

  deleteDeveloper(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tbldeveloper/' + ID);
  }
  getDeveloper() {
    return this.httpClient.get('http://127.0.0.1:8000/api/tbldeveloper');
  }
  TotalDeveloperCount() {
    return this.httpClient.get('http://127.0.0.1:8000/api/developerCount');
  }
  editDeveloperData(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tbldeveloper/' + ID, data);
  }
  getDeveloperbyid(ID: string | number) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tbldeveloper/' + ID);
  }

  addprice(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblpricing', data);
  }

  getprice(ID: string | number) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblpricing/'+ID);

  }
  getPriceList(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblpricing/'+ID);

  }

  updatepricedetails(ID: string | number, data: any) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblpricing/'+ID,data);
  }

  deletePrice(ID: any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblpricing/'+ID);
  }

  getRera(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblrera/' +ID);
  }
  deleteRera(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblrera/'+ID);
  }
  editRera(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblrera/'+ID,data);
  }

  addlocationurl(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblurl', data)
  }

  getUrl(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblurl/'+ID);

  }
  editlocationurl(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblurl/'+ID,data);
  }

  deletelocationurl(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblurl/' +ID);
  }
  getkeywords(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblkeywords/'+ID);
  }

  addkeywords(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblkeywords', data);
  }

  deleteseo(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblkeywords/' +ID);
  }

  updateseok(ID: string | number, data: string | number) {
    return this.httpClient.put('http://127.0.0.1:8000/api/tblkeywords/'+ID,data);
  }

  getgimages(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblgalleryimages/'+ID);
  }
  deleteImage(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblgalleryimages/'+ID);
  }
  editimages(ID: any, data: any) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblgalleryimages/'+ID,data);
  }
  getLogo(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tbllogos/'+ID);
  }
  deleteLogo(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tbllogos/'+ID);
  }
  getFavIcon(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblfavicon/'+ID);
  }
  deleteFavicon(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblfavicon/' +ID);
  }
  getFeaturedImg(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblfeaturedimages/' +ID);
  }
  deleteFeaturedImg(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblfeaturedimages/' +ID);
  }
  addForm_info(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblform',data);
  }
  getFormInfodetails(ID: string | number) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblform/' +ID);
  }
  updateFormInfo(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblform/' +ID,data);
  }
  deleteFormInfo(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblform/' +ID);
  }
  addYoutube_url(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblyoutubeurl',data);
  }
  getYouTubedetails(ID: string | number) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblyoutubeurl/'+ID);
  }
  updateYouTubeUrl(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblyoutubeurl/'+ID,data);
  }
  deleteYouTubeUrl(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblyoutubeurl/'+ID);
  }
  addNearbyLocation(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblnearbylocation',data);
  }
  getNearbyLocation(ID: string | number) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblnearbylocation/'+ID);
  }
  updateNearbyLoc(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblnearbylocation/' +ID,data);
  }
  deleteNearbyloc(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblnearbylocation/'+ID);
  }
  addChangeColor(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblpropertydetails',data);
  }
  getColour(ID: string | number) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblpropertydetails/' +ID);
  }
  updateChangeColor(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblpropertydetails/'+ID,data);
  }
  getLogosByID(ID: string | number) {
    return this.httpClient.get('http://127.0.0.1:8000/api/userslog/'+ID);
  }
  getLeadByID(ID: string | number) {
    return this.httpClient.get('http://127.0.0.1:8000/api/leads/'+ID);
  }
  addTextAreas(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblpropertydetails',data);
  }
  getTextAreaByID(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblpropertydetails/'+ID);
  }
  deleteTextArea(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblpropertydetails/'+ID);
  }
  updateTextAreas(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblpropertydetails/'+ID,data);
  }

  gettextareabyid(ID: string | number) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblpropertydetails/' +ID);
  }
  edittextData(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblpropertydetails/' +ID,data);
  }
  getLeadData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/leads');
  }
  getLogsData() {
    return this.httpClient.get('http://127.0.0.1:8000/api/userslog');
  }
  getextracode(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblextracode/'+ID);
  }
  addextracode(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblextracode',data);
  }
  editextracode(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblextracode/'+ID,data);
  } 
  addfloorplans(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblfloorplans',data);
  }
  getfloorplansimg(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblfloorplans/'+ID);
  }
  deletefloorplan(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblfloorplans/'+ID);
  }
  editfloorplan(ID: string | number, data: string | number) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblfloorplans/'+ID,data);
  } 
  getamenities(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblaminities/'+ID);
  }
  addamenities(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblaminities',data);
  }
  editamenitiesStatus(ID: string | number, data: any) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblaminities/' +ID,data);
  }
  deleteamenities(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/tblaminities/'+ID);
  }
  getProfile(ID: string | number) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/users/'+ID);
  }
  getuserslist(user_id: any){
    return this.httpClient.get('http://127.0.0.1:8000/api/users/'+user_id);
  
  }
  addLogs(data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/userslog', data)
  }
  TotalLeadCount() {
    return this.httpClient.get('http://127.0.0.1:8000/api/leadCount');
  }
  TodayLeadCount() {
    return this.httpClient.get('http://127.0.0.1:8000/api/getTodayLead');
  }
  TotalPropertyCount() {
    return this.httpClient.get('http://127.0.0.1:8000/api/propertyCount');
  }
  FormInfoData(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblform/'+ID);
  }
  DomainActiveCount() {
    return this.httpClient.get('http://127.0.0.1:8000/api/DomainActiveCount');
  }
  DomainDeactiveCount() {
    return this.httpClient.get('http://127.0.0.1:8000/api/DomainDeactiveCount');
  }
  editforminfo(ID: string | number, data: any) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/tblform/' +ID,data);
  }

  /* api key to change property activate and deactivate */
  // activeDeactivateProp(ID: string | number, data: any) {
  //   return this.httpClient.post('http://127.0.0.1:8000/api/tblpropertystatus/' +ID,data);
  // }
  activeDeactivateProp(ID: string | number, data: any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/tblpropertystatus/' +ID,data);
  }

  getdomain() {
    return this.httpClient.get('http://127.0.0.1:8000/api/tblform');
  }

  /* get regions list */
  getRegions() {
    return this.httpClient.get('http://127.0.0.1:8000/api/regions');
  }

  /* get specific region */
  getOneRegion(ID: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/regions/' + ID);
  }

  /* update region data */
  getUpdateRegion(region_id : string | number, data : any) {
    return this.httpClient.patch('http://127.0.0.1:8000/api/regions/' + region_id,data);
  }

  /* add region data */
  registerRegions(data : any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/regions',data);
  }

  /* delete Region data */
  deleteRegions(region_id : any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/regions/'+region_id);
  }

  /* fetch sub-region data */
  getSubregions() {
    return this.httpClient.get('http://127.0.0.1:8000/api/getSubRegions');
  }

  /* Delete sub-region */
  deleteSubregions(subregion_id : any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/getSubRegions/'+subregion_id);
  }

  /* add sub-region */
  registerSubregions(data : any) {
    return this.httpClient.post('http://127.0.0.1:8000/api/getSubRegions',data);
  }

  /* fetch region data */
  getRegionslist(){
    return this.httpClient.get('http://127.0.0.1:8000/api/regions');
  }

  /* get Sub-region for update */
  getOneSubregions(subregion_id : any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/getSubRegions/'+subregion_id);
  }

  /* update sub-region data */
  updateSubregions(subregion_id : any,data: any){
    return this.httpClient.patch('http://127.0.0.1:8000/api/getSubRegions/'+subregion_id,data);
  }

}