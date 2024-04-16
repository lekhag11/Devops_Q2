import React, { useRef, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import EditCalendarIcon from '@mui/icons-material/EditNoteOutlined';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { InputLabel } from '@mui/material';

const FileInput = ({ accept, maxSize, onFileSelect, heading }) => {
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    // eslint-disable-next-line
    const [cropData, setCropData] = useState(null);
    const [open, setOpen] = useState(false);

    const cropperRef = useRef();

    useEffect(() => {
        if (selectedFile && cropperRef.current) {
            handleReplaceImage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (accept && !accept.includes(file.type)) {
                setError('Invalid file format.');
                return;
            }

            if (maxSize && file.size > maxSize) {
                setError(
                    `File size exceeds the maximum limit of ${maxSize} bytes.`
                );
                return;
            }

            setError(null);
            setSelectedFile(file);
            setCropData(null);

            setOpen(true);
        }
    };

    const handleCrop = () => {
        if (cropperRef.current) {
            const croppedCanvas = cropperRef.current.getCroppedCanvas();
            if (croppedCanvas) {
                croppedCanvas.toBlob((blob) => {
                    const croppedFile = new File([blob], selectedFile.name, {
                        type: selectedFile.type,
                        lastModified: Date.now(),
                    });

                    onFileSelect(croppedFile);
                    // Reset selected file and crop data
                    setSelectedFile(null);
                    setCropData(null);
                    setOpen(false);
                });
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedFile(null);
        setCropData(null);
    };

    const handleReplaceImage = () => {
        try {
            if (cropperRef.current) {
                const croppedCanvas = cropperRef.current.getCroppedCanvas();
                const newImageSource = URL.createObjectURL(selectedFile);

                if (croppedCanvas && newImageSource) {
                    cropperRef.current.replace(newImageSource);
                }
            }
        } catch (error) {
            console.error('Error while replacing image:', error);
        }
    };

    return (
        <div>
            <InputLabel htmlFor='file-input'>
                <Typography
                    variant='body2'
                    color='textSecondary'
                >
                    {heading}
                </Typography>
                <Input
                    accept={accept}
                    id='file-input'
                    type='file'
                    sx={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </InputLabel>
            <IconButton
                component='label'
                htmlFor='file-input'
                aria-label='upload file'
            >
                <EditCalendarIcon
                    opacity={0.5}
                    fontSize='12px'
                    sx={{ cursor: 'pointer' }}
                />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='md'
                fullWidth
            >
                <DialogTitle>Crop Image</DialogTitle>
                <DialogContent>
                    <Cropper
                        ref={cropperRef}
                        src={
                            selectedFile
                                ? URL.createObjectURL(selectedFile)
                                : null
                        }
                        onInitialized={(instance) => {
                            cropperRef.current = instance;
                        }}
                        zoomTo={0}
                        style={{ height: '100%', width: '100%' }}
                        guides={false}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        onClick={handleCrop}
                        color='primary'
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            {error && (
                <Typography
                    variant='caption'
                    color='error'
                >
                    {error}
                </Typography>
            )}
        </div>
    );
};

export default FileInput;
