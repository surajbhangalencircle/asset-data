import { NestedTreeControl } from '@angular/cdk/tree';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Route, Router } from '@angular/router';
import { AssetDataService } from 'src/app/services/asset-data.service';


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
    id: '01',
    children: [{ name: 'Asset 02', id: '02' },
    {
      name: 'Asset 03',
      id: '03',
      children: [
        {
          name: 'Asset 04',
          id: '04'
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

  collapse: boolean= true;
  responseData: any=[]
  dataSet: any;
  dates: any []=[];


  nodeId='';
  
  treeControl = new NestedTreeControl<treeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<treeNode>();

  constructor(private assetData: AssetDataService, private datePipe: DatePipe ) {
    this.dataSource.data = TREE_DATA;
    console.log(this.dataSource);
  }

  hasChild = (a: number, node: treeNode) => {
    return !!node.children && node.children.length > 0;
  };


  ngOnInit(): void {
    this.assetData.getData().subscribe(res=> this.responseData= { data: res});
    this.dataSet = Object.entries(this.responseData.data).map((val:any)=>{ return val[this.nodeId].measurements})
       Object.keys(this.dataSet[this.nodeId]).forEach((element :any) => {
           this.dates.push(this.datePipe.transform(element, 'MMM yy'))
      });
  }

  toggle(){
    this.collapse= !this.collapse
  }

  selectAsset(id:string){
    this.nodeId= id;
  }

}
