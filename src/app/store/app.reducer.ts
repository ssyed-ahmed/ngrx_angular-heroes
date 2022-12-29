import { createReducer, on } from "@ngrx/store";
import { Hero } from "./hero";
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { loadHeroesSuccess } from "./app.actions";

export interface State extends EntityState<Hero> {
    selectedHeroId: number | null;
}

export function selectHeroId(a: Hero): number {
    return a.id;
}

export function sortByName(a: Hero, b: Hero): number {
    return a.name.localeCompare(b.name);
}

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>({
    selectId: selectHeroId,
    sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
    selectedHeroId: null,
});

export const heroReducer = createReducer(
    initialState,
    on(loadHeroesSuccess, (state, { heroes }) => {
        return adapter.setAll(heroes, state);
    })
);

export const getSelectedHeroId = (state: State) => state.selectedHeroId;

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const selectHeroIds = selectIds;

export const selectHeroEntities = selectEntities;

export const selectAllHeroes = selectAll;

export const selectHeroTotal = selectTotal;
