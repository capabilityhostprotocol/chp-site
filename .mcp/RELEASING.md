# Publishing the CHP MCP server

`server.json` is the manifest for the **official MCP registry**
(`registry.modelcontextprotocol.io`) — a metadata-only catalog that points at
our live remote server at `https://capabilityhostprotocol.com/api/mcp`. It does
not host anything; it makes the server discoverable to MCP clients and the
directories that federate from it.

## Official registry (canonical — do this first)

```bash
# 1. Install the publisher CLI (Go binary)
brew install mcp-publisher            # or grab a release from
                                      # github.com/modelcontextprotocol/registry

# 2. Authenticate. The manifest uses the io.github.capabilityhostprotocol/*
#    namespace, so this verifies you own that GitHub org via OIDC — no DNS,
#    no stored secrets.
mcp-publisher login github

# 3. Publish
mcp-publisher publish .mcp/server.json

# 4. Confirm: open https://registry.modelcontextprotocol.io and search
#    "capability host".
```

To brand the namespace on the domain instead, change `name` to
`com.capabilityhostprotocol/chp` and verify via a DNS TXT record (the registry
prints the challenge). The GitHub-org route above is simpler and equally trusted.

Bump `version` here whenever the server's tools/resources change, then re-publish.

## Directories (federate discovery — do after the registry)

Most pull from the official registry, but these four reward a direct submission.
Use the values already in `server.json` plus the tool list from
`app/api/[transport]/route.ts`:

- **Glama** (`glama.ai/mcp`) — form, manual review.
- **Smithery** (`smithery.ai`) — `npx @smithery/cli publish`, or submit the repo URL.
- **mcp.so** — community submit form (broadest reach).
- **PulseMCP** (`pulsemcp.com`) — "add a server" form (hand-reviewed).
- **`punkpeye/awesome-mcp-servers`** — open a PR adding CHP under the relevant category.

`mcp-submit` (open source) fans out to 10+ directories in one command if you'd
rather batch it.
