import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartData } from './chartdata';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  url: string = '/assets/data/charts-data.json';

  constructor(private http: HttpClient) { }

  getChartData(): Observable<ChartData[]> {
    return this.http.get<ChartData[]>(this.url);
  }
}
