import React, { useState } from "react";
import { X, CreditCard, QrCode, ShieldCheck, CheckCircle2, Copy, Check, Printer, FileText, Sparkles, Phone, Mail, MapPin } from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems = [],
  appliedCoupon,
  onOrderCompleted,
  onOpenReceipt
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState("form"); // "form" | "pix_payment" | "success"
  const [completedOrder, setCompletedOrder] = useState(null);

  // Form Fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  
  // Address
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("SP");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState("pix"); // "pix" | "credit_card"
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [installments, setInstallments] = useState("1");

  const [copiedPix, setCopiedPix] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === "percentage") {
      discountAmount = (subtotal * appliedCoupon.discountValue) / 100;
    } else if (appliedCoupon.discountType === "fixed") {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  // 10% extra discount if Pix
  let pixExtraDiscount = 0;
  if (paymentMethod === "pix") {
    pixExtraDiscount = (subtotal - discountAmount) * 0.10;
  }

  const shippingFee = subtotal >= 299 ? 0 : 19.90;
  const total = Math.max(0, subtotal - discountAmount - pixExtraDiscount + shippingFee);

  // CEP Auto-Fill Simulation
  const handleZipBlur = () => {
    if (zip.replace(/\D/g, "").length === 8) {
      // Mock CEP auto lookup
      setStreet("Av. Brigadeiro Faria Lima");
      setNeighborhood("Pinheiros");
      setCity("São Paulo");
      setState("SP");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !cpf) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const orderData = {
        customer: {
          name,
          email,
          phone,
          cpf,
          address: { street, number, complement, neighborhood, city, state, zip }
        },
        items: cartItems,
        subtotal,
        discount: discountAmount + pixExtraDiscount,
        shippingFee,
        total,
        paymentMethod
      };

      if (paymentMethod === "pix") {
        setStep("pix_payment");
        const order = onOrderCompleted(orderData);
        setCompletedOrder(order);
      } else {
        // Credit Card direct success
        const order = onOrderCompleted(orderData);
        setCompletedOrder(order);
        setStep("success");
        triggerConfetti();
      }
    }, 1000);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  const handleSimulatePixPaid = () => {
    setStep("success");
    triggerConfetti();
  };

  const handleCopyPix = () => {
    if (completedOrder?.pixCopyPaste) {
      navigator.clipboard.writeText(completedOrder.pixCopyPaste);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in">
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-auto relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-zinc-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STEP 1: FORM CHECKOUT */}
        {step === "form" && (
          <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Checkout Rápido — Maycon Store
              </span>
              <h2 className="text-2xl font-extrabold font-heading text-white">
                Finalizar Seu Pedido
              </h2>
            </div>

            {/* 1. Datos do Cliente */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-2">
                <Phone className="w-4 h-4 text-amber-500" />
                <span>1. Dados Pessoais (Sem cadastro obrigatório)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">Nome Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Gabriel Santos"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">CPF *</label>
                  <input
                    type="text"
                    required
                    placeholder="000.000.000-00"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">E-mail para Confirmação *</label>
                  <input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-semibold mb-1">WhatsApp para Rastreio *</label>
                  <input
                    type="tel"
                    required
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Endereço de Entrega */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>2. Endereço de Entrega</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 text-xs">
                <div className="sm:col-span-4">
                  <label className="block text-zinc-400 font-semibold mb-1">CEP</label>
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    onBlur={handleZipBlur}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-8">
                  <label className="block text-zinc-400 font-semibold mb-1">Rua / Avenida</label>
                  <input
                    type="text"
                    placeholder="Nome da sua rua"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-zinc-400 font-semibold mb-1">Número</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-8">
                  <label className="block text-zinc-400 font-semibold mb-1">Complemento / Bairro</label>
                  <input
                    type="text"
                    placeholder="Apto, Bloco, Bairro"
                    value={complement}
                    onChange={(e) => setComplement(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-zinc-100 placeholder-zinc-600 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Forma de Pagamento */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2 border-b border-zinc-800 pb-2">
                <CreditCard className="w-4 h-4 text-amber-500" />
                <span>3. Escolha a Forma de Pagamento</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all relative ${
                    paymentMethod === "pix"
                      ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-lg shadow-amber-500/10"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <span className="absolute top-2 right-2 bg-emerald-500 text-zinc-950 font-black text-[9px] px-2 py-0.5 rounded uppercase">
                    10% OFF
                  </span>
                  <QrCode className="w-6 h-6 mb-2" />
                  <div>
                    <span className="font-extrabold text-sm text-zinc-100 block">PIX Instantâneo</span>
                    <span className="text-[11px] text-zinc-400">Aprovação em segundos via QR Code</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("credit_card")}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === "credit_card"
                      ? "bg-amber-500/10 border-amber-500 text-amber-400 shadow-lg shadow-amber-500/10"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <CreditCard className="w-6 h-6 mb-2" />
                  <div>
                    <span className="font-extrabold text-sm text-zinc-100 block">Cartão de Crédito</span>
                    <span className="text-[11px] text-zinc-400">Parcele em até 12x sem juros</span>
                  </div>
                </button>
              </div>

              {/* Credit Card Input Subform */}
              {paymentMethod === "credit_card" && (
                <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 space-y-3 text-xs animate-in fade-in">
                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Número do Cartão</label>
                    <input
                      type="text"
                      placeholder="4000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-100 placeholder-zinc-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 font-semibold mb-1">Nome no Cartão</label>
                      <input
                        type="text"
                        placeholder="NOME COMO NO CARTAO"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-100 uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 font-semibold mb-1">Validade / CVV</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-100"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-1/2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-100"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 font-semibold mb-1">Parcelamento</label>
                    <select
                      value={installments}
                      onChange={(e) => setInstallments(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-zinc-100"
                    >
                      <option value="1">1x de R$ {total.toFixed(2)} (Sem juros)</option>
                      <option value="2">2x de R$ {(total / 2).toFixed(2)} (Sem juros)</option>
                      <option value="3">3x de R$ {(total / 3).toFixed(2)} (Sem juros)</option>
                      <option value="6">6x de R$ {(total / 6).toFixed(2)} (Sem juros)</option>
                      <option value="12">12x de R$ {(total / 12).toFixed(2)} (Sem juros)</option>
                    </select>
                  </div>
                </div>
              )}

            </div>

            {/* Total Summary & Pay Button */}
            <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-3">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Subtotal ({cartItems.length} itens):</span>
                <span className="text-zinc-200">R$ {subtotal.toFixed(2).replace(".", ",")}</span>
              </div>

              {paymentMethod === "pix" && (
                <div className="flex justify-between text-xs text-emerald-400 font-bold">
                  <span>Desconto Especial Pix (-10%):</span>
                  <span>- R$ {pixExtraDiscount.toFixed(2).replace(".", ",")}</span>
                </div>
              )}

              <div className="flex justify-between text-xs text-zinc-400">
                <span>Frete:</span>
                <span>{shippingFee === 0 ? "GRÁTIS" : `R$ ${shippingFee.toFixed(2).replace(".", ",")}`}</span>
              </div>

              <div className="flex justify-between items-center text-lg font-black text-white pt-2 border-t border-zinc-800">
                <span>Total a Pagar:</span>
                <span className="text-gold-gradient text-xl">
                  R$ {total.toFixed(2).replace(".", ",")}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gold-gradient hover:opacity-95 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 transition-all transform active:scale-98"
              >
                {isSubmitting ? (
                  <span>GERANDO PEDIDO...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {paymentMethod === "pix" ? "GERAR QR CODE PIX" : "CONCLUIR PAGAMENTO COM CARTÃO"}
                    </span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

        {/* STEP 2: PIX QR CODE PAYMENT */}
        {step === "pix_payment" && completedOrder && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mx-auto">
              <QrCode className="w-6 h-6" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Pedido {completedOrder.id} Gerado
              </span>
              <h2 className="text-2xl font-extrabold font-heading text-white">
                Pagamento via Pix
              </h2>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                Escaneie o QR Code abaixo no app do seu banco ou utilize o código Copia e Cola.
              </p>
            </div>

            {/* Generated QR Code Box */}
            <div className="bg-white p-4 rounded-2xl max-w-xs mx-auto shadow-xl inline-block border-4 border-amber-500">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                  completedOrder.pixCopyPaste
                )}`}
                alt="Pix QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>

            <div className="max-w-md mx-auto space-y-3">
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-300 break-all truncate">
                {completedOrder.pixCopyPaste}
              </div>

              <button
                onClick={handleCopyPix}
                className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                {copiedPix ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>CÓDIGO PIX COPIADO!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>COPIAR CÓDIGO PIX (COPIA E COLA)</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulation button */}
            <div className="pt-4 border-t border-zinc-800">
              <button
                onClick={handleSimulatePixPaid}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>SIMULAR PAGAMENTO PIX APROVADO</span>
              </button>
              <span className="text-[10px] text-zinc-500 block mt-1">
                (Clique para testar a confirmação automática imediata)
              </span>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS & CONFIRMATION */}
        {step === "success" && completedOrder && (
          <div className="p-6 sm:p-8 space-y-6 text-center animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                PAGAMENTO CONFIRMADO E APROVADO!
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Obrigado pela Compra!
              </h2>
              <p className="text-xs text-zinc-400 max-w-md mx-auto mt-2">
                Seu pedido <strong className="text-amber-400">{completedOrder.id}</strong> foi recebido com sucesso e já está sendo preparado pela equipe Maycon Store.
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-zinc-950 p-4 rounded-2xl border border-zinc-800 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between text-zinc-400">
                <span>Cliente:</span>
                <span className="text-zinc-100 font-semibold">{completedOrder.customer?.name}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Valor Total:</span>
                <span className="text-amber-400 font-extrabold">
                  R$ {completedOrder.total.toFixed(2).replace(".", ",")}
                </span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Chave NFC-e:</span>
                <span className="text-zinc-500 font-mono text-[10px] truncate max-w-[200px]">
                  {completedOrder.nfcKey}
                </span>
              </div>
            </div>

            {/* Print thermal receipt shortcut */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => onOpenReceipt(completedOrder)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Printer className="w-4 h-4" />
                <span>VER / IMPRIMIR NOTA FISCAL (NFC-E)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider"
              >
                Voltar à Loja
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
