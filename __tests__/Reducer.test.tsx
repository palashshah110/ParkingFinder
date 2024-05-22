import ParkingReducer from "../src/Redux/Reducer/ParkingReducer";

describe('ParkingReducer', () => {
  it('should return the initial state', () => {
    expect(ParkingReducer(undefined, {})).toEqual({
      ParkingLot: [],
    });
  });

  it('should handle SET_ParkingLot', () => {
    const initialState = {
      ParkingLot: [],
    };
    const data:any = [{ id: 1, name: 'Car 1' }];
    const action = { type: 'SET_ParkingLot', payload: data };
    const newState = ParkingReducer(initialState, action);
    expect(newState).toEqual({
      ParkingLot: [data],
    });
  });

  it('should handle DEALLOCATE_PARKING', () => {
    const initialState:any = {
      ParkingLot: [{ id: 1, name: 'Car 1' }],
    };
    const updatedData:any = [];
    const action = { type: 'DEALLOCATE_PARKING', payload: updatedData };
    const newState = ParkingReducer(initialState, action);
    expect(newState).toEqual({
      ParkingLot: updatedData,
    });
  });

  it('should return current state for unknown action type', () => {
    const initialState = {
      ParkingLot: [],
    };
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = ParkingReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
