import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed dispatch hook — avoids repeating AppDispatch type in every component
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Typed selector hook — provides full RootState type inference
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
