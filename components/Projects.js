import en from '../data/en.json'
import { projects } from '../data/data'
import { useState, useEffect } from 'react'

const projectTypes = [
  {
    title: 'Professional',
    type: 'professional',
  },
  {
    title: 'Personal',
    type: 'personal',
  },
  {
    title: 'Case Studies',
    type: 'case-study',
  },
]

const Projects = () => {
  const [currentFilter, setCurrentFilter] = useState('professional')
  const [currentProjects, setCurrentProjects] = useState([])

  useEffect(() => {
    const currentProjects = projects.filter(
      (project) => project.type === currentFilter,
    )

    setCurrentProjects(currentProjects)
  }, [currentFilter])

  return (
    <section id="portfolio" className="my-8">
      <div className="sticky top-0 z-40 bg-pink py-4 lg:static">
        <h2>{en.projects.title}</h2>
        <div className="lg:mb-16">
          {projectTypes.map((projectType) => (
            <button
              onClick={() => setCurrentFilter(projectType.type)}
              key={projectType.type}
              className={`section-filter ${projectType.type === currentFilter ? 'border-orange' : 'slide-in-out border-transparent'}`}
            >
              {projectType.title}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <span className="absolute right-0 top-[-50px] hidden lg:block">
          <img src="/project_star-cluster.svg" alt="" className="w-[75px]" />
        </span>
        {currentProjects.map((project) => (
          <div key={project.title} className="mb-16 lg:flex">
            <div className="mb-8 max-w-[450px] md:m-auto md:mb-4 lg:mr-6 lg:w-1/3">
              <img src={project.image} alt="" />
            </div>
            <div className="lg:w-2/3">
              <div className="md:m-auto md:max-w-[768px] md:text-center lg:text-left">
                <h3 className="mb-6">{project.title}</h3>
                <p className="lg:max-w-2xl">{project.description}</p>
                {(project.type === 'personal' ||
                  project.type === 'case-study') && (
                  <div>
                    <ul className="flex">
                      <li className="mr-4 flex">
                        <img
                          src="/icons/link.svg"
                          alt=""
                          className="mr-2 w-4"
                        />
                        <a href={project.url}>{en.global.viewLive}</a>
                      </li>
                      <li className="flex">
                        <img
                          src="/icons/github.svg"
                          alt=""
                          className="mr-2 w-4"
                        />
                        <a href={project.githubUrl}>{en.global.githubCode}</a>
                      </li>
                    </ul>
                  </div>
                )}
                {project.techStack && (
                  <div className="mt-4 flex flex-wrap md:justify-center lg:max-w-2xl lg:justify-start">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="mr-2 mt-2 border-2 border-orange px-2 py-1 font-workSansMedium text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
