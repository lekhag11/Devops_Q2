import * as React from 'react';
import { styled } from '@mui/material/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
    toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import {
    StandardCategoryType,
    StandardCategoryTypeUppercase,
} from 'src/enums/categoryType';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
        margin: theme.spacing(0.5),
        background: 'transparent',
        color: 'white',
        height: '30px',
        border: 'none',
        [`&.Mui-selected`]: {
            borderRadius: 3,
            background: 'white',
            color: 'black',
            border: 'none',
        },
        [`&:hover`]: {
            borderRadius: 3,
            background: '#FFFFFF20',
            color: 'white',
        },
        [`&.Mui-selected:hover`]: {
            borderRadius: 3,
            background: 'white',
            color: 'black',
            border: 'none',
        },
        borderRadius: theme.shape.borderRadius,
    },
}));

function EnergyToggleButton({ selectedToggleButton }) {
    const navigate = useNavigate();

    function handleChange(event, data) {
        if (data === StandardCategoryTypeUppercase.ENERGY_CATEGORY) {
            navigate(
                `/home/${StandardCategoryType.ENERGY_CATEGORY}/${StandardCategoryTypeUppercase.ENERGY_CATEGORY}`
            );
        } else if (data) {
            navigate('/');
        }
    }

    return (
        <Box
            elevation={0}
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                border: `1px solid white`,
                borderRadius: 1,
                mr: 2,
            }}
        >
            <StyledToggleButtonGroup
                onChange={handleChange}
                value={
                    selectedToggleButton ===
                    StandardCategoryTypeUppercase.ENERGY_CATEGORY
                        ? StandardCategoryTypeUppercase.ENERGY_CATEGORY
                        : StandardCategoryTypeUppercase.SOURCE_CATEGORY
                }
                size='small'
                exclusive
                aria-label='text alignment'
            >
                <ToggleButton
                    value={StandardCategoryTypeUppercase.SOURCE_CATEGORY}
                >
                    <label style={{ textTransform: 'capitalize' }}>Water</label>
                </ToggleButton>
                <ToggleButton
                    value={StandardCategoryTypeUppercase.ENERGY_CATEGORY}
                >
                    <label style={{ textTransform: 'capitalize' }}>
                        Energy
                    </label>
                </ToggleButton>
            </StyledToggleButtonGroup>
        </Box>
    );
}

export default EnergyToggleButton;
