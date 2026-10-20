import en from '../data/en.json'
import { bytes } from '../data/data'
import { bytesIcons } from './bytesIcons'

import { useEffect, useRef } from 'react'

const Bytes = () => {
  const sectionRef = useRef(null)

  // Notebook marks draw in one after another once the section scrolls into view
  useEffect(() => {
    const section = sectionRef.current
    section.querySelectorAll('.mk').forEach((mark, markIndex) => {
      mark.style.setProperty('--mk-delay', `${0.3 + markIndex * 0.15}s`)
    })
    section.classList.add('bytes--armed')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        section.classList.add('bytes--inview')
        observer.disconnect()
      },
      { threshold: 0.25 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bytes section" id="bytes" ref={sectionRef}>
      <div className="section-head">
        <h2>{en.bytes.title}</h2>
        <p className="section-intro">{en.bytes.subtitle}</p>
      </div>
      <ul className="bytes-list">
        {bytes.map((byte) => (
          <li className="bytes-item" key={byte.icon}>
            <span className="bytes-item__icon">{bytesIcons[byte.icon]}</span>
            <p dangerouslySetInnerHTML={{ __html: byte.description }}></p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Bytes
