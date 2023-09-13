import { useState } from 'react'
import SearchForm from '../../components/SearchForm/SearchForm'
import SelectedFormFields from '../../components/SelectedFormFields/SelectedFormFields'
import ZipcodeForm from '../../components/ZipcodeForm/ZipcodeForm'
import { getZipcodeKey } from '../../utilities/general-function'
import { createSearchURL } from '../../utilities/scrapers/url-maker'
import { changeSetting } from '../../utilities/users-api'

export default function SettingsPage({ user, setUser }) {
    const [formData, setFormData] = useState({...user.settings.preferences})
    console.log(user)
    const [zipcode, setZipcode] = useState(user.settings?.locationInfo?.zipcode)
    const [errMsg, setErrMsg] = useState("")

    async function handleSubmit() {
        setErrMsg("")
        let locationInfo = null
        if (zipcode) {
            locationInfo = await getZipcodeKey(zipcode)
            if (!locationInfo) return setErrMsg("Invalid ZipCode")
        }
        
        const url = createSearchURL(formData)

        const newUserData = await changeSetting({
            preferences: formData,
            homePageUrl: url,
            locationInfo: {
                ...locationInfo,
                zipcode
            }
        })

        localStorage.setItem('token', newUserData.token)
        setUser(newUserData.user)
    }


    return (
        <div className="w-full p-8">
            <h1 className="text-2xl font-bold mb-4 text-center">Settings Page</h1>
            <SearchForm formData={formData} setFormData={setFormData} />
            <SelectedFormFields formData={formData} setFormData={setFormData} />
            <ZipcodeForm zipcode={zipcode} setZipcode={setZipcode} />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
                Save Changes
            </button>
            {errMsg ? <h1 className="text-red-600 mt-2">{errMsg}</h1> : ""}
        </div>

    )
}