"use client"

import { useState, useEffect } from "react";
import { supabase } from "@/client/supabaseClient";

import jsPDF from "jspdf";
import moment from "moment/min/moment-with-locales";
import "moment/locale/pt-br";

import Input from "@/components/UI/InputCadastro"
import { extenso } from "@utils/Masks"

import Logo from "@img/pages/Fatura/logo.png";

import Sidebar from "@/components/Layout/Sidebar";

import "./style.css";

function Fatura() {
  const generatePdf = () => {
    var doc = new jsPDF("p", "pt", "a4");
    doc.html(document.querySelector(".a4"), {
      callback: function (pdf) {
        pdf.save(`Fatura - ${nome}.pdf`);
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
      setTel(data[0].telefone);
      setEndereço(data[0].endereço);
      setEndereçoRemove(data[0].endereço_obra);
    } catch (e) {
      console.log(e);
    }
  }


  const [number, setNumber] = useState("");
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereço, setEndereço] = useState("");
  const [tel, setTel] = useState("");
  const [pagamento, setPagamento] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [obs, setObs] = useState("");
  const [recebimento, setRecebimento] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [equipamento1, setEquipamento1] = useState("");
  const [equipamento2, setEquipamento2] = useState("");
  const [equipamento3, setEquipamento3] = useState("");
  const [equipamento4, setEquipamento4] = useState("");
  const [equipamento5, setEquipamento5] = useState("");
  const [equipamento6, setEquipamento6] = useState("");
  const [equipamento7, setEquipamento7] = useState("");
  const [equipamento8, setEquipamento8] = useState("");
  const [equipamento9, setEquipamento9] = useState("");
  const [equipamento10, setEquipamento10] = useState("");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [endereçoremove, setEndereçoRemove] = useState("");
  const [uf, setUF] = useState("");
  const [nomeCidade, setNomeCidade] = useState("");

  moment.locale("pt-br");
  var momento = moment();
  var date = momento.format("DD" + "/" + "MM" + "/" + "YYYY");

  const equipamentos = [
    equipamento1,
    equipamento2,
    equipamento3,
    equipamento4,
    equipamento5,
    equipamento6,
    equipamento7,
    equipamento8,
    equipamento9,
    equipamento10,
  ];

  const valores = [
    equipamento1 && equipamento1[0]
      ? parseFloat(
          equipamento1[0] *
            (typeof equipamento1[2] === "string"
              ? equipamento1[2].replace(",", ".")
              : equipamento1[2]) -
            (typeof equipamento1[3] === "string"
              ? equipamento1[3].replace(",", ".")
              : equipamento1[3])
        )
      : 0,
    equipamento2 && equipamento2[0]
      ? parseFloat(
          equipamento2[0] *
            (typeof equipamento2[2] === "string"
              ? equipamento2[2].replace(",", ".")
              : equipamento2[2]) -
            (typeof equipamento2[3] === "string"
              ? equipamento2[3].replace(",", ".")
              : equipamento2[3])
        )
      : 0,
    equipamento3 && equipamento3[0]
      ? parseFloat(
          equipamento3[0] *
            (typeof equipamento3[2] === "string"
              ? equipamento3[2].replace(",", ".")
              : equipamento3[2]) -
            (typeof equipamento3[3] === "string"
              ? equipamento3[3].replace(",", ".")
              : equipamento3[3])
        )
      : 0,
    equipamento4 && equipamento4[0]
      ? parseFloat(
          equipamento4[0] *
            (typeof equipamento4[2] === "string"
              ? equipamento4[2].replace(",", ".")
              : equipamento4[2]) -
            (typeof equipamento4[3] === "string"
              ? equipamento4[3].replace(",", ".")
              : equipamento4[3])
        )
      : 0,
    equipamento5 && equipamento5[0]
      ? parseFloat(
          equipamento5[0] *
            (typeof equipamento5[2] === "string"
              ? equipamento5[2].replace(",", ".")
              : equipamento5[2]) -
            (typeof equipamento5[3] === "string"
              ? equipamento5[3].replace(",", ".")
              : equipamento5[3])
        )
      : 0,
    equipamento6 && equipamento6[0]
      ? parseFloat(
          equipamento6[0] *
            (typeof equipamento6[2] === "string"
              ? equipamento6[2].replace(",", ".")
              : equipamento6[2]) -
            (typeof equipamento6[3] === "string"
              ? equipamento6[3].replace(",", ".")
              : equipamento6[3])
        )
      : 0,
    equipamento7 && equipamento7[0]
      ? parseFloat(
          equipamento7[0] *
            (typeof equipamento7[2] === "string"
              ? equipamento7[2].replace(",", ".")
              : equipamento7[2]) -
            (typeof equipamento7[3] === "string"
              ? equipamento7[3].replace(",", ".")
              : equipamento7[3])
        )
      : 0,
    equipamento8 && equipamento8[0]
      ? parseFloat(
          equipamento8[0] *
            (typeof equipamento8[2] === "string"
              ? equipamento8[2].replace(",", ".")
              : equipamento8[2]) -
            (typeof equipamento8[3] === "string"
              ? equipamento8[3].replace(",", ".")
              : equipamento8[3])
        )
      : 0,
    equipamento9 && equipamento9[0]
      ? parseFloat(
          equipamento9[0] *
            (typeof equipamento9[2] === "string"
              ? equipamento9[2].replace(",", ".")
              : equipamento9[2]) -
            (typeof equipamento9[3] === "string"
              ? equipamento9[3].replace(",", ".")
              : equipamento9[3])
        )
      : 0,
    equipamento10 && equipamento10[0]
      ? parseFloat(
          equipamento10[0] *
            (typeof equipamento10[2] === "string"
              ? equipamento10[2].replace(",", ".")
              : equipamento10[2]) -
            (typeof equipamento10[3] === "string"
              ? equipamento10[3].replace(",", ".")
              : equipamento10[3])
        )
      : 0,
  ];

  const total = valores.reduce((a, b) => a + b, 0);

  let extenso = total.toString().extenso();
  if (extenso === "um") {
    extenso += " real";
  } else {
    extenso += " reais";
  }

  useEffect(() => {
    setNomeCidade(cidade.split("-")[0].trim());
    setUF(cidade.split(" - ")[1]);
  }, [cidade]);

  return (
    <>
      <div className="container">
        <Sidebar />
        <div className="container center">
          <div className="a4-visibility">
            <div className="a4" id="fatura">
              <div className="fatura-border">
                <div className="fatura-start">
                  <div className="fatura-start-3">
                    <img src={Logo} />
                  </div>
                  <div className="fatura-start-3">
                    <div className="fatura-div fatura-div-border fatura-center">
                      <b>CNPJ 19.015.861.0001-71</b>{" "}
                    </div>
                    <p>
                      Rua Tereza Maria Ferreira, 22 <br />
                      São Francisco- Aparecida-SP
                      <br />
                      CEP 12570-420 <br />
                      Fone: (12) 9 96323688{" "}
                    </p>
                  </div>
                  <div className="fatura-start-3">
                    <div
                      className="fatura-div fatura-div-border fatura-center"
                      style={{ height: "20px" }}
                    >
                      <b>FATURA DE LOCAÇÃO</b>
                      <br />
                    </div>
                    <div className="fatura-center" style={{ height: "31px" }}>
                      <p style={{ fontSize: "14px" }}>
                        Nº {number}/{momento.format("YYYY")}
                        <br />
                      </p>
                    </div>
                    <div
                      className="fatura-div"
                      style={{ borderTop: "3px solid #000" }}
                    >
                      <p contentEditable>Data de emissão: {date}</p>
                    </div>
                  </div>
                </div>
                <div className="fatura-div fatura-div-border"></div>
                <div className="fatura-div fatura-div-border">
                  <p>
                    <b>Destinatário:</b>
                  </p>
                </div>
                <div className="fatura-div fatura-div-border"></div>
                <div className="fatura-row fatura-div-border">
                  <div className="fatura-div-60">
                    <p>
                      <b>Razão Social / Nome do Cliente:</b> {nome}
                    </p>
                  </div>
                  <div className="fatura-div-40">
                    <p>
                      <b>CNPJ:</b> {cnpj}
                    </p>
                  </div>
                </div>
                <div className="fatura-row fatura-div-border">
                  <div className="fatura-div-60">
                    <p>
                      <b>Endereço:</b> {endereçoremove}
                    </p>
                  </div>
                  <div className="fatura-div-40">
                    <p>
                      <b>Telefone:</b> {tel}
                    </p>
                  </div>
                </div>
                <div className="fatura-row fatura-div-border">
                  <div className="fatura-div-33">
                    <p>
                      <b>Cidade:</b> {nomeCidade}
                    </p>
                  </div>
                  <div className="fatura-div-33">
                    <p>
                      <b>Bairro:</b> {bairro}
                    </p>
                  </div>
                  <div className="fatura-div-33">
                    <p>
                      <b>UF:</b> {uf}
                    </p>
                  </div>
                </div>
                <div
                  className="fatura-div fatura-div-border fatura-center"
                  style={{ letterSpacing: "0.1px" }}
                >
                  <b>Dados do contrato</b>
                </div>
                <div className="fatura-div fatura-div-border">
                  <p>
                    <b>N° do Contrato de Locação:</b> {number}/
                    {momento.format("YYYY")} <br />
                    <b>Forma da pagamento: </b> {pagamento} <br />
                    <b>Vencimento: </b> {vencimento}{" "}
                  </p>
                </div>
                <div className="fatura-row fatura-div-border">
                  <div className="fatura-div-20 center">
                    <p>
                      <b>Quantidade</b>
                    </p>
                  </div>
                  <div className="fatura-div-50 center">
                    <p>
                      <b>Descrição</b>
                    </p>
                  </div>
                  <div
                    className="fatura-div-10 center"
                    style={{ letterSpacing: "0.1px" }}
                  >
                    <p>
                      <b>Valor Unit.</b>
                    </p>
                  </div>
                  <div
                    className="fatura-div-10 center"
                    style={{ letterSpacing: "0.1px" }}
                  >
                    <p>
                      <b>Desconto</b>
                    </p>
                  </div>
                  <div
                    className="fatura-div-10 center"
                    style={{ letterSpacing: "0.1px" }}
                  >
                    <p>
                      <b>Valor Total</b>
                    </p>
                  </div>
                </div>
                {equipamentos.map((equipamento, index) =>
                  equipamento && equipamento[0] ? (
                    <div className="fatura-row fatura-div-border" key={index}>
                      <div className="fatura-div-20 center">
                        <p>
                          <b>{equipamento[0]}</b>
                        </p>
                      </div>
                      <div className="fatura-div-50 center">
                        <p>
                          <b>{equipamento[1]}</b>
                        </p>
                      </div>
                      <div className="fatura-div-10 center">
                        <p>
                          <b>R${equipamento[2]},00</b>
                        </p>
                      </div>
                      <div className="fatura-div-10 center">
                        <p>
                          <b>R${equipamento[3]},00</b>
                        </p>
                      </div>
                      <div className="fatura-div-10 center">
                        <p>
                          <b>
                            R${equipamento[0] * equipamento[2] - equipamento[3]}
                            ,00
                          </b>
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="fatura-div fatura-div-border"></div>
                  )
                )}
                <div className="fatura-start">
                  <p style={{ fontSize: "16px", letterSpacing: "0.1px" }}>
                    <u>
                      <b>Observação: </b> {obs}
                    </u>
                  </p>
                  <div className="fatura-absolute-end">
                    <p>
                      *Em caso de roubo, furto ou dano permanente do
                      equipamento, será cobrado o valor venal do produto para
                      substituição do mesmo.*
                    </p>
                  </div>
                </div>
                <div className="fatura-start"></div>
                <div className="fatura-div fatura-div-border fatura-center">
                  <p style={{ fontSize: "10px" }}>
                    <b>
                      "Não incide ICMS, conforme art. 7º, IX, do RICMS/00,
                      aprovado pelo Decreto n° 45.490/00."
                    </b>
                  </p>
                </div>
                <div
                  className="fatura-row"
                  style={{ height: "32px", borderBottom: "3px dashed #000" }}
                >
                  <div
                    className="fatura-div-50 fatura-center"
                    style={{ height: "100%" }}
                  >
                    <p>
                      <b>Valor Total da Fatura:</b> {total}
                    </p>
                  </div>
                  <div
                    className="fatura-div-50 fatura-center"
                    style={{ height: "100%", border: "0" }}
                  >
                    <p>
                      <b>{extenso}</b>
                    </p>
                  </div>
                </div>
                <div className="fatura-row fatura-div-border">
                  <div className="fatura-div-60 fatura-center">
                    <p>
                      Recibo de O Rei das Betoneiras Aluguel de Equipamentos
                    </p>
                  </div>
                  <div className="fatura-div-40 fatura-center">
                    <p>FATURA DE LOCAÇÃO Nº 076/2023</p>
                  </div>
                </div>
                <div className="fatura-row fatura-div-border">
                  <div className="fatura-div-30">
                    <p>
                      <b>Data de recebimento:</b>{" "}
                    </p>{" "}
                    <p>{recebimento}</p>
                  </div>
                  <div className="fatura-div-70">
                    <p style={{ letterSpacing: "0.15px" }}>
                      <b>Identificação(RG) e assinatura do recebedor(a):</b>
                    </p>
                  </div>
                </div>
                <div className="fatura-div fatura-div-border fatura-center">
                  <p style={{ fontSize: "10px" }}>
                    <b>
                      "Não incide ICMS, conforme art. 7º, IX, do RICMS/00,
                      aprovado pelo Decreto n° 45.490/00."
                    </b>
                  </p>
                </div>
                <div className="fatura-assinatura">
                  <p>O Rei das Betoneiras Aluguel de Equipamentos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
      <div className="container-estoque" id="lightmode">
        <div className="AddDataMax" style={{ width: "56vw" }}>
          <div className="rowAdd">
            <Input
              
              className="input-search"
              placeholder={"Encontre o Cliente (ID)"}
              onClick={(e) => HandleView()}
              onChange={(e) => setId(e.target.value)}
            />
            <Input
              
              placeholder="Nome do Cliente"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
              type="text"
            ></Input>
            <Input
       
              placeholder="Número do contrato"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
              type="text"
            ></Input>
          </div>
          <div className="rowAdd">
            <Input
           
              placeholder="CNPJ do Cliente"
              value={cnpj}
              onChange={(e) => {
                setCnpj(cnpjMask(e.target.value));
              }}
              type="text"
            ></Input>
            <Input
              
              placeholder="Endereço do Cliente"
              value={endereço}
              onChange={(e) => {
                setEndereço(e.target.value);
              }}
              type="text"
            ></Input>

            <Input
           
              placeholder="Endereço / Endereço da Obra"
              value={endereçoremove}
              onChange={(e) => {
                setEndereçoRemove(e.target.value);
              }}
            ></Input>
          </div>{" "}
          <div className="rowAdd">
            <Input
             
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => {
                setBairro(e.target.value);
              }}
            ></Input>
            <Input
           
              placeholder="Cidade - UF"
              value={cidade}
              onChange={(e) => {
                setCidade(e.target.value);
              }}
            ></Input>
            <Input
         
              placeholder="Telefone do Cliente"
              value={tel}
              onChange={(e) => {
                setTel(numberMask(e.target.value));
              }}
              type="text"
            ></Input>
          </div>{" "}
          <div className="rowAdd">
            <Input
             
              placeholder="Forma de Pagamento"
              value={pagamento}
              onChange={(e) => {
                setPagamento(e.target.value);
              }}
              type="text"
            ></Input>
            <Input
           
              placeholder="Vencimento da Fatura"
              value={vencimento}
              onChange={(e) => {
                setVencimento(dateMask(e.target.value));
              }}
              type="text"
            ></Input>
            <Input
             
              placeholder="Observação"
              value={obs}
              onChange={(e) => {
                setObs(e.target.value);
              }}
              type="text"
            ></Input>{" "}
          </div>
          <div className="rowAdd">
            <Input
             
              placeholder="Data de Recebimento"
              value={recebimento}
              onChange={(e) => {
                setRecebimento(dateMask(e.target.value));
              }}
              type="text"
            ></Input>
            <Input
           
              placeholder="Qtd, Equipamento, Valor, Desconto"
              onChange={(e) => {
                setEquipamento1(e.target.value.split(", "));
              }}
            ></Input>

            <Input
             
              placeholder="Qtd, Equipamento, Valor, Desconto"
              onChange={(e) => {
                setEquipamento2(e.target.value.split(", "));
              }}
            ></Input>
          </div>{" "}
          <div className="rowAdd">
            <Input
              
              placeholder="Qtd, Equipamento, Valor, Desconto"
              onChange={(e) => {
                setEquipamento3(e.target.value.split(", "));
              }}
            ></Input>
            <Input
             
              placeholder="Qtd, Equipamento, Valor, Desconto"
              onChange={(e) => {
                setEquipamento4(e.target.value.split(", "));
              }}
            ></Input>

            <Input
              
              placeholder="Qtd, Equipamento, Valor, Desconto"
              onChange={(e) => {
                setEquipamento5(e.target.value.split(", "));
              }}
            ></Input>
          </div>{" "}
          <div className="rowAdd">
            <Input
          
              placeholder="Qtd, Equipamento, Valor, Desconto"
              onChange={(e) => {
                setEquipamento6(e.target.value.split(", "));
              }}
            ></Input>
            <Input
              
              placeholder="Qtd, Equipamento, Valor, Desconto"
              onChange={(e) => {
                setEquipamento7(e.target.value.split(", "));
              }}
            ></Input>

            <Input
           
              placeholder="Qtd, Equipamento, Valor, Desconto"
              onChange={(e) => {
                setEquipamento8(e.target.value.split(", "));
              }}
            ></Input>
          </div>
          <div className="rowAdd">
            <Input
              
              placeholder="Qtd, Equipamento, Valor, Desconto"
              onChange={(e) => {
                setEquipamento9(e.target.value.split(", "));
              }}
            ></Input>
            <Input
             
              placeholder="Qtd, Equipamento, Valor, Desconto"
              onChange={(e) => {
                setEquipamento10(e.target.value.split(", "));
              }}
            ></Input>
          </div>
          <div className="rowAdd">
            <button
              className="input-button"
              onClick={() => {
                setTimeout(generatePdf, 1000);
              }}
            >
              Gerar PDF
            </button>{" "}
          </div>
        </div>
      </div>
    </>
      </div>
    </>
  );
}

export default Fatura;