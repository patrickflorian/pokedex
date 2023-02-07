import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import { PokemonService } from 'services/api';
import { Pokemon } from 'types';
import { Loader, PokemonCard } from 'components';
import InfiniteScroll from "react-infinite-scroll-component";
import Link from 'next/link';
import { pokemonTypecolors } from 'utils/colors';


interface PokemonPageProps {
  pokemon: Pokemon | null
  pokemons: Pokemon[] | null
}
// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
  const router = useRouter();
  const search = router.query.search as string;

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<PokemonPageProps>> {
  let pokemon: PokemonPageProps["pokemon"] = null;
  let pokemons: PokemonPageProps["pokemons"] = null;
  const { locale, query, req } = context;
  const { search, id } = query;

  const errors: any[] = [];

  //load product details
  const loadData = async () => {
    return PokemonService.getPokemonDetail(String(id)).then((res: any) => {
      return res.json();
    });
  };

  //load product details
  const loadPokemons = async () => {
    return PokemonService.listPokemon().then((res: any) => {
      return res.json();
    });
  };
  //Construct ssr Props
  try {
    pokemon = await loadData();
    pokemons = await loadPokemons();
    // @ts-ignore
  } catch (e) {
    // @ts-ignore
    console.log(e)
    // return {
    //   notFound: true
    // };
  }
  return {
    props: {
      pokemon: pokemon ?? null,
      pokemons: pokemons ?? null
    }
  };
}
const PokemonPage: NextPage<PokemonPageProps> = ({ pokemon, pokemons }) => {

  const per_page = 18;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const search = router.query.search as string;
  const evolutions: Pokemon[] = [];
  for (let index = 0; index < (pokemon?.apiEvolutions ?? []).length; index++) {
    const ev = (pokemon?.apiEvolutions ?? [])[index];
    const pokemon_ev = pokemons?.find(item => item.pokedexId === ev.pokedexId);
    if (pokemon_ev) evolutions.push(pokemon_ev)
  }
  const preEvolution = pokemons?.find(item => item.pokedexId === pokemon?.apiPreEvolution?.pokedexIdd);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="https://assets.pokemon.com/static2/_ui/img/favicon.ico" />
        <link rel="shortcut icon" href="https://assets.pokemon.com/static2/_ui/img/favicon.ico" />
      </Head>


      <main className="flex w-full mt-5 flex-1 flex-col items-center  px-20 text-center">

        {/* Page title */}
        <h1 className="text-6xl font-bold">
          {pokemon?.name}
        </h1>

        <div className="mt-6 flex max-w-4xl flex-wrap sm:w-full text-left ">
          <div className="flex w-full flex-row columns-md mt-10 gap-5">
            <div className='border 0 p-12 rounded-md'
              // @ts-ignore
              style={{ backgroundColor: `${pokemonTypecolors[pokemon?.apiTypes[0]?.name ?? '#222222']}3A` }}>
              <img src={pokemon?.image ?? ''} className='object-cover' />
            </div>
            <div className='border-solid w-full flex flex-row flex-wrap'>
              <div className=' w-full p-2'>
                <div className='mb-1'>
                  <h2>
                    Type
                  </h2>
                </div>
                <div className="flex flex-row gap-1 w-full ">
                  {pokemon?.apiTypes?.map((item) => {
                    return <div className="flex flex-row" key={item.name}>
                      <img src={item.image ?? ''} width={25} /> {item.name}
                    </div>
                  })}
                </div>
              </div>
              <div className=' w-full p-2'>
                <div className='mb-1'>
                  <h2>
                    Resistances
                  </h2>

                </div>

                <div className="flex flex-row gap-1 w-full flex-wrap ">
                  {pokemon?.apiResistances?.filter(item => item.damage_multiplier <= 1).map((item) => {
                    // @ts-ignore
                    return <div key={item.name}>
                      <div
                        className="flex flex-col p-2 rounded-sm"
                        // @ts-ignore
                        style={{ backgroundColor: `${pokemonTypecolors[item.name]}3A` }}>
                        <p>
                          {`${item.name}`}
                          <span className='text-xs text-right text-gray-600 ml-3'>{`${item.damage_multiplier}X`} </span>
                        </p>
                      </div>
                    </div>
                  })}
                </div>
              </div>
              <div className='w-1/2 p-2'>
                <div className='mb-1'>
                  <h2>
                    Faiblesses
                  </h2>
                </div>

                <div className="flex flex-row gap-1 w-full flex-wrap ">
                  {pokemon?.apiResistances?.filter(item => item.damage_multiplier > 1).map((item) => {
                    return <div key={item.name}>
                      <div
                        className="flex flex-col p-2 rounded-sm"
                        // @ts-ignore
                        style={{ backgroundColor: `${pokemonTypecolors[item.name]}3A` }}>
                        <p>
                          {`${item.name}`}
                          <span className='text-xs text-right text-gray-600 ml-3'>{`${item.damage_multiplier}X`} </span>
                        </p>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row gap-3'>
            <div className='border  p-12 rounded-md  mt-10'>
              <h2> Stats de base </h2>
              <div className="flex flex-row columns-md mt-10 gap-5 flex-wrap justify-between">
                <div className='flex flex-col'>
                  <p className='text-xs'>PV</p>
                  <p>{pokemon?.stats.HP}</p>
                </div>

                <div className='flex flex-col'>
                  <p className='text-xs'>Attaque</p>
                  <p>{pokemon?.stats.attack}</p>
                </div>

                <div className='flex flex-col'>
                  <p className='text-xs' >Defense</p>
                  <p>{pokemon?.stats.defense}</p>
                </div>

              </div>
              <div className="flex flex-row columns-md mt-10 gap-5 flex-wrap justify-between">

                <div className='flex flex-col'>
                  <p className='text-xs'>Attaque spéciale</p>
                  <p>{pokemon?.stats.special_attack}</p>
                </div>

                <div className='flex flex-col'>
                  <p className='text-xs'> Defense Speciale</p>
                  <p>{pokemon?.stats.special_defense}</p>
                </div>

                <div className='flex flex-col'>
                  <p className='text-xs'>Vitesse</p>
                  <p>{pokemon?.stats.speed}</p>
                </div>
              </div>
            </div>
            {preEvolution && <div className="flex flex-row columns-md mt-10 min-w-[200px]">
              <div className='border  p-12 rounded-md'>
                <h2> Pre-Evolutions </h2> <div key={preEvolution.pokedexId}>
                  <Link href={`/pokemon/${preEvolution?.name ?? preEvolution?.id ?? ''}`} className="relative">

                    <div className="  relative rounded-md py-3">

                      <div className="list-image-container mx-auto">
                        {preEvolution && <>
                          <img src={preEvolution?.image ?? ''} className='object-cover' />
                        </>}
                      </div>
                      <div className="mt-0.5 text-left text-center">
                        {preEvolution.name}
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>}
            {evolutions?.length > 0 && <div className="flex flex-row columns-md mt-10">
              <div className='border  p-12 rounded-md'>
                <h2> Evolutions </h2>
                {evolutions?.map((ev) => {
                  return <div key={ev.pokedexId}>
                    <Link href={`/pokemon/${ev?.name ?? ev?.id ?? ''}`} className="relative">

                      <div className="  relative rounded-md py-3">

                        <div className="list-image-container mx-auto">
                          {ev && <>

                            <img src={ev?.image ?? ''} className='object-cover' />
                          </>}
                        </div>
                        <div className="mt-0.5 text-left text-center">
                          {ev.name}
                        </div>
                      </div>
                    </Link>
                  </div>
                })}
              </div>
            </div>}
          </div>

        </div>
      </main>


    </div>
  )
}

export default PokemonPage
