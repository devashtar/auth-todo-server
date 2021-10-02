import jwt_decode, { JwtPayload } from "jwt-decode";
import { CheckAuthHeader } from '../exceptions/user.exeption';
import { IJWTData } from '../types/types';

interface customJwtPayload extends JwtPayload {
    data: IJWTData
}

export default function tokenDecoder(token: string | undefined):IJWTData {
    try {
        if (typeof token === 'string') {
            const { data } = jwt_decode<customJwtPayload>(token);

            if (typeof data === 'object') {
                if (typeof data.tokenId === 'string' && typeof data.role === 'string') return data;
            }

            throw new CheckAuthHeader('Unauthorized user!');
        }
        
        throw new CheckAuthHeader('Unauthorized user!');
    } catch(e) {
        throw e;
    }
}
