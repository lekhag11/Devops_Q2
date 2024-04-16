import {
    Backdrop,
    Box,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import ReactFlow from 'reactflow';
import { assets } from 'src/assets/assets';
import AppButton from 'src/components/button/AppButton';
import { BalanceNodeType, CustomEgdeType } from 'src/enums/waterBalanceEnums';
import { WaterBalanceDataContext } from 'src/store/WaterBalanceStore';

import { LocalDBInstance, LocalDBKeys } from 'src/services/localdb/localdb';
import CustomSingleDatePicker from 'src/components/date-picker/CustomSingleDatePicker';
import moment from 'moment';
import { Download } from 'src/utils/downloadUtil';

const DetailsTable = () => {
    const waterBalanceStore = useContext(WaterBalanceDataContext);

    const summaryData = waterBalanceStore.balanceData?.data;

    return (
        <Container
            sx={{
                margin: '24px 0px',
            }}
        >
            {summaryData.summary.map((element, tableHeadIndex) => {
                return (
                    <TableContainer
                        className='water-balance-summary-table'
                        key={tableHeadIndex}
                        sx={{
                            border: `1px solid #cbcbcb`,
                            borderRadius: '4px',
                            margin: 'auto',
                            marginBottom: '24px',
                            maxWidth: '1150px',
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                            overflow: 'hidden',
                        }}
                    >
                        <Table
                            aria-label='simple table'
                            sx={{
                                '&::-webkit-scrollbar': {
                                    display: 'none',
                                },
                                overflow: 'hidden',
                            }}
                        >
                            <TableHead
                                sx={{
                                    background: '#f2f9fc',
                                }}
                            >
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '16px',
                                        }}
                                    >
                                        {element.displayName}
                                    </TableCell>
                                    <TableCell
                                        align='right'
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: '16px',
                                        }}
                                    >
                                        {element.value}{' '}
                                        {waterBalanceStore.balanceData.siUnit}
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {element.nodes.map((node, nodeIndex) => (
                                    <TableRow
                                        key={nodeIndex}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell
                                            component='th'
                                            scope='row'
                                        >
                                            {node.displayName}
                                        </TableCell>
                                        <TableCell align='right'>
                                            {node.value}{' '}
                                            {
                                                waterBalanceStore.balanceData
                                                    .siUnit
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                );
            })}
        </Container>
    );
};

const DownloadDiagramView = () => {
    const waterBalanceStore = useContext(WaterBalanceDataContext);

    const proOptions = { hideAttribution: true };

    return (
        <>
            <Container
                sx={{
                    height: '70vh',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: '10',
                    }}
                />
                <ReactFlow
                    nodes={waterBalanceStore?.balanceData?.data?.nodes}
                    edges={waterBalanceStore?.balanceData?.data?.edges}
                    nodeTypes={BalanceNodeType}
                    edgeTypes={CustomEgdeType}
                    elementsSelectable={false}
                    nodesConnectable={false}
                    nodesDraggable={false}
                    zoomOnScroll={false}
                    panOnScroll={false}
                    panOnScrollMode={false}
                    zoomOnDoubleClick={false}
                    onConnect={false}
                    onNodeClick={false}
                    onNodeDragStart={false}
                    onNodeDragStop={false}
                    panOnDrag={false}
                    minZoom={0}
                    proOptions={proOptions}
                    maxZoom={4}
                    fitView
                    style={{
                        border: `1px solid #cbcbcb`,
                        borderRadius: '1px',
                    }}
                ></ReactFlow>
            </Container>
        </>
    );
};

const DownloadPopup = () => {
    const waterBalanceStore = useContext(WaterBalanceDataContext);

    const handleClose = () => {
        waterBalanceStore.setOpenDownloadPopup(false);
    };

    const handleDownload = () => {
        waterBalanceStore.setFullScreenLoader(true);

        const username = JSON.parse(
            LocalDBInstance.getItem(LocalDBKeys.loginResponse)
        ).username;

        Download.PNG({
            containerRef: waterBalanceStore.downloadContainerRef,
            fileName: `${waterBalanceStore.params.date1}-${username}`,
        })
            .then((message) => {
                console.log(message);
                waterBalanceStore.setFullScreenLoader(false);
            })
            .catch((error) => {
                console.log('Error downloading Image', error);
                waterBalanceStore.setFullScreenLoader(false);
            });
    };

    return (
        <>
            <Dialog
                open={waterBalanceStore.openDownloadPopup}
                onClose={handleClose}
                scroll={'paper'}
                fullWidth={true}
                maxWidth={'lg'}
            >
                <Backdrop
                    sx={{
                        color: assets.colors.secondary,
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={waterBalanceStore.fullScreenLoader}
                >
                    <CircularProgress color='inherit' />
                </Backdrop>
                <DialogContent
                    dividers={true}
                    sx={{
                        padding: '0px',
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                    id='scroll-dialog-description'
                    tabIndex={-1}
                >
                    <Box
                        ref={waterBalanceStore.downloadContainerRef}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Container
                            sx={{
                                display: 'flex',
                                alignItems: { xs: 'end', md: 'center' },
                                justifyContent: 'space-between',
                                gap: { xs: '0px', md: '12px' },
                                flexDirection: { xs: 'row' },
                                paddingTop: '18px',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: { xs: '0px', md: '12px' },
                                    alignItems: { xs: 'start', md: 'center' },
                                    flexDirection: { xs: 'column', md: 'row' },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: 24,
                                        fontWeight: 500,
                                    }}
                                >
                                    Water Balance Diagram
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 14,
                                        fontWeight: 400,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                    }}
                                >
                                    (All values are present in{' '}
                                    {waterBalanceStore.balanceData.siUnit})
                                </Typography>
                            </Box>
                            <Box>
                                <CustomSingleDatePicker
                                    disabled={true}
                                    value={moment(
                                        waterBalanceStore.params.date1,
                                        'DD/MM/YYYY'
                                    )}
                                    borderRadius='4px'
                                    restStyle={{
                                        height: '28px',
                                        width: '150px',
                                    }}
                                />
                            </Box>
                        </Container>
                        <DownloadDiagramView />
                        <DetailsTable />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <AppButton
                        borderRadius='4px'
                        variant={'outlined'}
                        value={'Cancel'}
                        onClick={handleClose}
                        restStyle={{
                            margin: 0,
                        }}
                    />

                    <AppButton
                        borderRadius='4px'
                        value={'Download'}
                        onClick={handleDownload}
                        restStyle={{
                            margin: 0,
                        }}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DownloadPopup;
