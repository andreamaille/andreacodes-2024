import en from '../data/en.json'
import { skills, skillCategories } from '../data/data'
import { useState, useEffect, Fragment } from 'react'

const Skills = () => {
  const [currentFilter, setCurrentFilter] = useState('featured')
  const [currentSkills, setCurrentSkills] = useState(
    skills.filter(({ type }) => !type.includes('other')),
  )

  useEffect(() => {
    if (currentFilter) {
      const updatedSkills = skills.filter(({ type }) =>
        type.includes(currentFilter),
      )

      setCurrentSkills(updatedSkills)
    }
  }, [currentFilter])

  return (
    <section className="mt-8" id="skills">
      <h2>{en.skills.title}</h2>
      <div className="">
        {skillCategories.map((category) => (
          <button
            key={category.type}
            onClick={() => setCurrentFilter(category.type)}
            className={`section-filter ${category.type === currentFilter ? 'border-orange' : 'slide-in-out border-transparent'}`}
          >
            {category.title}
          </button>
        ))}
      </div>

      <div
        className={`mt-10 ${currentFilter === 'other' ? 'flex flex-wrap justify-between' : 'grid grid-cols-3 gap-4 md:grid-cols-8 lg:grid-cols-10 lg:gap-6'}`}
      >
        {currentSkills.map((skill) => (
          <Fragment key={skill.title}>
            {skill.type.includes('other') ? (
              <div
                key={skill.title}
                className="mb-8 flex items-start justify-between md:w-1/2 md:pr-16"
              >
                <span className="p4 mr-4 block text-2xl md:leading-tight">
                  {skill.icon}
                </span>
                <span>{skill.title}</span>
              </div>
            ) : (
              <div
                key={skill.title}
                className="flex flex-col items-center justify-start"
              >
                <span className="block w-[75px] p-2">
                  <img
                    src={skill.icon}
                    alt=""
                    className="h-[70px]"
                    loading="lazy"
                  />
                </span>
                <span className="mt-1 text-center">{skill.title}</span>
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </section>
  )
}

export default Skills
