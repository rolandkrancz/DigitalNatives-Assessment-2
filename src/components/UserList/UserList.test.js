import { render, screen } from "@testing-library/react";
import { TEST_USERS_11 } from "../../mocks/test-data";
import UserList from "./UserList";

const mockUserCard = jest.fn();
jest.mock("../UserCard/UserCard", () => (props) => {
  mockUserCard(props);
  return <mock-UserCard />;
});


describe('UserList tests', () => {
    test('Renders a user card for every user.', () => {
        render(<UserList users={TEST_USERS_11} />);
        expect(mockUserCard).toBeCalledTimes(TEST_USERS_11.length);
    })

    test('Passes correct data to user card.', () => {
        render(<UserList users={TEST_USERS_11} />);
        expect(mockUserCard).toHaveBeenCalledWith({ firstName: TEST_USERS_11[0].first_name, 
                                                    lastName: TEST_USERS_11[0].last_name,
                                                    createdAt: TEST_USERS_11[0].created_at});

        expect(mockUserCard).toHaveBeenCalledWith({ firstName: TEST_USERS_11[1].first_name, 
                                                    lastName: TEST_USERS_11[1].last_name,
                                                    createdAt: TEST_USERS_11[1].created_at});
    })
});