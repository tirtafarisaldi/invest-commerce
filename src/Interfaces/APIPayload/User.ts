export interface IUserProfile {
  id: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  name: string;
  seedsTag: string;
  refCode: string;
  avatar: string;
  preferredLanguage: string;
  bio: string;
  pin: boolean;
  followers: number;
  following: number;
  posts: number;
  claims: {
    sub: string;
    phoneNumber: string;
    email: string;
    birthDate: string;
    name: string;
    seedsTag: string;
    refCode: string;
    avatar: string;
    role: string;
    preferredLanguage: string;
    iss: string;
    aud: string[];
    exp: number;
    nbf: number;
    iat: number;
  };
}

export interface IOtherProfile {
  id: string;
  phoneNumber: string;
  email: string;
  birthDate: string;
  name: string;
  seedsTag: string;
  refCode: string;
  avatar: string;
  role: string;
  preferredLanguage: string;
}
