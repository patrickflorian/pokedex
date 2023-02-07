import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import { PokemonService } from 'services/api';
import { Pokemon } from 'types';
import { Loader, PokemonCard } from 'components';
import InfiniteScroll from "react-infinite-scroll-component";


interface HomePageProps {
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
): Promise<GetServerSidePropsResult<HomePageProps>> {
  let pokemons: HomePageProps["pokemons"] = null;

  const errors: any[] = [];

  //load product details
  const loadData = async () => {
    return PokemonService.listPokemon().then((res: any) => {
      return res.json();
    });
  };

  //Construct ssr Props
  try {
    pokemons = await loadData();
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
      pokemons: pokemons ?? null
    }
  };
}
const Home: NextPage<HomePageProps> = ({ pokemons }) => {

  const per_page = 18;
  const [page, setPage] = useState(1);
  const [items, setItems] = useState((pokemons ?? []).length > per_page ? (pokemons ?? []).slice(0, per_page - 1) : [])
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const search = router.query.search as string;

  const [keyword, setKeyword] = useState(search ?? '');

  const onChangeHandler = (text: string) => {
    setKeyword(text);
  }

  const fetchData = () => {
    const newItems = []

    for (let i = per_page * (page - 1); i < per_page * page; i++) {
      newItems.push(pokemons?.[i])
    }
    setPage(state => state + 1)
    // @ts-ignore
    setItems([...items, ...newItems])
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>My Pokedex</title>
        <link rel="icon" href="https://assets.pokemon.com/static2/_ui/img/favicon.ico" />
        <link rel="shortcut icon" href="https://assets.pokemon.com/static2/_ui/img/favicon.ico" />
      </Head>


      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

        {/* Page title */}
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="">
            Pokedex
          </a>
        </h1>

        <p className="mt-3 text-2xl">
          Find a pokemon
        </p>

        <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <div className="flex w-full flex-col columns-md justify-center justify-items-center items-center">
            {/* <div className="columns-md mt-10">
              <div className="relative w-full">
                <input
                  value={keyword}
                  onChange={e => onChangeHandler(e.target.value)}
                  type={'text'}
                  className="w-full rounded border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

            </div> */}
            <div className="mt-1 w-3/5">
              {pokemons?.length ?? 0}{' '} results
            </div>
            {loading && <div className="mt-10 w-3/5 flex justify-center justify-items-center items-center"><Loader /></div>}
            <div className="mt-10">
              <InfiniteScroll
                dataLength={items.length}
                next={fetchData}
                hasMore={(pokemons??[]).length > items?.length}
                loader={<><Loader /></>}
                className='md:grid flex flex-col grid-cols-3 gap-x-5 gap-y-5 mb-8'
              >
                {items?.map((pokemon) => <>
                  <PokemonCard pokemon={pokemon} />
                </>)}
              </InfiniteScroll>
              <div className='flex flex-row items-center justify-center w-full my-3'>
                {loading ? <><Loader /></> : null}
              </div>
            </div>

          </div>
        </div>
      </main>


    </div>
  )
}

export default Home
