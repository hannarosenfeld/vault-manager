export const RackInfo = ({ selectedRack }) => {
    console.log("🩵", selectedRack)
    if (!selectedRack.position) return null
    return (
        <div>{selectedRack.position}</div>
    )
}

export default RackInfo;