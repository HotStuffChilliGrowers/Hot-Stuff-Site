# Hot Stuff — website setup guide

Everything here is free. No hosting bill, no monthly shop fee. Follow these steps in order.

## 1. Put the site on the internet (Netlify — free)

1. Go to netlify.com and sign up (free, no card needed).
2. Once logged in, go to **Sites** → drag-and-drop the whole `hot-stuff-site` folder onto the page (there's a drop zone that says "drag and drop your site here").
3. Netlify gives you a live address like `hot-stuff-jam.netlify.app` straight away. You can rename it in **Site settings → Change site name**.
4. (Optional, later) Add your own domain like `hotstuffjam.co.nz` under **Domain settings** — this is the only part that could ever cost money (a domain is usually $20-40/year), and you can skip it indefinitely.

## 2. Turn on the CMS login (Netlify Identity + Git Gateway — free)

The simple editing screen (at `yoursite.netlify.app/admin/`) needs this turned on once:

1. In your Netlify site, go to **Site settings → Identity → Enable Identity**.
2. Under Identity settings, set **Registration** to "Invite only" (so strangers can't sign up).
3. Scroll to **Services → Git Gateway → Enable Git Gateway**.
4. Go to the **Identity** tab at the top and click **Invite users** — invite your own email.
5. Check your email, accept the invite, set a password.

That's it — you can now log in at `yoursite.netlify.app/admin/` and edit the homepage text, story text, and jam varieties (name, price, heat level, photo, description) without touching any code. Changes save straight to the site.

Note: the drag-and-drop method in step 1 doesn't connect to a git repository, and Git Gateway needs one. The easiest path is to put this folder in a free GitHub repo and connect *that* to Netlify (**Add new site → Import an existing project → GitHub**) instead of dragging the folder. I can walk you through creating the GitHub repo if you'd like — just say so.

## 3. Get paid — PayPal (free)

1. Go to paypal.com and open a free **Business** account (lets you accept payments; no monthly fee, PayPal just takes a small % per transaction, same as any card payment).
2. Log into the CMS (`/admin/`) → **Homepage** → set **PayPal email** to the email on your PayPal account.
3. Save. Every "Buy jar" button on the site will now send payments to that account — no extra setup needed, the buttons already work.

## 4. Swap in your own photos

Right now the hero image, the story image, and each jam jar use simple placeholder illustrations so the site doesn't look empty. When your photos are ready:

1. Log into `/admin/`.
2. Open **Homepage** to upload your hero photo and story photo.
3. Open **Jam varieties** to upload a photo for each jar.
4. Save — the placeholders are replaced automatically.

## 5. The video player and gallery

Two more sections, both editable from `/admin/`:

- **Watch it happen** — a square video player (built and cropped for a 1080x1080 video, the standard square format for Instagram/social clips). Under **Homepage**, upload your video file, plus an optional poster image (a still frame shown before someone hits play). Export or crop your clip to a 1:1 square before uploading — the player displays whatever you give it in a perfect square, so a square source will always look best.
- **In the patch & in the kitchen** — a photo gallery, up to 20 images. Under **Gallery**, click "Add Images" for each photo, with an optional caption. Click any photo on the live site to view it full-size; empty slots show a simple placeholder mark until a photo is added.

## 6. Packaging & courier costs

Every "Buy jar" button now includes a quantity box and adds a courier charge automatically, on top of the jam price:

- **Courier cost for the first jar** — a flat NZD amount added once per order (covers packaging + the base courier charge).
- **Extra courier cost per additional jar** — a smaller amount added for each jar beyond the first, since one extra jar barely changes the box or the courier price.
- **Packaging & courier note** — the line shown above the jars on the live site (e.g. "Carefully packed and sent by courier, NZ-wide only").

All three are editable under **Homepage** in `/admin/` — update the numbers any time your courier pricing changes. PayPal calculates the total (jam + shipping) automatically at checkout and will ask the customer for their delivery address since this is a physical, courier-delivered product.

## What's in this folder

- `index.html`, `css/style.css`, `js/main.js` — the website itself.
- `content/site.json` — homepage text, hero/story photos, video, PayPal email.
- `content/products.json` — your jam varieties.
- `content/gallery.json` — your photo gallery (up to 20 images).
- `admin/` — the CMS login screen and its configuration.

You never need to edit the JSON files by hand — the `/admin/` screen does it for you.
