import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Asset } from '../components/asset';
import { Measurement } from '../model/measurements.model';


@Injectable({
  providedIn: 'root'
})
export class AssetDataService {

  constructor(private httpClient: HttpClient) { }

  getDataOfMeasurements():Observable<any>{
    return this.httpClient.get<Measurement[]>('assets/measurements.json');
  }
  getTreeNode():Observable<any>{
    return this.httpClient.get<Asset[]>('assets/assets.json');
  }
}
