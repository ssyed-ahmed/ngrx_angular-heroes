import { ActionReducerMap, createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromHero from './app.reducer';

export interface State {
    heroes: fromHero.State,
}

export const reducers: ActionReducerMap<State> = {
    heroes: fromHero.heroReducer,
}

export const selectHeroesState = createFeatureSelector<fromHero.State>('heroes');

export const selectHeroIds = createSelector(
    selectHeroesState,
    fromHero.selectHeroIds,
);

export const selectHeroEntities = createSelector(
    selectHeroesState,
    fromHero.selectHeroEntities,
);

export const selectAllHeroes = createSelector(
    selectHeroesState,
    fromHero.selectAllHeroes,
);

export const selectHeroTotal = createSelector(
    selectHeroesState,
    fromHero.selectHeroTotal,
);

export const selectCurrentHeroId = createSelector(
    selectHeroesState,
    fromHero.getSelectedHeroId,
);

export const selectCurrentHero = createSelector(
    selectHeroEntities,
    selectCurrentHeroId,
    (heroEntitities, heroId) => heroId && heroEntitities[heroId],
);

export const getHeroById = (id: number) => {
    return createSelector(
        selectAllHeroes,
        (heroes => {
            return heroes.find(hero => hero.id === id);
        })
    )
};
