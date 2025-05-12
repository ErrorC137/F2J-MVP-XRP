const CONFIG = {
  ENV: 'testnet',
  NETWORKS: {
    testnet: {
      WS_ENDPOINT: 'wss://s.altnet.rippletest.net:51233',
      EXPLORER: 'https://testnet.xrpl.org'
    },
    mainnet: {
      WS_ENDPOINT: 'wss://xrplcluster.com',
      EXPLORER: 'https://livenet.xrpl.org'
    }
  },
  TOKEN: {
    SYMBOL: 'F2J',
    ISSUER: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
    DECIMALS: 6,
    TRUST_LIMIT: '1000000'
  },
  PLATFORM: {
    WALLET: 'rPT1Sjq2YGrBMTttX4GZHjKu9dyfzbpAYe',
    EMAIL: 'support@freetojoy.org'
  }
};
