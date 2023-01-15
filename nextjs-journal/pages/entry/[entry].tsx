import Link from "next/link"
import { useRouter } from "next/router"

export default function entry() {
    const router = useRouter()
    const { entry } = router.query
    return (
        <div className="flex justify-center mt-4">
            <div className="space-x-4 max-w-[400px]">
                <div className="flex justify-center font-bold"><Link href='/'>Home</Link></div>
                <div className="mt-4">Sun, 15 Jan 2023 23:25:14 GMT</div>
                <div className="mt-4">
                    This is an example entry. With a decent amount of length.
                    This is an example entry. With a decent amount of length.
                    This is an example entry. With a decent amount of length.
                    This is an example entry. With a decent amount of length.
                    This is an example entry. With a decent amount of length.
                    This is an example entry. With a decent amount of length.
                </div>
            </div>
        </div>
    )
}