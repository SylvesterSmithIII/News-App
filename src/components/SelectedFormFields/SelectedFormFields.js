import { handleClick } from '../../utilities/general-function';

export default function SelectedFormFields({ formData, setFormData }) {
  const fieldButtons = [];

  for (const field in formData) {
    if (field === "limit") continue
    const buttons = formData[field].map((item, idx) => (
      
      <button
        key={idx}
        name={field}
        value={item}
        onClick={(evt) => handleClick(evt, formData, setFormData)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mb-2 mr-2"
      >
        {item}
      </button>
    ));
    fieldButtons.push(buttons);
  }

  return (
    <div className="mb-4">
      <label className="text-lg font-semibold mb-2 block">
        Selected Form Fields
      </label>
      {fieldButtons}
    </div>
  );
}
