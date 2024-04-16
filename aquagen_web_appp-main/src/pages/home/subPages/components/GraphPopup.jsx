import React, { useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    ButtonBase,
    Dialog,
    DialogActions,
    DialogContent,
    Typography,
} from '@mui/material';
import _ from 'lodash';
import CloseIcon from '@mui/icons-material/Close';
import GraphHeader from 'src/pages/home/subPages/components/GraphHeader';
import BarGraph from 'src/components/barGraph/BarGraph';
import { assets } from 'src/assets/assets';
import { getBarGraphData } from 'src/utils/graphData';
import { AppStoreContext } from 'src/store/AppStore';
import { ClickableGraphDataContext } from 'src/pages/home/dataProviders/ClickableGraphDataProvider';
import IfNot from 'src/components/logical/IfNot';
import If from 'src/components/logical/If';
import CustomLoader from 'src/components/loader/loader';
import UndoIcon from '@mui/icons-material/Undo';
import { BarClick } from 'src/utils/barClick';
import { ConsumptionDataType } from 'src/enums/consumptionDataType';

const PopupContent = ({
    categoryData,
    element,
    mainColor,
    comparisonColor,
}) => {
    const clickableGraphStore = useContext(ClickableGraphDataContext);

    const prevParams = useRef({
        date1: clickableGraphStore?.graphData.labelData.date1,
        type: clickableGraphStore?.graphData.labelData.type,
        category: clickableGraphStore?.graphData.labelData.category,
    });

    const handleClickableGraphPopup = (val) => {
        clickableGraphStore.setLoading(true);
        const params = BarClick.handleBarClick(
            clickableGraphStore?.graphData?.labelData,
            val
        );

        if (
            clickableGraphStore?.graphData?.params !== ConsumptionDataType.HOURS
        ) {
            clickableGraphStore.setParams(params);
            if (!clickableGraphStore.paramStack.current) {
                clickableGraphStore.paramStack.current = [];
            }
            clickableGraphStore.paramStack.current = [
                ...clickableGraphStore.paramStack.current,
                prevParams.current,
            ];
            prevParams.current = params;
        }
    };

    const handleGraphBackOption = () => {
        if (clickableGraphStore.paramStack.current.length > 0) {
            clickableGraphStore.setLoading(true);
            let backParams = clickableGraphStore.paramStack.current.pop();
            if (backParams) {
                clickableGraphStore.setParams(backParams);
            }
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <GraphHeader
                    category={element}
                    mainColor={mainColor}
                    comparisonColor={comparisonColor}
                    categoryData={categoryData}
                    labelData={clickableGraphStore?.graphData?.labelData}
                    mainValue={`${element?.value1 || element?.total1} ${
                        categoryData.siUnit
                    }`}
                />
                <ButtonBase
                    sx={{
                        marginTop: '10px',
                        '&.Mui-disabled ': {
                            color: assets.colors.divider,
                        },
                    }}
                    disabled={
                        clickableGraphStore.paramStack.current.length === 0
                    }
                    onClick={handleGraphBackOption}
                >
                    <UndoIcon fontSize='small' />
                    <Typography
                        component={'span'}
                        sx={{ textDecoration: 'underline' }}
                    >
                        Back
                    </Typography>
                </ButtonBase>
            </Box>
            <Box
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    height: '240px',
                }}
            >
                <BarGraph
                    data={getBarGraphData(element)}
                    xAxisLabel={
                        clickableGraphStore.graphData.labelData?.label ||
                        clickableGraphStore.graphData.labelData?.type
                    }
                    siUnit={clickableGraphStore.graphData.labelData?.siUnit}
                    mainColor={mainColor}
                    comparisonColor={comparisonColor}
                    onBarDoubleClick={
                        clickableGraphStore?.clickableGraphDataType.current !==
                        ConsumptionDataType.HOURS
                            ? handleClickableGraphPopup
                            : null
                    }
                    marginObject={{ left: -10 }}
                />
            </Box>
        </>
    );
};

const GraphPopup = ({
    mainColor,
    comparisonColor,
    // TODO : clickable graph feature remove false
    graphPopupOpen = false,
    setGraphPopupOpen,
}) => {
    const { categoryId } = useParams();
    const appStore = useContext(AppStoreContext);
    const categoryData = appStore.loginData
        ? _.filter(appStore.loginData.services, { categoryId: categoryId })[0]
        : [];

    const clickableGraphStore = useContext(ClickableGraphDataContext);

    useEffect(() => {
        appStore.setSelectedCategory(categoryData);
        // eslint-disable-next-line
    }, []);

    const handleClose = () => {
        clickableGraphStore.unitGraphElementId.current = undefined;
        clickableGraphStore.categoryGraphElementId.current = undefined;
        clickableGraphStore.paramStack.current = [];
        setGraphPopupOpen(false);
    };

    return (
        <>
            <Dialog
                maxWidth={'md'}
                open={graphPopupOpen}
                scroll={'paper'}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
                fullWidth
            >
                <DialogContent sx={{ padding: '4px 20px 20px' }}>
                    <DialogActions
                        onClick={handleClose}
                        sx={{ paddingRight: '0px' }}
                    >
                        <ButtonBase>
                            <CloseIcon />
                        </ButtonBase>
                    </DialogActions>

                    <Box
                        sx={{
                            position: 'relative',
                            borderRadius: '4px',
                            border: `1px solid ${assets.colors.divider}`,
                            overflow: 'hidden',
                            minHeight: '300px',
                            padding: '0px 20px 20px',
                        }}
                    >
                        <IfNot condition={clickableGraphStore.loading}>
                            <PopupContent
                                element={clickableGraphStore.elementData}
                                mainColor={mainColor}
                                comparisonColor={comparisonColor}
                                categoryData={categoryData}
                            />
                        </IfNot>
                        <If condition={clickableGraphStore.loading}>
                            <Box
                                width={'xl'}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '324px',
                                }}
                            >
                                <CustomLoader />
                            </Box>
                        </If>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};
export default GraphPopup;
