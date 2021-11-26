export const appConfig: Params = {

  baseApiPath: 'https://onlinestore.itdevsoft.ru:443/api',
  //baseApiPath: 'http://localhost:5002/api',
  guestKey: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZ3Vlc3QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJndWVzdCIsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8ifQ.Oy6Ris_1RzUWKKSzRZ5c4flTO4lPAEmRgUK5V4qL6bw'
}

export class Params {
  public baseApiPath: string;
  public guestKey: string;
}