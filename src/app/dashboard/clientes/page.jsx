"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/client/supabaseClient";

import Link from "next/link";

import Sidebar from "@/components/Layout/Sidebar";
import Table from "@/components/Layout/Table";
import AddButton from "@/components/UI/AddButton";
import InputFilter from "@/components/UI/InputFilter";

const title = [
  "Id do Cliente",
  "Cliente",
  "CPF",
  "Telefone",
  "Endereço",
  "Endereço da Obra",
];
const parameters = [
  "id",
  "nome",
  "cpf",
  "telefone",
  "endereço",
  "endereço_obra",
];

export default function Clientes() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function HandleView() {
      try {
        const { data, error } = await supabase
          .from("clientes")
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
        .from("clientes")
        .select()
        .ilike("nome", `%${filter}%`);
      setData(data);
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
      <div className="overflow-hidden" style={{ margin: "8vh 6vw" }}>
        <div className="flex flex-row justify-between mb-[5%]">
          <InputFilter
            text={"Filtrar Cliente"}
            onClick={(e) => HandleViewFilter()}
            onChange={(e) => setFilter(e.target.value)}
          ></InputFilter>
          <Link href="/dashboard/clientes/cadastro">
            <AddButton text={"Adicionar Cliente"}></AddButton>
          </Link>
        </div>
        <Table
          title={title}
          tableName={"clientes"}
          dataTable={"clientes"}
          parameters={parameters}
          data={data}
        ></Table>
      </div>
    </main>
  );
}
