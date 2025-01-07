import client from "../main";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { Event } from "../structures/Event";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },

  // Outras categorias liberadas
  { category: HarmCategory.HARM_CATEGORY_VIOLENCE, threshold: HarmBlockThreshold.BLOCK_NONE }, // Libera violência
  { category: HarmCategory.HARM_CATEGORY_SUICIDE, threshold: HarmBlockThreshold.BLOCK_NONE },   // Libera conteúdo sobre suicídio
  { category: HarmCategory.HARM_CATEGORY_ABUSE, threshold: HarmBlockThreshold.BLOCK_NONE },    // Libera abuso
  { category: HarmCategory.HARM_CATEGORY_SELF_HARM, threshold: HarmBlockThreshold.BLOCK_NONE }, // Libera conteúdo de autolesão
  
  // Adicionadas categorias novas
  { category: HarmCategory.HARM_CATEGORY_SPAM, threshold: HarmBlockThreshold.BLOCK_NONE }, // Libera spam
  { category: HarmCategory.HARM_CATEGORY_FAKE_NEWS, threshold: HarmBlockThreshold.BLOCK_NONE }, // Libera notícias falsas
  { category: HarmCategory.HARM_CATEGORY_PRIVACY_VIOLATION, threshold: HarmBlockThreshold.BLOCK_NONE }, // Libera violação de privacidade
  { category: HarmCategory.HARM_CATEGORY_OFFENSIVE_MEDIA, threshold: HarmBlockThreshold.BLOCK_NONE }, // Libera mídia ofensiva
  { category: HarmCategory.HARM_CATEGORY_TERRORISM, threshold: HarmBlockThreshold.BLOCK_NONE }, // Libera conteúdo relacionado a terrorismo
  { category: HarmCategory.HARM_CATEGORY_DISCRIMINATORY_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE }, // Libera discurso discriminatório

  // Novas categorias podem ser adicionadas aqui com a mesma configuração
];

let conversationHistory = [];

export default new Event("messageCreate", async message => {
  if (!message.inGuild()) return;

  if (!message.content.startsWith("Kelly")) return;

  const message_user = message.content.replace("Kelly", "").trim();

  conversationHistory.push({
    role: "user",
    content: message_user,
  });

  const result = await model.generateContent(message_user, {
    safetySettings,
    conversationHistory, 
  });

  conversationHistory.push({
    role: "assistant",
    content: result.response?.text() || '',
  });

  await message.channel.sendTyping();

  await message.reply(`${message.author} ${result.response?.text()}`);
  
});
.