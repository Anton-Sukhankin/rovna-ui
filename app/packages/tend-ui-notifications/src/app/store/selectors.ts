import { State } from './types';

export const connection = (state: State) => state.connection;
export const setConnection = (state: State) => state.setConnection;

export const view = (state: State) => state.screen;
export const setView = (state: State) => state.setScreen;

export const saveToken = (state: State) => state.settingsSaveToken;

export const module = (state: State) => state.module;
export const setModule = (state: State) => state.setModule;
export const setModuleWithInitials = (state: State) => state.setModuleWithInitials;

export const checked = (state: State) => state.checked;
export const toggleChecked = (state: State) => state.toggleChecked;
export const toggleCheckedAll = (state: State) => state.toggleCheckedAll;

export const type = (state: State) => state.type;
export const setType = (state: State) => state.setType;

export const search = (state: State) => state.search;
export const setSearch = (state: State) => state.setSearch;

export const filters = (state: State) => state.filters;
export const setFilters = (state: State) => state.setFilters;
