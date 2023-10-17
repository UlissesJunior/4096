"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";

import moment from "moment";
import "moment/locale/pt-br";

import InputCadastro from "@/components/UI/InputCadastro";
import SelectCadastro from "@/components/UI/SelectCadastro";
import SaveButton from "@/components/UI/SaveButton";
import AtalhoButton from "@/components/UI/AtalhoButton"
import { supabase } from "@/client/supabaseClient";

import { dateMask } from "@utils/Masks/index"


import IconCliente from "@img/icons/icon_user.svg";

export default function CadastroClientes() {

  const dataAtual = moment().format("DD/MM/YYYY");

  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [valor, setValor] = useState("");
  const [cliente, setCliente] = useState("");
  const [inicio, setInicio] = useState(dataAtual);
  const [vencimento, setVencimento] = useState("");
  const [equipamento, setEquipamento] = useState({ id: "", tipo: "", marca: "" });

  useEffect(() => {
    async function HandleView() {
      try {
        const { data, error } = await supabase
          .from("equipamentos")
          .select()
          .order("id");
        const filterAluguel = data.filter((item) => item.status === 0);
        setData(filterAluguel);
      } catch (e) {
        console.log(e);
      }
    }
    HandleView();
  }, []);

  async function HandleViewFilter() {
    try {
      const currentDate = moment();
      const dayMonth = currentDate.format("DDMM");
      const hoursMinutes = currentDate.format("HHmm");
      const { data, error } = await supabase
        .from("clientes")
        .select()
        .eq("id", idCliente);
        setId(Number(idCliente) + Number(dayMonth) + Number(hoursMinutes))
        setCliente(data[0].nome);
    } catch (e) {
      console.log(e);
    }
  }

  document.body.onkeyup = function (event) {
    if (event.keyCode == 13) {
      HandleViewFilter();
    }
  };

  useEffect(() => {
    let calcVencimento = moment(inicio, "DD/MM/YYYY")
      .add(30, "days")
      .format("DD" + "/" + "MM" + "/" + "YYYY");
    setVencimento(calcVencimento);
  }, [inicio]);
  
  async function HandleUpload(e) {
    e.preventDefault();
    const { data, error } = await supabase.from("estoque").insert([
      {
        id: `${id}`,
        id_equipamento: `${equipamento.id}`,
        equipamento: `${equipamento.tipo + " " + equipamento.marca}`,
        id_cliente: `${idCliente}`,
        cliente: `${cliente}`,
        inicio: `${inicio}`,
        vencimento: `${vencimento}`,
        valor: `${valor}`,
      },
    ]);
    if (data == true) {
      setCliente("");
      setEquipamento({ id: "", tipo: "", marca: "" });
      setInicio("");
      setVencimento("");
      setValor("");
      setIdCliente("");
      alert("Cadastro realizado com sucesso!")
    }
    if (error) {
      console.log(error);
    }
  }

  async function StatusEquipamento(e) {
    e.preventDefault();
    const { data, error } = await supabase
      .from("equipamentos")
      .update({ status: 1 })
      .eq("id", equipamento.id);
  }
  
  
  return (
    <main className="flex justify-center w-[screen] h-screen bg-white p-2">
      <div className="mt-[5vh] flex">
        
        <div>
          <div className="grid grid-rows-3 grid-flow-col gap-3">
          <InputCadastro img={IconCliente} text={"Encontre o Cliente"} value={idCliente} onChange={(e) => setIdCliente(e.target.value)}/>
            <InputCadastro img={IconCliente} text={"Valor"} value={valor} onChange={(e) => setValor(e.target.value)}/>
            <InputCadastro img={IconCliente} text={"Data de Início"} value={inicio} onChange={(e) => setInicio(dateMask(e.target.value))}/>
            <InputCadastro img={IconCliente} text={"Cliente"} value={cliente} onChange={(e) => setCliente(e.target.value)}/>
            <SelectCadastro img={IconCliente} options={data} onChange={(e) => setEquipamento(JSON.parse(e.target.value))} text={"Equipamento"} />
            <InputCadastro img={IconCliente} text={"Data de Vencimento"} value={vencimento} onChange={(e) => setVencimento(dateMask(e.target.value))}/>
          </div>
        </div>
        <div className="absolute bottom-[5%]">
          <div className="flex justify-between flex-row w-[720px]">
            <Link href="/dashboard/estoque">
            <SaveButton theme={false} text={"Voltar"}></SaveButton>
            </Link>
            <SaveButton theme={true} onClick={(e) => {
              HandleUpload(e)
              StatusEquipamento(e)
              alert("Cadastro realizado com sucesso!")
            }
              } text={"Salvar"}></SaveButton>
          </div>
        </div>
      </div>
    </main>
  );
}
