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

      <div className="mt-10 grid grid-cols-3 gap-4 md:grid-cols-8 lg:grid-cols-10 lg:gap-6">
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
            <span className="mt-1 text-center">{skill.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
