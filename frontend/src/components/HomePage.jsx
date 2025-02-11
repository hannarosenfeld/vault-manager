import { useDispatch } from "react-redux"
import { getAllWarehousesThunk } from "../store/warehouse"
import { useEffect } from "react"

export default function HomePage() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllWarehousesThunk())
  }, [])

  return (
    <div className="w-full border-2 h-full">

    </div>
  )
}