import { useEffect, useState } from "react"
import { date } from "../utils/utils"

export default function Form() {
    const [entry, setEntry] = useState()
    const [loading, setLoading] = useState(true)
    const utc_date = date()
    const current_date = date().toUTCString()

    useEffect(() => {
        setLoading(false)
    }, [])

    const handleUpdate = (e: any) => {
        setEntry(e.target.value)
    }
    const handleSubmit = () => {
        console.log(entry)
        setEntry(undefined)
        const div_id: any = document.getElementById('entry')
        div_id.value = ""
    }

    if (loading) return <>Loading...</>

    return (
        <div className="m-4 min-w-[200px] min-[800px]:min-w-[400px]">
            <div className="text-1xl font-bold">{current_date}</div>
            <div className="mt-4"><textarea id='entry' autoFocus className="min-h-[400px] min-[800px]:min-w-[400px]" onChange={(e) => handleUpdate(e)}></textarea></div>
            <div className="mt-4 rounded-full bg-blue-600 p-2 text-center cursor-pointer" onClick={() => handleSubmit()}><button>Submit</button></div>
        </div>
    )
}