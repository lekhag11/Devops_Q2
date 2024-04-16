import { Add, DragHandle } from '@mui/icons-material';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { assets } from 'src/assets/assets';
import { getMainPageWidth } from 'src/components/appNavBar/components/AppBarHelpers';
import SideBarDrawer from 'src/components/appNavBar/components/SideBarDrawer';
import FixedBar from 'src/components/fixedBar/FIxedBar';
import SubPageWrapper from 'src/components/helper/SubPageWrapper';
import If from 'src/components/logical/If';
import OfflineView from 'src/components/offlineView/OfflineView';
import SingleTotalView from 'src/components/totalComponents/SingleTotalView';
import WaterTank from 'src/components/waterTank/WaterTank';
import {
    LevelDataContext,
    LevelScreenDataProvider,
} from 'src/pages/home/dataProviders/LevelScreenDataProvider';
import { AppStoreContext } from 'src/store/AppStore';

function BuildUnitsView({ units, categoryData }) {
    return units.map((unit, index) => (
        <Box
            key={unit.unitId}
            sx={{ display: 'flex', mt: 2 }}
        >
            <Box
                sx={{
                    pr: 4,
                    pl: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: unit.online ? 1 : 0.5,
                }}
            >
                <Typography
                    fontSize={14}
                    sx={{
                        mb: 2,
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        flexGrow: 1,
                    }}
                >
                    {unit.displayName}
                </Typography>
                <WaterTank
                    key={unit.unitId}
                    maxHeight={150}
                    maxWidth={130}
                    text={`${unit.value1?.toFixed(1) ?? '--'} ${
                        categoryData['siUnit'] || ''
                    }`}
                    textView={!unit.online && <OfflineView />}
                    fontSize={22}
                    siUnit={categoryData['siUnit'] || ''}
                    percentage={
                        ((unit.value1?.toFixed(1) ?? 0) /
                            unit['meta']['maxCapacity']) *
                        100
                    }
                    percentageFontSize={18}
                    maxCapacity={
                        Math.round(unit['meta']['maxCapacity'] * 10) / 10
                    }
                />
                <Typography
                    fontSize={11}
                    mt={1}
                    mr={4}
                >
                    Last Update: {unit.lastUpdatedAt}
                </Typography>
            </Box>
            <If condition={index < units.length - 1}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <Divider
                        orientation='vertical'
                        flexItem
                        sx={{
                            borderColor: '#DDDDDD',
                            borderRightWidth: 2,
                            width: 11,
                            height: 0.45,
                            alignContent: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            justifyItems: 'center',
                        }}
                    />
                    <Add sx={{ width: 20 }} />
                    <Divider
                        orientation='vertical'
                        flexItem
                        sx={{
                            borderColor: '#DDDDDD',
                            borderRightWidth: 2,
                            width: 11,
                            height: 0.45,

                            alignContent: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            justifyItems: 'center',
                        }}
                    />
                </Box>
            </If>
        </Box>
    ));
}

