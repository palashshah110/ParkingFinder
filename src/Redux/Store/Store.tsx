import { configureStore } from "@reduxjs/toolkit";
import SpaceReducer from '../Reducer/SpaceReducer.tsx';
import ParkingReducer from '../Reducer/ParkingReducer.tsx';

const reducer = {
  space: SpaceReducer,
  parking: ParkingReducer,
}

const Store = configureStore({
  reducer
});

export default Store;