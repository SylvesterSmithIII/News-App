import { useState } from 'react'
import SearchForm from '../../components/SearchForm/SearchForm'
import SelectedFormFields from '../../components/SelectedFormFields/SelectedFormFields'
import ZipcodeForm from '../../components/ZipcodeForm/ZipcodeForm'
import { getZipcodeKey } from '../../utilities/general-function'
import { createSearchURL } from '../../utilities/scrappers/url-maker'
import { changeSetting } from '../../utilities/users-api'

export default function SettingsPage({ user, setUser }) {
    const [formData, setFormData] = useState({...user.settings.preferences})
    const [zipcode, setZipcode] = useState(0)
    const [errMsg, setErrMsg] = useState("")

    async function handleSubmit() {
        setErrMsg("")
        let zipcodeKey = ""
        if (zipcode) {
            zipcodeKey = await getZipcodeKey(zipcode)
            console.log(zipcodeKey)
            if (!zipcodeKey) return setErrMsg("Invalid ZipCode")
        }
        
        const url = createSearchURL(formData)

        const newUserData = await changeSetting({
            preferences: formData,
            homePageUrl: url,
            zipcodeKey
        })

        localStorage.setItem('token', newUserData.token)
        setUser(newUserData.user)
    }


    return (
        <div>
            <SearchForm formData={formData} setFormData={setFormData} />
            <SelectedFormFields formData={formData} setFormData={setFormData} />
            <ZipcodeForm zipcode={zipcode} setZipcode={setZipcode} />
            <button onClick={handleSubmit}>Save Changes</button>
            {errMsg ? <h1>{errMsg}</h1> : ""}
        </div>
    )
}