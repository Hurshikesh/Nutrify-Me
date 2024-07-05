// import { NextResponse } from 'next/server';
// import clientPromise from '@/app/lib/mongodb';

// export const config = {
//   api: {
//     bodyParser: true,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       const client = await clientPromise;
//       const db = client.db('yourDatabaseName');
//       const { product } = req.body;

//       const result = await db.collection('favorites').updateOne(
//         { code: product.code },
//         { $set: product },
//         { upsert: true }
//       );

//       return NextResponse.json({ success: true, data: result });
//     } catch (error) {
//       return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//     }
//   } else {
//     return NextResponse.json({ success: false, error: `Method ${req.method} Not Allowed` }, { status: 405 });
//   }
// }

