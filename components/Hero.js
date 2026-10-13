import en from '../data/en.json'
import { socials } from '../data/data'
import { branch, hand, stars } from './heroArt'
import Nav from './Nav'

import { useEffect, useRef } from 'react'

// hero.svg sits inside an 800 x 1000 scene so the sun and orbits have room around it
const HX = 180
const HY = 110
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

// Small sparkles that drift out from a star when it is hovered
const burst = (layer, x, y) => {
  for (let i = 0; i < 5; i++) {
    const p = document.createElement('span')
    p.className = 'hero-particle'
    p.innerHTML = `<svg viewBox="0 0 24 24"><path d="${SPARKLE}"/></svg>`
    const size = 5 + Math.random() * 5
    p.style.width = p.style.height = `${size}px`
    p.style.left = `${x}px`
    p.style.top = `${y}px`
    layer.appendChild(p)
    const a = (i / 5) * Math.PI * 2 + Math.random() * 0.6
    const d = 22 + Math.random() * 18
    p.animate(
      [
        { transform: 'translate(0,0) scale(.3)', opacity: 0 },
        {
          transform: `translate(${Math.cos(a) * d * 0.45}px,${Math.sin(a) * d * 0.45}px) scale(1)`,
          opacity: 1,
          offset: 0.3,
        },
        {
          transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(.4) rotate(60deg)`,
          opacity: 0,
        },
      ],
      {
        duration: 1300 + Math.random() * 400,
        easing: 'cubic-bezier(.22,1,.36,1)',
      },
    ).onfinish = () => p.remove()
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
    const q = (s) => root.querySelector(s)
    const art = q('.hero-art')
    const badge = q('.hero-badge')
    const disc = q('.hero-sun')
    const sunMove = q('.hero-sun-move')
    const moon = q('.hero-moon')
    const orbit2 = q('.hero-orbit2')
    const ring2 = q('.hero-ring2')
    const moon2 = q('.hero-moon2')
    const badgeRing = q('.hero-badge__ring')

    const st = {
      h: 0,
      ht: 0,
      bh: 0,
      bht: 0,
      mx: 0,
      my: 0,
      mxt: 0,
      myt: 0,
      s: 1,
      sv: 0,
      time: 0,
      moon: -1.2,
      moon2: 0.4,
      badge: 0,
    }
    const on = (el, type, fn) => el.addEventListener(type, fn)
    on(art, 'pointerenter', () => (st.ht = 1))
    on(art, 'pointerleave', () => (st.ht = 0))
    on(badge, 'pointerenter', () => (st.bht = 1))
    on(badge, 'pointerleave', () => (st.bht = 0))
    on(root, 'pointermove', (e) => {
      const r = root.getBoundingClientRect()
      st.mxt = (e.clientX - r.left) / r.width - 0.5
      st.myt = (e.clientY - r.top) / r.height - 0.5
    })
    on(root, 'pointerleave', () => {
      st.mxt = 0
      st.myt = 0
    })

    const place = (el, angle, r) => {
      el.setAttribute('cx', (SUN.x + Math.cos(angle) * r).toFixed(1))
      el.setAttribute('cy', (SUN.y + Math.sin(angle) * r).toFixed(1))
    }

    const frame = (dt) => {
      const k = 1 - Math.exp(-dt * 3)
      const km = 1 - Math.exp(-dt * 2.5)
      st.time += dt
      st.h += (st.ht - st.h) * k
      st.bh += (st.bht - st.bh) * k
      st.mx += (st.mxt - st.mx) * km
      st.my += (st.myt - st.my) * km
      const h = st.h

      // Sun swells with a soft spring on hover and breathes slightly at rest
      const target = 1 + h * 0.07 + Math.sin(st.time * 1.1) * 0.008
      st.sv += ((target - st.s) * 60 - st.sv * 9) * dt
      st.s += st.sv * dt
      disc.setAttribute(
        'transform',
        `translate(${SUN.x} ${SUN.y}) scale(${st.s.toFixed(4)}) translate(${-SUN.x} ${-SUN.y})`,
      )
      sunMove.setAttribute(
        'transform',
        `translate(${(st.mx * (14 + h * 36)).toFixed(2)} ${(st.my * (10 + h * 28)).toFixed(2)})`,
      )

      st.moon += dt * (0.14 + h * 0.9)
      place(moon, st.moon, ORBIT_R)

      // Second orbit only shows on hover. It grows out from the main orbit and
      // shares its centre, so it never crosses the sun
      const r2 = ORBIT_R + h * 42
      st.moon2 += dt * (0.1 + h * 0.7)
      orbit2.setAttribute('opacity', h.toFixed(3))
      ring2.setAttribute('r', r2.toFixed(1))
      place(moon2, st.moon2, r2)

      st.badge += dt * (14 + st.bh * 70)
      badgeRing.style.transform = `rotate(${st.badge.toFixed(2)}deg)`
    }

    // Place the moons once; with reduced motion the scene stays still
    frame(0)
    if (reduceMotion()) return

    let raf
    let last = performance.now()
    const loop = (now) => {
      frame(Math.min(0.05, (now - last) / 1000))
      last = now
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
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
              <g transform={`translate(${HX} ${HY})`}>
                <g className="hero-ink" clipPath="url(#hero-wipe)">
                  {hand.map((d) => (
                    <path key={d.slice(0, 12)} d={d} />
                  ))}
                </g>
                <g className="hero-ink hero-grow">
                  <g className="hero-sway">
                    <path d={branch} />
                  </g>
                </g>
                {stars.map(([d, x, y, r], k) => (
                  <g key={k} className="hero-pop" style={{ '--k': k }}>
                    <g
                      className="hero-twinkle"
                      style={{ '--d': `${-k * 1.6}s` }}
                    >
                      <g className="hero-star" onPointerEnter={glint}>
                        <g className="hero-star-rays">
                          <line
                            x1={x - r * 1.6}
                            y1={y}
                            x2={x + r * 1.6}
                            y2={y}
                          />
                          <line
                            x1={x}
                            y1={y - r * 1.6}
                            x2={x}
                            y2={y + r * 1.6}
                          />
                        </g>
                        <g className="hero-glint">
                          <circle className="hero-hit" cx={x} cy={y} r={r} />
                          <path className="hero-ink-fill" d={d} />
                        </g>
                      </g>
                    </g>
                  </g>
                ))}
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
              {name.split('').map((char, i) => (
                <span
                  key={i}
                  className="hero-char"
                  style={{ '--i': i }}
                  aria-hidden="true"
                >
                  {char === ' ' ? ' ' : char}
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

          {sparks.map((s, i) => (
            <span
              key={i}
              className={`hero-spark hero-spark--${i + 1}`}
              style={{
                '--x': s.left,
                '--y': s.top,
                '--s': `${s.size}px`,
                '--d': `${s.delay}s`,
                '--at': `${s.at}s`,
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
              {[0, 1, 2, 3].map((n) => (
                <i key={n} style={{ '--n': n }} />
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
