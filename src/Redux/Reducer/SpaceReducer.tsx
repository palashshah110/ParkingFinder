const initialState = {
    Space: 0,
  };
  
  const SpaceReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'SET_SPACE':
        return {
          ...state,
          Space: action.payload,
        }        
      default:
        return state;
    }
  };
  
export default SpaceReducer;  