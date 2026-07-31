import { useEffect, useState } from 'react'
import Clash from './Clash.jsx'

export default function App() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  return <Clash dark={dark} setDark={setDark} />
}
