import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  technologies: [String],
  image: String,
  testimonials: [{ client: String, feedback: String }],
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
