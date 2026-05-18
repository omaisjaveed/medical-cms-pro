/// <reference types="vite/client" />

declare interface ImportMeta {
  readonly env: {
    readonly VITE_API_URL?: string;
    // Add other environment variables here if needed
  };
}