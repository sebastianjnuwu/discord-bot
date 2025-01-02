import Client from "../main";
import { Event } from "../structures/Event";

export default new Event("ready", () => {
  
	console.log(`${Client.user.tag} is now online!`);
	
});
