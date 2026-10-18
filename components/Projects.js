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
      <div className="mb-6 py-4">
        <h2>{en.projects.title}</h2>
        <div className="lg:mb-4">
          {projectTypes.map((projectType) => (
            <button
              onClick={() => setCurrentFilter(projectType.type)}
              key={projectType.type}
              className={`section-filter ${projectType.type === currentFilter ? 'border-orange' : 'slide-in-out border-transparent'}`}
            >
              {projectType.title}
              <sup className="work-count">
                {
                  projects.filter(
                    (project) => project.type === projectType.type,
                  ).length
                }
              </sup>
            </button>
          ))}
        </div>
      </div>

      <div className="work-list">
        {currentProjects.map((project) => (
          <article key={project.title} className="work-item">
            {/* Every graphic sits in the same 749x578 box, bottom aligned, so all laptops render at one size */}
            <div className="work-art">
              <img src={project.image} alt="" />
            </div>
            <div className="work-copy">
              {project.kind && (
                <span className="work-kind">{project.kind}</span>
              )}
              <h3 className="work-title">{project.title}</h3>
              {project.summary && (
                <p className="work-summary">{project.summary}</p>
              )}
              <p>{project.description}</p>

              {project.techStack && (
                <ul className="work-stack">
                  {project.techStack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}

              {(project.url || project.githubUrl) && (
                <div className="work-links">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-btn work-btn--solid"
                    >
                      {project.type === 'case-study'
                        ? en.global.readCaseStudy
                        : en.global.viewLive}{' '}
                      <span className="work-btn__arrow">↗</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-btn work-btn--line"
                    >
                      {en.global.githubCode}{' '}
                      <span className="work-btn__arrow">↗</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
