import type { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import React, { useState, useEffect } from "react";
import { PokemonService } from 'services/api';
import { APIType, Pokemon } from 'types';
import { Loader, PokemonCard } from 'components';
import InfiniteScroll from "react-infinite-scroll-component";


interface HomePageProps {
  types: APIType[] | null
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
  let types: HomePageProps["types"] = null;

  const errors: any[] = [];

  //load product details
  const loadData = async () => {
    return PokemonService.listPokemonTypes().then((res: any) => {
      return res.json();
    });
  };

  //Construct ssr Props
  try {
    types = await loadData();
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
      types: types ?? null
    }
  };
}
const TypePAge: NextPage<HomePageProps> = ({ types }) => {

  const per_page = 18;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <link rel="icon" href="https://assets.pokemon.com/static2/_ui/img/favicon.ico" />
        <link rel="shortcut icon" href="https://assets.pokemon.com/static2/_ui/img/favicon.ico" />
      </Head>


      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">

        {/* Page title */}
        <h1 className="text-6xl font-bold">
          All Pokemon{' '}
          <a className="text-blue-600" href="">
            Types
          </a>
        </h1>
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
            {loading && <div className="mt-10 w-3/5 flex justify-center justify-items-center items-center"><Loader /></div>}
            <div className="mt-10 ">
              <div className='flex flex-row gap-3 flex-wrap '>
                {types?.map((item) =>
                  <div className="flex flex-col items-center justify-center" key={item.name}>
                    <img src={item.image ?? ''} />
                    <p className='font-bold'>
                      {item.name}
                    </p>
                  </div>)}
              </div>


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

export default TypePAge
