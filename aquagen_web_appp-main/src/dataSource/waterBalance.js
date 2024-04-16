import { apiClient } from 'src/services/api/apiClient';
import { Urls } from 'src/services/api/urls';

async function waterBalanceData(params) {
    try {
        let waterBalanceResponse = await apiClient.get(
            Urls.waterBalanceData,
            params
        );
        if (waterBalanceResponse) {
            return waterBalanceResponse;
        }
    } catch (error) {
        console.error('Error Fetching Water Balance Data', error);
    }
}

const WaterBalanceDataSource = {
    waterBalanceData: waterBalanceData,
};

export { WaterBalanceDataSource };
