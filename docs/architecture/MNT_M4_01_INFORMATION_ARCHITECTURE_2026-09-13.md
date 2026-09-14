# MNT-M4-01 — Information Architecture

Status: `IN_PROGRESS / AUTHORIZED`

Execution base: accepted MNT-M3-07 exact head `86a6151a9967b79146b0aa40b6b1348815823079`.

## Purpose
Translate the accepted M3 ownership model into governed information architecture. This task is design/documentation only.

## Invariants
- exact-project intent outranks master, stage, location and home;
- `/caminhos-da-lapa/` owns master-development intent, while child projects retain exact-project ownership;
- project modifiers such as price, address, metragem, planta and availability stay inside the exact-project owner when M3-06 assigns them there;
- stage surfaces own stage discovery only and never exact-project intent;
- location routes require the verified-project-set fact gate; no concrete Campo Belo route is admitted yet;
- `SUPPORT_ONLY`, `NO_OWNER`, conditional and excluded states do not get thin doorway pages merely to eliminate ambiguity;
- historical/sold surfaces must not imply active general inventory;
- entity route reservations prevent collisions but do not assert Search demand;
- M3-04 release-time revalidation remains authoritative for volatile commercial claims.

## Surface classes
- `/` — brand/portfolio root;
- `/caminhos-da-lapa/` — master-development surface;
- `/empreendimentos/<exact-project>/` — exact-project namespace;
- `/estagios/lancamento/`, `/estagios/em-construcao/`, `/estagios/pronto-para-morar/` — conditional stage discovery;
- `/regioes/<verified-location>/` — conditional location pattern only after fact gate.

Machine-readable registry: `docs/architecture/data/MNT_M4_01_IA_SURFACE_REGISTRY.csv`.

## Boundary
No route implementation, content publication, canonical/redirect/sitemap mutation, schema implementation, internal-link implementation, Green/Vercel/Search Console mutation, Ads or spend is authorized by M4-01.

M4-05, M4-08 and M4-09 remain separately gated `PLANNED_NOT_AUTHORIZED` in the current WBS.
