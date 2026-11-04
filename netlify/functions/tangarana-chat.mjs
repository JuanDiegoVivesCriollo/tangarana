import { createTangaranaHandler } from "../../server/tangarana/service.mjs";

export default (request) => createTangaranaHandler({ env: process.env })(request);
