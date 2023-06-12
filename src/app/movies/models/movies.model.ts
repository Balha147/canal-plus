export interface MovieModel {
	id: number;
  'Title': string;
  'US Gross'?: number;
  'US DVD Sales'?: number;
  'Worldwide Gross'?: number;
  'Production Budget'?: number;
  'Release Date'?: string;
  'Distributor'?: string;
  'IMDB Rating'?: number;
  'IMDB Votes'?: number;
  'Major Genre'?: string;
  'Director'?: string;
  'Rotten Tomatoes Rating'?: string;
  'Creative Type'?: string;
}
export interface MovieTransformerModel {
	id: number;
  Title: string;
  USGross?: number;
  USDVDSales?: number;
  WorldwideGross?: number;
  ProductionBudget?: number;
  ReleaseDate?: string;
  Distributor?: string;
  IMDBRating?: number;
  IMDBVotes?: number;
  MajorGenre?: string;
  Director?: string;
  RottenTomatoesRating?: string;
  CreativeType?:string;
  image?: string
}

export interface TriModel {
  label: string;
  value: string;
}
