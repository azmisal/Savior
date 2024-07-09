// /pages/api/login.js or .ts
import connectToDatabase from '../../lib/db';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const TOKEN_EXPIRY_SECONDS = 5 * 60; // 5 minutes

export default async function login(req, res) {
    await connectToDatabase();

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: TOKEN_EXPIRY_SECONDS,
        });

        res.setHeader('Set-Cookie', cookie.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: TOKEN_EXPIRY_SECONDS,
            sameSite: 'strict',
            path: '/',
        }));

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Login failed' });
    }
}
