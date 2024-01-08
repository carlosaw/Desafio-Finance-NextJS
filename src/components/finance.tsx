"use client";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

export const Finance = () => {
  const banks = [
    { name: "Banco do Brasil", fee: 1.0492 },
    { name: "Caixa", fee: 1.0487 },
    { name: "Santander", fee: 1.0597 },
    { name: "Bradesco", fee: 1.0532 },
    { name: "Itau", fee: 1.0519 },
    { name: "Nubank", fee: 1.0595 },
    { name: "C6Bank", fee: 1.0585 },
    { name: "Inter", fee: 1.0602 },
  ];
  const time = [6, 12, 18, 24, 36, 48, 60, 72];
  const [simulated, setSimulated] = useState(false);
  const [value, setValue] = useState("");
  const [noFormatedValue, setNoFormatedValue] = useState<number>();
  const [bankFee, setBankFee] = useState<string>("");
  const [financeTime, setFinanceTime] = useState<string>("");
  const [finalPrice, setFinalPrice] = useState<string>("");
  const [monthPrice, setMonthPrice] = useState<string>("");

  const simulateFinance = () => {
    if (noFormatedValue && bankFee && financeTime) {
      let fee = parseFloat(bankFee);
      let time = parseInt(financeTime);
      let finalValue = noFormatedValue * Math.pow(fee, time);
      let monthValue = finalValue / parseInt(financeTime);

      setFinalPrice(finalValue.toFixed(2));
      setMonthPrice(monthValue.toFixed(2));

      setSimulated(true);
    } else {
      alert("Preencha todas as informações");
    }
  };
  const backToData = () => {
    setBankFee("");
    setValue("");
    setFinanceTime("");
    setSimulated(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/\D/g, "");
    const numberValue = parseInt(inputValue) / 100;
    // Formata o valor para a máscara de moeda
    const formatedValue = (Number(inputValue) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    setValue(formatedValue);
    setNoFormatedValue(numberValue);
  };

  return (
    <div className="max-w-[640px] md:max-w-3xl lg:max-w-5xl xl:max-w-6xl m-auto">
      {!simulated && (
        <>
          <div className="w-full flex items-center justify-center sm:justify-between">
            <Image src="/assets/logoTitle.png" alt="Logo Finance" width={164} height={37} />
            <div className="hidden sm:block text-lg text-greenFinance">
              powered by Aw2Web
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mt-10 sm:justify-between">
            <div className="sm:pr-2">
              <h1 className="text-5xl lg:text-6xl leading-10 text-gray4E font-semibold text-center text sm:text-start xl:w-[440px]">
                Simule o seu{" "}
                <span className="text-greenFinance">financiamento</span>.
              </h1>
              <h3 className="text-gray93 w-4/5 mt-5 text-xl lg:text-2xl hidden sm:flex">
                Escolha as melhores condições para o financiamento do seu
                veículo.
              </h3>
              <div className="hidden flex-1 sm:block mt-2">
                <Image src="/assets/OIP.jpg" alt="" width={494} height={200} />
              </div>
            </div>
            <div className="hidden md:block">
              <Image alt="Seta" src='/assets/ellipseArrow.png' width={144} height={144}/>
            </div>
            <div className="flex flex-col items-center sm:items-start ">
              <div className=" hidden sm:block">
                <Image src='/assets/emojis.png' alt="Emojis" width={79} height={50}/>
              </div>
              <h2 className="text-gray93 text-lg lg:text-2xl text-center sm:text-start w-72 xl:w-[342px] mt-6 xl:mt-3">
                Preencha os campos e simule o seu financiamento.
              </h2>
              <fieldset className="border border-solid border-greenFinance w-11/12 sm:w-full h-16 rounded mt-14 sm:mt-10 xl:mt-11">
                <legend className="text-greenFinance ml-6">Valor</legend>
                <input
                  type="text"
                  id="valor"
                  value={value}
                  onChange={handleInputChange}
                  placeholder="Digite o valor"
                  className="pl-6 pt-1 outline-none bg-whiteF5"
                />
              </fieldset>
              <select
                onChange={(e) => setBankFee(e.target.value)}
                className="w-11/12 sm:w-full xl:w-96 h-16 border border-gray93 rounded pl-6 mt-2 lg:mt-6 text-gray93 bg-whiteF5"
              >
                <option selected disabled hidden value="">
                  Selecione um banco
                </option>
                {banks.map((item, index) => (
                  <option value={item.fee} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => setFinanceTime(e.target.value)}
                className="w-11/12 sm:w-full xl:w-96 h-16 border border-gray93 rounded pl-6 mt-2 lg:mt-6 text-gray93 bg-whiteF5"
              >
                <option selected hidden disabled value="">
                  Em quantos meses?
                </option>
                {time.map((item, index) => (
                  <option value={item} key={index}>
                    {item} meses
                  </option>
                ))}
              </select>
              <button
                className="text-lg w-11/12 sm:w-full xl:w-96 h-16 bg-greenFinance rounded text-white mt-2 lg:mt-6"
                onClick={simulateFinance}
              >
                Simular financiamento
              </button>
            </div>
          </div>
        </>
      )}
      {simulated && (
        <div className="flex flex-col-reverse sm:flex-row items-center sm:justify-between sm:items-start md:mt-28">
          <div className="w-full  sm:w-5/12 md:h-full lg:max-w-md flex flex-col justify-between items-center sm:items-start">
            <Image
              src="/assets/logoTitle.png"
              alt="Logo"
              width={136}
              height={40}
              className="hidden sm:block"
            />
            <div className="flex flex-col items-center  sm:items-start mt-8 sm:mt-6 lg:mt-8">
              <div className="text-lg sm:text-base lg:text-2xl text-gray93 font-medium">
                Valor das suas parcelas:
              </div>
              <div className="text-[40px] lg:text-6xl leading-[64px] sm:leading-10 lg:leading-[54px] text-gray4E font-semibold mt-2 lg:mt-7 xl:mt-8">
                R$ {monthPrice}
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-start mt-8 sm:mt-5 lg:mt-6">
              <div className="text-lg sm:text-base lg:text-2xl text-gray93 font-medium">
                Valor final a pagar:
              </div>
              <div className="text-[40px] lg:text-6xl leading-[64px] sm:leading-10 lg:leading-[54px] text-gray4E font-semibold mt-2 lg:mt-7 xl:mt-8">
                R$ {finalPrice}
              </div>
            </div>
            <div className="text-lg lg:text-2xl text-gray93 text-center xl:text-start italic mt-12 sm:mt-6 lg:mt-9 xl:mt-10">
              <span className="text-greenFinance">*</span> Financiamento em{" "}
              {financeTime} meses.
            </div>
            <button
              className="text-lg w-11/12  h-16 bg-whiteF5 border border-greenFinance rounded text-greenFinance mt-20 sm:mt-6 lg:mt-9 font-medium"
              onClick={backToData}
            >
              Voltar ao simulador
            </button>
            <div className="hidden w-full  lg:flex mt-16 justify-between pr-2">
              <div className="text-lg text-gray4E">
                Todos os direitos reservados
              </div>
              <div className="text-lg text-gray93 ">powered by B7Web</div>
            </div>
          </div>
          <div className="xl:absolute xl:ml-[480px] xl:mt-56">
            <div className="sm:hidden">
            <Image
              src="/assets/Ellipse.png"
              alt=""
              width={144}
              height={144}
              className="rotate-90 xl:rotate-0"
            />
            <div className="bg-white flex justify-center items-center w-20 h-20  rounded-full absolute mt-[-110px] ml-8 shadow-lg">
              <Image src="/assets/logo.png" alt="" width={44} height={44} />
            </div>
            </div>
            
          </div>
          <div className="hidden sm:block flex-1 ">
          <Image src="/assets/ellipseLogo.png" alt="" width={144} height={144} className="hidden sm:block absolute sm:w-16 md:w-28 lg:w-40 sm:h-16 md:h-28 lg:h-40 sm:ml-[-32px]
             md:ml-[-56px] lg:ml-[-80px] sm:mt-36 lg:mt-44"/>
            <Image src="/assets/banner.png" alt="" width={600} height={600} className="w-full max-h-[600px]" />
          </div>
        </div>
      )}
    </div>
  );
};
