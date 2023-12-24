/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import List from './list';
import useAction from './list.hooks';
import { BrowserRouter } from 'react-router-dom';
import { ICars } from '../cars.types';

jest.mock('./list.hooks');

const useActionMock = useAction as jest.MockedFunction<any>;

describe('containers/cars/list', () => {
    useActionMock.mockReturnValue({
        cars: [
            {
                id: '1',
                model: 'F150',
                manufacture: 'Ford',
                capacity: 6,
                transmission: 'Automatic',
                rent_per_day: 500000,
                available_at: new Date().toISOString(),
                created_by: '1',
                available: true,
            },
        ] as ICars,
        params: {
            page: 1,
            size: 10,
        },
        setParams: jest.fn(),
        loading: false,
        meta: {},
        handleEdit: jest.fn(),
        handleRemove: jest.fn(),
        handleSearch: jest.fn(),
    });

    test('render list cars', async () => {
        const result = render(
            <BrowserRouter>
                <List />
            </BrowserRouter>
        );
        const tableRows = await result.findAllByTestId('table-rows');
        expect(tableRows).toHaveLength(1);
    });
});
