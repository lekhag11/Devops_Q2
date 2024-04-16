import React from 'react';
import AppButton from 'src/components/button/AppButton';

const ReportDownloadButton = ({ onClick, disabled, sx }) => {
    return (
        <AppButton
            width={1}
            value={'Download'}
            borderRadius={1}
            onClick={onClick}
            disabled={disabled}
        />
    );
};

export default ReportDownloadButton;
