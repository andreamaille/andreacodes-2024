import Head from 'next/head'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Footer from '../components/Footer'

const { library, config } = require('@fortawesome/fontawesome-svg-core')

// Font Awesome Icons
import {
  faReact,
  faJs,
  faShopify,
  faHtml5,
} from '@fortawesome/free-brands-svg-icons'

export default function Home() {
  library.add(faReact, faJs, faShopify, faHtml5)
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
        <Skills />
        <Footer />
      </main>
    </div>
  )
}
