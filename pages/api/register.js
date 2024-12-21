import clientPromise from '../../lib/db';

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db();

    switch (req.method) {
        case 'POST':
            const { email, password } = req.body;
            const collection = db.collection('users');
            const result = await collection.insertOne({ email, password });
            res.status(200).json({ message: 'User registered', userId: result.insertedId });
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}