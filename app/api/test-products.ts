import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function handleError(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unknown error occurred";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .limit(5);

    if (error) throw error;

    res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    res.status(500).json({ success: false, error: errorMessage });
  }
}
