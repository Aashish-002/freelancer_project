import clientPromise from '../../../lib/connectdb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'POST') {
    const { title, description, technologies, image, testimonials } = req.body;
    const newProject = {
      title,
      description,
      technologies,
      image,
      testimonials,
    };
    await db.collection('projects').insertOne(newProject);
    res.json(newProject);
  } else {
    const projects = await db.collection('projects').find({}).toArray();
    res.json(projects);
  }
}
