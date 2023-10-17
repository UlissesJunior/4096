"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";

import { supabase } from "@/client/supabaseClient";

import InputCadastro from "@/components/UI/InputCadastro";
import SaveButton from "@/components/UI/SaveButton";

import IconCliente from "@img/icons/icon_user.svg";

export default function EditarClientes() {
  const [data, setData] = useState([]);

  const [id, setId] = useState();
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [status, setStatus] = useState("");

  //Setando as funções para a edição do cadastro
    
  async function HandleData() {
    const { data, error } = await supabase.from("equipamentos").insert([
      {
        id: `${id}`,
        tipo: `${tipo}`,
        marca: `${marca}`,
        status: `${status}`,
      },
    ]);
    if (data) {
      setId("");
      setTipo("");
      setMarca("");
      setStatus("");
    }
    if (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={HandleData()}>
      <main className="flex justify-center w-[screen] h-screen bg-white p-2">
        <div className="mt-[5vh] flex">
          <div>
            <div className=" grid grid-rows-2 grid-flow-col gap-3">
              <InputCadastro
                img={IconCliente}
                text={"ID"}
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Marca"}
               value={marca}
               onChange={(e) => setMarca(e.target.value)}
               />
              <InputCadastro
                img={IconCliente}
                text={"Tipo"}
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Status"}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>{" "}
          <div className="absolute bottom-[5%]">
            <div className="flex justify-between flex-row w-[calc(910px-190px)]">
              <Link href={`/dashboard/equipamentos`}>
                <SaveButton theme={false} text={"Voltar"}></SaveButton>
              </Link>
              <SaveButton theme={true} text={"Salvar"}></SaveButton>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
}
