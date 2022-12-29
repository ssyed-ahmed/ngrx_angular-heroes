import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/hero.service';
import { Location } from '@angular/common';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommunicationService } from '../communication.service';
import { select, Store } from '@ngrx/store';
import { Hero } from '../store/hero';
import { getHeroById } from '../store/app.selector';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  title: string = 'Hero Details';
  heroId;
  fromState;
  subscription: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private heroService: HeroService, 
    private location: Location,
    private store: Store,
    private communicationService: CommunicationService) {
      // Subscribe to the hero detail general component message
    this.subscription = this.communicationService.getMessage().subscribe(message => {
      if (message.content === 'go back') {
        this.goBack();
      }
    })
  }

  ngOnInit() {
    this.getHero();    
  }

  getHero(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      let fromState = params.get('fromState');
      this.heroId = id;
      this.fromState = fromState;
      this.store.pipe(
        select(getHeroById(id))
      ).subscribe(hero => {
        this.hero = hero;
      });
    })    
  }

  goBack(): void {
    // this.location.back();
    let selectedId = this.heroId ? this.heroId : null;
    let fromState = this.fromState;
    this.router.navigate([fromState, {id: selectedId}]);
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }  

  showOverview(): void {
    this.router.navigate(['overview'], {relativeTo: this.route});
  }

  showStatistics(): void {
    this.router.navigate(['statistics'], {relativeTo: this.route});
  }

  showCrimesSolved(): void {
    this.router.navigate(['crimessolved'], {relativeTo: this.route});
  }
}
