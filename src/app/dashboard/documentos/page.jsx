import Sidebar from "@/components/Layout/Sidebar";
import Link from "next/link";

export default function Documentos() {
  return (
    <main className="flex w-screen h-screen bg-white">
      <Sidebar></Sidebar>
      <div className="flex-grow flex justify-center items-center">
      <Link href="/dashboard/documentos/recibo">
        <div className="w-80 mx-4">
          <div className="bg-[#0049FF] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Recibo</h2>
            Página de Recibo
          </div>
        </div>
    </Link>
    <Link href="/dashboard/documentos/fatura">
        <div className="w-80 mx-4">
          <div className="bg-[#0049FF] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Fatura</h2>
           Página de Fatura
          </div>
        </div>
        </Link>
        <Link href="/dashboard/documentos/contrato">
        <div className="w-80 mx-4">
          <div className="bg-[#0049FF] p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Contrato</h2>
            Página de Contrato
          </div>
        </div>
        </Link>
      </div>
    </main>
  );
}
