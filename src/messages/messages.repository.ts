import { readFile, writeFile } from 'fs/promises';

export class MessagesRepository {
  /**
   * Finds a message stored at the specified id
   * @param id Id of the required message
   * @returns message record with the specified id
   */
  async findOne(id: string): Promise<any> {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages[id];
  }

  /**
   * Return all the messages in the system
   * @returns all the messages
   */
  async findAll() {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    return messages;
  }

  /**
   * Create a new message with the specified content
   * @param content Message payload
   */
  async create(content: string) {
    const contents = await readFile('messages.json', 'utf8');
    const messages = JSON.parse(contents);

    console.log(messages);

    // TODO: Get the last message id and increment it by 1 for new message id
    const id = Math.floor(Math.random() * 999);

    messages[id] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages));
  }
}