function BuildAllCategoryAndUnits({ levelStore, categoryData }) {
    return (
        <Box sx={{ my: 4 }}>
            {levelStore.levelData.data?.subCategories?.map(
                (category, index) => (
                    <Grid
                        container
                        key={category.id}
                        sx={{
                            border: 1,
                            backgroundColor: 'white',
                            borderColor: assets.colors.borderColor,
                            borderWidth: 1,
                            p: 2,
                            my: 2,
                        }}
                    >
                        <Grid
                            item
                            md={2.5}
                            xs={12}
                        >
                            <Box
                                sx={{
                                    mx: 2,
                                    py: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    opacity: category.online ? 1 : 0.5,
                                    width: 200,
                                }}
                            >
                                <Typography
                                    display='flex'
                                    justifyContent='center'
                                    alignContent='center'
                                    fontWeight='500'
                                    fontSize={20}
                                    sx={{
                                        mb: 2,
                                        maxLines: 2,
                                        overflow: 'hidden',
                                    }}
                                >
                                    {category.displayName}
                                </Typography>
                                <WaterTank
                                    maxHeight={170}
                                    maxWidth={150}
                                    text={`${category.total1.toFixed(1)} ${
                                        categoryData['siUnit'] || ''
                                    }`}
                                    textView={
                                        !category.online && <OfflineView />
                                    }
                                    fontSize={22}
                                    siUnit={categoryData['siUnit'] || ''}
                                    maxCapacity={
                                        Math.round(
                                            _.reduce(
                                                category.units,
                                                function (r, v, k) {
                                                    return (
                                                        r +
                                                        v['meta']['maxCapacity']
                                                    );
                                                },
                                                0
                                            ) * 10
                                        ) / 10
                                    }
                                    percentage={
                                        (category.total1.toFixed(1) /
                                            _.reduce(
                                                category.units,
                                                function (r, v, k) {
                                                    return (
                                                        r +
                                                        v['meta']['maxCapacity']
                                                    );
                                                },
                                                0
                                            )) *
                                        100
                                    }
                                    percentageFontSize={18}
                                />
                            </Box>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={0.5}
                        >
                            <Box
                                sx={{
                                    flexDirection: 'column',
                                    display: { xs: 'none', md: 'flex' },
                                    height: 1,
                                    justifyContent: 'space-evenly',
                                }}
                            >
                                <Divider
                                    orientation='vertical'
                                    flexItem
                                    sx={{
                                        borderColor: '#DDDDDD',
                                        borderRightWidth: 2,
                                        width: 11,
                                        height: 0.45,
                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        justifyItems: 'center',
                                    }}
                                />
                                <DragHandle sx={{ width: 20 }} />
                                <Divider
                                    orientation='vertical'
                                    flexItem
                                    sx={{
                                        borderColor: '#DDDDDD',
                                        borderRightWidth: 2,
                                        width: 11,
                                        height: 0.45,

                                        alignContent: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        justifyItems: 'center',
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: { md: 'none', xs: 'flex' },
                                    justifyContent: 'space-evenly',
                                }}
                            >
                                <Divider
                                    flexItem
                                    sx={{
                                        borderColor: '#DDDDDD',
                                        borderBottomWidth: 2,
                                        width: 0.45,
                                        height: 13,
                                    }}
                                />
                                <DragHandle sx={{ width: 20 }} />
                                <Divider
                                    flexItem
                                    sx={{
                                        borderColor: '#DDDDDD',
                                        borderBottomWidth: 2,
                                        width: 0.45,
                                        height: 13,
                                    }}
                                />
                            </Box>
                        </Grid>

                        <Grid
                            item
                            md={9}
                            xs={12}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    overflowX: 'auto',
                                    py: 2,
                                }}
                            >
                                <BuildUnitsView
                                    units={category.units}
                                    categoryData={categoryData}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                )
            )}
        </Box>
    );
}

function SubHeadingView({ levelStore, categoryData, appStore }) {
    return (
        <Box sx={{ width: getMainPageWidth(appStore.sideBarOpen) }}>
            <Container sx={{ pb: 2 }}>
                <Typography
                    sx={{
                        fontSize: 24,
                        mt: 2,
                        mb: 1,
                        fontWeight: 500,
                    }}
                >
                    Water Stock
                </Typography>
                <SingleTotalView
                    title='Total Stock Availability'
                    value={`${levelStore.levelData.data.total1.toFixed(2)} ${
                        categoryData['siUnit'] || ''
                    }`}
                />
            </Container>
        </Box>
    );
}

function StockCategoryPage() {
    const { categoryId } = useParams();
    const appStore = useContext(AppStoreContext);

    const categoryData = appStore.loginData
        ? _.filter(appStore.loginData.services, { categoryId: categoryId })[0]
        : [];
    useEffect(() => {
        appStore.setMenuIconEnabled(true);
        appStore.setSelectedCategory(categoryData);
        // eslint-disable-next-line
    }, []);

    return (
        <SubPageWrapper>
            <SideBarDrawer
                open={appStore.sideBarOpen}
                setOpen={appStore.setSideBarOpen}
            />
            <Box sx={{ width: getMainPageWidth(appStore.sideBarOpen) }}>
                <LevelScreenDataProvider categoryId={categoryId}>
                    <LevelDataContext.Consumer value>
                        {(levelStore) => (
                            <FixedBar
                                bar={
                                    <SubHeadingView
                                        levelStore={levelStore}
                                        categoryData={categoryData}
                                        appStore={appStore}
                                    />
                                }
                            >
                                <Container>
                                    <BuildAllCategoryAndUnits
                                        levelStore={levelStore}
                                        categoryData={categoryData}
                                    />
                                </Container>
                            </FixedBar>
                        )}
                    </LevelDataContext.Consumer>
                </LevelScreenDataProvider>
            </Box>
        </SubPageWrapper>
    );
}

export default StockCategoryPage;
