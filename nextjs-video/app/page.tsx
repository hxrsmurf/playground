import Link from "next/link";

export default function Home() {
  return (
    <div>
      Hello
      <video id="vid1" className="video-js">
        <source src="//vjs.zencdn.net/v/oceans.mp4"/>
      </video>
    </div>
  )
}