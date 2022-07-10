import { NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Route, Router } from '@angular/router';
import { AssetDataService } from 'src/app/services/asset-data.service';
import { Response } from './response';


interface treeNode {
  name: string;
  id: string;
  children?: treeNode[];
}


const TREE_DATA: treeNode[] = [
  {
    name: 'Asset 0',
    id: '0'
  },
  {
    name: 'Asset 01',
    id: '1',
    children: [{ name: 'Asset 02', id: '2' },
    {
      name: 'Asset 03',
      id: '3',
      children: [
        {
          name: 'Asset 04',
          id: '4'
        },
      ],
    },],
  },
]
@Component({
  selector: 'app-asset-chart-data',
  templateUrl: './asset-chart-data.component.html',
  styleUrls: ['./asset-chart-data.component.css']
})
export class AssetChartDataComponent implements OnInit {

  collapse: boolean = true;
  responseData: Response[] = [];
  dataSet: any;
  dates: any[] = [];
  val: number[] = [];
  temp: Array<any> = [];
  response: Response = new Response;


  nodeId: number = 0;
  // chartData: any;
  // chartLabels : any;
  // chartOptions : any;


  barChartOptions: any;
  barChartLabels: any;
  barChartType: any;
  barChartLegend: any;
  barChartData: any;



  data: any;
  treeControl = new NestedTreeControl<treeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<treeNode>();

  constructor(private assetData: AssetDataService, private datePipe: DatePipe) {
    this.dataSource.data = TREE_DATA;
    console.log(this.dataSource);
  }

  hasChild = (a: number, node: treeNode) => {
    return !!node.children && node.children.length > 0;
  };



  ngOnInit(): void {
    this.assetData.getData().subscribe(res => {
      this.responseData = res;
      // console.log(this.responseData[this.nodeId]);
      //  this.dataSet = (this.responseData).map((val:any)=> {return val[this.nodeId]})
      // console.log(this.dataSet);

    })
  }

  toggle() {
    this.collapse = !this.collapse
  }

  selectAsset(id: number, name: string) {
    this.nodeId = id;

    // console.log(this.nodeId);
    // console.log(this.responseData)

    this.responseData.forEach(element => {
      if (element.assetId == this.nodeId) {

        this.temp = new Array();
        this.val = [];
        for (const [key, value] of Object.entries(element.measurements)) {

          const e = this.datePipe.transform(key, 'LLL-yy');
          // console.log(e);

          this.temp.push(e);
          this.val.push(value);
        }
      } 




      this.barChartOptions = {
        scaleShowVerticalLines: true,
        responsive: true
      };
      this.barChartLabels = this.temp;
      this.barChartType = 'line';
      this.barChartLegend = false;
      this.barChartData = [
        { data: this.val, label: name, borderColor: '#87CEEB', pointRadius: 0 }
      ];

    });

  }

}
