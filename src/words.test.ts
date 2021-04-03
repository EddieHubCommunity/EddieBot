import { words } from './words';

describe('words', () => {
  it('should not send a message if the author is a bot', async () => {
    const mockArgs = {
      isBot: true,
      content: '',
      send: jest.fn(),
    };
    await words(mockArgs);
    expect(mockArgs.send).not.toBeCalled();
  });

  it('should not send a message if the content contains no filtered words', async () => {
    const mockArgs = {
      isBot: false,
      content: "what is up y'all",
      send: jest.fn(),
    };
    await words(mockArgs);
    expect(mockArgs.send).not.toBeCalled();
  });

  it('should send a message if the content contains a filtered word', async () => {
    const mockArgs = {
      isBot: false,
      content: 'what is up guys',
      send: jest.fn(),
    };
    await words(mockArgs);
    expect(mockArgs.send).toBeCalled();
  });

  it('should embed a field for each mark word and send', async () => {
    const mockArgs = {
      isBot: false,
      content: 'what is up guys and girls',
      send: jest.fn(),
    };
    await words(mockArgs);
    const fields = mockArgs.send.mock.calls[0][0].fields;
    expect(fields[0].name).toContain('`guys` may be insensitive');
    expect(fields[1].name).toContain('`girls` may be insensitive');
  });
});
