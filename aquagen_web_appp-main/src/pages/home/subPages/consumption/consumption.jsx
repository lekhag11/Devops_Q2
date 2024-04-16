import { Box, Container, IconButton, Typography } from '@mui/material';

import { useContext, useEffect } from 'react';
import { AppStoreContext } from 'src/store/AppStore';
import {
    WaterConsumptionDataContext,
    WaterConsumptionScreenDataProvider,
} from 'src/pages/home/dataProviders/WaterConsumptionDataProvider';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';

import BuildAllCategoryAndUnits from 'src/pages/home/subPages/components/BuildAllCategoryAndUnits';
import CustomLoader from 'src/components/loader/loader';
import If from 'src/components/logical/If';
import IfNot from 'src/components/logical/IfNot';
import {
    ClickableGraphDataContext,
    ClickableGraphDataProvider,
} from 'src/pages/home/dataProviders/ClickableGraphDataProvider';
import Expanded from 'src/components/helper/Expanded';
import SideBarDrawer from 'src/components/appNavBar/components/SideBarDrawer';
import { getMainPageWidth } from 'src/components/appNavBar/components/AppBarHelpers';
import ComparisonHeader from '../components/ComparisonHeader';
import FixedBar from 'src/components/fixedBar/FIxedBar';
import { ArrowBack } from '@mui/icons-material';
import SubPageWrapper from 'src/components/helper/SubPageWrapper';

function SubHeadingView({ store }) {
    const { detailCategoryId } = useParams();

    const navigate = useNavigate();

    const elementData = _.find(store.consumptionData?.data?.subCategories, {
        id: detailCategoryId,
    });

    if (detailCategoryId) {
        return (
            <Container sx={{ py: 1 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                    }}
                >
                    <IconButton
                        sx={{
                            color: 'black',
                            paddingLeft: 0,
                        }}
                        onClick={() => navigate('./')}
                    >
                        <ArrowBack fontSize='medium' />
                    </IconButton>

                    <Typography
                        sx={{
                            fontSize: 20,
                            fontWeight: 500,
                            ml: 1,
                        }}
                    >
                        {elementData?.displayName}
                    </Typography>
                </Box>
                <ComparisonHeader consumptionStore={store} />
            </Container>
        );
    }

    return (
        <Container sx={{ pb: 2 }}>
            <Typography
                sx={{
                    fontSize: 24,
                    mt: 2,
                    mb: 1,
                    fontWeight: 500,
                    marginTop: {
                        xs: '56px',
                        sm: 1,
                    },
                }}
            >
                Consumption Categories
            </Typography>
            <ComparisonHeader consumptionStore={store} />
        </Container>
    );
}

function SourceCategoryPage() {
    // eslint-disable-next-line
    const { categoryId, detailCategoryId, unitId } = useParams();
    const appStore = useContext(AppStoreContext);
    const categoryData = appStore.loginData
        ? _.filter(appStore.loginData.services, {
              categoryId: categoryId,
          })[0]
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
            <Box
                sx={{
                    width: getMainPageWidth(appStore.sideBarOpen),
                }}
            >
                {/* TODO : Consumption Components should be inside Consumption Folder */}
                {/* TODO : Confirm Do we need Refresh Time for the Consummption Page */}
                <WaterConsumptionScreenDataProvider categoryId={categoryId}>
                    <WaterConsumptionDataContext.Consumer value>
                        {(waterConsumptionStore) => (
                            <FixedBar
                                width={getMainPageWidth(appStore.sideBarOpen)}
                                bar={
                                    <SubHeadingView
                                        store={waterConsumptionStore}
                                    />
                                }
                            >
                                <If condition={detailCategoryId}>
                                    <Outlet />
                                </If>
                                <IfNot condition={detailCategoryId}>
                                    <Container>
                                        <ClickableGraphDataProvider
                                            categoryId={categoryId}
                                        >
                                            <ClickableGraphDataContext.Consumer
                                                value
                                            >
                                                {(clickableGraphStore) => (
                                                    <IfNot
                                                        condition={
                                                            waterConsumptionStore.loading
                                                        }
                                                    >
                                                        <BuildAllCategoryAndUnits
                                                            consumptionStore={
                                                                waterConsumptionStore
                                                            }
                                                            mainColor={
                                                                waterConsumptionStore
                                                                    .consumptionData
                                                                    .colors
                                                                    ?.mainColor
                                                            }
                                                            comparisonColor={
                                                                waterConsumptionStore
                                                                    .consumptionData
                                                                    .colors
                                                                    ?.comparisonColor
                                                            }
                                                            categoryData={
                                                                categoryData
                                                            }
                                                            comparisonMode={
                                                                waterConsumptionStore.comparisonMode
                                                            }
                                                        />
                                                    </IfNot>
                                                )}
                                            </ClickableGraphDataContext.Consumer>
                                        </ClickableGraphDataProvider>

                                        <If
                                            condition={
                                                waterConsumptionStore.loading
                                            }
                                        >
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
                                    </Container>
                                </IfNot>
                            </FixedBar>
                        )}
                    </WaterConsumptionDataContext.Consumer>
                </WaterConsumptionScreenDataProvider>
            </Box>
        </SubPageWrapper>
    );
}

export default SourceCategoryPage;
