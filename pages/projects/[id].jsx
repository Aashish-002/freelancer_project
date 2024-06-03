import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import ProjectForm from '../../components/ProjectForm';

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`/api/projects/${id}`)
        .then((res) => res.json())
        .then((data) => setProject(data));
    }
  }, [id]);

  const handleFormSubmit = (updatedProject) => {
    fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProject),
    })
      .then((res) => res.json())
      .then(() => {
        setProject({ ...project, ...updatedProject });
        setShowForm(false);
      });
  };

  const handleDelete = () => {
    fetch(`/api/projects/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => router.push('/'));
  };

  if (!project) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          {showForm ? 'Close Form' : 'Edit Project'}
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Delete Project
        </button>
      </div>
      {showForm && <ProjectForm onSubmit={handleFormSubmit} project={project} />}
      <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-md mt-4" />
      <p className="mt-4">{project.description}</p>
      <div className="mt-4">
        <strong>Technologies:</strong> {project.technologies.join(', ')}
      </div>
      <div className="mt-4">
        <strong>Testimonials:</strong>
        <ul className="list-disc list-inside">
          {project.testimonials.map((testimonial, index) => (
            <li key={index}>
              <strong>{testimonial.client}:</strong> {testimonial.feedback}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
