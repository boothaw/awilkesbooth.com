export interface SiteInfo {
  name: string;
  description: string;
}

export interface Term {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface Post {
  id: number;
  title: string;      // plain string now
  excerpt: string;
  content: string;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:term': Term[][];
  };

}