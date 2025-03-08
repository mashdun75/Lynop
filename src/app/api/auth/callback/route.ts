import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    });

    await supabase.auth.exchangeCodeForSession(code);

    // Check if user has completed onboarding
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const onboardingCompleted = user?.user_metadata?.onboarding_completed;

    if (onboardingCompleted) {
      // If onboarding is completed, redirect to dashboard
      return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
    } else {
      // If onboarding is not completed, redirect to onboarding
      return NextResponse.redirect(`${requestUrl.origin}/onboarding`);
    }
  }

  // Fallback redirect if no code is present
  return NextResponse.redirect(requestUrl.origin);
}
