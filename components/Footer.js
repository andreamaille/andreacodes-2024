import { useForm, ValidationError } from '@formspree/react'

const Divider = () => {
  return (
    <div className="mb-8 mt-2 lg:mb-16 lg:mt-32">
      <div className="ml-[-24px] mr-[-24px] lg:ml-[-75px] lg:mr-[-75px]">
        <img src="/doodle_star-divider.svg" alt="" className="lg:hidden" />
        <img
          src="/doodle_star-divider_desktop.svg"
          alt=""
          className="hidden lg:block"
        />
      </div>
    </div>
  )
}

const ContactForm = () => {
  const [state, handleSubmit] = useForm(
    'https://formspree.io/f/andrea.maille@gmail.com',
  )
  if (state.succeeded) {
    return <p>Thanks for joining!</p>
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:max-w-[80%]">
      <label htmlFor="name" className="sr-only">
        Name
      </label>
      <input type="text" id="name" name="name" placeholder="Name" required />
      <label htmlFor="email" className="sr-only">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        name="email"
        required
        placeholder="Email"
      />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea
        id="message"
        name="message"
        placeholder="Message"
        required
        className="h-48"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />
      <button type="submit" disabled={state.submitting} className="w-auto">
        Send
      </button>
    </form>
  )
}

const Footer = () => {
  return (
    <>
      <Divider />

      <div
        className="flex flex-col-reverse items-center justify-center md:flex-row"
        id="contact"
      >
        <div className="hidden md:block md:w-[40%]">
          <img
            src="/footer_planet-stars.svg"
            alt=""
            className="md:h-[500px] lg:h-[650px]"
          />
        </div>
        <div className="md:w-[55%]">
          <h2 className="footer-title">Let's Make Something Great Together.</h2>
          <ContactForm />
        </div>
      </div>
    </>
  )
}

export default Footer
