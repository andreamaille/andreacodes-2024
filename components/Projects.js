import en from '../data/en.json'
import { projects } from '../data/data'
import { useState, useEffect } from 'react'

// A smaller version of the hero buttons
const buttonClasses =
  'group/btn inline-flex items-center gap-[0.6em] rounded-full border-2 border-orange px-5 py-2.5 font-workSansSemibold text-small leading-[1.2] transition-[background-color,color,border-color,transform] duration-300 ease-brand hover:-translate-y-0.5 motion-reduce:transition-none'

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
    <section id="portfolio" className="section">
      <div className="section-head">
        <h2>{en.projects.title}</h2>
        <div className="tabs">
          {projectTypes.map((projectType) => (
            <button
              onClick={() => setCurrentFilter(projectType.type)}
              key={projectType.type}
              className={`tab ${projectType.type === currentFilter ? 'border-orange' : 'slide-in-out border-transparent'}`}
            >
              {projectType.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-block [container-type:inline-size]">
        {currentProjects.map((project) => (
          <article
            key={project.title}
            className="group grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[clamp(32px,5cqw,80px)]"
          >
            {/* Every graphic sits in the same 749x578 box, bottom aligned, so all laptops render at one size */}
            <div className="flex aspect-[749/578] w-full max-w-[450px] items-end">
              <img
                className="transition-transform duration-[600ms] ease-brand group-hover:-translate-y-1.5 motion-reduce:transition-none"
                src={project.image}
                alt=""
              />
            </div>
            <div className="grid min-w-0 gap-4 lg:max-w-3xl">
              {project.kind && (
                <span className="font-workSansSemibold text-eyebrow uppercase">
                  {project.kind}
                </span>
              )}
              <h3 className="text-balance text-h3">{project.title}</h3>
              {project.summary && (
                <p className="p-0 font-butlerSemibold text-title">
                  {project.summary}
                </p>
              )}
              <p className="p-0">{project.description}</p>

              {project.techStack && (
                <ul className="m-0 list-none border-t-[1.5px] border-orange pb-0 pt-3 font-workSansMedium text-small leading-[1.8]">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="inline-block whitespace-nowrap after:mx-[0.6em] after:align-[2px] after:text-[0.6rem] after:text-orange-light after:content-['✦'] last:after:content-none"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              )}

              {(project.url || project.githubUrl) && (
                <div className="mt-2 flex flex-wrap gap-3">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${buttonClasses} bg-orange text-pink hover:border-orange-dark hover:bg-orange-dark`}
                    >
                      {project.type === 'case-study'
                        ? en.global.readCaseStudy
                        : en.global.viewLive}{' '}
                      <span className="inline-block transition-transform duration-300 ease-brand group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 motion-reduce:transition-none">
                        ↗
                      </span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${buttonClasses} bg-transparent text-orange hover:bg-orange hover:text-pink`}
                    >
                      {en.global.githubCode}{' '}
                      <span className="inline-block transition-transform duration-300 ease-brand group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 motion-reduce:transition-none">
                        ↗
                      </span>
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
