import axios from "axios";
declare global {
  interface Window {
    language: {
      nonce: string;
      apiUrl: string;
    };
  }
}
const apiClient = axios.create({
  baseURL: window.language.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
export interface Language {
    id: string;
    language_key: string;
    language_vn: string;
    language_en: string;
}
export interface LanguageResponse {
    data: Language[];
    total: number;
    page: number;
    limit: number;
}
export interface QueryParams {
    page: number;
    limit: number;
    search?: string;
}
export const fetchLanguages = async (params: QueryParams): Promise<LanguageResponse> => {
  return apiClient.get("/get", { params}).then((res) => res.data);
};

export function createLanguage(data: Language) {
  return apiClient.post("/add", data);
}

export function updateLanguage(data: Language) {
  return apiClient.post("/update", data);
}
export function deleteLanguage(id: string) {
  return apiClient.delete("/"+id);
}