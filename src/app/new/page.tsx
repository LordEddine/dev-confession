import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { syncUser } from "@/actions/user.actions"
import { ConfessionForm } from "@/components/ConfessionForm";

// pour creation d'une nouvelle confession avec un formulaire
export default async function NewConfessionPage(){

    const { userId } = await auth(); // verification de connexion
    if(!userId) {
        redirect("/sign-in");
    }

    await syncUser();


    return(
        <main>
            <h1>Nouvelle confession</h1>
            <p>Liberez votre conscience de developpeur !</p>
            <ConfessionForm />
        </main>
    )
}