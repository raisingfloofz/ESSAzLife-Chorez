const CACHE_NAME =
    "essazlife-chorez-v2";

const APP_FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",

    "./chorez-images/Chorez-Peach-Icon.png",
    "./chorez-images/Chorez-App-Icon.png",
    "./chorez-images/Chorez-Coin.png",
    "./chorez-images/Chorez-Fridge-Shut.png",
    "./chorez-images/Chorez-Intro-Stage.png",
    "./chorez-images/Chorez-White-Room.png",
    "./chorez-images/MooCow-Formal.png",
    "./chorez-images/MooCow.png",
    "./chorez-images/tired-black-voidy.png",

    "./chorez-images/banana-disks.png",
    "./chorez-images/beef-yarn.png",
    "./chorez-images/blueberry-bites.png",
    "./chorez-images/gizm-os.png",
    "./chorez-images/pb-chicken-rice.png",
    "./chorez-images/rainbow-rocks.png",
    "./chorez-images/rocks-classic.png",
    "./chorez-images/spinach-slices.png"
];

self.addEventListener(
    "install",
    event => {

        event.waitUntil(
            caches.open(CACHE_NAME)
                .then(cache => {
                    return cache.addAll(
                        APP_FILES
                    );
                })
        );

        self.skipWaiting();
    }
);

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(
            caches.keys()
                .then(cacheNames => {

                    return Promise.all(
                        cacheNames.map(
                            cacheName => {

                                if (
                                    cacheName !==
                                    CACHE_NAME
                                ) {
                                    return caches.delete(
                                        cacheName
                                    );
                                }
                            }
                        )
                    );
                })
        );

        self.clients.claim();
    }
);

self.addEventListener(
    "fetch",
    event => {

        if (
            event.request.method !==
            "GET"
        ) {
            return;
        }

        event.respondWith(
            caches.match(
                event.request
            ).then(
                cachedResponse => {

                    return (
                        cachedResponse ||
                        fetch(
                            event.request
                        )
                    );
                }
            )
        );
    }
);
