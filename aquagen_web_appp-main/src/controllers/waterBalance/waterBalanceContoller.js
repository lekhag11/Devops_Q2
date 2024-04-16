const { WaterBalanceDataSource } = require('src/dataSource/waterBalance');

async function waterBalanceData(params) {
    return await WaterBalanceDataSource.waterBalanceData(params);
}

const WaterBalanceContoller = {
    waterBalanceData: waterBalanceData,
};

export { WaterBalanceContoller };
