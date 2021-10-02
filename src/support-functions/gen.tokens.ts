import jwt from 'jsonwebtoken';
import { ITokensObj } from '../types/types';

const expiresAccessToken = Number(process.env.EXPIRES_ACCESS_TOKEN || 1800000) / 1000;     // by default 30 min
const expiresRefreshToken = Number(process.env.EXPIRES_REFRESH_TOKEN || 432000000) / 1000; // by default 5 days

export default function(tokenId: string, role: string):ITokensObj {
    try {
        const accessToken = jwt.sign({
            data: {
                tokenId,
                role
            }
        }, String(process.env.TOKEN_KEY), { expiresIn: expiresAccessToken });

        const refreshToken = jwt.sign({
            data: {
                tokenId,
                role
            }
        }, String(process.env.TOKEN_KEY), { expiresIn: expiresRefreshToken });
        
        return {accessToken, refreshToken}
    } catch(e) {
        throw e;
    }
}