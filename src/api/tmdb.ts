import config from "../configuration";
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

  async getNowPlaying(): Promise<MovieDetails[]> {
    const response = await get<PageResponse<MovieDetails>>(
      "/movie/now_playing?page=1"
    );
    return response.results;
  },
};
