# check it out: "https://nx.dev/technologies/node/nest/api/generators/library"

npx nx g @nx/nest:library libs/infra/mongo --name=infra-mongo --dryRun
npx nx g @nx/nest:library libs/database --name=infra-database --dryRun