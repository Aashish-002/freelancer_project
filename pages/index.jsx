import { useEffect, useState } from 'react';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const handleFormSubmit = (newProject) => {
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    })
      .then((res) => res.json())
      .then((project) => {
        setProjects([...projects, project]);
        setShowForm(false);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md"
        >
          {showForm ? 'Close Form' : 'Add New Project'}
        </button>
      </div>
      {showForm && <ProjectForm onSubmit={handleFormSubmit} />}
      <ProjectList projects={projects} />
    </div>
  );
}
