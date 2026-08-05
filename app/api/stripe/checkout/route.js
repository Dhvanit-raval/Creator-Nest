import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY; 
const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2022-11-15" })
  : null;

export async function POST(request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe secret key not configured. Add STRIPE_SECRET_KEY to .env.local." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const amount = Number(body.amount);
  const creator = body.creator || "creator";
  const supporterName = body.supporterName || "Anonymous";
  const message = body.message || "";

  if (!amount || amount <= 0) {
    return NextResponse.json(
      { error: "Amount must be a positive number." },
      { status: 400 }
    );
  }

  const origin = new URL(request.url).origin;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Support ${creator}`,
              description: message || `Support payment for ${creator}`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/?payment=success`,
      cancel_url: `${origin}/?payment=canceled`,
      metadata: {
        creator,
        supporterName,
        message,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to create Stripe checkout session." },
      { status: 500 }
    );
  }
}
