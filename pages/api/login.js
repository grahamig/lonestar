// pages/api/login.js
import clientPromise from '../../lib/db';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db();

    switch (req.method) {
        case 'POST':
            const { email, password } = req.body;
            const collection = db.collection('users');
            const user = await collection.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Check if the plaintext password matches
            if (password !== user.password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.status(200).json({ message: 'Login successful', userId: user._id });
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}