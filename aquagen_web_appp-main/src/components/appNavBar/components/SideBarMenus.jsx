import React, { useContext } from 'react';
import {
    Box,
    ButtonBase,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    Tooltip,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppStoreContext } from 'src/store/AppStore';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import { constants } from 'src/constants/constants';
import { assets } from 'src/assets/assets';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import If from 'src/components/logical/If';
import IfNot from 'src/components/logical/IfNot';
import { StandardCategoryTypeUppercase } from 'src/enums/categoryType';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';

function SideBarMenus({ setOpen, open }) {
    const appStore = useContext(AppStoreContext);

    const navigate = useNavigate();

    const handleOnLeftMenuSubItemClicked = (item) => {
        appStore.setSelectedCategory(item);
        navigate(
            `/home/${item.standardCategoryId.toLowerCase()}/${item.categoryId}`
        );
    };

    const openFeedback = () => {
        setOpen(false);
        window.open(constants.feedbackForm, '_blank', 'noopener,noreferrer');
    };

    const openVideos = () => {
        navigate('/videos');
    };

    return (
        <Box
            sx={{
                display: { md: 'flex', xs: open ? 'flex' : 'none' },
                flexDirection: 'column',
                height: `calc(100%)`,
                justifyContent: 'space-between',
            }}
        >
            <List
                component='div'
                disablePadding
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {appStore?.loginData?.services.map((item, index) => (
                    <Box key={item.categoryId}>
                        <If
                            condition={
                                item.standardCategoryId !==
                                StandardCategoryTypeUppercase.ENERGY_CATEGORY
                            }
                        >
                            <ButtonBase
                                onClick={() => {
                                    handleOnLeftMenuSubItemClicked(item);
                                }}
                                sx={{
                                    height: 50,
                                    backgroundColor:
                                        appStore.selectedCategory
                                            ?.standardCategoryId ===
                                        item.standardCategoryId
                                            ? '#00000010'
                                            : '#00000000',
                                    width: '100%',
                                }}
                            >
                                <Tooltip
                                    title={!open && item.displayName}
                                    placement='right'
                                    disableFocusListener
                                    disableInteractive
                                    arrow
                                >
                                    <ListItem>
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: 2,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <img
                                                alt='category icon'
                                                width={24}
                                                src={item.icon}
                                            />
                                        </ListItemIcon>
                                        <Typography>
                                            {open && item.displayName}
                                        </Typography>
                                    </ListItem>
                                </Tooltip>
                            </ButtonBase>
                        </If>
                        <Divider />
                    </Box>
                ))}
            </List>
            <List
                component='div'
                disablePadding
            >
                <Box>
                    <ButtonBase
                        onClick={openVideos}
                        sx={{
                            height: 50,
                            width: '100%',
                        }}
                    >
                        <Tooltip
                            title={!open && 'Videos'}
                            placement='right'
                            disableFocusListener
                            disableInteractive
                            arrow
                        >
                            <ListItem>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 2,
                                        alignItems: 'center',
                                    }}
                                >
                                    <VideoLibraryOutlinedIcon
                                        sx={{ fill: assets.colors.secondary }}
                                    />
                                </ListItemIcon>
                                <Typography>{open && 'Videos'}</Typography>
                            </ListItem>
                        </Tooltip>
                    </ButtonBase>
                    <ButtonBase
                        onClick={openFeedback}
                        sx={{
                            height: 50,
                            width: '100%',
                        }}
                    >
                        <Tooltip
                            title={!open && 'Feedback'}
                            placement='right'
                            disableFocusListener
                            disableInteractive
                            arrow
                        >
                            <ListItem>
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: 2,
                                        alignItems: 'center',
                                    }}
                                >
                                    <ContentPasteOutlinedIcon
                                        sx={{ fill: assets.colors.secondary }}
                                    />
                                </ListItemIcon>
                                <Typography>{open && 'Feedback'}</Typography>
                            </ListItem>
                        </Tooltip>
                    </ButtonBase>
                    <Divider />
                </Box>

                <Box>
                    <ButtonBase
                        onClick={() => setOpen(!open)}
                        sx={{
                            height: 50,
                            width: '100%',
                            display: { xs: 'none', md: 'block' },
                        }}
                    >
                        <ListItem>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: 2,
                                    alignItems: 'center',
                                }}
                            >
                                <If condition={open}>
                                    <ChevronLeftOutlined
                                        sx={{ fill: assets.colors.primary }}
                                    />
                                </If>
                                <IfNot condition={open}>
                                    <ChevronRightOutlined
                                        sx={{ fill: assets.colors.primary }}
                                    />
                                </IfNot>
                            </ListItemIcon>
                        </ListItem>
                    </ButtonBase>
                    <Divider />
                </Box>
            </List>
        </Box>
    );
}

export default SideBarMenus;
