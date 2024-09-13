import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {

    try {
        const tokenHeader = process.env.TOKEN_HEADER_KEY
        const jwtSecretKey = process.env.JWT_SECRET_KEY
        const authHeader = req.header(tokenHeader)
        console.log(authHeader,'hehehheheh');
        
        if(!authHeader){
            return res.status(401).json({error:"Invalid authentication"})
        }
        const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
        if (!token) return res.status(401).json({ error: "Access denied" })
        try {

            const decoded = jwt.verify(token, jwtSecretKey)
            console.log(decoded,'what is this');
            req.user = { userid: decoded.userid, name: decoded.name }
            next()

        } catch (error) {
            console.log(error,'Authe middleware error');
            if (error.expiredAt) {
                return res.status(401).json({ error: "Token expired" })
            }
            res.status(401).json({ error: "Invalid token" })
        }
    } catch (error) {
        console.log(error, 'Error caught in verfify token');
        res.status(500).json({ error: "Internal server error" })
    }

}