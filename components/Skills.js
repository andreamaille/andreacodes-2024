import en from '../data/en.json'
import { skills, skillCategories } from '../data/data'
import { useState, useEffect } from 'react'

const Skills = () => {
  const [currentFilter, setCurrentFilter] = useState('featured')
  const [currentSkills, setCurrentSkills] = useState(
    skills.filter(({ type }) => type.includes('featured')),
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
    <section className="section" id="skills">
      <div className="section-head">
        <h2>{en.skills.title}</h2>
        <div className="tabs">
          {skillCategories.map((category) => (
            <button
              key={category.type}
              onClick={() => setCurrentFilter(category.type)}
              className={`tab ${category.type === currentFilter ? 'border-orange' : 'slide-in-out border-transparent'}`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-x-4 gap-y-8 md:grid-cols-8 lg:grid-cols-10 lg:gap-x-6">
        {currentSkills.map((skill) => (
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
            <span className="mt-2 text-center text-small">{skill.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
