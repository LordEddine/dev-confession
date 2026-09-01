"use client"

import { Confession, Emoji } from "@/generated/prisma/client"
import { EMOJI_MAP ,CATEGORY_MAP, ConfessionWithReactions } from "@/lib/types"
import { reagir } from "@/actions/reaction.actions"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

type Props = {
    confession: ConfessionWithReactions;
    currentUserId?: string;
}

export function ConfessionCard({ confession, currentUserId }: Props){
    const categoryInfo = CATEGORY_MAP[confession.category];

    const reactionCounts = confession.reactions.reduce((acc, r) => {
        acc[r.emoji] = (acc[r.emoji] || 0) + 1;
        return acc;
    }, {} as Record<Emoji, number>)
    /*
    [{emoji:"LAUGH"}, {emoji:"LAUGH"},{emoji:"FIRE"}].reduce 
    1 - {}             LAUGH --> {LAUGH : 1}
    2 - {LAUGH : 1}    LAUGH --> {LAUGH : 2}
    3 - {LAUGH : 2}    FIRE ---> {LAUGH:2 , FIRE:1}   
    */

    const userReactions = confession.reactions
                                        .filter((u)=> u.userId === currentUserId)
                                        .map((u)=> u.emoji);
    
    async function handleReaction(emoji: Emoji){
        if(!currentUserId){
            alert("Connectez vous pour pouvoir reagir")
            return;
        }

        try{
            await reagir(confession.id, emoji);
        }catch(error){
            alert("Erreur")
        }finally{
            return;
        }
    }                  
    
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span>{categoryInfo.icon}</span>
                    <span>{categoryInfo.label}</span>
                </div>
                <time>
                    {formatDistanceToNow(new Date(confession.createdAt), {addSuffix: true , locale: fr})}
                </time>
            </div>



            <p>
                {confession.content}
            </p>

            <div>
                {confession.isAnonymous ? 
                (
                    <>
                        <span>Dev Anonyme</span>
                    </>
                )
            : (
                    <>
                    {confession.author.imageUrl && (<img src={confession.author.imageUrl} alt=" "  /> )}
                    <span>{confession.author.username}</span>
                    </>
            )}
            </div>

            <div>
                {(Object.keys(EMOJI_MAP) as Emoji[]).map((emoji) => {
                    const count = reactionCounts[emoji] || 0;
                    return(
                        <button>
                            <span>{EMOJI_MAP[emoji]}</span>
                            {count > 0  && <span>{count}</span>} 
                        </button>)
                })}
            </div>
        </div>
    )
}