"use client";

import Link from "next/link";

import { useState, useEffect } from "react";
import { supabase } from "@/client/supabaseClient";

import Sidebar from "@/components/Layout/Sidebar";
import Table from "@/components/Layout/Table";
import AddButton from "@/components/UI/AddButton";
import InputFilter from "@/components/UI/InputFilter";

const title = [
  "Id do Cliente",
  "Cliente",  
  "Id do Equipamento",
  "Equipamento",
  "Valor",
  "Início",
  "Vencimento",
  "Dias restantes",
];

const parameters = [
  "id_cliente",
  "cliente",
  "id_equipamento",
  "equipamento",
  "valor",
  "inicio",
  "vencimento",
];

export default function Estoque() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function HandleView() {
      try {
        const { data, error } = await supabase
          .from("estoque")
          .select()
          .order("id");
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
    HandleView();
  }, [filter === ""]);

  async function HandleViewFilter() {
    try {
      const { data, error } = await supabase
        .from("estoque")
        .select()
        .ilike("nome", `%${filter}%`);
      setData(data);
    } catch (error) {
      console.log(error);
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
      <div className="overflow-hidden" style={{ margin: "8vh 6vw" }}>
        <div className="flex flex-row justify-between mb-[5%]">
          <InputFilter
            text={"Filtrar Locação"}
            onClick={(e) => HandleViewFilter()}
            onChange={(e) => setFilter(e.target.value)}
          ></InputFilter>
          <Link href="/dashboard/estoque/cadastro">
            <AddButton text={"Adicionar Locação"}></AddButton>
          </Link>
        </div>
        <Table
          title={title}
          tableName={"estoque"}
          dataTable={"estoque"}
          parameters={parameters}
          data={data}
        ></Table>
      </div>
    </main>
  );
}
