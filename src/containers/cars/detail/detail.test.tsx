/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import CarDetail from './detail';
import { useDetail } from './detail.hooks';
import { BrowserRouter } from 'react-router-dom';
import { ICars } from '../cars.types';

jest.mock('./detail.hooks');

const useDetailMock = useDetail as jest.MockedFunction<any>;

describe('containers/cars/detail', () => {
    useDetailMock.mockReturnValue({
        car: [
            {
                id: '1',
                plate: 'DBH-3491',
                model: 'F150',
                manufacture: 'Ford',
                rent_per_day: 500000,
                capacity: 6,
                transmission: 'Automatic',
                available_at: new Date().toISOString(),
                created_by: '1',
                specs: ['Silver finish interior door handles', '160-amp alternator'],
                available: true,
            },
        ] as ICars,
        params: {
            page: 1,
            size: 10,
        },
        fileItem: null,
        loading: false,
    });

    test('render list cars', async () => {
        const result = render(
            <BrowserRouter>
                <CarDetail />
            </BrowserRouter>
        );
        const tableRow = await result.findByTestId('table-row');
        expect(tableRow).toBeTruthy();
    });
});
