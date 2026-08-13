import React from "react";
import { X, Printer, Download, Mail, Check, ShieldCheck, QrCode } from "lucide-react";

export default function NfcReceiptModal({ order, isOpen, onClose }) {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.date || Date.now()).toLocaleString("pt-BR");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative my-auto">
        
        {/* Action Header Controls (Hidden during physical print) */}
        <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-amber-400" />
            <span className="font-extrabold text-sm text-zinc-100 font-heading">
              Nota Fiscal Eletrônica (NFC-e)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs rounded-lg flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>IMPRIMIR (58/80mm)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* THERMAL PRINTABLE RECEIPT CONTAINER */}
        <div className="p-6 bg-zinc-950 max-h-[80vh] overflow-y-auto">
          
          <div className="thermal-receipt-container bg-white text-black p-5 rounded-xl shadow-inner font-mono text-[11px] leading-relaxed mx-auto max-w-[340px]">
            
            {/* Header / Store Data */}
            <div className="text-center border-b border-dashed border-black/40 pb-3 mb-3">
              <h2 className="font-black text-sm uppercase tracking-tighter">MAYCON STORE MODA E-COMMERCE</h2>
              <p>CNPJ: 45.892.102/0001-99</p>
              <p>IE: 114.892.001.110</p>
              <p>RUA DAS PALMEIRAS, 100 - SÃO PAULO/SP</p>
              <p className="mt-1 font-bold">DOCUMENTO AUXILIAR DA NFC-e</p>
              <p>Nota Fiscal de Consumidor Eletrônica</p>
            </div>

            {/* Customer Info */}
            <div className="border-b border-dashed border-black/40 pb-2 mb-3 text-[10px]">
              <p><strong>CPF DO CONSUMIDOR:</strong> {order.customer?.cpf || "Não informado"}</p>
              <p><strong>NOME:</strong> {order.customer?.name}</p>
              <p><strong>DATA/HORA:</strong> {formattedDate}</p>
              <p><strong>Nº PEDIDO:</strong> {order.id}</p>
            </div>

            {/* Items Table */}
            <div className="border-b border-dashed border-black/40 pb-3 mb-3">
              <div className="flex justify-between font-bold border-b border-black/20 pb-1 mb-1">
                <span>CÓD | DESCRIÇÃO</span>
                <span>QTD x UN</span>
                <span>TOTAL</span>
              </div>

              {order.items?.map((item, idx) => (
                <div key={idx} className="mb-1.5">
                  <div className="font-bold">{idx + 1}. {item.name}</div>
                  <div className="flex justify-between text-[10px] text-zinc-700 pl-2">
                    <span>Tam: {item.size} | {item.color || "Padrao"}</span>
                    <span>{item.quantity}x R$ {item.price.toFixed(2)}</span>
                    <span className="font-bold text-black">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border-b border-dashed border-black/40 pb-3 mb-3 space-y-1">
              <div className="flex justify-between">
                <span>QTD. TOTAL DE ITENS:</span>
                <span>{order.items?.reduce((acc, i) => acc + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between">
                <span>SUBTOTAL:</span>
                <span>R$ {(order.subtotal || order.total).toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-black">
                  <span>DESCONTO:</span>
                  <span>- R$ {order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>FRETE:</span>
                <span>R$ {(order.shippingFee || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-sm pt-1 border-t border-black/30">
                <span>VALOR TOTAL R$:</span>
                <span>R$ {order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[10px]">
                <span>FORMA DE PAGAMENTO:</span>
                <span className="uppercase font-bold">{order.paymentMethod === "pix" ? "PIX" : "CARTAO DE CREDITO"}</span>
              </div>
            </div>

            {/* SEFAZ Tax Protocol & Key */}
            <div className="text-center space-y-2 text-[9px]">
              <p className="font-bold">EMISSÃO NORMAL — AUTORIZADO VIA SEFAZ</p>
              <p className="break-all bg-zinc-100 p-1 border border-black/20 font-mono text-[8.5px]">
                CHAVE DE ACESSO:<br />
                {order.nfcKey || "35260845892102000199550010000849201987654321"}
              </p>

              {/* SEFAZ QR Code Simulation */}
              <div className="py-2">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://www.sefaz.sp.gov.br/nfce/consulta?p=${order.nfcKey}`}
                  alt="QR Code Consulta SEFAZ"
                  className="w-24 h-24 mx-auto"
                />
                <p className="text-[8px] mt-1 text-zinc-600">Consulta via leitor QR Code SEFAZ</p>
              </div>

              <div className="border-t border-dashed border-black/40 pt-2 text-[8px] text-zinc-500">
                Tributos Totais Incidentes (Lei IBPT): R$ {(order.total * 0.18).toFixed(2)} (18.00%)
              </div>
            </div>

          </div>

        </div>

        {/* Footer info (no-print) */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 text-center text-xs text-zinc-400 no-print">
          <p>Compatível com impressoras térmicas de bobina 58mm e 80mm (Epson, Bematech, Elgin).</p>
        </div>

      </div>
    </div>
  );
}
