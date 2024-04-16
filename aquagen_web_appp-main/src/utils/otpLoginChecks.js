const OtpLoginCheck = {};

OtpLoginCheck.numberCheck = (phNumber, phnNumberLength = 10) => {
    const errorObject = {
        isError: true,
        errorMessage: 'Number Not Registered',
    };
    if (phNumber.length === phnNumberLength) {
        errorObject.isError = false;
    }
    return errorObject;
};

OtpLoginCheck.otpCheck = (otp, otpLength = 6) => {
    const errorObject = {
        isError: true,
        errorMessage: 'Invalid OTP',
    };

    if (otp.length === otpLength) {
        errorObject.isError = false;
    }

    return errorObject;
};

OtpLoginCheck.lengthCheck = (
    length,
    checkLength,
    setFunction,
    booleanValue = false
) => {
    if (length !== checkLength) return;
    setFunction(booleanValue);
};

export { OtpLoginCheck };
