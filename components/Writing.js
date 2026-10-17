import en from '../data/en.json'
import { socials } from '../data/data'

const ArrowIcon = ({ className }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7" />
    <path d="M8 7h9v9" />
  </svg>
)

const Writing = ({ articles = [] }) => {
  if (!articles.length) return null

  const mediumUrl = socials.find(({ title }) => title === 'Medium').url

  return (
    <section id="writing" className="my-8 py-4 lg:flex lg:gap-16">
      <div className="mb-8 lg:mb-0 lg:w-[340px] lg:shrink-0">
        <h2>{en.writing.title}</h2>
        <p className="text-lg">{en.writing.description}</p>
        <a
          href={mediumUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="writing-all-link"
        >
          {en.writing.viewAll}
          <ArrowIcon className="h-4 w-4" />
        </a>
      </div>

      <ol className="writing-list">
        {articles.map((article, index) => (
          <li key={article.url}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="writing-item"
            >
              <span className="writing-number">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="flex grow flex-col gap-2">
                <span className="font-workSansSemibold text-lg lg:text-xl">
                  {article.title}
                </span>
                {article.summary && (
                  <span className="max-w-2xl text-black">
                    {article.summary}
                  </span>
                )}
              </span>
              <ArrowIcon className="writing-arrow" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Writing
