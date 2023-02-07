import React, { useEffect, useState } from "react";
import { Pokemon } from "types";
import Link from "next/link";
import { pokemonTypecolors } from "utils/colors";

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {

    return <Link href={`/pokemon/${pokemon?.name ?? pokemon?.id ?? ''}`} className="relative">

        <div className="w-60 bg-indigo-300 relative rounded-md py-8 pt-12"
            // @ts-ignore
            style={{ backgroundColor: `${pokemonTypecolors[pokemon?.apiTypes[0]?.name ?? '#222222']}3A` }}
        >
            <div className="list-image-container mx-auto">
                {pokemon && <>

                    <img src={pokemon?.image ?? ''} className='object-cover' />
                </>}
            </div>
        </div>
        <div className="mt-0.5 text-left w-40 font-bold">
            {pokemon?.name}
        </div>
        <div className="flex flex-row gap-1 justify-end w-full absolute right-2 top-2">
            {pokemon?.apiTypes?.map((item) => {
                return <div className="flex flex-row" key={item.name}>
                    <img src={item.image ?? ''} width={25} /> {item.name}
                </div>
            })}
        </div>

    </Link>
}

export default PokemonCard;