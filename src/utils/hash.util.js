import bcrypt from 'bcrypt';

export const decode = async (data, salt) => {
    const hashedData = await bcrypt.hash(data, salt);
    return hashedData
}

export const encode = async (data, hashedData) => {
    const isMatch = await bcrypt.compare(data, hashedData);
    return isMatch;
}