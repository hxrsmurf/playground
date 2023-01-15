import { date } from "../utils/utils"

export default function Form() {
    const utc_date = date()
    const current_date = date().toUTCString()

    return (
        <div className="m-4">
            <div className="text-2xl font-bold">{current_date}</div>
            <div className="mt-4"><textarea className="min-h-[400px] min-w-[400px]"></textarea></div>
            <div className="mt-4 rounded-full bg-blue-600 p-2 text-center max-w-[400px]"><button>Submit</button></div>
        </div>
    )
}