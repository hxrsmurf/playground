import { useAuth } from "@clerk/nextjs";

export default function kevin() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
   if (!isLoaded || !userId) {

    return <div>Sign In</div>

  }
  return (
    <div>kevin1</div>
  )
}
