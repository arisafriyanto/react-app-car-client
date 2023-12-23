import { Box, TextField, Switch, Stack } from '@mui/material';
import CommonPage from '../../../components/common-page/common-page';
import { CloudUpload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import useAction from './create.hooks';
import { VisuallyHiddenInput } from './create.styled';

export default function Create() {
    const { formValues, handleSubmit, handleUploadPhoto, loadingPhoto, loadingSubmit, setFormValues, fileItem } =
        useAction();
    return (
        <CommonPage
            withBack
            component={'form'}
            title="Create new Car"
            actionElement={
                <LoadingButton type="submit" variant="contained" loading={loadingSubmit}>
                    Submit
                </LoadingButton>
            }
            onSubmit={handleSubmit}>
            <Box
                sx={{
                    width: '50%',
                }}>
                <TextField
                    name="plate"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Plate"
                    placeholder="ex: DBH-3491"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            plate: e.target.value,
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="manufacture"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Manufacture"
                    placeholder="ex: Ford"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            manufacture: e.target.value,
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="model"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Model"
                    placeholder="ex: F150"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            model: e.target.value,
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="rent_per_day"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Rent Per Day"
                    placeholder="ex: 200000"
                    type="number"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            rent_per_day: Number(e.target.value),
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="capacity"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Capacity"
                    placeholder="ex: 6"
                    type="number"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            capacity: Number(e.target.value),
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="description"
                    multiline={true}
                    rows={3}
                    sx={{ width: '100%', mb: 3 }}
                    label="Description"
                    placeholder="ex: Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter."
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            description: e.target.value,
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="transmission"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Transmission"
                    placeholder="ex: Automatic"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            transmission: e.target.value,
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="type"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Type"
                    placeholder="ex: Sedan"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            type: e.target.value,
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="year"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Year"
                    placeholder="ex: 2022"
                    type="number"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            year: e.target.value,
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="options[]"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Options"
                    placeholder="ex: Cruise Control,Tinted Glass"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            options: e.target.value.split(','),
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="specs[]"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Specs"
                    placeholder="ex: Brake assist,love box lamp"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            specs: e.target.value.split(','),
                        })
                    }
                    variant="outlined"
                />
                <TextField
                    name="available_at"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Available at"
                    placeholder="ex: 2023-12-11"
                    onChange={(e) =>
                        setFormValues({
                            ...formValues,
                            available_at: e.target.value,
                        })
                    }
                    variant="outlined"
                />

                <LoadingButton
                    component="label"
                    variant="contained"
                    startIcon={<CloudUpload />}
                    sx={{ mb: 3 }}
                    loading={loadingPhoto}>
                    Upload Car Photo
                    <VisuallyHiddenInput type="file" accept=".png, .jpg, .jpeg" onChange={handleUploadPhoto} />
                </LoadingButton>
                {fileItem && fileItem.url && (
                    <Box>
                        <img src={fileItem.secure_url} alt="preview" style={{ width: '100%', objectFit: 'cover' }} />
                    </Box>
                )}
                <Box>
                    <Stack direction={'row'} alignItems={'center'}>
                        <div>Available</div>
                        <Switch
                            name="available"
                            title="Available"
                            onChange={(e) =>
                                setFormValues({
                                    ...formValues,
                                    available: e.target.checked,
                                })
                            }
                        />
                    </Stack>
                </Box>
            </Box>
        </CommonPage>
    );
}
