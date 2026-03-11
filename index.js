#!/usr/bin/env node

const { program } = require("commander");
const axios = require("axios");

const EXPLORER_API = "https://testnet.midenscan.com/api";

const fmt = {
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

function banner() {
  console.log(fmt.cyan(`
╔═══════════════════════════════════════╗
║         🌐 miden-tools CLI            ║
║   Miden Testnet Explorer Toolkit      ║
║   by @KarimKusin | github/Karimkusin88║
╚═══════════════════════════════════════╝
`));
}

async function fetchJSON(url) {
  try {
    const res = await axios.get(url, { timeout: 10000 });
    return { ok: true, data: res.data };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

program
  .name("miden-tools")
  .description("CLI toolkit for Miden testnet")
  .version("1.0.0");

program
  .command("account <address>")
  .description("Check account details on Miden testnet")
  .action(async (address) => {
    banner();
    console.log(fmt.bold(`🔍 Fetching account: ${fmt.cyan(address)}\n`));
    const result = await fetchJSON(`${EXPLORER_API}/accounts/${address}`);
    if (!result.ok) {
      console.log(fmt.red(`❌ Error: ${result.error}`));
      console.log(fmt.dim(`   Try: https://testnet.midenscan.com/account/${address}`));
      return;
    }
    const d = result.data;
    console.log(fmt.green("✅ Account found!\n"));
    console.log(`  ${fmt.bold("Address:")}    ${fmt.cyan(d.id || address)}`);
    console.log(`  ${fmt.bold("Type:")}       ${fmt.yellow(d.account_type || "N/A")}`);
    console.log(`  ${fmt.bold("Nonce:")}      ${d.nonce || "0"}`);
    console.log(`\n  ${fmt.dim("🔗 https://testnet.midenscan.com/account/" + address)}`);
  });

program
  .command("note <noteId>")
  .description("Check note status on Miden testnet")
  .action(async (noteId) => {
    banner();
    console.log(fmt.bold(`🗒️  Fetching note: ${fmt.cyan(noteId)}\n`));
    const result = await fetchJSON(`${EXPLORER_API}/notes/${noteId}`);
    if (!result.ok) {
      console.log(fmt.red(`❌ Error: ${result.error}`));
      console.log(fmt.dim(`   Try: https://testnet.midenscan.com/note/${noteId}`));
      return;
    }
    const d = result.data;
    console.log(fmt.green("✅ Note found!\n"));
    console.log(`  ${fmt.bold("Note ID:")}  ${fmt.cyan(d.note_id || noteId)}`);
    console.log(`  ${fmt.bold("Status:")}   ${fmt.green(d.status || "N/A")}`);
    console.log(`  ${fmt.bold("Type:")}     ${fmt.yellow(d.note_type || "N/A")}`);
    console.log(`\n  ${fmt.dim("🔗 https://testnet.midenscan.com/note/" + noteId)}`);
  });

program
  .command("tx <txHash>")
  .description("Check transaction status on Miden testnet")
  .action(async (txHash) => {
    banner();
    console.log(fmt.bold(`⚡ Fetching tx: ${fmt.cyan(txHash)}\n`));
    const result = await fetchJSON(`${EXPLORER_API}/transactions/${txHash}`);
    if (!result.ok) {
      console.log(fmt.red(`❌ Error: ${result.error}`));
      console.log(fmt.dim(`   Try: https://testnet.midenscan.com/tx/${txHash}`));
      return;
    }
    const d = result.data;
    console.log(fmt.green("✅ Transaction found!\n"));
    console.log(`  ${fmt.bold("Tx Hash:")}  ${fmt.cyan(d.id || txHash)}`);
    console.log(`  ${fmt.bold("Status:")}   ${fmt.green(d.status || "N/A")}`);
    console.log(`  ${fmt.bold("Block:")}    ${d.block_num || "N/A"}`);
    console.log(`\n  ${fmt.dim("🔗 https://testnet.midenscan.com/tx/" + txHash)}`);
  });

program
  .command("stats")
  .description("Show Miden testnet network info")
  .action(() => {
    banner();
    console.log(fmt.bold("📊 Miden Testnet Network Info:\n"));
    console.log(`  ${fmt.bold("Explorer:")}   ${fmt.cyan("https://testnet.midenscan.com")}`);
    console.log(`  ${fmt.bold("Faucet:")}     ${fmt.cyan("https://testnet.miden.io")}`);
    console.log(`  ${fmt.bold("Playground:")} ${fmt.cyan("https://playground.miden.xyz")}`);
    console.log(`  ${fmt.bold("Docs:")}       ${fmt.cyan("https://docs.miden.xyz")}`);
    console.log(`  ${fmt.bold("Telegram:")}   ${fmt.cyan("https://t.me/BuildOnMiden/1")}`);
  });

program.parse();
