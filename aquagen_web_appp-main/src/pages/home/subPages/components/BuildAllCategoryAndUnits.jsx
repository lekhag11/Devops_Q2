import { useContext, useState } from 'react';
import {
    Box,
    Divider,
    ListItem,
    ListItemText,
    Link,
    ButtonBase,
    Typography,
    Tooltip,
} from '@mui/material';
import { CloudOff } from '@mui/icons-material';
import If from 'src/components/logical/If';
import { Formatter } from 'src/utils/formatter';
import GenericInfo from 'src/components/info/GenericInfo';
import { assets } from 'src/assets/assets';
import { ClickableGraphDataContext } from 'src/pages/home/dataProviders/ClickableGraphDataProvider';
import GraphComponent from 'src/pages/home/subPages/components/GraphComponent';
import { useNavigate } from 'react-router-dom';

// List of all the individual Units on Right Side
const UnitList = ({
    consumptionStore,
    category,
    categoryData,
    mainColor = assets.colors.secondary,
    comparisonColor = assets.colors.primary,
    navigateToDetailsPage,
}) => {
    const handleIndividualUnitClick = (unitId) => {
        navigateToDetailsPage(category?.id, unitId);
    };

    return (
        <>
            <ListItem
                sx={{ paddingRight: '0px', alignItems: 'flex-end', pt: '4px' }}
            >
                <ListItemText
                    primaryTypographyProps={{
                        fontSize: '18px',
                        fontWeight: '500',
                    }}
                >
                    Units
                </ListItemText>
                <ListItemText
                    sx={{
                        textAlign: 'right',
                        paddingRight: '0px',
                    }}
                >
                    <ButtonBase
                        onClick={() =>
                            navigateToDetailsPage(
                                category?.id,
                                category?.units[0]?.unitId
                            )
                        }
                    >
                        <Link
                            sx={{
                                color: 'black',
                                textDecorationColor: 'black',
                                padding: '8px',
                                fontSize: '14px',
                                textWrap: 'nowrap',
                            }}
                        >
                            See all Units {'>'}
                        </Link>
                    </ButtonBase>
                </ListItemText>
            </ListItem>
            <Box
                sx={{
                    height: '250px',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                }}
            >
                {category.units.map((unit) => {
                    return (
                        <Box key={unit.unitId}>
                            <ButtonBase
                                sx={{ width: '100%' }}
                                onClick={() =>
                                    handleIndividualUnitClick(unit.unitId)
                                }
                            >
                                <ListItem
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}
                                    key={unit.unitId}
                                >
                                    <Tooltip
                                        title={unit.displayName}
                                        disableFocusListener
                                        disableInteractive
                                        arrow
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                color: assets.colors.grey,
                                                wordBreak: 'break-word',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                display: '-webkit-box',
                                                WebkitLineClamp: '2',
                                                WebkitBoxOrient: 'vertical',
                                            }}
                                        >
                                            {unit.displayName}
                                        </Typography>
                                    </Tooltip>
                                    <Box
                                        sx={{
                                            textAlign: 'right',
                                            textWrap: 'nowrap',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontSize: 14,
                                                color: mainColor,
                                                fontWeight: '600',
                                                textWrap: 'nowrap',
                                            }}
                                        >
                                            {Formatter.valueFormatter(
                                                unit.value1,
                                                0,
                                                undefined,
                                                !unit.online ? '--' : undefined
                                            )}{' '}
                                            {categoryData.siUnit}
                                        </Typography>
                                        <If
                                            condition={
                                                consumptionStore.comparisonMode
                                            }
                                        >
                                            <Typography
                                                fontSize={14}
                                                color={comparisonColor}
                                                fontWeight={600}
                                            >
                                                {Formatter.valueFormatter(
                                                    unit.value2,
                                                    0,
                                                    undefined,
                                                    !unit.online
                                                        ? '--'
                                                        : undefined
                                                )}{' '}
                                                {categoryData.siUnit}
                                            </Typography>
                                        </If>
                                    </Box>
                                </ListItem>
                            </ButtonBase>
                            <Divider variant='middle' />
                        </Box>
                    );
                })}
            </Box>
        </>
    );
};

