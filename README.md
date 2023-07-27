| Field | Description |
| ------ | ----------- |
| key   | is a unique key used to access the next endpoint example  ```key : 'resep-ayam'``` |
| page | load a next of data if want to make pagination in your app |
| tag    | is unique key of a article category to hit a detail of article|
| limit    | set limit of result **note** make sure you set limit below of 10 |



### Endpoint Usage
---
**Base Url** : `https://resepin-api.vercel.app`

| Endpoint | Usage | Example |
|----------|-------|---------|
| new recipes | `/api/recipes` | - |
| new recipes by page | `/api/recipes/:page` | `/api/recipes/1` |
| new recipes limit | `/api/recipes-length/?limit=size` | `/api/recipes-length/?limit=5` |
| recipes by category | `/api/category/recipes/:key` | `/api/category/recipes/masakan-hari-raya` |
| recipes category | `/api/category/recipes` | - |
| recipe detail | `/api/recipe/:key` | - |
| search recipes | `/api/search/?q=parameter` | `/api/search/?q=coto` |
| search recipes Pages | `/api/search/page/:page/?q=parameter` | `/api/search/page/1?q=coto` |
| article categorys | `/api/category/article` | - |
| article by category | `/api/category/article/:key/:page` | `/api/category/article/makanan-gaya-hidup/1` |
| article | `/api/articles/new` | - |
| article by page | `/api/articles/page/1` | - |
| article detail | `/api/article/:tag/:key` | `/api/article/makanan-gaya-hidup/papeda-dan-masakan-indonesia-timur` |



Lisensi MIT (MIT)

Izin dengan ini diberikan, tanpa biaya, kepada siapa pun yang mendapatkan salinan perangkat lunak ini dan file dokumentasi terkait ("Perangkat Lunak"), untuk berurusan dengan Perangkat Lunak tanpa batasan, termasuk tanpa batasan hak untuk menggunakan, menyalin, memodifikasi, menggabungkan , menerbitkan, mendistribusikan, mensublisensikan, dan/atau menjual salinan Perangkat Lunak, dan untuk mengizinkan orang yang diberikan Perangkat Lunak untuk melakukannya, tunduk pada ketentuan berikut:

Pemberitahuan hak cipta di atas dan pemberitahuan izin ini harus disertakan dalam semua salinan atau bagian substansial dari Perangkat Lunak.

PERANGKAT LUNAK INI DISEDIAKAN "SEBAGAIMANA ADANYA", TANPA JAMINAN APA PUN, TERSURAT MAUPUN TERSIRAT, TERMASUK NAMUN TIDAK TERBATAS PADA JAMINAN DAPAT DIPERDAGANGKAN, KESESUAIAN UNTUK TUJUAN TERTENTU DAN TANPA PELANGGARAN. DALAM KEADAAN APA PUN PENULIS ATAU PEMEGANG HAK CIPTA TIDAK BERTANGGUNG JAWAB ATAS KLAIM, KERUSAKAN ATAU KEWAJIBAN LAINNYA, BAIK DALAM TINDAKAN KONTRAK, KESALAHAN ATAU LAINNYA, YANG TIMBUL DARI, DARI ATAU SEHUBUNGAN DENGAN PERANGKAT LUNAK ATAU PENGGUNAAN ATAU HUBUNGAN LAIN DALAM PERANGKAT LUNAK.