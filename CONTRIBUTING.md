# Contributing to Unistash

Thanks for your interest in contributing! 🎉

## Development setup

```bash
corepack enable          # use the pinned pnpm version
pnpm install
pnpm build
```

## Useful commands

| Command | What it does |
|---------|--------------|
| `pnpm check` | Format + lint (autofix) with Biome |
| `pnpm lint` | Lint/format check (no writes) |
| `pnpm typecheck` | Type-check all packages |
| `pnpm test` | Run unit tests |
| `pnpm build` | Build all packages |

## Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/). Commit
messages are validated by commitlint via a git hook. Examples:

- `feat(zustand): add devtools support`
- `fix(redux): correct action payload handling`
- `docs: update installation guide`

## Changesets

Any change to a published package needs a changeset:

```bash
pnpm changeset
```

Select the affected packages and a semver bump. The changeset is committed with
your PR; releases are published automatically when the "Version Packages" PR is
merged to `main`.

## Releases (maintainers)

Publishing requires an `NPM_TOKEN` repository secret (Settings → Secrets and
variables → Actions) with publish rights to the `@unistash` npm scope. The
`release.yml` workflow handles versioning and publishing.
