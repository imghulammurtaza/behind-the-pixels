import { NextResponse } from "next/server";

type TurnstileVerifyResponse = {
  success: boolean;
  "error-codes"?: string[];
  action?: string;
  hostname?: string;
};

export async function POST(request: Request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Captcha is not configured." },
      { status: 500 },
    );
  }

  let body: {
    name?: string;
    email?: string;
    phone?: string;
    project?: string;
    services?: string[];
    budget?: string | null;
    turnstileToken?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const project = body.project?.trim() ?? "";
  const token = body.turnstileToken?.trim() ?? "";

  if (!name || !email || !project) {
    return NextResponse.json(
      { ok: false, error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Please complete the captcha." },
      { status: 400 },
    );
  }

  const verifyBody = new URLSearchParams({
    secret,
    response: token,
  });

  const forwarded = request.headers.get("cf-connecting-ip");
  const realIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const remoteip = forwarded || realIp;
  if (remoteip) verifyBody.set("remoteip", remoteip);

  const verifyRes = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: verifyBody,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    },
  );

  const verifyJson = (await verifyRes.json()) as TurnstileVerifyResponse;
  if (!verifyJson.success) {
    return NextResponse.json(
      { ok: false, error: "Captcha verification failed. Please try again." },
      { status: 400 },
    );
  }

  // Form is accepted after captcha passes.
  // Hook email/CRM delivery here when ready.
  return NextResponse.json({ ok: true });
}
