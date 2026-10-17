import Head from 'next/head'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Bytes from '../components/Bytes'
import Facts from '../components/Facts'
import Footer from '../components/Footer'

export default function Home() {
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
        <Bytes />
        {/* <Facts /> */}
        <Footer />
      </main>
    </div>
  )
}
