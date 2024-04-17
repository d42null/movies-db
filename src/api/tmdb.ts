import config from "../configuration";
import { Movie } from "../reducers/movies";
async function get<TBody>(relativeUrl: string): Promise<TBody> {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.apiToken}`,
    },
  };
  const response = await fetch(`${config.apiUrl}/3${relativeUrl}`, options);
  const json: TBody = await response.json();
  return json;
}
export interface MovieDetails {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  backdrop_path?: string;
}
interface PageResponse<TResult> {
  results: TResult[];
  page: number;
  total_pages:number;
}
interface PageDetails<TResult> {
  results: TResult[];
  page: number;
  totalPages:number;
}
interface Configuration {
  images: {
    base_url: string;
  };
}
export const client = {
  async getConfiguration() {
    return get<Configuration>("/configuration");
  },

  async getNowPlaying(page:number=1): Promise<PageDetails<MovieDetails>> {
    const response = await get<PageResponse<MovieDetails>>(
      `/movie/now_playing?page=${page}`
    );
    return{
      results:response.results,
      page:response.page,
      totalPages:response.total_pages
    }
  },
};
