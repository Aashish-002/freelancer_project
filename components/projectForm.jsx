import { useState } from 'react';

export default function ProjectForm({ onSubmit, project }) {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [technologies, setTechnologies] = useState(project?.technologies.join(', ') || '');
  const [image, setImage] = useState(project?.image || '');
  const [testimonials, setTestimonials] = useState(project?.testimonials || [{ client: '', feedback: '' }]);

  const handleAddTestimonial = () => {
    setTestimonials([...testimonials, { client: '', feedback: '' }]);
  };

  const handleTestimonialChange = (index, field, value) => {
    const newTestimonials = testimonials.slice();
    newTestimonials[index][field] = value;
    setTestimonials(newTestimonials);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const techArray = technologies.split(',').map((tech) => tech.trim());
    onSubmit({ title, description, technologies: techArray, image, testimonials });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Technologies (comma separated)</label>
        <input
          type="text"
          value={technologies}
          onChange={(e) => setTechnologies(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Testimonials</label>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="space-y-2">
            <input
              type="text"
              placeholder="Client"
              value={testimonial.client}
              onChange={(e) => handleTestimonialChange(index, 'client', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <input
              type="text"
              placeholder="Feedback"
              value={testimonial.feedback}
              onChange={(e) => handleTestimonialChange(index, 'feedback', e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddTestimonial}
          className="mt-2 text-indigo-600 hover:text-indigo-900"
        >
          Add Testimonial
        </button>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
}
