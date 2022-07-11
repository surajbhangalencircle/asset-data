import { NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Route, Router } from '@angular/router';
import { fromEventPattern } from 'rxjs';
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
  values: number[] = [];
  dates: Array<any> = [];
  response: Response = new Response;
  temp1: Array<any> = [];
  val1: number[] = [];
  nodeId: number = 5;

  lineChartOptions: any;
  lineChartLabels: any;
  lineChartType: any;
  lineChartLegend: any;
  lineChartData: any;

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
    })
  }

  toggle() {
    this.collapse = !this.collapse
  }

  selectAsset(id: number, name: string) {
    this.nodeId = id;
    // console.log(this.nodeId);

    this.responseData.forEach(element => {
      if (element.assetId == this.nodeId) {
        this.dates = new Array();
        this.values = [];
        for (const [key, value] of Object.entries(element.measurements)) {
          const e = this.datePipe.transform(key, 'LLL-yy');
          this.dates.push(e);
          this.values.push(value);
        }
      } else if (1 == this.nodeId) {
        if (element.assetId == 2) {
          this.dates = new Array();
          // console.log('Test=>2');
          for (const [key, value] of Object.entries(element.measurements)) {
            const e = this.datePipe.transform(key, 'LLL-yy');
            this.dates.push(e);
            this.val1.push(value);
          }
        }
        else if (element.assetId == 4) {
          this.values = [];
          // console.log('Test=>4');
          for (const [key, value] of Object.entries(element.measurements)) {

            const e = this.datePipe.transform(key, 'LLL-yy');
            for (var i = 0; i < this.val1.length - 1; i++) {
              this.values.push(this.val1[i] + value);
              // console.log(this.values);        
            }
          }
        }
      } else if (3 == this.nodeId) {
        if (element.assetId == 4) {
          this.dates = new Array();
          this.values = [];
          for (const [key, value] of Object.entries(element.measurements)) {
            const e = this.datePipe.transform(key, 'LLL-yy');
            this.dates.push(e);
            this.values.push(value);
          }
        }
      }

      this.lineChartOptions = {
        scaleShowVerticalLines: true,
        responsive: true,
      };
      this.lineChartLabels = this.dates;
      this.lineChartType = 'line';
      this.lineChartLegend = true;
      this.lineChartData = [
        { data: this.values, label: name, borderColor: '#87CEEB', pointRadius: 0 },
      ];
    });
  }

}
