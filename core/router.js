import Vue from 'vue';
import Router from 'vue-router';


import Appshell from '@/pages/Appshell.vue';



import Index from '@/pages/blog.vue';



import About from '@/pages/blog/about.vue';



import Archives from '@/pages/blog/archives.vue';



import Article from '@/pages/blog/article.vue';



import Home from '@/pages/blog/home.vue';



import Tags from '@/pages/blog/tags.vue';



import Error from '@/pages/Error.vue';



let routes = [
    {
        "path": "/appshell",
        "component": Appshell,
        "meta": {},
        "name": "appshell"
    },
    {
        "path": "/",
        "component": Index,
        "meta": {},
        // "name": "blog",
        "children": [
            {
                "path": "/",
                "component": Home,
                "meta": {},
                "name": "blogHome"
            },
            {
                "path": "/about",
                "component": About,
                "meta": {},
                "name": "blogAbout"
            },
            {
                "path": "/archives",
                "component": Archives,
                "meta": {},
                "name": "blogArchives"
            },
            {
                "path": "/article/:id",
                "component": Article,
                "meta": {},
                "name": "blogArticle"
            },

            {
                "path": "/tags",
                "component": Tags,
                "meta": {},
                "name": "blogTags"
            }
        ]
    },
    {
        "path": "/error",
        "component": Error,
        "meta": {},
        "name": "error",
        "alias": "*"
    }
];

Vue.use(Router);




const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else {
        const position = {};
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash;
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0
            position.y = 0
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position;
    }
};


export function createRouter() {
    let router = new Router({
        mode: 'history',
        base: '/',
        scrollBehavior,
        routes
    });


    router.beforeEach((to, from, next) => {
        if (router.app.$store) {
            if (router.app.$store.state.pageTransition.enable) {

                let effect = 'fade';

                router.app.$store.commit('pageTransition/setType', 'fade');
                router.app.$store.commit('pageTransition/setEffect', effect);
            }
        }
        next();
    });


    return router;
}
