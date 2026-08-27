"use client"
import {useState} from 'react'
import {CATEGORY_MAP} from '@/lib/types'

export function ConfessionForm(){
    const [charCount, setCharCount] = useState(0);
    const [isAnonymous, setIsAnonymous] = useState(true);


    return(
        <form>

            <div>
                <label>Categorie de votre fail</label>
                <div>
                    {Object.entries(CATEGORY_MAP).map(([key, {label, icon}]) => (
                        <label key={key}>
                            <input name='category' value={key} type='radio' defaultChecked={key === "BUG"}/>
                            <span>{icon}</span>
                            <span>{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label>Votre confession</label>
                <textarea 
                name="content" 
                maxLength={500} 
                rows={5}
                placeholder="J'avoue que j'ai ..."  
                onChange={(e) => setCharCount(e.target.value.length)}
                
                className="resize-none"

                required
                />
            </div>

            <div>
                <button 
                    type='button' 
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`relative w-14 h-7 rounded-full transition-colors ${isAnonymous ? "bg-purple-600" : "bg-gray-700"}`}>
                        <span className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${isAnonymous ? "left-8" : "left-1"}`} />
                </button>
                <span>
                    {isAnonymous ? "Anonyme" : "Avec mon Pseudo"}
                </span>
            </div>
            
        </form>
    )
}