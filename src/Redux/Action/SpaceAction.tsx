export const setSpace = (value:number) => ({
  type: 'SET_SPACE',
  payload: value,
});

export const setParkingLot = (data:any[]) => ({
  type: 'SET_ParkingLot',
  payload: data,
});

export const deallocateParking = (UpdatedData:[]) => ({
  type: 'DEALLOCATE_PARKING',
  payload: UpdatedData,
});