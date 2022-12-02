import { findByAltText, getByText, render, screen } from "@testing-library/react"
import UserCard from "./UserCard"

describe('UserCard tests', () => {
    test('Contains full name as h3.', () => {
        render(<UserCard firstName='TestFirstName' lastName='TestLastName' createdAt='TestCreatedAt'/>);
        const heading = screen.getByRole('heading');
        const expectedFullName = 'TestFirstName TestLastName';
        expect(heading.textContent).toEqual(expectedFullName);
    })
    
    test('Contains creation date.', () => {
        render(<UserCard firstName='TestFirstName' lastName='TestLastName' createdAt='TestCreatedAt'/>);
        const createdAt = screen.getByText('Created at: TestCreatedAt');
        expect(createdAt).toBeInTheDocument();
    })
});