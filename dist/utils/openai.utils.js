"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildOpenAiClientMock = void 0;
const buildOpenAiClientMock = () => {
    return {
        embeddings: {
            create: jest.fn().mockImplementation(() => {
                return Promise.resolve({
                    data: [
                        {
                            embedding: Array(1536).fill(0).map(() => Math.random()),
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
exports.buildOpenAiClientMock = buildOpenAiClientMock;
//# sourceMappingURL=openai.utils.js.map