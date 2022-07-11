import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../components/asset-chart-data/response';

@Injectable({
  providedIn: 'root'
})
export class AssetDataService {

  constructor(private httpClient: HttpClient) { }

  getData():Observable<Response[]>{
    return this.httpClient.get<Response[]>('assets/measurements.json');
  }
  getTreeNode(){
    return this.httpClient.get('assets/assets.json');
  }
}
