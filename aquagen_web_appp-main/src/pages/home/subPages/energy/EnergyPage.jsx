import { Box, Container, IconButton, Typography } from '@mui/material';

import { useContext, useEffect } from 'react';
import { AppStoreContext } from 'src/store/AppStore';
import {
    EnergyConsumptionDataContext,
    EnergyConsumptionScreenDataProvider,
} from 'src/pages/home/dataProviders/EnergyConsumptionDataProvider';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';

import BuildAllCategoryAndUnits from 'src/pages/home/subPages/components/BuildAllCategoryAndUnits';
import ComparisonHeader from 'src/pages/home/subPages/components/ComparisonHeader';
import CustomLoader from 'src/components/loader/loader';
import If from 'src/components/logical/If';
import IfNot from 'src/components/logical/IfNot';
import {
    ClickableGraphDataContext,
    ClickableGraphDataProvider,
} from 'src/pages/home/dataProviders/ClickableGraphDataProvider';
import { getMainPageWidth } from 'src/components/appNavBar/components/AppBarHelpers';
import FixedBar from 'src/components/fixedBar/FIxedBar';
import { ArrowBack } from '@mui/icons-material';
import Expanded from 'src/components/helper/Expanded';
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
                Energy Categories
            </Typography>
            <ComparisonHeader consumptionStore={store} />
        </Container>
    );
}

function EnergyPage() {
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
            <Box sx={{ width: '100%' }}>
                <EnergyConsumptionScreenDataProvider categoryId={categoryId}>
                    <EnergyConsumptionDataContext.Consumer value>
                        {(energyConsumptionStore) => (
                            <FixedBar
                                width={'100%'}
                                bar={
                                    <SubHeadingView
                                        store={energyConsumptionStore}
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
                                                            energyConsumptionStore.loading
                                                        }
                                                    >
                                                        <BuildAllCategoryAndUnits
                                                            consumptionStore={
                                                                energyConsumptionStore
                                                            }
                                                            mainColor={
                                                                energyConsumptionStore
                                                                    .consumptionData
                                                                    .colors
                                                                    ?.mainColor
                                                            }
                                                            comparisonColor={
                                                                energyConsumptionStore
                                                                    .consumptionData
                                                                    .colors
                                                                    ?.comparisonColor
                                                            }
                                                            categoryData={
                                                                categoryData
                                                            }
                                                            comparisonMode={
                                                                energyConsumptionStore.comparisonMode
                                                            }
                                                        />
                                                    </IfNot>
                                                )}
                                            </ClickableGraphDataContext.Consumer>
                                        </ClickableGraphDataProvider>

                                        <If
                                            condition={
                                                energyConsumptionStore.loading
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
                    </EnergyConsumptionDataContext.Consumer>
                </EnergyConsumptionScreenDataProvider>
            </Box>
        </SubPageWrapper>
    );
}

export default EnergyPage;
