import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeAsset } from '../model/treeAsset.model';
import { Measurement } from '../model/measurements.model';


/**
 *
 *
 * @export
 * @class AssetDataService
 */
@Injectable({
  providedIn: 'root'
})
export class AssetDataService {

  url = "http://localhost:3000/measurement/"
  constructor(private httpClient: HttpClient) { }

  /**
   *
   * @return {*}  {Observable<any>}
   * @method for measurement
   */
  getDataOfMeasurements():Observable<any>{
    return this.httpClient.get<Measurement[]>('assets/measurements.json');
  }
  /**
   *
   * @return {*}  {Observable<any>}
   * @method for asset
   */
  getTreeNode():Observable<any>{
    return this.httpClient.get<TreeAsset[]>('assets/assets.json');
  }
 
  /**
   *
   *
   * @param {*} id
   * @return {*}  {Observable<any>}
   * @memberof AssetDataService
   */
  getMeasurementByID(id:any):Observable<any>{
    return this.httpClient.get(this.url + id);
  }
}
