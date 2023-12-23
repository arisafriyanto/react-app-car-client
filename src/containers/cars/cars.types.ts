import { IFileItem } from '../../services/types';
export interface ICars {
    id?: string;
    plate?: string;
    manufacture?: string;
    model?: string;
    image?: IFileItem;
    rent_per_day?: number;
    capacity?: number;
    description?: string;
    transmission?: string;
    type?: string;
    year?: string;
    options?: Array<string>;
    specs?: Array<string>;
    available_at?: string;
    created_by?: string;
    updated_by?: string;
    available?: boolean;
}
