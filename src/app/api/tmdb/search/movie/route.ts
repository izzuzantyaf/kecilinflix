import { theMovieDbService } from "@/modules/the-movie-db/the-movie-db.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("keyword");
  const response = await theMovieDbService.searchMovies(keyword as string);

  return Response.json(response.data);
}
