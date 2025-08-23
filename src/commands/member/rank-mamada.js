const { PREFIX } = require(`${BASE_DIR}/config`);
const { InvalidParameterError } = require(`${BASE_DIR}/errors`);

module.exports = {
  name: "chupeta",
  description: "Chupetômetro oficial do grupo!",
  commands: ["rank-mamada", "chupetometro"],
  usage: `${PREFIX}chupeta`,

  handle: async ({ sendText, getGroupMetadata, chatId, isGroup }) => {
    if (!isGroup) throw new InvalidParameterError("❗ Só funciona em grupos!");

    const groupMetadata = await getGroupMetadata(chatId);
    const participants = groupMetadata.participants.map(p => p.id.replace(/@.+/, ""));
    if (!participants.length) throw new InvalidParameterError("❗ Nenhum membro encontrado.");

    const shuffled = participants.sort(() => Math.random() - 0.5);

    let lista = `🍭 *CHUPETÔMETRO OFICIAL* 🍭\n\n`;
    shuffled.forEach((num, i) => {
      const vezes = Math.floor(Math.random() * 50) + 1;
      lista += `*${i + 1}.* @${num}  — já mamou *${vezes}x* 😏🍆\n`;
    });

    const escolhido = shuffled[Math.floor(Math.random() * shuffled.length)];
    lista += `\n👑 O *Rei da Chupeta* é: @${escolhido}!!! 🍭👅`;

    await sendText(lista, shuffled.map(num => num + "@s.whatsapp.net"));
  },
};
