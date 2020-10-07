import { useContext } from 'react'
import { Context } from '../contexts/LodProvider'

const useLod = () => {
  const { lod } = useContext(Context)
  return lod
}

export default useLod
