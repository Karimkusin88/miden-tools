# 🌐 miden-tools

A CLI toolkit for interacting with the Miden testnet — check accounts, notes, and transactions directly from your terminal.

Built by [@KarimKusin](https://twitter.com/KarimKusin) while grinding the Miden ecosystem.

## Installation
```bash
npm install -g miden-tools
```

## Usage
```bash
# Check account details
miden-tools account <address>

# Check note status
miden-tools note <note-id>

# Check transaction status
miden-tools tx <tx-hash>

# Show network info & useful links
miden-tools stats
```

## Example
```bash
$ miden-tools stats

╔═══════════════════════════════════════╗
║         🌐 miden-tools CLI            ║
║   Miden Testnet Explorer Toolkit      ║
║   by @KarimKusin | github/Karimkusin88║
╚═══════════════════════════════════════╝

📊 Miden Testnet Network Info:
  Explorer:   https://testnet.midenscan.com
  Faucet:     https://testnet.miden.io
  Playground: https://playground.miden.xyz
  Docs:       https://docs.miden.xyz
  Telegram:   https://t.me/BuildOnMiden/1
```

## Resources

- [Miden Explorer](https://testnet.midenscan.com)
- [Miden Playground](https://playground.miden.xyz)
- [Miden Docs](https://docs.miden.xyz)
- [Miden Telegram](https://t.me/BuildOnMiden/1)

## License

MIT
EOF

git add .
git commit -m "feat: initial release — Miden testnet CLI toolkit"
git push -u origin main
