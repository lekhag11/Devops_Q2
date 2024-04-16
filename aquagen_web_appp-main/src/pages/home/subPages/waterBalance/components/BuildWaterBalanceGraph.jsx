import React, { useContext } from 'react';
import ReactFlow, { ControlButton, Controls } from 'reactflow';
import 'reactflow/dist/style.css';
import CustomLoader from 'src/components/loader/loader';
import Expanded from 'src/components/helper/Expanded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { BalanceNodeType, CustomEgdeType } from 'src/enums/waterBalanceEnums';
import { WaterBalanceDataContext } from 'src/store/WaterBalanceStore';
import WaterBalanceInfoPopup from 'src/pages/home/subPages/waterBalance/components/WaterBalanceInfoPopup';

const BuildWaterBalanceGraph = () => {
    const waterBalanceStore = useContext(WaterBalanceDataContext);

    const handleBasicInfoClick = () => {
        waterBalanceStore.setOpenInfoPopup(!waterBalanceStore.openInfoPopup);
    };

    const proOptions = { hideAttribution: true };

    if (waterBalanceStore.isLoading) {
        return (
            <Expanded
                extraSx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                <CustomLoader />
            </Expanded>
        );
    }
    return (
        <>
            <ReactFlow
                nodes={waterBalanceStore?.balanceData?.data?.nodes}
                edges={waterBalanceStore?.balanceData?.data?.edges}
                nodeTypes={BalanceNodeType}
                edgeTypes={CustomEgdeType}
                panOnScroll={true}
                proOptions={proOptions}
                zoomOnPinch={true}
                minZoom={0}
                maxZoom={4}
                fitView
                style={{
                    border: `1px solid #cbcbcb`,
                    borderRadius: '1px',
                }}
            >
                <Controls
                    position='bottom-right'
                    showInteractive={false}
                    className='water-balance-control-buttons'
                >
                    <ControlButton
                        onClick={handleBasicInfoClick}
                        style={{
                            background: waterBalanceStore.openInfoPopup
                                ? '#00374A1A'
                                : undefined,
                        }}
                    >
                        <InfoOutlinedIcon
                            sx={{
                                maxWidth: '14px !important',
                                maxHeight: '14px !important',
                            }}
                        />
                    </ControlButton>
                    {/* TODO: Water Balance Download uncomment below section */}
                    {/* <ControlButton
                        onClick={() => {
                            waterBalanceStore.setOpenDownloadPopup(true);
                        }}
                    >
                        <FileDownloadOutlinedIcon
                            sx={{
                                maxWidth: '14px !important',
                                maxHeight: '14px !important',
                            }}
                        />
                    </ControlButton> */}
                </Controls>

                <Controls
                    position='bottom-right'
                    showInteractive={false}
                    showZoom={false}
                    showFitView={false}
                    style={{
                        marginRight: '44px',
                    }}
                >
                    <WaterBalanceInfoPopup
                        openInfoPopup={waterBalanceStore.openInfoPopup}
                    />
                </Controls>
            </ReactFlow>
        </>
    );
};

export default BuildWaterBalanceGraph;
