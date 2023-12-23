import {
    Box,
    Button,
    CircularProgress,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import useAction from './list.hooks';
import { ICars } from '../cars.types';

import CommonPage from '../../../components/common-page/common-page';
import { Link, useNavigate } from 'react-router-dom';
import { parseISO, format } from 'date-fns';
import { HeaderElementStyled } from './list.styled';

export default function List() {
    const navigate = useNavigate();
    const { cars, loading, setParams, params, meta, handleEdit, handleRemove, handleSearch } = useAction();

    const renderLoading = () => {
        return (
            <TableCell colSpan={5}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '1rem 0',
                    }}>
                    <CircularProgress />
                </div>
            </TableCell>
        );
    };
    const renderContent = () => {
        if (loading) {
            return renderLoading();
        }
        return cars?.map((record: ICars) => (
            <TableRow
                key={record.id}
                sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                        cursor: 'pointer',
                    },
                    position: 'relative',
                }}
                onClick={() => navigate(`/detail/${record.id}`)}>
                <TableCell component="th">
                    <Box sx={{ mb: 1 }}>{record.model}</Box>
                    <Box>
                        <strong>Manufacture: </strong> {record.manufacture}
                    </Box>
                </TableCell>

                <TableCell align="center">{record.capacity} orang</TableCell>
                <TableCell align="center">{record.transmission}</TableCell>
                <TableCell align="center">Rp.{record.rent_per_day}</TableCell>
                <TableCell align="center">
                    {format(parseISO(`${record.available_at}`), 'dd MMM yyyy HH:mm:ss')}
                </TableCell>
                <TableCell>
                    <Stack
                        direction={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{
                            height: '100%',
                        }}
                        gap={1}>
                        <Button
                            type="button"
                            variant="contained"
                            color="error"
                            onClick={(e) => handleRemove(e, record)}>
                            Delete
                        </Button>
                        <Button type="button" variant="outlined" onClick={(e) => handleEdit(e, record)}>
                            Edit
                        </Button>
                    </Stack>
                </TableCell>
            </TableRow>
        ));
    };

    return (
        <CommonPage
            title="Cars"
            actionElement={
                <HeaderElementStyled>
                    <TextField
                        name="search"
                        placeholder="Search cars model or manufacture"
                        onChange={handleSearch}
                        size="small"
                        sx={{ width: '18rem' }}
                    />
                    <Link to={'/create'}>
                        <Button type="button" variant="contained" sx={{ width: '8rem' }}>
                            Create new
                        </Button>
                    </Link>
                </HeaderElementStyled>
            }>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name/Model</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                Capacity
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                Transmission
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                Rent Per Day
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                Available At
                            </TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderContent()}</TableBody>
                </Table>
            </TableContainer>
            <Pagination
                sx={{ mt: 3 }}
                count={meta?.totalPages}
                color="primary"
                shape="rounded"
                onChange={(_, page: number) => {
                    setParams({
                        ...params,
                        page,
                    });
                }}
            />
        </CommonPage>
    );
}
