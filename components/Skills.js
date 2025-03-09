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
    <section className="my-8" id="skills">
      <h2>{en.skills.title}</h2>
      <div className="mb-10">
        {skillCategories.map((category) => (
          <button
            key={category.type}
            onClick={() => setCurrentFilter(category.type)}
            className={`section-filter ${category.type === currentFilter ? 'border-orange' : 'border-transparent'}`}
          >
            {category.title}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-start">
        {currentSkills.map((skill) => (
          <Fragment key={skill.title}>
            {skill.type.includes('other') ? (
              <div
                key={skill.title}
                className="mb-8 flex w-1/2 items-center pr-16"
              >
                <span className="p2 mr-4 block text-2xl">{skill.icon}</span>
                <span className="">{skill.title}</span>
              </div>
            ) : (
              <div
                key={skill.title}
                className="mb-8 mr-10 flex flex-col items-center"
              >
                <span className="block w-[75px] w-[85px] p-2">
                  <img
                    src={skill.icon}
                    alt=""
                    className="m-automax-h-[70px]"
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
