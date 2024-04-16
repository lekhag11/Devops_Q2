import {
    Box,
    Container,
    Divider,
    Grid,
    Slider,
    Typography,
} from '@mui/material';
import _ from 'lodash';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppStoreContext } from 'src/store/AppStore';
import {
    QualityDataContext,
    QualityScreenDataProvider,
} from '../../dataProviders/QualityScreenDataProvider';
import {
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import OfflineView from 'src/components/offlineView/OfflineView';
import { assets } from 'src/assets/assets';
import moment from 'moment';
import SideBarDrawer from 'src/components/appNavBar/components/SideBarDrawer';
import { getMainPageWidth } from 'src/components/appNavBar/components/AppBarHelpers';
import FixedBar from 'src/components/fixedBar/FIxedBar';
import { DateFormatter } from 'src/utils/dateFormatter';
import SubPageWrapper from 'src/components/helper/SubPageWrapper';

const CustomTooltip = ({ active, payload, label, siUnit }) => {
    if (active && payload && payload.length) {
        return (
            <Box
                className='custom-tooltip'
                sx={{
                    backgroundColor: assets.colors.primary,
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                }}
            >
                {payload.map((entry, index) => (
                    <Typography
                        key={entry.value}
                        sx={{
                            display: 'flex',
                            fontWeight: 600,
                            color: 'white',
                            fontSize: 12,
                        }}
                    >
                        {`${entry.value}  ${siUnit}`}
                    </Typography>
                ))}
            </Box>
        );
    }

    return null;
};

function BuildUnitsView({ units, categoryData }) {
    return units.map((unit, index) => (
        <Box
            key={unit.unitId}
            sx={{ mb: 6, opacity: unit.online ? 1 : 0.5 }}
        >
            <Typography
                fontWeight='bold'
                fontSize={18}
                sx={{
                    mb: 2,
                    display: 'flex',
                    flexGrow: 1,
                    alignItems: 'center',
                }}
            >
                {unit.displayName}
                {!unit.online && <OfflineView restSx={{ mx: 2 }} />}
            </Typography>
            <CategoryHeadingView />

            {unit.meta.params.map((param) => {
                let min = unit.meta.min[param];
                let max = unit.meta.max[param];

                const total = max - min;

                const minPV = unit.meta.lowThreshold[param] - min;
                const minP = (minPV / total) * 100;

                const maxPV = unit.meta.highThreshold[param] - min;
                const maxP = (maxPV / total) * 100;

                const labels = _.map(unit.graph1, function (g) {
                    return {
                        label: DateFormatter.customFormatter(
                            g['x'],
                            'DD/MM/YYYY',
                            'DD MMM'
                        ),
                        value: g['y']?.[param]?.toFixed(2),
                    };
                });

                const CustomizedDot = (props) => {
                    const { cx, cy, value } = props;

                    if (
                        value < unit.meta.lowThreshold[param] ||
                        value > unit.meta.highThreshold[param]
                    ) {
                        return (
                            <svg
                                x={cx - 5}
                                y={cy - 5}
                                width={10}
                                height={10}
                                fill={assets.colors.red}
                                viewBox='0 0 1024 1024'
                            >
                                <circle
                                    cx='512'
                                    cy='512'
                                    r='450'
                                />
                            </svg>
                        );
                    }

                    return (
                        <svg
                            x={cx - 5}
                            y={cy - 5}
                            width={10}
                            height={10}
                            fill='green'
                            viewBox='0 0 1024 1024'
                        >
                            <circle
                                cx='512'
                                cy='512'
                                r='450'
                            />
                        </svg>
                    );
                };

                return (
                    <Box
                        key={`${unit.unitId}_${param}`}
                        sx={{
                            display: 'flex',

                            py: { xs: 0, md: 1 },
                            my: { xs: 2, md: 1 },
                            border: 1,
                            borderColor: assets.colors.borderColor,
                            backgroundColor: 'white',
                            alignItems: { lg: 'center' },
                            justifyContent: 'space-between',
                            flexDirection: { xs: 'column', lg: 'row' },
                        }}
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
                                lg={3}
                                sx={{}}
                            >
                                <Box
                                    sx={{
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: {
                                            xs: 'row',
                                            lg: 'column',
                                        },
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        fontWeight={600}
                                        fontSize={18}
                                    >
                                        {param}
                                    </Typography>
                                    <Typography
                                        fontWeight='bold'
                                        fontSize={24}
                                        color={
                                            unit.value1 &&
                                            (unit.value1[param] <
                                                unit.meta.lowThreshold[param] ||
                                                unit.value1[param] >
                                                    unit.meta.highThreshold[
                                                        param
                                                    ])
                                                ? assets.colors.red
                                                : assets.colors.green
                                        }
                                    >
                                        {unit.value1 &&
                                            `${unit.value1[param] ?? '--'} ${
                                                categoryData['siUnit']?.[
                                                    param
                                                ] || ''
                                            }`}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                lg: 'block',
                                            },
                                        }}
                                        fontSize={11}
                                        color='gray'
                                    >
                                        Last Update: {unit.lastUpdatedAt}
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                lg={0}
                                sx={{ my: 2, display: { lg: 'none' } }}
                            >
                                <Divider
                                    sx={{ background: '#F1F1F1', height: 1 }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                lg={4.5}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    my: { xs: 4, md: 2 },
                                }}
                            >
                                <Slider
                                    sx={{
                                        '& .MuiSlider-track': {
                                            background: 'red',
                                            borderColor: 'white',
                                            opacity: 0,
                                        },
                                        '& .MuiSlider-thumb': {
                                            height: 16,
                                            width: 2,
                                            borderRadius: 0,
                                            backgroundColor: 'black',
                                            '& span': {
                                                background: 'transparent',
                                                color: 'black',
                                                p: 0,
                                            },
                                        },
                                        '& .MuiSlider-mark': {
                                            background: 'none',
                                        },
                                        '& .MuiSlider-rail': {
                                            background: `linear-gradient(to right, ${
                                                unit.online
                                                    ? assets.colors.red
                                                    : 'gray'
                                            } 0% ${minP}%, ${
                                                unit.online
                                                    ? assets.colors.green
                                                    : 'gray'
                                            } ${minP}% ${maxP}%, ${
                                                unit.online
                                                    ? assets.colors.red
                                                    : 'gray'
                                            } ${maxP}% 100%)`,
                                            opacity: 1,
                                            height: 6,
                                            borderRadius: 0,
                                        },
                                        '& .MuiSlider-valueLabel': {},
                                        mx: 4,
                                    }}
                                    marks={[
                                        { value: min, label: min },
                                        {
                                            value: unit.meta.lowThreshold[
                                                param
                                            ],
                                            label: unit.meta.lowThreshold[
                                                param
                                            ],
                                        },
                                        {
                                            value: unit.meta.highThreshold[
                                                param
                                            ],
                                            label: unit.meta.highThreshold[
                                                param
                                            ],
                                        },
                                        { value: max, label: max },
                                    ]}
                                    valueLabelFormat={(x) =>
                                        `${x} ${
                                            categoryData['siUnit']?.[param] ||
                                            ''
                                        }`
                                    }
                                    valueLabelDisplay='on'
                                    value={unit?.value1[param]}
                                    min={min}
                                    max={max}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                lg={0}
                                sx={{ my: 2, display: { lg: 'none' } }}
                            >
                                <Divider
                                    sx={{ background: '#F1F1F1', height: 1 }}
                                />
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                lg={4.5}
                                height={80}
                                width={'100vh'}
                            >
                                <Box
                                    sx={{ mx: 4 }}
                                    height={80}
                                >
                                    <ResponsiveContainer
                                        width='100%'
                                        height='100%'
                                    >
                                        <LineChart
                                            width={'100%'}
                                            height={80}
                                            data={labels}
                                            margin={{
                                                top: 5,
                                                right: 20,
                                                left: 40,
                                                bottom: 5,
                                            }}
                                        >
                                            <YAxis
                                                min={min}
                                                max={max}
                                                hide
                                                domain={[
                                                    unit.meta.min[param],
                                                    unit.meta.max[param],
                                                ]}
                                            />
                                            <XAxis
                                                dataKey='label'
                                                fontWeight={700}
                                                interval={0}
                                                fontSize={9}
                                                tickSize={0}
                                                axisLine={false}
                                                tickMargin={12}
                                            />
                                            <Tooltip
                                                content={
                                                    <CustomTooltip
                                                        siUnit={
                                                            categoryData[
                                                                'siUnit'
                                                            ]?.[param]
                                                        }
                                                    />
                                                }
                                            ></Tooltip>
                                            <ReferenceLine
                                                y={
                                                    unit.meta.lowThreshold[
                                                        param
                                                    ]
                                                }
                                                stroke='black'
                                                label={{
                                                    value: unit.meta
                                                        .lowThreshold[param],
                                                    position: 'left',
                                                    fontSize: 11,
                                                }}
                                            />
                                            <ReferenceLine
                                                y={
                                                    unit.meta.highThreshold[
                                                        param
                                                    ]
                                                }
                                                stroke='black'
                                                label={{
                                                    value: unit.meta
                                                        .highThreshold[param],
                                                    position: 'left',
                                                    fontSize: 11,
                                                }}
                                            />
                                            <Line
                                                isAnimationActive={false}
                                                type='monotone'
                                                dataKey='value'
                                                stroke='black'
                                                dot={<CustomizedDot />}
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </Box>
                            </Grid>
                            <Grid
                                item
                                sx={{
                                    display: { xs: 'block', lg: 'none' },
                                    mx: 2,
                                }}
                            >
                                <Typography
                                    fontSize={11}
                                    color='gray'
                                >
                                    Last Update: {unit.lastUpdatedAt}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                );
            })}
        </Box>
    ));
}

