import tecnologias from '@/app/data/tecnologias.json';
import Image from "next/image"


    export default function page(){
        return (
            <div>
                <h2>Tecnologias Exploradas</h2>
                {tecnologias.map((tecnologias,i)=>{
                    return <li key={i}>{tecnologias.title}
                        <Image src={tecnologias.image}
                            alt={tecnologias.title}
                            width={200}
                            height={200}
                        />
                    </li>}
                )}
            </div>
        )
    } 