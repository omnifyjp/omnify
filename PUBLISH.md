# Publishing Guide for @omnifyjp/omnify

## Prerequisites

1. **npm account**: Tạo account tại https://www.npmjs.com/
2. **Login npm**: 
   ```bash
   npm login
   ```
3. **Organization access**: Phải có quyền publish vào `@omnifyjp` organization

## Step 1: Prepare

```bash
cd packages/omnify

# Build package
npm run build

# Test local build
npm pack --dry-run
```

## Step 2: Update Version

Sửa version trong `package.json`:
```json
{
  "version": "0.1.0"  // Update này
}
```

Hoặc dùng npm version:
```bash
# Patch version: 0.1.0 -> 0.1.1
npm version patch

# Minor version: 0.1.0 -> 0.2.0
npm version minor

# Major version: 0.1.0 -> 1.0.0
npm version major
```

## Step 3: Publish to npm

### First time publish (scoped package)
```bash
# Publish với public access
npm publish --access public
```

### Subsequent publishes
```bash
npm publish
```

## Step 4: Verify

```bash
# Check trên npm
npm info @omnifyjp/omnify

# Test install
cd /tmp
npm install @omnifyjp/omnify
omnify-build --help
```

## Step 5: Update Frontend

Sau khi publish, update frontend để dùng version từ npm:

```json
{
  "dependencies": {
    "@omnifyjp/omnify": "^0.1.0"
  }
}
```

```bash
cd fronend
rm -rf node_modules package-lock.json
npm install
```

## Git Tags

Sau mỗi publish, nên tạo git tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

## Organization Setup (One-time)

Nếu chưa có `@omnifyjp` organization:

1. Tạo organization tại: https://www.npmjs.com/org/create
2. Hoặc publish lần đầu sẽ tự tạo

## Troubleshooting

### Error: 403 Forbidden
```bash
# Check user đã login
npm whoami

# Login lại
npm logout
npm login
```

### Error: Package name taken
- Đổi package name trong `package.json`
- Hoặc dùng scoped package: `@username/omnify`

### Error: Need access to organization
- Phải là member của `@omnifyjp` organization
- Hoặc tạo organization mới

## Automation (CI/CD)

Tạo `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
        working-directory: packages/omnify
      - run: npm run build
        working-directory: packages/omnify
      - run: npm publish --access public
        working-directory: packages/omnify
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

## Version Strategy

- **Patch** (0.1.x): Bug fixes
- **Minor** (0.x.0): New features (backward compatible)
- **Major** (x.0.0): Breaking changes

