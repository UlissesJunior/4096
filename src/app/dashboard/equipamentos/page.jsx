"use client"

import Link from "next/link";

import Sidebar from "@/components/Layout/Sidebar";
import AddButton from "@/components/UI/AddButton";
import InputFilter from "@/components/UI/InputFilter";
import Card from "@/components/Layout/Card";

import { supabase } from "@/client/supabaseClient";

import { useEffect, useState } from "react";

export default function Clientes() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function HandleView() {
      try {
        const { data, error } = await supabase
          .from("equipamentos")
          .select()
          .order("id");
        setData(data);
      } catch (e) {
        console.log(e);
      }
    }
    HandleView();
  }, [filter === ""]);

  async function HandleViewFilter() {
    try {
      const { data, error } = await supabase
        .from("equipamentos")
        .select()
        .eq("id", filter);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  }

  //Integração com o estoque
  async function HandleStatus() {
    try {
      const { data, error } = await supabase
        .from("estoque")
        .select()
        .eq("id_equipamento", id);
     
    } catch (e) {
      console.log(e);
    }
  }
  document.body.onkeyup = function (event) {
    if (event.keyCode == 13) {
      HandleViewFilter();
    }
  };


  return (
    <main className="flex w-screen h-screen bg-white">
      <Sidebar></Sidebar>
      <div
        className="overflow-hidden"
        style={{ margin: "8vh 7.8125vw 8vh 7.8125vw" }}
      >
        <div className="flex flex-row justify-between mb-[5%]">
        <InputFilter
            text={"Filtrar Equipamento"}
            onClick={() => HandleViewFilter()}
            onChange={(e) => setFilter(e.target.value)}
          ></InputFilter>          <Link href="/dashboard/equipamentos/cadastro">
            <AddButton text={"Adicionar Equipamento"}></AddButton>
          </Link>
        </div>
        <div className="w-full max-h-[calc(80vh-100px)] grid grid-cols-4 gap-5 overflow-y-scroll">
          {data?.map((equipamento) => {
            return (
              <div className="flex-none" key={equipamento.id}>
                <Card
                  EquipamentoMarca={equipamento.marca}
                  EquipamentoID={equipamento.id}
                  EquipamentoTipo={equipamento.tipo}
                  EquipamentoStatus={equipamento.status}
                />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
