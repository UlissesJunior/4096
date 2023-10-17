"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { supabase } from "@/client/supabaseClient";
import moment from "moment";
import "moment/locale/pt-br";
import jsPDF from "jspdf";

import Logo from "@img/pages/Recibo/Logo.png";
import Sidebar from "@/components/Layout/Sidebar";
import IconCliente from "@img/icons/icon_user.svg";

import InputCadastro from "@/components/UI/InputCadastro";
import InputFilter from "@/components/UI/InputFilter";
import SaveButton from "@/components/UI/SaveButton";

import { cpfMask, extenso, dateMaskMin } from "@utils/Masks";

export default function Recibo() {
  const [id, setID] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [nome, setNome] = useState("");
  const [CPF, setCPF] = useState("");
  const [value, setValue] = useState("");
  const [valueExtenso, setValueExtenso] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [dataExtenso, setDataExtenso] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [endereço, setEndereço] = useState("");
  const [cidade, setCidade] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setDataInicial(moment().format("DD/MM/YY"));
    setDataExtenso(moment().format("D [de] MMMM [de] YYYY"));
  }, []);

  useEffect(() => {
    var complemento = "";
    if (value == 1) {
      complemento = "real";
    } else {
      complemento = "reais";
    }
    setValueExtenso(value.extenso() + " " + complemento);
  }, [value]);

  useEffect(() => {
    setCidade(endereço.substring(endereço.lastIndexOf(",") + 1));
  }, [endereço]);

  moment.locale("pt-br");
  var momento = moment();
  let diff = moment(dataFinal, "DDMMYY").diff(moment(dataInicial, "DDMMYY"));

  if (
    moment.duration(diff)._data.days == 1 &&
    moment.duration(diff)._data.months < 1
  ) {
    diff = moment.duration(diff)._data.days + " dia";
  } else if (moment.duration(diff)._data.months < 1) {
    diff = moment.duration(diff)._data.days + " dias";
  } else if (moment.duration(diff)._data.months <= 1) {
    diff = moment.duration(diff)._data.months + " mês";
  } else if (moment.duration(diff)._data.months > 1) {
    diff = moment.duration(diff)._data.months + " meses";
  }

    const generatePdf = () => {
      var doc = new jsPDF("p", "pt", "a4");
      doc.html(document.querySelector(".a4"), {
        callback: function (pdf) {
          // var pageCount = doc.internal.getNumberOfPages();
          // pdf.deletePage(pageCount);
          pdf.save(`Recibo - ${nome}.pdf`);
        },
      });
    };

  async function HandleView() {
    try {
      const { data, error } = await supabase
        .from("clientes")
        .select()
        .eq("id", id);
      setNome(data[0].nome);
      setCPF(data[0].cpf);
      setEndereço(data[0].endereço_obra);
    } catch (error) {
      console.log(error);
    }
  }

  document.body.onkeyup = function (event) {
    if (event.keyCode == 13) {
      HandleView();
    }
  };
  
  return (
    <>
      <main className="flex w-screen h-screen bg-white">
        <Sidebar></Sidebar>
        <div className="a4-visibility a4">
          <div className="arial ml-5 mt-[calc(100vh-800px*1.125)] flex justify-center flex-col relative w-[595px] h-[800px] p-[20px] drop-shadow-lg m-auto bg-white">
            <div className="absolute top-[40px] w-[555px] flex justify-center font-arial">
              <Image src={Logo} alt="Logo" width={150} height={150} />
            </div>
            <div className="absolute text-justify w-[555px] h-full flex items-center pr-[20px] font-arial text-black">
              Recebi d{pronoun} {nome}, portador do CPF {CPF}, o valor de R$
              {value},00 ({valueExtenso}) referente à locação de um{equipamento}
              , pelo período de {diff} ({dataInicial} - {dataFinal}), utilizados
              em uma obra localizada na {endereço}.
            </div>
            <div className="absolute text-center right-[40px] bottom-[40px] font-arial text-black">
              O REI DAS BETONEIRAS <br />
              CNPJ 19.015.861/0001-71 <br />
              {cidade}, {dataExtenso}
            </div>
          </div>
        </div>
        <div className="absolute right-0 w-[520px] h-full">
          <div className="flex flex-col items-center justify-evenly align-center w-[520px] h-full bg-white shadow-lg overflow-y-scroll">
            <InputFilter
              text={"Filtrar Cliente"}
              onClick={(e) => HandleView()}
              onChange={(e) => setID(e.target.value)}
            ></InputFilter>
            <select
              className="w-[50vw] max-w-[350px] h-[5vh] max-h-[50px] flex align-center justify-around border border-gray-300 rounded-lg p-2 outline-none text-black "
              onChange={(e) => setPronoun(e.target.value)}
            >
              <option value="">Selecione o Pronome</option>
              <option value="o Sr.">Ele</option>
              <option value="a Sra.">Ela</option>
            </select>
            <InputCadastro
              img={IconCliente}
              text={"Nome"}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <InputCadastro
              img={IconCliente}
              text={"CPF"}
              value={CPF}
              onChange={(e) => setCPF(cpfMask(e.target.value))}
            />
            <InputCadastro
              img={IconCliente}
              text={"Valor"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <InputCadastro
              img={IconCliente}
              text={"Valor Extenso"}
              value={valueExtenso}
              onChange={(e) => setValueExtenso(e.target.value)}
            />
            <InputCadastro
              img={IconCliente}
              text={"Equipamento"}
              value={equipamento}
              onChange={(e) => setEquipamento(e.target.value)}
            />
            {/* <InputCadastro
                img={IconCliente}
                text={"Diferença"}
                value={diff}
                onChange={(e) => setDiff(e.target.value)}
              /> */}
            <InputCadastro
              img={IconCliente}
              text={"Data Final"}
              value={dataFinal}
              onChange={(e) => setDataFinal(dateMaskMin(e.target.value))}
            />
            {/* <InputCadastro

                img={IconCliente}
                text={"Data Final"}
                value={dataInicial}
                onChange={(e) => setDataInicial(e.target.value)}
              /> */}
            <InputCadastro
              img={IconCliente}
              text={"Endereço"}
              value={endereço}
              onChange={(e) => setEndereço(e.target.value)}
            />
            <InputCadastro
              img={IconCliente}
              text={"Cidade"}
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
            />
            <SaveButton
              text={"Gerar PDF"}
              theme={true}
              onClick={() => generatePdf()}
            />

            
            {/* <InputCadastro
                img={IconCliente}
                text={"Data"}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              /> */}
          </div>
        </div>
      </main>
    </>
  );
}
