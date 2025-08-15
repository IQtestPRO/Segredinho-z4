"use client"

import { useEffect } from "react"
import Head from "next/head"

declare global {
  interface Window {
    fbq: any
  }
}

export default function Home() {
  useEffect(() => {
    // Meta Pixel Code
    const script = document.createElement("script")
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src='https://connect.facebook.net/en_US/fbevents.js';
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script');

      window.fbq('init', '774976791854396');
    `
    document.head.appendChild(script)
  }, [])

  const acessarSite = () => {
    if (typeof window.fbq !== "undefined") {
      window.fbq("set", "agent", "tmgoogletagmanager", { agent: "tmgoogletagmanager", test_event_code: "TEST33171" })
      window.fbq("track", "PageView")
    }
    window.location.href = "/bem-vindo"
  }

  const bloquearAcesso = () => {
    alert("Você precisa ter mais de 18 anos para acessar este site.")
    window.location.href = "https://www.google.com/"
  }

  return (
    <>
      <Head>
        <title>Mulheres Maduras</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Dancing+Script:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1453046616041191&ev=PageView&noscript=1"
          />
        </noscript>
      </Head>

      <div className="min-h-screen bg-black flex justify-center items-center font-['Poppins']">
        <div className="bg-white/90 p-10 rounded-3xl text-center shadow-2xl max-w-md w-[90%] transform translate-x-5">
          <img
            src="/wp-content/uploads/2025/04/logoCoroa.png"
            alt="Logo Segredinho VIP"
            className="w-24 mx-auto mb-5"
            decoding="async"
          />

          <div className="font-['Dancing_Script'] text-5xl font-bold text-[#6c2894] mb-5 bg-gradient-to-r from-[#8319C1] via-[#b941ff] to-[#8319C1] bg-clip-text text-transparent drop-shadow-lg tracking-wide -mt-2">
            Segredinho VIP
          </div>

          <h2 className="text-2xl text-[#6c2894] mb-2">Você tem 18 anos ou mais?</h2>

          <p className="text-base text-gray-700 mb-8">
            Este site é voltado para adultos. Por favor, confirme sua idade para continuar.
          </p>

          <button
            className="block w-full p-3 mb-4 bg-gradient-to-r from-[#8319C1] via-[#b941ff] to-[#8319C1] text-white border-none rounded-2xl text-base font-bold cursor-pointer transition-all duration-300 hover:scale-105 hover:from-[#6c2894] hover:via-[#a33edc] hover:to-[#6c2894]"
            onClick={acessarSite}
          >
            Sim, tenho
          </button>

          <button
            className="block w-full p-3 bg-gray-300 text-gray-700 border-none rounded-2xl text-base font-bold cursor-pointer transition-all duration-300 hover:bg-gray-400"
            onClick={bloquearAcesso}
          >
            Não tenho
          </button>
        </div>
      </div>
    </>
  )
}
