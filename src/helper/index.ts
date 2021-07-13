import { Wechaty } from "wechaty";
export async function getContact(bot: Wechaty, wechatyId: string) {
    const contact = bot.Contact.load(wechatyId);
    await contact.sync();
    return contact;
}
