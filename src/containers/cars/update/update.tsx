import { Box, TextField, Switch, Stack } from '@mui/material';
import CommonPage from '../../../components/common-page/common-page';
import { CloudUpload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useUpdate } from './update.hooks';
import { VisuallyHiddenInput } from './update.styled';

export default function Update() {
    const { formValues, loadingPhoto, loadingSubmit, fileItem, handleUploadPhoto, handleFormChange, handleSubmit } =
        useUpdate();

    return (
        <CommonPage
            withBack
            component={'form'}
            title="Update Car"
            actionElement={
                <LoadingButton type="submit" variant="contained" loading={loadingSubmit}>
                    Submit
                </LoadingButton>
            }
            onSubmit={handleSubmit}>
            <Box sx={{ width: '50%' }}>
                <TextField
                    name="plate"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Plate"
                    placeholder="ex: DBH-3491"
                    value={formValues.plate}
                    onChange={(e) => handleFormChange('plate', e.target.value)}
                />
                <TextField
                    name="manufacture"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Manufacture"
                    placeholder="ex: Ford"
                    value={formValues.manufacture}
                    onChange={(e) => handleFormChange('manufacture', e.target.value)}
                />
                <TextField
                    name="model"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Model"
                    placeholder="ex: F150"
                    value={formValues.model}
                    onChange={(e) => handleFormChange('model', e.target.value)}
                />
                <TextField
                    name="rent_per_day"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Rent Per Day"
                    placeholder="ex: 200000"
                    type="number"
                    value={formValues.rent_per_day}
                    onChange={(e) => handleFormChange('rent_per_day', e.target.value)}
                />
                <TextField
                    name="capacity"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Capacity"
                    placeholder="ex: 6"
                    type="number"
                    value={formValues.capacity}
                    onChange={(e) => handleFormChange('capacity', e.target.value)}
                />
                <TextField
                    name="description"
                    multiline={true}
                    rows={3}
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Description"
                    placeholder="ex: Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter."
                    value={formValues.description}
                    onChange={(e) => handleFormChange('description', e.target.value)}
                />
                <TextField
                    name="transmission"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Transmission"
                    placeholder="ex: Automatic"
                    value={formValues.transmission}
                    onChange={(e) => handleFormChange('transmission', e.target.value)}
                />
                <TextField
                    name="type"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Type"
                    placeholder="ex: Sedan"
                    value={formValues.type}
                    onChange={(e) => handleFormChange('type', e.target.value)}
                />
                <TextField
                    name="year"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Year"
                    placeholder="ex: 2022"
                    type="number"
                    value={formValues.year}
                    onChange={(e) => handleFormChange('year', e.target.value)}
                />
                <TextField
                    name="options[]"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Options"
                    placeholder="ex: Cruise Control,Tinted Glass"
                    value={formValues.options}
                    onChange={(e) => handleFormChange('options', e.target.value.split(','))}
                />
                <TextField
                    name="specs[]"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Specs"
                    placeholder="ex: Cruise Control,Tinted Glass"
                    value={formValues.specs}
                    onChange={(e) => handleFormChange('specs', e.target.value.split(','))}
                />
                <TextField
                    name="available_at"
                    size="small"
                    sx={{ width: '100%', mb: 3 }}
                    label="Available at"
                    placeholder="ex: 2023-12-11"
                    value={formValues.available_at}
                    onChange={(e) => handleFormChange('available_at', e.target.value)}
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
                            title="available"
                            checked={formValues.available}
                            onChange={(e) => handleFormChange('available', e.target.checked)}
                        />
                    </Stack>
                </Box>
            </Box>
        </CommonPage>
    );
}
