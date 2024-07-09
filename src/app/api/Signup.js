// /pages/api/signup.js or .ts
import connectToDatabase from '../../lib/db';
import User from '../models/User';

export default async function signup(req, res) {
    await connectToDatabase();

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({ email, password });
        await newUser.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Signup failed' });
    }
}
