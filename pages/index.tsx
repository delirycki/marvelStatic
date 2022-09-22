/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from "react";
// @ts-ignore
import MD5 from "crypto-js/md5";

const timestamp = new Date().getTime();
const apikey = "911d546bd79d3f82f8c8b80f8db09803"
const privkey = "8a2bc7b571c1c73e1df78efce097299714bab191"
const hashh = timestamp+privkey+apikey

const hash = MD5(hashh).toString()
const url = `https://gateway.marvel.com:443/v1/public/characters?limit=10&ts=${timestamp}&apikey=${apikey}&hash=${hash}`
export async function getServerSideProps() {
  const resp = await fetch(url);

  return {
    props: {
      data: await resp.json(),
    },
  };
}

export default function Home ({data}:{data:any}):any {
  
 const heroes = data?.data?.results
  

    return (
    <div className={styles.container}>
      <Head>
        <title>Marver Heroes List</title>
      </Head>
      <h2>Marver Heroes List</h2>
      <div className={styles.grid}>
        {heroes?.map((hero:any) => (
          <div className={styles.card} key={hero.id}>
            <Link href={`/hero/${hero.id}`}>
              <a>
                <img
                  src={hero.thumbnail.path + `/portrait_incredible.`+ hero.thumbnail.extension}
                  alt={hero.name}
                />
                <h3>{hero.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

