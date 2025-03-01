import { DatePipe } from '@angular/common';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexLegend,
  ApexTooltip,
  ApexFill,
  ApexResponsive
} from "ng-apexcharts";
import { from, groupBy, mergeMap, reduce, toArray } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  toolTip: ApexTooltip,
  fill: ApexFill,
  responsive?: ApexResponsive[]
};

@Component({
  selector: 'apex-chart-core',
  templateUrl: './apex-chart-core.component.html',
  styleUrls: ['./apex-chart-core.component.scss']
})
export class ApexChartCoreComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;

  toolTip: ApexTooltip;

  private __chartDT = [];

  get chartDT() {
    return this.__chartDT
  }
  @Input() set chartDT(value) {
    this.__chartDT = value
    this.series = value.length > 0 ? value : [];
    this.initChartData();
  }

  responsive:ApexResponsive[]

  fill: ApexFill = {
    type: ['gradient', 'solid', 'solid'],
    colors: ['#4338CA', '#e20808'],
    gradient: {

      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100]
    }
  }
  series: ApexAxisChartSeries = [];
  chart_dtls: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke = {
    curve: ['straight', 'smooth', 'monotoneCubic', 'stepline'],
    width: [2, 2],
    colors: ['#4338CA', '#e20808']
  };
  dataLabels: ApexDataLabels = {
    style: {
      fontSize: '20'
    }
  };
  markers: ApexMarkers = {
    // size:1,
    colors: ['#4338CA','#e20808'],
  };
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid = {
    show: false
  };
  legend: ApexLegend = {
    fontFamily:'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
    fontSize:'10',
    fontWeight:600,
    position: 'bottom',
    labels: {
      colors: ['#4338CA', '#e20808'],
      useSeriesColors: false,
    },
    markers: {
      fillColors: ['#4338CA', '#e20808']
    },
    itemMargin: {
      horizontal: 10,
      vertical: 5
    }
  };
  title: ApexTitleSubtitle;
  constructor() { }
  ngOnInit(): void {
  }

  public initChartData(): void {
    this.chart_dtls = {
      width:'100%',
      type: "line",
      stacked: false,
      height: 350,
      toolbar: {
        show: false,
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.title = {
      text: "",
      align: "center"
    };
    this.yaxis = {
      crosshairs:{
        show:true,
      },
      labels:{
        style:{
          colors:'gray',
          fontSize:'10',
          fontWeight:600,
          fontFamily:'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
        }
      },
      title: {
        text: "",
        style:{
          fontSize:'15',
          fontWeight:600,
          fontFamily:'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'

        }
      },
    };
    this.xaxis = {
      axisTicks:{
        show:true
      },
      crosshairs:{
        show:true,
      },
      type: "datetime",
      labels: {  
        format: 'HH:mm',
        datetimeUTC: false,
        style:{
          colors:'gray',
          fontSize:'10',
          fontWeight:600,
          fontFamily:'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
        
        }
      },
      tooltip:{
        style:{
          fontFamily:'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji',
          fontSize:'10'
        }
      }
    };
    this.toolTip = {
      style:{
        fontSize:'8',
        fontFamily:'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji'
      },
      marker: {
        fillColors: ['#4338CA', '#e20808']
      },
      fixed: {
        enabled: false,
        position: 'topRight'
      },
      x: {
        show: true,
        format: 'dd/MM/yyyy HH:mm'
      },
      onDatasetHover: {
        highlightDataSeries: true
      }
    }
  }

}