import { AnimationFactory } from '@angular/animations';
import { NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { AssetDataService } from 'src/app/services/asset-data.service';
import { Response } from './response';


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


  treeData: treeNode[] = [
    // {
    //   name: 'Asset 0',
    //   id: 0,
    //   parentId: null,
    //   children: []
    // },
    // {
    //   name: 'Asset 1',
    //   id: 1,
    //   parentId: null,
    //   children: [{
    //     name: 'Asset 2',
    //     id: 2,
    //     parentId: 1,
    //     children: []
    //   },
    //   {
    //     name: 'Asset 3',
    //     id: 3,
    //     parentId: 1,
    //     children: [
    //       {
    //         name: 'Asset 4',
    //         id: 4,
    //         parentId: 3,
    //         children: [
    //         ]
    //       },
    //       {
    //         name: 'Asset 5',
    //         id: 5,
    //         parentId: 4,
    //         children: [

    //         ],
    //       },
    //     ],
    //   },
    //   ],
    // },
  ]

  collapse: boolean = true;
  activeNode = '';
  responseData: Response[] = [];
  values: any[] = [];
  keys: Array<any> = [];
  nodeId: number = 8;
  nodeName: string = '';
  result: any = [];
  dates: any = [];
  assetNodes: any = [];



  lineChartOptions: any;
  lineChartLabels: any;
  lineChartType: any;
  lineChartLegend: any;
  lineChartData: any = [];

  data: any;
  treeControl = new NestedTreeControl<treeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<treeNode>();

  constructor(private assetData: AssetDataService, private datePipe: DatePipe) {

  }

  hasChild = (a: number, node: treeNode) => {
    return !!node.children && node.children.length > 0;
  };

  ngOnInit(): void {
    this.assetData.getData().subscribe(res => {
      this.responseData = res;
      // console.log(this.responseData);
    });
    this.assetData.getTreeNode().subscribe(resp => {
      this.assetNodes = resp;
      this.dataSource.data = this.dynamicTree(this.assetNodes);
      console.log(this.dataSource);
    })
  }

  toggle() {
    this.collapse = !this.collapse
  }

  computeData(node: any): any {
    if (node.children.length === 0) {
      const measurementsData = this.responseData.find((element: any) => element.assetId == node.id)
      let dateTemp: any = [];
      let valueTemp: any = [];
      Object.entries(measurementsData?.measurements).forEach(([keys, value]) => {
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
    // console.log(this.nodeName);
    // console.log(parentId);
    // this.result = [];
    this.result = this.computeData(node);
    // console.log(JSON.stringify(this.result));
    // console.log(this.dates);
    console.log(this.dates);
    console.log(this.result);

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

  dynamicTree(treeData: any): treeNode[] {
    const map: any = {};
    treeData.forEach((res: any) => map[res.id] = res);
    const assetTree: any[] = [];
    treeData.forEach((data: any) => {
      data['children'] = [];
      console.log(treeData)
      if (data.parentId !== null) {
        map[data.parentId].children = map[data.parentId]?.children || [];
        map[data.parentId].children.push(map[data.id]);
      } else {
        assetTree.push(map[data.id]);
      }
    });

    return assetTree;
  };


}
