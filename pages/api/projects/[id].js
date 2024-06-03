import clientPromise from '../../../lib/connectdb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  const { id } = req.query;

  if (!ObjectId.isValid(id)) {
    res.status(400).json({ error: 'Invalid project ID' });
    return;
  }

  if (req.method === 'PUT') {
    const { title, description, technologies, image, testimonials } = req.body;
    await db.collection('projects').updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, description, technologies, image, testimonials } }
    );
    res.json({ message: 'Project updated' });
  } else if (req.method === 'DELETE') {
    await db.collection('projects').deleteOne({ _id: new ObjectId(id) });
    res.json({ message: 'Project deleted' });
  } else {
    const project = await db.collection('projects').findOne({ _id: new ObjectId(id) });
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
    } else {
      res.json(project);
    }
  }
}
