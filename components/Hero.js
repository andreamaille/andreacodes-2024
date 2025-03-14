import en from '../data/en.json'
import { socials } from '../data/data'
import Nav from './Nav'

const Hero = () => {
  return (
    <header className="py-8">
      <Nav />
      <div className="mt-28 flex w-full flex-col-reverse items-center justify-center md:mt-0 md:flex-row">
        <div className="mt-8 md:mt-0 md:w-1/2">
          <img
            src={'/hero.svg'}
            alt=""
            className="h-[400px] text-orange lg:h-[700px]"
          />
        </div>
        <div className="px-4 md:w-1/2">
          <div className="max-w-md text-center md:text-left">
            <h1 className="pb-4 font-butlerSemibold text-2xl lg:text-6xl">
              {en.hero.headline}
            </h1>
            <p className="border-b-2 border-t-2 py-4 lg:text-lg">
              {en.hero.name}
            </p>
            <div className="py-4">
              <ul className="flex justify-center md:justify-start">
                {socials.map((social) => (
                  <li
                    key={social.title}
                    className="pr-4 last:px-0 hover:opacity-80"
                  >
                    <a
                      href={social.url}
                      dangerouslySetInnerHTML={{ __html: social.svg }}
                    ></a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
