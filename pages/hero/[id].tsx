/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Details.module.css";
// @ts-ignore
import MD5 from "crypto-js/md5";

const timestamp = new Date().getTime();
const apikey = "911d546bd79d3f82f8c8b80f8db09803"
const privkey = "8a2bc7b571c1c73e1df78efce097299714bab191"
const hash = MD5(timestamp+privkey+apikey).toString()
const url = `https://gateway.marvel.com:443/v1/public/characters?limit=10&ts=${timestamp}&apikey=${apikey}&hash=${hash}`

export async function getStaticPaths() {
  const resp = await fetch(url);
  const data = await resp.json();

  return {
    paths: data?.data?.results.map((hero:any) => ({
      params: { id: hero.id.toString() },
    })),
    fallback: false,
  };
}


export async function getStaticProps({ params }:{params : any }) {
  const resp = await fetch(
    `https://gateway.marvel.com:443/v1/public/characters/${params.id}?ts=${timestamp}&apikey=${apikey}&hash=${hash}`
  );

  return {
    props: {
      data: await resp.json(),
    },
  };
}

export default function Details({data}:{data:any}) {
  

  if (!data) {
    return null;
  }
  const hero = data.data.results[0]
  console.log(hero)

  return (
    <div>
      <Head>
        <title>{hero.name}</title>
      </Head>
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={hero.thumbnail?.path + `/portrait_incredible.`+ hero.thumbnail?.extension}
            alt={hero.name}
          />
        </div>
        <div>
          <div className={styles.name}>{hero.name}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name of stories</th>
              </tr>
            </thead>
            <tbody>
              {hero.stories.items.map(({ name}:{name:string}) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
