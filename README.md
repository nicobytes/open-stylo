![cover](/public/images/presentation.png)

# Detalles tecnicos

Stylo está basado principalmente en agentes orquestados por LangGraph, un motor que nos permite crear diferentes agentes con herramientas específicas. Cada agente se encarga de una tarea en particular y puede interactuar con otros agentes. En esta oportunidad, logramos integrarlo con la API de WhatsApp Business para enviar y recibir mensajes

![cover](/public/images/image1.jpg)

Aquí podemos ver un video donde, usando LangGraph Studio para hacer debuging y se muestra cómo los agentes que creamos interactúan entre ellos, cómo utilizan las herramientas (call functions) e incluso cómo colaboran entre sí.

https://youtu.be/hQ4VBACBiV4

Si quieres probarlo desde [LangGraph Studio](https://studio.langchain.com/), primero debes clonar el repositorio y luego instalar LangGraph Studio. Después, solo necesitas seleccionar la carpeta del proyecto

### Requisitos

### GuruSup

Nuestro sistema de multiagentes está diseñado para resolver el problema de "customer support" en un sector específico; en este caso, el sector de barberías y peluquerías, abordando el desafío de la reserva de citas 24/7.

### Mistral

Usamos el modelo de Mistral: `mistral-large-latest` en la mayoría de los agentes y en el router, aplicando técnicas de prompt engineering para detectar la intención del usuario, responder de forma adecuada y evaluar si un agente está cumpliendo con su tarea para colaborar con otros.

### CodeGPT

## 🚀 Services

- Backend: https://ripe-kyrstin-nicobytes-9da8b8bf.koyeb.app/
- Frontend: Whatsapp Business API

## 🧱 Stack

- Backend: 
  - API: [HonoJS](https://honojs.com/)
  - LangChainJS: [LangChainJS](https://langchainjs.com/)
  - LangGraphJS: [LangGraphJS](https://langchain-ai.github.io/langgraphjs/)

### Folder structure

The frontend app is organized in the following folder structure:

```sh
.
├── Dockerfile
├── README.md
├── biome.json
├── langgraph.json
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
  ├── api
  │   └── index.ts
  ├── chatbot
  │   ├── getModels.ts
  │   ├── graph.state.ts
  │   ├── graph.ts
  │   ├── index.ts
  │   ├── nodes
  │   │   ├── availability.node.ts
  │   │   ├── booking.node.ts
  │   │   ├── conversation.node.ts
  │   │   ├── index.ts
  │   │   └── tool.node.ts
  │   ├── routers
  │   │   ├── availability.router.ts
  │   │   ├── checkerTool.router.ts
  │   │   ├── intent.router.ts
  │   │   └── toolToNode.router.ts
  │   ├── saver.ts
  │   └── tools
  │       ├── bookAppointment.tool.ts
  │       └── checkAvailability.tool.ts
  └── index.ts
└── tsconfig.json
```

## 🚀 Deployment

This project was structured as a monorepo, with the frontend and backend in the same repository, and with Github actions to detect changes in the code and deploy the app to the cloud. As part of CI/CD, the project has a linter and build step before deploying the app. The project has automatic deployment to Cloudflare Workers for the API, the frontend in Cloudflare pages.

![capture](/images/interview_ci.jpg)

### Equipo





