import React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ParkingForm from "../src/screen/ParkingForm";

const mockStore = configureStore([]);

const ParkingLot = [
    { carid: 2, RegistrationNo: "MP1", CarParkTime: new Date().getTime() },
  ];
  
const store = mockStore({
    parking: {
      ParkingLot
    },
    space:{
      Space:2
    }
});

const mockNavigation = {
    navigate: jest.fn()
}
const mockDispatch =  jest.fn();

describe("ParkingApp", () => {

  test("Change Space Input", () => {
    render(
    <Provider store={store}>
        <ParkingForm navigation={mockNavigation} dispatch={mockDispatch}/>
    </Provider>
    );
    const SpaceInput = screen.getByPlaceholderText("Space");
    fireEvent.changeText(SpaceInput,5);
    expect(SpaceInput.props.value).toBe("5")

    const Btn = screen.getByText('Add Space');
    fireEvent.press(Btn);
  });


  test("Change Space Input Wrongly", () => {
    render(
        <Provider store={store}>
            <ParkingForm navigate={mockNavigation} dispatch={mockDispatch}/>
      </Provider>
    );
    const SpaceInput = screen.getByPlaceholderText("Space");
    fireEvent.changeText(SpaceInput, 'P5');
    expect(SpaceInput.props.value).toBe('');
    fireEvent.changeText(SpaceInput, -1);
    expect(SpaceInput.props.value).toBe("")
  });
});
