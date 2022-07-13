import { NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { elementAt } from 'rxjs';
import { AssetDataService } from 'src/app/services/asset-data.service';
import { Asset } from '../asset';
import { Response } from './response';


interface treeNode {
  name: string;
  id: number;
  parentId: any;
  children?: treeNode[];
}


let treeData: treeNode[] = [
  {
    name: 'Asset 0',
    id: 0,
    parentId: null,
    children: []
  },
  {
    name: 'Asset 1',
    id: 1,
    parentId: null,
    children: [{
      name: 'Asset 2',
      id: 2,
      parentId: 1,
      children: []
    },
    {
      name: 'Asset 3',
      id: 3,
      parentId: 1,
      children: [
        {
          name: 'Asset 4',
          id: 4,
          parentId: 3,
          children: [
          ]
        },
      ],
    },
    ],
  },
]
@Component({
  selector: 'app-asset-chart-data',
  templateUrl: './asset-chart-data.component.html',
  styleUrls: ['./asset-chart-data.component.css']
})
export class AssetChartDataComponent implements OnInit {

  collapse: boolean = true;
  activeNode = '';
  responseData: Response[] = [];
  values: number[] = [];
  keys: Array<any> = [];
  // response: Response = new Response;
  temp1: Array<any> = [];
  val1: number[] = [];
  nodeId: number = 5;
  nodeName: string = '';
  treeNodeData: any = [];
  result: any = [];


  lineChartOptions: any;
  lineChartLabels: any;
  lineChartType: any;
  lineChartLegend: any;
  lineChartData: any = [];

  data: any;
  treeControl = new NestedTreeControl<treeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<treeNode>();

  constructor(private assetData: AssetDataService, private datePipe: DatePipe) {
    this.dataSource.data = treeData;
    console.log(this.dataSource);
  }

  hasChild = (a: number, node: treeNode) => {
    return !!node.children && node.children.length > 0;
  };

  ngOnInit(): void {
    // this.assetData.getData().subscribe(res => {
    //   this.responseData = res;

    //   this.assetData.getTreeNode().subscribe(data => this.treeNodeData = data);
    // })
  }

  toggle() {
    this.collapse = !this.collapse
  }

  computeData(node: any) {
    if (node.children.length === 0) {
      console.log('leaf node: ', node.name);
      this.assetData.getAssetById(node.id).subscribe(res => {
        // this.result.push(res);
        this.addAssetData(res);
        console.log(res);
      });
    }
    else {
      for (let child of node.children) {
       this.computeData(child);
      }
    }
  }

  private addAssetData(res: any) {
    let da: any = [];
    let keys: any = [];
    let val2: any = [];
    //  this.da.forEach((element:any)=>{
    for (const [key, value] of Object.entries(res.measurements)) {
      const e = this.datePipe.transform(key, 'LLL-yy');
      keys.push(e);
      val2.push(value);
    }

    //  } )
    this.displayChart(keys, val2)
    // console.log(val2);
    // console.log(keys)
  }

  displayChart(keys: any, val2: any) {
    console.log('Binding data');
    // console.log(keys);
    // console.log(val2);
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

    this.lineChartLabels = keys;
    this.lineChartType = 'line';
    this.lineChartLegend = false;
    this.lineChartData = [{ data: val2, label: name, borderColor: '#87CEEB', pointRadius: 0 }]
  }


  selectAsset(node: any) {
    this.nodeId = node.id;
    this.nodeName = node.name;
    // console.log(this.nodeName);
    // console.log(parentId);
    // this.result = [];
    this.computeData(node);
    // console.log(JSON.stringify(this.result));
    // setTimeout(() => {
    //   console.log(JSON.stringify(this.result))
    // }, 2000);
    // console.log(this.treeNodeData);




  }

}
