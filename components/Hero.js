import en from '../data/en.json'
import { socials } from '../data/data'
import { branch, hand, stars } from './heroArt'
import Nav from './Nav'

import { useEffect, useRef } from 'react'

// hero.svg sits inside an 800 x 1000 scene so the sun and orbits have room around it
const HERO_OFFSET_X = 180
const HERO_OFFSET_Y = 110
const SUN = { x: 400, y: 420, r: 250 }
const ORBIT_R = 335
const SPARKLE =
  'M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z'

const sparks = [
  { left: '-2.5%', top: '20%', size: 12, delay: 0, at: 2.0 },
  { left: '45.5%', top: '12%', size: 14, delay: -1.4, at: 2.2 },
  { left: '99%', top: '12%', size: 16, delay: -0.6, at: 2.35 },
  { left: '94.6%', top: '86%', size: 11, delay: -2.4, at: 2.5 },
  { left: '46.6%', top: '88%', size: 10, delay: -3.1, at: 2.6 },
]

const Sparkle = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path d={SPARKLE} />
  </svg>
)

const Divider = ({ flip }) => (
  <div
    className={`hero-divider ${flip ? 'hero-divider--flip' : ''}`}
    style={{ '--at': flip ? '1.1s' : '1s' }}
    aria-hidden="true"
  >
    {flip && <Sparkle className="hero-divider__star" />}
    <span className="hero-divider__line" />
    {!flip && <Sparkle className="hero-divider__star" />}
  </div>
)

const reduceMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const PARTICLE_COUNT = 5

