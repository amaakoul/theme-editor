import '../styles/globals.css'
import { wrapper } from '../redux/store'

function SafeHydrate({ children }) {
  return <div suppressHydrationWarning>{typeof window === 'undefined' ? null : children}</div>
}
const MyApp = ({ Component, pageProps }) => (
  <SafeHydrate>
    <Component {...pageProps} />
  </SafeHydrate>
)

export default wrapper.withRedux(MyApp)
