import React, { useContext, useEffect, useState } from 'react';
import { Box, ButtonBase, Container } from '@mui/material';
import { assets } from 'src/assets/assets';
import GraphComponent from 'src/pages/home/subPages/components/GraphComponent';
import PieChartWithComparison from 'src/pages/home/subPages/components/PieChartWithComparison';
import Units from 'src/pages/home/subPages/components/Units';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate, useParams } from 'react-router-dom';
import { WaterConsumptionDataContext } from 'src/pages/home/dataProviders/WaterConsumptionDataProvider';
import { AppStoreContext } from 'src/store/AppStore';
import _ from 'lodash';
import { StandardCategoryType } from 'src/enums/categoryType';
import { EnergyConsumptionDataContext } from 'src/pages/home/dataProviders/EnergyConsumptionDataProvider';
import If from 'src/components/logical/If';
import Expanded from 'src/components/helper/Expanded';
import CustomLoader from 'src/components/loader/loader';
import { getMainPageWidth } from 'src/components/appNavBar/components/AppBarHelpers';

// eslint-disable-next-line
const CollapseButton = ({ onClick, isCollapse }) => {
    return (
        <ButtonBase onClick={onClick}>
            <KeyboardArrowDownIcon
                fontSize='large'
                sx={{
                    marginTop: '-5px',
                    rotate: `${isCollapse ? '0deg' : '180deg'}`,
                }}
            />
        </ButtonBase>
    );
};

const Details = ({
    consumptionStore,
    elementData,
    categoryData,
    selectedUnit,
    setSelectedUnit,
    handleUnitChange,
}) => {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    gap: '12px',
                    height: 'fit-Content',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#FFFFFF',
                        border: `1px solid ${assets.colors.divider}`,
                        flexBasis: '500px',
                        flexGrow: 3,
                        overflow: 'hidden',
                    }}
                >
                    <GraphComponent
                        consumptionStore={consumptionStore}
                        comparisonMode={consumptionStore.comparisonMode}
                        category={elementData}
                        categoryData={categoryData}
                        labelData={consumptionStore.consumptionData.labelData}
                        mainColor={
                            consumptionStore.consumptionData.colors?.mainColor
                        }
                        comparisonColor={
                            consumptionStore.consumptionData.colors
                                ?.comparisonColor
                        }
                        //TODO Please revert this when UI is fixed for collapsed view
                        // isCollapse={isCollapse}
                        isCollapse={false}
                        // endAdorment={
                        //     <CollapseButton
                        //         onClick={handleGraphCollapse}
                        //         isCollapse={isCollapse}
                        //     />
                        // }
                    />
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        backgroundColor: '#FFFFFF',
                        border: `1px solid ${assets.colors.divider}`,
                        flexBasis: '300px',
                        flexGrow: 1,
                    }}
                >
                    <PieChartWithComparison
                        units={elementData?.units}
                        comparisonMode={consumptionStore.comparisonMode}
                        labelData={consumptionStore.consumptionData.labelData}
                        siUnit={consumptionStore?.consumptionData?.siUnit}
                        mainColor={
                            consumptionStore.consumptionData.colors?.mainColor
                        }
                        comparisonColor={
                            consumptionStore.consumptionData.colors
                                ?.comparisonColor
                        }
                    />
                </Box>
            </Box>
            <Box sx={{ position: 'relative', zIndex: '1', mt: 4 }}>
                <Units
                    consumptionStore={consumptionStore}
                    category={elementData}
                    categoryData={categoryData}
                    labelData={consumptionStore.consumptionData.labelData}
                    mainColor={
                        consumptionStore.consumptionData.colors?.mainColor
                    }
                    comparisonColor={
                        consumptionStore.consumptionData.colors?.comparisonColor
                    }
                    selectedUnit={selectedUnit}
                    setSelectedUnit={setSelectedUnit}
                    handleUnitChange={handleUnitChange}
                />
            </Box>
        </>
    );
};

const ConsumptionDetail = () => {
    const { categoryId, detailCategoryId, unitId } = useParams();

    const context =
        StandardCategoryType[categoryId] ===
        StandardCategoryType['SOURCE_CATEGORY']
            ? WaterConsumptionDataContext
            : EnergyConsumptionDataContext;
    const navigate = useNavigate();

    const consumptionStore = useContext(context);

    const appStore = useContext(AppStoreContext);

    const categoryData = appStore.loginData
        ? _.filter(appStore.loginData.services, {
              categoryId: categoryId,
          })[0]
        : [];

    const elementData = _.find(
        consumptionStore.consumptionData?.data?.subCategories,
        {
            id: detailCategoryId,
        }
    );

    const [selectedUnit, setSelectedUnit] = useState();
    const [isCollapse, setIsCollapse] = useState(true);

    // eslint-disable-next-line
    const handleGraphCollapse = () => {
        setIsCollapse(!isCollapse);
    };

    useEffect(() => {
        setSelectedUnit(unitId);
        // eslint-disable-next-line
    }, []);

    const handleUnitChange = (event, newValue) => {
        if (newValue) {
            setSelectedUnit(newValue);
            navigate(`./../${newValue}`);
        }
    };

    return (
        <Container sx={{ my: 2 }}>
            <If condition={consumptionStore.loading || !elementData}>
                <Expanded
                    extraSx={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '90vh',
                        width: getMainPageWidth(),
                    }}
                >
                    <CustomLoader />
                </Expanded>
            </If>
            <If condition={!consumptionStore.loading && elementData}>
                <Details
                    consumptionStore={consumptionStore}
                    elementData={elementData}
                    categoryData={categoryData}
                    selectedUnit={selectedUnit}
                    setSelectedUnit={setSelectedUnit}
                    handleUnitChange={handleUnitChange}
                />
            </If>
        </Container>
    );
};

export default ConsumptionDetail;
