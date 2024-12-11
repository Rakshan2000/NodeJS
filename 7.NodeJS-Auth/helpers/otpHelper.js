const generateOTP = () =>{
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const isOTPValid = (storedOTP, storedExpiryTime) => {
    if(!storedOTP || !storedExpiryTime) return false;

    return new Date() < new Date(storedExpiryTime);
};

module.exports = {
    generateOTP,
    isOTPValid
}