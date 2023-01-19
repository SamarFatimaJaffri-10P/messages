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

    /**
     * Get the messages JSON object and return `1` if no message in the system else `last message id + 1`
     * @param messages JSON object carrying all the messages
     * @returns new message id
     */
    const get_id = function (messages: JSON) {
      if (JSON.stringify(messages) === '{}') {
        return 1;
      }

      // Storing messages ids into array
      const messages_ids: number[] = [];
      for (const id in messages) {
        messages_ids.push(+id);
      }

      // Sort ids in descending order and return the id of last message
      messages_ids.sort(function (a, b) {
        return b - a;
      });
      return messages_ids[0] + 1;
    };

    const id: number = get_id(messages);
    messages[id] = { id, content };

    console.log(messages);

    await writeFile('messages.json', JSON.stringify(messages));
  }
}
