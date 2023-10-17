"use client";

import React, { useState, useEffect } from "react";

import Link from "next/link";

import { supabase } from "@/client/supabaseClient";

import { cpfMask, numberMask } from "@utils/Masks";

import InputCadastro from "@/components/UI/InputCadastro";
import SaveButton from "@/components/UI/SaveButton";
import AtalhoButton from "@/components/UI/AtalhoButton";

import IconCliente from "@img/icons/icon_user.svg";

export default function EditarClientes() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState([]);

  const [id, setId] = useState();

  const [newId, setNewId] = useState(id)
  const [newNome, setNewNome] = useState("");
  const [newCPF, setNewCPF] = useState("");
  const [newTel, setNewTel] = useState("");
  const [newEndereço, setNewEndereço] = useState("");
  const [newEndereçoObra, setNewEndereçoObra] = useState("");
  const [newRua, setNewRua] = useState("");
  const [newNumero, setNewNumero] = useState("");
  const [newBairro, setNewBairro] = useState("");
  const [newCidade, setNewCidade] = useState("");

  //Puxou os dados
  useEffect(() => {
    const UrlParams = new URLSearchParams(window.location.search);
    const paramsId = UrlParams.get("id");
    
    setId(paramsId);

    async function HandleView() {
      try {
        const { data, error } = await supabase
          .from("clientes")
          .select('*')
          .eq("id", paramsId);

        setNewId(data[0].id);
        setNewNome(data[0].nome);
        setNewCPF(data[0].cpf);
        setNewTel(data[0].telefone);

        setNewEndereço(data[0].endereço);
        setNewRua(data[0].endereço.split(",")[0]);
        setNewNumero(data[0].endereço.split(",")[1]);
        setNewBairro(data[0].endereço.split(",")[2]);
        setNewCidade(data[0].endereço.split(",")[3]);
        setNewEndereçoObra(data[0].endereço_obra);
      } catch (e) {
        console.log(e);
      }
    }
    
    HandleView();
  }, []);



  useEffect(() => {
      setNewEndereço(`${newRua}, ${newNumero}, ${newBairro}, ${newCidade}`);
      setNewEndereçoObra(newEndereço);

  }, [newRua, newNumero, newBairro, newCidade]);
  

  //Setando as funções para a edição do cadastro
  async function HandleEditData() {
    const { data, error } = await supabase
      .from("clientes")
      .update({
        id: `${newId}`,
        nome: `${newNome}`,
        cpf: `${newCPF}`,
        telefone: `${newTel}`,
        endereço: `${newEndereço}`,
        endereço_obra: `${newEndereçoObra}`,
      })
      .match({ ["id"]: id });
  }

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    console.log(selectedImage);
  };

  async function HandleImage(e) {
    e.preventDefault();
    const { data, error } = await supabase.storage
      .from("clientes")
      .upload(`${newCPF}.jpg`, selectedImage, {
        cacheControl: "3600",
        allowedMimeTypes: ["image/jpg", "image/jpeg", "image/png"],
        upsert: true,
      });
    if (data) {
      console.log("Imagem uploadada com sucesso");
    }

    if (error) {
      console.log(error);
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    HandleImage(e);
    HandleEditData(e);
  }

  return (
    <form onSubmit={handleSubmit}>
    <main className="flex justify-center w-[screen] h-screen bg-white p-2">
      <div className="mt-[5vh] flex">
        <div className="w-[160px] h-[180px] bg-gray-200 p-4 rounded relative overflow-hidden">
          {/* {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-full h-full rounded"
            />
          ) : ( */}
            <>
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium mb-2 cursor-pointer absolute inset-0 flex items-center justify-center text-center"
              >
                Clique aqui para carregar a imagem
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={(e) => handleImageSelect(e)}
                className="sr-only"
              />
            </>
          {/* )} */}
        </div>
        <div>
          <div className="ml-10 grid grid-rows-3 grid-flow-col gap-3">
          <InputCadastro img={IconCliente} text={"ID"} value={newId} onChange={(e)=>setNewId(e.target.value)}/>
              <InputCadastro
                img={IconCliente}
                text={"Nome"}
                value={newNome}
                onChange={(e) => setNewNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Rua"}
                value={newRua}
                onChange={(e) => setNewRua(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"CPF"}
                value={newCPF}
                onChange={(e) => setNewCPF(cpfMask(e.target.value))}
              />
              <InputCadastro
                img={IconCliente}
                text={"Telefone"}
                value={newTel}
                onChange={(e) => setNewTel(numberMask(e.target.value))}
              />
              <InputCadastro
                img={IconCliente}
                text={"Número"}
                value={newNumero}
                onChange={(e) => setNewNumero(e.target.value)}
              />
          </div>
          <div className="ml-10 mt-3 grid grid-rows-2 grid-flow-col gap-3">
              <InputCadastro
                img={IconCliente}
                text={"Cidade - UF"}
                value={newCidade}
                onChange={(e) => setNewCidade(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Endereço da Obra"}
                value={newEndereçoObra}
                onChange={(e) => setNewEndereçoObra(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Bairro/Logradouro"}
                value={newBairro}
                onChange={(e) => setNewBairro(e.target.value)}
              />
            </div>
        </div>{" "}
        <div className="absolute bottom-[5%]">
          <div className="flex justify-between flex-row w-[910px]">
            <Link href={`/dashboard/clientes`}>
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
