import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';


interface treeNode {
  name: string;
  children?: treeNode[];
}


const TREE_DATA: treeNode[] = [
  {
    name: 'Asset 0',
  },
  {
    name: 'Asset 01',
    children: [{ name: 'Asset 02' },
    {
      name: 'Asset 03',
      children: [
        {
          name: 'Asset 04',
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

  treeControl = new NestedTreeControl<treeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<treeNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
    console.log(this.dataSource);
  }

  hasChild = (a: number, node: treeNode) => {
    return !!node.children && node.children.length > 0;
  };


  ngOnInit(): void {
  }
  toggle(){
    this.collapse= !this.collapse
  }

}
