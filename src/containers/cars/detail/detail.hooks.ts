import { useEffect, useState } from 'react';
import axios from 'axios';
import { ICars } from '../cars.types';
import { IFileItem } from '../../../services/types';

export function useDetail(id: string) {
    const [car, setCar] = useState<ICars | null>(null);
    const [fileItem, setFileItem] = useState<IFileItem | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8000/api/cars/${id}`);
                setFileItem(response.data.data.image);
                setCar(response.data.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return { car, fileItem, loading };
}