function CategoryHeadingView() {
    return (
        <Box
            sx={{
                display: { xs: 'none', lg: 'flex' },
                border: 1,
                borderRadius: 1,
                borderColor: assets.colors.borderColor,
                borderBottomRightRadius: 1,
                borderBottomLeftRadius: 1,
                backgroundColor: '#F2F9FC',
                py: 1,
                justifyContent: 'space-between',
                px: 6,
                mb: 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 3,
                }}
            >
                <Typography fontWeight='600'>Parameter</Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: 3,
                }}
            >
                <Typography fontWeight='600'>Range</Typography>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: 2,
                }}
            ></Box>

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexGrow: 1,
                }}
            >
                <Typography fontWeight='600'>
                    7 Days Trend (
                    {moment(new Date()).subtract(7, 'day').format('DD MMM')} -{' '}
                    {moment(new Date()).subtract(1, 'day').format('DD MMM')})
                </Typography>
            </Box>
        </Box>
    );
}

function BuildAllCategoryAndUnits({ qualityStore, categoryData }) {
    return (
        <Box sx={{ my: 4 }}>
            {qualityStore?.qualityData?.data?.subCategories.map((category) => (
                <Box
                    key={category.id}
                    sx={{
                        alignItems: { lg: 'flex-end' },
                        my: 4,
                        flexDirection: { xs: 'column', lg: 'row' },
                    }}
                >
                    {qualityStore.qualityData.data.subCategories.length > 1 && (
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
            ))}
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
                    Water Quality
                </Typography>
            </Container>
        </Box>
    );
}

function QualityPage() {
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
                <QualityScreenDataProvider categoryId={categoryId}>
                    <QualityDataContext.Consumer value>
                        {(qualityStore) => (
                            <FixedBar
                                bar={<SubHeadingView appStore={appStore} />}
                            >
                                <Container>
                                    <BuildAllCategoryAndUnits
                                        qualityStore={qualityStore}
                                        categoryData={categoryData}
                                    />
                                </Container>
                            </FixedBar>
                        )}
                    </QualityDataContext.Consumer>
                </QualityScreenDataProvider>
            </Box>
        </SubPageWrapper>
    );
}

export default QualityPage;
