export default function ZipcodeForm({ zipcode, setZipcode }) {

    function handleChange(evt) {
        setZipcode(evt.target.value)
    }

    return (
        <div className="mb-4">
            <label className="text-lg font-semibold mb-2 block">Zipcode Form</label>
            <input
                type="number"
                onChange={handleChange}
                value={zipcode}
                className="w-full px-4 py-2 border rounded-lg"
            />
        </div>
    )
}