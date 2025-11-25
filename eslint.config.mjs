import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Prettier와 충돌하는 ESLint 규칙 비활성화
  {
    name: "prettier-overrides",
    rules: {
      ...prettierConfig.rules,
    },
  },
  // Prettier 실행 (포맷팅 에러를 ESLint로 surface)
  {
    name: "prettier-plugin",
    plugins: ["prettier"],
    rules: {
      "prettier/prettier": "warn",
    },
  },
  // TypeScript & React Hooks 코드 품질
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  // TanStack Query 규칙 적용
  {
    name: "tanstack-query",
    plugins: ["@tanstack/query"],
    rules: {
      "@tanstack/query/stable-query-key": "error",
      "@tanstack/query/no-rest-destructuring": "warn",
      "@tanstack/query/exhaustive-deps": "warn",
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
