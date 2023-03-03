import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchregions'
})
export class SearchregionsPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
    transform(value: any, searchregions: string, searchsubregions:string): any {

      if (value && value.length) {
        return value.filter(item => {
          if (searchregions && item.region_name.toLowerCase().indexOf(searchregions.toLowerCase()) === -1) {
            return false;
          }
          if (searchsubregions && item.subregion_name.toLowerCase().indexOf(searchsubregions.toLowerCase()) === -1) {
            return false;
          }
          return true;
        })
      }
      else {
        return value;
      }

    /*if(!value)return null;
    if(!args)return value;

    args = args.toLowerCase();

    return value.filter(function(item){
        return JSON.stringify(item).toLowerCase().includes(args);
    });*/
}

}