import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../components/asset-chart-data/response';

@Injectable({
  providedIn: 'root'
})
export class AssetDataService {

  constructor(private httpClient: HttpClient) { }

  getDataOfMeasurements():Observable<Response[]>{
    return this.httpClient.get<Response[]>('assets/measurements.json');
  }
  getTreeNode():Observable<any>{
    return this.httpClient.get('assets/assets.json');
  }
  // getAssetById(id:number):Observable<any>{
  //   return this.httpClient.get('http://localhost:3000/measurement/' + id)
  // }
}
