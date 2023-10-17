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
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [tel, setTel] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");

  const [CPF, setCPF] = useState("");
  const [value, setValue] = useState("");
  const [valueExtenso, setValueExtenso] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [dataExtenso, setDataExtenso] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [dataInicial, setDataInicial] = useState("");
  const [endereço, setEndereço] = useState("");

  const [date, setDate] = useState("");
  const [numEquipamentos, setNumEquipamentos] = useState(0);

  const [equipamentos, setEquipamentos] = useState([]);

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
        pdf.save(`Fatura - ${nome}.pdf`);
      },
    });
  };

  // const generatePdf = () => {
  //   var doc = new jsPDF({
  //     orientation: "portrait", // "portrait" para retrato, "landscape" para paisagem
  //     unit: "px",
  //     format: [595, 800], // largura x altura
  //   });

  //   doc.html(document.querySelector(".a4"), {
  //     callback: function (pdf) {
  //       pdf.save(`Fatura - ${nome}.pdf`);
  //     },
  //   });
  // };

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

  const handleEquipamentosChange = (e) => {
    const selectedNum = parseInt(e.target.value, 10);
    setNumEquipamentos(selectedNum);

    // Inicialize o array de equipamentos com base no número selecionado
    const novoArrayEquipamentos = Array.from({ length: selectedNum }, () => ({
      quantidade: "",
      nome: "",
      valor: "",
      desconto: "",
    }));
    setEquipamentos(novoArrayEquipamentos);
  };

  // Função para lidar com a mudança nos inputs dos equipamentos
  const handleEquipamentoChange = (index, campo, valor) => {
    const novoArrayEquipamentos = [...equipamentos];
    novoArrayEquipamentos[index][campo] = valor;
    setEquipamentos(novoArrayEquipamentos);
  };

  return (
    <>
      <main className="flex w-screen h-screen bg-white">
        <Sidebar></Sidebar>
        <div className="a4-visibility">
          <div className="a4 arial ml-5  mt-[calc(100vh-800px*1.125)] flex justify-center flex-col relative w-[575px] h-[800px] pr-[19px] drop-shadow-lg m-auto bg-white text-black text-[11px]">
            <div className="border-[3px] h-full border-black">
              <div className="h-[75px] border-b-[3px] border-black flex flex-row">
                {/* 3 divs aqui - START*/}
                <div className="w-2/6 h-full border-r-[3px] border-black"></div>
                <div className="w-2/6 h-full border-r-[3px] border-black"></div>
                <div className="w-2/6 h-full border-black"></div>
              </div>
              <div className="h-[18px] border-b-[3px] border-black"></div>
              <div className="h-[18px] border-b-[3px] border-black">
                Destinatario:
              </div>
              <div className="h-[18px] border-b-[3px] border-black"></div>
              <div className="h-[18px] border-b-[3px] border-black flex">
                <div className="w-3/5 h-full border-r-[3px] border-black flex ">
                  <b>Razão Social / Nome do Cliente: </b>
                  <p contentEditable>{nome}</p>
                </div>
                <div className="w-2/5 h-full flex">
                  <b>CNPJ:</b>
                  <p>{cnpj}</p>
                </div>
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex">
                <div className="w-3/5 h-full border-r-[3px] border-black">
                  <b>Endereço:</b>
                  <p contentEditable>{endereço}</p>
                </div>
                <div className="w-2/5 h-full">
                  <b>Telefone:</b>
                  <p>{tel}</p>
                </div>
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                <div className="w-2/6 h-full border-r-[3px] border-black">
                  <b>Cidade:</b>
                  <p>{cidade}</p>
                </div>
                <div className="w-2/6 h-full border-r-[3px] border-black">
                  <b>Bairro:</b>
                  <p>{bairro}</p>
                </div>
                <div className="w-2/6 h-full"></div>
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                Dados do Contrato
              </div>
              <div className="h-[39px] border-b-[3px] border-black flex flex-col text-[11px] ">
                <div className="h-[11px]">
                  <b>N° do Contrato de Locação:</b>
                  <p></p>
                </div>
                <div className="h-[11px]">
                  <b>Forma de pagamento:</b>
                  <p></p>
                </div>
                <div className="h-[11px]">
                  <b>Vencimento da Fatura:</b>
                  <p></p>
                </div>
              </div>
              <div className="min-h-[18px] border-b-[3px] border-black flex flex-row">
                <div className="w-1/5 h-full border-r-[3px] border-black"><b>Quantidade</b></div>
                <div className="w-1/2 h-full border-r-[3px] border-black"><b>Descrição</b></div>
                <div className="w-[10%] h-full border-r-[3px] border-black"><b>Valor Unit.</b></div>
                <div className="w-[10%] h-full border-r-[3px] border-black"><b>Desconto</b></div>
                <div className="w-[10%] h-full "><b>Valor Total</b></div>
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* Dados de Contato */}
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* Dados de Contato */}
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* Dados de Contato */}
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* Dados de Contato */}
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* Dados de Contato */}
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* Dados de Contato */}
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* Dados de Contato */}
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* Dados de Contato */}
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* Dados de Contato */}
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* Dados de Contato */}
              </div>
              <div className="h-[75px] border-b-[3px] border-black flex flex-row">
                <b className="text-[16px]"><u>Observação:</u></b>
                *Em caso de roubo, furto ou dano permanente do equipamento, será cobrado o valor venal do produto para substituição do mesmo.*
              </div>
              <div className="h-[75px] border-b-[3px] border-black flex flex-row">
              
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                "Não incide ICMS, conforme art. 7º, IX, do RICMS/00, aprovado pelo Decreto n° 45.490/00."
              </div>
              <div className="h-[29px] border-b-[3px] border-dashed border-black flex flex-row">
                <div className="w-1/2 h-full border-r-[3px] border-black"><b>Valor Total da Fatura:</b><p>{value}</p></div>
                <div className="w-1/2 h-full"><b>{valueExtenso}</b></div>
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* "Não incide ICMS, conforme art. 7º, IX, do RICMS/00, aprovado pelo Decreto n° 45.490/00." */}
              </div>
              <div className="h-[16px] border-b-[3px] border-black flex flex-row">
                {/* "Não incide ICMS, conforme art. 7º, IX, do RICMS/00, aprovado pelo Decreto n° 45.490/00." */}
              </div>
              <div className="h-[18px] border-b-[3px] border-black flex flex-row">
                {/* "Não incide ICMS, conforme art. 7º, IX, do RICMS/00, aprovado pelo Decreto n° 45.490/00." */}
              </div>
              <div className="absolute w-[150px] h-[50px] border-2 border-black right-[32px] bottom-[32px]"></div>
            </div>
          </div>
        </div>

        <div className="absolute right-0 w-[520px] h-full">
          <div className="flex flex-col items-center justify-evenly align-center w-[520px] h-full bg-white shadow-lg overflow-y-scroll">
            {/* Inputs com overflow-y após 5 inputs */}
            <div className="flex flex-col space-y-8 overflow-y-auto max-h-[80%]">
              {" "}
              <InputFilter
                text={"Filtrar Cliente"}
                onClick={(e) => HandleView()}
                onChange={(e) => setID(e.target.value)}
              ></InputFilter>
              <select
                className="w-[50vw] max-w-[350px] h-[5vh] max-h-[50px] flex align-center justify-around border border-gray-300 rounded-lg p-2 outline-none text-black "
                value={numEquipamentos}
                onChange={handleEquipamentosChange}
              >
                <option value={0}>Escolha o número de equipamentos</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              {/* Inputs para os equipamentos dinâmicos */}
              {numEquipamentos > 0 &&
                equipamentos.map((equipamento, index) => (
                  <div key={index}>
                    <InputCadastro
                      img={IconCliente}
                      text={`Equipamento ${index + 1}`}
                      value={equipamento.nome}
                      onChange={(e) =>
                        handleEquipamentoChange(index, "nome", e.target.value)
                      }
                    />
                    <InputCadastro
                      img={IconCliente}
                      text={`Quantidade do Equipamento ${index + 1}`}
                      value={equipamento.quantidade}
                      onChange={(e) =>
                        handleEquipamentoChange(
                          index,
                          "quantidade",
                          e.target.value
                        )
                      }
                    />
                    <InputCadastro
                      img={IconCliente}
                      text={`Valor do Equipamento ${index + 1}`}
                      value={equipamento.valor}
                      onChange={(e) =>
                        handleEquipamentoChange(index, "valor", e.target.value)
                      }
                    />
                    <InputCadastro
                      img={IconCliente}
                      text={`Desconto do Equipamento ${index + 1}`}
                      value={equipamento.desconto}
                      onChange={(e) =>
                        handleEquipamentoChange(
                          index,
                          "desconto",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ))}
              <InputCadastro
                img={IconCliente}
                text={"Nome do Cliente"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Número do Contrato"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"CNPJ do Cliente"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Endereço do Cliente"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Endereço da Obra do Cliente"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Bairro"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Cidade - UF"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Telefone do Cliente"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Forma de Pagamento"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Vencimento da Fatura"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Data de Recebimento"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Observação"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <SaveButton
              text={"Gerar PDF"}
              theme={true}
              onClick={() => generatePdf()}
            />
          </div>
        </div>
      </main>
    </>
  );
}
