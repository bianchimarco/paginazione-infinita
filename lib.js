// paginazione infinita

const blog = {
    itemsPerPage: 5,
    currentPage: 0,
    totalePage: 0,
    blogWrapper: document.getElementById('blog-w'),
    pagePositionWrapper: document.getElementById('page-position-w')
};

// check the scrollmax e show the next posts
window.addEventListener('scroll', (e) => {
    let scrollHeight, clientHeight, scrollTop;
    ({scrollHeight, clientHeight, scrollTop} = document.documentElement);
    let maxScroll = scrollHeight - clientHeight;
    // console.log(maxScroll);
    if ((scrollTop >= maxScroll - 1) && (blog.currentPage < blog.totalePage - 1)) {
        blog.currentPage++;
        showPosts();
        // call to function to set the active indicator
        setIndicatoreAttivo();
    }
})

// function to set the active indicator
function setIndicatoreAttivo() {
    let indicatori = document.querySelectorAll('span.position');
    indicatori.forEach((indicatore,  i) => {
        if (blog.currentPage === i) {
            indicatore.setAttribute('class', 'position active');
        } else {
            indicatore.setAttribute('class', 'position');
        }
    });
}

// retrieve post from external website with 'fetch'
async function initBlog() {
    const postsData = await fetch('https://jsonplaceholder.typicode.com/posts');
    blog.posts = await postsData.json();
    blog.posts.splice(25, 75);
    // console.log(blog.posts);
    // count total page
    blog.totalePage = Math.ceil(blog.posts.length / blog.itemsPerPage);
    // show the pagination
    initIndicatoriPaginazione();
    showPosts();
}

// creating pagination
function initIndicatoriPaginazione() {
    for (let i = 0; i < blog.totalePage; i++) {
        let classi = 'position';
        i === 0 ? classi += ' active' : '';
        let pagination = document.createElement('span');
        pagination.setAttribute('class', classi);
        blog.pagePositionWrapper.appendChild(pagination);
    }
}

// show posts function
function showPosts() {
    let start = blog.currentPage * blog.itemsPerPage;
    //console.log(start);
    for (let i = start; i < start + blog.itemsPerPage ; i++) {
        /* console.log(i);
        console.log(start);
        console.log(blog.itemsPerPage); */
        let DOM_post = document.createElement('article');
        DOM_post.setAttribute('class', 'blog-post');
        DOM_post.innerHTML = createPostHTML(blog.posts[i]);
        blog.blogWrapper.appendChild(DOM_post);
    }
}

// create posts html code
function createPostHTML({id, title, body}) {
    return `<h3 class="title">${title}</h3>
        <div class="body">${body}</div>
        <div class="info">${id}</div>`
}

// call initblog() function
initBlog();