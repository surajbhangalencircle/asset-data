import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetChartDataComponent } from './asset-chart-data.component';

describe('AssetChartDataComponent', () => {
  let component: AssetChartDataComponent;
  let fixture: ComponentFixture<AssetChartDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssetChartDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetChartDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
