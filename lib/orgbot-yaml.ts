import { parse } from "yaml";
import { z } from "zod";
import { DEFAULT_ROUTING_RULE } from "@/lib/pack";

const seatYamlSchema = z.object({
  name: z.string().trim().min(1),
  job: z.string().trim().min(1),
  repeats_when: z.string().trim().min(1).optional(),
});

const orgbotYamlSchema = z.object({
  name: z.string().trim().min(1),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  description: z.string().trim().min(1),
  license: z.string().trim().min(1).optional(),
  runtimes: z.array(z.string().trim().min(1)).default([]),
  topics: z.array(z.string().trim().min(1)).default([]),
  desk: z.object({
    name: z.string().trim().min(1),
    job: z.string().trim().min(1),
  }),
  seats: z.array(seatYamlSchema).default([]),
  rule: z.string().trim().min(1).default(DEFAULT_ROUTING_RULE),
});

export type OrgbotManifest = z.infer<typeof orgbotYamlSchema>;

export function parseOrgbotYaml(source: string): OrgbotManifest {
  const raw = parse(source);
  const result = orgbotYamlSchema.safeParse(raw);
  if (!result.success) {
    const first = result.error.issues[0];
    const path = first?.path.length ? first.path.join(".") : "orgbots.yaml";
    throw new Error(`${path}: ${first?.message ?? "invalid pack"}`);
  }
  return result.data;
}
