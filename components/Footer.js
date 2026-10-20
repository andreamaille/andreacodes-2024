import en from '../data/en.json'
import { hand, planet, stars } from './footerArt'

import { useEffect, useRef } from 'react'
import { useForm, ValidationError } from '@formspree/react'

// Out-of-step twinkle delays, in the order of the stars in footerArt.js
const TWINKLE_DELAYS = ['0s', '-1.6s', '-3.1s', '-0.8s']

// The hand pivots at the base of the arm (viewBox x) and drifts at most this far toward the cursor, about the size of its idle sway
const REACH_PIVOT_X = 187
const REACH_MAX_DEG = 3

const Divider = () => {
  return (
    <div className="wave-divider" aria-hidden="true">
      <img
        src="/doodle_divider-star.svg"
        alt=""
        className="wave-divider__star"
      />
      <div className="wave-divider__wave" />
    </div>
  )
}

const ContactForm = () => {
  const [state, handleSubmit] = useForm('xldjwdbz')
  if (state.succeeded) {
    return <p>{en.footer.formSuccess}</p>
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:max-w-[80%]">
      <label htmlFor="name" className="sr-only">
        {en.global.name}
      </label>
      <input type="text" id="name" name="name" placeholder="Name" required />
      <label htmlFor="email" className="sr-only">
        {en.global.email}
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        placeholder="Email"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea
        id="message"
        name="message"
        placeholder="Message"
        required
        className="h-48"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting}>
        {en.global.submit}
      </button>
    </form>
  )
}

const FooterArt = () => {
  const artRef = useRef(null)

  // Reaching for the stars: the hand drifts gently toward the cursor and carries the planet and stars with it
  useEffect(() => {
    const art = artRef.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const reach = (event) => {
      const box = art.getBoundingClientRect()
      const pivotX = box.left + (REACH_PIVOT_X / 432) * box.width
      const side = (event.clientX - pivotX) / (box.width / 2)
      const lean = Math.max(-1, Math.min(1, side)) * REACH_MAX_DEG
      art.style.setProperty('--reach', `${lean.toFixed(2)}deg`)
    }
    const release = () => art.style.setProperty('--reach', '0deg')

    art.addEventListener('pointermove', reach)
    art.addEventListener('pointerleave', release)
    return () => {
      art.removeEventListener('pointermove', reach)
      art.removeEventListener('pointerleave', release)
    }
  }, [])

  return (
    <svg
      ref={artRef}
      viewBox="0 0 432 1111"
      className="footer-art mx-auto block md:h-[500px] lg:h-[650px]"
      aria-hidden="true"
    >
      <g className="footer-art__reach">
        <g className="footer-art__sway">
          <g className="footer-art__rise">
            <path fillRule="evenodd" clipRule="evenodd" d={hand} />
          </g>
          <g className="footer-art__float">
            <g className="footer-art__drop">
              <path fillRule="evenodd" clipRule="evenodd" d={planet} />
            </g>
          </g>
        </g>
        {stars.map((star, starIndex) => (
          <g
            key={starIndex}
            className="footer-art__pop"
            style={{ '--i': starIndex }}
          >
            <path
              className={
                starIndex === 0
                  ? 'footer-art__star footer-art__star--spin'
                  : 'footer-art__star'
              }
              style={{ '--d': TWINKLE_DELAYS[starIndex] }}
              d={star}
            />
          </g>
        ))}
      </g>
    </svg>
  )
}

const Footer = () => {
  const contactRef = useRef(null)

  // The hand rises, the planet drops in, then the stars pop in once the section scrolls into view
  useEffect(() => {
    const contact = contactRef.current
    contact.classList.add('contact--armed')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        contact.classList.add('contact--inview')
        observer.disconnect()
      },
      { threshold: 0.25 },
    )
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Divider />

      <div
        className="flex flex-col-reverse items-center justify-center md:flex-row"
        id="contact"
        ref={contactRef}
      >
        <div className="hidden md:block md:w-[40%]">
          <FooterArt />
        </div>
        <div className="md:w-[55%]">
          <h2 className="mb-heading text-display">{en.footer.title}</h2>
          <ContactForm />
        </div>
      </div>
    </>
  )
}

export default Footer
