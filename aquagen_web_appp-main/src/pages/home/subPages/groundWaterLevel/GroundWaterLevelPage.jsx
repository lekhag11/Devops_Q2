import {
    Box,
    Container,
    Divider,
    Grid,
    Typography,
    useMediaQuery,
} from '@mui/material';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppStoreContext } from 'src/store/AppStore';
import {
    GroundWaterLevelDataContext,
    GroundWaterLevelScreenDataProvider,
} from 'src/pages/home/dataProviders/GroundWaterLevelDataProvider';
import {
    Label,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { useTheme } from '@emotion/react';
import OfflineView from 'src/components/offlineView/OfflineView';
import { Formatter } from 'src/utils/formatter';
import SideBarDrawer from 'src/components/appNavBar/components/SideBarDrawer';
import { getMainPageWidth } from 'src/components/appNavBar/components/AppBarHelpers';
import FixedBar from 'src/components/fixedBar/FIxedBar';
import SubPageWrapper from 'src/components/helper/SubPageWrapper';

const CustomTooltip = ({ active, payload, label, siUnit }) => {
    if (active && payload && payload.length) {
        return (
            <Box className='custom-tooltip'>
                {payload.map((entry, index) => (
                    <Typography
                        key={index}
                        sx={{ display: 'flex', fontWeight: 500 }}
                    >
                        {`${Formatter.valueFormatter(
                            entry.value,
                            undefined,
                            2
                        )}  ${siUnit}`}
                    </Typography>
                ))}
            </Box>
        );
    }

    return null;
};

function BuildUnitsView({ units, categoryData }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return units.map((unit, index) => (
        <Box
            key={unit.unitId}
            sx={{ mb: 6, border: 1, display: 'flex', backgroundColor: 'white' }}
        >
            <Grid
                container
                columnSpacing={1}
                sx={{
                    py: 2,
                }}
            >
                <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                        py: 2,
                        height: '200px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        opacity: unit.online ? 1 : 0.5,
                    }}
                >
                    <Typography
                        fontWeight='bold'
                        fontSize={22}
                        sx={{
                            display: 'flex',
                            mx: 4,
                        }}
                    >
                        {unit.displayName}
                        {!unit.online && <OfflineView />}
                    </Typography>
                    <Typography
                        fontWeight='bold'
                        fontSize={38}
                        sx={{
                            mx: 4,
                        }}
                    >
                        {`${unit.value1?.toFixed(2) ?? '--'} ${
                            categoryData['siUnit'] || ''
                        }`}
                    </Typography>
                    <Typography
                        color={'gray'}
                        fontSize={14}
                        fontWeight={500}
                        sx={{ mx: 4 }}
                    >
                        Last Update: {unit.lastUpdatedAt}
                    </Typography>
                </Grid>
                <Divider
                    orientation='vertical'
                    flexItem
                    sx={{
                        backgroundColor: '#AAAAAA',
                        width: '1px',
                        display: { xs: 'none', md: 'block' },
                    }}
                />
                <Grid
                    item
                    xs={12}
                    md={7}
                    width={'100vh'}
                    sx={{
                        opacity: unit.online ? 1 : 0.5,
                    }}
                >
                    <Divider
                        sx={{
                            my: { xs: 4, md: 0 },
                            mx: 2,
                            backgroundColor: '#AAAAAA',
                            height: '1x',
                            display: { xs: 'block', md: 'none' },
                        }}
                    />
                    <Box height={200}>
                        <ResponsiveContainer
                            width='100%'
                            height='100%'
                        >
                            <LineChart
                                width={'100%'}
                                data={unit.graph1}
                                margin={{
                                    right: fullScreen ? 45 : 5,
                                }}
                            >
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    fontSize={9}
                                >
                                    <Label
                                        angle={270}
                                        value={'MWC'}
                                        fontSize={14}
                                    />
                                </YAxis>
                                <XAxis
                                    fontWeight={700}
                                    interval={0}
                                    fontSize={9}
                                    tickSize={4}
                                    tickMargin={12}
                                    dataKey='x'
                                />
                                <Tooltip
                                    content={
                                        <CustomTooltip
                                            siUnit={
                                                categoryData['siUnit'] || ''
                                            }
                                        />
                                    }
                                ></Tooltip>
                                <Line
                                    isAnimationActive={false}
                                    type='monotone'
                                    dataKey='y'
                                    stroke='black'
                                    dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    ));
}

function BuildAllCategoryAndUnits({ groundWaterStore, categoryData }) {
    return (
        <Box sx={{ my: 4 }}>
            {groundWaterStore.groundWaterData.data?.subCategories?.map(
                (category) => (
                    <Box
                        key={category.displayName}
                        sx={{
                            alignItems: { md: 'flex-end' },
                            my: 4,
                            flexDirection: { xs: 'column', md: 'row' },
                        }}
                    >
                        {groundWaterStore.groundWaterData.data.subCategories
                            .length > 1 && (
                            <Typography
                                display='flex'
                                justifyContent='center'
                                alignContent='center'
                                fontWeight='500'
                                fontSize={20}
                                sx={{
                                    mb: 2,
                                    maxLines: 1,
                                    overflow: 'hidden',
                                }}
                            >
                                {category.displayName}
                            </Typography>
                        )}

                        <BuildUnitsView
                            units={category.units}
                            categoryData={categoryData}
                        />
                    </Box>
                )
            )}
        </Box>
    );
}

function SubHeadingView({ appStore }) {
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
                    Ground Water Level
                </Typography>
            </Container>
        </Box>
    );
}

function GroundWaterLevelPage() {
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
                <GroundWaterLevelScreenDataProvider categoryId={categoryId}>
                    <GroundWaterLevelDataContext.Consumer value>
                        {(groundWaterStore) => (
                            <FixedBar
                                bar={<SubHeadingView appStore={appStore} />}
                            >
                                <Container>
                                    <BuildAllCategoryAndUnits
                                        groundWaterStore={groundWaterStore}
                                        categoryData={categoryData}
                                    />
                                </Container>
                            </FixedBar>
                        )}
                    </GroundWaterLevelDataContext.Consumer>
                </GroundWaterLevelScreenDataProvider>
            </Box>
        </SubPageWrapper>
    );
}

export default GroundWaterLevelPage;
