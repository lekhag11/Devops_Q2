const StandardCategoryType = {
    SOURCE_CATEGORY: 'source_category',
    STOCK_CATEGORY: 'stock_category',
    QUALITY_CATEGORY: 'quality_category',
    GROUND_WATER_LEVEL: 'ground_water_level',
    ENERGY_CATEGORY: 'energy_category',
};

const StandardCategoryReportType = {
    SOURCE_CATEGORY: 'water',
    STOCK_CATEGORY: 'level',
    QUALITY_CATEGORY: 'quality',
    GROUND_WATER_LEVEL: 'borewell',
    ENERGY_CATEGORY: 'energy',
    CONSOLIDATED: 'consolidated',
    SUMMARY: 'summary',
};
const StandardCategoryTypeUppercase = {
    SOURCE_CATEGORY: 'SOURCE_CATEGORY',
    STOCK_CATEGORY: 'STOCK_CATEGORY',
    QUALITY_CATEGORY: 'QUALITY_CATEGORY',
    GROUND_WATER_LEVEL: 'GROUND_WATER_LEVEL',
    ENERGY_CATEGORY: 'ENERGY_CATEGORY',
};

Object.freeze(StandardCategoryReportType, StandardCategoryType);

export {
    StandardCategoryType,
    StandardCategoryReportType,
    StandardCategoryTypeUppercase,
};
