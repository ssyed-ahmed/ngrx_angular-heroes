import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { select, Store } from "@ngrx/store";
import { map, mergeMap, switchMap, withLatestFrom } from "rxjs";
import { HeroService } from "src/app/hero.service";
import { loadHeroes, loadHeroesSuccess } from "./app.actions";
import { selectAllHeroes } from "./app.selector";

@Injectable()
export class HeroEffects {

    constructor(
        private actions$: Actions,
        private heroService: HeroService,
        private store: Store,
    ) {}

    loadHeroes$ = createEffect(() => 
        this.actions$.pipe(
            ofType(loadHeroes),
            withLatestFrom(this.store.pipe(select(selectAllHeroes))),
            mergeMap(([, heroesFromStore]) => {
                return this.heroService
                    .getHeroes()
                    .pipe(
                        map(data => {
                            return loadHeroesSuccess({ heroes: data });
                        }),
                    )
            })
        )
    );
}