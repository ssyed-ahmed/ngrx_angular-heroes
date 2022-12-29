import { Component, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/hero.service';
import { ParamMap } from '@angular/router';
import { CommunicationService } from '../communication.service';
import { Chart } from 'chart.js';
import { select, Store } from '@ngrx/store';
import { Hero } from '../store/hero';
import { getHeroById } from '../store/app.selector';

@Component({
  selector: 'app-hero-detail-crimessolved-stats',
  templateUrl: './hero-detail-crimessolved-stats.component.html',
  styleUrls: ['./hero-detail-crimessolved-stats.component.scss']
})
export class HeroDetailCrimessolvedStatsComponent implements AfterViewInit {

  hero: Hero;
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  chartData = [];
  lineChart = [];
  pieChart = [];
  pieColors = ['Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Black', 'brown', 'aqua', 'gray', 'crimson', 'violet'];
  canvas: any;
  ctx: any;
  
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private communicationService: CommunicationService,
    private store: Store,
  ) {
    this.route.parent.params.subscribe(params => {
      let id = parseInt(params.id);
      this.store.pipe(
        select(getHeroById(id))
      ).subscribe(hero => {
        this.hero = hero;
        this.drawLineChart();
        this.drawPieChart();
      });
    })
  }

  ngAfterViewInit() {
    
  }

  goBack(): void {
    this.communicationService.sendMessage('go back');
  }

  drawLineChart(): void {
    this.chartData = this.hero.stats.crimesSolvedStats.lineData;
    this.lineChart = new Chart('lineCanvas', {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [
          {
            data: this.chartData,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'Crimes solved'
        },
        legend: {
          display: false
        },
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 30,
            borderColor: 'red',
            borderWidth: 4,
            label: {
              enabled: false,
              content: 'Test label'
            }
          }]
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    });
  }

  drawPieChart(): void {
    const max = 30;
    let pieArray = this.chartData.map((currentValue) => {
      let percentage = currentValue / max * 100;
      percentage = parseFloat(percentage.toFixed(2));
      return percentage;
    });

    this.pieChart = new Chart('pieCanvas', {
      type: 'doughnut',
      data: {
        datasets: [
          {
            data: pieArray,
            backgroundColor: this.pieColors
          }
        ],
        labels: this.months
      },
      options: {
        title: {
          display: true,
          text: 'Crimes solved % per month'
        },
        legend: {
          display: false
        }
      }
    })
  }

}
