import clientPromise from "@/app/lib/mongodb";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const db = client.db('yourDatabaseName');

            const favorites = await db.collection('favorites').find({}).toArray();
            res.status(200).json({ success: true, data: favorites });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
