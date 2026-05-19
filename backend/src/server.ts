import app from "./app";
import { config } from "./config";
import { logger } from "./utils/logger";

app.listen(config.port, () => {
  logger.info(`StellarHive API running`, {
    port: config.port,
    env: config.nodeEnv,
    network: config.stellar.network,
  });
});
