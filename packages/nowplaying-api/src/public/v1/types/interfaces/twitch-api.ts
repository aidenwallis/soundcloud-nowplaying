export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email: string;
}

export interface TwitchHelixResponse<T> {
  data: T[];
}

export interface TwitchPaginatedHelixResponse<T>
  extends TwitchHelixResponse<T> {
  pagination: {
    cursor: string;
  };
}
