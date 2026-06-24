export const revalidate = false;

const BASE = 'https://capabilityhostprotocol.com';

/**
 * OpenAPI 3.1 description of CHP's public HTTP surface, so agents can
 * understand the API automatically. Served at /openapi.json.
 */
export function GET() {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'Capability Host Protocol — Public API',
      version: '0.8.0',
      summary: 'Query CHP, discover its capabilities, and connect agents.',
      description:
        'CHP is the open evidence layer of the agentic web. This API exposes a natural-language query endpoint (/ask), the well-known discovery manifests, and the MCP server endpoint. For full tool invocation, connect over MCP at /api/mcp.',
      contact: { name: 'Capability Host Protocol', url: BASE },
      license: { name: 'Apache-2.0', identifier: 'Apache-2.0' },
    },
    servers: [{ url: BASE }],
    paths: {
      '/ask': {
        get: {
          operationId: 'ask',
          summary: 'Natural-language query over CHP knowledge',
          description:
            'Returns the best-matching concept, definition, FAQ, and capabilities for a query. Structured retrieval over real CHP content.',
          parameters: [
            {
              name: 'q',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'The question, e.g. "how does CHP prove what an agent did".',
            },
          ],
          responses: {
            '200': {
              description: 'A structured answer.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/AskResponse' } } },
            },
            '400': {
              description: 'Bad request.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
        post: {
          operationId: 'askPost',
          summary: 'Natural-language query (POST)',
          requestBody: {
            required: false,
            content: {
              'application/json': {
                schema: { type: 'object', properties: { q: { type: 'string' } } },
              },
            },
          },
          responses: {
            '200': {
              description: 'A structured answer.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/AskResponse' } } },
            },
            '400': {
              description: 'Bad request.',
              content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
            },
          },
        },
      },
      '/api/mcp': {
        post: {
          operationId: 'mcp',
          summary: 'MCP server (Model Context Protocol, streamable HTTP)',
          description:
            'JSON-RPC 2.0 over streamable HTTP. Tools: explain, define, how_to_adopt, get_example, faq, list_capabilities, get_capability, list_adapters, search. Resources: chp://glossary, chp://concepts, chp://quickstart, chp://capabilities. Every tool call is wrapped as hash-chained CHP evidence. See /.well-known/mcp.json.',
          requestBody: {
            required: true,
            content: { 'application/json': { schema: { type: 'object', description: 'A JSON-RPC 2.0 request.' } } },
          },
          responses: {
            '200': { description: 'A JSON-RPC 2.0 response (application/json or text/event-stream).' },
          },
        },
      },
      '/.well-known/agent-card.json': {
        get: {
          operationId: 'agentCard',
          summary: 'A2A agent card (capability manifest)',
          responses: { '200': { description: 'The A2A agent card.', content: { 'application/json': {} } } },
        },
      },
      '/.well-known/mcp.json': {
        get: {
          operationId: 'mcpManifest',
          summary: 'MCP discovery manifest',
          responses: { '200': { description: 'MCP endpoint, transport, and tools.', content: { 'application/json': {} } } },
        },
      },
      '/.well-known/capabilities.json': {
        get: {
          operationId: 'capabilities',
          summary: 'CHP capability discovery manifest',
          responses: { '200': { description: 'The declared capability surface.', content: { 'application/json': {} } } },
        },
      },
    },
    components: {
      schemas: {
        AskResponse: {
          type: 'object',
          properties: {
            query: { type: 'string' },
            answer: {
              type: ['object', 'null'],
              properties: {
                type: { type: 'string', enum: ['concept', 'definition', 'faq'] },
                title: { type: 'string' },
                text: { type: 'string' },
                learnMore: { type: 'string', format: 'uri' },
              },
            },
            related: { type: 'object' },
            sources: { type: 'object' },
          },
        },
        Error: {
          type: 'object',
          required: ['error'],
          properties: {
            error: {
              type: 'object',
              required: ['code', 'message'],
              properties: {
                code: { type: 'string', example: 'invalid_request' },
                message: { type: 'string' },
                hint: { type: 'string' },
              },
            },
          },
        },
      },
    },
  };

  return new Response(JSON.stringify(spec, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