// Small sparkles that drift out from a star when it is hovered
const burst = (layer, originX, originY) => {
  for (let particleIndex = 0; particleIndex < PARTICLE_COUNT; particleIndex++) {
    const particle = document.createElement('span')
    particle.className = 'hero-particle'
    particle.innerHTML = `<svg viewBox="0 0 24 24"><path d="${SPARKLE}"/></svg>`
    const size = 5 + Math.random() * 5
    particle.style.width = particle.style.height = `${size}px`
    particle.style.left = `${originX}px`
    particle.style.top = `${originY}px`
    layer.appendChild(particle)
    const angle =
      (particleIndex / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.6
    const distance = 22 + Math.random() * 18
    particle.animate(
      [
        { transform: 'translate(0,0) scale(.3)', opacity: 0 },
        {
          transform: `translate(${Math.cos(angle) * distance * 0.45}px,${Math.sin(angle) * distance * 0.45}px) scale(1)`,
          opacity: 1,
          offset: 0.3,
        },
        {
          transform: `translate(${Math.cos(angle) * distance}px,${Math.sin(angle) * distance}px) scale(.4) rotate(60deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1300 + Math.random() * 400,
        easing: 'cubic-bezier(.22,1,.36,1)',
      },
    ).onfinish = () => particle.remove()
  }
}

const Hero = () => {
  const rootRef = useRef(null)

  // One smooth glint per hover; it finishes before it can play again
  const glint = (event) => {
    const host = event.currentTarget
    const root = rootRef.current
    if (!root || host.dataset.busy || reduceMotion()) return
    host.dataset.busy = 'true'
    const star = host.querySelector('.hero-glint')
    const rays = host.querySelector('.hero-star-rays')
    const ease = 'cubic-bezier(.45,0,.55,1)'
    const anim = star.animate(
      [
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(1.38) rotate(45deg)', offset: 0.45 },
        { transform: 'scale(1) rotate(90deg)' },
      ],
      { duration: 1400, easing: ease },
    )
    if (rays) {
      rays.animate(
        [
          { opacity: 0, transform: 'scale(.2) rotate(0deg)' },
          { opacity: 0.9, transform: 'scale(1) rotate(20deg)', offset: 0.4 },
          { opacity: 0, transform: 'scale(1.2) rotate(45deg)' },
        ],
        { duration: 1200, easing: ease },
      )
    }
    const box = star.getBoundingClientRect()
    const rootBox = root.getBoundingClientRect()
    const layer = root.querySelector('.hero-fx')
    setTimeout(
      () =>
        burst(
          layer,
          box.left + box.width / 2 - rootBox.left,
          box.top + box.height / 2 - rootBox.top,
        ),
      350,
    )
    anim.onfinish = () => delete host.dataset.busy
  }

  // Sun, orbits and badge: eased toward hover and cursor targets every frame
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const select = (selector) => root.querySelector(selector)
    const art = select('.hero-art')
    const badge = select('.hero-badge')
    const disc = select('.hero-sun')
    const sunMove = select('.hero-sun-move')
    const moon = select('.hero-moon')
    const orbit2 = select('.hero-orbit2')
    const ring2 = select('.hero-ring2')
    const moon2 = select('.hero-moon2')
    const badgeRing = select('.hero-badge__ring')

    const state = {
      hover: 0,
      hoverTarget: 0,
      badgeHover: 0,
      badgeHoverTarget: 0,
      pointerX: 0,
      pointerY: 0,
      pointerXTarget: 0,
      pointerYTarget: 0,
      sunScale: 1,
      sunScaleVelocity: 0,
      time: 0,
      moon: -1.2,
      moon2: 0.4,
      badge: 0,
    }
    const listen = (element, eventType, handler) =>
      element.addEventListener(eventType, handler)
    listen(art, 'pointerenter', () => (state.hoverTarget = 1))
    listen(art, 'pointerleave', () => (state.hoverTarget = 0))
    listen(badge, 'pointerenter', () => (state.badgeHoverTarget = 1))
    listen(badge, 'pointerleave', () => (state.badgeHoverTarget = 0))
    listen(root, 'pointermove', (event) => {
      const rootRect = root.getBoundingClientRect()
      state.pointerXTarget =
        (event.clientX - rootRect.left) / rootRect.width - 0.5
      state.pointerYTarget =
        (event.clientY - rootRect.top) / rootRect.height - 0.5
    })
    listen(root, 'pointerleave', () => {
      state.pointerXTarget = 0
      state.pointerYTarget = 0
    })

    const place = (element, angle, radius) => {
      element.setAttribute('cx', (SUN.x + Math.cos(angle) * radius).toFixed(1))
      element.setAttribute('cy', (SUN.y + Math.sin(angle) * radius).toFixed(1))
    }

    const frame = (deltaSeconds) => {
      const hoverEase = 1 - Math.exp(-deltaSeconds * 3)
      const pointerEase = 1 - Math.exp(-deltaSeconds * 2.5)
      state.time += deltaSeconds
      state.hover += (state.hoverTarget - state.hover) * hoverEase
      state.badgeHover +=
        (state.badgeHoverTarget - state.badgeHover) * hoverEase
      state.pointerX += (state.pointerXTarget - state.pointerX) * pointerEase
      state.pointerY += (state.pointerYTarget - state.pointerY) * pointerEase
      const hover = state.hover

      // Sun swells with a soft spring on hover and breathes slightly at rest
      const target = 1 + hover * 0.07 + Math.sin(state.time * 1.1) * 0.008
      state.sunScaleVelocity +=
        ((target - state.sunScale) * 60 - state.sunScaleVelocity * 9) *
        deltaSeconds
      state.sunScale += state.sunScaleVelocity * deltaSeconds
      disc.setAttribute(
        'transform',
        `translate(${SUN.x} ${SUN.y}) scale(${state.sunScale.toFixed(4)}) translate(${-SUN.x} ${-SUN.y})`,
      )
      sunMove.setAttribute(
        'transform',
        `translate(${(state.pointerX * (14 + hover * 36)).toFixed(2)} ${(state.pointerY * (10 + hover * 28)).toFixed(2)})`,
      )

      state.moon += deltaSeconds * (0.14 + hover * 0.9)
      place(moon, state.moon, ORBIT_R)

      // Second orbit only shows on hover. It grows out from the main orbit and
      // shares its centre, so it never crosses the sun
      const secondOrbitRadius = ORBIT_R + hover * 42
      state.moon2 += deltaSeconds * (0.1 + hover * 0.7)
      orbit2.setAttribute('opacity', hover.toFixed(3))
      ring2.setAttribute('r', secondOrbitRadius.toFixed(1))
      place(moon2, state.moon2, secondOrbitRadius)

      state.badge += deltaSeconds * (14 + state.badgeHover * 70)
      badgeRing.style.transform = `rotate(${state.badge.toFixed(2)}deg)`
    }

    // Place the moons once; with reduced motion the scene stays still
    frame(0)
    if (reduceMotion()) return

    let animationFrameId
    let last = performance.now()
    const loop = (now) => {
      frame(Math.min(0.05, (now - last) / 1000))
      last = now
      animationFrameId = requestAnimationFrame(loop)
    }
    animationFrameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  const name = en.hero.headline

  return (
    <header className="hero-header">
      <Nav />
      <div className="hero-frame">
        <div className="hero" ref={rootRef}>
          <div className="hero-art">
            <svg
              className="hero-scene"
              viewBox="0 0 800 1000"
              aria-hidden="true"
            >
              <defs>
                <clipPath id="hero-wipe">
                  <rect
                    className="hero-wipe"
                    x="-40"
                    y="-40"
                    width="521"
                    height="960"
                  />
                </clipPath>
              </defs>
              <g className="hero-orbits">
                <circle
                  className="hero-ring"
                  cx={SUN.x}
                  cy={SUN.y}
                  r={ORBIT_R}
                />
                <circle className="hero-moon" r="9" />
                <g className="hero-orbit2" opacity="0">
                  <circle
                    className="hero-ring hero-ring2"
                    cx={SUN.x}
                    cy={SUN.y}
                    r={ORBIT_R}
                  />
                  <circle className="hero-moon2" r="9" />
                </g>
              </g>
              <g className="hero-sunrise">
                <g className="hero-sun-move">
                  <circle
                    className="hero-sun"
                    cx={SUN.x}
                    cy={SUN.y}
                    r={SUN.r}
                  />
                </g>
              </g>
              <g transform={`translate(${HERO_OFFSET_X} ${HERO_OFFSET_Y})`}>
                <g className="hero-ink" clipPath="url(#hero-wipe)">
                  {hand.map((pathData) => (
                    <path key={pathData.slice(0, 12)} d={pathData} />
                  ))}
                </g>
                <g className="hero-ink hero-grow">
                  <g className="hero-sway">
                    <path d={branch} />
                  </g>
                </g>
                {stars.map(
                  ([pathData, centerX, centerY, radius], starIndex) => (
                    <g
                      key={starIndex}
                      className="hero-pop"
                      style={{ '--k': starIndex }}
                    >
                      <g
                        className="hero-twinkle"
                        style={{ '--d': `${-starIndex * 1.6}s` }}
                      >
                        <g className="hero-star" onPointerEnter={glint}>
                          <g className="hero-star-rays">
                            <line
                              x1={centerX - radius * 1.6}
                              y1={centerY}
                              x2={centerX + radius * 1.6}
                              y2={centerY}
                            />
                            <line
                              x1={centerX}
                              y1={centerY - radius * 1.6}
                              x2={centerX}
                              y2={centerY + radius * 1.6}
                            />
                          </g>
                          <g className="hero-glint">
                            <circle
                              className="hero-hit"
                              cx={centerX}
                              cy={centerY}
                              r={radius}
                            />
                            <path className="hero-ink-fill" d={pathData} />
                          </g>
                        </g>
                      </g>
                    </g>
                  ),
                )}
              </g>
            </svg>

            <div className="hero-badge" aria-hidden="true">
              <svg className="hero-badge__ring" viewBox="0 0 120 120">
                <circle className="hero-badge__disc" cx="60" cy="60" r="58" />
                <defs>
                  <path
                    id="hero-badge-path"
                    d="M60 60 m-45 0 a45 45 0 1 1 90 0 a45 45 0 1 1 -90 0"
                  />
                </defs>
                <text>
                  <textPath
                    href="#hero-badge-path"
                    textLength="281"
                    lengthAdjust="spacing"
                  >
                    {en.hero.badge}
                  </textPath>
                </text>
              </svg>
              <div className="hero-badge__core">
                <Sparkle />
              </div>
            </div>
          </div>

          <div className="hero-copy">
            <h1 className="hero-name" aria-label={name}>
              {name.split('').map((character, characterIndex) => (
                <span
                  key={characterIndex}
                  className="hero-char"
                  style={{ '--i': characterIndex }}
                  aria-hidden="true"
                >
                  {character === ' ' ? ' ' : character}
                </span>
              ))}
            </h1>
            <div className="hero-titles">
              <Divider />
              <p className="hero-title hero-fx-in" style={{ '--at': '1.2s' }}>
                {en.hero.name}
              </p>
              <Divider flip />
            </div>
            <p className="hero-statement hero-fx-in" style={{ '--at': '1.4s' }}>
              {en.hero.statement}
            </p>
            <div
              className="hero-actions hero-fx-in"
              style={{ '--at': '1.55s' }}
            >
              <a className="hero-btn hero-btn--solid" href="#contact">
                {en.global.letsTalk} <span className="hero-btn__arrow">→</span>
              </a>
              <a className="hero-btn hero-btn--line" href="#portfolio">
                {en.global.seeMyWork} <span className="hero-btn__arrow">↓</span>
              </a>
            </div>
            <ul className="hero-socials hero-fx-in" style={{ '--at': '1.75s' }}>
              {socials.map((social) => (
                <li key={social.title}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.title}
                    dangerouslySetInnerHTML={{ __html: social.svg }}
                  ></a>
                </li>
              ))}
            </ul>
          </div>

          {sparks.map((spark, sparkIndex) => (
            <span
              key={sparkIndex}
              className={`hero-spark hero-spark--${sparkIndex + 1}`}
              style={{
                '--x': spark.left,
                '--y': spark.top,
                '--s': `${spark.size}px`,
                '--d': `${spark.delay}s`,
                '--at': `${spark.at}s`,
              }}
              onPointerEnter={glint}
              aria-hidden="true"
            >
              <span className="hero-glint">
                <Sparkle />
              </span>
            </span>
          ))}

          <a
            className="hero-cue hero-fx-in"
            style={{ '--at': '2.1s' }}
            href="#about"
          >
            <span>{en.global.scroll}</span>
            <span className="hero-cue__dots" aria-hidden="true">
              {[0, 1, 2, 3].map((dotIndex) => (
                <i key={dotIndex} style={{ '--n': dotIndex }} />
              ))}
            </span>
          </a>

          <div className="hero-fx" aria-hidden="true"></div>
        </div>
      </div>
    </header>
  )
}

export default Hero
