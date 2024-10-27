![cover](/public/images/presentation.png)

# Detalles tecnicos

Stylo está basado principalmente en agentes orquestados por LangGraph, un motor que nos permite crear diferentes agentes con herramientas específicas. Cada agente se encarga de una tarea en particular y puede interactuar con otros agentes. En esta oportunidad, logramos integrarlo con la API de WhatsApp Business para enviar y recibir mensajes

![cover](/public/images/image1.jpg)

Aqui podemos ver una video de como usando LangGraph puedo ver como interactuan los agentes entre ellos, como los agentes usan las tools y como se colaboran entre ellos.

https://youtu.be/hQ4VBACBiV4



## 🚀 Services

- Backend: https://ripe-kyrstin-nicobytes-9da8b8bf.koyeb.app/
- Frontend: Whatsapp Business API

## 🧱 Stack

- Frontend
  - Framework: [Angular](https://angular.dev/)
  - Styling: [Tailwind CSS](https://tailwindcss.com/)
  - Headless component primitives: [Angular CDK](https://material.angular.io)
- Backend: 
  - API: [HonoJS](https://honojs.com/)
  - LangChainJS: [LangChainJS](https://langchainjs.com/)
- Infrastructure:
  - Cloudflare Pages
  - Clodflare Workers
  - Workers AI Models
    - @cf/openai/whisper
    - @cf/meta/llama-2-7b-chat-fp16
    - openai-tts
  - Storage: R2
  - Database: D1 to chat memory

## 🚀 Quickstart

### 1. Fork and Clone repo

Fork the repo to your Github account, then run the following command to clone the repo:

```
git clone git@github.com/nicobytes/interview-cloudflare-ai
```

### 2. Install dependencies

```
cd apps/website
npm i

cd apps/api
npm i
```

### 3. Run app locally

```
cd apps/website
ng serve
# check the app in http://localhost:4200

cd apps/api
npm run dev:remote
# check the app in http://localhost:3100/docs
```

## 🚀 Backend

The backend is built with HonoJS and Cloudfare Workers, a platform for building serverless applications that run on Cloudflare's global network.

![capture](/images/interview_docs.jpg)

### Folder structure

The backend app is organized in the following folder structure:

```sh
.src/
├── bindings.ts
├── db
│   └── schema.ts
├── dtos
│   ├── feedback.dto.ts
│   ├── message.dto.ts
│   └── simulation.dto.ts
├── index.ts
├── middlewares
│   └── db.middleware.ts
├── routes
│   ├── createFeedback.ts
│   ├── createQuestion.ts
│   ├── createSimulation.ts
│   └── createTranscript.ts
├── services
│   ├── llm.service.ts
│   ├── openai.service.ts
│   ├── simulation.service.ts
│   └── whisper.service.ts
└── types.ts
```

## 🚀 Frontend

The frontend is built with Angular, a platform and framework for building web applications using HTML, CSS and TypeScript.


### Responsive design

![capture](/images/interview.jpg)
![capture](/images/interview_desk.jpg)
![capture](/images/interview_chat.jpg)

### Using Angular Signals

The application uses Angular signals like a reactive pattern to communicate between components, services, and directives.

### Folder structure

The frontend app is organized in the following folder structure:

```sh
.
├── app
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── components
│   │   ├── header
│   │   │   ├── header.component.html
│   │   │   └── header.component.ts
│   │   └── modal-recording
│   │       ├── modal-recording.component.html
│   │       └── modal-recording.component.ts
│   ├── models
│   │   └── message.model.ts
│   ├── pages
│   │   ├── create
│   │   │   ├── create.component.html
│   │   │   └── create.component.ts
│   │   ├── home
│   │   │   ├── home.component.html
│   │   │   └── home.component.ts
│   │   └── simulator
│   │       ├── simulator.component.html
│   │       └── simulator.component.ts
│   └── services
│       └── api.service.ts
├── assets
│   └── images
│       ├── background.png
│       └── interview.jpg
├── environments
│   ├── environment.development.ts
│   └── environment.ts
├── favicon.ico
├── index.html
├── main.ts
└── styles.scss
```

## 🚀 Deployment

This project was structured as a monorepo, with the frontend and backend in the same repository, and with Github actions to detect changes in the code and deploy the app to the cloud. As part of CI/CD, the project has a linter and build step before deploying the app. The project has automatic deployment to Cloudflare Workers for the API, the frontend in Cloudflare pages.

![capture](/images/interview_ci.jpg)





