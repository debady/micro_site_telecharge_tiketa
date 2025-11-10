# micro site de téléchargement de TikeTa

https://micro-site-telecharge-tiketa.vercel.app/

Depasse la taille permit 50Mo donc installer 
Utiliser Git LFS (recommandé pour les APK)

git lfs install
git lfs track "statique/TikeTa.apk"
git add .gitattributes
git add statique/TikeTa.apk
git commit -m "Move APK to Git LFS"
git push origin stable