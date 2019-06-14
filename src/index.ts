import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
import settings from "./settings/settings";

createConnection()
  .then(async connection => {
    app.listen(settings.PORT, () => {
      console.log(
        `🚀 Anchor server has started on http://localhost:${settings.PORT}`,
      );
    });
  })
  .catch(error => console.log(error));
