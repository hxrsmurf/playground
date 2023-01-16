import Entries from "./components/Entries";
import Form from "./components/Form";

export default function Home() {
  return (
    <div className="flex justify-center mt-4">
      <div className="grid grid-cols-3 max-w-[400px]">
        <Entries />
        <Form />
      </div>
    </div>
  )
}