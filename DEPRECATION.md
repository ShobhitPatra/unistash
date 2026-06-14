# Deprecating the v1 adapter packages

Unistash v2 is a single, zero-dependency package — [`unistash`](https://www.npmjs.com/package/unistash).
The v1 adapter packages are superseded and should be deprecated on npm:

- `@unistash/core`
- `@unistash/zustand`
- `@unistash/jotai`
- `@unistash/redux`

The in-repo signals (README banners, `[DEPRECATED]` package descriptions) are already in place.
The steps below require npm publish access to the `@unistash` scope and are **not yet done**
(pending npm account access).

## 1. Deprecate every published version on npm

`npm deprecate` marks the packages on the registry so installs print a warning. Run after
`npm login` with an account that can publish to `@unistash`:

```bash
npm deprecate @unistash/core@"*"    "Deprecated: Unistash v2 is now a single package. Install 'unistash' instead. Migration: https://github.com/ShobhitPatra/unistash/blob/main/apps/docs/content/docs/migration/v1-to-v2.mdx"
npm deprecate @unistash/zustand@"*" "Deprecated: Unistash v2 is now a single package. Install 'unistash' instead. Migration: https://github.com/ShobhitPatra/unistash/blob/main/apps/docs/content/docs/migration/v1-to-v2.mdx"
npm deprecate @unistash/jotai@"*"   "Deprecated: Unistash v2 is now a single package. Install 'unistash' instead. Migration: https://github.com/ShobhitPatra/unistash/blob/main/apps/docs/content/docs/migration/v1-to-v2.mdx"
npm deprecate @unistash/redux@"*"   "Deprecated: Unistash v2 is now a single package. Install 'unistash' instead. Migration: https://github.com/ShobhitPatra/unistash/blob/main/apps/docs/content/docs/migration/v1-to-v2.mdx"
```

The `@"*"` selector deprecates all existing versions. To un-deprecate, run the same command
with an empty message: `npm deprecate @unistash/zustand@"*" ""`.

## 2. Close the auto-opened "Version Packages" PR

The Changesets release workflow opened a **"Version Packages"** PR from the pending
`.changeset/red-owls-kiss.md` changeset. It only bumps the soon-to-be-deprecated adapters, so
**close it** (and delete the pending changeset) rather than merge — there's no value in shipping
a new adapter release.

```bash
gh pr close <number> --delete-branch
git rm .changeset/red-owls-kiss.md   # then commit
```

## 3. (Optional) Publishing `unistash`

Publishing the new `unistash` package needs the `NPM_TOKEN` repo secret added (see
`CONTRIBUTING.md`). Once added, the release workflow handles versioning and publishing.
