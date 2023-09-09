export default function ZipcodeForm({ zipcode, setZipcode }) {

    function handleChange(evt) {
        setZipcode(evt.target.value)
    }

    return (
        <input type="number"  onChange={handleChange} />
    )
}