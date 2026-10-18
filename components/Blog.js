import en from '../data/en.json'
import { socials } from '../data/data'

const SPARKLE =
  'M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12z'

// The moon waxes from a crescent to full across the posts, newest first
const moonPhases = [
  {
    lit: 'M32 14A18 18 0 0 1 32 50A11 18 0 0 0 32 14Z',
    sparkles: ['translate(48 4) scale(0.34)'],
    dots: [[12, 10, 1.2]],
  },
  {
    lit: 'M32 14A18 18 0 0 1 32 50Z',
    sparkles: ['translate(6 6) scale(0.3)'],
    dots: [[56, 52, 1.1]],
  },
  {
    lit: 'M32 14A18 18 0 0 1 32 50A10 18 0 0 1 32 14Z',
    sparkles: ['translate(47 46) scale(0.32)'],
    dots: [[10, 50, 1.2]],
  },
  {
    lit: null,
    sparkles: ['translate(46 0) scale(0.4)', 'translate(4 44) scale(0.26)'],
    dots: [[58, 30, 1.1]],
  },
]

const MoonIcon = ({ phase }) => (
  <svg className="bytes-icon blog-moon" aria-hidden="true" viewBox="0 0 64 64">
    <g className="blog-moon__body">
      {phase.lit ? (
        <path className="bytes-icon__fill" d={phase.lit} />
      ) : (
        <circle className="bytes-icon__fill" cx="32" cy="32" r="18" />
      )}
      <circle cx="32" cy="32" r="18" />
    </g>
    {phase.sparkles.map((transform) => (
      <path
        key={transform}
        className="bytes-icon__solid bytes-icon__sparkle"
        transform={transform}
        d={SPARKLE}
      />
    ))}
    {phase.dots.map(([cx, cy, r]) => (
      <circle
        key={`${cx}-${cy}`}
        className="bytes-icon__solid"
        cx={cx}
        cy={cy}
        r={r}
      />
    ))}
  </svg>
)

const ArrowIcon = ({ className }) => (
  <svg aria-hidden="true" className={className} viewBox="0 0 24 24">
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
)

const Blog = ({ articles = [] }) => {
  if (!articles.length) return null

  const mediumUrl = socials.find(({ title }) => title === 'Medium').url

  return (
    <section id="blog" className="blog my-8 py-4 lg:flex lg:gap-16">
      <div className="mb-8 lg:mb-0 lg:w-[340px] lg:shrink-0">
        <h2>{en.blog.title}</h2>
        <p className="text-lg">{en.blog.description}</p>
        <a
          href={mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="blog-all-link"
        >
          {en.blog.viewAll}
          <ArrowIcon className="blog-arrow !h-4 !w-4" />
        </a>
      </div>

      <ol className="blog-list">
        {articles.map((article, index) => (
          <li key={article.url}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-item"
            >
              <MoonIcon phase={moonPhases[index % moonPhases.length]} />
              <span className="flex min-w-0 grow flex-col gap-2">
                <span className="blog-title font-workSansSemibold text-lg lg:text-xl">
                  {article.title}
                </span>
                {article.summary && (
                  <span className="max-w-2xl">{article.summary}</span>
                )}
              </span>
              <ArrowIcon className="blog-arrow" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Blog
