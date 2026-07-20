import { NextRequest, NextResponse } from "next/server";
import { searchSiteContent } from "@/application/search-site-content";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const results = await searchSiteContent(query);
  return NextResponse.json(results);
}
