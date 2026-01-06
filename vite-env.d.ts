declare module '*.css?url' {
  const value: string;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_TYPESENSE_SEARCH_API_KEY: string;
  readonly VITE_TYPESENSE_URL: string;
  // Add more variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
