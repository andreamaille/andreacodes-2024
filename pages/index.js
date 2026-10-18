import Head from 'next/head'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Blog from '../components/Blog'
import Skills from '../components/Skills'
import Bytes from '../components/Bytes'
import Facts from '../components/Facts'
import Footer from '../components/Footer'
import { getLatestArticles } from '../lib/medium'

export default function Home({ articles }) {
  return (
    <div>
      <Head>
        <title>Andrea Harkins | Front End Engineer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero className="m-16" />
      <main>
        <About />
        <Projects />
        <Blog articles={articles} />
        <Skills />
        <Bytes />
        {/* <Facts /> */}
        <Footer />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const articles = await getLatestArticles(4)

  return {
    props: { articles },
    // Re-check Medium hourly, or sooner if the feed couldn't be reached.
    revalidate: articles.length ? 3600 : 300,
  }
}
