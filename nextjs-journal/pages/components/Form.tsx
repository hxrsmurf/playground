import { date } from "../utils/utils"

export default function Form() {
    const current_date = date().toUTCString()

    return (
        <div className="m-4">
            <div>{current_date}</div>
            <div className="mt-4"><textarea></textarea></div>
            <div className="mt-4 rounded-full bg-blue-600 p-2 text-center max-w-[400px]"><button>Submit</button></div>
        </div>
    )
}