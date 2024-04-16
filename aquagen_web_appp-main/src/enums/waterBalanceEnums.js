import { assets } from 'src/assets/assets';
import BreakPointEdge from 'src/pages/home/subPages/waterBalance/components/edges/BreakPointEdge';
import ConsumptionNode from 'src/pages/home/subPages/waterBalance/components/nodes/ConsumptionNode';
import OvalNode from 'src/pages/home/subPages/waterBalance/components/nodes/OvalNode';
import ProcessNode from 'src/pages/home/subPages/waterBalance/components/nodes/ProcessNode';
import WaterTankNode from 'src/pages/home/subPages/waterBalance/components/nodes/WaterTankNode';

const BasicInfoEnumArray = [
    'RAW_WATER',
    'RECYCLED_WATER',
    'LIMIT_REACHED',
    'NINTY_PERCENT',
    'STORAGE_TANK',
    'NO_FLOW_METER',
];

const BasicInfoLabel = {
    RAW_WATER: 'Raw Water',
    RECYCLED_WATER: 'Recycled Water',
    LIMIT_REACHED: 'Limit Reached',
    NINTY_PERCENT: '90% Filled',
    STORAGE_TANK: 'Storage Tank',
    NO_FLOW_METER: 'No Flow Meter',
};

// Assets to be added
const BasicInfoAssets = {
    RAW_WATER: assets.images.rawWaterLine,
    RECYCLED_WATER: assets.images.recycledWaterLine,
    LIMIT_REACHED: assets.images.limitReachedBox,
    NINTY_PERCENT: assets.images.nintyPercentBox,
    STORAGE_TANK: assets.images.waterTank,
    NO_FLOW_METER: assets.images.noFlowMeter,
};

const BalanceNodeType = {
    CARD: ConsumptionNode,
    TANK: WaterTankNode,
    OVAL: OvalNode,
    PROCESS: ProcessNode,
};

const CustomEgdeType = {
    custom: BreakPointEdge,
};

Object.freeze(
    BasicInfoEnumArray,
    BasicInfoLabel,
    BasicInfoAssets,
    BalanceNodeType
);

export {
    BasicInfoEnumArray,
    BasicInfoLabel,
    BasicInfoAssets,
    BalanceNodeType,
    CustomEgdeType,
};
