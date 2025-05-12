export const XRPL_CONFIG = {
  NETWORK: {
    TESTNET: {
      WS: "wss://s.altnet.rippletest.net:51233",
      EXPLORER: "https://testnet.xrpl.org"
    },
    MAINNET: {
      WS: "wss://xrplcluster.com",
      EXPLORER: "https://livenet.xrpl.org"
    }
  },
  TOKEN: {
    SYMBOL: "F2J",
    ISSUER: "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe",
    DECIMALS: 6,
    TRUST_LIMIT: "1000000"
  },
  HOOKS: {
    VALIDATION_HASH: null,  
    MINTING_HASH: null      
  },
  PLATFORM: {
    WALLET: "rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe"
  },
  DEFAULT_ENV: "TESTNET"
};
