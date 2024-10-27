![cover](/public/images/presentation.png)

# Detalles tecnicos

Stylo está basado principalmente en agentes orquestados por LangGraph, un motor que nos permite crear diferentes agentes con herramientas específicas. Cada agente se encarga de una tarea en particular y puede interactuar con otros agentes. En esta oportunidad, logramos integrarlo con la API de WhatsApp Business para enviar y recibir mensajes

![cover](/public/images/image1.jpg)

Aquí podemos ver un video donde, usando LangGraph Studio para hacer debuging y se muestra cómo los agentes que creamos interactúan entre ellos, cómo utilizan las herramientas (call functions) e incluso cómo colaboran entre sí.

- Demo LangGraph Studio: https://youtu.be/hQ4VBACBiV4
- Demo en Produccion con WhatsApp: https://youtu.be/qPAvGp7wlW0

El numero de WhatsApp para probar el chatbot https://wa.me/59162656635

<a aria-label="Chat on WhatsApp" href="https://wa.me/59162656635?text=Hello">
  <img alt="Chat on WhatsApp" src="WhatsAppButtonGreenLarge.svg" />
</a>

Si quieres probarlo desde [LangGraph Studio](https://studio.langchain.com/), primero debes clonar el repositorio y luego instalar LangGraph Studio. Después, solo necesitas seleccionar la carpeta del proyecto

### Requisitos

### GuruSup

Nuestro sistema de multiagentes está diseñado para resolver el problema de "customer support" en un sector específico; en este caso, el sector de barberías y peluquerías, abordando el desafío de la reserva de citas 24/7.

### Mistral

Usamos el modelo de Mistral: `mistral-large-latest` en la mayoría de los agentes y en el router, aplicando técnicas de prompt engineering para detectar la intención del usuario, responder de forma adecuada y evaluar si un agente está cumpliendo con su tarea para colaborar con otros.

### CodeGPT

Creemos dos agentes en CodeGPT para que nos ayudaran en esta hackathon:

- LangGraphJS Agent: Alimenté a este agente con un gráfico del repositorio, ya que la documentación de LangGraphJS, al ser reciente, aún no está completa. Este agente nos ayudó a resolver problemas y proporcionó varios ejemplos útiles.

![capture](/public/images/lang.png)

- Sander’s Q&A: Creado para funcionar como agente de conversación, este agente utiliza un handbook para estilistas como fuente de información, lo cual le permite responder a preguntas de clientes. Sin embargo, no llegamos a implementarlo completamente en el proyecto.

![capture](/public/images/qa.png)

## 🚀 Services

- Backend: https://ripe-kyrstin-nicobytes-9da8b8bf.koyeb.app/
- Frontend: Whatsapp Business API

## 🧱 Stack

- Backend: 
  - API: [HonoJS](https://honojs.com/)
  - LangChainJS: [LangChainJS](https://langchainjs.com/)
  - LangGraphJS: [LangGraphJS](https://langchain-ai.github.io/langgraphjs/)
- Database: Postgres para guardar las conversaciones y el estado de interaccion de cada agente

### Folder structure

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

### Monitoreo

Usamos langSmith para monitorear el estado de los agentes y la interaccion entre ellos en produccion.

![capture](/public/images/monitor.png)

### Retos

- Desde el equipo de UX/UI, buscamos resolver un problema real. Por eso, este bot está diseñado considerando conversaciones con los dueños de [Sander'S Salón y Barbería](https://www.google.com/maps/place/Sander'S+Salón+y+Barbería/@-17.3877902,-66.1571303,15z/data=!4m2!3m1!1s0x0:0xf5e5aa8495b3b0d6?sa=X&ved=1t:2428&ictx=111), un salón de belleza en Cochabamba, Bolivia, que enfrenta este desafío

- Inicialmente, con LangGraph es posible tener un agente con acceso a varias herramientas, utilizando una arquitectura tipo ReAct. Sin embargo, nos dimos cuenta de que, al agregar más herramientas a un mismo agente, este comenzaba a confundirse al momento de seleccionar la herramienta adecuada. Por esta razón, optamos por crear agentes individuales con una relación 1:1 (un agente por herramienta), de manera que cada agente se especializara en resolver un caso específico. El reto luego fue coordinar la interacción entre estos agentes en el momento adecuado. Finalmente, logramos hacerlo utilizando los mismos modelos de lenguaje (LLMs) para evaluar las conversaciones, junto con la capacidad de LangGraph para orquestar estos agentes en forma de nodos

### Equipo

|  Zulema Vicente | Nicolas Molina  |
| -------- | ------- |
| UX/UI  | Developer    |
| ![capture](/public/images/zule.jpeg) | ![capture](https://nicobytes.com/profile.jpg)    |
| https://www.linkedin.com/in/vpzulema/ | https://www.linkedin.com/in/nicobytes/ |


