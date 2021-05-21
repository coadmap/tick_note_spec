const fs = require('fs');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { print } = require('graphql');

const typesArray = loadFilesSync('schema/**/*.{gql,graphql}', { recursive: true })

const mergeSchema = mergeTypeDefs(typesArray);

const printedTypeDefs = print(mergeSchema);

fs.writeFileSync('schema.graphql', printedTypeDefs, { encoding: 'utf8' })
