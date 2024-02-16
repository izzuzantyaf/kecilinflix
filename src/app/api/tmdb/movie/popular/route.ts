import { theMovieDbService } from "@/modules/the-movie-db/the-movie-db.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const response = await theMovieDbService.getPopularMovies();

  return Response.json(response.data);
}
