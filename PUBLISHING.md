# Publishing Guide

## Prerequisites

1. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **npm token**: Generate an automation token in your npm account settings
3. **GitHub secret**: Add the token as `NPM_TOKEN` in repository secrets

## Setting up NPM_TOKEN

1. Go to [npmjs.com](https://www.npmjs.com/) and log in
2. Click your profile → **Access Tokens**
3. Click **Generate New Token** → Select **Automation**
4. Copy the token
5. Go to GitHub repository → **Settings** → **Secrets and variables** → **Actions**
6. Click **New repository secret**
7. Name: `NPM_TOKEN`
8. Value: Paste your npm token
9. Click **Add secret**

## Publishing Methods

### Method 1: Manual Publish (Recommended)

1. Go to **Actions** tab in GitHub
2. Select **Publish to npm** workflow
3. Click **Run workflow**
4. Optionally specify a version (e.g., `0.2.1`, `0.3.0`)
5. Click **Run workflow** button

The workflow will:
- ✅ Run linting
- ✅ Build the library
- ✅ Publish to npm with provenance
- ✅ Create a summary with installation instructions

### Method 2: Publish on GitHub Release

1. Create a new release in GitHub
2. Tag version must match package.json (e.g., `v0.2.0`)
3. Publish the release
4. Workflow automatically publishes to npm

### Method 3: Local Publish (Not Recommended)

```bash
# Login to npm
npm login

# Build the library
npm run build:lib

# Publish
npm publish --access public
```

## Version Management

### Semantic Versioning

- **Patch** (0.2.0 → 0.2.1): Bug fixes
- **Minor** (0.2.0 → 0.3.0): New features (backward compatible)
- **Major** (0.2.0 → 1.0.0): Breaking changes

### Updating Version

```bash
# Patch version
npm version patch

# Minor version
npm version minor

# Major version
npm version major

# Specific version
npm version 0.3.0
```

## Pre-publish Checklist

- [ ] All tests passing
- [ ] Lint check passes (`npm run lint`)
- [ ] Library builds successfully (`npm run build:lib`)
- [ ] CHANGELOG.md updated
- [ ] README.md updated
- [ ] Version bumped in package.json
- [ ] Commit and push all changes

## Post-publish

1. Verify package on [npmjs.com/package/react-pivot](https://www.npmjs.com/package/react-pivot)
2. Test installation: `npm install react-pivot@latest`
3. Update demo site if needed
4. Announce on social media / documentation

## Troubleshooting

### "You must be logged in to publish packages"
- Check that `NPM_TOKEN` secret is set correctly in GitHub
- Verify token has not expired

### "Package name already exists"
- Package name `react-pivot` must be available on npm
- Check if you have permission to publish

### "Version already published"
- Bump version in package.json before publishing
- You cannot republish the same version

## Package Contents

The published package includes:
- `dist/` - Compiled library files
- `dist/index.d.ts` - TypeScript definitions
- `README.md` - Documentation
- `LICENSE` - MIT license
- `CHANGELOG.md` - Version history
- `package.json` - Package metadata

Excluded (via .npmignore):
- Source code (`src/`)
- Demo files
- Build configuration
- Development tools
