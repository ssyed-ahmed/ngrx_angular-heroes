import { Component, OnInit } from '@angular/core';
import { ChartData } from '../chartdata';
import { Chart } from 'chart.js';
import { HeroService } from '../hero.service';
import { select, Store } from '@ngrx/store';
import { selectAllHeroes } from '../store/app.reducer';
import { Hero } from '../store/hero';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  title: string = 'Statistics';
  data: ChartData[];
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  colors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Black', 'brown', 'aqua', 'gray', 'crimson', 'violet'];
  barChart: [{}];

  constructor(
    private heroService: HeroService,
    private store: Store,
  ) { }

  ngOnInit() {
    this.loadChart();
  }

  loadChart(): void {
    let chartsData = [];
    let index = 0;
    this.store.pipe(
      select(selectAllHeroes),
    ).subscribe((heroes: Hero[]) => {
        heroes.forEach((hero: Hero) => {
          if (hero.stats.crimesSolvedStats) {
            let statsData = hero.stats.crimesSolvedStats.lineData;
            let chartObj = {
              label: hero.name,
              data: statsData,
              // backgroundColor: this.colors[index++]
              backgroundColor: this.getRandomColor()
            }         
            chartsData.push(chartObj);
          }          
        })

        this.drawBarChart(chartsData);
      })
  }

  getRandomColor(): string {
    let color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' 
      + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    return color;
  }

  drawBarChart(chartsData): void {
    this.barChart = new Chart('barCanvas', {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: chartsData
      },
      options: {
        title: {
          display: true,
          text: 'Crimes solved per month by each hero'
        },
        animation: {
          duration: 10,
        },
        tooltips: {
          mode: 'label',
          callbacks: {
            label: function(tooltipItem, data) { 
              return data.datasets[tooltipItem.datasetIndex].label + ": " + tooltipItem.yLabel;
            }
          }
        },
        scales: {
          xAxes: [{ 
            stacked: true, 
            gridLines: { display: false },
            }],
          yAxes: [{ 
            stacked: true, 
            ticks: {
              callback: function(value) { return value; },
              }, 
            }],
        },
        legend: {display: false}
      }
    });
  }
}