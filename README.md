DEMO @ https://www.loom.com/share/201066a506ab4f88a8d12febc420ca33?sid=78b9664a-2534-46ec-8c7f-067c316976fc

LIVE @ Not pushed to prod yet .. please reach out if you want me to push this live where you can play with it as well.

## Scope:

- I went beyond the scope of initial work and instead of just a REST API, I built an entire app that showcases how I write and design backend + frontend + infra.
- I built a fully functioning app based on the scope given that:
  - Allows a user to login into the system
  - Transfer fake data to bootstrap their dashboard (user and projects ) views

## Backend:

- API @ https://github.com/khanduri/full_stack/tree/main/api/src/micro_services/projects/apis
- Logic / Controller @ https://github.com/khanduri/full_stack/tree/main/api/src/micro_services/projects/logic
- Data / Repository @ https://github.com/khanduri/full_stack/tree/main/api/src/depot/projects
- MONGO tables and indexes: https://github.com/khanduri/full_stack/blob/main/api/src/depot/mongo/projects.py#L92

- The backend is written in Python / Flask and can scale very well as each API is stateless and requires context be passed via REST API
- The backend databases aceess are primarily done through a Repository pattern / Data access layer. All code will be under teh "Depot" module. This makes the services stateless. This is easier to test / maintain in the long run.
- Each "service" can be a separate deployment target for the future. This way we can keep all services in a single repo, but scale the application as we please in the future (This is a hybrid approach to monolith and SOA that helps in testing and staging setups as well). Happy to chat more about this if there are questions.
- The app is containarized using Docker. It's currently deployed on hekoru, but with any managed container service (ie: any managed k8s cluster) can be deoplyed to any public cloud (AWS, GCP, Azure) rather easily. Sample files on deplying to GCP can be provided in the `infra` folder (at the `api` and `ui` level)

## Frontend:

- Pages @ https://github.com/khanduri/full_stack/tree/main/ui/src/pages/protected
- Components @ https://github.com/khanduri/full_stack/tree/main/ui/src/components

- Using axios in a xhr wrapper : https://github.com/khanduri/full_stack/blob/main/ui/src/utils/xhr.js

- The frontend is written in React / tailwind and is responsive in nature
- It's written as a SPA (Single page application)
- The current deployment flow, to make this prod ready is building static production files and served over popular CDN nodes. The frontend code is backend agnostic and only talks to the API's exposed.
