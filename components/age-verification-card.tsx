"use client"

export default function AgeVerificationCard() {
  const acessarSite = () => {
    // Ensure fbq is available globally
    if (typeof window !== "undefined" && (window as any).fbq) {
      ;(window as any)
        .fbq("set", "agent", "tmgoogletagmanager", {
          agent: "tmgoogletagmanager",
          test_event_code: "TEST33171",
        })(window as any)
        .fbq("track", "PageView")
    }
    window.location.href = "bem-vindo.html"
  }

  const bloquearAcesso = () => {
    alert("Você precisa ter mais de 18 anos para acessar este site.")
    window.location.href = "https://www.google.com/"
  }

  return (
    <div
      className="
        bg-white/90 p-[40px] px-[30px] rounded-[25px] text-center
        shadow-[0_4px_20px_rgba(0,0,0,0.2)] max-w-[400px] w-[90%] translate-x-[20px]
      "
    >
      <img
        src="https://www.segredinhovip.com/wp-content/uploads/2025/04/logoCoroa.png"
        alt="Logo Segredinho VIP"
        width={100}
        height={100}
        className="w-[100px] mb-[20px] mx-auto"
      />
      <div
        className="
          font-dancing-script text-[45px] font-bold text-text-purple
          bg-gradient-to-br from-purple-gradient-start via-purple-gradient-middle to-purple-gradient-end
          bg-clip-text text-transparent mb-[20px]
          drop-shadow-[2px_2px_8px_rgba(0,0,0,0.3)] tracking-[1px] -mt-[10px]
        "
      >
        Segredinho VIP
      </div>
      <h2 className="text-[24px] text-text-purple mb-[10px]">Você tem 18 anos ou mais?</h2>
      <p className="text-[16px] text-text-dark mb-[30px]">
        Este site é voltado para adultos. Por favor, confirme sua idade para continuar.
      </p>
      <button
        className="
          block w-full p-[12px] mb-[15px]
          bg-gradient-to-br from-purple-gradient-start via-purple-gradient-middle to-purple-gradient-end
          text-white border-none rounded-[20px]
          text-[16px] font-bold cursor-pointer
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:from-[#6c2894] hover:via-[#a33edc] hover:to-[#6c2894]
        "
        onClick={acessarSite}
      >
        Sim, tenho
      </button>
      <button
        className="
          block w-full p-[12px] mb-[15px]
          bg-gray-button text-text-dark border-none rounded-[20px]
          text-[16px] font-bold cursor-pointer
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:bg-gray-button-hover
        "
        onClick={bloquearAcesso}
      >
        Não tenho
      </button>
    </div>
  )
}
