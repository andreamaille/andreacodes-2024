import en from '../data/en.json'
import { skills } from '../data/data'

const Skills = () => {
  return (
    <section className="my-8">
      <h2>{en.skills.title}</h2>
      <div>
        {skills.map((skill) => (
          <div key={skill.title}>
            <span>{skill.title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
