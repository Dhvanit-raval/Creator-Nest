"use client"

import { use, useState } from "react";

const Username = ({ params }) => {
  const resolvedParams = use(params);
  const creator = resolvedParams?.username || "creator";
  const [supporterName, setSupporterName] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(10);
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const createCheckout = async (checkoutAmount) => {
    setLoading(true);
    setStatus("");
    setCheckoutUrl("");

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: checkoutAmount || Number(amount),
          creator,
          supporterName,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus(data?.error || "Unable to create payment session.");
      } else {
        setCheckoutUrl(data.url);
        setStatus("Scan the QR code or open checkout to complete payment.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Unexpected error creating the Stripe session.");
    } finally {
      setLoading(false);
    }
  };

  const openCheckout = () => {
    if (checkoutUrl) {
      window.open(checkoutUrl, "_blank");
    }
  };

  const qrImageUrl = checkoutUrl
    ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
        checkoutUrl
      )}`
    : "";

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Cover / Header section */}
      <div className="border-b border-zinc-800 pt-32 pb-16 px-6 relative bg-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-8">
          <div className="shrink-0">
            <img
              className="w-32 h-32 md:w-40 md:h-40 object-cover border border-zinc-800 p-1 bg-zinc-950 rounded-sm"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                creator
              )}&size=160&background=ffffff&color=000000&rounded=false`}
              alt={creator}
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-100">{creator}</h1>
            <p className="mt-4 text-xl text-zinc-400 font-medium">Independent Creator</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          
          {/* Main Support Section */}
          <section className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100 mb-4">Support {creator}</h2>
              <p className="text-lg text-zinc-400">Fund their creative journey directly.</p>
            </div>

            <div className="space-y-8">
              <div className="grid gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Your Name</label>
                  <input
                    value={supporterName}
                    onChange={(event) => setSupporterName(event.target.value)}
                    type="text"
                    className="w-full border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-zinc-100 placeholder-zinc-600 focus:border-zinc-100 focus:outline-none transition-colors rounded-none text-lg"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">Message</label>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={2}
                    className="w-full border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-zinc-100 placeholder-zinc-600 focus:border-zinc-100 focus:outline-none transition-colors rounded-none text-lg resize-none"
                    placeholder="Leave a message of support"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-4">Amount</label>
                  <div className="flex gap-4 flex-wrap mb-4">
                    {[10, 20, 30, 50].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setAmount(value)}
                        className={`rounded-sm px-6 py-4 font-semibold text-lg transition-colors border-2 cursor-pointer ${
                          amount === value
                            ? "border-zinc-100 bg-zinc-100 text-zinc-950"
                            : "border-zinc-800 bg-transparent text-zinc-100 hover:border-zinc-600"
                        }`}>
                        ${value}
                      </button>
                    ))}
                  </div>
                  <input
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    type="number"
                    min="1"
                    className="w-full border-b-2 border-zinc-800 bg-transparent px-0 py-3 text-zinc-100 placeholder-zinc-600 focus:border-zinc-100 focus:outline-none transition-colors rounded-none text-lg"
                    placeholder="Custom amount"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-8 border-t border-zinc-900">
                <button
                  type="button"
                  onClick={() => createCheckout(Number(amount))}
                  disabled={loading}
                  className="rounded-sm bg-zinc-100 px-8 py-5 text-zinc-950 font-bold tracking-widest uppercase transition-colors hover:bg-white disabled:opacity-50 cursor-pointer shadow-lg shadow-zinc-100/10">
                  {loading ? "Processing…" : "Fund Now"}
                </button>
                <button
                  type="button"
                  onClick={openCheckout}
                  disabled={!checkoutUrl}
                  className="rounded-sm border-2 border-zinc-100 bg-transparent px-8 py-5 text-zinc-100 font-bold tracking-widest uppercase transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:border-zinc-800 disabled:text-zinc-600 cursor-pointer">
                  Open Checkout
                </button>
              </div>

              {status ? <p className="text-sm font-medium text-zinc-100 mt-4 bg-zinc-900 p-4 border-l-4 border-zinc-100">{status}</p> : null}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-16">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">Payment Preview</h3>
              <div className="border border-zinc-800 p-8 text-center bg-zinc-900">
                {checkoutUrl ? (
                  <>
                    <div className="bg-white p-4 inline-block mx-auto mb-6">
                      <img className="max-h-64 object-contain" src={qrImageUrl} alt="Stripe payment QR code" />
                    </div>
                    <p className="text-xs uppercase tracking-widest font-semibold text-zinc-400">Scan to complete payment</p>
                  </>
                ) : (
                  <div className="py-24 text-zinc-600 text-sm font-medium border-2 border-dashed border-zinc-800">
                    Generate payment to view QR code
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-6">Recent Supporters</h3>
              <ul className="space-y-6">
                <li className="border-b border-zinc-800 pb-4">
                  <p className="text-zinc-100 font-semibold text-lg">niknhi <span className="text-zinc-500 font-normal ml-2">funded $50</span></p>
                  <p className="text-zinc-400 mt-1 italic">&quot;Love the new video series!&quot;</p>
                </li>
                <li className="border-b border-zinc-800 pb-4">
                  <p className="text-zinc-100 font-semibold text-lg">rohit <span className="text-zinc-500 font-normal ml-2">funded $15</span></p>
                  <p className="text-zinc-400 mt-1 italic">&quot;Keep up the great work.&quot;</p>
                </li>
                <li className="border-b border-zinc-800 pb-4">
                  <p className="text-zinc-100 font-semibold text-lg">appu <span className="text-zinc-500 font-normal ml-2">funded $100</span></p>
                  <p className="text-zinc-400 mt-1 italic">&quot;Big fan!&quot;</p>
                </li>
                <li className="pb-4">
                  <p className="text-zinc-100 font-semibold text-lg">vani <span className="text-zinc-500 font-normal ml-2">funded $25</span></p>
                  <p className="text-zinc-400 mt-1 italic">&quot;Coffee on me ☕&quot;</p>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Username;

