import en from '../data/en.json'
import { socials, navLinks } from '../data/data'

const Hero = () => {
  return (
    <header className="py-8">
      <nav className="flex justify-end">
        <ul className="flex">
          {navLinks.map((navLink) => (
            <li
              key={navLink.title}
              className="font-butlerSemibold border-transparent mr-4 border-b-2 text-xl last:mx-0 hover:border-orange"
            >
              <a href={navLink.url}>{navLink.title}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex w-full items-center justify-center">
        <div className="w-1/2">
          <img src={'/hero.svg'} alt="" className="h-[800px] text-orange" />
        </div>
        <div className="w-1/2 px-4">
          <div className="max-w-lg">
            <h1 className="font-butlerSemibold pb-4 text-6xl">
              {en.hero.headline}
            </h1>
            <p className="border-b-2 border-t-2 py-4 text-lg">{en.hero.name}</p>
            <div className="py-4">
              <ul className="flex">
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
