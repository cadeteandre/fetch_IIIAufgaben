import { IPost, IPost2 } from "./interface/IPost";

const URL: string = 'https://jsonplaceholder.typicode.com/posts/1/comments';
const URL_ALL_POSTS: string = 'https://jsonplaceholder.typicode.com/posts';

async function fetchPosts (url: string): Promise<void> {
    try {
        const response = await fetch(url);
        const posts = await response.json() as IPost[];
        console.log(posts);
    } catch(error) {
        console.error(error);
    }
}
fetchPosts(URL);

let allPosts: IPost2[] = [];
async function fetchAllPosts(url: string): Promise<void> {
    try {
        const response = await fetch(url);
        const allPostsResp = await response.json() as IPost2[];
        allPosts = [...allPostsResp];
    } catch(error) {
        console.error(error);
    }
}

console.log(allPosts);

async function showAllPosts(): Promise<void> {
    await fetchAllPosts(URL_ALL_POSTS);
    console.log(allPosts);
}
showAllPosts();

async function showHighestPostId(): Promise<void> {
    await fetchAllPosts(URL_ALL_POSTS);
    const sortedArr: IPost2[] = allPosts.toSorted((post_1: IPost2, post_2: IPost2) => post_2.id - post_1.id);
    console.log(sortedArr[0]);
}
showHighestPostId();

async function showShortestPostTitle(): Promise<void> {
    await fetchAllPosts(URL_ALL_POSTS);
    const sortedArr: IPost2[] = allPosts.toSorted((post_1: IPost2, post_2: IPost2) => post_1.title.length - post_2.title.length);
    console.log(sortedArr[0].title);
}
showShortestPostTitle();

async function showlongestPostBody(): Promise<void> {
    await fetchAllPosts(URL_ALL_POSTS);
    const sortedArr: IPost2[] = allPosts.toSorted((post_1: IPost2, post_2: IPost2) => post_2.body.length - post_1.body.length);
    console.log(sortedArr[0].body);
}
showlongestPostBody();
