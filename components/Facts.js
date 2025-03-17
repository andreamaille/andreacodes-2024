import en from '../data/en.json'
import { facts } from '../data/data'

const Facts = () => {
  return (
    <section className="pt-16 md:flex" id="facts">
      <div className="md:w-1/2">
        <h2>{en.facts.title}</h2>
        <div>
          {facts.map((fact) => (
            <div className="flex">
              <span className="mb-8 mr-6 text-2xl">{fact.emoji}</span>
              <p>{fact.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2">
        <img src="/facts_moon-stars.svg" alt="" className="max-h-[600px]" />
      </div>
    </section>
  )
}

export default Facts
