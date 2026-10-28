<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Production builds materialize original image manifests into same-origin `/images/` assets through `tooling/portable-images.mjs`; this preserves original photos while removing Lovable-only runtime asset routing.
- Hostinger Node deployments use `vite.hostinger.config.ts` and `build:hostinger`; keep the default Lovable target separate so neither deployment overwrites the other's server target.
