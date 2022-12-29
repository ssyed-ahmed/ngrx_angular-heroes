import { createAction, props } from "@ngrx/store";
import { Hero } from "./hero";

export const loadHeroes = createAction(
    `[Hero/Api] Load heroes`
);

export const loadHeroesSuccess = createAction(
    `[Hero/Api] Load heroes success`,
    props<{heroes: Hero[]}>()
);

export const loadHeroesFailure = createAction(
    `[Hero/Api] Load heroes failure`,
    props<{error: string}>()
);
