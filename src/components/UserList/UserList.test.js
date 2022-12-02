import { render, screen } from "@testing-library/react";
import { TEST_USERS } from "../../mocks/test-data";
import UserList from "./UserList";

const mockUserCard = jest.fn();
jest.mock("../UserCard/UserCard", () => (props) => {
  mockUserCard(props);
  return <mock-UserCard />;
});


describe('UserList tests', () => {
    test('Renders a user card for every user.', () => {
        render(<UserList users={TEST_USERS} />);
        expect(mockUserCard).toBeCalledTimes(TEST_USERS.length);
    })
    
    test('Passes correct data to user card.', () => {
        render(<UserList users={TEST_USERS} />);
        expect(mockUserCard).toHaveBeenCalledWith({ firstName: TEST_USERS[0].first_name, 
                                                    lastName: TEST_USERS[0].last_name,
                                                    createdAt: TEST_USERS[0].created_at});

        expect(mockUserCard).toHaveBeenCalledWith({ firstName: TEST_USERS[1].first_name, 
                                                    lastName: TEST_USERS[1].last_name,
                                                    createdAt: TEST_USERS[1].created_at});
    })
});