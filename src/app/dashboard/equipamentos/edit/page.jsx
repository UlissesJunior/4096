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

  const [newId, setNewId] = useState(id);
  const [newMarca, setNewMarca] = useState("");
  const [newTipo, setNewTipo] = useState("");
  const [newStatus, setNewStatus] = useState("");

    //Puxou os dados
    useEffect(() => {
      const UrlParams = new URLSearchParams(window.location.search);
      const paramsId = UrlParams.get("id");

      setId(paramsId);

      async function HandleView() {
        try {
          const { data, error } = await supabase
            .from("equipamentos")
            .select('*')
            .eq("id", paramsId);

          setNewId(data[0].id);
          setNewMarca(data[0].marca);
          setNewTipo(data[0].tipo);
          setNewStatus(data[0].status);
        } catch (e) {
          console.log(e);
        }
      }

      HandleView();
    }, []);

    //Setando as funções para a edição do cadastro
    async function HandleEditData() {
      const { data, error } = await supabase
        .from("clientes")
        .update({
          id: `${newId}`,
          tipo: `${newTipo}`,
          marca: `${newMarca}`,
          status: `${newStatus}`,
        })
        .match({ ["id"]: id });
    
    }

//   TEM Q ARRUMAR TUDO AQUI NOS STATES DEPOIS **********************

  return (
    <form onSubmit={HandleEditData()}>
      <main className="flex justify-center w-[screen] h-screen bg-white p-2">
        <div className="mt-[5vh] flex">
          <div>
            <div className=" grid grid-rows-2 grid-flow-col gap-3">
              <InputCadastro
                img={IconCliente}
                text={"ID"}
                value={newId}
                onChange={(e) => setNewId(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Marca"}
                value={newMarca}
                onChange={(e) => setNewMarca(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Tipo"}
                value={newTipo}
                onChange={(e) => setNewTipo(cpfMask(e.target.value))}
              />
              <InputCadastro
                img={IconCliente}
                text={"Status"}
                value={newStatus}
                onChange={(e) => setNewStatus(numberMask(e.target.value))}
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
