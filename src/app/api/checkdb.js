import connectToDatabase from '../../lib/db';

export default async function checkDB(req, res) {
    try {
        await connectToDatabase();
        res.status(200).json({ message: 'Database connected' });
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).json({ message: 'Database connection error' });
    }
}
