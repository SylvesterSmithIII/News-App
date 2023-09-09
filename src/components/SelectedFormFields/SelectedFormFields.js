import { handleClick } from '../../utilities/general-function'

export default function SelectedFormFields({ formData, setFormData }) {

    const fieldButtons = []

    for (const field in formData) {
        const button = formData[field].map((item, idx) => <button key={idx} name={field} value={item} onClick={(evt) => handleClick(evt, formData, setFormData)}>{item}</button>)
        fieldButtons.push(button)
    }

    console.log(fieldButtons)

    return (
        fieldButtons
    )
}