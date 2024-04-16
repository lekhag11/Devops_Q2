import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import React from 'react';
import { assets } from 'src/assets/assets';
import If from 'src/components/logical/If';

function LeftSideNav({
    leftSideNav,
    selectedleftNav,
    leftSideNavActive,
    open,
    setOpen,
}) {
    return (
        <List>
            {leftSideNav.map((text, index) => (
                <ListItem
                    key={text?.title}
                    disablePadding
                    sx={{ display: 'block' }}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: 'left',
                            backgroundColor:
                                selectedleftNav === text.value
                                    ? assets.colors.lightGrey
                                    : '',
                            '&:hover': {
                                backgroundColor:
                                    selectedleftNav === text.value
                                        ? assets.colors.lightGrey
                                        : '',
                            },
                            borderRadius: '8px',
                        }}
                        onClick={() => {
                            leftSideNavActive(text.value);
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: '8px',
                            }}
                        >
                            <text.icon
                                sx={{
                                    color: 'black',
                                }}
                            />
                        </ListItemIcon>
                        <If condition={open}>
                            <ListItemText
                                primary={text?.title}
                                sx={{ opacity: 1, fontWeight: 500 }}
                            />
                        </If>
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
}

export default LeftSideNav;
