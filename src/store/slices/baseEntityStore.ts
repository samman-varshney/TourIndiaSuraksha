import { createSlice, PayloadAction, SliceCaseReducers, ValidateSliceCaseReducers } from '@reduxjs/toolkit';
import { AsyncState } from './types';

/** Shape of the entity slice state */
export interface EntityState<T> extends AsyncState {
  items: T[];
  selectedItem: T | null;
  total: number;
}

/** Initial state factory for any entity */
export const createEntityInitialState = <T>(): EntityState<T> => ({
  items: [],
  selectedItem: null,
  total: 0,
  loading: false,
  error: null,
});

/** Reusable reducer map for common CRUD operations on any entity slice */
export const baseEntityReducers = <T>() => ({
  // Set loading state before async operation
  setLoading: (state: EntityState<T>, action: PayloadAction<boolean>) => {
    state.loading = action.payload;
  },
  // Store error message from a failed request
  setError: (state: EntityState<T>, action: PayloadAction<string | null>) => {
    state.error = action.payload;
    state.loading = false;
  },
  // Replace the items list with a fresh fetch result
  setItems: (state: EntityState<T>, action: PayloadAction<{ items: T[]; total: number }>) => {
    state.items = action.payload.items;
    state.total = action.payload.total;
    state.loading = false;
    state.error = null;
  },
  // Set a single selected/active entity
  setSelectedItem: (state: EntityState<T>, action: PayloadAction<T | null>) => {
    state.selectedItem = action.payload;
  },
  // Append a newly created entity to the list
  addItem: (state: EntityState<T>, action: PayloadAction<T>) => {
    state.items.push(action.payload);
    state.total += 1;
  },
  // Remove an entity by its index
  removeItem: (state: EntityState<T>, action: PayloadAction<number>) => {
    state.items.splice(action.payload, 1);
    state.total -= 1;
  },
  // Clear all entity state back to initial values
  resetState: (state: EntityState<T>) => {
    Object.assign(state, createEntityInitialState<T>());
  },
});

/**
 * Factory that creates a fully-typed Redux slice for any domain entity.
 * Extend with feature-specific reducers via the `extraReducers` parameter.
 */
export const createEntitySlice = <
  T,
  Reducers extends SliceCaseReducers<EntityState<T>>
>({
  name,
  extraReducers,
}: {
  name: string;
  extraReducers?: ValidateSliceCaseReducers<EntityState<T>, Reducers>;
}) => {
  return createSlice({
    name,
    initialState: createEntityInitialState<T>(),
    reducers: {
      ...baseEntityReducers<T>(),
      ...(extraReducers ?? {}),
    } as any,
  });
};
