import SpaceReducer from "../src/Redux/Reducer/SpaceReducer";

describe('SpaceReducer', () => {
  it('should return the initial state', () => {
    expect(SpaceReducer(undefined, {})).toEqual({
      Space: 0,
    });
  });

  it('should handle SET_SPACE', () => {
    const initialState = {
      Space: 0,
    };
    const newSpace = 10;
    const action = { type: 'SET_SPACE', payload: newSpace };
    const newState = SpaceReducer(initialState, action);
    expect(newState).toEqual({
      Space: newSpace,
    });
  });

  it('should return current state for unknown action type', () => {
    const initialState = {
      Space: 0,
    };
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = SpaceReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
