import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/hero.service';
import { ParamMap } from '@angular/router';
import { CommunicationService } from '../communication.service';
import { select, Store } from '@ngrx/store';
import { Hero } from '../store/hero';
import { getHeroById } from '../store/app.selector';

@Component({
  selector: 'app-hero-detail-general',
  templateUrl: './hero-detail-general.component.html',
  styleUrls: ['./hero-detail-general.component.scss']
})
export class HeroDetailGeneralComponent implements OnInit {

  hero: Hero;
  
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
      });
    })
  }

  ngOnInit() {
  }

  goBack(): void {
    this.communicationService.sendMessage('go back');
  }

}
