import Image from "next/image";
import { Header } from "@/components/Header"
import { getConfessions } from "@/actions/confession.actions";
import { ConfessionCard } from "@/components/ConfessionCard";
import { getCurrentUser } from "@/actions/user.actions";



export default async function Home() {
  const { confessions } = await getConfessions(1, 5); 
  const currentUser = await getCurrentUser();
  return (
    <div>
      {confessions.map((c) => (
          <ConfessionCard key={c.id} confession={c} currentUserId={currentUser?.id} />
      ))}
    </div>
  );
}
