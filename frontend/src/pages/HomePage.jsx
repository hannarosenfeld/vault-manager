import { useDispatch, useSelector } from "react-redux"
import { getAllWarehousesThunk } from "../store/warehouse"
import { useEffect } from "react"
import LoadingSpinner from "../components/LoadingSpinner"

export default function HomePage() {
  const dispatch = useDispatch()
  const warehouses = useSelector(state => state.warehouse)
  const warehouseArr = Object.keys(warehouses)

  useEffect(() => {
    dispatch(getAllWarehousesThunk())
  }, [])

  useEffect(() => {
    console.log("❤️‍🔥", warehouses)
  }, [warehouses])

  if (!warehouseArr.length) return <LoadingSpinner/>

  return (
    <div className="w-full border-2 h-full">

    </div>
  )
}