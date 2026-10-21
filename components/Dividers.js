import { useEffect, useRef } from 'react'

const SPARKLE =
  'M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z'

const Sparkle = ({ x, y, size, light, delay = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${size / 24})`}>
    <path
      className={light ? 'divider-spark divider-spark--light' : 'divider-spark'}
      style={{ '--d': `${delay}s` }}
      transform="translate(-12 -12)"
      d={SPARKLE}
    />
  </g>
)

// Adds --armed straight away, then --inview once the divider scrolls into view
const useReveal = (ref) => {
  useEffect(() => {
    const divider = ref.current
    divider.classList.add('divider--armed')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        divider.classList.add('divider--inview')
        observer.disconnect()
      },
      { threshold: 0.5 },
    )
    observer.observe(divider)
    return () => observer.disconnect()
  }, [ref])
}

/* Hanging garland: a swagged string with charms that swing out of step */

const GARLAND_TOP = 18
const GARLAND_SAG = 108
const GARLAND_STOPS = [0.2, 0.4, 0.6, 0.8]

const Charm = ({ kind }) => {
  switch (kind) {
    case 'star':
      return (
        <path
          className="garland__fill"
          d={SPARKLE}
          transform="translate(-12 0)"
        />
      )
    case 'moon':
      return (
        <path
          className="garland__fill--light"
          d="M4 0A14 14 0 1 0 4 28A16 16 0 0 1 4 0Z"
        />
      )
    case 'planet':
      return (
        <>
          <circle className="garland__outline" cy="13" r="9" />
          <ellipse
            className="garland__ring"
            cy="13"
            rx="16"
            ry="4.5"
            transform="rotate(-18 0 13)"
          />
        </>
      )
    case 'tassel':
      return (
        <>
          <circle className="garland__fill--light" cy="6" r="4" />
          <path className="garland__fill" d="M0 10L-6 30H6Z" />
        </>
      )
    case 'drop':
      return (
        <path
          className="garland__fill"
          d="M0 0C8 10 10 16 10 21A10 10 0 0 1-10 21C-10 16-8 10 0 0Z"
        />
      )
    case 'sun':
      return (
        <g transform="translate(0 12)">
          <circle className="garland__fill" r="8" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <path
              key={angle}
              className="garland__ray"
              d="M0-14V-11"
              transform={`rotate(${angle})`}
            />
          ))}
        </g>
      )
    default:
      return null
  }
}

const GarlandArt = ({ width, swags, charms, className }) => {
  const span = width / swags
  let string = `M0 ${GARLAND_TOP}`
  const hangs = []

  for (let swag = 0; swag < swags; swag++) {
    const start = swag * span
    string += ` Q${start + span / 2} ${GARLAND_TOP + GARLAND_SAG} ${start + span} ${GARLAND_TOP}`

    GARLAND_STOPS.forEach((t) => {
      const index = hangs.length
      // Point on the quadratic curve, so each charm hangs from the string itself
      const x = start + t * span
      const y = GARLAND_TOP + 2 * (1 - t) * t * GARLAND_SAG
      const drop = 12 + ((index * 7) % 3) * 8
      hangs.push(
        <g key={index} transform={`translate(${x} ${y.toFixed(1)})`}>
          <g
            className="garland__charm"
            style={{
              '--d': `${(-index * 0.83).toFixed(2)}s`,
              '--sw': `${3.6 + (index % 3) * 0.5}s`,
            }}
          >
            <line className="garland__thread" y2={drop} />
            <g transform={`translate(0 ${drop}) scale(1.4)`}>
              <Charm kind={charms[index % charms.length]} />
            </g>
          </g>
        </g>,
      )
    })
  }

  return (
    <svg viewBox={`0 0 ${width} 170`} className={className}>
      <path className="garland__string" d={string} />
      {Array.from({ length: swags + 1 }, (_, pin) => (
        <circle
          key={pin}
          className="garland__fill"
          cx={pin * span}
          cy={GARLAND_TOP}
          r="4"
        />
      ))}
      {hangs}
    </svg>
  )
}

export const GarlandDivider = () => (
  <div className="divider garland" aria-hidden="true">
    <GarlandArt
      width={1200}
      swags={3}
      charms={[
        'star',
        'moon',
        'drop',
        'planet',
        'tassel',
        'sun',
        'moon',
        'star',
      ]}
      className="garland__art garland__art--wide"
    />
    <GarlandArt
      width={600}
      swags={2}
      charms={[
        'star',
        'moon',
        'planet',
        'drop',
        'sun',
        'tassel',
        'moon',
        'star',
      ]}
      className="garland__art garland__art--narrow"
    />
  </div>
)

/* Moon phases: the moons wax in from the full moon outward */

const MOON_R = 15

// Lit part of a moon, f from 0 (new) to 1 (full); waning moons are mirrored
const MoonLit = ({ f, waning }) => {
  if (f >= 1) return <circle className="moons__lit" r={MOON_R} />
  const rx = (Math.abs(1 - 2 * f) * MOON_R).toFixed(2)
  const sweep = f < 0.5 ? 0 : 1
  return (
    <path
      className="moons__lit"
      d={`M0 ${-MOON_R}A${MOON_R} ${MOON_R} 0 0 1 0 ${MOON_R}A${rx} ${MOON_R} 0 0 ${sweep} 0 ${-MOON_R}Z`}
      transform={waning ? 'scale(-1 1)' : undefined}
    />
  )
}

const PHASES = [
  [0.2, false],
  [0.5, false],
  [0.78, false],
  [1, false],
  [0.78, true],
  [0.5, true],
  [0.2, true],
]

export const MoonDivider = () => {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <div className="divider moons" ref={ref} aria-hidden="true">
      <span className="divider__rule divider__rule--left" />
      <svg viewBox="0 0 400 90" className="moons__art">
        <circle className="moons__glow" cx="200" cy="52" r="28" />
        {PHASES.map(([f, waning], index) => {
          const fromCentre = Math.abs(index - 3)
          return (
            <g
              key={index}
              transform={`translate(${20 + index * 60} 52)`}
              className={fromCentre === 3 ? 'moons__outer' : undefined}
            >
              <g className="moons__moon" style={{ '--i': fromCentre }}>
                <circle className="moons__disc" r={MOON_R} />
                <g className="moons__phase">
                  <MoonLit f={f} waning={waning} />
                </g>
              </g>
            </g>
          )
        })}
        {[50, 110, 170, 230, 290, 350].map((x) => (
          <circle key={x} className="moons__dot" cx={x} cy="52" r="1.8" />
        ))}
        <Sparkle x={200} y={10} size={13} />
        <Sparkle x={168} y={22} size={7} light delay={-1.3} />
        <Sparkle x={232} y={20} size={8} light delay={-2.4} />
      </svg>
      <span className="divider__rule divider__rule--right" />
    </div>
  )
}

/* Constellation: a fine line draws star to star and each star pops in as it arrives */

const CONSTELLATIONS = {
  wide: {
    width: 1200,
    stars: [
      [40, 96, 7],
      [190, 58, 11],
      [330, 84, 8],
      [470, 34, 14],
      [610, 70, 9],
      [700, 112, 7],
      [850, 66, 12],
      [1000, 92, 8],
      [1160, 40, 13],
    ],
    dust: [
      [96, 30],
      [262, 118],
      [398, 22],
      [540, 108],
      [655, 26],
      [772, 48],
      [920, 124],
      [1080, 20],
      [1110, 112],
      [150, 126],
      [430, 120],
      [980, 30],
    ],
  },
  narrow: {
    width: 600,
    stars: [
      [30, 96, 9],
      [150, 56, 13],
      [270, 92, 9],
      [380, 40, 15],
      [480, 78, 10],
      [575, 46, 13],
    ],
    dust: [
      [80, 30],
      [210, 124],
      [330, 20],
      [430, 118],
      [530, 112],
      [250, 34],
    ],
  },
}

const ConstellationArt = ({ size }) => {
  const { width, stars, dust } = CONSTELLATIONS[size]
  const line = stars
    .map(([x, y], index) => `${index ? 'L' : 'M'}${x} ${y}`)
    .join('')

  return (
    <svg
      viewBox={`0 0 ${width} 140`}
      className={`constellation__art constellation__art--${size}`}
    >
      {dust.map(([x, y], index) => (
        <circle
          key={index}
          className="constellation__dust"
          style={{ '--d': `${(-index * 0.45).toFixed(2)}s` }}
          cx={x}
          cy={y}
          r={index % 3 ? 1.2 : 2}
        />
      ))}
      <path className="constellation__line" pathLength="1" d={line} />
      {stars.map(([x, y, starSize], index) => (
        <g key={index} transform={`translate(${x} ${y})`}>
          <g className="constellation__star" style={{ '--i': index }}>
            <circle className="constellation__halo" r={starSize * 0.95} />
            <path
              className={
                index % 3 === 1
                  ? 'constellation__point constellation__point--light'
                  : 'constellation__point'
              }
              d={SPARKLE}
              transform={`scale(${(starSize / 12).toFixed(2)}) translate(-12 -12)`}
            />
          </g>
        </g>
      ))}
    </svg>
  )
}

export const ConstellationDivider = () => {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <div className="divider constellation" ref={ref} aria-hidden="true">
      <ConstellationArt size="wide" />
      <ConstellationArt size="narrow" />
    </div>
  )
}

/* Star trail: the star rides the dotted path as the page scrolls */

const STAR = 'M0-16C2-6 6-2 16 0 6 2 2 6 0 16-2 6-6 2-16 0-6-2-2-6 0-16Z'

const TRAILS = {
  wide: {
    viewBox: '0 0 1200 150',
    d: 'M-20 104C140 104 250 40 380 52C470 61 528 116 482 128C436 140 404 84 452 62C540 22 690 98 850 84C960 74 1030 44 1110 40',
    sparkles: [
      [330, 22, 14, false, 0],
      [620, 40, 9, true, -1.2],
      [980, 112, 12, false, -2],
      [1160, 92, 8, true, -0.5],
    ],
  },
  narrow: {
    viewBox: '0 0 600 150',
    d: 'M-20 104C60 104 120 54 190 60C240 64 268 112 236 122C204 132 190 86 222 70C280 42 360 90 440 78C500 70 540 48 580 44',
    sparkles: [
      [150, 26, 16, false, 0],
      [520, 104, 14, true, -1.6],
    ],
  },
}

export const TrailDivider = () => {
  const ref = useRef(null)

  useEffect(() => {
    const divider = ref.current
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const place = () => {
      const box = divider.getBoundingClientRect()
      const viewport = window.innerHeight
      // 0 as the divider enters at the bottom, 1 once it reaches the top quarter
      const progress = Math.min(
        1,
        Math.max(0, (viewport - box.top) / (viewport * 0.75)),
      )
      divider.querySelectorAll('.trail__art').forEach((art) => {
        if (!art.getBoundingClientRect().width) return
        const path = art.querySelector('.trail__path')
        const length = path.getTotalLength()
        const point = path.getPointAtLength((0.12 + progress * 0.86) * length)
        art
          .querySelector('.trail__star')
          .setAttribute('transform', `translate(${point.x} ${point.y})`)
        art.querySelector('.trail__reveal').setAttribute('width', point.x + 70)
      })
    }

    place()
    window.addEventListener('scroll', place, { passive: true })
    window.addEventListener('resize', place)
    return () => {
      window.removeEventListener('scroll', place)
      window.removeEventListener('resize', place)
    }
  }, [])

  return (
    <div className="divider trail" ref={ref} aria-hidden="true">
      {Object.entries(TRAILS).map(([size, trail]) => {
        const width = Number(trail.viewBox.split(' ')[2])
        const [endX, endY] = trail.d.split(' ').slice(-2)
        return (
          <svg
            key={size}
            viewBox={trail.viewBox}
            className={`trail__art trail__art--${size}`}
          >
            {/* The trail only shows behind the star; with reduced motion the whole trail shows */}
            <clipPath id={`trail-clip-${size}`}>
              <rect
                className="trail__reveal"
                x="-40"
                y="-40"
                width={width + 80}
                height="230"
              />
            </clipPath>
            <path
              className="trail__path"
              clipPath={`url(#trail-clip-${size})`}
              d={trail.d}
            />
            {trail.sparkles.map(([x, y, sparkleSize, light, delay]) => (
              <Sparkle
                key={x}
                x={x}
                y={y}
                size={sparkleSize}
                light={light}
                delay={delay}
              />
            ))}
            <g className="trail__star" transform={`translate(${endX} ${endY})`}>
              <circle className="trail__halo" r="24" />
              <path className="trail__point" d={STAR} />
            </g>
          </svg>
        )
      })}
    </div>
  )
}
