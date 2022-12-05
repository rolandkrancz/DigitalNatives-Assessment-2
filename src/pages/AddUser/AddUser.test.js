import { fireEvent, render, screen } from "@testing-library/react";
import { server } from '../../mocks/server';
import { rest } from 'msw';
import AddUser from "./AddUser";

describe('AddUser page tests', () => {
    test('Can submit ', async () => {
        render(<AddUser />);
        const submitButton = await screen.findByRole('button', {name: /submit/i});
        const firstName = await screen.findByRole('textbox', {name: /first name:/i});
        const lastName = await screen.findByRole('textbox', {name: /last name:/i});
        fireEvent.change(firstName, {target: {value: 'First'}});
        fireEvent.change(lastName, {target: {value: 'Last'}});
        fireEvent.click(submitButton);
    });

    test.skip('First name is blank -> Renders error message.', async () => {
        server.use(
            rest.post('https://assessment-users-backend.herokuapp.com/users'),
            (res, req, ctx) => {
                return res(ctx.status(422),
                           ctx.json({
                                "first_name": ["can't be blank"]
                           }))
            }
        )

        render(<AddUser />);
        const submitButton = await screen.findByRole('button', {name: /submit/i});
        const firstName = await screen.findByRole('textbox', {name: /first name:/i});
        const lastName = await screen.findByRole('textbox', {name: /last name:/i});

        fireEvent.change(firstName, {target: {value: ''}});
        fireEvent.change(lastName, {target: {value: 'Last'}});
        fireEvent.click(submitButton);
        const errorIndicator = await screen.findByTestId('fn-error')
        expect(errorIndicator.textContent).toEqual("can't be blank")
    });

    test.skip('Last name is blank -> Rendors error message.', async () => {
        server.use(
            rest.post('https://assessment-users-backend.herokuapp.com/users'),
            (res, req, ctx) => {
                return res(ctx.status(422), ctx.json( {
                    "last_name": ["can't be blank"]
                }))
            }
        )
            
        render(<AddUser />);
        const submitButton = await screen.findByRole('button', {name: /submit/i});
        const firstName = await screen.findByRole('textbox', {name: /first name:/i});
        const lastName = await screen.findByRole('textbox', {name: /last name:/i});

        fireEvent.change(firstName, {target: {value: 'First'}});
        fireEvent.change(lastName, {target: {value: ''}});
        fireEvent.click(submitButton);
        const errorIndicator = await screen.findByTestId('ln-error');
        expect(errorIndicator.textContent).toEqual("can't be blank")
    });

});