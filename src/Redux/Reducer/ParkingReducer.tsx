const initialState = {
  ParkingLot: [],
};

const ParkingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    
    case "SET_ParkingLot":
      return {
        ...state,
        ParkingLot: [...state.ParkingLot, action.payload],
      };

    case "DEALLOCATE_PARKING":
      return {
        ...state,
        ParkingLot: action.payload,
      };

    default:
      return state;
  }
};

export default ParkingReducer;
