import * as gcp from "@pulumi/gcp";
import * as pulumi from "@pulumi/pulumi";
import { Config } from "@pulumi/pulumi";
import * as random from "@pulumi/random";

const config = new Config();

export const nodeCount = config.getNumber("nodeCount") || 2;
export const nodeMachineType = config.get("nodeMachineType") || "n1-standard-2";
export const username = config.get("username") || "admin";
export const password = new random.RandomPassword("password", {
  length: 20,
  special: true,
}).result;

const engineVersion = gcp.container.getEngineVersions({
  location: "asia-southeast1",
});

export const masterVersion = engineVersion.then((it) => it.latestMasterVersion);
export const prefix = (name: string) => `${pulumi.getProject()}-${pulumi.getStack()}-${name}`;
