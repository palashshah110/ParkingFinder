import { useDispatch, useSelector } from "react-redux";

const withRouter = (Component: React.ComponentType<any>) => {
  const WithRouter = (props: any) => {
    const dispatch = useDispatch();
    const Space = useSelector((state: any) => state.space.Space);
    const ParkingLot = useSelector((state: any) => state.parking.ParkingLot);
    return (
      <Component
        {...props}
        dispatch={dispatch}
        Space={Space}
        ParkingLot={ParkingLot}
      />
    );
  };
  return WithRouter;
};
export default withRouter;
