import en from '../data/en.json'

const About = () => {
  return (
    <section className="my-8" id="about">
      <div className="mb-8 w-[75px]">
        <img src={'/about_stars.svg'} alt="" />
      </div>
      <div className="items-start justify-between lg:flex">
        <div className="lg:mr-8 lg:w-1/2">
          <h2>{en.about.title}</h2>
          {/* Mobile Image */}
          <img
            src={'/about_andy.svg'}
            alt=""
            className="mb-6 md:max-h-[400px] lg:mb-0 lg:hidden"
          />
          <div dangerouslySetInnerHTML={{ __html: en.about.description }}></div>
        </div>
        <div className="mt-8 px-8 lg:w-1/2">
          {/* Desktop */}
          <img
            src={'/about_andy.svg'}
            alt=""
            className="m-auto hidden max-w-[400px] lg:block"
          />
        </div>
      </div>
    </section>
  )
}

export default About
