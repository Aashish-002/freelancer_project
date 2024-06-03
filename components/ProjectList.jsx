import Link from 'next/link';

export default function ProjectList({ projects }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div key={project._id} className="border rounded-lg p-4">
          <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
          <h3 className="text-lg font-medium mt-2">{project.title}</h3>
          <p className="text-sm text-gray-500">{project.description}</p>
          <div className="text-sm text-gray-500 mt-2">
            <strong>Technologies:</strong> {project.technologies.join(', ')}
          </div>
          <div className="mt-4">
            <Link href={`/projects/${project._id}`}>
              <span className="text-indigo-600 hover:text-indigo-900">View Details</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
