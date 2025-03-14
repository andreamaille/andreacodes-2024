import '../styles/tailwind.min.css'
import { BrowserRouter } from 'react-router-dom'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <BrowserRouter>
        <Component {...pageProps} />
      </BrowserRouter>
    </>
  )
}
