# PR #75 — Form country selector UX adjustment

Product Authority runtime feedback on 2026-09-14 removed the redundant manual DDI field from the Vercel Form 46 implementation.

Accepted UX rule:

```text
country selector = flag + country + dial code
manual DDI input = removed
Brazil = default (+55)
phone input = national/user-friendly display
submitted telefone = E.164 derived from selected country + entered phone
```

This adjustment changes only the Vercel form UX/runtime. Green production remains unchanged and the Form 46 transport contract remains tenant `313`, form `46`, endpoint `https://back.gdigital.com.br/form/register`.
