export const buildOpenAiClientMock = () => {
  return {
    embeddings: {
      create: jest.fn().mockImplementation(() => {
        return Promise.resolve({
          data: [
            {
              embedding: Array(1536).fill(0).map(() => Math.random()), // Generate new random values on each call
              index: 0,
              object: 'embedding'
            }
          ],
          model: 'text-embedding-3-small',
          object: 'list',
          usage: {
            prompt_tokens: 10,
            total_tokens: 10
          }
        });
      })
    }
  };
};
