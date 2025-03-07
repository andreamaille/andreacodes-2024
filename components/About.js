import en from '../data/en.json'

const About = () => {
  return (
    <section className="my-8" id="about">
      <div className="mb-8 w-[75px]">
        <img src={'/about_stars.svg'} alt="" />
      </div>
      <div className="items-start justify-between lg:flex">
        <div className="mr-8 lg:w-1/2">
          <h2>{en.about.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: en.about.description }}></div>
        </div>
        <div className="mt-8 px-8 lg:w-1/2">
          <img
            src={'/about_andy.svg'}
            alt=""
            className="m-auto max-w-[400px]"
          />
        </div>
      </div>
    </section>
  )
}

export default About
