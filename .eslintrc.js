const folders = [
    "components",
    "contracts",
    "hooks",
    "pages",
    "reducer",
    "submodule-contract-artifacts",
    "ui-kit",
    "utils",
];
/** Разрешенные импорты (для сортировки) */
const ALLOWED_PATH_GROUPS = folders.map((folder) => ({
    pattern: `${folder}/**`,
    group: "internal",
    position: "after",
}));

/** Для запрета приватных путей */
const DENIED_PATH_GROUPS = folders.map((folder) => `../**/${folder}`);

module.exports = {
    env: {
        mocha: true,
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
        "react/jsx-props-no-spreading": "off",
        "react/no-unescaped-entities": "off",
        "react/require-default-props": "off",
        "react/no-array-index-key": "warn",
        semi: [2, "always"],
        "no-use-before-define": "off",
        "no-restricted-syntax": "off",
        "no-await-in-loop": "off",
        "prefer-destructuring": "warn",
        "import/extensions": "off",
        "import/no-unresolved": "off",
        "import/no-extraneous-dependencies": "warn",
        "arrow-body-style": "off",
        "jsx-a11y/click-events-have-key-events": "off",
        "jsx-a11y/no-static-element-interactions": "off",
        "jsx-a11y/no-noninteractive-element-interactions": "off",
        "jsx-a11y/alt-text": "off",
        "jsx-a11y/label-has-associated-control": [
            "error",
            {
                required: {
                    some: ["nesting", "id"],
                },
            },
        ],
        "jsx-a11y/label-has-for": [
            "error",
            {
                required: {
                    some: ["nesting", "id"],
                },
            },
        ],
        "react/self-closing-comp": "warn",
        "consistent-return": "warn",
        "import/prefer-default-export": "off",
        "no-unused-vars": "off",
        "no-underscore-dangle": "off",
        "import/order": [
            2,
            {
                pathGroups: ALLOWED_PATH_GROUPS,
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
            },
        ],
        "no-restricted-imports": [
            2,
            {
                patterns: DENIED_PATH_GROUPS,
            },
        ],
    },
};
