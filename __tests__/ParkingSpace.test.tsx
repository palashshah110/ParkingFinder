import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import fetchMock from "jest-fetch-mock";
import configureStore from "redux-mock-store";
import ParkingSpace from "../src/screen/ParkingSpace";

fetchMock.enableMocks();
const mockStore = configureStore([]);

const ParkingLot = [
    { carid: 2, RegistrationNo: "MP1", CarParkTime: new Date().getTime() },
    { carid: 3, RegistrationNo: "MP5", CarParkTime: new Date().getTime() - (3 * 60 * 60 * 1000) }
];

const store = mockStore({
    parking: {
        ParkingLot,
    },
    space: {
        Space: 3,
    },
});
const mockNavigation = {
    navigate: jest.fn()
}
const mockNavigation1 = {
    goBack: jest.fn()
}
const mockDispatch = jest.fn();

describe("ParkingSpace Comp", () => {
    test("Testing Render Comp", async () => {
        render(
            <Provider store={store}>
                <ParkingSpace navigation={mockNavigation} dispatch={mockDispatch} />
            </Provider>
        );
        expect(screen.getByText("Space 1")).toBeDefined();

        const Occupied = screen.getAllByText("Occupied");
        expect(Occupied[0]).toBeDefined();
        fireEvent.press(Occupied[0]);

        const dialog = screen.getByTestId("OccuipedModel");
        expect(dialog).toBeDefined();

        const RegistrationNo = screen.getByText("Registration No: MP1");
        expect(RegistrationNo).toBeDefined();

        const TimeTaken = screen.getByText("Your Parking Time: 0 min");
        expect(TimeTaken).toBeDefined();

        const Charge = screen.getByText("Your Parking Fee: $10");
        expect(Charge).toBeDefined();

        const PaymentTaken = screen.getByText("Payment Taken");
        expect(PaymentTaken).toBeDefined();

        fireEvent.press(PaymentTaken);
        expect(fetchMock).toHaveBeenCalledTimes(1);

    });

    test("Testing Dialog btn and icon Comp", async () => {
        render(
            <Provider store={store}>
                <ParkingSpace navigation={mockNavigation} dispatch={mockDispatch} />
            </Provider>
        );
        expect(screen.getByText("Space 1")).toBeDefined();

        const Occupied = screen.getAllByText("Occupied");
        expect(Occupied[0]).toBeDefined();
        fireEvent.press(Occupied[0]);

        const dialog = screen.getByTestId("OccuipedModel");
        expect(dialog).toBeDefined();

        const closeBtn = screen.getByTestId("closeBtn");
        expect(closeBtn).toBeDefined();

        fireEvent.press(closeBtn);
    });

    test("Testing Go back button", () => {
        render(
          <Provider store={store}>
            <ParkingSpace navigation={mockNavigation1} dispatch={mockDispatch} />
          </Provider>
        );
    
        const gobackbtn = screen.getByText("Go Back");
        fireEvent.press(gobackbtn);
        expect(mockNavigation1.goBack).toHaveBeenCalled();
      });

      test("Testing New Car Registration button", async () => {
        render(
          <Provider store={store}>
            <ParkingSpace navigation={mockNavigation1} dispatch={mockDispatch} />          
          </Provider>
        );
        const CarRegistration = screen.getByText("New Registration");
        fireEvent.press(CarRegistration);
    
        expect(screen.getByTestId("RegistrationModal")).toBeDefined();

        const CarRegistrationInput = screen.getByPlaceholderText("Enter Registration Number");

        fireEvent.changeText(CarRegistrationInput, "MP1");
        expect(CarRegistrationInput.props.value).toBe("MP1");
            
        const AddBtn = screen.getByText("Add Car");
        fireEvent.press(AddBtn);
    })
    test("Testing Dialog btn and icon Comp for registration", async () => {
        render(
            <Provider store={store}>
                <ParkingSpace navigation={mockNavigation} dispatch={mockDispatch} />
            </Provider>
        );
        const CarRegistration = screen.getByText("New Registration");
        fireEvent.press(CarRegistration);
    
        expect(screen.getByTestId("RegistrationModal")).toBeDefined();
        
        const CarRegistrationInput = screen.getByPlaceholderText("Enter Registration Number");

        fireEvent.changeText(CarRegistrationInput, "MP1@");
        expect(CarRegistrationInput.props.value).toBe("");
        
        const closeBtn = screen.getByTestId("RegClosebtn");
        expect(closeBtn).toBeDefined();

        fireEvent.press(closeBtn);
    });
    test("Testing min and change", async () => {
        render(
          <Provider store={store}>
                <ParkingSpace navigation={mockNavigation} dispatch={mockDispatch} />
          </Provider>
        );
    
        const Occupied = screen.getAllByText("Occupied");
        fireEvent.press(Occupied[1]);
    
        const TimeTaken = screen.getByText("Your Parking Time: 180 min");
        expect(TimeTaken).toBeDefined();
    
        const Charge = screen.getByText("Your Parking Fee: $20");
        expect(Charge).toBeDefined();
      });
});
