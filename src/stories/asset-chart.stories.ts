// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { NgModule } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { AssetChartDataComponent } from 'src/app/components/asset-chart-data/asset-chart-data.component';
import AssetChart from './asset-chart.component';
import Button from './button.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Asset Chart',
  component: AssetChart,
  // More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
    decorators:[
      moduleMetadata({
        declarations:[AssetChart],
      })
    ]
  },
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<AssetChart> = (args: AssetChart) => ({
  props: args,
});

// export const Primary = Template.bind({});
// // More on args: https://storybook.js.org/docs/angular/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

