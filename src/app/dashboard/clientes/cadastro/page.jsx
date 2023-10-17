"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import InputCadastro from "@/components/UI/InputCadastro";
import SaveButton from "@/components/UI/SaveButton";
import AtalhoButton from "@/components/UI/AtalhoButton";

import { supabase } from "@/client/supabaseClient";

import IconCliente from "@img/icons/icon_user.svg";
import { cpfMask, numberMask } from "@utils/Masks";

export default function CadastroClientes() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const [id, setId] = useState(63);
  const [nome, setNome] = useState("");
  const [cpf, setCPF] = useState("");
  const [tel, setTel] = useState("");
  const [endereço, setEndereço] = useState("");
  const [endereçoObra, setEndereçoObra] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");

  // async function IdView() {
  //   const { data, error } = await supabase.from("clientes");
  //   setId(data.length + 1);
  // }
  // IdView();

  async function HandleData(e) {
    e.preventDefault();
    const { data, error } = await supabase.from("clientes").insert([
      {
        id: `${id}`,
        nome: `${nome}`,
        cpf: `${cpf}`,
        telefone: `${tel}`,
        endereço: `${endereço}`,
        endereço_obra: `${endereçoObra}`,
      },
    ]);
    if (data) {
      setId("");
      setNome("");
      setCPF("");
      setTel("");
      setEndereço("");
      setEndereçoObra("");
    }
    if (error) {
      console.log(error);
    }
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
      .upload(`${cpf}.jpg`, selectedImage, {
        cacheControl: "3600",
        allowedMimeTypes: ["image/jpg", "image/jpeg", "image/png"],
        upsert: false,
      });
    if (data) {
      console.log("Imagem uploadada com sucesso");
    }

    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(rua && numero && bairro && cidade == "") {
      setEndereçoObra("");
    }
    setEndereço(`${rua}, ${numero}, ${bairro}, ${cidade}`);
    setEndereçoObra(endereço);
  }, [rua, numero, bairro, cidade]);

  function handleSubmit(e) {
    e.preventDefault();
    HandleImage(e);
    HandleData(e);
  }

  return (
    <form onSubmit={handleSubmit}>
      <main className="flex justify-center w-[screen] h-screen bg-white p-2">
        <div className="mt-[5vh] flex">
          <div className="w-[160px] h-[180px] bg-gray-200 p-4 rounded relative overflow-hidden">
             {/* {selectedImage ? (
              <div className="absolute z-10 w-full h-full m-[-16px]">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-full h-full rounded"
            />
            </div>
            
          ) : ( <></> )} */}
           
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
          
        
          </div>
          <div>
            <div className="ml-10 grid grid-rows-3 grid-flow-col gap-3">
              <InputCadastro img={IconCliente} text={"ID"} value={id} />
              <InputCadastro
                img={IconCliente}
                text={"Nome"}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Rua"}
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"CPF"}
                value={cpf}
                onChange={(e) => setCPF(cpfMask(e.target.value))}
              />
              <InputCadastro
                img={IconCliente}
                text={"Telefone"}
                value={tel}
                onChange={(e) => setTel(numberMask(e.target.value))}
              />
              <InputCadastro
                img={IconCliente}
                text={"Número"}
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <div className="ml-10 mt-3 grid grid-rows-2 grid-flow-col gap-3">
              <InputCadastro
                img={IconCliente}
                text={"Cidade - UF"}
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Endereço da Obra"}
                value={endereçoObra}
                onChange={(e) => setEndereçoObra(e.target.value)}
              />
              <InputCadastro
                img={IconCliente}
                text={"Bairro/Logradouro"}
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
            </div>
          </div>{" "}
          <div className="absolute bottom-[5%]">
            <div className="flex justify-between flex-row w-[910px]">
              <Link href="/dashboard/clientes">
                <SaveButton theme={false} text={"Voltar"}></SaveButton>
              </Link>
              <AtalhoButton text={"oi"}></AtalhoButton>
              <SaveButton theme={true} text={"Salvar"}></SaveButton>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
}
