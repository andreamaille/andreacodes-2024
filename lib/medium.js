export const MEDIUM_FEED_URL = 'https://medium.com/feed/@andrea_codes'

const SUMMARY_LENGTH = 180

const decodeEntities = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCharCode(parseInt(code, 16)),
    )
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

const getTag = (xml, tag) => {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  if (!match) return ''

  return match[1].replace(/^<!\[CDATA\[([\s\S]*)\]\]>$/, '$1').trim()
}

// Medium's feed has no excerpt, so the summary is the opening of the post
// with the title, headings and images removed.
const summarize = (html) => {
  const text = decodeEntities(
    html
      .replace(/<(h[1-6]|figure|pre)[^>]*>[\s\S]*?<\/\1>/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= SUMMARY_LENGTH) return text

  const cut = text.slice(0, SUMMARY_LENGTH)
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`
}

export const parseMediumFeed = (xml, limit = 4) =>
  (xml.match(/<item>[\s\S]*?<\/item>/g) || []).slice(0, limit).map((item) => ({
    title: decodeEntities(getTag(item, 'title')),
    url: getTag(item, 'link').split('?')[0],
    summary: summarize(
      getTag(item, 'content:encoded') || getTag(item, 'description'),
    ),
  }))

export const getLatestArticles = async (limit = 4) => {
  try {
    const response = await fetch(MEDIUM_FEED_URL)
    if (!response.ok) throw new Error(`Medium feed returned ${response.status}`)

    return parseMediumFeed(await response.text(), limit)
  } catch (error) {
    console.error('Could not load Medium articles:', error)
    return []
  }
}
