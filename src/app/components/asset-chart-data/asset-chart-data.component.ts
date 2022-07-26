import { NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AssetDataService } from 'src/app/services/asset-data.service';
import { CounterDecrement, CounterIncrement, CounterReset, currentAsset, loadAssets, loadMeasurements } from 'src/app/state/asset-chart.actions';
import { getAssets, getMeasurements, } from 'src/app/state/asset-chart.selectors';
import { State } from 'src/app/store/index';


interface treeNode {
  name: string;
  id: number;
  parentId: any;
  children?: treeNode[];
}


@Component({
  selector: 'app-asset-chart-data',
  templateUrl: './asset-chart-data.component.html',
  styleUrls: ['./asset-chart-data.component.css']
})
export class AssetChartDataComponent implements OnInit {


  treeData: treeNode[] = [];
  collapse: boolean = true;
  activeNode = '';
  responseData: any[] = [];
  responseData1: any[] = [];
  values: any[] = [];
  keys: Array<any> = [];
  nodeId: number = 8;
  nodeName: string = '';
  result: any = [];
  dates: any = [];
  assetNodes: any[] = [];
  total: Observable<number> | undefined;

  lineChartOptions: any;
  lineChartLabels: any;
  lineChartType: any;
  lineChartLegend: any;
  lineChartData: any = [];
  measurementsData: any;

  data: any;
  treeControl = new NestedTreeControl<treeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<treeNode>();

  constructor(private assetData: AssetDataService, private datePipe: DatePipe, private store: Store<State>) {
  }

  hasChild = (a: number, node: treeNode) => {
    return !!node.children && node.children.length > 0;
  };

  /**
   *
   * @memberof AssetChartDataComponent
   * @dispatch actions for asset & measurement
   * 
   */
  ngOnInit(): void {    
    this.store.dispatch(loadMeasurements());
    this.store.select(getMeasurements).subscribe((data: any) => {
        this.responseData1 = Object.entries(data);
        let res = JSON.parse(JSON.stringify(this.responseData1));
        this.responseData = (res[1][1]);
      });

    this.store.dispatch(loadAssets());
    this.store.select(getAssets).pipe(
      map((res => res))).subscribe(data => {
        this.assetNodes = data
        this.dataSource.data = this.dynamicTree(this.assetNodes);
      });

      this.total = this.store.select('counter');
  }

  toggle() {
    this.collapse = !this.collapse;
  }

  
  /**
   *
   * @param {*} node
   * @return {*}  {*}
   * @memberof AssetChartDataComponent
   */
  computeData(node: any): any {
    if (node.children.length === 0) {
      // console.log(this.responseData[0]['measurements'])
      this.measurementsData = this.responseData[node.id]
      let dateTemp: any = [];
      let valueTemp: any = [];
      Object.entries(this.measurementsData?.measurements).forEach(([keys, value]) => {
        if (this.dates.length === 0) {
          dateTemp.push(this.datePipe.transform(keys, 'MMM yy'));
        }
        valueTemp.push(value);
      });
      if (dateTemp.length != 0) {
        this.dates = dateTemp;
      }
      return valueTemp;
    }
    else {
      let tempSum: any = [];
      for (let child of node.children) {
        const values = this.computeData(child);
        if (tempSum.length === 0) {
          tempSum = values;
        } else {
          values.map((value: any, index: number) => {
            tempSum[index] = tempSum[index] + value;
          });
        }
      }
      return tempSum;
    }
  }

  selectAsset(node: any) {
    this.nodeId = node.id;
    this.nodeName = node.name;
    this.result = this.computeData(node);
    this.store.dispatch(currentAsset());
    this.lineChartOptions = {
      scales: {
        x: {
          grid: {
            display: true
          }
        },
      },
      // scaleShowVerticalLines: false,
      responsive: true,
    };

    this.lineChartLabels = this.dates;
    this.lineChartType = 'line';
    this.lineChartLegend = false;
    this.lineChartData = [{ data: this.result, label: name, borderColor: '#87CEEB', pointRadius: 0 }]
  }

  /**
   *
   * @param {*} treeData1
   * @return {*}  {treeNode[]}
   * @memberof AssetChartDataComponent
   */
  dynamicTree(treeData1: any): treeNode[] {
    let treeData: any = JSON.parse(JSON.stringify(treeData1));
    const map: any = {};
    treeData.forEach((res: any) => map[res.id] = res);
    const assetTree: any[] = [];
    treeData.forEach((data: any) => {
      data['children'] = [];
      if (data.parentId !== null) {
        map[data.parentId].children = map[data.parentId]?.children || [];
        map[data.parentId].children.push(map[data.id]);
      } else {
        assetTree.push(map[data.id]);
      }
    });

    return assetTree;
  };

  /**
   *
   * @dispatched actions for counter
   */
  increment() {
    this.store.dispatch(new CounterIncrement());
  }

  decrement() {
    this.store.dispatch(new CounterDecrement());
  }

  reset() {
    this.store.dispatch(new CounterReset());
  }


}
