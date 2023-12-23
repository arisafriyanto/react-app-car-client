import axios from 'axios';
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import { ICars } from '../cars.types';
import { IApiResponse, IMeta, IParams } from '../../../services/types';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:8000/api/cars';

export default function useList() {
    const navigate = useNavigate();
    const [params, setParams] = useState<IParams>({
        page: 1,
        size: 10,
    });
    const [meta, setMeta] = useState<IMeta>();
    const [loading, setLoading] = useState<boolean>(false);
    const [cars, setCars] = useState<ICars[]>([]);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setParams({
            ...params,
            search: value,
        });
    };

    const handleRemove = async (e: MouseEvent<HTMLButtonElement>, record: ICars) => {
        e.stopPropagation();
        const confirmed = window.confirm('Apakah anda yakin ingin menghapus data?');
        if (confirmed) {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                await axios.delete(`${API_BASE_URL}/${record.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                await fetchCars();
            } catch (error) {
                console.error('Error deleting car:', error);
            }
        }
    };

    const handleEdit = (e: MouseEvent<HTMLButtonElement>, record: ICars) => {
        e.stopPropagation();
        navigate(`/update/${record.id}`);
    };

    const fetchCars = async () => {
        try {
            setLoading(true);
            const response = await axios.get<IApiResponse<ICars[]>>(API_BASE_URL, {
                params,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` || '',
                },
            });
            setCars(response.data.data);
            setMeta(response.data.meta);
        } catch (error) {
            console.error('Error fetching cars:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCars();
    }, [params]);

    return {
        cars,
        params,
        setParams,
        loading,
        meta,
        handleEdit,
        handleRemove,
        handleSearch,
    };
}
