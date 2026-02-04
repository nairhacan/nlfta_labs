# **DOKUMEN PERSYARATAN TEKNIS KONTRIBUTOR NLFTs**

## **1. SPESIFIKASI TEKNIS MANDATORY**

### **1.1 Versi Teknologi Wajib**
- **Node.js**: v18.17.0 atau lebih tinggi
- **npm**: v9.0.0+ **ATAU** **pnpm**: v8.0.0+ **ATAU** **yarn**: v1.22+
- **Git**: v2.30.0+
- **Next.js**: 14.x (App Router)
- **TypeScript**: 5.0+
- **React**: 18.2.0+

### **1.2 Arsitektur Wajib Diketahui**
- App Router (Next.js 14)
- Server Components & Client Components
- API Routes (Route Handlers)
- Middleware (Next.js Middleware)

---

## **2. PERSYARATAN SISTEM MINIMUM**

### **2.1 Hardware Minimum**
| Komponen | Minimum | Rekomendasi |
|----------|---------|-------------|
| RAM | 8 GB | 16 GB |
| Storage Kosong | 10 GB | 20 GB |
| CPU | Dual-core 2.0 GHz | Quad-core 3.0 GHz+ |

### **2.2 Operating System**
- Windows 10 (build 19042+) **ATAU**
- macOS 11 (Big Sur)+ **ATAU**
- Ubuntu 20.04 LTS+

---

## **3. DEVELOPMENT TOOLS WAJIB**

### **3.1 Software yang Harus Terinstall**
1. **Git** dengan konfigurasi user.name dan user.email
2. **VS Code** dengan ekstensi:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript/JavaScript
3. **GitHub CLI** (opsional tapi direkomendasikan)

### **3.2 Browser untuk Testing**
- Chrome 90+ **ATAU** Edge 90+
- Firefox 88+
- Safari 14+

---

## **4. STANDAR KODE YANG WAJIB DIIKUTI**

### **4.1 TypeScript Standards**
- Strict mode: **WAJIB AKTIF**
- No explicit `any` type: **DILARANG**
- Type definitions lengkap untuk fungsi publik
- Interface untuk object structures

### **4.2 Code Style**
- ESLint configuration project: **WAJIB DIPATUHI**
- Prettier formatting: **WAJIB DIPATUHI**
- Import ordering: builtin → external → internal

### **4.3 Naming Convention**
```typescript
// Components: PascalCase
UserProfile.tsx
NFTGallery.tsx

// Utilities/Hooks: camelCase
formatPrice.ts
useWalletConnection.ts

// Types/Interfaces: PascalCase dengan suffix .types.ts
User.types.ts
NFT.types.ts
```

---

## **5. PERFORMANCE THRESHOLDS**

### **5.1 Bundle Size Limits**
| Metric | Maximum | Target |
|--------|---------|--------|
| First Load JS | 150 KB | 100 KB |
| Page Size (HTML) | 50 KB | 30 KB |
| Lighthouse Performance | 85 | 90+ |

### **5.2 Core Web Vitals**
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## **6. TESTING REQUIREMENTS**

### **6.1 Coverage Minimum**
```json
{
  "statements": 80,
  "branches": 75,
  "functions": 80,
  "lines": 80
}
```

### **6.2 Test Types Required**
1. Unit Tests (Jest) - WAJIB untuk utilities
2. Component Tests (React Testing Library) - WAJIB untuk complex components
3. E2E Tests (Playwright) - WAJIB untuk critical user flows

---

## **7. SECURITY REQUIREMENTS**

### **7.1 Code Security**
- Tidak ada hardcoded secrets
- Input validation WAJIB untuk semua user inputs
- XSS protection: WAJIB
- CSRF tokens: WAJIB untuk mutating operations

### **7.2 Dependency Security**
- Tidak ada critical/high vulnerabilities
- Dependencies harus updated (max 6 bulan)
- Audit dependencies sebelum PR

---

## **8. ARCHITECTURAL CONSTRAINTS**

### **8.1 Project Structure Compliance**
```
src/
├── app/                    # HANYA untuk pages/layouts/API routes
├── components/            # Shared components
│   ├── ui/               # Primitive components
│   ├── shared/           # Cross-feature components
│   └── features/         # Feature-specific components
├── lib/                  # Utilities, helpers, configs
├── hooks/                # Custom React hooks
├── stores/               # State management
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

### **8.2 File Size Limits**
- Component file: maksimal 300 lines
- Utility file: maksimal 200 lines
- Test file: maksimal 500 lines

---

## **9. GIT & VERSION CONTROL RULES**

### **9.1 Commit Standards**
- Conventional commits: **WAJIB**
- Semantic commit messages: **WAJIB**
- Reference issue number: **WAJIB**
- Atomic commits: **WAJIB**

### **9.2 Branch Naming**
```
type/description
Contoh:
feat/add-nft-minting
fix/auth-token-expiry
docs/update-api-reference
```

---

## **10. DEPLOYMENT & BUILD REQUIREMENTS**

### **10.1 Build Success Criteria**
- Next.js build: **WAJIB PASS**
- TypeScript compilation: **0 ERRORS**
- ESLint: **MAX 10 WARNINGS**
- Test suite: **ALL PASSING**

### **10.2 Environment Variables**
```env
# WAJIB ada untuk development
DATABASE_URL=valid_postgres_url
NEXTAUTH_SECRET=min_32_chars
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## **11. REVIEW CRITERIA**

### **11.1 Automatic Checks (WAJIB PASS)**
1. ✅ CI/CD Pipeline (GitHub Actions)
2. ✅ TypeScript Compilation
3. ✅ ESLint Validation
4. ✅ Test Suite Execution
5. ✅ Build Success
6. ✅ Bundle Size Check

### **11.2 Manual Review Requirements**
1. **Code Quality**: Readable, maintainable, documented
2. **Architecture**: Aligns with project structure
3. **Security**: No vulnerabilities introduced
4. **Performance**: No regressions

---

## **12. REJECTION CRITERIA**

Kontribusi **AKAN DITOLAK** jika:

### **12.1 Technical Violations**
- [ ] Tidak memenuhi versi teknologi minimum
- [ ] Menggunakan deprecated APIs
- [ ] Memperkenalkan security vulnerabilities
- [ ] Melebihi bundle size limits
- [ ] Test coverage di bawah minimum

### **12.2 Process Violations**
- [ ] Tidak mengikuti git workflow
- [ ] Tidak ada issue reference
- [ ] Tidak responsif terhadap review comments (> 7 hari)
- [ ] Melakukan force push ke PR branch

---

## **13. COMPLIANCE VERIFICATION**

Sebelum submit PR, verifikasi:

### **13.1 Local Validation Script**
```bash
# WAJIB dijalankan dan semua PASS
npm run validate
# Atau:
pnpm validate
# Script harus include:
# - linting
# - type checking
# - testing
# - build
```

### **13.2 Pre-commit Hooks**
- Husky pre-commit: **WAJIB AKTIF**
- lint-staged: **WAJIB AKTIF**
- Commit message validation: **WAJIB AKTIF**

---

## **DOKUMEN INI BERSIFAT MANDATORY**

Semua kontributor WAJIB memenuhi persyaratan teknis di atas.  
Ketidakpatuhan akan mengakibatkan penolakan PR tanpa pengecualian.

**Effective Date**: March 2024  
**Document Version**: 2.0  
**Compliance**: Mandatory untuk semua kontribusi

---

**CATATAN**: Dokumen ini merupakan supplement dari CONTRIBUTING.md.  
Keduanya harus dipatuhi secara bersamaan.