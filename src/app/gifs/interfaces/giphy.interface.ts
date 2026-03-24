export interface GiphyResponse {
  data: GiphyItem[];
  meta: Meta;
  pagination: Pagination;
}

interface Pagination {
  total_count: number;
  count: number;
  offset: number;
}

interface Meta {
  status: number;
  msg: string;
  response_id: string;
}

export interface GiphyItem {
  type: string;
  id: string;
  url: string;
  slug: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  title: string;
  rating: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  is_sticker: number;
  import_datetime: string;
  trending_datetime: string;
  images: Images;
  user?: User;
  analytics_response_payload: string;
  analytics: Analytics;
  alt_text: string;
  is_low_contrast: boolean;
}

interface Analytics {
  onload: Onload;
  onclick: Onload;
  onsent: Onload;
}

interface Onload {
  url: string;
}

interface User {
  avatar_url: string;
  banner_image: string;
  banner_url: string;
  profile_url: string;
  username: string;
  display_name: string;
  description: string;
  instagram_url: string;
  website_url: string;
  is_verified: boolean;
}

interface Images {
  original: Original;
  fixed_height: Fixedheight;
  fixed_height_downsampled: Fixedheightdownsampled;
  fixed_height_small: Fixedheight;
  fixed_width: Fixedheight;
  fixed_width_downsampled: Fixedheightdownsampled;
  fixed_width_small: Fixedheight;
}

interface Fixedheightdownsampled {
  height: string;
  width: string;
  size: string;
  url: string;
  webp_size: string;
  webp: string;
}

interface Fixedheight {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
}

interface Original {
  height: string;
  width: string;
  size: string;
  url: string;
  mp4_size: string;
  mp4: string;
  webp_size: string;
  webp: string;
  frames: string;
  hash: string;
}
