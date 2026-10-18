import en from '../data/en.json'
import { brands } from '../data/data'

import { useEffect, useRef } from 'react'

const SPARKLE =
  'M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z'

const BrandList = ({ hidden }) => (
  <ul className="about-brands__list" aria-hidden={hidden || undefined}>
    {brands.map((brand) => (
      <li key={brand.name}>
        {brand.logo ? (
          <img
            src={brand.logo}
            alt={hidden ? '' : brand.name}
            style={{ height: brand.height }}
          />
        ) : (
          <span className="about-brands__name">{brand.name}</span>
        )}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={SPARKLE} />
        </svg>
      </li>
    ))}
  </ul>
)

const About = () => {
  const sectionRef = useRef(null)

  // Notebook marks draw in one after another once the section scrolls into view
  useEffect(() => {
    const section = sectionRef.current
    section.querySelectorAll('.mk').forEach((mark, markIndex) => {
      mark.style.setProperty('--mk-delay', `${0.3 + markIndex * 0.15}s`)
    })
    section.classList.add('about--armed')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        section.classList.add('about--inview')
        observer.disconnect()
      },
      { threshold: 0.25 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about my-8" id="about" ref={sectionRef}>
      <div className="about-story">
        <img
          src={'/about_andy.svg'}
          alt="Illustration of Andy in a peach arch with twinkling stars and a crescent moon"
          className="about-art"
        />
        <h2>{en.about.title}</h2>
        <p
          className="about-lede"
          dangerouslySetInnerHTML={{ __html: en.about.lede }}
        ></p>
        <div
          className="about-copy"
          dangerouslySetInnerHTML={{ __html: en.about.description }}
        ></div>
      </div>
      <div className="about-brands">
        <h3 className="about-brands__title">{en.about.brandsTitle}</h3>
        <div className="about-brands__ticker">
          <div className="about-brands__track">
            <BrandList />
            <BrandList hidden />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