// Individual Total Unit with unit list
const IndividualUnit = ({
    consumptionStore,
    category,
    labelData,
    categoryData,
    mainColor = assets.colors.secondary,
    comparisonColor = assets.colors.primary,
}) => {
    // eslint-disable-next-line
    const [graphPopupOpen, setGraphPopupOpen] = useState(false);
    // eslint-disable-next-line
    const clickableGraphStore = useContext(ClickableGraphDataContext);

    // eslint-disable-next-line
    function handleClickableGraphPopup(val) {
        // TODO : clickable Graph Feature uncomment below code
        // clickableGraphStore.setLoading(true);
        // if (labelData.type !== ConsumptionDataType.HOURS) {
        //     clickableGraphStore.setParams(
        //         BarClick.handleBarClick(labelData, val)
        //     );
        //     setGraphPopupOpen(false);
        // }
    }

    const navigate = useNavigate();

    const navigateToDetailsPage = (detailCategoryId, unitId) => {
        navigate(`./${detailCategoryId}/${unitId}`);
    };

    return (
        <Box
            id={category.id}
            sx={{
                border: `1px solid ${assets.colors.divider}`,
                padding: '8px',
                display: { xs: 'block', md: 'flex' },
                justifyContent: 'space-between',
                marginBottom: '32px',
                background: '#fff',
            }}
        >
            <GraphComponent
                consumptionStore={consumptionStore}
                comparisonMode={consumptionStore.comparisonMode}
                category={category}
                categoryData={categoryData}
                labelData={consumptionStore.consumptionData.labelData}
                mainColor={mainColor}
                comparisonColor={comparisonColor}
                startAdorment={
                    <ButtonBase
                        sx={{
                            textDecoration: 'underline',
                            height: 'fit-Content',
                            fontSize: '13px',
                            textWrap: 'nowrap',
                            position: 'absolute',
                            display: { md: 'none' },
                            top: { xs: '0px', sm: '16px' },
                            right: '16px',
                            zIndex: '1',
                        }}
                        onClick={() =>
                            navigateToDetailsPage(
                                category?.id,
                                category?.units[0]?.unitId
                            )
                        }
                    >
                        See All Units {'>'}
                    </ButtonBase>
                }
            />
            <Box
                key={category.id}
                sx={{
                    flexGrow: 1,
                    flexBasis: '300px',
                    display: { xs: 'none', md: 'block' },
                    borderLeft: `1px solid ${assets.colors.divider}`,
                }}
            >
                <UnitList
                    consumptionStore={consumptionStore}
                    category={category}
                    categoryData={categoryData}
                    mainColor={mainColor}
                    comparisonColor={comparisonColor}
                    navigateToDetailsPage={navigateToDetailsPage}
                />
            </Box>
        </Box>
    );
};

const BuildAllCategoryAndUnits = ({
    consumptionStore,
    categoryData,
    mainColor = assets.colors.secondary,
    comparisonColor = assets.colors.primary,
}) => {
    // Individual category card
    if (consumptionStore.consumptionData.data?.subCategories) {
        return consumptionStore.consumptionData.data.subCategories.map(
            (category) => (
                <Box key={category.id}>
                    <IndividualUnit
                        consumptionStore={consumptionStore}
                        category={category}
                        labelData={consumptionStore.consumptionData.labelData}
                        categoryData={categoryData}
                        mainColor={mainColor}
                        comparisonColor={comparisonColor}
                    />
                </Box>
            )
        );
    } else {
        return (
            <GenericInfo
                height='200px'
                title={<CloudOff fontSize={'large'} />}
                subTitle={'Data Not Found'}
                subTitleFontSize={20}
            />
        );
    }
};

export default BuildAllCategoryAndUnits;
