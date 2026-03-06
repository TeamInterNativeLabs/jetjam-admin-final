# Admin Dashboard – Vercel par deploy + admin.jetjams.net

## 1. Repo Vercel se connect karo

1. **https://vercel.com** → Login → **InterNative Labs Pro** (ya jis team pe deploy karna hai).
2. **Add New** → **Project**.
3. **Import Git Repository** → admin wala repo select karo (alag repo hai to usko connect karo).
4. **Configure Project:**
   - **Framework Preset:** Other (ya "Vite" nahi – ye Webpack project hai).
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist` (vercel.json mein bhi set hai, yahan bhi confirm karo).
   - **Install Command:** `npm install` (default).

5. **Environment Variables** add karo (Production + Preview dono ke liye):

   | Name | Value |
   |------|--------|
   | `REACT_APP_BASE_URL` | `https://api.jetjams.net/jetjams/v1/api` |
   | `REACT_APP_IMAGE_ENDPOINT` | `https://api.jetjams.net/` |
   | `REACT_APP_SITE_URL` | `https://www.jetjams.net` (optional – package share link ke liye) |

6. **Deploy** click karo.  
   Build complete hone ke baad admin ***.vercel.app** URL pe live ho jayega.

---

## 2. Custom domain admin.jetjams.net add karo

1. Vercel → **Admin project** → **Settings** → **Domains**.
2. **Add** → type karo: **admin.jetjams.net** → **Add**.
3. Vercel tumhe **DNS record** dikhayega (e.g. CNAME **admin** → **xyz.vercel-dns-017.com**).

---

## 3. DNS (domain provider pe)

Apne **domain registrar** (jahan jetjams.net register hai) pe jao → **DNS** section:

| Type   | Name    | Value |
|--------|---------|--------|
| **CNAME** | **admin** | **(Vercel jo value batae – copy from Domains page)** |

Example: `9a24f58a04d6d69b.vercel-dns-017.com` jaisa (har project ka alag ho sakta hai – Vercel Domains pe exact value dikhegi).

Save karo. 5–30 min (kabhi 48 hr) wait karo; Vercel pe **Refresh** karke **Valid Configuration** check karo.

---

## 4. Baad mein code update

- **Git push** (main/master) → Vercel auto-deploy karega (jab tak project Git se linked hai).
- Ya **Vercel CLI:**  
  `cd D:\jetjam-admin-final` → `vercel --prod`  
  (Pehle `vercel link` se project link karo, aur Git author ko team access hona chahiye.)

---

## Short checklist

| Step | Kya karo |
|------|----------|
| 1 | Vercel → Add New Project → Admin repo import karo |
| 2 | Build: `npm run build`, Output: `dist`, Env vars add karo |
| 3 | Deploy → phir Settings → Domains → **admin.jetjams.net** add karo |
| 4 | Domain provider pe **CNAME** **admin** → Vercel wala value |
| 5 | Wait → Valid Configuration → https://admin.jetjams.net check karo |

**Note:** `vercel.json` mein `outputDirectory: "dist"` aur SPA `rewrites` add kar diye hain taaki build sahi output use ho aur routes theek chaleyn.
