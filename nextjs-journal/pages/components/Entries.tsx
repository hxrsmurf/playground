import Link from "next/link"

const list_entries = [
    {
        id: 1,
        title: 'My Title 1',
        text: 'Blah blah blah 1'

    },
    {
        id: 2,
        title: 'My Title 2',
        text: 'Blah blah blah 2'
    }
]

export default function Entries() {
    return (
        <div className="max-w-[100px] space-y-4 mt-4 min-[800px]:min-w-[200px] min-[800px]:pr-5">
            <div className="font-bold">
                Entries
            </div>
            <div>
                Sun, 15 Jan 2023 23:25:14 GMT
            </div>
            <div>
                Sun, 15 Jan 2023 23:25:14 GMT
            </div>
            {list_entries.map((entry, id) => (
                <div key={id}>
                    <Link href={'/entry/' + entry.id}>
                        {entry.text}
                    </Link>

                </div>
            ))}
        </div>
    )
}
