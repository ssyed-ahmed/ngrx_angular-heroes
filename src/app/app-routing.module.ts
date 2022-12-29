import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from 'src/app/hero-detail/hero-detail.component';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { HeroDetailGeneralComponent } from 'src/app/hero-detail-general/hero-detail-general.component';
import { HeroDetailStatsComponent } from 'src/app/hero-detail-stats/hero-detail-stats.component';
import { HeroDetailCrimessolvedStatsComponent } from 'src/app/hero-detail-crimessolved-stats/hero-detail-crimessolved-stats.component';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  { 
    path: 'dashboard',
    component: DashboardComponent,
  },
  { 
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
  },
  // { path: 'heroes/:id/:fromState', component: HeroDetailComponent },
  {
    path: 'heroes/:id/:fromState',
    component: HeroDetailComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full'},
      {
        path: 'overview',
        component: HeroDetailGeneralComponent
      },
      {
        path: 'statistics',
        component: HeroDetailStatsComponent
      },
      {
        path: 'crimessolved',
        component: HeroDetailCrimessolvedStatsComponent
      }
    ]
  },
  { 
    path: 'logs',
    loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule),
  },
  { 
    path: 'statistics',
    loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule),
  },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { 
  
}
