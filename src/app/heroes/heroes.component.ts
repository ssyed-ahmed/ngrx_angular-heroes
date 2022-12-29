import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/hero.service';
import { Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { CommunicationService } from '../communication.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Hero } from '../store/hero';
import { selectAllHeroes } from '../store/app.selector';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];
  title: string = 'Heroes';
  public displayDeleteDialog = 'none';
  heroToDelete;
  selectedId;
  idHasDuplicateError = false;
  idHasRangeError = false;
  sortNameAscending = true;
  sortDescAscending = true;
  sortRatingAscending = true;
  
  // heroModel = new Hero(1, '', 'default', '', 'Male', Array(1));
  heroToEdit;

  subscription: Subscription;

  constructor(
    private heroService: HeroService,
    private router: Router,
    private communicationService: CommunicationService,
    private route: ActivatedRoute,
    private store: Store,
    private actions$: Actions,
    private modalService: NgbModal,
  ) { 
    // Subscribe to the app component messages
    this.subscription = this.communicationService.getMessage().subscribe(message => {
      if (message.text === 'restore heroes') {
        this.restoreHeroes();
      }
    })
  }

  ngOnInit() {
    this.getHeroes();
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('id'));
      this.selectedId = id;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getHeroes(): void {
    this.store.pipe(
      select(selectAllHeroes)
    )
    .subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  selectHero(id: string, fromState: string): void {
    this.router.navigate([id, fromState], {relativeTo: this.route});
  }

  // addHero(): void {
  //   let newHero = new Hero(this.heroModel.id, this.heroModel.name, 'default', this.heroModel.description, this.heroModel.sex, Array(2));
  //   this.heroService.addHero(newHero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //       // Reset the heroModel
  //       this.heroModel = new Hero(1, '', 'default', '', 'Male', Array(2));
  //     })    
  // }

  launchEditHero(hero: Hero): void {
    this.heroToEdit = hero;    
  }

  editHero() {
    this.heroService.updateHero(this.heroToEdit)
    .subscribe(() => {
      // Reset the flag
      this.heroToEdit = null;
    });
  }

  deleteHero(hero: Hero): void {
    this.heroToDelete = hero;
  }

  deleteHeroConfirmed(): void {
    if (this.heroToDelete) {
      this.heroes = this.heroes.filter(h => h !== this.heroToDelete);
      this.heroService.deleteHero(this.heroToDelete).subscribe();
    }
  }

  restoreHeroes(): void {
    // this.heroes = this.heroService.restoreHeroes();
  }

  isSelected(hero): boolean {
    return hero.id === this.selectedId;
  }

  validateIdDuplicate(value: number): void {
    let isPresent = false;
    for (let i = 0; i < this.heroes.length; i++) {
      let hero = this.heroes[i];
      if (hero.id === value) {
        isPresent = true;
        break;
      }
    }

    if (isPresent) {
      this.idHasDuplicateError = true;
    } else {
      this.idHasDuplicateError = false;
    }
  }

  validateIdRange(value: number): void {
    if (value < 1 || value > 100) {
      this.idHasRangeError = true;
    } else {
      this.idHasRangeError = false;
    }
  }

  sortByName(): void {
    this.sortNameAscending = !this.sortNameAscending;
    this.heroes.sort((a: Hero, b: Hero) => {
      let sortNum = a.name < b.name ? -1: a.name > b.name ? 1 : 0;
      if (!this.sortNameAscending) {
        sortNum = -sortNum;
      }
      return sortNum;
    });
  }

  sortByDescription(): void {
    this.sortDescAscending = !this.sortDescAscending;
    this.heroes.sort((a: Hero, b: Hero) => {
      let sortNum = a.description < b.description ? -1: a.description > b.description ? 1 : 0;
      if (!this.sortDescAscending) {
        sortNum = -sortNum;
      }
      return sortNum;
    });
  }

  sortByRating(): void {
    this.sortRatingAscending = !this.sortRatingAscending;
    this.heroes.sort((a: Hero, b: Hero) => {
      let sortNum = a.rating - b.rating;
      if (!this.sortRatingAscending) {
        sortNum = -sortNum;
      }
      return sortNum;
    });
  }
}
