import en from '../data/en.json'
import { socials, navLinks } from '../data/data'

const About = () => {
  return (
    <section>
      <div>
        <span></span>
      </div>
      <div>
        <div>
          <h2>{en.about.title}</h2>
          <p>{en.about.description}</p>
        </div>
        <div>
          <img src={'/about.svg'} alt />
        </div>
      </div>
    </section>
  )
}

export default About
