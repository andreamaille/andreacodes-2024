import Head from 'next/head'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Andrea Harkins | Front End Engineer</title>
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://kit.fontawesome.com/b37c5bc39b.js"
          crossorigin="anonymous"
        ></script>
      </Head>

      <Hero className="m-16" />
      <main>
        <About />
        <Projects />
        <Skills />
      </main>
    </div>
  )
}
