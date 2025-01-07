import { Command } from "../../structures/Command";
import ms from "ms";
import os from "os";

export default new Command({
  name: "ping",
  description: "🐾 › Replies with bot latency, uptime, and system info.",
  description_localizations: {
    "pt-BR":
      "🐾 › Responder com a latência do bot, tempo de atividade e informações do sistema.",
  },
  dm_permission: false,
  exec({ context, client }) {
    const uptimeSeconds = process.uptime() * 1000;
    const uptimeFormatted = ms(uptimeSeconds, { long: true });

    const memoryUsage = process.memoryUsage();
    const memoryFormatted = `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`;

    const platform = os.platform();
    const cpus = os.cpus().length;

    context.reply({
      content: `**🏓 Pong!**\n
⏳ **Uptime:** ${uptimeFormatted}\n
🧠 **Memory:** ${memoryFormatted}\n
🖥️ **Operating System:** ${platform}\n
💻 **CPU Cores:** ${cpus}\n
🛰️ **API Latency:** ${client.ws.ping}ms`,
    });
  },
});
